import { client } from "@/sanity/client";
import JournalArticle from "@/components/Journal/JournalArticle";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/urlFor";
import { Metadata } from "next";
import { fetchOptions } from "@/constants/constants";

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

  const posts = await client.fetch(query, {}, fetchOptions);

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
  excerpt?: string;
  series?: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post: JournalPost = await client.fetch(journalPostQuery, { slug }, fetchOptions);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested journal post could not be found.",
    };
  }

  const description = post.excerpt || 
    `Read "${post.title}" on Nine Point Six Three - ${post.series ? `Part of the ${post.series} series.` : "A journal post about design, creativity, and innovation."}`;

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url() 
    : "https://www.ninepointsixthree.co/963-logo-wide.svg";

  return {
    title: `${post.title}`,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      url: `https://www.ninepointsixthree.co/journal/${post.slug.current}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: ["Nine Point Six Three"],
      section: post.series || "Journal",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://www.ninepointsixthree.co/journal/${post.slug.current}`,
    },
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post: JournalPost = await client.fetch(journalPostQuery, { slug }, fetchOptions);

  if (!post) {
    notFound();
  }

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt || post.title,
    "image": post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Nine Point Six Three",
      "url": "https://www.ninepointsixthree.co"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Nine Point Six Three",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ninepointsixthree.co/963-logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ninepointsixthree.co/journal/${post.slug.current}`
    },
    "url": `https://www.ninepointsixthree.co/journal/${post.slug.current}`,
    "articleSection": post.series || "Journal",
    "wordCount": post.body ? JSON.stringify(post.body).length : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen">
        <div className="relative z-20 mx-auto mb-[57px] mt-[90px] w-[calc(100vw-48px)] animate-fadeUp space-y-[18px] sm:w-[490px] lg:mt-[35px]">
          <JournalArticle key={post._id} post={post} />
        </div>
      </main>
    </>
  );
}
