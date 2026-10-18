import type { Metadata } from "next";
import Link from "next/link";
import { Youtube, Video, MessageCircleHeart, HandHeart, ArrowRight } from "lucide-react";
import { church, services } from "@/lib/church";
import { formatServiceTime, serviceDayLabel } from "@/lib/schedule";
import { getSermons, formatSermonDate } from "@/lib/youtube";
import LivePlayer from "./LivePlayer";
import VideoThumb from "@/components/ui/VideoThumb";

export const metadata: Metadata = {
  title: "Watch Live",
  description: `Worship with RCCG Agape House Nashville online — ${services.map((s) => `${serviceDayLabel(s)} at ${formatServiceTime(s)}`).join(" and ")} (CT).`,
};

export const revalidate = 3600;

export default async function LivePage() {
  const sermons = (await getSermons()).slice(0, 4);
  return (
    <>
      <section className="bg-navy-radial pb-20 pt-36 text-white md:pt-44">
        <div className="container-site">
          <span className="eyebrow eyebrow-light">Agape TV</span>
          <h1 className="heading-xl mt-3 text-white">Worship with us online</h1>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <LivePlayer />
            <div className="flex flex-col gap-4">
              {services.map((s) => (
                <div key={s.name} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
                    {s.location === "Online (Zoom)" ? <Video size={14} /> : <Youtube size={14} />} {s.location}
                  </p>
                  <p className="mt-2 font-display text-2xl">{s.name}</p>
                  <p className="text-sm text-white/60">
                    {serviceDayLabel(s)} · {formatServiceTime(s)} CT
                  </p>
                </div>
              ))}
              <Link href="/prayer" className="group rounded-2xl bg-primary p-6 transition hover:bg-primary-dark">
                <HandHeart size={22} />
                <p className="mt-3 font-display text-xl">Need prayer during the service?</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-white/90">
                  Send a request <ArrowRight size={14} className="transition group-hover:translate-x-1" />
                </p>
              </Link>
              <a href={`mailto:${church.email}?subject=I%20watched%20online`} className="flex items-center gap-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                <MessageCircleHeart size={22} className="text-gold-light" />
                <span className="text-sm">Watching for the first time? <span className="font-semibold">Say hello!</span></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site">
          <div className="flex items-end justify-between gap-6">
            <h2 className="heading-lg">Catch up on recent messages</h2>
            <Link href="/sermons" className="btn-ghost hidden sm:inline-flex">
              All sermons <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sermons.map((s) => (
              <Link key={s.id} href={`/sermons/${s.slug}`} className="card card-hover group overflow-hidden">
                <VideoThumb id={s.id} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-video w-full object-cover" />
                <div className="p-5">
                  <p className="text-xs text-ink-muted">{formatSermonDate(s.date)}</p>
                  <h3 className="mt-1 text-lg leading-snug group-hover:text-primary">{s.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
