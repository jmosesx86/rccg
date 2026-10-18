import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Music, DoorOpen, MonitorPlay, HandHeart, Sparkles, Megaphone } from "lucide-react";
import { ministries, departments } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import Img from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "Ministries",
  description: "Men, Women, Youth and Children's ministries plus service departments at RCCG Agape House Nashville.",
};

const deptIcons = [Music, DoorOpen, MonitorPlay, HandHeart, Sparkles, Megaphone];

export default function MinistriesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Ministries"
        description="There's a place for everyone to grow, serve and belong at Agape House."
        breadcrumbs={[{ label: "Ministries" }]}
        image="/m02.jpg"
      />

      <section className="section bg-white">
        <div className="container-site space-y-8">
          {ministries.map((m, i) => (
            <Reveal key={m.slug}>
              <Link
                href={`/ministries/${m.slug}`}
                className="group grid overflow-hidden rounded-[2rem] bg-cream transition hover:shadow-lift md:grid-cols-2"
              >
                <div className={`relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[340px] ${i % 2 ? "md:order-2" : ""}`}>
                  <Img src={m.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <span aria-hidden="true" data-num={`0${i + 1}`} className="block h-12 font-display text-5xl text-primary/20 before:content-[attr(data-num)]" />
                  <h2 className="mt-2 text-3xl sm:text-4xl">{m.name}</h2>
                  <p className="mt-4 leading-relaxed text-ink-muted">{m.summary}</p>
                  <p className="mt-4 text-sm font-medium text-navy">Meets: {m.meets}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all group-hover:gap-3">
                    Learn more <ArrowRight size={17} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-navy-radial text-white">
        <div className="container-site">
          <SectionHeading
            tone="light"
            eyebrow="Serve with us"
            title="Departments & service teams"
            description="Use your gifts to bless others. Every team is open to members who want to serve."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d, i) => {
              const Icon = deptIcons[i % deptIcons.length];
              return (
                <Reveal key={d.name} delay={(i % 3) * 100}>
                  <div className="h-full rounded-3xl bg-white/5 p-7 ring-1 ring-white/10 transition hover:bg-white/10">
                    <Icon size={26} className="text-gold-light" />
                    <h3 className="mt-5 text-xl text-white">{d.name}</h3>
                    <p className="mt-2 text-[15px] text-white/65">{d.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to get involved?"
        text="Tell us where you'd like to serve and a ministry leader will be in touch."
        primary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
