import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Globe2, ArrowRight } from "lucide-react";
import { church, beliefs, services } from "@/lib/church";
import { formatServiceTime } from "@/lib/schedule";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import Img from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${church.name}, a parish of the Redeemed Christian Church of God in Nashville, TN.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Who we are"
        title="A family that loves God, His Word and people"
        description={church.description}
        breadcrumbs={[{ label: "About Us" }]}
        image="/img01.jpg"
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container-site grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Our story</span>
            <h2 className="heading-lg mt-4">Rooted in Nashville, connected to the nations</h2>
            {/* PLACEHOLDER history — replace with the church's own story */}
            <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-muted">
              <p>
                {church.name} began with a small group of believers with a big vision: to build a house where people
                from every background could encounter the love of God and grow into all He created them to be.
              </p>
              <p>
                Today we are a growing, multicultural family on Murfreesboro Pike, led by {church.pastors}. We are
                a parish of the Redeemed Christian Church of God, part of a worldwide movement of churches in more
                than 190 nations.
              </p>
              <p>
                Our heartbeat is captured in our tagline, <em className="text-navy">“{church.tagline}”</em>. We
                exist to make heaven, to take as many people as possible with us, and to be a light in our city.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <Img sizes="(min-width: 1024px) 25vw, 50vw" src="/g01.jpg" alt="Worship at Agape House" className="aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
            <Img sizes="(min-width: 1024px) 25vw, 50vw" src="/p02.jpg" alt="Church members in fellowship" className="mt-12 aspect-[3/4] w-full rounded-3xl object-cover shadow-soft" />
          </Reveal>
        </div>
      </section>

      {/* Mission / vision */}
      <section className="section bg-cream">
        <div className="container-site grid gap-6 md:grid-cols-3">
          {[
            { icon: Target, title: "Our mission", text: church.mission },
            {
              icon: Eye,
              title: "Our vision",
              text: "To make heaven, to take as many people as possible with us, and to plant churches within five minutes' walk of every person.",
            },
            {
              icon: Globe2,
              title: "Our family",
              text: "Part of The Redeemed Christian Church of God, a global family of believers founded in 1952 and present in over 190 nations.",
            },
          ].map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 100} className="h-full">
              <div className="card h-full p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-gold-light">
                  <Icon size={26} />
                </span>
                <h3 className="mt-6 text-2xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-ink-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Beliefs */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="What we believe"
            title="Our statement of faith"
            description="We hold to the historic Christian faith as taught in the Bible and affirmed by the Redeemed Christian Church of God."
          />
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-navy/10 ring-1 ring-navy/10 sm:grid-cols-2 lg:grid-cols-4">
            {beliefs.map((b, i) => (
              <div key={b.title} className="bg-white p-7 transition hover:bg-cream">
                <span aria-hidden="true" data-num={String(i + 1).padStart(2, "0")} className="block h-9 font-display text-3xl text-primary/30 before:content-[attr(data-num)]" />
                <h3 className="mt-3 text-lg">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastors teaser */}
      <section className="section relative overflow-hidden bg-navy-radial text-white">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Img sizes="384px" src="/pst01.jpg" alt={church.pastors} className="mx-auto aspect-[4/5] w-full max-w-sm rounded-[2rem] object-cover shadow-2xl" />
          <div>
            <span className="eyebrow eyebrow-light">Leadership</span>
            <h2 className="heading-lg mt-4 text-white">Meet {church.pastors}</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Our pastors lead with humility, a love for God&apos;s Word and a deep care for every member of the
              Agape House family.
            </p>
            <Link href="/pastors" className="btn-gold btn-lg mt-8">
              Meet our pastors <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Come and see"
        title="We'd love to welcome you in person"
        text={`Join us this Sunday at ${formatServiceTime(services[0])}. There's a seat with your name on it.`}
        primary={{ label: "Plan your visit", href: "/visit" }}
        secondary={{ label: "Watch online", href: "/live" }}
      />
    </>
  );
}
