import Link from "next/link";
import { Play, Music, BookOpen } from "lucide-react";

const sermons = [
  {
    title: "Spiritually Reborn As God's Children",
    desc: "Jesus is holy, loving, and worthy of all our worship and devotion. You will feel heaven in",
  },
  {
    title: "Sunday Sermon from the Church",
    desc: "Our team of regulars and part-time volunteers is committed to helping others. Our ministries provide sensible solutions",
  },
  {
    title: "Preaching Worship An Online Family",
    desc: "Stay active in the Zegen Church so that you can stay active in your life activities. Reach",
  },
];

export default function SermonsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title — centered */}
        <div className="text-center mb-16">
          <span
            className="text-[#bf0a30] font-bold uppercase block"
            style={{ fontFamily: "'Open Sans', sans-serif", fontSize: "16px" }}
          >
            Sermons
          </span>
          <h2
            className="text-[#252525] font-bold mt-1 mb-8"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "30px", lineHeight: "38px" }}
          >
            Our Sermons
          </h2>
          {/* Red divider — centered */}
          <div className="flex items-center gap-1 justify-center">
            <div className="w-[40px] h-1 bg-[#bf0a30] rounded-full" />
            <div className="w-[16px] h-1 bg-[#bf0a30] rounded-full" />
          </div>
        </div>

        {/* Sermon grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon, i) => (
            <div
              key={i}
              className="bg-white rounded-[10px] text-center transition-all duration-300 hover:shadow-lg"
              style={{
                boxShadow: "rgb(2 2 2 / 6%) 0px 0px 50px",
                padding: "35px 30px",
              }}
            >
              {/* Action icons — rounded squares */}
              <div className="flex justify-center gap-1 mb-5">
                {[Play, Music].map((Icon, j) => (
                  <Link
                    key={j}
                    href="#"
                    className="w-[45px] h-[45px] bg-[#bf0a30] hover:bg-black rounded-md flex items-center justify-center text-white transition-colors"
                  >
                    <Icon size={16} />
                  </Link>
                ))}
              </div>

              {/* Title */}
              <h4
                className="text-[#252525] font-bold mb-3"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "21px", lineHeight: "30px" }}
              >
                <Link href="/sermons/details" className="hover:text-[#bf0a30] transition-colors">
                  {sermon.title}
                </Link>
              </h4>

              {/* Description */}
              <p className="text-[#8d9297] mb-5" style={{ fontSize: "15px", lineHeight: "28px" }}>
                {sermon.desc}
              </p>

              {/* Read More */}
              <Link
                href="/sermons/details"
                className="text-[#bf0a30] hover:text-black font-semibold border-b-2 border-[#bf0a30] hover:border-black pb-0.5 transition-colors"
                style={{ fontSize: "15px" }}
              >
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
