"use client";
import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function canPlay() {
  const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  return window.matchMedia(QUERY).matches && !saveData;
}

/** Background video for larger screens only; phones, data-saver and reduced-motion users see the still image. */
export default function HeroVideo() {
  const enabled = useSyncExternalStore(subscribe, canPlay, () => false);
  if (!enabled) return null;
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 -z-20 h-full w-full animate-fade-in object-cover"
      aria-hidden="true"
    >
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
