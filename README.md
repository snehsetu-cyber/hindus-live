# Hindus.live: live darshan prototype

A Next.js app that checks which temples are streaming on YouTube, embeds the live stream, and shows a "Starting soon" panel built from each temple's daily aarti times (IST).

## How it works

- **`data/temples.js`**: your temple list (channel ID, official site, aarti times). This is the file you'll edit most.
- **`lib/youtube.js`**: live detection. It reads each channel's free RSS feed, then makes **one batched `videos.list` call** (1 quota unit per 50 videos) to see what's `live` / `upcoming` and whether embedding is allowed. It never calls `search.list`, which costs 100 units.
- **`lib/schedule.js`**: works out the next aartis from the stored IST times. It handles weekday-specific timings, such as Siddhivinayak's Tuesday schedule.
- **`app/api/live`**: a JSON endpoint cached for 5 minutes. However much traffic you get, YouTube is queried at most about 12 times an hour, roughly 300 quota units a day out of the free 10,000.
- **`app/LiveBoard.js`**: the page. It re-checks status every 2 minutes and updates countdowns every 30 seconds. Temples that stream only on their own site get "Official site" cards that link out.

Without an API key the app runs in **demo mode** with sample live states, so you can see the UI straight away.

## Run it locally

```bash
npm install
cp .env.example .env.local      # then paste your key into .env.local
npm run dev                     # http://localhost:3000
npm test                        # tests live detection + schedule logic with fake YouTube data
```

## Get a YouTube API key (free)

1. Go to https://console.cloud.google.com, create a project, and open **APIs & Services → Library**.
2. Enable **YouTube Data API v3**.
3. Under **Credentials → Create credentials → API key**, restrict the key to the YouTube Data API.

## Deploy to Vercel

1. Push this folder to a GitHub repo and import it at https://vercel.com/new.
2. Add the environment variable `YOUTUBE_API_KEY`.
3. Add your domain `hindus.live` under **Project → Settings → Domains** and point the DNS records there as Vercel instructs.

## Before launch: verify the channels

The channel IDs in `data/temples.js` come from a public third-party list and **have not been verified**. For each one:

1. Open `https://www.youtube.com/channel/<channelId>`.
2. Confirm it's the temple trust's own channel. The temple's official website usually links to it.
3. Set `verified: true`.

Set `SHOW_UNVERIFIED=0` in production to hide anything you haven't checked. Aarti times come from travel and temple guides and change with seasons and festivals, so confirm them with each temple too.

## Adding a temple

Add an entry to `data/temples.js`. A temple with a 24×7 stream can drop out of its channel's RSS feed once it has posted newer videos. For those, put the stream's video ID in `pinnedVideoId`.

## Rules to stay inside

Use only YouTube's embed player. Don't download, re-stream or hide YouTube branding or ads. If a channel has embedding turned off, the app automatically shows a "Watch on the temple's channel" link instead.
