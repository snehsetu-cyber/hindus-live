import { loadStatus } from '../lib/status.js';
import { computePanchang } from '../lib/panchang.js';
import { lakshmiPujaMuhurat, DIWALI_DATES } from '../lib/muhurat.js';
import { cityBySlug, DEFAULT_CITY } from '../data/cities.js';
import { aartis } from '../data/aartis.js';
import { istDateParts, time, timeRel, rangeInside, rangeOutside, longDate } from '../lib/format.js';
import LiveBoard from './LiveBoard.js';
import WhatsAppCTA from './WhatsAppCTA.js';
import SiteHeader, { SiteFooter } from './SiteHeader.js';

export const revalidate = 300;

const PAKSHA = { Shukla: 'शुक्ल', Krishna: 'कृष्ण' };

function greetingHi() {
  const h = new Date(Date.now() + 330 * 60000).getUTCHours();
  if (h >= 4 && h < 12) return 'शुभ प्रभात';
  if (h >= 12 && h < 16) return 'शुभ दोपहर';
  if (h >= 16 && h < 20) return 'शुभ संध्या';
  return 'शुभ रात्रि';
}

function Greeting({ p, date, city }) {
  const t = p.tithis[0];
  const mo = p.month.purnimanta;
  return (
    <section className="wrap greet">
      <div className="eyebrow">{greetingHi()} · {p.weekday.en}, {longDate(date).replace(/ \d{4}$/, '')}</div>
      <h1 lang="hi">{mo.adhika ? 'अधिक ' : ''}{mo.hi} {PAKSHA[t.paksha]} {t.hi}</h1>
      <p>Vikram Samvat {p.samvat.vikram} · {city.name}</p>
    </section>
  );
}

function DiwaliCard({ city }) {
  const t = istDateParts();
  const date = DIWALI_DATES[t.y];
  if (!date) return null;
  const days = Math.round((Date.UTC(date.y, date.m - 1, date.d) - Date.UTC(t.y, t.m - 1, t.d)) / 86400000);
  if (days < 0 || days > 30) return null;
  const m = lakshmiPujaMuhurat(date, city);
  return (
    <a className="diwali-card" href="/puja/diwali-lakshmi-puja">
      <svg width="130" height="130" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 14c14 18 14 32 0 46-14-14-14-28 0-46z" fill="#FFC870" />
        <path d="M18 78h84c-4 18-22 28-42 28S22 96 18 78z" fill="#FFC870" />
      </svg>
      <div className="dc-eyebrow">दीपावली · {days === 0 ? 'TODAY' : `${days} DAY${days === 1 ? '' : 'S'} TO GO`}</div>
      <div className="dc-title" lang="hi">लक्ष्मी पूजा</div>
      <div className="dc-sub">{longDate(date)} · muhurat {m.muhurat ? rangeInside(m.muhurat, date) : ''} ({city.name})</div>
      <span className="dc-cta">Samagri list &amp; vidhi →</span>
    </a>
  );
}

function PanchangCard({ p, date, city }) {
  const t = p.tithis[0];
  const n = p.nakshatras[0];
  return (
    <section className="panchang-card" aria-labelledby="h-pc">
      <div className="pc-head">
        <h2 id="h-pc" lang="hi">आज का पंचांग</h2>
        <a className="more" href="/panchang">Full panchang →</a>
      </div>
      <dl className="pc-grid">
        <div><dt>Tithi</dt><dd>{t.en} · till {timeRel(t.end, date)}</dd></div>
        <div><dt>Nakshatra</dt><dd>{n.en} · till {timeRel(n.end, date)}</dd></div>
        <div><dt>Sunrise · Sunset</dt><dd>{time(p.sunrise)} · {time(p.sunset)}</dd></div>
        <div><dt>Rahu Kaal</dt><dd>{rangeOutside(p.rahuKaal, date)}</dd></div>
      </dl>
      <p className="muted small" style={{ margin: '12px 0 0' }}>{city.name} · <a href="/panchang">change city</a></p>
    </section>
  );
}

// First akshar of a Hindi word, e.g. शिव → शि, कृष्ण → कृ
const akshar = (w) => (w.match(/^.[ऺ-ॏऀ-ःॕ-ॗ]*/u) || [w[0]])[0];

function Deities() {
  const deities = [...new Map(aartis.map((a) => [a.deity.en, a.deity])).values()];
  return (
    <section className="wrap deities" aria-labelledby="h-deities">
      <div className="ornament"><h2 id="h-deities" lang="hi">आरती संग्रह</h2></div>
      <ul className="deity-grid">
        {deities.map((d) => (
          <li key={d.en}>
            <a href={`/aarti#d-${d.en}`}>
              <span className="letter" lang="hi" aria-hidden="true">{akshar(d.hi)}</span>
              <span className="name">{d.en}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function Home() {
  const data = await loadStatus();
  const city = cityBySlug(DEFAULT_CITY);
  const date = istDateParts();
  const p = computePanchang(date, city);
  return (
    <>
      <SiteHeader />
      <main>
        <Greeting p={p} date={date} city={city} />
        <LiveBoard
          initial={data}
          middle={
            <>
              <div className="wrap home-cards">
                <DiwaliCard city={city} />
                <PanchangCard p={p} date={date} city={city} />
              </div>
              <Deities />
              <div className="wrap"><WhatsAppCTA line="Today’s panchang, Rahu Kaal and festival muhurat every morning at 6 AM. Free, no spam." /></div>
            </>
          }
        />
      </main>
      <SiteFooter>
        Streams are embedded from the temples’ own channels and remain theirs. Aarti times are in IST and can change on
        festivals — check with the temple.
      </SiteFooter>
    </>
  );
}
