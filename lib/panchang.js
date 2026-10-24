// Panchang engine: computes the day's panchang for a place, from planetary positions.
// Positions come from astronomy-engine (VSOP87 / ELP-based, arcsecond-level accuracy).
// Sidereal values use the Lahiri (Chitrapaksha) ayanamsa, the Indian government standard.
// All output times are Date objects; format them in Asia/Kolkata.
import * as A from 'astronomy-engine';
import {
  TITHI, NAKSHATRA, YOGA, KARANA_MOVABLE, KARANA_FIXED, MONTHS, RASHI, WEEKDAYS,
} from './panchang-names.js';

const DAY = 86400000;
const IST_MS = 330 * 60000;
const norm = (x) => ((x % 360) + 360) % 360;

// ---------- longitudes ----------
const sunLon = (d) => A.SunPosition(d).elon; // apparent tropical, of date
const moonLon = (d) => A.EclipticGeoMoon(d).lon; // true tropical, of date

// Lahiri ayanamsa: 23°15'00.658" on 21 Mar 1956 (IAE definition), advanced by
// IAU general precession in longitude.
const T0 = (2435553.5 - 2451545.0) / 36525;
const precession = (T) => 5028.796195 * T + 1.1054348 * T * T; // arcseconds
export function ayanamsa(d) {
  const T = (d.getTime() / DAY + 2440587.5 - 2451545.0) / 36525;
  return 23.250182778 + (precession(T) - precession(T0)) / 3600;
}

const elongation = (d) => norm(moonLon(d) - sunLon(d));
const moonSidereal = (d) => norm(moonLon(d) - ayanamsa(d));
const sunSidereal = (d) => norm(sunLon(d) - ayanamsa(d));
const yogaAngle = (d) => norm(sunLon(d) + moonLon(d) - 2 * ayanamsa(d));

// ---------- generic "when does this segment end" search ----------
function segIndex(fn, size, d) {
  return Math.floor(fn(d) / size);
}
// Time when fn's segment (width `size` degrees) changes after `start`.
function nextChange(fn, size, start) {
  const i0 = segIndex(fn, size, start);
  let a = start.getTime();
  let b = a;
  const stepMs = 3600000;
  for (let n = 0; n < 24 * 4; n++) {
    b += stepMs;
    if (segIndex(fn, size, new Date(b)) !== i0) break;
    a = b;
  }
  while (b - a > 1000) {
    const mid = (a + b) / 2;
    if (segIndex(fn, size, new Date(mid)) === i0) a = mid;
    else b = mid;
  }
  return new Date(b);
}
// All segments of fn between `from` and `to`: [{ index, end }] (end may be after `to`).
function segmentsBetween(fn, size, from, to) {
  const out = [];
  let t = from;
  for (let guard = 0; guard < 6; guard++) {
    const index = segIndex(fn, size, t);
    const end = nextChange(fn, size, t);
    out.push({ index, end });
    if (end >= to) break;
    t = new Date(end.getTime() + 1000);
  }
  return out;
}

// Start and end of the occurrence of tithi `index` (0-29; 29 = Amavasya) nearest after `from`.
export function tithiWindow(index, from) {
  let t = from;
  for (let guard = 0; guard < 40; guard++) {
    if (segIndex(elongation, 12, t) === index) break;
    t = new Date(nextChange(elongation, 12, t).getTime() + 1000);
  }
  // walk back to the start
  let a = t.getTime() - 30 * 3600000;
  let b = t.getTime();
  while (b - a > 1000) {
    const mid = (a + b) / 2;
    if (segIndex(elongation, 12, new Date(mid)) === index) b = mid;
    else a = mid;
  }
  return { start: new Date(b), end: nextChange(elongation, 12, t) };
}

