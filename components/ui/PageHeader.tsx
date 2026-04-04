import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
  bg?: string;
}

export default function PageHeader({
  title,
  breadcrumbs,
  bg = "https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe?w=1600&h=500&fit=crop&q=80",
}: PageHeaderProps) {
  return (
    <section
      className="relative pt-40 pb-24 overflow-hidden"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.85)]" />
      {/* Decorative side lines */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#bf0a30]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h1
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {title}
        </h1>
        <nav className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <ChevronRight size={14} className="text-[#bf0a30]" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="text-[#bf0a30] hover:text-white transition-colors font-medium"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-400">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
