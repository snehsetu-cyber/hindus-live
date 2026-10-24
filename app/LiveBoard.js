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

function Badge({ status, now }) {
  if (status.state === 'live') return <span className="badge live">● LIVE</span>;
  if (status.state === 'upcoming' && status.scheduledStart) {
    const min = Math.max(0, Math.round((new Date(status.scheduledStart) - now) / 60000));
    return <span className="badge soon">Starts {formatAway(min)}</span>;
  }
  if (status.state === 'external') return <span className="badge ext">Official site</span>;
  return <span className="badge off">Offline</span>;
}

export default function LiveBoard({ initial }) {
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
          <Player temple={featured} />
          <div className="hero-meta">
            <div>
              <div className="eyebrow">{featured.status.state === 'live' ? 'Now live' : 'Featured'} · {featured.place}</div>
              <h1>{featured.name}</h1>
              <p className="hi">{featured.nameHi}</p>
            </div>
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

        <aside id="soon" className="soon" aria-label="Aartis starting soon">
          <h2>Starting soon</h2>
          {soon.length === 0 && <p className="muted">No aartis in the next 24 hours.</p>}
          <ul>
            {soon.map((a) => (
              <li key={`${a.templeId}-${a.start}`}>
                <button type="button" className="soon-row" onClick={() => setSelectedId(a.templeId)}>
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
        </aside>
      </section>

      <section id="all" className="wrap grid-section">
        <h2>All temples</h2>
        <div className="grid">
          {sorted.map((t) => {
            const external = t.status.state === 'external' || t.status.state === 'offline';
            const content = (
              <>
                <div className="thumb">
                  {t.status.videoId ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={`https://i.ytimg.com/vi/${t.status.videoId}/hqdefault.jpg`} alt="" />
                  ) : (
                    <span aria-hidden="true">ॐ</span>
                  )}
                  <Badge status={t.status} now={now} />
                </div>
                <strong>{t.name}</strong>
                <span className="muted">{t.place}</span>
              </>
            );
            return external ? (
              <a key={t.id} className="card" href={t.status.watchUrl || '#'} target="_blank" rel="noopener noreferrer">{content}</a>
            ) : (
              <button key={t.id} type="button" className="card" onClick={() => { setSelectedId(t.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
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
