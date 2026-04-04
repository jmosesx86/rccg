"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Anna Hampton",
    role: "Church Member",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
    quote:
      "Zegen Church has completely transformed my spiritual life. The sermons are deeply inspiring and the community is incredibly warm and welcoming. I feel at home every time I walk through those doors.",
  },
  {
    name: "Robert Mensah",
    role: "Volunteer Leader",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
    quote:
      "Being part of the Global Ministry here has been the greatest blessing of my life. We've helped communities across three continents, and every mission trip has deepened my faith profoundly.",
  },
  {
    name: "Mary Johnson",
    role: "Youth Group Parent",
    img: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=100&h=100&fit=crop&q=80",
    quote:
      "The Children's Ministry is exceptional. My kids look forward to Sunday school every week. The teachers here are passionate and truly care about nurturing our children's faith from an early age.",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe?w=1600&h=700&fit=crop&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(200,168,118,0.92)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <span
          className="text-white/70 text-xs font-bold tracking-[0.3em] uppercase mb-2 block"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Testimonials
        </span>
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-12"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          What Our Members Say
        </h2>

        <div className="bg-white/20 backdrop-blur-sm p-8 md:p-12 relative">
          {/* Large quote mark */}
          <div
            className="text-[10rem] text-white/20 absolute top-0 left-8 leading-none"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            "
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="white" className="text-white" />
            ))}
          </div>

          {/* Quote */}
          <blockquote
            className="text-white text-lg md:text-xl italic leading-relaxed mb-8 relative z-10"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            "{t.quote}"
          </blockquote>

          {/* Author */}
          <div className="flex items-center justify-center gap-4">
            <img
              src={t.img}
              alt={t.name}
              className="w-14 h-14 rounded-full border-2 border-white object-cover"
            />
            <div className="text-left">
              <div
                className="text-white font-bold text-sm tracking-wide"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {t.name}
              </div>
              <div className="text-white/70 text-xs">{t.role}</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 border-2 border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-[#bf0a30] transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/40"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 border-2 border-white/50 text-white flex items-center justify-center hover:bg-white hover:text-[#bf0a30] transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
