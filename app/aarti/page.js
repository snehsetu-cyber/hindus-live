import { aartis, KIND_LABEL } from '../../data/aartis.js';
import SiteHeader, { SiteFooter } from '../SiteHeader.js';

const SITE = 'https://hindus.live';

export const metadata = {
  title: 'Aarti Lyrics in Hindi – Jagdish, Ganesh, Shiv, Durga, Hanuman Chalisa | Hindus.live',
  description:
    'Read the full lyrics of the most loved aartis in Hindi: Om Jai Jagdish Hare, Jai Ganesh Deva, Om Jai Shiv Omkara, Jai Ambe Gauri, Aarti Kunj Bihari Ki, Hanuman Chalisa and more.',
  alternates: { canonical: `${SITE}/aarti` },
};

export default function AartiIndex() {
  const deities = [...new Map(aartis.map((a) => [a.deity.en, a.deity])).values()];
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pan-hero">
          <div className="wrap">
            <div className="eyebrow light">Aarti Sangrah · आरती संग्रह</div>
            <h1>Aarti &amp; Chalisa lyrics</h1>
            <p className="pan-sub">आरती, चालीसा और स्तुति — पूरे पाठ के साथ</p>
          </div>
        </section>
        <div className="wrap aarti-index">
          {deities.map((d) => (
            <section key={d.en} aria-labelledby={`d-${d.en}`}>
              <h2 id={`d-${d.en}`}>{d.en} <span>{d.hi}</span></h2>
              <ul className="aarti-cards">
                {aartis.filter((a) => a.deity.en === d.en).map((a) => (
                  <li key={a.slug}>
                    <a href={`/aarti/${a.slug}`} className="aarti-card">
                      <span className="kind">{KIND_LABEL[a.kind]}</span>
                      <strong lang={a.lang || 'hi'}>{a.title.hi}</strong>
                      <span className="muted">{a.title.en}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter>
        These are traditional texts, many centuries old. Wording differs a little between printed editions; we note the
        main variants on each page.
      </SiteFooter>
    </>
  );
}
