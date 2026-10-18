import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { church, services } from "@/lib/church";
import { formatServiceTime, serviceDayLabel } from "@/lib/schedule";

/** Address, phone, email and service times as a stack of cards. */
export default function ContactCards() {
  const items = [
    { icon: MapPin, title: "Visit us", lines: [church.address.full], href: church.address.mapsUrl, external: true },
    { icon: Phone, title: "Call us", lines: [church.phone.display], href: church.phone.href },
    { icon: Mail, title: "Email us", lines: [church.email], href: `mailto:${church.email}` },
    {
      icon: Clock,
      title: "Service times",
      lines: services.map((s) => `${serviceDayLabel(s)} · ${formatServiceTime(s)}`),
    },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      {items.map(({ icon: Icon, title, lines, href, external }) => {
        const inner = (
          <>
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary">
              <Icon size={20} />
            </span>
            <span>
              <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">{title}</span>
              {lines.map((l) => (
                <span key={l} className="mt-0.5 block font-medium text-navy">
                  {l}
                </span>
              ))}
            </span>
          </>
        );
        const cls = "card flex items-start gap-4 p-5";
        return href ? (
          <a key={title} href={href} className={`${cls} card-hover`} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {inner}
          </a>
        ) : (
          <div key={title} className={cls}>
            {inner}
          </div>
        );
      })}
    </div>
  );
}
