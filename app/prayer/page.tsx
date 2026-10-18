import type { Metadata } from "next";
import { Lock, Users, Mail } from "lucide-react";
import { church } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import PrayerForm from "./PrayerForm";

export const metadata: Metadata = {
  title: "Prayer Request",
  description: "Send a prayer request to the RCCG Agape House prayer team.",
};

export default function PrayerPage() {
  return (
    <>
      <PageHeader
        eyebrow="We're praying with you"
        title="Prayer Request"
        description="Whatever you're facing, you don't have to face it alone. Our prayer team will stand with you in faith."
        breadcrumbs={[{ label: "Prayer Request" }]}
        image="/g05.jpg"
      />
      <section className="section bg-cream">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <div>
            <blockquote className="font-display text-2xl italic leading-snug text-navy sm:text-3xl">
              “The effectual fervent prayer of a righteous man availeth much.”
            </blockquote>
            <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-primary">James 5:16</p>
            <ul className="mt-10 space-y-5">
              {[
                { icon: Lock, title: "Confidential", text: "Requests marked confidential are seen only by our pastors." },
                { icon: Users, title: "Prayed over", text: "Our intercessors pray over every request during the week." },
                { icon: Mail, title: "Testimonies", text: `When God answers, tell us at ${church.testimonyEmail}.` },
              ].map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white text-primary shadow-soft">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{title}</span>
                    <span className="block text-sm text-ink-muted">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <PrayerForm />
        </div>
      </section>
    </>
  );
}
