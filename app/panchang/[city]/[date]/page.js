import { notFound } from 'next/navigation';
import PanchangView, { panchangFor, panchangMeta } from '../../PanchangView.js';
import { cityBySlug } from '../../../../data/cities.js';
import { parseIsoDate, istDateParts, isoDate } from '../../../../lib/format.js';

// A past or future date's panchang never changes: render on first visit, then cache.
export const revalidate = 2592000; // 30 days
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

function resolve(slug, ds) {
  const city = cityBySlug(slug);
  const date = parseIsoDate(ds);
  return city && date ? { city, date } : null;
}

export async function generateMetadata({ params }) {
  const { city: slug, date: ds } = await params;
  const r = resolve(slug, ds);
  if (!r) return {};
  return panchangMeta(r.city, r.date, panchangFor(r.city, r.date), `/panchang/${slug}/${ds}`);
}

export default async function Page({ params }) {
  const { city: slug, date: ds } = await params;
  const r = resolve(slug, ds);
  if (!r) notFound();
  const isToday = isoDate(istDateParts()) === ds;
  return <PanchangView city={r.city} date={r.date} isToday={isToday} />;
}
