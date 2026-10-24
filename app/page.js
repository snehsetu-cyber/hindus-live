import { loadStatus } from '../lib/status.js';
import { computePanchang } from '../lib/panchang.js';
import { cityBySlug, DEFAULT_CITY } from '../data/cities.js';
import { istDateParts, time, timeRel, rangeOutside } from '../lib/format.js';
import LiveBoard from './LiveBoard.js';
import SiteHeader, { SiteFooter } from './SiteHeader.js';
import { DIWALI_DATES } from '../lib/muhurat.js';

export const revalidate = 300;

function TodayPanchang() {
  const city = cityBySlug(DEFAULT_CITY);
  const date = istDateParts();
  const p = computePanchang(date, city);
  const t = p.tithis[0];
  const n = p.nakshatras[0];
  return (
    <section className="wrap today-strip" aria-label="Today's panchang">
      <a className="strip" href="/panchang">
        <h2>Today’s Panchang <span>आज का पंचांग · {city.name}</span></h2>
        <span className="s-item"><small>Tithi</small><b>{t.paksha} {t.en} · upto {timeRel(t.end, date)}</b></span>
        <span className="s-item"><small>Nakshatra</small><b>{n.en} · upto {timeRel(n.end, date)}</b></span>
        <span className="s-item"><small>Sunrise · Sunset</small><b>{time(p.sunrise)} · {time(p.sunset)}</b></span>
        <span className="s-item"><small>Rahu Kaal</small><b>{rangeOutside(p.rahuKaal, date)}</b></span>
        <span className="s-more">Full panchang & your city →</span>
      </a>
    </section>
  );
}

// Seasonal banner: shown from 30 days before Diwali until the day itself.
function FestivalBanner() {
  const t = istDateParts();
  const date = DIWALI_DATES[t.y];
  if (!date) return null;
  const days = Math.round((Date.UTC(date.y, date.m - 1, date.d) - Date.UTC(t.y, t.m - 1, t.d)) / 86400000);
  if (days < 0 || days > 30) return null;
  return (
    <div className="wrap">
      <a className="fest-banner" href="/puja/diwali-lakshmi-puja">
        <strong>Diwali Lakshmi Puja {days === 0 ? 'is today' : `in ${days} day${days === 1 ? '' : 's'}`} →</strong>
        <span>Muhurat for your city, samagri list and step-by-step vidhi</span>
      </a>
    </div>
  );
}

export default async function Home() {
  const data = await loadStatus();
  return (
    <>
      <SiteHeader />
      <main>
        <FestivalBanner />
        <LiveBoard initial={data} />
        <TodayPanchang />
      </main>
      <SiteFooter>
        Streams are embedded from the temples’ own channels and remain theirs. Aarti times are in IST and can change on
        festivals — check with the temple.
      </SiteFooter>
    </>
  );
}
