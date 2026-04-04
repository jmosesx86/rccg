import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";

const quickLinks = [
  { label: "Who We Are?", href: "/about" },
  { label: "Support and FAQ's", href: "/faq" },
  { label: "Payments", href: "/payments" },
  { label: "Donations Terms", href: "/terms" },
  { label: "Volunteer", href: "/volunteer" },
];

const recentPosts = [
  {
    title: "Giving Back – Uganda Training Centers",
    date: "Oct 21, 2019",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop",
    href: "/blog/post",
  },
  {
    title: "Spirit Of The Lord Is, From The New Life",
    date: "Oct 21, 2019",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=80&h=80&fit=crop",
    href: "/blog/post",
  },
];

const socialIcons = [
  { name: "facebook", path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z", color: "#3b5999" },
  { name: "twitter", path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", color: "#55acee" },
  { name: "instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z", color: "#e4405f" },
  { name: "pinterest", path: "M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z", color: "#bd081c" },
  { name: "youtube", path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z", color: "#cd201f" },
];

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{
        backgroundImage: "url(https://zozothemes.com/html/zegen/images/bg/footer-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.92)]" />

      {/* Footer widgets */}
      <div className="relative z-10" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1: About */}
          <div>
            <h3
              className="text-white text-xl font-bold mb-5 pl-10 relative"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", lineHeight: "28px" }}
            >
              {/* Decorative lines */}
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[3px] bg-[#bf0a30] rounded" />
              <span className="absolute left-0 top-1/2 translate-y-1 w-3 h-[3px] bg-[#bf0a30] rounded" />
              About Zegen
            </h3>
            <p className="text-[#f7f7f7] text-sm leading-7 mb-7" style={{ fontSize: "15px" }}>
              Zegen Church WordPress Theme is professionally designed for non-profit church, modern church, prayer group, Christian, charity, non-profit organization. Grab it soon!
            </p>
            <div className="flex gap-1.5">
              {socialIcons.map((icon) => (
                <Link
                  key={icon.name}
                  href="#"
                  className="w-10 h-10 rounded flex items-center justify-center text-white hover:bg-[#333] transition-all"
                  style={{ backgroundColor: icon.color }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="text-white text-xl font-bold mb-5 pl-10 relative"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", lineHeight: "28px" }}
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[3px] bg-[#bf0a30] rounded" />
              <span className="absolute left-0 top-1/2 translate-y-1 w-3 h-[3px] bg-[#bf0a30] rounded" />
              Quick Links
            </h3>
            <ul>
              {quickLinks.map((link, i) => (
                <li key={link.label} style={{ padding: i === 0 ? "0 0 9px 0" : "9px 0" }}>
                  <Link
                    href={link.href}
                    className="text-[#f7f7f7] hover:text-[#bf0a30] transition-colors flex items-center gap-2.5"
                    style={{ fontSize: "15px" }}
                  >
                    <ChevronRight size={14} className="text-[#bf0a30]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Latest News */}
          <div>
            <h3
              className="text-white text-xl font-bold mb-5 pl-10 relative"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", lineHeight: "28px" }}
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[3px] bg-[#bf0a30] rounded" />
              <span className="absolute left-0 top-1/2 translate-y-1 w-3 h-[3px] bg-[#bf0a30] rounded" />
              Latest News
            </h3>
            <ul>
              {recentPosts.map((post, i) => (
                <li
                  key={post.title}
                  className={`flex items-center gap-3.5 ${
                    i < recentPosts.length - 1
                      ? "pb-5 mb-3 border-b border-white/[0.17]"
                      : ""
                  }`}
                  style={{ paddingTop: "10px" }}
                >
                  <Link href={post.href} className="shrink-0">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-[70px] h-[70px] object-cover rounded"
                    />
                  </Link>
                  <div>
                    <Link
                      href={post.href}
                      className="text-[#f7f7f7] hover:text-[#bf0a30] transition-colors block mb-1 font-semibold"
                      style={{ fontSize: "15px", lineHeight: "22px" }}
                    >
                      {post.title}
                    </Link>
                    <span className="flex items-center gap-1.5 text-[#a5a5a5] italic" style={{ fontSize: "13px" }}>
                      <Calendar size={12} className="text-[#bf0a30]" />
                      {post.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3
              className="text-white text-xl font-bold mb-5 pl-10 relative"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "20px", lineHeight: "28px" }}
            >
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-[3px] bg-[#bf0a30] rounded" />
              <span className="absolute left-0 top-1/2 translate-y-1 w-3 h-[3px] bg-[#bf0a30] rounded" />
              Newsletter
            </h3>
            <p className="text-[#f7f7f7] text-sm leading-7 mb-5" style={{ fontSize: "15px" }}>
              Sign up for our weekly newsletter to stay updated on all news and events at Zegen Church. Email updates on new product Announcements, Gift Ideas, Special Promotions and More.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 h-[50px] bg-transparent border border-[#464646] text-white placeholder-[#8d9297] px-4 text-sm rounded-l focus:outline-none focus:border-[#bf0a30] transition-colors"
                style={{ fontSize: "15px", borderRight: 0 }}
              />
              <button
                className="h-[50px] bg-[#bf0a30] hover:bg-black text-white px-4 text-sm font-medium rounded-r transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px" }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10" style={{ background: "#000f21", padding: "20px 0" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ fontSize: "13px" }}>
          <p className="text-white">
            Copyrights © {new Date().getFullYear()}{" "}
            <Link href="/" className="text-white hover:text-[#bf0a30] transition-colors">Zegen</Link>.
            Designed by{" "}
            <Link href="https://zozothemes.com" className="text-white hover:text-[#bf0a30] transition-colors" target="_blank">
              Zozothemes
            </Link>{" "}
            <span style={{ color: "red" }}>♥</span>
          </p>
          <div className="flex text-white" style={{ fontSize: "13px" }}>
            {["Privacy", "Sermons", "Contact Us"].map((l, i) => (
              <span key={l} className="flex items-center">
                <Link href="#" className="hover:text-[#bf0a30] transition-colors px-1">
                  {l}
                </Link>
                {i < 2 && <span className="text-white/50 mx-1">/</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
