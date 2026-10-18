"use client";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { gallery } from "@/lib/content";
import Img from "@/components/ui/Img";

const CATEGORIES = ["All", "Worship", "Fellowship", "Ministries", "Events"] as const;

export default function GalleryGrid() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [open, setOpen] = useState<number | null>(null);
  const items = filter === "All" ? gallery : gallery.filter((g) => g.category === filter);

  const step = useCallback((n: number) => setOpen((i) => (i === null ? i : (i + n + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  const current = open !== null ? items[open] : null;

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === c ? "bg-primary text-white shadow-glow" : "bg-white text-navy ring-1 ring-navy/10 hover:ring-navy/30"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {items.map((g, i) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setOpen(i)}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl"
            aria-label={`Open photo: ${g.caption}`}
          >
            <Img sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" src={g.src} alt="" className="w-full transition duration-700 group-hover:scale-105" loading="lazy" />
            <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-navy-950/80 via-transparent p-4 text-left text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
              {g.caption}
              <Expand size={16} />
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div className="fixed inset-0 z-[80] flex animate-fade-in items-center justify-center bg-navy-950/95 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label={current.caption} onClick={() => setOpen(null)}>
          <button type="button" onClick={() => setOpen(null)} className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close">
            <X size={22} />
          </button>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-6" aria-label="Previous photo">
            <ChevronLeft size={24} />
          </button>
          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Img src={current.src} alt={current.caption} className="max-h-[80vh] w-auto rounded-2xl object-contain shadow-2xl" />
            <figcaption className="mt-4 text-center text-white/80">
              {current.caption} <span className="text-white/40">· {open! + 1} / {items.length}</span>
            </figcaption>
          </figure>
          <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-2 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-6" aria-label="Next photo">
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </>
  );
}
