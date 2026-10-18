import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Img from "@/components/ui/Img";

type PageHeaderProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
  image?: string;
};

export default function PageHeader({
  title,
  eyebrow,
  description,
  breadcrumbs = [],
  image = "/p03.jpg",
}: PageHeaderProps) {
  const crumbs = [{ label: "Home", href: "/" }, ...breadcrumbs];
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pb-20 pt-44 md:pb-28 md:pt-52">
      <Img src={image} alt="" priority quality={45} className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/60" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(800px_400px_at_15%_100%,rgba(191,10,48,0.35),transparent)]" />

      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/60">
          {crumbs.map((c, i) => (
            <span key={c.label} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-gold" />}
              {c.href && i < crumbs.length - 1 ? (
                <Link href={c.href} className="transition hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span className="text-white/90" aria-current="page">
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </nav>
        {eyebrow && <span className="eyebrow eyebrow-light">{eyebrow}</span>}
        <h1 className="heading-xl mt-3 max-w-3xl text-white">{title}</h1>
        {description && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{description}</p>}
      </div>
    </section>
  );
}
