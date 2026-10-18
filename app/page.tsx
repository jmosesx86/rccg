import Hero from "@/components/home/Hero";
import VisitStrip from "@/components/home/VisitStrip";
import Welcome from "@/components/home/Welcome";
import Pillars from "@/components/home/Pillars";
import VerseOfTheDay from "@/components/home/VerseOfTheDay";
import Ministries from "@/components/home/Ministries";
import LatestSermons from "@/components/home/LatestSermons";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Testimonies from "@/components/home/Testimonies";
import GiveAndPray from "@/components/home/GiveAndPray";
import GalleryStrip from "@/components/home/GalleryStrip";
import { getSermons } from "@/lib/youtube";

// Re-render hourly so past events drop off and new sermons appear.
export const revalidate = 3600;

export default async function Home() {
  const sermons = await getSermons();
  return (
    <>
      <Hero />
      <VisitStrip />
      <Welcome />
      <Pillars />
      <Ministries />
      <VerseOfTheDay />
      <LatestSermons sermons={sermons} />
      <UpcomingEvents />
      <GiveAndPray />
      <Testimonies />
      <GalleryStrip />
    </>
  );
}
