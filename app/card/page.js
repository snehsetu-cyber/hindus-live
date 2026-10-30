// Daily panchang card for WhatsApp, Instagram and Facebook: hindus.live/card
// (not linked from the site, not indexed). Builds the card's text on the server;
// DailyCard draws it as an image in the browser, which shapes Devanagari correctly.
import { computePanchang } from '../../lib/panchang.js';
import { pradoshMuhurat } from '../../lib/muhurat.js';
import { upcomingPujas } from '../../lib/upcoming.js';
import { cities, cityBySlug, DEFAULT_CITY } from '../../data/cities.js';
import { istDateParts, isoDate, parseIsoDate, addDays, longDateHi } from '../../lib/format.js';
import { hiClock, hiUntil, hiRangeInside, hiRangeOutside, hiDayMonth } from '../../lib/hindi.js';
import DailyCard from './DailyCard.js';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Daily panchang card · Hindus.live', robots: { index: false, follow: false } };

const PAKSHA = { Shukla: 'शुक्ल', Krishna: 'कृष्ण' };
const SITE = 'hindus.live';

function buildCard(city, date) {
  const p = computePanchang(date, city);
  const t = p.tithis[0];
  const n = p.nakshatras[0];
  const yg = p.yogas[0];
  const mo = p.month.purnimanta;
  const hinduDate = `${mo.adhika ? 'अधिक ' : ''}${mo.hi} ${PAKSHA[t.paksha]} ${t.hi}`;

  const rows = [
    { label: 'तिथि', value: `${t.hi} · ${hiUntil(t.end, date)}` },
    { label: 'नक्षत्र', value: `${n.hi} · ${hiUntil(n.end, date)}` },
    { label: 'योग', value: `${yg.hi} · ${hiUntil(yg.end, date)}` },
    { label: 'सूर्योदय · सूर्यास्त', value: `${hiClock(p.sunrise)} · ${hiClock(p.sunset)}`, caption: `सूर्योदय: ${hiClock(p.sunrise)} · सूर्यास्त: ${hiClock(p.sunset)}` },
    { label: 'राहुकाल', value: hiRangeOutside(p.rahuKaal), tone: 'bad' },
    { label: 'अभिजित मुहूर्त', value: hiRangeInside(p.abhijit), tone: 'good' },
  ];

  // Festival line: the next puja guide within 10 days of this date.
  const next = upcomingPujas(date, 10)[0];
  let festival = null;
  let festivalCaption = '';
  if (next) {
    const m = pradoshMuhurat(next.puja.muhurat, next.date, city);
    const when = next.days === 0 ? 'आज' : next.days === 1 ? 'कल' : `${next.days} दिन बाद`;
    const range = m.muhurat ? hiRangeInside(m.muhurat) : '';
    festival = `${next.puja.festivalHi} ${when} · पूजा मुहूर्त ${range}`;
    festivalCaption = `${next.puja.festivalHi} ${when} (${hiDayMonth(next.date)}) — ${next.puja.title.hi} का मुहूर्त ${range}। सामग्री और विधि: ${SITE}/puja/${next.puja.slug}`;
  }

  const dateHi = longDateHi(date);
  const panchangLink = city.slug === DEFAULT_CITY ? `${SITE}/panchang` : `${SITE}/panchang/${city.slug}`;
  const caption = [
    `🪔 आज का पंचांग — ${p.weekday.hi}, ${dateHi}`,
    `${hinduDate}, विक्रम संवत ${p.samvat.vikram}`,
    '',
    ...rows.map((r) => r.caption || `${r.label}: ${r.value.replace(' · ', ' — ')}`),
    ...(festivalCaption ? ['', festivalCaption] : []),
    '',
    `(${city.hi} के अनुसार) अपने शहर का पंचांग: ${panchangLink}`,
  ].join('\n');

  return {
    iso: isoDate(date),
    citySlug: city.slug,
    cityHi: city.hi,
    weekdayHi: p.weekday.hi,
    dateHi,
    hinduDate,
    samvat: `विक्रम संवत ${p.samvat.vikram}`,
    rows,
    festival,
    caption,
  };
}

export default async function CardPage({ searchParams }) {
  const sp = await searchParams;
  const city = cityBySlug(sp?.city) || cityBySlug(DEFAULT_CITY);
  const today = istDateParts();
  const date = parseIsoDate(sp?.date) || today;
  const card = buildCard(city, date);
  return (
    <DailyCard
      card={card}
      cities={cities.map((c) => ({ slug: c.slug, name: c.name, hi: c.hi }))}
      todayIso={isoDate(today)}
      tomorrowIso={isoDate(addDays(today, 1))}
    />
  );
}
