"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, MapPin, Search } from "lucide-react";

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "#",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
      { label: "Our Pastors", href: "/pastors" },
    ],
  },
  {
    label: "Sermons",
    href: "/sermons",
  },
  {
    label: "Ministries",
    href: "/ministries",
    children: [
      { label: "Children's Ministry", href: "/ministries/childrens" },
      { label: "Women's Ministry", href: "/ministries/womens" },
      { label: "Global Ministry", href: "/ministries/global" },
      { label: "Music Ministry", href: "/ministries/music" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact",
  },
];

const socialIcons = [
  { name: "facebook", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
  { name: "twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
  { name: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
  { name: "youtube", path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top bar — slides up on scroll via negative margin */}
      <div
        className="hidden lg:block overflow-hidden transition-all duration-300"
        style={{
          maxHeight: scrolled ? 0 : 60,
          opacity: scrolled ? 0 : 1,
        }}
      >
        <div className="top-bar">
          <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
            {/* Left: Address */}
            <div className="flex items-center gap-1.5 text-white" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "15px" }}>
              <MapPin size={14} />
              <span>2128 Murfreesboro Pike, Nashville TN 37217</span>
            </div>

            {/* Right: Social icons + Search */}
            <div className="flex items-center">
              {socialIcons.map((icon) => (
                <Link
                  key={icon.name}
                  href="#"
                  className="social-icon"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.path} />
                  </svg>
                </Link>
              ))}
              <Link href="#" className="social-icon">
                <Search size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav — subtle dark tint when at top, white when scrolled */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "navbar-scrolled"
            : "bg-[rgba(0,15,40,0.25)]"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between" style={{ height: "100px" }}>
          {/* Logo — switches light/dark */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="RCCG AHN"
              className="h-[70px] w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0">
            <ul className="flex items-center gap-0">
              {navItems.map((item) => (
                <li key={item.label} className="nav-item relative group">
                  <Link
                    href={item.href}
                    className={`nav-link-text flex items-center gap-1 transition-colors px-5 py-2 font-semibold tracking-[1px] uppercase ${
                      scrolled ? "text-black hover:text-[#bf0a30]" : "text-white hover:text-[#bf0a30]"
                    }`}
                    style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 600 }}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={12} />}
                  </Link>

                  {item.children && (
                    <div className="nav-dropdown absolute top-full left-0 bg-[#00162f] min-w-[220px] shadow-xl z-50 border-t-2 border-[#bf0a30]">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-3 text-gray-300 hover:text-[#bf0a30] hover:bg-white/5 transition-all text-sm border-b border-white/10 last:border-0"
                          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px" }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Donate button */}
            <Link
              href="/donate"
              className="ml-4 bg-[#bf0a30] text-white px-6 py-3 rounded text-xs font-bold tracking-[1px] uppercase hover:bg-black transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", fontWeight: 700 }}
            >
              Connect 
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className={`lg:hidden p-2 ${scrolled ? "text-black" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto shadow-xl">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100">
                <button
                  className="w-full flex items-center justify-between px-6 py-4 text-[#252525] text-sm font-semibold tracking-[1px] uppercase text-left"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px" }}
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === item.label ? null : item.label
                    )
                  }
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {item.children && mobileExpanded === item.label && (
                  <div className="bg-gray-50">
                    {item.children.map((child) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        className="block px-10 py-3 text-[#8d9297] hover:text-[#bf0a30] text-sm transition-colors"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="p-6">
              <Link href="/donate" className="btn-primary w-full text-center justify-center">
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
