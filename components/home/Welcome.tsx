import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { church } from "@/lib/church";
import Reveal from "@/components/ui/Reveal";
import Img from "@/components/ui/Img";

export default function Welcome() {
  return (
    <section id="welcome" className="section relative overflow-hidden bg-white">
      <div className="bg-grain absolute -left-24 top-24 h-80 w-80 rounded-full opacity-70" aria-hidden="true" />
      <div className="container-site grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Img sizes="(min-width: 1024px) 50vw, 100vw" src="/pst01.jpg" alt={`${church.pastors}, Pastors of ${church.name}`} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/90 to-transparent p-6 pt-24">
              <p className="font-display text-2xl text-white">{church.pastors}</p>
              <p className="text-sm text-gold-light">Pastors in Charge</p>
            </div>
          </div>
          <div className="absolute -right-4 -top-8 hidden w-56 rounded-2xl bg-primary p-6 text-white shadow-glow sm:block lg:-right-10">
            <Quote size={28} className="opacity-60" />
            <p className="mt-2 font-display text-lg leading-snug">{church.tagline}</p>
          </div>
          <div className="absolute -left-5 -top-5 -z-10 h-full w-full rounded-[2rem] border-2 border-gold/40" aria-hidden="true" />
        </Reveal>

        <Reveal delay={150}>
          <span className="eyebrow">A word from our pastors</span>
          <h2 className="heading-lg mt-4">
            Welcome home. <span className="italic text-primary">You were made for more.</span>
          </h2>
          <div className="mt-6 space-y-5 text-[17px] leading-relaxed text-ink-muted">
            <p>
              We are so glad you&apos;re here. {church.name} is a parish of the Redeemed Christian Church of God — a
              family of believers in Nashville who love God, love His Word and love people.
            </p>
            <p>
              Our mission is simple: <strong className="font-semibold text-navy">{church.mission.charAt(0).toLowerCase() + church.mission.slice(1)}</strong>
            </p>
            <p>
              Whether you&apos;re exploring faith for the first time, new to the city or looking for a church to call
              home, we can&apos;t wait to meet you.
            </p>
          </div>
          <p className="mt-8 font-display text-2xl italic text-navy">— Pastor Ben &amp; Pastor Toro</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/about" className="btn-navy btn-lg">
              Our story <ArrowRight size={18} />
            </Link>
            <Link href="/pastors" className="btn-outline-dark btn-lg">
              Meet our pastors
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
