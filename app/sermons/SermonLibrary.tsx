"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Play, X } from "lucide-react";
import { formatSermonDate, type Sermon } from "@/lib/youtube";
import Select from "@/components/forms/Select";
import VideoThumb from "@/components/ui/VideoThumb";

export default function SermonLibrary({ sermons }: { sermons: Sermon[] }) {
  const [query, setQuery] = useState("");
  const [series, setSeries] = useState("All");

  const allSeries = useMemo(() => ["All", ...[...new Set(sermons.map((s) => s.series))].sort()], [sermons]);

  const results = sermons.filter((s) => {
    const q = query.trim().toLowerCase();
    const matchesQ = !q || [s.title, s.series, formatSermonDate(s.date)].some((f) => f.toLowerCase().includes(q));
    return matchesQ && (series === "All" || s.series === series);
  });

  const filtered = query || series !== "All";

  return (
    <div>
      <div className="card flex flex-col gap-4 p-4 md:flex-row md:items-center">
        <label className="relative flex-1">
          <span className="sr-only">Search sermons</span>
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, series or month…"
            className="input pl-11"
          />
        </label>
        <Select
          className="md:w-64"
          aria-label="Filter by series"
          value={series}
          onChange={setSeries}
          options={allSeries.map((x) => ({ value: x, label: x === "All" ? "All services" : x }))}
        />
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-ink-muted">
        <span>
          {results.length} {results.length === 1 ? "message" : "messages"}
        </span>
        {filtered && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setSeries("All");
            }}
            className="flex items-center gap-1 font-semibold text-primary"
          >
            <X size={14} /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="mt-16 text-center text-ink-muted">No sermons match your search. Try a different keyword.</p>
      ) : (
        <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((s) => (
            <Link key={s.id} href={`/sermons/${s.slug}`} className="card card-hover group overflow-hidden">
              <div className="relative aspect-video overflow-hidden bg-navy">
                <VideoThumb
                  id={s.id}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-navy-950/30 transition group-hover:bg-navy-950/10" />
                <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-primary shadow-lg transition group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                  <Play size={20} fill="currentColor" className="ml-0.5" />
                </span>
                <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {s.series}
                </span>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">{formatSermonDate(s.date)}</p>
                <h2 className="mt-2 text-xl leading-snug">{s.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
