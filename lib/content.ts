/**
 * Editable site content: events, testimonies, scriptures, gallery and blog posts.
 *
 * Sermons are loaded from YouTube (see lib/youtube.ts).
 *
 * PLACEHOLDER — every event, testimony and blog post below is sample content
 * written to show the design. Replace with real entries before launch.
 */

export type ChurchEvent = {
  slug: string;
  title: string;
  /** Local start in church timezone, ISO without offset: 2026-11-06T19:00 */
  start: string;
  end: string;
  location: string;
  image: string;
  category: "Service" | "Conference" | "Fellowship" | "Outreach" | "Youth";
  summary: string;
};

export const events: ChurchEvent[] = [
  {
    slug: "holy-ghost-service-november",
    title: "Holy Ghost Service",
    start: "2026-11-06T19:00",
    end: "2026-11-06T22:00",
    location: "Church Auditorium",
    image: "/f01.jpg",
    category: "Service",
    summary:
      "A night of intense worship, prayer and the move of the Holy Spirit, in unity with RCCG parishes worldwide.",
  },
  {
    slug: "thanksgiving-service",
    title: "Annual Thanksgiving Service",
    start: "2026-11-22T10:00",
    end: "2026-11-22T13:00",
    location: "Church Auditorium",
    image: "/g01.jpg",
    category: "Service",
    summary: "Come with a grateful heart as we celebrate God's faithfulness over the past year, followed by a fellowship lunch.",
  },
  {
    slug: "youth-night-of-worship",
    title: "Youth Night of Worship",
    start: "2026-12-05T18:00",
    end: "2026-12-05T21:00",
    location: "Church Auditorium",
    image: "/p02.jpg",
    category: "Youth",
    summary: "Worship, games, food and a word for the next generation. Bring a friend!",
  },
  {
    slug: "christmas-carol-service",
    title: "Christmas Carol Service",
    start: "2026-12-20T17:00",
    end: "2026-12-20T19:30",
    location: "Church Auditorium",
    image: "/g02.jpg",
    category: "Fellowship",
    summary: "Carols, choir ministrations and the timeless story of the birth of our Saviour. Families welcome.",
  },
  {
    slug: "crossover-night",
    title: "Crossover Night Service",
    start: "2026-12-31T21:00",
    end: "2027-01-01T01:00",
    location: "Church Auditorium",
    image: "/m03.jpg",
    category: "Service",
    summary: "Cross into the new year in God's presence with praise, prophetic declarations and thanksgiving.",
  },
];

export type Testimony = {
  name: string;
  role: string;
  text: string;
  image: string;
};

export const testimonies: Testimony[] = [
  {
    name: "Sister Funmi A.",
    role: "Member since 2019",
    text:
      "When I moved to Nashville I didn't know anyone. Agape House became my family. The love here is real and the Word has transformed my life.",
    image: "/g05.jpg",
  },
  {
    name: "Brother David O.",
    role: "Youth Ministry",
    text:
      "I came for one Sunday service and never left. Through the prayer meetings God restored my faith and gave me direction for my career.",
    image: "/m04.jpg",
  },
  {
    name: "The Johnson Family",
    role: "Visitors turned members",
    text:
      "Our children love the Children's Church and we love the teaching. It's a place where the whole family grows together in Christ.",
    image: "/p02.jpg",
  },
];

export type Verse = { text: string; reference: string };

