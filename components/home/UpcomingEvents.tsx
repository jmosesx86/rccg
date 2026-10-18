import Link from "next/link";
import { ArrowRight, Clock, MapPin, CalendarPlus } from "lucide-react";
import { upcomingEvents, eventDateParts, googleCalendarUrl } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Img from "@/components/ui/Img";

export default function UpcomingEvents() {
  const list = upcomingEvents(new Date(), 3);
  if (list.length === 0) return null;
  const [first, ...others] = list;
  const f = eventDateParts(first.start);

  return (
    <section className="section bg-cream">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Upcoming events"
            title="Mark your calendar"
            description="Special services and gatherings you won't want to miss."
          />
          <Link href="/events" className="btn-outline-dark shrink-0">
            View all events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="h-full">
            <article className="card group relative h-full overflow-hidden">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Img sizes="(min-width: 1024px) 50vw, 100vw" src={first.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute left-5 top-5 rounded-2xl bg-white px-4 py-3 text-center shadow-soft">
                  <span className="block font-display text-3xl leading-none text-primary">{f.day}</span>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-widest text-navy">{f.month}</span>
                </div>
                <span className="absolute right-5 top-5 rounded-full bg-navy/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  {first.category}
                </span>
              </div>
              <div className="p-7">
                <h3 className="text-2xl">{first.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{first.summary}</p>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                  <span className="flex items-center gap-2"><Clock size={15} className="text-primary" /> {f.weekday}, {f.time}</span>
                  <span className="flex items-center gap-2"><MapPin size={15} className="text-primary" /> {first.location}</span>
                </div>
                <a href={googleCalendarUrl(first)} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6">
                  <CalendarPlus size={16} /> Add to calendar
                </a>
              </div>
            </article>
          </Reveal>

          <div className="flex flex-col gap-6">
            {others.map((e, i) => {
              const d = eventDateParts(e.start);
              return (
                <Reveal key={e.slug} delay={(i + 1) * 100} className="flex-1">
                  <article className="card card-hover flex h-full flex-col gap-6 p-6 sm:flex-row sm:items-center">
                    <div className="flex w-20 shrink-0 flex-col items-center justify-center rounded-2xl bg-navy py-4 text-white">
                      <span className="font-display text-3xl leading-none">{d.day}</span>
                      <span className="mt-1 text-xs font-bold uppercase tracking-widest text-gold-light">{d.month}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold uppercase tracking-wider text-primary">{e.category}</span>
                      <h3 className="mt-1 text-xl">{e.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{e.summary}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {d.weekday}, {d.time}</span>
                        <a
                          href={googleCalendarUrl(e)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 font-semibold text-primary hover:underline"
                        >
                          <CalendarPlus size={14} /> Add to calendar
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
