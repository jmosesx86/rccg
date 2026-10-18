import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts, formatSermonDate } from "@/lib/content";
import PageHeader from "@/components/ui/PageHeader";
import Img from "@/components/ui/Img";

export const metadata: Metadata = {
  title: "Blog",
  description: "Devotionals, testimonies and news from RCCG Agape House Nashville.",
};

export default function BlogPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <PageHeader
        eyebrow="Stories & devotionals"
        title="Blog"
        description="Encouragement, testimonies and news from our church family."
        breadcrumbs={[{ label: "Blog" }]}
        image="/p01.jpg"
      />
      <section className="section bg-cream">
        <div className="container-site">
          <Link href={`/blog/${featured.slug}`} className="card card-hover group grid overflow-hidden lg:grid-cols-2">
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[400px]">
              <Img src={featured.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {featured.category} · {formatSermonDate(featured.date)}
              </span>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl group-hover:text-primary">{featured.title}</h2>
              <p className="mt-4 text-lg text-ink-muted">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary transition-all group-hover:gap-3">
                Read more <ArrowRight size={17} />
              </span>
            </div>
          </Link>

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-hover group overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <Img sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" src={p.image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {p.category} · {formatSermonDate(p.date)}
                  </span>
                  <h3 className="mt-2 text-xl leading-snug group-hover:text-primary">{p.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
