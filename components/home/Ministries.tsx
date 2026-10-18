import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ministries } from "@/lib/church";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Img from "@/components/ui/Img";

export default function Ministries() {
  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            eyebrow="Ministries"
            title="A place for every generation"
            description="Grow in faith, build friendships and discover your gifts in one of our ministries."
          />
          <Link href="/ministries" className="btn-outline-dark shrink-0">
            All ministries <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((m, i) => (
            <Reveal key={m.slug} delay={i * 100}>
              <Link
                href={`/ministries/${m.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-3xl bg-navy shadow-soft"
              >
                <Img
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  src={m.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent transition duration-500 group-hover:from-primary-dark group-hover:via-primary/50" />
                <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={18} />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-2xl text-white">{m.name}</h3>
                  <p className="mt-2 line-clamp-3 max-h-0 overflow-hidden text-sm leading-relaxed text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    {m.summary}
                  </p>
                  <span className="mt-3 block h-0.5 w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
