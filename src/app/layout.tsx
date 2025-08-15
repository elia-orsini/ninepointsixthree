import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import type { Viewport } from "next";
import Navbar from "@/components/Navbar";
import FooterWrapper from "@/components/Footer/FooterWrapper";
import { fetchOptions } from "@/constants/constants";
import { client } from "@/sanity/client";

const Helvetica = localFont({
  src: [
    {
      path: "./HelveticaNeue-Roman.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./HelveticaNeueBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./HelveticaNeueItalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./HelveticaNeueBoldItalic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-times-new-roman",
});

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
        className={`no-scrollbar flex flex-col overflow-x-clip bg-[#FAF9F6] text-[10px] ${Helvetica.className} antialiased`}
      >
        <Navbar information={information[0]} email={information[0].email} />

        <div className="main-content flex min-h-dvh flex-col">
          {children}

          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
