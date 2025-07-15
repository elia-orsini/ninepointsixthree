import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NeueHaasUnicaW1G = localFont({ src: "./NNRektoratTrial-Light.otf" });

export const metadata: Metadata = {
  title: "Nine Point Six Three",
  description: "Nine Point Six Three",
  icons: {
    icon: "/globe.svg",
  },
  openGraph: {
    title: "Nine Point Six Three",
    description: "Nine Point Six Three",
    images: [
      {
        url: "/globe.svg",
        width: 500,
        height: 500,
        alt: "Nine Point Six Three",
      },
    ],
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`no-scrollbar flex flex-col overflow-x-clip bg-[#C8C0BA] antialiased ${NeueHaasUnicaW1G.className} text-[12px]`}
      >
        <Navbar />

        <div className="min-h-dvh">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
