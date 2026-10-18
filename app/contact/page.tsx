import type { Metadata } from "next";
import { church } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import ContactCards from "@/components/ui/ContactCards";
import MapEmbed from "@/components/ui/MapEmbed";
import SocialLinks from "@/components/ui/SocialLinks";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${church.name}. Call ${church.phone.display}, email ${church.email} or visit ${church.address.full}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="We'd love to hear from you"
        description="Questions, prayer, or just want to say hello? Reach out — we're here for you."
        breadcrumbs={[{ label: "Contact Us" }]}
        image="/p02.jpg"
      />
      <section className="section bg-cream">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <ContactCards />
            <div className="mt-6">
              <p className="mb-3 text-sm font-semibold text-navy">Follow us</p>
              <SocialLinks linkClassName="grid h-11 w-11 place-items-center rounded-full bg-navy text-white transition hover:bg-primary" />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <section className="bg-cream pb-20">
        <div className="container-site">
          <MapEmbed className="h-[420px]" />
        </div>
      </section>
    </>
  );
}
