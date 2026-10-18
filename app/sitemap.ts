import type { MetadataRoute } from "next";
import { church, ministries } from "@/lib/church";
import { events, posts } from "@/lib/content";
import { getSermons } from "@/lib/youtube";

const pages = ["", "/about", "/pastors", "/visit", "/ministries", "/sermons", "/live", "/events", "/gallery", "/give", "/contact", "/prayer", "/counselling", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sermons = await getSermons();
  const base = church.url;
  return [
    ...pages.map((p) => ({ url: `${base}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...ministries.map((m) => ({ url: `${base}/ministries/${m.slug}`, priority: 0.6 })),
    ...sermons.map((s) => ({ url: `${base}/sermons/${s.slug}`, lastModified: s.date, priority: 0.5 })),
    ...events.map((e) => ({ url: `${base}/events/${e.slug}`, priority: 0.6 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, lastModified: p.date, priority: 0.5 })),
  ];
}
