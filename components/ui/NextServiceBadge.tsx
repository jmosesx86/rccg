"use client";
import Link from "next/link";
import { church } from "@/lib/church";
import { nextService, formatServiceTime } from "@/lib/schedule";
import { useNow } from "./useNow";

function relative(start: Date, now: Date) {
  const mins = Math.max(0, Math.round((start.getTime() - now.getTime()) / 60_000));
  const d = Math.floor(mins / 1440);
  const h = Math.floor((mins % 1440) / 60);
  const m = mins % 60;
  if (d > 0) return `in ${d}d ${h}h`;
  if (h > 0) return `in ${h}h ${m}m`;
  return `in ${m}m`;
}

/** "Next: Sunday Worship · Sun 10:00 AM · in 2d 4h", or a LIVE indicator during service. */
export default function NextServiceBadge({ className = "" }: { className?: string }) {
  const now = useNow();

  if (!now) return <span className={`inline-block h-4 w-64 ${className}`} aria-hidden="true" />;
  const next = nextService(now);

  if (next.isLive) {
    return (
      <Link href="/live" className={`inline-flex items-center gap-2 font-medium text-white ${className}`}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-primary-light" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary-light" />
        </span>
        <span className="font-semibold uppercase tracking-wider text-primary-light">Live now</span>
        <span className="hidden text-white/80 sm:inline">{next.service.name} — join us</span>
      </Link>
    );
  }

  const day = next.start.toLocaleDateString("en-US", { weekday: "short", timeZone: church.timezone });
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
      <span className="text-white/60">
        Next<span className="sm:hidden"> service</span>:
      </span>
      <span className="hidden font-medium text-white sm:inline">{next.service.name}</span>
      <span className="text-white/60">
        <span className="hidden sm:inline">· </span>
        {day} {formatServiceTime(next.service)} CT · {relative(next.start, now)}
      </span>
    </span>
  );
}
