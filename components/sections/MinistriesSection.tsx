import Link from "next/link";
import { ArrowRight } from "lucide-react";

const ministries = [
  {
    title: "Children's Ministry",
    desc: "Children's ministry is the most important ministry in our church. This ministry helps kids learn about the Lord.",
    img: "/m03.jpg",
    href: "/ministries/childrens",
  },
  {
    title: "Women's Ministry",
    desc: "A Women's ministry includes hosting Bible studies, services, support groups, and gathering events.",
    img: "/m01.jpg",
    href: "/ministries/womens",
  },
  {
    title: "Global Ministry",
    desc: "We are very grateful for our part in the work of Global Ministries and the opportunity to be involved.",
    img: "/m04.jpg",
    href: "/ministries/global",
  },
  {
    title: "Music Ministry",
    desc: "Music is something we get exposed to from childhood through adulthood. It connects us to our faith.",
    img: "/m02.jpg",
    href: "/ministries/music",
  },
];

export default function MinistriesSection() {
  return (
    <section className=" bg-gray-50">
      <div className="">
        {/* <div className="text-center mb-12">
          <span className="section-subtitle">What We Do</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#00162f] mt-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our Ministries
          </h2>
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {ministries.map((ministry, i) => (
            <div
              key={i}
              className="ministry-card group"
              style={{ height: "500px" }}
            >
              <img
                src={ministry.img}
                alt={ministry.title}
                className="w-full h-full object-cover"
              />
              {/* Content overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                <h4
                  className="text-white font-bold text-lg mb-2 leading-snug group-hover:text-white transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {ministry.title}
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-20 overflow-hidden">
                  {ministry.desc}
                </p>
                <Link
                  href={ministry.href}
                  className="flex items-center gap-2 text-white hover:text-[#bf0a30] transition-colors text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Read More <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-10">
          <Link href="/ministries" className="btn-primary">
            All Ministries <ArrowRight size={14} />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
