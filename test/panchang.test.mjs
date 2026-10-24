// Checks the panchang engine against published panchangs for New Delhi.
// References: grahaguru.in / ishvaram.com (24 Oct 2026), panchangbodh.com (25 Oct 2026).
// End times must agree within 2 minutes.
import assert from 'node:assert/strict';
import { computePanchang } from '../lib/panchang.js';

const DELHI = { lat: 28.61, lon: 77.21 };
const ist = (d) => d.toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit' });
const near = (d, hhmm, label, tol = 2) => {
  const [h, m] = hhmm.split(':').map(Number);
  const t = new Date(d);
  const ref = new Date(t);
  // compare minutes-of-day in IST
  const got = Number(ist(t).slice(0, 2)) * 60 + Number(ist(t).slice(3));
  const want = h * 60 + m;
  assert.ok(Math.abs(got - want) <= tol, `${label}: got ${ist(ref)}, expected ${hhmm}`);
};

let p = computePanchang({ y: 2026, m: 10, d: 24 }, DELHI);
near(p.sunrise, '06:27', 'sunrise 24 Oct');
near(p.sunset, '17:43', 'sunset 24 Oct');
assert.equal(p.tithis[0].en, 'Trayodashi'); assert.equal(p.tithis[0].paksha, 'Shukla');
near(p.tithis[0].end, '13:37', 'tithi end');
assert.equal(p.nakshatras[0].en, 'Uttara Bhadrapada'); near(p.nakshatras[0].end, '20:32', 'nakshatra end');
assert.equal(p.yogas[0].en, 'Vyaghata'); near(p.yogas[0].end, '20:01', 'yoga end');
assert.equal(p.karanas[0].en, 'Taitila');
near(p.rahuKaal.start, '09:16', 'rahu start'); near(p.rahuKaal.end, '10:41', 'rahu end');
near(p.yamaganda.start, '13:30', 'yamaganda'); near(p.gulika.start, '06:27', 'gulika');
near(p.abhijit.start, '11:43', 'abhijit start'); near(p.abhijit.end, '12:28', 'abhijit end');
assert.equal(p.month.amanta.en, 'Ashwin'); assert.equal(p.samvat.vikram, 2083); assert.equal(p.samvat.shaka, 1948);

p = computePanchang({ y: 2026, m: 10, d: 25 }, DELHI);
near(p.moonrise, '16:56', 'moonrise 25 Oct'); near(p.moonset, '05:21', 'moonset 25 Oct');
assert.equal(p.tithis[0].en, 'Chaturdashi'); near(p.tithis[0].end, '11:58', 'tithi end 25 Oct');
assert.equal(p.tithis[1].en, 'Purnima');
assert.equal(p.nakshatras[0].en, 'Revati'); near(p.nakshatras[0].end, '19:22', 'nakshatra end 25 Oct');
assert.equal(p.yogas[0].en, 'Harshana'); near(p.yogas[0].end, '17:21', 'yoga end 25 Oct');
near(p.rahuKaal.start, '16:17', 'rahu 25 Oct (Sunday)');

// Adhika Jyeshtha 2026 (17 May – 15 Jun): Krishna paksha keeps the adhika name in purnimanta too.
p = computePanchang({ y: 2026, m: 6, d: 1 }, DELHI);
assert.equal(p.month.amanta.en, 'Jyeshtha'); assert.equal(p.month.amanta.adhika, true);
assert.equal(p.month.purnimanta.en, 'Jyeshtha'); assert.equal(p.month.purnimanta.adhika, true);

// Krishna paksha after Ashwin Purnima: amanta Ashwin, purnimanta Kartika.
p = computePanchang({ y: 2026, m: 11, d: 1 }, DELHI);
assert.equal(p.month.amanta.en, 'Ashwin'); assert.equal(p.month.purnimanta.en, 'Kartika');

// Samvat year changes at Chaitra Shukla Pratipada.
assert.equal(computePanchang({ y: 2026, m: 1, d: 15 }, DELHI).samvat.vikram, 2082);

console.log('Panchang tests passed');
