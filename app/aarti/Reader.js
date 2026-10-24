'use client';

import { useEffect, useState } from 'react';

const SIZES = [18, 21, 24, 28, 33];
const KEY = 'hl-aarti-size';

export default function Reader({ title, children }) {
  const [i, setI] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const v = Number(localStorage.getItem(KEY));
      if (v >= 0 && v < SIZES.length) setI(v);
    } catch {}
  }, []);
  const set = (n) => {
    const v = Math.max(0, Math.min(SIZES.length - 1, n));
    setI(v);
    try { localStorage.setItem(KEY, String(v)); } catch {}
  };
  const share = () => {
    const url = window.location.href;
    window.open(`https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`, '_blank', 'noopener');
  };
  const copy = async () => {
    const el = document.getElementById('lyrics');
    try {
      await navigator.clipboard.writeText(`${title}\n\n${el.innerText.trim()}\n\n${window.location.href}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <div className="reader-tools" role="toolbar" aria-label="Reading options">
        <div className="size">
          <button type="button" onClick={() => set(i - 1)} disabled={i === 0} aria-label="Smaller text">A−</button>
          <button type="button" onClick={() => set(i + 1)} disabled={i === SIZES.length - 1} aria-label="Larger text">A+</button>
        </div>
        <button type="button" onClick={share}>Share on WhatsApp</button>
        <button type="button" onClick={copy}>{copied ? 'Copied ✓' : 'Copy text'}</button>
        <button type="button" onClick={() => window.print()}>Print</button>
      </div>
      <div id="lyrics" className="lyrics" style={{ '--lyric-size': `${SIZES[i]}px` }}>
        {children}
      </div>
    </>
  );
}
