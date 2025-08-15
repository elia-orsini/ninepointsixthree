import { client } from "@/sanity/client";
import JournalArticle from "@/components/Journal/JournalArticle";
import Image from "next/image";
import { notFound } from "next/navigation";

const journalPostQuery = `*[_type == "journal" && slug.current == $slug][0] {
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
  excerpt,
  series,
}`;

export async function generateStaticParams() {
  const query = `*[_type == "journal"] {
    slug
  }`;

  const posts = await client.fetch(query);

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

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

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: JournalPost = await client.fetch(journalPostQuery, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="fixed bottom-0 h-screen w-screen">
        <div className="relative h-full w-full">
          <Image
            alt=""
            fill
            src="data:image/jpeg;base64,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"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto mb-[24px] mt-[69px] w-[40vw]">
        <JournalArticle post={post} showReadMore={false} />
      </div>
    </main>
  );
}
