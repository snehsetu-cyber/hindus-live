'use client';

import { useEffect, useMemo, useState } from 'react';
import { upcomingAartis, formatAway, format12h } from '../lib/schedule.js';

const REFETCH_MS = 2 * 60 * 1000; // re-check live status every 2 minutes
const TICK_MS = 30 * 1000; // refresh countdowns every 30 seconds

function Player({ temple }) {
  const s = temple.status;
  if (s.videoId && s.embeddable) {
    return (
      <div className="player">
        {s.state === 'live' && <span className="live-pill">● LIVE DARSHAN</span>}
        <iframe
          src={`https://www.youtube.com/embed/${s.videoId}?autoplay=1&mute=1&rel=0`}
          title={`${temple.name} live darshan`}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  return (
    <div className="player player-empty">
      <p>{s.videoId ? 'This temple has turned off embedding.' : 'Demo mode — add a YouTube API key to load real streams.'}</p>
      <a className="btn" href={s.watchUrl} target="_blank" rel="noopener noreferrer">Watch on the temple’s channel</a>
    </div>
  );
}

function nextAartiFor(temple, now) {
  return upcomingAartis([temple], { now, limit: 1 })[0] || null;
}

function Badge({ temple, now }) {
  const status = temple.status;
  if (status.state === 'live') return <span className="badge live">● LIVE</span>;
  if (status.state === 'upcoming' && status.scheduledStart) {
    const min = Math.max(0, Math.round((new Date(status.scheduledStart) - now) / 60000));
    return <span className="badge soon">Starts {formatAway(min)}</span>;
  }
  if (status.state === 'external') return <span className="badge ext">Watch on official site ↗</span>;
  const next = nextAartiFor(temple, now);
  if (next) return <span className="badge soon">{next.onNow ? `${next.aarti} on now` : `Next: ${next.aarti} ${format12h(next.time)}`}</span>;
  return <span className="badge off">Not live now</span>;
}

function Thumb({ temple, now }) {
  const s = temple.status;
  const vid = s.videoId || s.thumbVideoId;
  if (vid) {
    return (
      <div className={`thumb ${s.state === 'offline' ? 'dim' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`} alt="" loading="lazy" />
        <Badge temple={temple} now={now} />
      </div>
    );
  }
  return (
    <div className={`thumb text-thumb ${s.state === 'external' ? 'ext' : ''}`}>
      <span className="thumb-hi">{temple.nameHi}</span>
      <span className="thumb-place">{temple.place}</span>
      <Badge temple={temple} now={now} />
    </div>
  );
}

export default function LiveBoard({ initial, middle }) {
  const [data, setData] = useState(initial);
  const [now, setNow] = useState(() => new Date(initial.updatedAt));
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), TICK_MS);
    const refetch = setInterval(async () => {
      try {
        const res = await fetch('/api/live');
        if (res.ok) setData(await res.json());
      } catch {}
    }, REFETCH_MS);
    return () => { clearInterval(tick); clearInterval(refetch); };
  }, []);

  const order = { live: 0, upcoming: 1, external: 2, offline: 3 };
  const sorted = useMemo(
    () => [...data.temples].sort((a, b) => order[a.status.state] - order[b.status.state]),
    [data]
  );
  const liveNow = sorted.filter((t) => t.status.state === 'live');
  const featured = sorted.find((t) => t.id === selectedId) || liveNow[0] || sorted[0];
  const soon = upcomingAartis(data.temples, { now, limit: 6 });
  const nxt = nextAartiFor(featured, now);
  const nextLine = nxt ? (nxt.onNow ? `${nxt.aarti} on now` : `${nxt.aarti} at ${format12h(nxt.time)}`) : '';

  return (
    <>
      {data.mock && (
        <div className="notice wrap" role="status">
          Demo mode: showing sample live states. Set <code>YOUTUBE_API_KEY</code> to load real streams.
        </div>
      )}
      {data.error && (
        <div className="notice wrap error" role="alert">YouTube API error — showing schedule only. ({data.error.slice(0, 160)})</div>
      )}

      <section id="live" className="wrap hero">
        <div className="hero-main">
          <div className="arch"><Player temple={featured} /></div>
          <div className="hero-meta">
            <div className="eyebrow">{featured.status.state === 'live' ? 'Live darshan' : 'Featured'} · {featured.place}</div>
            <h2 lang="hi">{featured.nameHi}</h2>
            <p className="hi">{featured.name}{nextLine ? ` · ${nextLine}` : ''}</p>
          </div>
          <div className="hero-actions">
            <a className="btn" href="#all">Other temples</a>
            <a
              className="btn ghost"
              href={`https://wa.me/?text=${encodeURIComponent(`Live darshan: ${featured.name} — https://hindus.live/#live`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share on WhatsApp
            </a>
          </div>
        </div>

        <section id="soon" className="soon" aria-labelledby="h-soon">
          <div className="ornament"><h2 id="h-soon" lang="hi">आज की आरती</h2></div>
          {soon.length === 0 && <p className="muted">No aartis in the next 24 hours.</p>}
          <ul>
            {soon.map((a) => (
              <li key={`${a.templeId}-${a.start}`}>
                <button type="button" className="soon-row" onClick={() => { setSelectedId(a.templeId); document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className={`time ${a.onNow ? 'on' : ''}`}>{a.onNow ? 'NOW' : format12h(a.time)}</span>
                  <span className="soon-text">
                    <strong>{a.aarti}</strong>
                    <span>{a.temple}</span>
                  </span>
                  <span className="away">{a.onNow ? 'on now' : formatAway(a.minutesAway)}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </section>

      {middle}

      <section id="all" className="wrap grid-section">
        <div className="ornament"><h2>All temples <span lang="hi">· सभी मंदिर</span></h2></div>
        <div className="grid">
          {sorted.map((t) => {
            const external = t.status.state === 'external' || t.status.state === 'offline';
            const content = (
              <>
                <Thumb temple={t} now={now} />
                <strong>{t.name}</strong>
                <span className="muted">{t.place}</span>
              </>
            );
            return external ? (
              <a key={t.id} className="card" href={t.status.watchUrl || '#'} target="_blank" rel="noopener noreferrer">{content}</a>
            ) : (
              <button key={t.id} type="button" className="card" onClick={() => { setSelectedId(t.id); document.getElementById('live')?.scrollIntoView({ behavior: 'smooth' }); }}>
                {content}
              </button>
            );
          })}
        </div>
        <p className="muted small">Last checked {new Date(data.updatedAt).toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: '2-digit' })} IST</p>
      </section>
    </>
  );
}
