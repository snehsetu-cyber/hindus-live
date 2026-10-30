import { computePanchang } from '../../lib/panchang.js';
import { PAKSHA_HI } from '../../lib/panchang-names.js';
import { cities } from '../../data/cities.js';
import { time, timeRel, range, rangeInside, rangeOutside, longDate, longDateHi, isoDate, addDays, duration } from '../../lib/format.js';
import SiteHeader, { SiteFooter } from '../SiteHeader.js';
import CityPicker from './CityPicker.js';
import WhatsAppCTA from '../WhatsAppCTA.js';

const SITE = 'https://hindus.live';

export function panchangFor(city, date) {
  return computePanchang(date, { lat: city.lat, lon: city.lon });
}

const monthLabel = (mo) => `${mo.adhika ? 'Adhika ' : ''}${mo.en}`;
const monthLabelHi = (mo) => `${mo.adhika ? 'अधिक ' : ''}${mo.hi}`;

export function panchangMeta(city, date, p, path) {
  const t = p.tithis[0];
  const n = p.nakshatras[0];
  const title = `Aaj ka Panchang ${longDate(date)}, ${city.name} – Tithi, Nakshatra, Rahu Kaal`;
  const description =
    `${p.weekday.en}, ${longDate(date)} panchang for ${city.name}: ${t.paksha} ${t.en} tithi upto ${timeRel(t.end, date)}, ` +
    `${n.en} nakshatra upto ${timeRel(n.end, date)}, sunrise ${time(p.sunrise)}, sunset ${time(p.sunset)}, ` +
    `Rahu Kaal ${rangeOutside(p.rahuKaal, date)}. ${monthLabel(p.month.purnimanta)} month, Vikram Samvat ${p.samvat.vikram}.`;
  return { title, description, alternates: { canonical: `${SITE}${path}` }, openGraph: { title, description, url: `${SITE}${path}` } };
}

function Segments({ items, date, nameOf }) {
  return (
    <ul className="segs">
      {items.map((s, i) => (
        <li key={i}>
          <span className="seg-name">{nameOf(s)}</span>
          <span className="seg-end">upto {timeRel(s.end, date)}</span>
        </li>
      ))}
    </ul>
  );
}

function Row({ label, hi, children }) {
  return (
    <div className="prow">
      <div className="plabel">{label}<span>{hi}</span></div>
      <div className="pval">{children}</div>
    </div>
  );
}