/** Rotates daily on the home page. */
export const verses: Verse[] = [
  { text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", reference: "John 3:16" },
  { text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", reference: "Proverbs 3:5–6" },
  { text: "I can do all things through Christ which strengtheneth me.", reference: "Philippians 4:13" },
  { text: "The LORD is my shepherd; I shall not want.", reference: "Psalm 23:1" },
  { text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.", reference: "Isaiah 40:31" },
  { text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", reference: "Romans 8:28" },
  { text: "Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.", reference: "1 John 4:7" },
  { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", reference: "Joshua 1:9" },
  { text: "Not by might, nor by power, but by my spirit, saith the LORD of hosts.", reference: "Zechariah 4:6" },
  { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", reference: "Matthew 11:28" },
  { text: "This is the day which the LORD hath made; we will rejoice and be glad in it.", reference: "Psalm 118:24" },
  { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", reference: "Jeremiah 29:11" },
];

/** Date helpers for events stored in church-local time. */
export function eventDateParts(iso: string) {
  const [date, time = "00:00"] = iso.split("T");
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, hh, mm));
  return {
    day: d,
    month: dt.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
    weekday: dt.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
    long: dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }),
    time: dt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }),
  };
}

export function upcomingEvents(now: Date = new Date(), limit?: number) {
  // Compare on the local end date; an event stays listed through its final day.
  const today = now.toISOString().slice(0, 10);
  const list = events.filter((e) => e.end.slice(0, 10) >= today).sort((a, b) => a.start.localeCompare(b.start));
  return limit ? list.slice(0, limit) : list;
}

/** Google Calendar "add event" link (times interpreted in the church timezone). */
export function googleCalendarUrl(e: ChurchEvent, tz = "America/Chicago") {
  const fmt = (s: string) => s.replace(/[-:]/g, "") + "00";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: e.title,
    dates: `${fmt(e.start)}/${fmt(e.end)}`,
    details: e.summary,
    location: `${e.location}, 2128 Murfreesboro Pike, Nashville, TN 37217`,
    ctz: tz,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export function formatSermonDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}


export function eventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

/** Minimal iCalendar file for one event (floating local time in church timezone). */
export function eventIcs(e: ChurchEvent, tz = "America/Chicago") {
  const fmt = (s: string) => s.replace(/[-:]/g, "") + "00";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RCCG Agape House//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.slug}@rccgahn.org`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")}`,
    `DTSTART;TZID=${tz}:${fmt(e.start)}`,
    `DTEND;TZID=${tz}:${fmt(e.end)}`,
    `SUMMARY:${e.title}`,
    `DESCRIPTION:${e.summary.replace(/,/g, "\\,")}`,
    `LOCATION:${e.location}\\, 2128 Murfreesboro Pike\\, Nashville\\, TN 37217`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export type GalleryItem = { src: string; category: "Worship" | "Fellowship" | "Ministries" | "Events"; caption: string };

export const gallery: GalleryItem[] = [
  { src: "/f01.jpg", category: "Worship", caption: "Joyful praise on Sunday" },
  { src: "/g01.jpg", category: "Worship", caption: "Dancing before the Lord" },
  { src: "/p03.jpg", category: "Worship", caption: "Hands raised in worship" },
  { src: "/img01.jpg", category: "Fellowship", caption: "Listening to the Word" },
  { src: "/g05.jpg", category: "Ministries", caption: "Women in prayer" },
  { src: "/m04.jpg", category: "Ministries", caption: "Men's fellowship" },
  { src: "/p01.jpg", category: "Worship", caption: "Celebration service" },
  { src: "/p02.jpg", category: "Fellowship", caption: "Family and friends" },
  { src: "/g02.jpg", category: "Events", caption: "Special service" },
  { src: "/g03.jpg", category: "Events", caption: "Thanksgiving celebration" },
  { src: "/g04.jpg", category: "Fellowship", caption: "Fellowship moments" },
  { src: "/m01.jpg", category: "Worship", caption: "Encountering God" },
  { src: "/m02.jpg", category: "Ministries", caption: "Serving together" },
  { src: "/m03.jpg", category: "Events", caption: "Holy Ghost service" },
  { src: "/pst01.jpg", category: "Worship", caption: "Ministering the Word" },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  category: "Devotional" | "Testimony" | "News";
  image: string;
  excerpt: string;
  body: string[];
};

/** PLACEHOLDER blog posts. */
export const posts: Post[] = [
  {
    slug: "living-with-purpose",
    title: "Living With Purpose in Every Season",
    date: "2026-10-12",
    author: "Pastor Ben Adewuyi",
    category: "Devotional",
    image: "/img01.jpg",
    excerpt: "God has a purpose for every season of your life, even the ones you don't understand yet.",
    body: [
      "Ecclesiastes reminds us that to everything there is a season, and a time to every purpose under heaven. The season you are in right now is not an accident.",
      "When we surrender our plans to God, He weaves even our setbacks into His bigger story. Purpose isn't something you find once; it's something you walk in daily as you follow Him.",
      "This week, take a moment each morning to ask: Lord, what are you preparing me for today? Then listen, and obey the nudge of the Holy Spirit.",
    ],
  },
  {
    slug: "the-power-of-a-praying-church",
    title: "The Power of a Praying Church",
    date: "2026-09-28",
    author: "Pastor Toro Adewuyi",
    category: "Devotional",
    image: "/p01.jpg",
    excerpt: "Prayer isn't the least we can do — it's the most powerful thing we can do together.",
    body: [
      "In Acts 12, when Peter was in prison, the church prayed without ceasing. Chains fell off and doors opened on their own.",
      "Something supernatural happens when God's people agree in prayer. That is why prayer is at the heart of everything we do at Agape House.",
      "Join us every Wednesday at 7 PM on Zoom, or send us your request. We'd be honoured to stand with you.",
    ],
  },
  {
    slug: "welcome-to-agape-tv",
    title: "Welcome to Agape TV",
    date: "2026-09-14",
    author: "Media Team",
    category: "News",
    image: "/m01.jpg",
    excerpt: "You can now worship with us live from anywhere in the world.",
    body: [
      "We are excited to share that our Sunday services now stream live on Agape TV. Whether you're travelling, unwell or exploring faith from home, you can be part of the family.",
      "Visit the Watch Live page on Sundays from 10:00 AM Central time, and subscribe on YouTube so you never miss a message.",
    ],
  },
];

export function postBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
