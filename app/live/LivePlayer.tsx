"use client";
import { Radio, Youtube, Video, CalendarClock } from "lucide-react";
import { church } from "@/lib/church";
import { nextService, formatServiceTime } from "@/lib/schedule";
import { useNow } from "@/components/ui/useNow";
import Img from "@/components/ui/Img";

function countdown(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${d > 0 ? `${d}d ` : ""}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function LivePlayer() {
  const now = useNow();

  const next = now ? nextService(now) : null;
  const isZoom = next?.service.location === "Online (Zoom)";

  // During a streamed service, play YouTube's always-current live player right here.
  if (next?.isLive && !isZoom) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
        <iframe
          src={`https://www.youtube.com/embed/live_stream?channel=${church.youtubeChannelId}&autoplay=1&mute=1`}
          title={`${next.service.name} — live`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
      <Img src="/p03.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/50 to-transparent" />
      <div className="relative flex h-full flex-col items-center justify-center p-6 text-center text-white">
        {!next ? null : next.isLive ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest">
              <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Live now
            </span>
            <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">{next.service.name}</h2>
            <p className="mt-2 text-white/70">{isZoom ? "We're meeting on Zoom right now." : "We're streaming right now."}</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {isZoom ? (
                church.zoomUrl ? (
                  <a href={church.zoomUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
                    <Video size={18} /> Join on Zoom
                  </a>
                ) : (
                  <a href={`mailto:${church.email}?subject=Zoom%20link%20request`} className="btn-primary btn-lg">
                    <Video size={18} /> Request the Zoom link
                  </a>
                )
              ) : (
                <a href={church.liveStreamUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-lg">
                  <Youtube size={18} /> Watch on YouTube
                </a>
              )}
            </div>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest ring-1 ring-white/20 backdrop-blur">
              <CalendarClock size={14} /> Next live service
            </span>
            <h2 className="mt-5 font-display text-3xl text-white sm:text-4xl">{next.service.name}</h2>
            <p className="mt-2 text-white/70">
              {next.start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: church.timezone })} ·{" "}
              {formatServiceTime(next.service)} CT
            </p>
            <p className="mt-6 font-display text-5xl tabular-nums text-gold-light [font-variant-numeric:lining-nums_tabular-nums] sm:text-6xl">
              {countdown(next.start.getTime() - now!.getTime())}
            </p>
            <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline mt-8">
              <Radio size={16} /> Subscribe for reminders
            </a>
          </>
        )}
      </div>
    </div>
  );
}
