import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { Viewport } from "next";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/Footer/FooterWrapper";
import { fetchOptions } from "@/constants/constants";
import { client } from "@/sanity/client";

const NeueHaasUnicaW1G = localFont({ src: "./NNRektoratTrial-LightRe.otf" });

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

const INFORMATION = `*[_type == "information"][]{statement, instagram, email}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const information = await client.fetch<any[]>(INFORMATION, {}, fetchOptions);

  return (
    <html lang="en">
      <body
        className={`no-scrollbar flex flex-col overflow-x-clip bg-[#F9F9F9] antialiased ${NeueHaasUnicaW1G.className} text-[10px]`}
      >
        <Navbar information={information[0]} />

        <div className="flex min-h-dvh flex-col">
          {children}

          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
