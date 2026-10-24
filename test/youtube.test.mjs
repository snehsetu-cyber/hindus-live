// Run: npm test  — checks live detection and schedule logic with fake YouTube responses.
import assert from 'node:assert/strict';
import { getLiveStatus, parseRssVideoIds } from '../lib/youtube.js';
import { upcomingAartis } from '../lib/schedule.js';

const rss = (ids) => `<feed>${ids.map((id) => `<entry><yt:videoId>${id}</yt:videoId></entry>`).join('')}</feed>`;
const temples = [
  { id: 'a', channelId: 'UCa', aartis: [] },
  { id: 'b', channelId: 'UCb', aartis: [] },
  { id: 'c', channelId: 'UCc', aartis: [] },
  { id: 'd', channelId: null, officialUrl: 'https://example.org/live', aartis: [] },
];
const videos = {
  AAAAAAAAAA1: { liveBroadcastContent: 'none' },
  AAAAAAAAAA2: { liveBroadcastContent: 'live', embeddable: true },
  BBBBBBBBBB1: { liveBroadcastContent: 'upcoming', start: '2026-10-24T13:30:00Z', embeddable: false },
  CCCCCCCCCC1: { liveBroadcastContent: 'none' },
};
let apiCalls = 0;
const fakeFetch = async (url) => {
  const u = String(url);
  if (u.includes('feeds/videos.xml')) {
    const ch = new URL(u).searchParams.get('channel_id');
    const map = { UCa: ['AAAAAAAAAA1', 'AAAAAAAAAA2'], UCb: ['BBBBBBBBBB1'], UCc: ['CCCCCCCCCC1'] };
    return new Response(rss(map[ch] || []));
  }
  apiCalls++;
  assert.ok(!u.includes('/search'), 'must not use search.list');
  const ids = new URL(u).searchParams.get('id').split(',');
  return Response.json({
    items: ids.map((id) => ({
      id,
      snippet: { title: `Video ${id}`, liveBroadcastContent: videos[id].liveBroadcastContent },
      liveStreamingDetails: videos[id].start ? { scheduledStartTime: videos[id].start } : undefined,
      status: { embeddable: videos[id].embeddable ?? true },
    })),
  });
};

assert.deepEqual(parseRssVideoIds(rss(['AAAAAAAAAA1', 'BBBBBBBBBB1'])), ['AAAAAAAAAA1', 'BBBBBBBBBB1']);

const out = await getLiveStatus(temples, { apiKey: 'k', fetchImpl: fakeFetch });
const by = Object.fromEntries(out.map((s) => [s.id, s]));
assert.equal(by.a.state, 'live');
assert.equal(by.a.videoId, 'AAAAAAAAAA2');
assert.equal(by.b.state, 'upcoming');
assert.equal(by.b.embeddable, false);
assert.equal(by.c.state, 'offline');
assert.equal(by.c.thumbVideoId, 'CCCCCCCCCC1');
assert.equal(by.d.state, 'external');
assert.equal(apiCalls, 1, 'all channels batched into one videos.list call');

// Schedule: 2026-10-24 16:50 IST (Saturday) -> 17:00 aarti is 10 min away; 16:30 aarti is on now.
const now = new Date('2026-10-24T11:20:00Z');
const sched = upcomingAartis(
  [{ id: 'x', name: 'X', aartis: [{ name: 'Sandhya', time: '17:00' }, { name: 'Earlier', time: '16:30' }, { name: 'TueOnly', time: '18:00', days: [2] }] }],
  { now }
);
assert.equal(sched[0].aarti, 'Earlier');
assert.equal(sched[0].onNow, true);
assert.equal(sched[1].aarti, 'Sandhya');
assert.equal(sched[1].minutesAway, 10);
assert.ok(!sched.some((s) => s.aarti === 'TueOnly'), 'weekday filter');

console.log('All tests passed');
