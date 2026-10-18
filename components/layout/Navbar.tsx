"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, Phone, Mail, MapPin, Clock, Radio, ArrowRight } from "lucide-react";
import { church, navigation, services } from "@/lib/church";
import { formatServiceTime, serviceDayLabel } from "@/lib/schedule";
import Logo from "@/components/ui/Logo";
import SocialLinks from "@/components/ui/SocialLinks";
import NextServiceBadge from "@/components/ui/NextServiceBadge";

type NavbarProps = {
  /** "transparent" sits over a dark hero until scrolled; "solid" is always white. */
  variant?: "transparent" | "solid";
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ variant = "transparent" }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // The drawer remembers which page it was opened on, so navigating closes it automatically.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  // Desktop dropdown that was just used to navigate; stays shut until the pointer leaves it.
  const [closedItem, setClosedItem] = useState<string | null>(null);
  const mobileOpen = openedOn === pathname;
  const closeMenu = () => setOpenedOn(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenedOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  const solid = variant === "solid" || scrolled;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Announcement bar */}
        <div
          className={`overflow-hidden bg-navy-950/80 text-[13px] backdrop-blur transition-all duration-300 ${
            scrolled ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
          }`}
        >
          <div className="container-site flex h-10 items-center justify-between gap-6">
            <NextServiceBadge className="truncate" />
            <div className="hidden items-center gap-6 text-white/70 lg:flex">
              <a href={church.phone.href} className="flex items-center gap-1.5 transition hover:text-white">
                <Phone size={13} /> {church.phone.display}
              </a>
              <a href={`mailto:${church.email}`} className="flex items-center gap-1.5 transition hover:text-white">
                <Mail size={13} /> {church.email}
              </a>
              <SocialLinks
                className="flex items-center gap-1"
                linkClassName="grid h-7 w-7 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
                size={13}
              />
            </div>
          </div>
        </div>

        {/* Main bar */}
        <nav
          aria-label="Main"
          className={`transition-all duration-300 ${
            solid ? "header-glass" : "bg-gradient-to-b from-navy-950/50 to-transparent"
          }`}
        >
          <div
            className={`container-site flex items-center justify-between gap-6 transition-all duration-300 ${
              scrolled ? "h-[72px]" : "h-[84px]"
            }`}
          >
            <Logo tone={solid ? "dark" : "light"} />

            <ul className="hidden items-center gap-1 xl:flex">
              {navigation.map((item) => {
                const active =
                  isActive(pathname, item.href) || item.children?.some((c) => isActive(pathname, c.href));
                return (
                  <li
                    key={item.label}
                    className={`nav-item relative ${closedItem === item.label ? "nav-closed" : ""}`}
                    onMouseLeave={() => setClosedItem(null)}
                    onFocus={() => setClosedItem(null)}
                    onClick={(e) => {
                      if (!(e.target as HTMLElement).closest("a")) return;
                      setClosedItem(item.label);
                      (document.activeElement as HTMLElement | null)?.blur();
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1 rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                        solid
                          ? active
                            ? "text-primary"
                            : "text-navy hover:text-primary"
                          : active
                            ? "text-white"
                            : "text-white/80 hover:text-white"
                      }`}
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.label}
                      {item.children && <ChevronDown size={14} className="opacity-60" />}
                      {active && (
                        <span
                          className={`absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full ${
                            solid ? "bg-primary" : "bg-gold"
                          }`}
                        />
                      )}
                    </Link>

                    {item.children && (
                      <div className="nav-dropdown absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3">
                        <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lift ring-1 ring-navy/5">
                          {item.children.map((child) => (
                            <Link
                              key={child.href + child.label}
                              href={child.href}
                              className={`group/item flex items-start gap-3 rounded-xl px-4 py-3 transition hover:bg-cream ${
                                pathname === child.href ? "bg-cream" : ""
                              }`}
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/30 transition group-hover/item:bg-primary" />
                              <span>
                                <span className="block text-sm font-semibold text-navy">{child.label}</span>
                                {child.description && (
                                  <span className="block text-xs leading-snug text-ink-muted">
                                    {child.description}
                                  </span>
                                )}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="hidden items-center gap-3 xl:flex">
              <Link
                href="/live"
                className={`btn btn-sm h-10 px-4 ${
                  solid
                    ? "border border-navy/15 text-navy hover:border-navy"
                    : "border border-white/30 text-white hover:bg-white/10"
                }`}
              >
                <Radio size={15} className="text-primary" /> Watch Live
              </Link>
              <Link href="/give" className="btn-primary btn-sm h-10 px-5">
                Give
              </Link>
            </div>

            <button
              type="button"
              className={`grid h-11 w-11 place-items-center rounded-full transition xl:hidden ${
                solid ? "bg-navy text-white" : "bg-white/10 text-white backdrop-blur"
              }`}
              onClick={() => {
                setExpanded(null);
                setOpenedOn(pathname);
              }}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <aside
        id="mobile-menu"
        className={`fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col bg-navy-radial text-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] xl:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        onClick={(e) => (e.target as HTMLElement).closest("a") && closeMenu()}
      >
        <div className="flex h-[84px] items-center justify-between px-6">
          <Logo tone="light" />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-8">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navigation.map((item) => {
              const open = expanded === item.label;
              return (
                <li key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left font-display text-xl"
                        onClick={() => setExpanded(open ? null : item.label)}
                        aria-expanded={open}
                      >
                        {item.label}
                        <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          open ? "grid-rows-[1fr] pb-3" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.href + child.label}
                              href={child.href}
                              className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[15px] transition hover:bg-white/5 ${
                                pathname === child.href ? "text-gold-light" : "text-white/75"
                              }`}
                            >
                              {child.label}
                              <ArrowRight size={14} className="opacity-50" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block py-4 font-display text-xl ${
                        isActive(pathname, item.href) ? "text-gold-light" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Link href="/live" className="btn-outline">
              <Radio size={15} /> Watch Live
            </Link>
            <Link href="/give" className="btn-primary">
              Give
            </Link>
          </div>

          <div className="mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              <Clock size={14} /> Service times
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.name} className="flex justify-between gap-4">
                  <span className="text-white/70">{serviceDayLabel(s)}</span>
                  <span className="font-medium">{formatServiceTime(s)}</span>
                </li>
              ))}
            </ul>
            <a
              href={church.address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-start gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <MapPin size={15} className="mt-0.5 shrink-0" /> {church.address.full}
            </a>
          </div>

          <SocialLinks className="mt-6 flex gap-2" />
        </div>
      </aside>
    </>
  );
}
