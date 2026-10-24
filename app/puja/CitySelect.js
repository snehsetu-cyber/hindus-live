'use client';

import { useRouter } from 'next/navigation';

export default function CitySelect({ cities, current, base }) {
  const router = useRouter();
  return (
    <div className="mc-city">
      <label htmlFor="mc-city">Your city</label>
      <select id="mc-city" value={current} onChange={(e) => router.push(`${base}/${e.target.value}`)}>
        {cities.map((c) => <option key={c.slug} value={c.slug}>{c.name} · {c.hi}</option>)}
      </select>
    </div>
  );
}
