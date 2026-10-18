import Link from "next/link";
import { Instagram, ArrowRight } from "lucide-react";
import { church } from "@/lib/church";
import Img from "@/components/ui/Img";

const photos = ["/g01.jpg", "/p01.jpg", "/m04.jpg", "/f01.jpg", "/g05.jpg", "/m02.jpg"];

export default function GalleryStrip() {
  return (
    <section className="bg-white pb-20 pt-4 md:pb-28">
      <div className="container-site mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="eyebrow">Life at Agape House</span>
          <h2 className="heading-lg mt-4">Moments of grace</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={church.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
            <Instagram size={16} /> @{church.social.instagram.split("/").filter(Boolean).pop()}
          </a>
          <Link href="/gallery" className="btn-ghost">
            Full gallery <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 px-2 sm:grid-cols-3 lg:grid-cols-6">
        {photos.map((src, i) => (
          <Link
            key={src}
            href="/gallery"
            className={`group relative overflow-hidden rounded-2xl ${i % 2 ? "lg:translate-y-8" : ""}`}
            aria-label="Open gallery"
          >
            <Img sizes="(min-width: 1024px) 17vw, (min-width: 640px) 33vw, 50vw" src={src} alt="" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
            <span className="absolute inset-0 bg-navy/0 transition group-hover:bg-navy/30" />
          </Link>
        ))}
      </div>
    </section>
  );
}
