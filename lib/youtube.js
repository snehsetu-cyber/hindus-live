// Live-status detection using the cheap path:
//   1. Channel RSS feed (free, no key) -> latest ~15 video IDs per channel
//   2. One batched videos.list call per 50 IDs (1 quota unit each)
// Never uses search.list (100 units per call).

const RSS = (channelId) => `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
const VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';
const RECENT_PER_CHANNEL = 5; // newest entries to check per channel

export function parseRssVideoIds(xml) {
  const ids = [];
  const re = /<yt:videoId>([A-Za-z0-9_-]{11})<\/yt:videoId>/g;
  let m;
  while ((m = re.exec(xml))) ids.push(m[1]);
  return ids;
}

async function fetchRecentIds(channelId, fetchImpl, revalidate) {
  try {
    const res = await fetchImpl(RSS(channelId), { next: { revalidate } });
    if (!res.ok) return [];
    return parseRssVideoIds(await res.text()).slice(0, RECENT_PER_CHANNEL);
  } catch {
    return [];
  }
}

async function fetchVideoDetails(ids, apiKey, fetchImpl, revalidate) {
  const out = [];
  for (let i = 0; i < ids.length; i += 50) {
    const batch = ids.slice(i, i + 50);
    const url = `${VIDEOS_API}?part=snippet,liveStreamingDetails,status&id=${batch.join(',')}&key=${apiKey}`;
    const res = await fetchImpl(url, { next: { revalidate } });
    if (!res.ok) throw new Error(`YouTube API ${res.status}: ${await res.text()}`);
    const json = await res.json();
    out.push(...(json.items || []));
  }
  return out;
}

// Returns one status object per temple:
// { id, state: 'live'|'upcoming'|'offline'|'external', videoId, title,
//   scheduledStart, embeddable, watchUrl }
export async function getLiveStatus(temples, { apiKey, fetchImpl = fetch, revalidate = 300 } = {}) {
  const withChannel = temples.filter((t) => t.channelId);
  const idsByTemple = {};
  await Promise.all(
    withChannel.map(async (t) => {
      const ids = await fetchRecentIds(t.channelId, fetchImpl, revalidate);
      if (t.pinnedVideoId) ids.unshift(t.pinnedVideoId);
      idsByTemple[t.id] = [...new Set(ids)];
    })
  );

  const allIds = [...new Set(Object.values(idsByTemple).flat())];
  const details = allIds.length ? await fetchVideoDetails(allIds, apiKey, fetchImpl, revalidate) : [];
  const byId = Object.fromEntries(details.map((v) => [v.id, v]));

  return temples.map((t) => {
    if (!t.channelId) {
      return { id: t.id, state: t.officialUrl ? 'external' : 'offline', watchUrl: t.officialUrl };
    }
    const vids = (idsByTemple[t.id] || []).map((id) => byId[id]).filter(Boolean);
    const live = vids.find((v) => v.snippet?.liveBroadcastContent === 'live');
    const upcoming = vids
      .filter((v) => v.snippet?.liveBroadcastContent === 'upcoming' && v.liveStreamingDetails?.scheduledStartTime)
      .sort((a, b) => a.liveStreamingDetails.scheduledStartTime.localeCompare(b.liveStreamingDetails.scheduledStartTime))[0];
    const pick = live || upcoming;
    if (!pick) {
      // Not live: keep the channel's newest video so the card has a thumbnail (no extra quota).
      const latest = (idsByTemple[t.id] || []).find((id) => id !== t.pinnedVideoId) || null;
      return {
        id: t.id,
        state: 'offline',
        thumbVideoId: latest,
        watchUrl: t.officialUrl || `https://www.youtube.com/channel/${t.channelId}`,
      };
    }
    return {
      id: t.id,
      state: live ? 'live' : 'upcoming',
      videoId: pick.id,
      title: pick.snippet.title,
      scheduledStart: pick.liveStreamingDetails?.scheduledStartTime || null,
      embeddable: pick.status?.embeddable !== false,
      watchUrl: `https://www.youtube.com/watch?v=${pick.id}`,
    };
  });
}
