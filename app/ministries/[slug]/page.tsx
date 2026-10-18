import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Check, ArrowRight } from "lucide-react";
import { ministries, ministryDetails } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import JoinForm from "./JoinForm";
import Img from "@/components/ui/Img";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = ministries.find((x) => x.slug === slug);
  return m ? { title: m.name, description: m.summary } : {};
}

export default async function MinistryPage({ params }: Props) {
  const { slug } = await params;
  const ministry = ministries.find((m) => m.slug === slug);
  if (!ministry) notFound();
  const details = ministryDetails[slug];
  const others = ministries.filter((m) => m.slug !== slug);

  return (
    <>
      <PageHeader
        eyebrow="Ministries"
        title={ministry.name}
        description={ministry.summary}
        breadcrumbs={[{ label: "Ministries", href: "/ministries" }, { label: ministry.name }]}
        image={ministry.image}
      />

      <section className="section bg-white">
        <div className="container-site grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <span className="eyebrow">What we do</span>
            <h2 className="heading-lg mt-4">Growing together in faith</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {details.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-2xl bg-cream p-5">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary text-white">
                    <Check size={15} />
                  </span>
                  <span className="font-medium text-navy">{h}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-10 border-l-4 border-gold pl-6">
              <p className="font-display text-xl italic text-navy">“{details.scripture.text}”</p>
              <footer className="mt-2 text-sm font-semibold uppercase tracking-widest text-primary">{details.scripture.ref}</footer>
            </blockquote>
          </Reveal>

          <Reveal delay={120}>
            <div className="card sticky top-28 overflow-hidden">
              <Img sizes="(min-width: 1024px) 40vw, 100vw" src={ministry.image} alt="" className="aspect-[16/10] w-full object-cover" />
              <div className="p-7">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  <CalendarDays size={14} /> When we meet
                </p>
                <p className="mt-2 font-display text-2xl text-navy">{ministry.meets}</p>
                <p className="mt-1 text-sm text-ink-muted">At the church auditorium · All are welcome</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <span className="eyebrow">Get connected</span>
            <h2 className="heading-lg mt-4">Join the {ministry.name}</h2>
            <p className="lead mt-4">Leave your details and a ministry leader will reach out to welcome you personally.</p>
          </div>
          <JoinForm ministry={ministry.name} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site">
          <h2 className="heading-lg">Other ministries</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {others.map((m) => (
              <Link key={m.slug} href={`/ministries/${m.slug}`} className="group relative block aspect-[4/3] overflow-hidden rounded-3xl">
                <Img sizes="(min-width: 768px) 33vw, 100vw" src={m.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 bg-gradient-to-t from-navy-950/90 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6 font-display text-2xl text-white">
                  {m.name} <ArrowRight size={20} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
