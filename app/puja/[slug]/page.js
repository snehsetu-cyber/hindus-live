import { notFound } from 'next/navigation';
import { pujas, pujaBySlug } from '../../../data/pujas.js';
import { cityBySlug, DEFAULT_CITY } from '../../../data/cities.js';
import PujaView, { pujaMeta } from '../PujaView.js';

export const dynamicParams = false;
export const revalidate = 3600; // refreshes the countdown
export function generateStaticParams() {
  return pujas.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const puja = pujaBySlug(slug);
  return puja ? pujaMeta(puja, cityBySlug(DEFAULT_CITY), `/puja/${slug}`) : {};
}
export default async function Page({ params }) {
  const { slug } = await params;
  const puja = pujaBySlug(slug);
  if (!puja) notFound();
  return <PujaView puja={puja} city={cityBySlug(DEFAULT_CITY)} />;
}
