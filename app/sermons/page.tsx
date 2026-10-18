import type { Metadata } from "next";
import { Youtube, Radio } from "lucide-react";
import Link from "next/link";
import { church } from "@/lib/church";
import PageHeader from "@/components/ui/PageHeader";
import SermonLibrary from "./SermonLibrary";
import { getSermons } from "@/lib/youtube";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch and listen to messages from RCCG Agape House Nashville on Agape TV.",
};

// New services appear automatically as they are uploaded to YouTube.
export const revalidate = 3600;

export default async function SermonsPage() {
  const sermons = await getSermons();
  return (
    <>
      <PageHeader
        eyebrow="Agape TV"
        title="Sermons"
        description="Life-changing messages from God's Word, available any time, anywhere."
        breadcrumbs={[{ label: "Sermons" }]}
        image="/m01.jpg"
      />
      <section className="section bg-cream">
        <div className="container-site">
          <div className="mb-10 flex flex-wrap gap-3">
            <Link href="/live" className="btn-primary">
              <Radio size={16} /> Watch live
            </Link>
            <a href={church.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
              <Youtube size={16} /> Subscribe on YouTube
            </a>
          </div>
          <SermonLibrary sermons={sermons} />
        </div>
      </section>
    </>
  );
}
