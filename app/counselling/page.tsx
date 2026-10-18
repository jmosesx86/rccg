import type { Metadata } from "next";
import { Heart, Users, Baby, Gem, CloudRain, ShieldCheck, Phone } from "lucide-react";
import { church } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CounsellingForm from "./CounsellingForm";

export const metadata: Metadata = {
  title: "Counselling",
  description: "Confidential, Bible-based pastoral counselling at RCCG Agape House Nashville.",
};

const areas = [
  { icon: Heart, title: "Personal & spiritual", text: "Walking with you through doubt, direction and spiritual growth." },
  { icon: Gem, title: "Pre-marital", text: "Preparing couples for a strong, Christ-centered marriage." },
  { icon: Users, title: "Marriage", text: "Restoring communication, trust and love in your home." },
  { icon: Baby, title: "Family & parenting", text: "Wisdom for raising children and navigating family life." },
  { icon: CloudRain, title: "Grief & loss", text: "Comfort and hope in seasons of loss and sorrow." },
];

export default function CounsellingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Care & support"
        title="Counselling"
        description="Confidential, Bible-based pastoral counselling for individuals, couples and families."
        breadcrumbs={[{ label: "Counselling" }]}
        image="/img01.jpg"
      />
      <section className="section bg-white">
        <div className="container-site">
          <SectionHeading eyebrow="How we can help" title="You don't have to walk alone" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {areas.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl bg-cream p-6">
                <Icon size={26} className="text-primary" />
                <h3 className="mt-4 text-lg">{title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <span className="eyebrow">Book a session</span>
            <h2 className="heading-lg mt-4">Request counselling</h2>
            <p className="lead mt-4">Fill in the form and we&apos;ll arrange a time with one of our pastors or trained counsellors.</p>
            <div className="mt-8 flex gap-4 rounded-2xl bg-white p-5 shadow-soft">
              <ShieldCheck size={22} className="shrink-0 text-primary" />
              <p className="text-sm text-ink-muted">Everything you share is treated with complete confidentiality and pastoral care.</p>
            </div>
            <div className="mt-4 flex gap-4 rounded-2xl bg-navy p-5 text-white">
              <Phone size={22} className="shrink-0 text-gold-light" />
              <p className="text-sm text-white/80">
                In crisis? Call or text <strong className="text-white">988</strong> (Suicide &amp; Crisis Lifeline) or dial 911. You can
                also reach the church office on {church.phone.display}.
              </p>
            </div>
          </div>
          <CounsellingForm />
        </div>
      </section>
    </>
  );
}
