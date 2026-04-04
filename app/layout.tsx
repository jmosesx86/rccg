import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RCCG Agape House — God Gives Us Power",
  description:
    "Welcome to RCCG Agape House. We are here to share the great news of Jesus Christ to all that will listen.",
  keywords: "church, ministry, sermons, events, Christian, faith",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Damion&family=Poppins:wght@400;500;600;700&family=Open+Sans:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
