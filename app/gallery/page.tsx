import type { Metadata } from "next";
import { Instagram } from "lucide-react";
import { church } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of worship, fellowship and life together at RCCG Agape House Nashville.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Moments"
        title="Gallery"
        description="Snapshots of worship, fellowship and life together."
        breadcrumbs={[{ label: "Gallery" }]}
        image="/g03.jpg"
      />
      <section className="section bg-cream">
        <div className="container-site">
          <GalleryGrid />
          <div className="mt-14 text-center">
            <a href={church.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-navy btn-lg">
              <Instagram size={18} /> More on Instagram
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
