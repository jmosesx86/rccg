"use client";
import Link from "next/link";
import { Headphones } from "lucide-react";

export default function ContactCTASection() {
  return (
    <section
      className="relative overflow-visible text-white"
      style={{
        backgroundImage:
          "url(/f01.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingTop: "80px",
        paddingBottom: "160px",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.85)]" />

      {/* Wave divider at bottom */}
      <div
        className="absolute left-0 w-full leading-[0]"
        style={{ bottom: "-1px", transform: "rotate(180deg)" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
          className="w-full block"
          style={{ height: "120px" }}
        >
          <path
            fill="#fff"
            opacity="0.33"
            d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"
          />
          <path
            fill="#fff"
            opacity="0.66"
            d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"
          />
          <path
            fill="#fff"
            d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Flip card — left column */}
          <div className="lg:col-span-4 lg:pe-4">
            <div
              className="flip-card"
              style={{ height: "355px", perspective: "1000px", marginTop: "-115px" }}
            >
              <div className="flip-card-inner">
                {/* Front — red */}
                <div className="flip-card-front">
                  <div className="mb-8">
                    <Headphones size={30} className="text-white mx-auto" />
                  </div>
                  <h3
                    className="text-white text-2xl font-bold relative pb-5 mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Call Us
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-white rounded"
                    />
                  </h3>
                  <div className="space-y-2 text-white/90" style={{ fontSize: "15px" }}>
                    <p>2128 Murfressboro Pike , Nashville, TN, United States, 37217</p>
                    <p>
                      <a href="tel:+16156685801" className="hover:text-white">+1-615-668-5801</a>
                    </p>
                    <p>
                      <a href="mailto:info@rccgahn.org" className="hover:text-white">info@rccgahn.org</a>
                    </p>
                  </div>
                </div>

                {/* Back — white */}
                <div className="flip-card-back">
                  <h3
                    className="text-[#bf0a30] text-2xl font-bold relative pb-5 mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Call Us
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-[#bf0a30] rounded"
                    />
                  </h3>
                  <div className="space-y-2 text-[#8d9297]" style={{ fontSize: "15px" }}>
                    <p>2128 Murfressboro Pike , Nashville, TN, United States, 37217</p>
                    <p>
                      <a href="tel:+16156685801" className="text-[#8d9297] hover:text-[#bf0a30]">+1-615-668-5801</a>
                    </p>
                    <p>
                      <a href="mailto:info@rccgahn.org" className="text-[#8d9297] hover:text-[#bf0a30]">info@rccgahn.org</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Get In Touch */}
          <div className="lg:col-span-8 lg:ps-4">
            <span
              className="text-[#bf0a30] text-base font-bold tracking-[0.2em] uppercase block mb-1"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Get In Touch
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-1 mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Don&apos;t hesitate Contact Us
            </h2>

            {/* Red underline divider */}
            <div className="flex items-center gap-1 mb-6">
              <div className="w-[40px] h-1 bg-[#bf0a30] rounded-full" />
              <div className="w-[16px] h-1 bg-[#bf0a30] rounded-full" />
            </div>

            <p className="text-white/80 mb-6" style={{ fontSize: "15px", lineHeight: "28px" }}>
              We would love to hear from you. Whether you have questions, need prayer, share testimony, or want to learn more about our church family, our doors and hearts are always open.
            </p>

            <Link
              href="/contact"
              className="inline-block bg-[#bf0a30] text-white hover:bg-black transition-colors"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "16px",
                padding: "15px 30px",
                borderRadius: "4px",
                boxShadow: "-3px 9px 16px -4px rgba(0,0,0,0.26)",
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
