import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Youtube, Radio } from "lucide-react";
import { church } from "@/lib/church";
import { getSermons, getSermon, formatSermonDate } from "@/lib/youtube";
import ShareButton from "@/components/ui/ShareButton";
import VideoThumb from "@/components/ui/VideoThumb";

type Props = { params: Promise<{ slug: string }> };

// Videos uploaded after the last build still get a page (rendered on first visit).
export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getSermons()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = await getSermon(slug);
  return s
    ? {
        title: `${s.title} · ${s.series}`,
        description: `${s.series} at ${church.name}, ${formatSermonDate(s.date)}. Watch the full service online.`,
        openGraph: { images: [s.image] },
      }
    : {};
}

export default async function SermonPage({ params }: Props) {
  const { slug } = await params;
  const sermon = await getSermon(slug);
  if (!sermon) notFound();
  const more = (await getSermons()).filter((s) => s.id !== sermon.id).slice(0, 4);

  return (
    <>
      <section className="bg-navy-radial pb-16 pt-36 text-white md:pt-44">
        <div className="container-site">
          <Link href="/sermons" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft size={16} /> All sermons
          </Link>
          <div className="mt-8 aspect-video overflow-hidden rounded-3xl bg-black shadow-2xl ring-1 ring-white/10">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${sermon.id}?rel=0`}
              title={sermon.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="section bg-white pt-14 md:pt-16">
        <div className="container-site grid gap-14 lg:grid-cols-[1.6fr_1fr]">
          <article>
            <span className="eyebrow">{sermon.series}</span>
            <h1 className="heading-lg mt-4">{sermon.title}</h1>
            <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
              <CalendarDays size={15} className="text-primary" /> {formatSermonDate(sermon.date)}
            </p>
            <p className="lead mt-8">
              Watch the full service from {church.name}, including praise and worship, prayer and the Word.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ShareButton title={sermon.title} />
              <a
                href={`https://www.youtube.com/watch?v=${sermon.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark"
              >
                <Youtube size={16} /> Watch on YouTube
              </a>
              <Link href="/live" className="btn-primary">
                <Radio size={16} /> Join us live
              </Link>
            </div>
          </article>

          <div>
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-ink-soft">More messages</h2>
            <div className="mt-5 space-y-4">
              {more.map((s) => (
                <Link key={s.id} href={`/sermons/${s.slug}`} className="group flex gap-4 rounded-2xl p-2 transition hover:bg-cream">
                  <VideoThumb id={s.id} sizes="128px" className="aspect-video w-32 shrink-0 rounded-xl object-cover" />
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-wider text-primary">{s.series}</span>
                    <span className="block font-display text-lg leading-snug text-navy group-hover:text-primary">{s.title}</span>
                    <span className="mt-1 block text-xs text-ink-muted">{formatSermonDate(s.date)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
