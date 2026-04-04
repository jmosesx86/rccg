import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function QuoteSection() {
  return (
    <section
      className="quote-section py-20 relative overflow-hidden"
      style={{
        backgroundImage:
          "url(/img01.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.80)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Decorative cross */}
        <div className="flex justify-center mb-6">
          <div className="relative w-10 h-10">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#bf0a30] -translate-y-1/2" />
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#bf0a30] -translate-x-1/2" />
          </div>
        </div>

        <blockquote
          className="text-white text-3xl md:text-4xl lg:text-5xl  font-bold leading mb-6"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          "Pray and listen to God! You can do this alone, but find somebody to
          do it with you"
        </blockquote>

        <p className="" style={{
                fontFamily: "'Damion', cursive",
                fontSize: "28px",
              }}>
          We and happy and glad to do life with you.
        </p>

        {/* <Link href="/donate" className="btn-primary">
          Donate Online <ArrowRight size={14} />
        </Link> */}
      </div>
    </section>
  );
}
