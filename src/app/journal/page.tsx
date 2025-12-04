import { client } from "@/sanity/client";
import JournalArticle from "@/components/Journal/JournalArticle";
import { Metadata } from "next";
import { fetchOptions } from "@/constants/constants";
// import Image from "next/image";

const journalQuery = `*[_type == "journal"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage{
    ...,
    "metadata": {
      "lqip": asset->metadata.lqip,
      "blurhash": asset->metadata.blurhash,
      "palette": asset->metadata.palette
    }
  },
  publishedAt,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "metadata": {
        "lqip": asset->metadata.lqip,
        "blurhash": asset->metadata.blurhash,
        "palette": asset->metadata.palette,
        "dimensions": asset->metadata.dimensions
      }
    }
  },
  tags[]->{name}
}`;

interface JournalPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage: any;
  publishedAt: string;
  body: any;
}

export const metadata: Metadata = {
  title: "Journal",
  openGraph: {
    title: "Journal",
    type: "website",
    url: "https://www.ninepointsixthree.co/journal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal",
  },
  alternates: {
    canonical: "https://www.ninepointsixthree.co/journal",
  },
};

export default async function JournalPage() {
  const posts: JournalPost[] = await client.fetch(journalQuery, {}, fetchOptions);

  return (
    <main className="min-h-screen">
      {/* BG image */}
      {/* <div className="fixed bottom-0 h-screen w-screen">
        <div className="relative h-full w-full animate-fadeIn">
          <Image
            alt=""
            fill
            className="scale-[180%] object-contain"
          />
        </div>
      </div> */}

      <div className="fixed bottom-0 z-10 h-screen w-screen backdrop-blur-[64px]" />

      {/* Articles */}
      <div className="relative z-20 mx-auto mb-[57px] mt-[90px] w-[calc(100vw-48px)] animate-fadeUp space-y-[18px] sm:w-[490px] lg:mt-[35px]">
        {posts.map((post) => (
          <JournalArticle key={post._id} post={post} />
        ))}
      </div>
    </main>
  );
}
