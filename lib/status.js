import { temples as allTemples } from '../data/temples.js';
import { getLiveStatus } from './youtube.js';

export function visibleTemples() {
  const showUnverified = process.env.SHOW_UNVERIFIED !== '0';
  return allTemples.filter((t) => showUnverified || t.verified);
}

// Demo data so the UI works before you add an API key (or when MOCK=1).
function mockStatus(temples) {
  const demo = { somnath: 'live', mahakaleshwar: 'live', siddhivinayak: 'upcoming', tirumala: 'live' };
  const inAnHour = new Date(Date.now() + 60 * 60000).toISOString();
  return temples.map((t) => {
    if (!t.channelId) return { id: t.id, state: 'external', watchUrl: t.officialUrl };
    const state = demo[t.id] || 'offline';
    if (state === 'offline') return { id: t.id, state, watchUrl: `https://www.youtube.com/channel/${t.channelId}` };
    return {
      id: t.id,
      state,
      videoId: null, // no real video in demo mode
      title: `${t.name} — ${state === 'live' ? 'Live Darshan' : 'Sandhya Aarti'} (demo)`,
      scheduledStart: state === 'upcoming' ? inAnHour : null,
      embeddable: true,
      watchUrl: `https://www.youtube.com/channel/${t.channelId}`,
    };
  });
}

export async function loadStatus() {
  const temples = visibleTemples();
  const apiKey = process.env.YOUTUBE_API_KEY;
  const mock = process.env.MOCK === '1' || !apiKey;
  let statuses;
  let error = null;
  if (mock) {
    statuses = mockStatus(temples);
  } else {
    try {
      statuses = await getLiveStatus(temples, { apiKey, revalidate: 300 });
    } catch (e) {
      error = String(e.message || e);
      statuses = temples.map((t) => ({ id: t.id, state: t.officialUrl ? 'external' : 'offline', watchUrl: t.officialUrl }));
    }
  }
  const byId = Object.fromEntries(statuses.map((s) => [s.id, s]));
  return {
    mock,
    error,
    updatedAt: new Date().toISOString(),
    temples: temples.map((t) => ({
      id: t.id, name: t.name, nameHi: t.nameHi, place: t.place, aartis: t.aartis, verified: t.verified,
      status: byId[t.id],
    })),
  };
}
