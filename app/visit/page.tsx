import type { Metadata } from "next";
import { Clock, Car, Shirt, Baby, Music, Coffee, MapPin } from "lucide-react";
import { church, services, visitFaqs } from "@/lib/church";
import { formatServiceTime, serviceDayLabel } from "@/lib/schedule";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import MapEmbed from "@/components/ui/MapEmbed";
import VisitForm from "./VisitForm";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description: `Service times, directions and what to expect at ${church.name}, ${church.address.full}.`,
};

const expect = [
  { icon: Clock, title: "About 2 hours", text: "Worship, prayer, the Word and fellowship — no rush." },
  { icon: Music, title: "Lively worship", text: "Expect joyful, Spirit-filled praise with our choir and band." },
  { icon: Shirt, title: "Come as you are", text: "Traditional attire, suits or jeans — all are welcome." },
  { icon: Baby, title: "Kids are covered", text: "Safe, fun Children's Church during the service." },
  { icon: Car, title: "Free parking", text: "Plenty of on-site parking at our Murfreesboro Pike location." },
  { icon: Coffee, title: "Stay & connect", text: "Meet our pastors and new friends after the service." },
];

export default function VisitPage() {
  return (
    <>
      <PageHeader
        eyebrow="I'm new"
        title="Plan your visit"
        description="Visiting a new church can feel like a big step. Here's everything you need to know so you can relax and enjoy your first Sunday."
        breadcrumbs={[{ label: "Plan Your Visit" }]}
        image="/f01.jpg"
      />

      <section className="relative z-10 -mt-12">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.name} className="card p-7">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{serviceDayLabel(s)}</span>
              <p className="mt-2 font-display text-3xl text-navy">{formatServiceTime(s)}</p>
              <p className="mt-1 text-sm text-ink-muted">
                {s.name} · {s.location}
              </p>
            </div>
          ))}
          <a href={church.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="card card-hover p-7">
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <MapPin size={14} /> Location
            </span>
            <p className="mt-2 font-display text-2xl text-navy">{church.address.line1}</p>
            <p className="mt-1 text-sm text-ink-muted">
              {church.address.city}, {church.address.state} {church.address.zip} · Get directions →
            </p>
          </a>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading eyebrow="Your first Sunday" title="What to expect" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {expect.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 3) * 100}>
                <div className="flex gap-5 rounded-3xl p-6 transition hover:bg-cream">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-50 text-primary">
                    <Icon size={24} />
                  </span>
                  <span>
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-1 text-[15px] text-ink-muted">{text}</p>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Let us know"
              title="We'll save you a seat"
              description="Tell us you're coming and someone from our welcome team will meet you at the door, show you around and help get the kids settled."
            />
            <MapEmbed className="mt-10 h-80" />
          </div>
          <VisitForm />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Frequently asked" />
          <div className="mt-12">
            <Faq items={visitFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
