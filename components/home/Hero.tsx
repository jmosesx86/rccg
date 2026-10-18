import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { church } from "@/lib/church";
import ServiceCountdown from "./ServiceCountdown";
import HeroVideo from "./HeroVideo";
import Img from "@/components/ui/Img";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy-950 pb-24 pt-36 lg:pb-32">
      <Img src="/p03.jpg" alt="" priority quality={45} className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <HeroVideo />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-950/80 to-navy-950/50" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(700px_500px_at_0%_100%,rgba(191,10,48,0.35),transparent)]" />

      <div className="container-site grid items-center gap-14 lg:grid-cols-[1.25fr_1fr]">
        <div className="animate-rise">
          <span className="eyebrow eyebrow-light">Welcome to {church.name} · Nashville</span>
          <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.04] text-white sm:text-6xl lg:text-[3.6rem] xl:text-[4.1rem]">
            A house of <em className="font-normal text-gold-light">love.</em>
            <br />A people of <em className="font-normal text-gold-light">purpose.</em>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
            {church.description.replace("A full", "We are a full")}{" "}
            Wherever you are on your journey, there&apos;s a
            place for you here.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/visit" className="btn-primary btn-lg">
              Plan your visit <ArrowRight size={18} />
            </Link>
            <Link href="/sermons" className="group inline-flex items-center gap-3 font-semibold text-white">
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-white/10 ring-1 ring-white/30 backdrop-blur transition group-hover:bg-white group-hover:text-navy">
                <span className="absolute inset-0 animate-pulse-ring rounded-full ring-1 ring-white/40" />
                <Play size={18} className="ml-0.5" fill="currentColor" />
              </span>
              Watch a sermon
            </Link>
          </div>
        </div>

        <div className="flex animate-rise justify-center [animation-delay:200ms] lg:justify-end">
          <ServiceCountdown />
        </div>
      </div>

    </section>
  );
}
