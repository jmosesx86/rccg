import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight, Clock } from "lucide-react";
import { church, services } from "@/lib/church";
import { formatServiceTime, serviceDayLabel } from "@/lib/schedule";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import NewsletterForm from "./NewsletterForm";
import Img from "@/components/ui/Img";

const explore = [
  { label: "About Us", href: "/about" },
  { label: "Our Pastors", href: "/pastors" },
  { label: "Ministries", href: "/ministries" },
  { label: "Sermons", href: "/sermons" },
  { label: "Events", href: "/events" },
  { label: "Gallery", href: "/gallery" },
];

const connect = [
  { label: "Plan a Visit", href: "/visit" },
  { label: "Watch Live", href: "/live" },
  { label: "Prayer Request", href: "/prayer" },
  { label: "Counselling", href: "/counselling" },
  { label: "Give Online", href: "/give" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-950 text-white">
      {/* Invitation band */}
      <div className="relative">
        <Img src="/img01.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/60" />
        <div className="container-site relative flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="eyebrow eyebrow-light">You belong here</span>
            <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
              There&apos;s a seat saved for you this Sunday.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visit" className="btn-primary btn-lg">
              Plan a Visit
            </Link>
            <Link href="/live" className="btn-outline btn-lg">
              Watch Online
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-navy-radial">
        <div className="container-site grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">{church.description}</p>
            <p className="mt-4 font-display text-lg italic text-gold-light">“{church.tagline}”</p>
            <SocialLinks className="mt-6 flex gap-2" />
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Explore</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">Connect</h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              {connect.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Gather with us
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.name} className="flex items-start gap-3 rounded-xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
                  <Clock size={16} className="mt-1 shrink-0 text-primary-light" />
                  <span className="flex-1">
                    <span className="block text-sm font-semibold">{s.name}</span>
                    <span className="block text-xs text-white/55">
                      {serviceDayLabel(s)} · {formatServiceTime(s)} · {s.location}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={church.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 transition hover:text-white"
                >
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>
                    {church.address.full}
                    <ArrowUpRight size={13} className="ml-1 inline opacity-0 transition group-hover:opacity-100" />
                  </span>
                </a>
              </li>
              <li>
                <a href={church.phone.href} className="flex items-center gap-3 transition hover:text-white">
                  <Phone size={16} /> {church.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${church.email}`} className="flex items-center gap-3 transition hover:text-white">
                  <Mail size={16} /> {church.email}
                </a>
              </li>
            </ul>

            <p className="mb-3 mt-8 text-sm text-white/65">Get weekly updates, events & devotionals.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 md:flex-row">
            <p>
              © {new Date().getFullYear()} {church.name}, Nashville. All rights reserved.
            </p>
            <p>
              A parish of{" "}
              <a
                href="https://www.rccg.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/65 underline-offset-4 hover:text-white hover:underline"
              >
                The Redeemed Christian Church of God
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
