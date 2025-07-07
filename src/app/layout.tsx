import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

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
        className={`no-scrollbar flex h-dvh flex-col overflow-x-clip bg-[#C8C0BA] antialiased ${NeueHaasUnicaW1G.className} text-[12px]`}
      >
        <div className="fixed ml-[16px] flex h-dvh flex-col justify-between py-[21px]">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
          <div>6</div>
          <div>7</div>
          <div>8</div>
          <div>9</div>
          <div>10</div>
        </div>

        <Image
          alt=""
          className="fixed mt-[60vh] h-auto w-screen"
          width="0"
          height="0"
          src="/963-logo.svg"
        />

        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
