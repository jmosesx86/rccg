"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  List,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ArrowRight,
  CalendarPlus,
  Sparkles,
} from "lucide-react";
import { church } from "@/lib/church";
import { eventDateParts, googleCalendarUrl, type ChurchEvent } from "@/lib/content";
import Img from "@/components/ui/Img";
import { useNow } from "@/components/ui/useNow";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Colour per category, used for tags, date blocks and calendar chips. */
const TONES: Record<ChurchEvent["category"], { tag: string; chip: string; dot: string }> = {
  Service: { tag: "bg-primary-50 text-primary", chip: "bg-primary hover:bg-primary-dark", dot: "bg-primary" },
  Youth: { tag: "bg-navy/10 text-navy", chip: "bg-navy hover:bg-navy-700", dot: "bg-navy" },
  Fellowship: { tag: "bg-gold/15 text-gold-dark", chip: "bg-gold-dark hover:brightness-90", dot: "bg-gold" },
  Conference: { tag: "bg-navy-700/10 text-navy-700", chip: "bg-navy-700 hover:bg-navy-600", dot: "bg-navy-700" },
  Outreach: { tag: "bg-emerald-50 text-emerald-700", chip: "bg-emerald-700 hover:bg-emerald-800", dot: "bg-emerald-600" },
};

function countdownLabel(days: number) {
  if (days <= 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days < 7) return `In ${days} days`;
  const weeks = Math.round(days / 7);
  return days < 28 ? `In ${weeks} week${weeks > 1 ? "s" : ""}` : `In ${days} days`;
}

// Months are 1-based in the ISO strings; Date.UTC wants 0-based.
function utc(y: number, m: number, d: number) {
  return Date.UTC(y, m - 1, d);
}

function Countdown({ iso, className = "" }: { iso: string; className?: string }) {
  const now = useNow();
  if (!now) return null;
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: church.timezone }).format(now).split("-").map(Number);
  const days = Math.round((utc(y, m, d) - utc(today[0], today[1], today[2])) / 86_400_000);
  return <span className={className}>{countdownLabel(days)}</span>;
}

