import PanchangView, { panchangFor, panchangMeta } from './PanchangView.js';
import { cityBySlug, DEFAULT_CITY } from '../../data/cities.js';
import { istDateParts } from '../../lib/format.js';

// "Today" changes at IST midnight; re-render at most every 10 minutes.
export const revalidate = 600;

export async function generateMetadata() {
  const city = cityBySlug(DEFAULT_CITY);
  const date = istDateParts();
  return panchangMeta(city, date, panchangFor(city, date), '/panchang');
}

export default function Page() {
  return <PanchangView city={cityBySlug(DEFAULT_CITY)} date={istDateParts()} isToday />;
}
