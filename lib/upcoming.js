// The next festival puja guide coming up, for homepage cards and the daily card.
import { pujas } from '../data/pujas.js';
import { festivalDateFor } from './muhurat.js';

export function upcomingPujas(today, withinDays = 30) {
  return pujas
    .map((puja) => {
      const date = festivalDateFor(puja.muhurat, today.y);
      const days = Math.round((Date.UTC(date.y, date.m - 1, date.d) - Date.UTC(today.y, today.m - 1, today.d)) / 86400000);
      return { puja, date, days };
    })
    .filter((x) => x.days >= 0 && x.days <= withinDays)
    .sort((a, b) => a.days - b.days);
}
