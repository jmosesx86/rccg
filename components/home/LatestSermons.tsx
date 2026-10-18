"use client";
import { useState } from "react";
import Link from "next/link";
import { Play, ArrowRight, CalendarDays, Youtube } from "lucide-react";
import { church } from "@/lib/church";
import { formatSermonDate, type Sermon } from "@/lib/youtube";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoModal from "@/components/ui/VideoModal";
import VideoThumb from "@/components/ui/VideoThumb";

export default function LatestSermons({ sermons }: { sermons: Sermon[] }) {
  const [playing, setPlaying] = useState<Sermon | null>(null);
  const [featured, ...rest] = sermons;
  if (!featured) return null;

  return (
    <section className="section relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-navy-radial" aria-hidden="true" />
      <div className="container-site relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            tone="light"
            eyebrow="Agape TV"
            title="Latest messages"
            description="Missed a Sunday? Catch up on recent sermons and grow in the Word all week long."
          />
          <div className="flex shrink-0 gap-3">
            <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <Youtube size={17} /> Subscribe
            </a>
            <Link href="/sermons" className="btn-primary">
              All sermons <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <button
              type="button"
              onClick={() => setPlaying(featured)}
              className="group relative block aspect-[16/11] w-full overflow-hidden rounded-3xl text-left shadow-2xl sm:aspect-video lg:aspect-auto lg:h-full lg:min-h-[460px]"
            >
              <VideoThumb id={featured.id} sizes="(min-width: 1024px) 60vw, 100vw" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
              <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-glow transition group-hover:scale-110">
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/60" />
                <Play size={28} className="relative ml-1" fill="currentColor" />
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950">
                  Latest · {featured.series}
                </span>
                <h3 className="mt-4 text-2xl text-white sm:text-3xl">{featured.title}</h3>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/70">
                  <span className="flex items-center gap-1.5"><CalendarDays size={14} /> {formatSermonDate(featured.date)}</span>
                  
                </p>
              </div>
            </button>
          </Reveal>

          <div className="flex flex-col gap-4">
            {rest.slice(0, 3).map((s, i) => (
              <Reveal key={s.slug} delay={i * 100}>
                <button
                  type="button"
                  onClick={() => setPlaying(s)}
                  className="group flex w-full items-center gap-5 rounded-2xl bg-white/5 p-4 text-left ring-1 ring-white/10 transition hover:bg-white/10"
                >
                  <span className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl sm:w-28">
                    <VideoThumb id={s.id} sizes="112px" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <span className="absolute inset-0 grid place-items-center bg-navy-950/40 transition group-hover:bg-primary/60">
                      <Play size={20} fill="currentColor" className="ml-0.5" />
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="text-xs font-semibold uppercase tracking-wider text-gold-light">{s.series}</span>
                    <span className="mt-1 block font-display text-lg leading-snug text-white">{s.title}</span>
                    <span className="mt-1 block text-sm text-white/55">
                      {formatSermonDate(s.date)}
                    </span>
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
      <VideoModal youtubeId={playing?.id ?? null} title={playing?.title} onClose={() => setPlaying(null)} />
    </section>
  );
}
