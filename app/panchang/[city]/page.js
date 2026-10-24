import { notFound } from 'next/navigation';
import PanchangView, { panchangFor, panchangMeta } from '../PanchangView.js';
import { cities, cityBySlug } from '../../../data/cities.js';
import { istDateParts } from '../../../lib/format.js';

export const revalidate = 600;
export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const city = cityBySlug(slug);
  if (!city) return {};
  const date = istDateParts();
  return panchangMeta(city, date, panchangFor(city, date), `/panchang/${slug}`);
}

export default async function Page({ params }) {
  const { city: slug } = await params;
  const city = cityBySlug(slug);
  if (!city) notFound();
  return <PanchangView city={city} date={istDateParts()} isToday />;
}
