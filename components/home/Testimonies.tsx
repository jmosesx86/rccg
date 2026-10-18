"use client";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Mail } from "lucide-react";
import { church } from "@/lib/church";
import { testimonies } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import Img from "@/components/ui/Img";

export default function Testimonies() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = useCallback((n: number) => setI((n + testimonies.length) % testimonies.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % testimonies.length), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const t = testimonies[i];

  return (
    <section className="section bg-white">
      <div className="container-site grid items-center gap-14 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Testimonies"
            title="What God is doing among us"
            description="Every week we celebrate answered prayers, restored lives and new beginnings. Has God done something for you?"
          />
          <a href={`mailto:${church.testimonyEmail}`} className="btn-navy btn-lg mt-8">
            <Mail size={17} /> Share your testimony
          </a>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2rem] bg-cream" aria-hidden="true" />
          <figure key={i} className="card animate-fade-in p-8 sm:p-12" aria-live="polite">
            <Quote size={44} className="text-primary/20" fill="currentColor" />
            <blockquote className="mt-4 font-display text-xl leading-relaxed text-navy sm:text-2xl">“{t.text}”</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <Img sizes="56px" src={t.image} alt="" className="h-14 w-14 rounded-full object-cover ring-4 ring-cream" />
              <span>
                <span className="block font-semibold text-navy">{t.name}</span>
                <span className="block text-sm text-ink-muted">{t.role}</span>
              </span>
            </figcaption>
          </figure>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {testimonies.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => go(n)}
                  aria-label={`Show testimony ${n + 1}`}
                  aria-current={n === i}
                  className="group grid h-6 min-w-6 place-items-center"
                >
                  <span
                    className={`block h-2 rounded-full transition-all ${n === i ? "w-8 bg-primary" : "w-2 bg-navy/20 group-hover:bg-navy/40"}`}
                  />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous testimony" className="grid h-11 w-11 place-items-center rounded-full border border-navy/15 text-navy transition hover:bg-navy hover:text-white">
                <ChevronLeft size={18} />
              </button>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next testimony" className="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition hover:bg-primary">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
