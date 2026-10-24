// Lakshmi Puja muhurat vs published 2026 timings (Drik Panchang for New Delhi; HinduTone's
// Drik-method table for other cities). Must agree within 2 minutes.
import assert from 'node:assert/strict';
import { lakshmiPujaMuhurat, DIWALI_DATES } from '../lib/muhurat.js';
import { cityBySlug } from '../data/cities.js';

const mins = (d) => { const [h, m] = d.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' }).split(':').map(Number); return h * 60 + m; };
const hm = (s) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
const ref = {
  'new-delhi': ['17:54', '19:50'], mumbai: ['18:28', '20:28'], kolkata: ['17:20', '19:19'], chennai: ['18:07', '20:09'],
  bengaluru: ['18:18', '20:20'], hyderabad: ['18:08', '20:09'], lucknow: ['17:43', '19:40'], varanasi: ['17:38', '19:35'],
  guwahati: ['17:02', '18:58'], amritsar: ['17:59', '19:53'], kochi: ['18:28', '20:27'],
};
const date = DIWALI_DATES[2026];
for (const [slug, [s, e]] of Object.entries(ref)) {
  const r = lakshmiPujaMuhurat(date, cityBySlug(slug));
  assert.ok(!r.fallback, `${slug}: expected a Vrishabha overlap`);
  assert.ok(Math.abs(mins(r.muhurat.start) - hm(s)) <= 2, `${slug} start`);
  assert.ok(Math.abs(mins(r.muhurat.end) - hm(e)) <= 2, `${slug} end`);
}
// New Delhi details (Drik Panchang): Pradosh 17:31–20:09, Amavasya from 11:27.
const d = lakshmiPujaMuhurat(date, cityBySlug('new-delhi'));
assert.ok(Math.abs(mins(d.pradosh.start) - hm('17:31')) <= 2 && Math.abs(mins(d.pradosh.end) - hm('20:09')) <= 2, 'pradosh');
assert.ok(Math.abs(mins(d.amavasya.start) - hm('11:27')) <= 2, 'amavasya start');
// Each configured Diwali date must have Amavasya prevailing at the start of Pradosh Kaal in Delhi.
for (const dt of Object.values(DIWALI_DATES)) {
  const x = lakshmiPujaMuhurat(dt, cityBySlug('new-delhi'));
  assert.ok(x.amavasya.start <= x.pradosh.start && x.amavasya.end > x.pradosh.start, `Diwali ${dt.y}: Amavasya at Pradosh`);
}
console.log('Muhurat tests passed');
