import type { Metadata } from "next";
import { upcomingEvents } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import CtaBand from "@/components/ui/CtaBand";
import EventsBrowser from "./EventsBrowser";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming services, conferences and gatherings at RCCG Agape House Nashville.",
};

export const revalidate = 3600;

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="What's on"
        title="Events"
        description="Special services, conferences and gatherings. Come, and bring someone with you."
        breadcrumbs={[{ label: "Events" }]}
        image="/g02.jpg"
      />
      <section className="section bg-cream">
        <div className="container-site">
          <EventsBrowser events={upcomingEvents()} />
        </div>
      </section>
      <CtaBand
        title="Never miss a gathering"
        text="Subscribe to our newsletter in the footer to get events in your inbox."
        primary={{ label: "Plan a visit", href: "/visit" }}
        secondary={{ label: "Contact us", href: "/contact" }}
      />
    </>
  );
}
