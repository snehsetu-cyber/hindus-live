import { notFound } from 'next/navigation';
import { pujas, pujaBySlug } from '../../../../data/pujas.js';
import { cities, cityBySlug } from '../../../../data/cities.js';
import PujaView, { pujaMeta } from '../../PujaView.js';

export const dynamicParams = false;
export const revalidate = 3600;
export function generateStaticParams() {
  return pujas.flatMap((p) => cities.map((c) => ({ slug: p.slug, city: c.slug })));
}
export async function generateMetadata({ params }) {
  const { slug, city } = await params;
  const puja = pujaBySlug(slug);
  const c = cityBySlug(city);
  return puja && c ? pujaMeta(puja, c, `/puja/${slug}/${city}`) : {};
}
export default async function Page({ params }) {
  const { slug, city } = await params;
  const puja = pujaBySlug(slug);
  const c = cityBySlug(city);
  if (!puja || !c) notFound();
  return <PujaView puja={puja} city={c} />;
}
