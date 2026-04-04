"use client";
import { useEffect, useRef, useState } from "react";
import { Users, BookOpen, Heart, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: 5400, label: "Church Members", suffix: "+" },
  { icon: BookOpen, value: 320, label: "Sermons Delivered", suffix: "+" },
  { icon: Heart, value: 180, label: "Volunteers", suffix: "+" },
  { icon: Globe, value: 42, label: "Countries Reached", suffix: "" },
];

function useCountUp(target: number, duration: number = 2000, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return count;
}

function StatItem({
  icon: Icon,
  value,
  label,
  suffix,
  active,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix: string;
  active: boolean;
}) {
  const count = useCountUp(value, 2000, active);

  return (
    <div className="text-center group">
      <div className="w-16 h-16 border-2 border-[#bf0a30]/40 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#bf0a30] group-hover:border-[#bf0a30] transition-all duration-300">
        <Icon size={24} className="text-[#bf0a30] group-hover:text-white transition-colors" />
      </div>
      <div
        className="text-4xl md:text-5xl font-bold text-white mb-2"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {count.toLocaleString()}
        {suffix}
      </div>
      <div
        className="text-[#bf0a30] text-xs font-bold tracking-[0.2em] uppercase"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {label}
      </div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1519406596751-0a3ccc4937fe?w=1600&h=600&fit=crop&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.92)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
