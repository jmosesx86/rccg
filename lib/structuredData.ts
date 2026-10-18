import { church, services } from "./church";
import type { ChurchEvent } from "./content";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const pad = (n: number) => String(n).padStart(2, "0");

const address = {
  "@type": "PostalAddress",
  streetAddress: church.address.line1,
  addressLocality: church.address.city,
  addressRegion: church.address.state,
  postalCode: church.address.zip,
  addressCountry: "US",
};

/** schema.org Church with service times, rendered on every page. */
export function churchSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${church.url}/#church`,
    name: church.name,
    alternateName: church.fullName,
    description: church.description,
    slogan: church.tagline,
    url: church.url,
    logo: `${church.url}/logo.png`,
    image: `${church.url}/img01.jpg`,
    telephone: church.phone.href.replace("tel:", ""),
    email: church.email,
    address,
    sameAs: Object.values(church.social),
    parentOrganization: {
      "@type": "Organization",
      name: "The Redeemed Christian Church of God",
      url: "https://www.rccg.org",
    },
    openingHoursSpecification: services.map((s) => {
      const end = s.hour * 60 + s.minute + s.durationMinutes;
      return {
        "@type": "OpeningHoursSpecification",
        name: s.name,
        dayOfWeek: `https://schema.org/${DAYS[s.day]}`,
        opens: `${pad(s.hour)}:${pad(s.minute)}`,
        closes: `${pad(Math.floor(end / 60))}:${pad(end % 60)}`,
      };
    }),
  };
}

/** UTC offset for a church-local ISO string like "2026-11-22T10:00" (handles CST/CDT). */
function withOffset(local: string) {
  const [d, t] = local.split("T");
  const [y, m, day] = d.split("-").map(Number);
  const [hh, mm] = t.split(":").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, day, hh, mm));
  const name = new Intl.DateTimeFormat("en-US", { timeZone: church.timezone, timeZoneName: "shortOffset" })
    .formatToParts(guess)
    .find((p) => p.type === "timeZoneName")?.value; // e.g. "GMT-6"
  const hours = Number(name?.replace("GMT", "") || 0);
  const sign = hours <= 0 ? "-" : "+";
  return `${local}:00${sign}${pad(Math.abs(hours))}:00`;
}

/** schema.org Event for an event detail page. */
export function eventSchema(e: ChurchEvent) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.summary,
    startDate: withOffset(e.start),
    endDate: withOffset(e.end),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [`${church.url}${e.image}`],
    url: `${church.url}/events/${e.slug}`,
    location: { "@type": "Place", name: `${church.name} — ${e.location}`, address },
    organizer: { "@type": "Organization", name: church.name, url: church.url },
    isAccessibleForFree: true,
  };
}
