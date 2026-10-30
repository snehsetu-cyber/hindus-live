'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const W = 1080;
const H = 1350;
const C = {
  teal: '#0F5257', tealDark: '#0B3F43', bandText: '#CFE6E6', bandAccent: '#FFC870',
  surface: '#FFF6EC', line: '#FFE0BF', soft: '#FFEBD5', accentInk: '#9A4100',
  ink: '#1F2328', muted: '#4B5563', badBg: '#FEE2E2', bad: '#991B1B', goodBg: '#DCFCE7', good: '#166534',
};
const SERIF = '"Tiro Devanagari Hindi", serif';
const SANS = 'Mukta, sans-serif';

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// Draw text, shrinking the font until it fits maxW.
function fit(ctx, text, x, y, maxW, size, weight, family, align = 'left') {
  let s = size;
  do {
    ctx.font = `${weight} ${s}px ${family}`;
    if (ctx.measureText(text).width <= maxW) break;
    s -= 2;
  } while (s > 16);
  ctx.textAlign = align;
  ctx.fillText(text, x, y);
}

function draw(canvas, card) {
  const ctx = canvas.getContext('2d');
  ctx.textBaseline = 'alphabetic';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Header band
  ctx.fillStyle = C.teal;
  ctx.fillRect(0, 0, W, 310);
  ctx.save();
  ctx.translate(64, 40);
  ctx.scale(2.4, 2.4);
  ctx.fillStyle = '#F57C00';
  ctx.fill(new Path2D('M13 3c3 4 3 7 0 10-3-3-3-6 0-10z'));
  ctx.fillStyle = '#F2A20C';
  ctx.fill(new Path2D('M4 17h18c-1 4-5 6-9 6s-8-2-9-6z'));
  ctx.restore();
  ctx.font = `400 40px ${SERIF}`;
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('Hindus', 136, 92);
  const hw = ctx.measureText('Hindus').width;
  ctx.fillStyle = C.bandAccent;
  ctx.fillText('.live', 136 + hw, 92);
  ctx.fillStyle = C.bandText;
  fit(ctx, 'WhatsApp: Panchang Live', W - 64, 90, 380, 28, 500, SANS, 'right');

  ctx.fillStyle = '#FFFFFF';
  fit(ctx, 'आज का पंचांग', 64, 205, W - 128, 84, 400, SERIF);
  ctx.fillStyle = C.bandText;
  fit(ctx, `${card.weekdayHi}, ${card.dateHi}`, 64, 270, 640, 40, 500, SANS);
  ctx.fillStyle = C.bandAccent;
  fit(ctx, card.cityHi, W - 64, 270, 300, 40, 700, SANS, 'right');

  // Hindu date
  ctx.fillStyle = C.teal;
  fit(ctx, card.hinduDate, W / 2, 410, W - 128, 74, 400, SERIF, 'center');
  ctx.fillStyle = C.muted;
  fit(ctx, card.samvat, W / 2, 462, 600, 32, 500, SANS, 'center');

  // Rows
  const y0 = 500;
  const rh = 100;
  card.rows.forEach((r, i) => {
    const y = y0 + i * (rh + 8);
    ctx.fillStyle = r.tone === 'bad' ? C.badBg : r.tone === 'good' ? C.goodBg : C.surface;
    rr(ctx, 56, y, W - 112, rh, 18);
    ctx.fill();
    ctx.fillStyle = r.tone === 'bad' ? C.bad : r.tone === 'good' ? C.good : C.accentInk;
    fit(ctx, r.label, 88, y + 62, 330, 34, 500, SANS);
    ctx.fillStyle = r.tone === 'bad' ? C.bad : r.tone === 'good' ? C.good : C.ink;
    fit(ctx, r.value, W - 88, y + 63, 600, 40, 700, SANS, 'right');
  });

  // Festival / follow strip
  const fy = y0 + card.rows.length * (rh + 8) + 8;
  ctx.fillStyle = C.soft;
  rr(ctx, 56, fy, W - 112, 92, 18);
  ctx.fill();
  ctx.fillStyle = C.accentInk;
  fit(ctx, card.festival || 'हर सुबह का पंचांग: WhatsApp पर Panchang Live फॉलो करें', W / 2, fy + 59, W - 176, 36, 700, SANS, 'center');

  // Footer
  ctx.fillStyle = C.teal;
  ctx.fillRect(0, H - 92, W, 92);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = `400 40px ${SERIF}`;
  ctx.textAlign = 'left';
  ctx.fillText('hindus.live', 64, H - 32);
  ctx.fillStyle = C.bandText;
  fit(ctx, 'अपने शहर का पंचांग, आरती और पूजा विधि', W - 64, H - 34, 560, 30, 500, SANS, 'right');
}

export default function DailyCard({ card, cities, todayIso, tomorrowIso }) {
  const ref = useRef(null);
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [msg, setMsg] = useState('');
  const fileName = `panchang-${card.iso}-${card.citySlug}.png`;

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        await Promise.all([
          document.fonts.load(`400 80px ${SERIF}`, 'आज का पंचांग'),
          document.fonts.load(`500 40px ${SANS}`, 'तिथि'),
          document.fonts.load(`700 40px ${SANS}`, 'राहुकाल'),
        ]);
        await document.fonts.ready;
      } catch {}
      if (!alive || !ref.current) return;
      draw(ref.current, card);
      setReady(true);
    })();
    return () => { alive = false; };
  }, [card]);

  const blob = () => new Promise((res) => ref.current.toBlob(res, 'image/png'));
  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 2500); };

  const download = async () => {
    const b = await blob();
    const url = URL.createObjectURL(b);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };
  const share = async () => {
    const b = await blob();
    const file = new File([b], fileName, { type: 'image/png' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try { await navigator.share({ files: [file], text: card.caption }); } catch {}
    } else {
      flash('Sharing isn’t supported in this browser — use Download instead.');
    }
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(card.caption); flash('Caption copied'); } catch { flash('Could not copy'); }
  };
  const go = (city, date) => router.push(`/card?city=${city}&date=${date}`);

  return (
    <main className="card-tool">
      <div className="card-head">
        <h1>Daily panchang card</h1>
        <p className="muted">For the WhatsApp channel, Instagram and Facebook. Not linked from the site.</p>
        <div className="card-controls">
          <label htmlFor="cc-city">City</label>
          <select id="cc-city" value={card.citySlug} onChange={(e) => go(e.target.value, card.iso)}>
            {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name} · {c.hi}</option>)}
          </select>
          <div className="seg" role="group" aria-label="Day">
            <button type="button" aria-pressed={card.iso === todayIso} onClick={() => go(card.citySlug, todayIso)}>Today</button>
            <button type="button" aria-pressed={card.iso === tomorrowIso} onClick={() => go(card.citySlug, tomorrowIso)}>Tomorrow</button>
          </div>
        </div>
      </div>

      <canvas ref={ref} width={W} height={H} className="card-canvas" role="img" aria-label={`Panchang card for ${card.dateHi}, ${card.cityHi}`} />

      <div className="card-actions">
        <button type="button" className="primary" onClick={share} disabled={!ready}>Share image</button>
        <button type="button" onClick={download} disabled={!ready}>Download image</button>
        <button type="button" onClick={copy}>Copy caption</button>
        <span className="card-msg" role="status">{msg}</span>
      </div>

      <h2>Caption</h2>
      <pre className="card-caption">{card.caption}</pre>
    </main>
  );
}
