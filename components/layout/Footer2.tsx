import Link from "next/link";

const galleryImages = [
  "/g01.jpg",
  "/g02.jpg",
  "/g03.jpg",
  "/g04.jpg",
  "/g05.jpg",
];

export default function Footer2() {
  return (
    <footer
      className="relative"
      style={{
        backgroundImage: "url(/f01.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[rgba(0,22,47,0.85)]" />

      {/* Content */}
      <div className="relative z-10" style={{ padding: "80px 0" }}>
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Logo */}
          <div className="mb-6">
            <Link href="/">
              <img
                src="/logo.png"
                alt="RCCG AHN"
                className="h-[70px] w-auto mx-auto"
              />
            </Link>
          </div>

          {/* Description text */}
          <p
            className="text-white mx-auto mb-8"
            style={{
              fontFamily: "'Open Sans', sans-serif",
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: 700,
              maxWidth: "800px",
            }}
          >
            Send us your prayer request or<br />
            testimonies via this email{" "}
            <Link
              href="mailto:testimonies@rccgahn.org"
              className="text-[#bf0a30] hover:text-white transition-colors"
            >
              testimonies@rccgahn.org
            </Link>
          </p>

          {/* Image gallery */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 max-w-[900px] mx-auto">
            {galleryImages.map((img, i) => (
              <Link
                key={i}
                href="#"
                className="block overflow-hidden rounded group"
                style={{ width: "160px", height: "140px" }}
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>

          {/* Copyright */}
          <div className="mt-12 text-white" style={{ fontSize: "13px" }}>
            <p>
              Copyrights © {new Date().getFullYear()}{" "}RCCG Agape House, Nashville. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
