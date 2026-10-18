"use client";
import { useEffect } from "react";
import { X } from "lucide-react";

type VideoModalProps = {
  youtubeId: string | null;
  title?: string;
  onClose: () => void;
};

export default function VideoModal({ youtubeId, title = "Video", onClose }: VideoModalProps) {
  useEffect(() => {
    if (!youtubeId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [youtubeId, onClose]);

  if (!youtubeId) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex animate-fade-in items-center justify-center bg-navy-950/90 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        aria-label="Close video"
      >
        <X size={22} />
      </button>
      <div className="aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