// Sidereal (Lahiri) ascendant in degrees for a place and moment.
export function ascendant(d, lat, lon) {
  const lst = ((A.SiderealTime(d) * 15 + lon) % 360 + 360) % 360;
  const T = (d.getTime() / DAY + 2440587.5 - 2451545.0) / 36525;
  const eps = (23.4392911 - 0.0130042 * T) * Math.PI / 180;
  const th = lst * Math.PI / 180;
  const phi = lat * Math.PI / 180;
  const asc = Math.atan2(Math.cos(th), -(Math.sin(th) * Math.cos(eps) + Math.tan(phi) * Math.sin(eps))) * 180 / Math.PI;
  return norm(asc - ayanamsa(d));
}
// Windows between `from` and `to` when the ascendant is in rashi `rashi` (0 = Mesha).
export function lagnaWindows(rashi, from, to, lat, lon) {
  const inR = (t) => Math.floor(ascendant(new Date(t), lat, lon) / 30) === rashi;
  const edge = (a, b, startState) => {
    while (b - a > 1000) {
      const mid = (a + b) / 2;
      if (inR(mid) === startState) a = mid; else b = mid;
    }
    return b;
  };
  const out = [];
  const step = 5 * 60000;
  let t = from.getTime();
  let state = inR(t);
  let start = state ? t : null;
  while (t < to.getTime()) {
    const n = Math.min(t + step, to.getTime());
    const s = inR(n);
    if (s !== state) {
      const e = edge(t, n, state);
      if (s) start = e; else { out.push({ start: new Date(start), end: new Date(e) }); start = null; }
      state = s;
    }
    t = n;
  }
  if (state && start !== null) out.push({ start: new Date(start), end: new Date(to.getTime()) });
  return out;
}

// ---------- rise/set ----------
// IST midnight that starts the given civil date (y, m 1-12, d).
export function istMidnight(y, m, d) {
  return new Date(Date.UTC(y, m - 1, d) - IST_MS);
}
function riseSet(body, obs, dir, from, limitDays = 1) {
  const t = A.SearchRiseSet(body, obs, dir, from, limitDays);
  return t ? t.date : null;
}

// ---------- lunar month ----------
// New moons around date d: { prev, next } with prev <= d < next.
function newMoonsAround(d) {
  let t = A.SearchMoonPhase(0, new Date(d.getTime() - 32 * DAY), 40).date;
  let prev = t;
  while (t <= d) {
    prev = t;
    t = A.SearchMoonPhase(0, new Date(t.getTime() + DAY), 40).date;
  }
  return { prev, next: t };
}
// Amanta month (0 = Chaitra) of the lunation containing d, and whether it is adhika.
function lunarMonth(d) {
  const { prev, next } = newMoonsAround(d);
  const r1 = Math.floor(sunSidereal(prev) / 30);
  const r2 = Math.floor(sunSidereal(next) / 30);
  return { index: (r1 + 1) % 12, adhika: r1 === r2 };
}

// ---------- name helpers ----------
const tithiName = (i) => {
  const paksha = i < 15 ? 'Shukla' : 'Krishna';
  const n = i % 15;
  const t = n === 14 ? (i < 15 ? TITHI.purnima : TITHI.amavasya) : TITHI.list[n];
  return { ...t, paksha, number: n + 1 };
};
const karanaName = (k) => {
  if (k === 0) return KARANA_FIXED[3];
  if (k >= 57) return KARANA_FIXED[k - 57];
  return KARANA_MOVABLE[(k - 1) % 7];
};

