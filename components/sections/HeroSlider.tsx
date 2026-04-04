"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    icon: "/dove.png",
    subtitle: "Preparing People, Fulfilling Purpose",
    title: "God gives us power",
    desc: "Jesus is holy, loving, and worthy of all our worship and devotion. You will feel heaven in our Church. Join us and Praise the Lord Jesus.",
    cta: { label: "Contact Us", href: "/contact" },
  },
  {
    icon: "/loveus.png",
    subtitle: "We're building them a home",
    title: "We call, praise the lord",
    desc: "Jesus is holy, loving, and worthy of all our worship and devotion. You will feel heaven in our Church. Join us and Praise the Lord Jesus.",
    cta: { label: "View Sermons", href: "/sermons" },
  },
  {
    icon: "/bible.png",
    subtitle: "You can help for them",
    title: "Let's bring them home",
    desc: "RCCG Agape House comes with sermons, ministries, events, testimonies, staff members, and church locations to enhance your worship experience.",
    cta: { label: "View Ministries", href: "/ministries" },
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animPhase, setAnimPhase] = useState<"idle" | "sliding">("idle");
  const [contentKey, setContentKey] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (animPhase !== "idle" || index === current) return;
      setCurrent(index);
      setAnimPhase("sliding");
      setContentKey((k) => k + 1);
      setTimeout(() => {
        setAnimPhase("idle");
      }, 800);
    },
    [animPhase, current]
  );

  const goNext = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const goPrev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(goNext, 6000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [goNext]);

  const slide = slides[current];
  const isSliding = animPhase === "sliding";

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden bg-black">
      {/* Background video — always playing */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-[1]"
      >
        <source src="/v01.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10" style={{ background: "rgba(0, 21, 47, 0.85)" }} />

      {/* Content — centered */}
      <div className="relative z-20 h-full flex items-center justify-center" key={`content-${contentKey}`}>
        <div className="max-w-[850px] mx-auto px-6 text-center">
          {/* Icon */}
          <div className={`mb-5 flex mt-24 justify-center ${isSliding ? "hero-content-enter-1" : ""}`}>
            <img
              src={slide.icon}
              alt=""
              className="w-[67px] h-[67px] object-contain"
            />
          </div>

          {/* Subtitle */}
          <p
            className={`text-[#bf0a30] font-bold uppercase tracking-wider mb-4 ${isSliding ? "hero-content-enter-2" : ""}`}
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "21px" }}
          >
            {slide.subtitle}
          </p>

          {/* Title */}
          <h1
            className={`font-bold text-white uppercase leading-tight mb-5 ${isSliding ? "hero-content-enter-3" : ""}`}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(32px, 5vw, 54px)",
              letterSpacing: "3px",
            }}
          >
            {slide.title}
          </h1>

          {/* Description */}
          <p
            className={`text-white/90 mb-8 mx-auto ${isSliding ? "hero-content-enter-4" : ""}`}
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "18px",
              lineHeight: "31px",
              maxWidth: "806px",
            }}
          >
            {slide.desc}
          </p>

          {/* CTA Button */}
          <div className={isSliding ? "hero-content-enter-5" : ""}>
            <Link
              href={slide.cta.href}
              className="inline-block bg-[#bf0a30] text-white rounded hover:bg-black transition-colors"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                fontWeight: 500,
                padding: "15px 35px",
                letterSpacing: "0.5px",
                textTransform: "uppercase" as const,
              }}
            >
              {slide.cta.label}
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 w-[60px] h-[60px] rounded-full bg-[rgba(0,0,0,0.38)] text-white flex items-center justify-center hover:bg-[rgba(0,0,0,0.6)] transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 w-[60px] h-[60px] rounded-full bg-[rgba(0,0,0,0.38)] text-white flex items-center justify-center hover:bg-[rgba(0,0,0,0.6)] transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
}
