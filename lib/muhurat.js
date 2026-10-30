// Festival muhurat calculations built on the panchang engine.
import { computePanchang, tithiWindow, lagnaWindows, istMidnight } from './panchang.js';

const intersect = (a, b) => {
  const start = new Date(Math.max(a.start, b.start));
  const end = new Date(Math.min(a.end, b.end));
  return start < end ? { start, end } : null;
};

const VRISHABHA = 1; // Taurus, the "sthir" (fixed) lagna used for evening Lakshmi pujas

// Evening (Pradosh Kaal) festivals. Each date is checked in the tests: the festival's tithi
// must prevail at the start of Pradosh Kaal in New Delhi on that day.
//   tithi: 0-based index (0 = Shukla Pratipada … 27 = Krishna Trayodashi, 29 = Amavasya)
export const FESTIVALS = {
  lakshmiPuja: {
    label: 'Lakshmi Puja',
    tithi: 29, tithiName: 'Amavasya', hinduDate: 'Kartik Amavasya', hinduDateHi: 'कार्तिक अमावस्या',
    nishita: true,
    dates: { 2026: { y: 2026, m: 11, d: 8 } },
  },
  dhanteras: {
    label: 'Dhanteras puja',
    tithi: 27, tithiName: 'Trayodashi', hinduDate: 'Kartik Krishna Trayodashi', hinduDateHi: 'कार्तिक कृष्ण त्रयोदशी',
    yamaDeepam: true,
    dates: { 2026: { y: 2026, m: 11, d: 6 } },
  },
};

export const DIWALI_DATES = FESTIVALS.lakshmiPuja.dates;

// This year's date for a festival, or the latest one known.
export function festivalDateFor(kind, year) {
  const dates = FESTIVALS[kind].dates;
  return dates[year] || dates[Math.max(...Object.keys(dates).map(Number))];
}

// Muhurat for an evening festival at a place:
//   Pradosh Kaal (first fifth of the night) ∩ Vrishabha lagna ∩ the festival's tithi.
export function pradoshMuhurat(kind, date, place) {
  const f = FESTIVALS[kind];
  const p = computePanchang(date, place);
  const night = p.nextSunrise - p.sunset;
  const pradosh = { start: p.sunset, end: new Date(p.sunset.getTime() + night / 5) };
  const tithi = tithiWindow(f.tithi, new Date(istMidnight(date.y, date.m, date.d).getTime() - 36 * 3600000));

  const evening = { start: p.sunset, end: new Date(p.sunset.getTime() + 5 * 3600000) };
  const vrishabha = lagnaWindows(VRISHABHA, evening.start, evening.end, place.lat, place.lon)[0] || null;

  let muhurat = null;
  if (vrishabha) {
    const pv = intersect(pradosh, vrishabha);
    muhurat = pv && intersect(pv, tithi);
  }
  const fallback = !muhurat;
  if (fallback) muhurat = intersect(pradosh, tithi);

  // Nishita (Mahanishita) Kaal: the 8th of 15 night muhurtas, around midnight.
  const nm = night / 15;
  const nishita = { start: new Date(p.sunset.getTime() + 7 * nm), end: new Date(p.sunset.getTime() + 8 * nm) };

  return { panchang: p, muhurat, fallback, pradosh, vrishabha, tithi, amavasya: tithi, nishita };
}

export const lakshmiPujaMuhurat = (date, place) => pradoshMuhurat('lakshmiPuja', date, place);
export const dhanterasMuhurat = (date, place) => pradoshMuhurat('dhanteras', date, place);
