// Pure schedule helpers (run on server and in the browser). All times are IST.
const IST_OFFSET_MIN = 330;

// Returns { y, m, d, weekday, minutes } for "now" in IST.
export function istParts(date = new Date()) {
  const ist = new Date(date.getTime() + IST_OFFSET_MIN * 60000);
  return {
    y: ist.getUTCFullYear(),
    m: ist.getUTCMonth(),
    d: ist.getUTCDate(),
    weekday: ist.getUTCDay(),
    minutes: ist.getUTCHours() * 60 + ist.getUTCMinutes(),
  };
}

// Absolute Date for an IST "HH:MM" on the IST day that is `dayOffset` from today.
function istTimeToDate(hhmm, dayOffset, now) {
  const { y, m, d } = istParts(now);
  const [h, min] = hhmm.split(':').map(Number);
  return new Date(Date.UTC(y, m, d + dayOffset, h, min) - IST_OFFSET_MIN * 60000);
}

const ONGOING_WINDOW_MIN = 30; // treat an aarti as "on now" for 30 min after start

// Next aartis across all temples, soonest first. Includes ones that started
// within the last 30 minutes (marked onNow).
export function upcomingAartis(temples, { now = new Date(), limit = 6, horizonHours = 24 } = {}) {
  const out = [];
  const today = istParts(now).weekday;
  for (const t of temples) {
    for (const a of t.aartis || []) {
      for (const offset of [0, 1]) {
        const weekday = (today + offset) % 7;
        if (a.days && !a.days.includes(weekday)) continue;
        const start = istTimeToDate(a.time, offset, now);
        const diffMin = (start.getTime() - now.getTime()) / 60000;
        if (diffMin < -ONGOING_WINDOW_MIN || diffMin > horizonHours * 60) continue;
        out.push({
          templeId: t.id,
          temple: t.name,
          place: t.place,
          aarti: a.name,
          time: a.time,
          start: start.toISOString(),
          onNow: diffMin <= 0,
          minutesAway: Math.max(0, Math.round(diffMin)),
        });
      }
    }
  }
  out.sort((x, y) => new Date(x.start) - new Date(y.start));
  return out.slice(0, limit);
}

export function formatAway(min) {
  if (min < 1) return 'now';
  if (min < 60) return `in ${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `in ${h}h ${m}m` : `in ${h}h`;
}

export function format12h(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`;
}
