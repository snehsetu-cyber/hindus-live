// IST formatting helpers. Times are rounded to the nearest minute, as panchangs do.
const TZ = 'Asia/Kolkata';
const IST_MS = 330 * 60000;
const round = (d) => new Date(Math.round(d.getTime() / 60000) * 60000);

export function istDateParts(d = new Date()) {
  const t = new Date(d.getTime() + IST_MS);
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}
export const isoDate = ({ y, m, d }) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
export function parseIsoDate(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s || '');
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const check = new Date(Date.UTC(y, mo - 1, d));
  if (check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null;
  if (y < 1900 || y > 2100) return null;
  return { y, m: mo, d };
}
export function addDays({ y, m, d }, n) {
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

export function time(d) {
  if (!d) return '—';
  return round(d).toLocaleTimeString('en-IN', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
}
// "1:37 PM", or "12:51 AM, 25 Oct" when it falls on a different IST day than `ref`.
export function timeRel(d, ref) {
  if (!d) return '—';
  const a = istDateParts(round(d));
  const b = ref;
  const same = a.y === b.y && a.m === b.m && a.d === b.d;
  if (same) return time(d);
  const day = round(d).toLocaleDateString('en-IN', { timeZone: TZ, day: 'numeric', month: 'short' });
  return `${time(d)}, ${day}`;
}
export const range = (p, ref) => `${timeRel(p.start, ref)} – ${timeRel(p.end, ref)}`;

export function longDate({ y, m, d }) {
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-IN', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
}
export function longDateHi({ y, m, d }) {
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('hi-IN', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric' });
}
export function duration(ms) {
  const min = Math.round(ms / 60000);
  return `${Math.floor(min / 60)}h ${min % 60}m`;
}

// Auspicious windows are rounded inward (start up, end down) so a shown time is never outside
// the window; inauspicious windows (Rahu Kaal etc.) are rounded outward for the same reason.
const ceilMin = (d) => new Date(Math.ceil(d.getTime() / 60000) * 60000);
const floorMin = (d) => new Date(Math.floor(d.getTime() / 60000) * 60000);
export const rangeInside = (p, ref) => `${timeRel(ceilMin(p.start), ref)} – ${timeRel(floorMin(p.end), ref)}`;
export const rangeOutside = (p, ref) => `${timeRel(floorMin(p.start), ref)} – ${timeRel(ceilMin(p.end), ref)}`;