// ---------- main ----------
// date: { y, m, d } civil date in IST; place: { lat, lon }.
export function computePanchang({ y, m, d }, place) {
  const obs = new A.Observer(place.lat, place.lon, 0);
  const dayStart = istMidnight(y, m, d);
  const sunrise = riseSet(A.Body.Sun, obs, +1, dayStart);
  const sunset = riseSet(A.Body.Sun, obs, -1, sunrise);
  const nextSunrise = riseSet(A.Body.Sun, obs, +1, sunset);
  const prevSunset = riseSet(A.Body.Sun, obs, -1, new Date(sunrise.getTime() - DAY));

  const nextDayStart = new Date(dayStart.getTime() + DAY);
  const moonriseRaw = riseSet(A.Body.Moon, obs, +1, dayStart);
  const moonsetRaw = riseSet(A.Body.Moon, obs, -1, dayStart);
  const moonrise = moonriseRaw && moonriseRaw < nextDayStart ? moonriseRaw : null;
  const moonset = moonsetRaw && moonsetRaw < nextDayStart ? moonsetRaw : null;

  const from = sunrise;
  const to = nextSunrise;
  const tithis = segmentsBetween(elongation, 12, from, to).map((s) => ({ ...tithiName(s.index), end: s.end }));
  const nakshatras = segmentsBetween(moonSidereal, 360 / 27, from, to).map((s) => ({ ...NAKSHATRA[s.index], end: s.end }));
  const yogas = segmentsBetween(yogaAngle, 360 / 27, from, to).map((s) => ({ ...YOGA[s.index], end: s.end }));
  const karanas = segmentsBetween(elongation, 6, from, to).map((s) => ({ ...karanaName(s.index), end: s.end }));
  const moonSigns = segmentsBetween(moonSidereal, 30, from, to).map((s) => ({ ...RASHI[s.index], end: s.end }));
  const sunSign = RASHI[Math.floor(sunSidereal(sunrise) / 30)];

  // Weekday of the civil date (IST).
  const weekdayIndex = new Date(dayStart.getTime() + IST_MS).getUTCDay();

  // Time-based periods (daytime divided into 8 parts).
  const dayLen = sunset - sunrise;
  const part = dayLen / 8;
  const slot = (n) => ({ start: new Date(sunrise.getTime() + (n - 1) * part), end: new Date(sunrise.getTime() + n * part) });
  const RAHU = [8, 2, 7, 5, 6, 4, 3];
  const YAMA = [5, 4, 3, 2, 1, 7, 6];
  const GULIKA = [7, 6, 5, 4, 3, 2, 1];
  const midday = sunrise.getTime() + dayLen / 2;
  const muhurta = dayLen / 15;
  const nightMuhurta = (sunrise - prevSunset) / 15;

  // Month, paksha, samvat (from the tithi prevailing at sunrise).
  const t0 = tithis[0];
  const month = lunarMonth(sunrise);
  const krishna = t0.paksha === 'Krishna';
  // Purnimanta months end on Purnima, so Krishna paksha belongs to the next month,
  // except during an adhika month, which runs Amavasya to Amavasya in both systems.
  const purnimantaIndex = krishna && !month.adhika ? (month.index + 1) % 12 : month.index;
  const vikram = month.index >= 9 && m <= 4 ? y + 56 : y + 57;

  return {
    date: { y, m, d },
    weekday: WEEKDAYS[weekdayIndex],
    sunrise, sunset, moonrise, moonset, nextSunrise,
    tithis, nakshatras, yogas, karanas, moonSigns, sunSign,
    paksha: t0.paksha,
    month: {
      amanta: { ...MONTHS[month.index], adhika: month.adhika },
      purnimanta: { ...MONTHS[purnimantaIndex], adhika: month.adhika },
    },
    samvat: { vikram, shaka: vikram - 135 },
    rahuKaal: slot(RAHU[weekdayIndex]),
    yamaganda: slot(YAMA[weekdayIndex]),
    gulika: slot(GULIKA[weekdayIndex]),
    abhijit: { start: new Date(midday - muhurta / 2), end: new Date(midday + muhurta / 2) },
    brahmaMuhurta: { start: new Date(sunrise.getTime() - 2 * nightMuhurta), end: new Date(sunrise.getTime() - nightMuhurta) },
    ayanamsa: ayanamsa(sunrise),
  };
}
