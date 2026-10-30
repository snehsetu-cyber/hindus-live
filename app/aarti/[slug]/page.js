import { notFound } from 'next/navigation';
import { aartis, aartiBySlug, KIND_LABEL } from '../../../data/aartis.js';
import SiteHeader, { SiteFooter } from '../../SiteHeader.js';
import Reader from '../Reader.js';
import WhatsAppCTA from '../../WhatsAppCTA.js';

const SITE = 'https://hindus.live';
export const dynamicParams = false;

export function generateStaticParams() {
  return aartis.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const a = aartiBySlug(slug);
  if (!a) return {};
  const kind = KIND_LABEL[a.kind];
  const language = a.lang === 'mr' ? 'Marathi' : 'Hindi';
  const name = a.title.en.toLowerCase().includes(kind.toLowerCase()) ? a.title.en : `${a.title.en} ${kind}`;
  const title = `${name} Lyrics in ${language} | ${a.title.hi}`;
  const first = (a.refrain || a.blocks[0].lines).slice(0, 2).join(' ');
  const description = `Full lyrics of ${a.title.en} (${a.title.hi}), the ${a.deity.en} ${kind.toLowerCase()}: ${first}`;
  return { title, description, alternates: { canonical: `${SITE}/aarti/${slug}` }, openGraph: { title, description, url: `${SITE}/aarti/${slug}` } };
}

// Short form of the refrain to show between verses: first line up to the first comma.
const refrainCue = (r) => r[0].split(/[,।]/)[0].trim();

export default async function AartiPage({ params }) {
  const { slug } = await params;
  const a = aartiBySlug(slug);
  if (!a) notFound();
  const lang = a.lang || 'hi';
  const related = aartis.filter((x) => x.slug !== a.slug && x.deity.en === a.deity.en);
  const others = aartis.filter((x) => x.slug !== a.slug && x.deity.en !== a.deity.en);
  let n = 0;

  return (
    <>
      <SiteHeader />
      <main className="wrap aarti-page">
        <nav className="crumbs" aria-label="Breadcrumb"><a href="/aarti">Aarti Sangrah</a> › {a.deity.en}</nav>
        <h1 lang={lang}>{a.title.hi}</h1>
        <p className="aarti-sub">{a.title.en} · {a.deity.en} {KIND_LABEL[a.kind]} <span lang="hi">({a.deity.hi})</span></p>
        <p className="aarti-when">{a.when}</p>

        <Reader title={`${a.title.hi} (${a.title.en})`}>
          <div lang={lang}>
            {a.refrain && !a.refrainAfter && (
              <div className="stanza refrain">{a.refrain.map((l, i) => <p key={i}>{l}</p>)}</div>
            )}
            {a.blocks.map((b, bi) => (
              <div key={bi}>
                {b.label && <div className="stanza-label">{b.label}</div>}
                {b.numbered ? (
                  <ol className="chaupai">
                    {b.lines.map((l, i) => {
                      n += 1;
                      return <li key={i} value={n}>{l.split('। ').map((h, k, arr) => <span key={k}>{h}{k < arr.length - 1 ? '।' : ''}</span>)}</li>;
                    })}
                  </ol>
                ) : (
                  <div className="stanza">{b.lines.map((l, i) => <p key={i}>{l}</p>)}</div>
                )}
                {a.refrain && a.refrainAfter && bi === 0 && (
                  <div className="stanza refrain">{a.refrain.map((l, i) => <p key={i}>{l}</p>)}</div>
                )}
                {a.refrain && !(a.refrainAfter && bi === 0) && (
                  <p className="cue">॥ {refrainCue(a.refrain)}… ॥</p>
                )}
              </div>
            ))}
          </div>
        </Reader>

        <WhatsAppCTA compact line="Daily panchang and festival aarti, every morning on WhatsApp." />

        <dl className="aarti-meta">
          <dt>Written by</dt><dd>{a.author}</dd>
          {a.variants && (<><dt>Other versions</dt><dd>{a.variants}</dd></>)}
        </dl>

        {related.length > 0 && (
          <section className="aarti-more" aria-labelledby="h-rel">
            <h2 id="h-rel">More for {a.deity.en}</h2>
            <ul className="aarti-cards">
              {related.map((x) => (
                <li key={x.slug}><a className="aarti-card" href={`/aarti/${x.slug}`}><span className="kind">{KIND_LABEL[x.kind]}</span><strong lang={x.lang || 'hi'}>{x.title.hi}</strong><span className="muted">{x.title.en}</span></a></li>
              ))}
            </ul>
          </section>
        )}
        <section className="aarti-more" aria-labelledby="h-all">
          <h2 id="h-all">Other aartis</h2>
          <ul className="aarti-cards">
            {others.map((x) => (
              <li key={x.slug}><a className="aarti-card" href={`/aarti/${x.slug}`}><span className="kind">{x.deity.en}</span><strong lang={x.lang || 'hi'}>{x.title.hi}</strong><span className="muted">{x.title.en}</span></a></li>
            ))}
          </ul>
        </section>
        <p className="aarti-live"><a href="/#live">Watch live aarti from temples →</a></p>
      </main>
      <SiteFooter>
        A traditional text in the public domain. Wording differs a little between printed editions; the main variants are noted
        above.
      </SiteFooter>
    </>
  );
}
