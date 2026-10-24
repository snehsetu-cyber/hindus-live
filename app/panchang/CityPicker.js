'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CityPicker({ cities, city, date }) {
  const router = useRouter();
  const [c, setC] = useState(city);
  const [d, setD] = useState(date);
  const go = (e) => {
    e.preventDefault();
    router.push(`/panchang/${c}/${d}`);
  };
  return (
    <form className="picker" onSubmit={go}>
      <div className="field">
        <label htmlFor="pc-city">City · शहर</label>
        <select id="pc-city" value={c} onChange={(e) => setC(e.target.value)}>
          {cities.map((x) => (
            <option key={x.slug} value={x.slug}>{x.name} · {x.hi}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="pc-date">Date · तिथि</label>
        <input id="pc-date" type="date" value={d} onChange={(e) => setD(e.target.value)} min="1950-01-01" max="2099-12-31" required />
      </div>
      <button type="submit" className="btn">Show panchang</button>
    </form>
  );
}
