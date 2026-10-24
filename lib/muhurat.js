// Festival muhurat calculations built on the panchang engine.
import { computePanchang, tithiWindow, lagnaWindows, istMidnight } from './panchang.js';

const intersect = (a, b) => {
  const start = new Date(Math.max(a.start, b.start));
  const end = new Date(Math.min(a.end, b.end));
  return start < end ? { start, end } : null;
};

const AMAVASYA = 29; // tithi index of Krishna Amavasya
const VRISHABHA = 1; // Taurus, the "sthir" (fixed) lagna used for Lakshmi Puja

// Diwali dates (national). Each is checked in the tests: Amavasya must prevail
// during Pradosh Kaal in New Delhi on that day.
export const DIWALI_DATES = { 2026: { y: 2026, m: 11, d: 8 } };

// Lakshmi Puja muhurat for a place on Diwali:
//   Pradosh Kaal (first fifth of the night) ∩ Vrishabha lagna ∩ Amavasya.
export function lakshmiPujaMuhurat(date, place) {
  const p = computePanchang(date, place);
  const night = p.nextSunrise - p.sunset;
  const pradosh = { start: p.sunset, end: new Date(p.sunset.getTime() + night / 5) };
  const amavasya = tithiWindow(AMAVASYA, new Date(istMidnight(date.y, date.m, date.d).getTime() - 36 * 3600000));

  const evening = { start: p.sunset, end: new Date(p.sunset.getTime() + 5 * 3600000) };
  const vrishabha = lagnaWindows(VRISHABHA, evening.start, evening.end, place.lat, place.lon)[0] || null;

  let muhurat = null;
  if (vrishabha) {
    const pv = intersect(pradosh, vrishabha);
    muhurat = pv && intersect(pv, amavasya);
  }
  const fallback = !muhurat;
  if (fallback) muhurat = intersect(pradosh, amavasya);

  // Nishita (Mahanishita) Kaal: the 8th of 15 night muhurtas, around midnight.
  const nm = night / 15;
  const nishita = { start: new Date(p.sunset.getTime() + 7 * nm), end: new Date(p.sunset.getTime() + 8 * nm) };

  return { panchang: p, muhurat, fallback, pradosh, vrishabha, amavasya, nishita };
}
