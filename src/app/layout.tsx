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
  title: "9.63",
  description:
    "9.63 is a creative studio founded on the belief that every business has a story to tell. Our approach is fueled by a deep sense of curiosity and a passion for discovery. In partnership with forward-thinking cultural and commercial brands, we help uncover their purpose, identify and clarify core values, and develop a foundation for future success. By leveraging tactical intuition, we create brand strategies and identity systems that engage deeply with the world we live in. Ultimately, we seek to produce thoughtful solutions that convey our clients’ brand essence and propel them into the forefront of modern culture.",
  icons: {
    icon: "/globe.svg",
  },
  openGraph: {
    title: "9.63",
    description:
      "9.63 is a creative studio founded on the belief that every business has a story to tell. Our approach is fueled by a deep sense of curiosity and a passion for discovery. In partnership with forward-thinking cultural and commercial brands, we help uncover their purpose, identify and clarify core values, and develop a foundation for future success. By leveraging tactical intuition, we create brand strategies and identity systems that engage deeply with the world we live in. Ultimately, we seek to produce thoughtful solutions that convey our clients’ brand essence and propel them into the forefront of modern culture.",
    images: [
      {
        url: "/globe.svg",
        width: 500,
        height: 500,
        alt: "9.63",
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
        <Navbar information={information[0]} />

        <div className="main-content flex min-h-dvh flex-col">
          {children}

          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
