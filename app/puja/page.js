import { pujas } from '../../data/pujas.js';
import SiteHeader, { SiteFooter } from '../SiteHeader.js';

export const metadata = {
  title: 'Puja Vidhi at Home – Step-by-Step Guides, Samagri Lists & Muhurat | Hindus.live',
  description: 'Step-by-step guides to doing festival pujas at home, with the samagri list and the muhurat for your city.',
  alternates: { canonical: 'https://hindus.live/puja' },
};

export default function PujaIndex() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="pan-hero">
          <div className="wrap">
            <div className="eyebrow light">Puja Vidhi · पूजा विधि</div>
            <h1>How to do the puja at home</h1>
            <p className="pan-sub">Step-by-step vidhi, samagri list and muhurat for your city</p>
          </div>
        </section>
        <div className="wrap aarti-index">
          <ul className="aarti-cards">
            {pujas.map((p) => (
              <li key={p.slug}>
                <a className="aarti-card" href={`/puja/${p.slug}`}>
                  <span className="kind">{p.festival}</span>
                  <strong>{p.title.en}</strong>
                  <span lang="hi">{p.title.hi}</span>
                  <span className="muted">{p.summary}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="muted">More festival pujas are on the way.</p>
        </div>
      </main>
      <SiteFooter>Customs differ between regions and families — follow your family’s tradition where it differs.</SiteFooter>
    </>
  );
}
