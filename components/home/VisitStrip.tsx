import Link from "next/link";
import { Church, Video, MapPin, ArrowUpRight } from "lucide-react";
import { church, services } from "@/lib/church";
import { formatServiceTime, serviceDayLabel } from "@/lib/schedule";

export default function VisitStrip() {
  const [sunday, midweek] = services;
  const items = [
    {
      icon: Church,
      label: serviceDayLabel(sunday),
      title: formatServiceTime(sunday),
      text: `${sunday.name} · ${sunday.location}`,
      href: "/visit",
      cta: "What to expect",
    },
    {
      icon: Video,
      label: serviceDayLabel(midweek),
      title: formatServiceTime(midweek),
      text: `${midweek.name} · ${midweek.location}`,
      href: "/live",
      cta: "Join online",
    },
    {
      icon: MapPin,
      label: "Find us",
      title: church.address.line1,
      text: `${church.address.city}, ${church.address.state} ${church.address.zip}`,
      href: church.address.mapsUrl,
      cta: "Get directions",
      external: true,
    },
  ];

  return (
    <section className="relative z-10 -mt-14 md:-mt-16" aria-label="Service times and location">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-navy/5 md:grid-cols-3">
          {items.map(({ icon: Icon, label, title, text, href, cta, external }, i) => {
            const body = (
              <>
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary transition group-hover:bg-primary group-hover:text-white">
                  <Icon size={24} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">{label}</span>
                  <span className="mt-1 block font-display text-2xl text-navy">{title}</span>
                  <span className="mt-1 block text-sm text-ink-muted">{text}</span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    {cta} <ArrowUpRight size={15} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              </>
            );
            const cls = `group flex items-start gap-5 p-7 transition hover:bg-cream md:p-8 ${
              i > 0 ? "border-t border-navy/5 md:border-l md:border-t-0" : ""
            }`;
            return external ? (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {body}
              </a>
            ) : (
              <Link key={label} href={href} className={cls}>
                {body}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
