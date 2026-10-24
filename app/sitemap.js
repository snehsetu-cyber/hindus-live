import { cities } from '../data/cities.js';
import { aartis } from '../data/aartis.js';

const SITE = 'https://hindus.live';

export default function sitemap() {
  const now = new Date();
  return [
    { url: `${SITE}/`, lastModified: now, changeFrequency: 'hourly', priority: 1 },
    { url: `${SITE}/panchang`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    ...cities.map((c) => ({ url: `${SITE}/panchang/${c.slug}`, lastModified: now, changeFrequency: 'daily', priority: 0.8 })),
    { url: `${SITE}/aarti`, changeFrequency: 'monthly', priority: 0.8 },
    ...aartis.map((a) => ({ url: `${SITE}/aarti/${a.slug}`, changeFrequency: 'monthly', priority: 0.7 })),
  ];
}
