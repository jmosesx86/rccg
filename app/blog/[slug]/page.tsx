import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { posts, postBySlug, formatSermonDate } from "@/lib/content";
import ShareButton from "@/components/ui/ShareButton";
import Img from "@/components/ui/Img";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  return p ? { title: p.title, description: p.excerpt, openGraph: { images: [p.image], type: "article" } } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy-950 pb-24 pt-40 text-white md:pt-48">
        <Img priority quality={45} src={post.image} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-950/30" />
        <div className="container-site max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft size={16} /> All posts
          </Link>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            {post.category} · {formatSermonDate(post.date)}
          </p>
          <h1 className="heading-xl mt-4 text-white">{post.title}</h1>
          <p className="mt-5 text-white/70">By {post.author}</p>
        </div>
      </section>

      <article className="section bg-white">
        <div className="container-site max-w-3xl">
          <p className="font-display text-2xl leading-snug text-navy">{post.excerpt}</p>
          <div className="mt-8 space-y-6 text-[18px] leading-[1.85] text-ink-muted">
            {post.body.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="mt-12 flex items-center justify-between border-t border-navy/10 pt-8">
            <span className="text-sm text-ink-muted">Was this a blessing? Share it with a friend.</span>
            <ShareButton title={post.title} />
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section bg-cream">
          <div className="container-site">
            <h2 className="heading-lg">Keep reading</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card card-hover group flex items-center gap-5 p-4">
                  <Img sizes="112px" src={p.image} alt="" className="aspect-square w-28 shrink-0 rounded-2xl object-cover" />
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.category}</span>
                    <span className="mt-1 block font-display text-xl leading-snug text-navy group-hover:text-primary">{p.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
