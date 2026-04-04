import Link from "next/link";
import { ArrowRight, Calendar, User, Tag } from "lucide-react";

const posts = [
  {
    title: "Giving Back – Uganda Training Centers",
    excerpt: "Learn how our church is making a difference in Uganda by establishing training centers for the community.",
    date: "Oct 21, 2019",
    author: "Pastor John",
    category: "Missions",
    img: "/p01.jpg",
    href: "/blog/post",
  },
  {
    title: "Spirit Of The Lord Is, From The New Life",
    excerpt: "Discover the transformative power of the Holy Spirit and how it can renew your life and faith journey.",
    date: "Oct 15, 2019",
    author: "Sister Grace",
    category: "Sermons",
    img: "/p02.jpg",
    href: "/blog/post",
  },
  {
    title: "Pray for Help to Save Mattia's Life",
    excerpt: "A powerful testimony of faith and community support that rallied together in prayer for a young life.",
    date: "Oct 1, 2019",
    author: "Pastor John",
    category: "Testimonies",
    img: "/p03.jpg",
    href: "/blog/post",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <span className="section-subtitle">Our Blog</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#00162f] mt-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Latest Posts
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[#bf0a30] text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            All Posts <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <article key={i} className="blog-card bg-white shadow-sm hover:shadow-lg transition-shadow group">
              {/* Image */}
              <div className="overflow-hidden" style={{ height: "220px" }}>
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Category badge */}
              <div className="px-5 pt-4">
                <span className="inline-block bg-[#bf0a30] text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 pt-3">
                <h4
                  className="font-bold text-[#00162f] text-base mb-3 leading-snug group-hover:text-[#bf0a30] transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <Link href={post.href}>{post.title}</Link>
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-gray-400 border-t border-gray-100 pt-4 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} className="text-[#bf0a30]" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={11} className="text-[#bf0a30]" />
                    {post.author}
                  </span>
                </div>

                <Link
                  href={post.href}
                  className="flex items-center gap-2 text-[#bf0a30] text-xs font-bold tracking-widest uppercase hover:gap-3 transition-all"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Read More <ArrowRight size={11} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
