"use client";
import { useSyncExternalStore } from "react";

// One shared 1-second clock for every countdown on the page.
const listeners = new Set<() => void>();
let current = 0;
let timer: ReturnType<typeof setInterval> | undefined;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  if (!timer) {
    current = Date.now();
    timer = setInterval(() => {
      current = Date.now();
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

const getSnapshot = () => current || (current = Date.now());
const getServerSnapshot = () => 0;

/**
 * Current time, ticking every second. Returns `null` during server rendering and hydration
 * so time-dependent UI never causes a hydration mismatch.
 */
export function useNow(): Date | null {
  const ms = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return ms ? new Date(ms) : null;
}
