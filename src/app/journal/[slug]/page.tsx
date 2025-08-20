import { client } from "@/sanity/client";
import JournalArticle from "@/components/Journal/JournalArticle";
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
      <div className="relative z-20 mx-auto mb-[57px] mt-[90px] w-[calc(100vw-48px)] animate-fadeUp space-y-[18px] sm:w-[490px] lg:mt-[35px]">
        <JournalArticle key={post._id} post={post} />
      </div>
    </main>
  );
}
