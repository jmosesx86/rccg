import type { Metadata } from "next";
import { Gift, Smartphone, Mail, ExternalLink, Church, HeartHandshake, Globe2, Building2 } from "lucide-react";
import { givingMethods, giveFaqs } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Faq from "@/components/ui/Faq";
import CopyButton from "./CopyButton";

export const metadata: Metadata = {
  title: "Give",
  description: "Ways to give tithes and offerings to RCCG Agape House Nashville.",
};

const icons = { givelify: Gift, zelle: Smartphone, check: Mail } as const;

const impact = [
  { icon: Church, title: "Worship & ministry", text: "Sunday services, Agape TV and ministries for every age." },
  { icon: HeartHandshake, title: "Care & outreach", text: "Supporting families in need across Nashville." },
  { icon: Globe2, title: "Missions", text: "Partnering with RCCG to reach the nations with the gospel." },
  { icon: Building2, title: "Our church home", text: "Maintaining and growing our facility for the next generation." },
];

export default function GivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Generosity"
        title="Give"
        description="Thank you for partnering with us to advance the Kingdom of God through your tithes and offerings."
        breadcrumbs={[{ label: "Give" }]}
        image="/g04.jpg"
      />

      <section className="section bg-cream">
        <div className="container-site">
          <SectionHeading
            eyebrow="Ways to give"
            title="Choose what works best for you"
            description="All gifts are received with gratitude and stewarded with integrity."
          />
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {givingMethods.map((m, i) => {
              const Icon = icons[m.id];
              return (
                <Reveal key={m.id} delay={i * 100} className="h-full">
                  <div className="card card-hover flex h-full flex-col p-7">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white shadow-glow">
                      <Icon size={24} />
                    </span>
                    <h3 className="mt-6 text-2xl">{m.title}</h3>
                    <p className="mt-2 flex-1 text-[15px] text-ink-muted">{m.text}</p>
                    <div className="mt-6 rounded-xl bg-cream px-4 py-3">
                      {m.lines.map((line) => (
                        <p key={line} className="text-sm font-semibold text-navy">
                          {line}
                        </p>
                      ))}
                      {m.copy && (
                        <div className="mt-1">
                          <CopyButton value={m.copy} />
                        </div>
                      )}
                    </div>
                    {m.action && (
                      <a href={m.action.href} target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 w-full">
                        {m.action.label} <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-8 text-center text-sm text-ink-muted">You can also give in person during any of our services.</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="eyebrow">Your impact</span>
            <h2 className="heading-lg mt-4">Every gift makes a difference</h2>
            <blockquote className="mt-8 border-l-4 border-gold pl-6">
              <p className="font-display text-xl italic text-navy">
                “Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God
                loveth a cheerful giver.”
              </p>
              <footer className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary">2 Corinthians 9:7</footer>
            </blockquote>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {impact.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-cream p-6">
                <Icon size={24} className="text-primary" />
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Giving FAQs" />
          <div className="mt-12">
            <Faq items={giveFaqs} />
          </div>
        </div>
      </section>
    </>
  );
}
