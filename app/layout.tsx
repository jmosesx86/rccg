import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { church, services } from "@/lib/church";
import { formatServiceTime } from "@/lib/schedule";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { churchSchema } from "@/lib/structuredData";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(church.url),
  alternates: { canonical: "./" },
  title: {
    default: `${church.name} Nashville — ${church.tagline}`,
    template: `%s · ${church.name} Nashville`,
  },
  description: `${church.description} Join us Sundays at ${formatServiceTime(services[0])}, ${church.address.full}.`,
  keywords: [
    "RCCG",
    "Agape House",
    "church in Nashville",
    "Pentecostal church Nashville",
    "Redeemed Christian Church of God",
  ],
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: church.name,
    description: church.description,
    siteName: `${church.name} Nashville`,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0a1a33",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
          Skip to content
        </a>
        <JsonLd data={churchSchema()} />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
