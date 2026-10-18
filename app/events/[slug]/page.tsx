import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, MapPin, CalendarPlus, Download, Navigation } from "lucide-react";
import { church } from "@/lib/church";
import { events, eventBySlug, eventDateParts, googleCalendarUrl, upcomingEvents } from "@/lib/content";
import ShareButton from "@/components/ui/ShareButton";
import MapEmbed from "@/components/ui/MapEmbed";
import JsonLd from "@/components/seo/JsonLd";
import { eventSchema } from "@/lib/structuredData";
import Img from "@/components/ui/Img";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const e = eventBySlug(slug);
  return e ? { title: e.title, description: e.summary, openGraph: { images: [e.image] } } : {};
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = eventBySlug(slug);
  if (!event) notFound();
  const start = eventDateParts(event.start);
  const end = eventDateParts(event.end);
  const more = upcomingEvents().filter((e) => e.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={eventSchema(event)} />
      <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-40 text-white md:pt-48">
        <Img priority quality={45} src={event.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="container-site">
          <Link href="/events" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft size={16} /> All events
          </Link>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end">
            <div className="flex w-24 shrink-0 flex-col items-center rounded-3xl bg-primary py-4 shadow-glow">
              <span className="font-display text-5xl leading-none">{start.day}</span>
              <span className="mt-1 text-sm font-bold uppercase tracking-widest">{start.month}</span>
            </div>
            <div>
              <span className="eyebrow eyebrow-light">{event.category}</span>
              <h1 className="heading-xl mt-3 text-white">{event.title}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="heading-lg">About this event</h2>
            <p className="lead mt-5">{event.summary}</p>
            <p className="mt-5 leading-relaxed text-ink-muted">
              Everyone is welcome — bring your family and friends. If you have questions, call us on {church.phone.display} or
              email {church.email}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={googleCalendarUrl(event)} target="_blank" rel="noopener noreferrer" className="btn-primary">
                <CalendarPlus size={16} /> Google Calendar
              </a>
              <a href={`/events/${event.slug}/ics`} className="btn-outline-dark">
                <Download size={16} /> Apple / Outlook (.ics)
              </a>
              <ShareButton title={event.title} />
            </div>
            <MapEmbed className="mt-12 h-80" />
          </div>

          <div className="space-y-6">
            <div className="card divide-y divide-navy/5">
              {[
                { icon: CalendarDays, label: "Date", value: `${start.weekday}, ${start.long}` },
                { icon: Clock, label: "Time", value: `${start.time} – ${end.time} CT` },
                { icon: MapPin, label: "Location", value: `${event.location}, ${church.address.full}` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 p-6">
                  <Icon size={20} className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft">{label}</span>
                    <span className="mt-1 block font-medium text-navy">{value}</span>
                  </span>
                </div>
              ))}
              <a href={church.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 p-5 text-sm font-semibold text-primary hover:bg-cream">
                <Navigation size={15} /> Get directions
              </a>
            </div>

            {more.length > 0 && (
              <div>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">More events</h3>
                <div className="mt-4 space-y-3">
                  {more.map((e) => {
                    const d = eventDateParts(e.start);
                    return (
                      <Link key={e.slug} href={`/events/${e.slug}`} className="flex items-center gap-4 rounded-2xl p-3 transition hover:bg-cream">
                        <span className="flex w-14 shrink-0 flex-col items-center rounded-xl bg-navy py-2 text-white">
                          <span className="font-display text-xl leading-none">{d.day}</span>
                          <span className="text-[10px] font-bold uppercase text-gold-light">{d.month}</span>
                        </span>
                        <span className="font-display text-lg text-navy">{e.title}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
