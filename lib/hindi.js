// Hindi time phrases for captions and cards: "शाम 7:25", "कल सुबह 10:48 तक".
import { istDateParts } from './format.js';

const IST_MS = 330 * 60000;
const roundMs = (d, mode) => {
  const t = d.getTime() / 60000;
  return (mode === 'ceil' ? Math.ceil(t) : mode === 'floor' ? Math.floor(t) : Math.round(t)) * 60000;
};

export function hiClock(d, mode = 'round') {
  const t = new Date(roundMs(d, mode) + IST_MS);
  const h = t.getUTCHours();
  const m = t.getUTCMinutes();
  const period = h < 4 ? 'रात' : h < 12 ? 'सुबह' : h < 16 ? 'दोपहर' : h < 20 ? 'शाम' : 'रात';
  return `${period} ${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')}`;
}

// "शाम 7:25 तक", or "कल सुबह 10:48 तक" when it ends on the next IST day.
export function hiUntil(d, ref) {
  const a = istDateParts(new Date(roundMs(d)));
  const same = a.y === ref.y && a.m === ref.m && a.d === ref.d;
  return `${same ? '' : 'कल '}${hiClock(d)} तक`;
}

// Auspicious windows rounded inward, inauspicious outward (as on the site).
export const hiRangeInside = (p) => `${hiClock(p.start, 'ceil')} – ${hiClock(p.end, 'floor')}`;
export const hiRangeOutside = (p) => `${hiClock(p.start, 'floor')} – ${hiClock(p.end, 'ceil')}`;

export function hiDayMonth({ y, m, d }) {
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('hi-IN', { timeZone: 'UTC', day: 'numeric', month: 'long' });
}
