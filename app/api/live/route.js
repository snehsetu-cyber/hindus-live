import { loadStatus } from '../../../lib/status.js';

// Cached for 5 minutes: at most ~12 refreshes/hour regardless of traffic.
export const revalidate = 300;

export async function GET() {
  const data = await loadStatus();
  return Response.json(data, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}
