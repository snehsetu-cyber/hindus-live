import { lakshmiPujaMuhurat, DIWALI_DATES } from '../../lib/muhurat.js';
import { cities } from '../../data/cities.js';
import { time, range, rangeInside, longDate, longDateHi, istDateParts, isoDate } from '../../lib/format.js';
import SiteHeader, { SiteFooter } from '../SiteHeader.js';
import SamagriChecklist from './SamagriChecklist.js';
import CitySelect from './CitySelect.js';
import WhatsAppCTA from '../WhatsAppCTA.js';

const SITE = 'https://hindus.live';

// The festival date to show: this year's, or the latest known one.
export function festivalDate() {
  const y = istDateParts().y;
  return DIWALI_DATES[y] || DIWALI_DATES[Math.max(...Object.keys(DIWALI_DATES).map(Number))];
}

const memo = new Map();
export function muhuratFor(city, date) {
  const k = `${city.slug}|${isoDate(date)}`;
  if (!memo.has(k)) memo.set(k, lakshmiPujaMuhurat(date, city));
  return memo.get(k);
}

export function pujaMeta(puja, city, path) {
  const date = festivalDate();
  const m = muhuratFor(city, date);
  const title = `${puja.title.en} ${date.y}: Muhurat in ${city.name}, Samagri List & Vidhi`;
  const description = `${puja.title.en} on ${longDate(date)}. Muhurat in ${city.name}: ${rangeInside(m.muhurat, date)}. Full samagri list and step-by-step Lakshmi–Ganesh puja vidhi at home.`;
  return { title, description, alternates: { canonical: `${SITE}${path}` }, openGraph: { title, description, url: `${SITE}${path}` } };
}

function daysUntil(date) {
  const t = istDateParts();
  const a = Date.UTC(t.y, t.m - 1, t.d);
  const b = Date.UTC(date.y, date.m - 1, date.d);
  return Math.round((b - a) / 86400000);
}

export default function PujaView({ puja, city }) {
  const date = festivalDate();
  const m = muhuratFor(city, date);
  const days = daysUntil(date);
  const countdown = days > 1 ? `${days} days to go` : days === 1 ? 'Tomorrow' : days === 0 ? 'Today' : null;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="pan-hero">
          <div className="wrap">
            <nav className="crumbs light" aria-label="Breadcrumb"><a href="/puja">Puja Vidhi</a> › {puja.festival}</nav>
            <div className="eyebrow light">{puja.festival} {date.y}{countdown ? ` · ${countdown}` : ''}</div>
            <h1>{puja.title.en} <span lang="hi" className="h1-hi">{puja.title.hi}</span></h1>
            <p className="pan-sub">{longDate(date)} · {longDateHi(date)} · Kartik Amavasya</p>

            <div className="muhurat-card">
              <div className="mc-label">Lakshmi Puja muhurat in {city.name}</div>
              <div className="mc-time">{m.muhurat ? rangeInside(m.muhurat, date) : '—'}</div>
              {m.fallback && <div className="mc-note">No Vrishabha lagna overlaps Pradosh Kaal here; this is the Pradosh Kaal window during Amavasya.</div>}
              <dl className="mc-grid">
                <dt>Pradosh Kaal</dt><dd>{rangeInside(m.pradosh, date)}</dd>
                <dt>Vrishabha Kaal</dt><dd>{m.vrishabha ? rangeInside(m.vrishabha, date) : '—'}</dd>
                <dt>Amavasya</dt><dd>{range(m.amavasya, date)}</dd>
                <dt>Nishita Kaal</dt><dd>{rangeInside(m.nishita, date)}</dd>
                <dt>Sunset</dt><dd>{time(m.panchang.sunset)}</dd>
              </dl>
              <CitySelect cities={cities} current={city.slug} base={`/puja/${puja.slug}`} />
            </div>
          </div>
        </section>

        <div className="wrap puja-body">
          <WhatsAppCTA compact line="Get muhurat reminders for every festival on WhatsApp." />
          <nav className="toc" aria-label="On this page">
            <a href="#about">About</a><a href="#samagri">Samagri list</a><a href="#vidhi">Puja vidhi</a><a href="#tips">Tips</a><a href="#cities">All cities</a><a href="#faq">FAQ</a>
          </nav>

          <section id="about" className="prose">
            {puja.intro.map((p, i) => <p key={i}>{p}</p>)}
          </section>

          <section id="samagri" aria-labelledby="h-sam">
            <h2 id="h-sam">Samagri list <span lang="hi">पूजा सामग्री</span></h2>
            <p className="muted">Tick items as you collect them — your list is saved on this phone.</p>
            <SamagriChecklist slug={puja.slug} title={puja.title.en} groups={puja.samagri} />
          </section>

          <section id="vidhi" aria-labelledby="h-vidhi">
            <h2 id="h-vidhi">Step-by-step puja vidhi <span lang="hi">पूजा विधि</span></h2>
            <ol className="steps">
              {puja.steps.map((s, i) => (
                <li key={i}>
                  <h3>{s.title} <span lang="hi">{s.hi}</span>{s.when && <small>{s.when}</small>}</h3>
                  <p>{s.text}</p>
                  {s.mantra && <p className="mantra" lang="hi">{s.mantra}</p>}
                  {s.links && (
                    <p className="step-links">
                      {s.links.map(([label, href]) => <a key={href} href={href}>{label} lyrics →</a>)}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>

          <section id="tips" aria-labelledby="h-tips">
            <h2 id="h-tips">Good to know</h2>
            <ul className="tips">{puja.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
          </section>

          <section id="cities" aria-labelledby="h-cities">
            <h2 id="h-cities">Lakshmi Puja muhurat {date.y}, city by city</h2>
            <div className="table-wrap">
              <table className="mtable">
                <thead><tr><th scope="col">City</th><th scope="col">Muhurat</th><th scope="col">Pradosh Kaal</th></tr></thead>
                <tbody>
                  {cities.map((c) => {
                    const x = muhuratFor(c, date);
                    return (
                      <tr key={c.slug} className={c.slug === city.slug ? 'current' : ''}>
                        <th scope="row"><a href={`/puja/${puja.slug}/${c.slug}`}>{c.name}</a></th>
                        <td>{x.muhurat ? rangeInside(x.muhurat, date) : '—'}</td>
                        <td>{rangeInside(x.pradosh, date)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section id="faq" aria-labelledby="h-faq">
            <h2 id="h-faq">Questions</h2>
            {puja.faqs.map(([q, a], i) => (
              <details key={i} className="faq">
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </section>

          <p className="aarti-live"><a href={`/panchang/${city.slug}/${isoDate(date)}`}>Full panchang for {longDate(date)} in {city.name} →</a></p>
        </div>
      </main>
      <SiteFooter>
        Muhurat calculated for {city.name} with the Drik method: Pradosh Kaal, overlapped with the fixed Vrishabha lagna, while
        Amavasya prevails (Lahiri ayanamsa, times in IST, rounded inward to the minute so you never start early or finish late). Customs differ between regions and families — follow your family’s
        tradition where it differs.
      </SiteFooter>
    </>
  );
}
