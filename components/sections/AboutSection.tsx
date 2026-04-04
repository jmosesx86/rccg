import Link from "next/link";
import { Heart, BookOpen } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image side — dot pattern visible at right edge and bottom */}
          <div className="relative hidden lg:block" style={{ marginRight: "30px", marginBottom: "80px" }}>
            {/* Dot pattern fills entire area behind */}
            <div
              className="absolute inset-0 z-0"
              style={{
                top: "150px",
                left: "250px",
                backgroundImage: "radial-gradient(circle, #c5c5c5 1.5px, transparent 1.5px)",
                backgroundSize: "16px 16px",
              }}
            />
            {/* Image — offset so dots peek out at bottom and right */}
            <div
              className="relative z-10"
              style={{ marginRight: "60px", marginBottom: "80px" }}
            >
              <img
                src="/pst01.jpg"
                alt="About Our Church"
                className="w-full object-cover"
                style={{ height: "600px" }}
              />
            </div>
          </div>
          {/* Mobile — simple image, no dots */}
          <div className="lg:hidden">
            <img
              src="/pst01.jpg"
              alt="About Our Church"
              className="w-full object-cover"
              style={{ height: "400px" }}
            />
          </div>

          {/* Content side */}
          <div>
            <span className="section-subtitle">RCCG Agape House</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-[#252525] mt-3 mb-6 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              A Parish of the Redeemed Christian Church of God
            </h2>

            {/* Red underline divider */}
            <div className="flex items-center gap-1 mb-8">
              <div className="w-[40px] h-1 bg-[#bf0a30] rounded-full" />
              <div className="w-[16px] h-1 bg-[#bf0a30] rounded-full" />
            </div>

            <p className="text-[#8d9297] leading-relaxed mb-5" style={{ fontSize: "15px", lineHeight: "28px" }}>
              AHN is a full gospel Pentecostal church, a Bible-believing, Christ-centered, and Holy Spirit-filled church dedicated to ministering to people of all ages and backgrounds with a focus on individuals, families, communities, and nations.
            </p>

            <p
              className="text-[#8d9297] mb-10"
              style={{
                fontFamily: "'Damion', cursive",
                fontSize: "24px",
                lineHeight: "34px",
              }}
            >
              Our mission is to prepare people for the Lord, to encourage people to love and know Jesus Christ while they grow in their relationship with the Father through Him. We also plan to motivate and challenge people to discover and fulfils their life purpose.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {/* <div>
                <div className="w-12 h-12 rounded-full bg-[#bf0a30] flex items-center justify-center mb-5 hover:bg-black transition-colors cursor-pointer">
                  <Heart size={18} className="text-white" />
                </div>
                <h4
                  className="font-bold text-[#252525] mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px" }}
                >
                  Place Of Heaven
                </h4>
                <p className="text-[#8d9297] text-sm leading-relaxed">
                  In Zegen you will feel divinity, piety, goodness, faith or
                  right beliefs.
                </p>
              </div> */}

              {/* <div>
                <div className="w-12 h-12 rounded-full bg-[#bf0a30] flex items-center justify-center mb-5 hover:bg-black transition-colors cursor-pointer">
                  <BookOpen size={18} className="text-white" />
                </div>
                <h4
                  className="font-bold text-[#252525] mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "18px" }}
                >
                  Study Bible
                </h4>
                <p className="text-[#8d9297] text-sm leading-relaxed">
                  Learn the Bible enhance your wisdom, give you boldness about
                  your faith.
                </p>
              </div> */}
            </div>

            <Link
              href="/about"
              className="inline-block bg-[#bf0a30] text-white hover:bg-black transition-colors"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                padding: "10px 30px",
                borderRadius: "4px",
                boxShadow: "-3px 9px 16px -4px rgba(0,0,0,0.26)",
              }}
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
