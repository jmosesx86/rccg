import Link from "next/link";
import Img from "@/components/ui/Img";

type LogoProps = {
  tone?: "light" | "dark";
  className?: string;
};

export default function Logo({ tone = "dark", className = "" }: LogoProps) {
  const light = tone === "light";
  return (
    <Link href="/" className={`group flex items-center gap-3 ${className}`}>
      <Img
        src="/logo.png"
        alt=""
        sizes="52px"
        priority
        className="h-12 w-12 rounded-full bg-white shadow-sm ring-2 ring-white/60 transition-transform duration-500 group-hover:rotate-[8deg] sm:h-[52px] sm:w-[52px]"
      />
      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-semibold sm:text-xl ${light ? "text-white" : "text-navy"}`}
        >
          Agape House
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.22em] ${
            light ? "text-gold-light" : "text-primary"
          }`}
        >
          RCCG · Nashville
        </span>
      </span>
    </Link>
  );
}