function Featured({ e }: { e: ChurchEvent }) {
  const d = eventDateParts(e.start);
  const end = eventDateParts(e.end);
  return (
    <article className="group relative isolate overflow-hidden rounded-[2rem] bg-navy-950 text-white shadow-lift">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
          <Img
            src={e.image}
            alt=""
            sizes="(min-width: 1024px) 55vw, 100vw"
            priority
            className="absolute inset-0 h-full w-full object-cover transition duration-[1.5s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-navy-950" />
          <div className="absolute left-5 top-5 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
              <Sparkles size={13} /> Next up
            </span>
            <Countdown
              iso={e.start}
              className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur"
            />
          </div>
        </div>

        <div className="relative flex flex-col justify-center p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-primary shadow-glow">
              <span className="font-display text-4xl leading-none">{d.day}</span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-widest">{d.month}</span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{e.category}</span>
              <p className="text-sm text-white/70">{d.weekday}</p>
            </div>
          </div>
          <h2 className="relative mt-6 text-3xl text-white sm:text-4xl">
            <Link href={`/events/${e.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {e.title}
            </Link>
          </h2>
          <p className="relative mt-4 leading-relaxed text-white/75">{e.summary}</p>
          <div className="relative mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-gold" /> {d.time} – {end.time}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={15} className="text-gold" /> {e.location}
            </span>
          </div>
          <div className="relative z-10 mt-8 flex flex-wrap gap-3">
            <Link href={`/events/${e.slug}`} className="btn-primary">
              Event details <ArrowRight size={16} />
            </Link>
            <a href={googleCalendarUrl(e)} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <CalendarPlus size={16} /> Add to calendar
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function EventCard({ e }: { e: ChurchEvent }) {
  const d = eventDateParts(e.start);
  const tone = TONES[e.category];
  return (
    <article className="card card-hover group relative grid grid-cols-[auto_1fr] items-stretch overflow-hidden sm:grid-cols-[auto_1fr_200px]">
      {/* Date block */}
      <div className="flex w-20 flex-col items-center justify-center border-r border-navy/5 bg-cream px-2 py-6 text-center sm:w-24">
        <span className="text-[11px] font-bold uppercase tracking-widest text-ink-muted">{d.weekday.slice(0, 3)}</span>
        <span className="mt-1 font-display text-4xl leading-none text-navy">{d.day}</span>
        <span className="mt-1 text-[11px] font-bold uppercase tracking-widest text-primary">{d.month}</span>
      </div>

      {/* Details */}
      <div className="min-w-0 p-5 sm:p-6">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${tone.tag}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} /> {e.category}
        </span>
        <h3 className="mt-2 text-xl leading-snug sm:text-2xl">
          <Link
            href={`/events/${e.slug}`}
            className="transition group-hover:text-primary after:absolute after:inset-0 after:content-['']"
          >
            {e.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[15px] text-ink-muted">{e.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={14} className="text-primary" /> {d.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-primary" /> {e.location}
          </span>
          <a
            href={googleCalendarUrl(e)}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <CalendarPlus size={14} /> Add to calendar
          </a>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative hidden overflow-hidden sm:block">
        <Img
          src={e.image}
          alt=""
          sizes="200px"
          className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent" />
        <Countdown
          iso={e.start}
          className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur"
        />
      </div>
    </article>
  );
}

function CalendarView({ events }: { events: ChurchEvent[] }) {
  const now = useNow();
  const first = events[0]?.start ?? new Date().toISOString();
  const [month, setMonth] = useState(() => ({ y: Number(first.slice(0, 4)), m: Number(first.slice(5, 7)) - 1 }));

  const byDay = useMemo(() => {
    const map = new Map<string, ChurchEvent[]>();
    for (const e of events) map.set(e.start.slice(0, 10), [...(map.get(e.start.slice(0, 10)) ?? []), e]);
    return map;
  }, [events]);

  const cells = useMemo(() => {
    const startDay = new Date(Date.UTC(month.y, month.m, 1)).getUTCDay();
    const days = new Date(Date.UTC(month.y, month.m + 1, 0)).getUTCDate();
    return [...Array(startDay).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  }, [month]);

  const label = new Date(Date.UTC(month.y, month.m, 1)).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
  const shift = (n: number) => setMonth(({ y, m }) => ({ y: m + n < 0 ? y - 1 : m + n > 11 ? y + 1 : y, m: (m + n + 12) % 12 }));
  const key = (d: number) => `${month.y}-${String(month.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const todayKey = now ? new Intl.DateTimeFormat("en-CA", { timeZone: church.timezone }).format(now) : "";

  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between border-b border-navy/5 px-5 py-4">
        <button type="button" onClick={() => shift(-1)} aria-label="Previous month" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-cream">
          <ChevronLeft size={18} />
        </button>
        <h2 className="text-xl">{label}</h2>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className="grid h-10 w-10 place-items-center rounded-full transition hover:bg-cream">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 border-b border-navy/5 bg-cream text-center text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-3">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((d, i) => {
          const list = d ? (byDay.get(key(d)) ?? []) : [];
          const isToday = d !== null && key(d) === todayKey;
          return (
            <div key={i} className={`min-h-[84px] border-b border-r border-navy/5 p-1.5 sm:min-h-[112px] sm:p-2 ${d ? "" : "bg-cream/50"}`}>
              {d && (
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-sm ${
                    isToday ? "bg-navy font-bold text-white" : list.length ? "font-bold text-primary" : "text-ink-muted"
                  }`}
                >
                  {d}
                </span>
              )}
              {list.map((e) => (
                <Link
                  key={e.slug}
                  href={`/events/${e.slug}`}
                  className={`mt-1 block truncate rounded-md px-1.5 py-1 text-[11px] font-medium text-white transition sm:text-xs ${TONES[e.category].chip}`}
                  title={e.title}
                >
                  {e.title}
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function EventsBrowser({ events }: { events: ChurchEvent[] }) {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [category, setCategory] = useState<string>("All");

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const e of events) counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
    return [["All", events.length] as const, ...[...counts.entries()].sort()];
  }, [events]);

  const filtered = category === "All" ? events : events.filter((e) => e.category === category);
  const [featured, ...rest] = filtered;

  const months = useMemo(() => {
    const groups = new Map<string, ChurchEvent[]>();
    for (const e of rest) {
      const label = new Date(`${e.start.slice(0, 7)}-01T12:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
      groups.set(label, [...(groups.get(label) ?? []), e]);
    }
    return [...groups.entries()];
  }, [rest]);

  if (events.length === 0) {
    return (
      <div className="card p-12 text-center">
        <CalendarDays size={32} className="mx-auto text-primary" />
        <h2 className="mt-4 text-2xl">No upcoming events right now</h2>
        <p className="mt-2 text-ink-muted">Check back soon, and join us every Sunday and Wednesday in the meantime.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter events by category">
          {categories.map(([name, count]) => (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(name)}
              aria-pressed={category === name}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === name ? "bg-navy text-white shadow-soft" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/30"
              }`}
            >
              {name}
              <span className={`rounded-full px-1.5 text-xs ${category === name ? "bg-white/15" : "bg-cream text-ink-muted"}`}>{count}</span>
            </button>
          ))}
        </div>
        <div className="inline-flex shrink-0 self-start rounded-full bg-white p-1 shadow-soft ring-1 ring-navy/5 sm:self-auto" role="tablist" aria-label="View">
          {(
            [
              ["list", List, "List"],
              ["calendar", CalendarDays, "Calendar"],
            ] as const
          ).map(([v, Icon, text]) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              onClick={() => setView(v)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                view === v ? "bg-primary text-white" : "text-navy hover:bg-cream"
              }`}
            >
              <Icon size={15} /> {text}
            </button>
          ))}
        </div>
      </div>

      {view === "calendar" ? (
        <CalendarView events={filtered} />
      ) : (
        <>
          {featured && <Featured e={featured} />}

          {months.length > 0 && (
            <div className="mt-16 space-y-14">
              {months.map(([label, list]) => (
                <section key={label} aria-label={label} className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-display text-2xl text-navy sm:text-3xl">{label}</h2>
                    <span className="h-px flex-1 bg-navy/10" />
                    <span className="text-sm text-ink-muted">
                      {list.length} {list.length === 1 ? "event" : "events"}
                    </span>
                  </div>
                  <div className="relative space-y-5 sm:pl-8">
                    {/* Timeline rail */}
                    <span className="absolute bottom-4 left-[7px] top-4 hidden w-0.5 rounded-full bg-gradient-to-b from-primary/40 via-gold/40 to-transparent sm:block" aria-hidden="true" />
                    {list.map((e) => (
                      <div key={e.slug} className="relative">
                        <span
                          className={`absolute -left-8 top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full ring-4 ring-cream sm:block ${TONES[e.category].dot}`}
                          aria-hidden="true"
                        />
                        <EventCard e={e} />
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
