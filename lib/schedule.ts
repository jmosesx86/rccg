import { church, services, type Service } from "./church";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** Wall-clock parts of `date` in the church's timezone. */
function zonedParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: church.timezone,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

/** Converts a wall-clock time in the church timezone to a real Date. */
function zonedToDate(y: number, m: number, d: number, h: number, min: number) {
  const guess = Date.UTC(y, m - 1, d, h, min);
  const p = zonedParts(new Date(guess));
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return new Date(guess - (asUtc - guess));
}

export type Occurrence = { service: Service; start: Date; end: Date };

/** Next start (or currently running occurrence) of every service, soonest first. */
export function upcomingServices(now: Date = new Date()): Occurrence[] {
  const today = zonedParts(now);
  const out: Occurrence[] = [];

  for (const service of services) {
    for (let offset = 0; offset < 45; offset++) {
      const base = new Date(Date.UTC(today.year, today.month - 1, today.day + offset));
      if (base.getUTCDay() !== service.day) continue;
      if (service.weekOfMonth && Math.ceil(base.getUTCDate() / 7) !== service.weekOfMonth) continue;

      const start = zonedToDate(
        base.getUTCFullYear(),
        base.getUTCMonth() + 1,
        base.getUTCDate(),
        service.hour,
        service.minute
      );
      const end = new Date(start.getTime() + service.durationMinutes * 60_000);
      if (end > now) {
        out.push({ service, start, end });
        break;
      }
    }
  }
  return out.sort((a, b) => a.start.getTime() - b.start.getTime());
}

export function nextService(now: Date = new Date()): Occurrence & { isLive: boolean } {
  const next = upcomingServices(now)[0];
  return { ...next, isLive: next.start <= now };
}

export function formatServiceTime(s: Pick<Service, "hour" | "minute">) {
  const h = s.hour % 12 || 12;
  const m = s.minute.toString().padStart(2, "0");
  return `${h}:${m} ${s.hour < 12 ? "AM" : "PM"}`;
}

export function serviceDayLabel(s: Service) {
  const day = `${DAY_NAMES[s.day]}s`;
  if (!s.weekOfMonth) return day;
  const ord = ["", "First", "Second", "Third", "Fourth", "Fifth"][s.weekOfMonth];
  return `${ord} ${DAY_NAMES[s.day]}`;
}
