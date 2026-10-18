"use client";
import { useState } from "react";
import { useNow } from "@/components/ui/useNow";
import { BookOpenText, Share2, Check } from "lucide-react";
import { verses } from "@/lib/content";
import Img from "@/components/ui/Img";

function dayIndex(date: Date) {
  const start = Date.UTC(date.getFullYear(), 0, 0);
  const today = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor((today - start) / 86_400_000);
}

export default function VerseOfTheDay() {
  const now = useNow();
  const [copied, setCopied] = useState(false);
  const verse = verses[now ? dayIndex(now) % verses.length : 0];

  async function share() {
    const text = `“${verse.text}” — ${verse.reference} (KJV)`;
    try {
      if (navigator.share) {
        await navigator.share({ text });
        return;
      }
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled */
    }
  }

  return (
    <section className="relative isolate overflow-hidden bg-navy-radial py-24 text-center md:py-32">
      <Img src="/g03.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.12]" />
      <span
        className="pointer-events-none absolute left-1/2 top-4 -z-10 -translate-x-1/2 font-display text-[16rem] leading-none text-white/[0.04]"
        aria-hidden="true"
      >
        “
      </span>
      <div className="container-site max-w-4xl">
        <span className="eyebrow eyebrow-light justify-center">
          <BookOpenText size={14} /> Verse of the day
        </span>
        <blockquote key={verse.reference} className="animate-fade-in">
          <p className="mt-8 font-display text-2xl italic leading-snug text-white sm:text-3xl md:text-4xl">
            “{verse.text}”
          </p>
          <footer className="mt-8 text-sm font-semibold uppercase tracking-[0.25em] text-gold-light">
            {verse.reference} <span className="text-white/40">· KJV</span>
          </footer>
        </blockquote>
        <button
          type="button"
          onClick={share}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white/80 transition hover:border-white hover:text-white"
        >
          {copied ? <Check size={15} /> : <Share2 size={15} />} {copied ? "Copied!" : "Share this verse"}
        </button>
      </div>
    </section>
  );
}
