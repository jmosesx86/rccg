import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pastors = [
  {
    name: "Rev. James Wilson",
    role: "Senior Pastor",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
    socials: { fb: "#", tw: "#", in: "#" },
  },
  {
    name: "Pastor Sarah Adams",
    role: "Associate Pastor",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&q=80",
    socials: { fb: "#", tw: "#", in: "#" },
  },
  {
    name: "Deacon Michael Lee",
    role: "Youth Minister",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
    socials: { fb: "#", tw: "#", in: "#" },
  },
  {
    name: "Sister Grace Okello",
    role: "Women's Ministry Lead",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&q=80",
    socials: { fb: "#", tw: "#", in: "#" },
  },
];

export default function PastorsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="section-subtitle">Leadership</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#00162f] mt-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Our Pastors
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastors.map((pastor, i) => (
            <div
              key={i}
              className="group relative overflow-hidden bg-gray-50"
            >
              {/* Image */}
              <div className="overflow-hidden" style={{ height: "300px" }}>
                <img
                  src={pastor.img}
                  alt={pastor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Social overlay */}
              <div className="absolute inset-0 bg-[rgba(0,22,47,0.7)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                {["FB", "TW", "IN"].map((s) => (
                  <Link
                    key={s}
                    href="#"
                    className="w-9 h-9 border-2 border-white/50 text-white flex items-center justify-center text-xs font-bold hover:bg-[#bf0a30] hover:border-[#bf0a30] transition-all"
                  >
                    {s}
                  </Link>
                ))}
              </div>

              {/* Info */}
              <div className="p-5 text-center border border-gray-100 border-t-0">
                <h4
                  className="font-bold text-[#00162f] text-base mb-1 group-hover:text-[#bf0a30] transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {pastor.name}
                </h4>
                <p className="text-[#bf0a30] text-xs font-bold tracking-widest uppercase"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  {pastor.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/pastors" className="btn-primary">
            Meet All Pastors <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
