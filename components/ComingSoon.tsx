import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url(/f01.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.9)]" />
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* Big watermark text */}
        <div
          className="text-[6rem] md:text-[8rem] font-bold leading-none text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          SOON
        </div>

        <div className="relative z-10">
          {/* Logo */}
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="RCCG Agape House"
              className="h-[80px] w-auto mx-auto"
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Coming Soon
          </h1>

          <div className="flex items-center gap-1 justify-center mb-6">
            <div className="w-[40px] h-1 bg-[#bf0a30] rounded-full" />
            <div className="w-[16px] h-1 bg-[#bf0a30] rounded-full" />
          </div>

          <p
            className="text-gray-400 text-lg leading-relaxed mb-10"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            We&apos;re working hard to bring this page to life.
            Stay tuned for something amazing!
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#bf0a30] text-white hover:bg-black transition-colors"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "16px",
              padding: "15px 30px",
              borderRadius: "4px",
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
