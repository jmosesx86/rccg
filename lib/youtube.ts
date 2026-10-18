import { church } from "./church";

/**
 * Sermons come straight from the church's YouTube channel via its public RSS feed
 * (latest 15 uploads, no API key needed), refreshed hourly. If YouTube can't be
 * reached, the recent services in `fallbackFeed` are shown instead.
 */

export type Sermon = {
  /** YouTube video id */
  id: string;
  slug: string;
  title: string;
  /** e.g. "Sunday Service", "Shiloh Convocation", "Thanksgiving Service" */
  series: string;
  /** ISO date (yyyy-mm-dd) the service took place */
  date: string;
  image: string;
  views?: number;
};

type FeedItem = { id: string; title: string; published: string; views?: number };

/** Recent services, used only if the live feed is unavailable. */
const fallbackFeed: FeedItem[] = [
  { id: "EvAMwfzlMyQ", title: "Sunday Service 10.11.26 - Create Value", published: "2026-10-12" },
  { id: "Ay_O5r9BFtY", title: "AHN October Thanksgiving Service 10-4-2026.", published: "2026-10-04" },
  { id: "xuBttEEBPqM", title: "AHN Shiloh Convocation- Day 3- 9/27/26", published: "2026-09-28" },
  { id: "ktTrWQ8uUQ0", title: "AHN Shiloh Convocation- Day 2- 9/26/26", published: "2026-09-27" },
  { id: "CPnYKj8SRy4", title: "AHN Shiloh Convocation- Day 1- 9/25/26", published: "2026-09-26" },
  { id: "u2fLFuxIBKA", title: "AHN Sunday Service - 9/20/26", published: "2026-09-20" },
  { id: "cx8F1MIfHc0", title: "AHN Sunday Service - 9/13/26", published: "2026-09-13" },
  { id: "j1thfj0WgS0", title: "AHN Sunday Service - 9/6/26", published: "2026-09-07" },
];

const DATE_IN_TITLE = /\b(\d{1,2})[./-](\d{1,2})[./-](\d{2}|\d{4})\b\.?/;

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** "AHN Sunday Service 10.11.26 - Create Value" → { title: "Create Value", series: "Sunday Service", date } */
function toSermon(item: FeedItem): Sermon {
  let raw = decode(item.title).replace(/^AHN\s+/i, "");
  let date = item.published.slice(0, 10);

  const m = raw.match(DATE_IN_TITLE);
  if (m) {
    const year = m[3].length === 2 ? `20${m[3]}` : m[3];
    date = `${year}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`;
    raw = raw.replace(DATE_IN_TITLE, " ");
  }

  const parts = raw
    .split(/\s*[-–—]\s*/)
    .map((p) => p.replace(/[.\s]+$/, "").trim())
    .filter(Boolean);

  let title = parts.join(" — ") || "Service";
  let series = "Special Service";
  if (/sunday service/i.test(parts[0] ?? "")) {
    series = "Sunday Service";
    if (parts.length > 1) title = parts.slice(1).join(" — ");
  } else if (/convocation/i.test(raw)) series = "Shiloh Convocation";
  else if (/thanksgiving/i.test(raw)) series = "Thanksgiving Service";

  return {
    id: item.id,
    slug: `${slugify(title)}-${item.id}`,
    title,
    series,
    date,
    image: `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`,
    views: item.views,
  };
}

function parseFeed(xml: string): FeedItem[] {
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, e]) => ({
    id: e.match(/<yt:videoId>([^<]+)</)?.[1] ?? "",
    title: e.match(/<title>([^<]*)</)?.[1] ?? "",
    published: e.match(/<published>([^<]+)</)?.[1] ?? "",
    views: Number(e.match(/<media:statistics views="(\d+)"/)?.[1] ?? 0),
  }));
}

/**
 * The channel often posts short clips under the same title as the full service;
 * keep only the most-watched video for each title + date.
 */
function dedupe(sermons: Sermon[]) {
  const best = new Map<string, Sermon>();
  for (const s of sermons) {
    const key = `${s.series}|${s.title}|${s.date}`;
    const current = best.get(key);
    if (!current || (s.views ?? 0) > (current.views ?? 0)) best.set(key, s);
  }
  return [...best.values()].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getSermons(): Promise<Sermon[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${church.youtubeChannelId}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`YouTube feed ${res.status}`);
    const items = parseFeed(await res.text()).filter((i) => i.id);
    if (items.length) return dedupe(items.map(toSermon));
  } catch {
    // fall through to the bundled list
  }
  return dedupe(fallbackFeed.map(toSermon));
}

export async function getSermon(slug: string) {
  const id = slug.slice(-11);
  const sermons = await getSermons();
  // Only videos from the church's own channel get a page.
  return sermons.find((s) => s.id === id);
}

export { formatSermonDate } from "./content";
