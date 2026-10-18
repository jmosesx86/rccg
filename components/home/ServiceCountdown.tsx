"use client";
import Link from "next/link";
import { CalendarPlus, MapPin, Radio, Video } from "lucide-react";
import { church } from "@/lib/church";
import { nextService, formatServiceTime } from "@/lib/schedule";
import { useNow } from "@/components/ui/useNow";

type Next = ReturnType<typeof nextService>;

function splitDuration(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    Days: Math.floor(s / 86400),
    Hours: Math.floor((s % 86400) / 3600),
    Mins: Math.floor((s % 3600) / 60),
    Secs: s % 60,
  };
}

function calendarUrl(next: Next) {
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${next.service.name} — ${church.name}`,
    dates: `${fmt(next.start)}/${fmt(next.end)}`,
    details: `Join us for ${next.service.name}. ${church.liveStreamUrl}`,
    location: church.address.full,
    recur: "RRULE:FREQ=WEEKLY",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Glass card in the hero counting down to the next service, or showing LIVE during it. */
export default function ServiceCountdown() {
  const now = useNow();

  const next = now ? nextService(now) : null;
  const online = next?.service.location !== "In person";

  return (
    <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white/10 p-6 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-xl sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/40 blur-3xl" />

      {!next ? (
        <div className="h-[268px] animate-pulse" aria-hidden="true" />
      ) : next.isLive ? (
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-white" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Live now
          </span>
          <h2 className="mt-5 font-display text-3xl text-white">{next.service.name}</h2>
          <p className="mt-2 text-white/70">We&apos;re worshipping right now. Join us online or come on in!</p>
          <div className="mt-6 grid gap-3">
            <Link href="/live" className="btn-primary btn-lg w-full">
              <Radio size={18} /> Join the live stream
            </Link>
            <a href={church.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-outline w-full">
              <MapPin size={16} /> Get directions
            </a>
          </div>
        </div>
      ) : (
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-light">Next gathering</p>
          <h2 className="mt-2 font-display text-2xl text-white sm:text-[1.7rem]">{next.service.name}</h2>
          <p className="mt-1 text-sm text-white/70">
            {next.start.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              timeZone: church.timezone,
            })}{" "}
            · {formatServiceTime(next.service)} CT
          </p>

          <div className="mt-6 grid grid-cols-4 gap-2" role="timer" aria-live="off">
            {Object.entries(splitDuration(next.start.getTime() - now!.getTime())).map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-navy-950/40 py-3 text-center ring-1 ring-white/10">
                <span className="block font-display text-3xl leading-none [font-variant-numeric:lining-nums_tabular-nums] sm:text-4xl">
                  {String(value).padStart(2, "0")}
                </span>
                <span className="mt-1.5 block text-[10px] font-semibold uppercase tracking-widest text-white/50">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
            {online ? <Video size={15} className="text-gold" /> : <MapPin size={15} className="text-gold" />}
            {next.service.location}
            {next.service.note ? ` · ${next.service.note}` : ""}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href={calendarUrl(next)} target="_blank" rel="noopener noreferrer" className="btn-gold btn-sm py-3">
              <CalendarPlus size={15} /> Add to calendar
            </a>
            <a
              href={church.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline btn-sm py-3"
            >
              <MapPin size={15} /> Directions
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