export default function PanchangView({ city, date, isToday }) {
  const p = panchangFor(city, date);
  const t0 = p.tithis[0];
  const prev = addDays(date, -1);
  const next = addDays(date, 1);
  const otherCities = cities.filter((c) => c.slug !== city.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pan-hero">
          <div className="wrap">
            <div className="eyebrow light">{isToday ? 'Aaj ka Panchang · आज का पंचांग' : 'Panchang · पंचांग'}</div>
            <h1>{p.weekday.en}, {longDate(date)}</h1>
            <p className="pan-sub">{p.weekday.hi}, {longDateHi(date)} · {city.name} ({city.hi})</p>
            <p className="pan-hindu">
              {monthLabel(p.month.purnimanta)} {t0.paksha} {t0.en} · Vikram Samvat {p.samvat.vikram}
              <span>{monthLabelHi(p.month.purnimanta)} {PAKSHA_HI[t0.paksha]} {t0.hi} · विक्रम संवत {p.samvat.vikram}</span>
            </p>
            <CityPicker cities={cities} city={city.slug} date={isoDate(date)} />
            <nav className="daynav" aria-label="Change day">
              <a href={`/panchang/${city.slug}/${isoDate(prev)}`}>← {longDate(prev)}</a>
              {!isToday && <a href={`/panchang/${city.slug}`}>Today</a>}
              <a href={`/panchang/${city.slug}/${isoDate(next)}`}>{longDate(next)} →</a>
            </nav>
          </div>
        </section>

        <div className="wrap"><WhatsAppCTA compact line="Get this panchang on WhatsApp every morning at 6 AM." /></div>

        <div className="wrap pan-grid">
          <section className="pcard wide" aria-labelledby="h-panch">
            <h2 id="h-panch">Panchang <span>पंचांग</span></h2>
            <Row label="Tithi" hi="तिथि">
              <Segments items={p.tithis} date={date} nameOf={(s) => <>{s.paksha} {s.en} <em>{s.hi}</em></>} />
            </Row>
            <Row label="Nakshatra" hi="नक्षत्र">
              <Segments items={p.nakshatras} date={date} nameOf={(s) => <>{s.en} <em>{s.hi}</em></>} />
            </Row>
            <Row label="Yoga" hi="योग">
              <Segments items={p.yogas} date={date} nameOf={(s) => <>{s.en} <em>{s.hi}</em></>} />
            </Row>
            <Row label="Karana" hi="करण">
              <Segments items={p.karanas} date={date} nameOf={(s) => <>{s.en} <em>{s.hi}</em></>} />
            </Row>
            <Row label="Vara" hi="वार">
              <span className="seg-name">{p.weekday.en} <em>{p.weekday.hi}</em></span>
            </Row>
          </section>

          <section className="pcard" aria-labelledby="h-sun">
            <h2 id="h-sun">Sun &amp; Moon <span>सूर्य और चंद्र</span></h2>
            <dl className="kv">
              <dt>Sunrise · सूर्योदय</dt><dd>{time(p.sunrise)}</dd>
              <dt>Sunset · सूर्यास्त</dt><dd>{time(p.sunset)}</dd>
              <dt>Moonrise · चंद्रोदय</dt><dd>{p.moonrise ? time(p.moonrise) : 'No moonrise'}</dd>
              <dt>Moonset · चंद्रास्त</dt><dd>{p.moonset ? time(p.moonset) : 'No moonset'}</dd>
              <dt>Day length</dt><dd>{duration(p.sunset - p.sunrise)}</dd>
            </dl>
          </section>

          <section className="pcard good" aria-labelledby="h-shubh">
            <h2 id="h-shubh">Auspicious time <span>शुभ मुहूर्त</span></h2>
            <dl className="kv">
              <dt>Abhijit Muhurat · अभिजित</dt><dd>{rangeInside(p.abhijit, date)}</dd>
              <dt>Brahma Muhurat · ब्रह्म</dt><dd>{rangeInside(p.brahmaMuhurta, date)}</dd>
            </dl>
          </section>

          <section className="pcard bad" aria-labelledby="h-ashubh">
            <h2 id="h-ashubh">Inauspicious time <span>अशुभ काल</span></h2>
            <dl className="kv">
              <dt>Rahu Kaal · राहुकाल</dt><dd>{rangeOutside(p.rahuKaal, date)}</dd>
              <dt>Yamaganda · यमगण्ड</dt><dd>{rangeOutside(p.yamaganda, date)}</dd>
              <dt>Gulika Kaal · गुलिक</dt><dd>{rangeOutside(p.gulika, date)}</dd>
            </dl>
          </section>

          <section className="pcard" aria-labelledby="h-cal">
            <h2 id="h-cal">Hindu calendar <span>हिंदू कैलेंडर</span></h2>
            <dl className="kv">
              <dt>Month (Purnimanta) · मास</dt><dd>{monthLabel(p.month.purnimanta)} · {monthLabelHi(p.month.purnimanta)}</dd>
              <dt>Month (Amanta)</dt><dd>{monthLabel(p.month.amanta)} · {monthLabelHi(p.month.amanta)}</dd>
              <dt>Paksha · पक्ष</dt><dd>{t0.paksha} · {PAKSHA_HI[t0.paksha]}</dd>
              <dt>Vikram Samvat</dt><dd>{p.samvat.vikram}</dd>
              <dt>Shaka Samvat</dt><dd>{p.samvat.shaka}</dd>
              <dt>Sun sign · सूर्य राशि</dt><dd>{p.sunSign.en} · {p.sunSign.hi}</dd>
              <dt>Moon sign · चंद्र राशि</dt>
              <dd>
                {p.moonSigns.map((s, i) => (
                  <span key={i} className="block">{s.en} · {s.hi}{p.moonSigns.length > 1 && i === 0 ? ` upto ${timeRel(s.end, date)}` : ''}</span>
                ))}
              </dd>
            </dl>
          </section>
        </div>

        <section className="wrap other-cities" aria-labelledby="h-cities">
          <h2 id="h-cities">Panchang for other cities</h2>
          <ul>
            {otherCities.map((c) => (
              <li key={c.slug}>
                <a href={isToday ? `/panchang/${c.slug}` : `/panchang/${c.slug}/${isoDate(date)}`}>{c.name}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter>
        Calculated for {city.name} ({city.lat.toFixed(2)}°N, {city.lon.toFixed(2)}°E) using Lahiri ayanamsa. All times in IST,
        rounded to the nearest minute; muhurat windows are rounded inward and Rahu Kaal, Yamaganda and Gulika outward. Tithi, nakshatra, yoga and karana end times are shown as “upto”; elements are listed from
        sunrise to the next sunrise. For festival and vrat dates, follow your family or temple tradition.
      </SiteFooter>
    </>
  );
}
