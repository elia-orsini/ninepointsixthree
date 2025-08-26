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
  metadataBase: new URL("https://www.ninepointsixthree.co"),
  title: {
    default: "9.63",
    template: "%s | 9.63",
  },
  description:
    "9.63 is a creative studio founded on the belief that every business has a story to tell. Our approach is fueled by a deep sense of curiosity and a passion for discovery. In partnership with forward-thinking cultural and commercial brands, we help uncover their purpose, identify and clarify core values, and develop a foundation for future success. By leveraging tactical intuition, we create brand strategies and identity systems that engage deeply with the world we live in. Ultimately, we seek to produce thoughtful solutions that convey our clients' brand essence and propel them into the forefront of modern culture.",
  authors: [{ name: "9.63" }],
  creator: "9.63",
  publisher: "9.63",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/globe.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/globe.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.ninepointsixthree.co",
    siteName: "9.63",
    title: "9.63",
    description:
      "9.63 is a creative studio founded on the belief that every business has a story to tell. Our approach is fueled by a deep sense of curiosity and a passion for discovery. In partnership with forward-thinking cultural and commercial brands, we help uncover their purpose, identify and clarify core values, and develop a foundation for future success. By leveraging tactical intuition, we create brand strategies and identity systems that engage deeply with the world we live in. Ultimately, we seek to produce thoughtful solutions that convey our clients' brand essence and propel them into the forefront of modern culture.",
    images: [
      {
        url: "/globe.svg",
        width: 500,
        height: 500,
        alt: "9.63",
        type: "image/svg+xml",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "9.63",
    description:
      "9.63 is a creative studio founded on the belief that every business has a story to tell. Our approach is fueled by a deep sense of curiosity and a passion for discovery.",
    images: ["/globe.svg"],
  },
  alternates: {
    canonical: "https://www.ninepointsixthree.co",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#FAF9F6",
};

const INFORMATION = `*[_type == "information"][0]{
  statement,
  email,
  services,
  features,
  social[]{label, url}
}`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const information = await client.fetch<any>(INFORMATION, {}, fetchOptions);

  // Organization structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "9.63 Creative Studio",
    url: "https://www.ninepointsixthree.co",
    logo: {
      "@type": "ImageObject",
      url: "https://www.ninepointsixthree.co/globe.svg",
      width: 500,
      height: 500,
    },
    description:
      "9.63 is a creative studio founded on the belief that every business has a story to tell. Our approach is fueled by a deep sense of curiosity and a passion for discovery.",
    foundingDate: "2020",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: information?.email || "hello@ninepointsixthree.co",
    },
    sameAs: (information?.social || []).map((s: { url?: string }) => s?.url).filter(Boolean),
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <meta name="theme-color" content="#FAF9F6" />
        <meta name="msapplication-TileColor" content="#FAF9F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="9.63" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`no-scrollbar flex flex-col overflow-x-clip bg-[#FAF9F6] text-[11px] ${Helvetica.className} antialiased`}
      >
        <Navbar information={information} />

        <div className="main-content flex min-h-dvh flex-col">
          {children}

          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}
