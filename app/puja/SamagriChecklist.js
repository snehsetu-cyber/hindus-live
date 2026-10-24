'use client';

import { useEffect, useState } from 'react';

export default function SamagriChecklist({ slug, title, groups }) {
  const key = `hl-samagri-${slug}`;
  const [checked, setChecked] = useState({});

  useEffect(() => {
    try {
      const v = JSON.parse(localStorage.getItem(key) || '{}');
      if (v && typeof v === 'object') setChecked(v);
    } catch {}
  }, [key]);

  const toggle = (id) => {
    setChecked((c) => {
      const next = { ...c, [id]: !c[id] };
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  };
  const all = groups.flatMap((g, gi) => g.items.map((it, ii) => ({ id: `${gi}-${ii}`, en: it[0], hi: it[1] })));
  const done = all.filter((i) => checked[i.id]).length;
  const share = () => {
    const left = all.filter((i) => !checked[i.id]);
    const text = `${title} — samagri still to buy:\n` + left.map((i) => `• ${i.en} (${i.hi})`).join('\n') + `\n\n${window.location.href.split('#')[0]}#samagri`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };
  const reset = () => {
    setChecked({});
    try { localStorage.removeItem(key); } catch {}
  };

  return (
    <div className="samagri">
      <div className="samagri-bar">
        <span className="samagri-count" aria-live="polite">{done} of {all.length} ready</span>
        <div className="samagri-actions">
          <button type="button" onClick={share}>Share shopping list on WhatsApp</button>
          {done > 0 && <button type="button" onClick={reset}>Clear ticks</button>}
        </div>
      </div>
      <div className="samagri-groups">
        {groups.map((g, gi) => (
          <fieldset key={gi} className="samagri-group">
            <legend>{g.group} <span lang="hi">{g.hi}</span></legend>
            {g.items.map((it, ii) => {
              const id = `${gi}-${ii}`;
              return (
                <label key={id} className={checked[id] ? 'done' : ''}>
                  <input type="checkbox" checked={!!checked[id]} onChange={() => toggle(id)} />
                  <span>{it[0]} <em lang="hi">{it[1]}</em></span>
                </label>
              );
            })}
          </fieldset>
        ))}
      </div>
    </div>
  );
}
