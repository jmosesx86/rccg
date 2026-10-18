import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { church, leadPastors, leadershipTeam } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/ui/CtaBand";
import Img from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "Our Pastors",
  description: `Meet ${church.pastors} and the leadership team of ${church.name}.`,
};

function initials(role: string) {
  return role
    .split(/\s|&/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export default function PastorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Leadership"
        title="Our Pastors"
        description="Shepherds with a heart for God and for people."
        breadcrumbs={[{ label: "About", href: "/about" }, { label: "Our Pastors" }]}
        image="/pst01.jpg"
      />

      <section className="section bg-white">
        <div className="container-site space-y-24">
          {leadPastors.map((p, i) => (
            <Reveal key={p.name}>
              <article className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                <div className="relative mx-auto w-full max-w-md">
                  <Img sizes="(min-width: 1024px) 448px, 100vw" src={p.image ?? "/logo.png"} alt={p.name} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-lift" />
                  <div className="absolute -bottom-5 -right-5 -z-10 h-full w-full rounded-[2rem] bg-primary-50" aria-hidden="true" />
                </div>
                <div>
                  <span className="eyebrow">{p.role}</span>
                  <h2 className="heading-lg mt-4">{p.name}</h2>
                  <p className="mt-6 text-[17px] leading-relaxed text-ink-muted">{p.bio}</p>
                  <a href={`mailto:${church.email}`} className="btn-outline-dark mt-8">
                    <Mail size={16} /> Contact the pastor&apos;s office
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site">
          <SectionHeading
            eyebrow="Serving together"
            title="Ministers & ministry leaders"
            description="Faithful men and women who help shepherd the Agape House family."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {leadershipTeam.map((l, i) => (
              <Reveal key={l.role} delay={(i % 3) * 100}>
                <div className="card flex items-center gap-5 p-6">
                  <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-navy font-display text-xl text-gold-light">
                    {initials(l.role)}
                  </span>
                  <span>
                    <span className="block font-display text-lg text-navy">{l.name}</span>
                    <span className="block text-sm text-primary">{l.role}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need prayer or a listening ear?"
        text="Our pastors and counselling team are here for you."
        primary={{ label: "Book counselling", href: "/counselling" }}
        secondary={{ label: "Send a prayer request", href: "/prayer" }}
      />
    </>
  );
}
