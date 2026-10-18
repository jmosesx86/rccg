import Link from "next/link";
import { HeartHandshake, Gift, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Img from "@/components/ui/Img";
import { givingMethods } from "@/lib/church";

const givelify = givingMethods.find((m) => m.id === "givelify");

export default function GiveAndPray() {
  return (
    <section className="section bg-cream pt-0 md:pt-0">
      <div className="container-site grid gap-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative isolate h-full overflow-hidden rounded-[2rem] bg-primary p-10 text-white sm:p-12">
            <Img sizes="(min-width: 1024px) 50vw, 100vw" src="/g04.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-primary/90 to-primary-dark/90" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Gift size={26} />
            </span>
            <h2 className="mt-6 text-3xl text-white sm:text-4xl">Give generously</h2>
            <p className="mt-4 max-w-md text-white/85">
              Your tithes and offerings help us share the gospel, care for families and serve our city. Thank you for
              partnering with us.
            </p>
            <p className="mt-5 font-display italic text-white/90">“God loveth a cheerful giver.” — 2 Corinthians 9:7</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {givelify?.action && (
                <a
                  href={givelify.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-white text-primary hover:-translate-y-0.5 hover:bg-cream"
                >
                  {givelify.action.label} <ArrowRight size={16} />
                </a>
              )}
              <Link href="/give" className="btn-outline">
                Other ways to give
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative isolate h-full overflow-hidden rounded-[2rem] bg-navy p-10 text-white sm:p-12">
            <Img sizes="(min-width: 1024px) 50vw, 100vw" src="/g05.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-20 mix-blend-luminosity" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy via-navy/95 to-navy-950/90" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-gold-light backdrop-blur">
              <HeartHandshake size={26} />
            </span>
            <h2 className="mt-6 text-3xl text-white sm:text-4xl">How can we pray for you?</h2>
            <p className="mt-4 max-w-md text-white/75">
              Whatever you&apos;re facing, you don&apos;t have to face it alone. Our prayer team will stand with you in
              faith, confidentially.
            </p>
            <p className="mt-5 font-display italic text-white/60">“The effectual fervent prayer of a righteous man availeth much.” — James 5:16</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/prayer" className="btn-gold">
                Send a prayer request <ArrowRight size={16} />
              </Link>
              <Link href="/counselling" className="btn-outline">
                Book counselling
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
