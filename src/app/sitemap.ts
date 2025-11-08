import type { MetadataRoute } from "next";

import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import { urlFor } from "@/sanity/urlFor";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Query all journal slugs
  const journalQuery = `*[_type == "journal"] | order(publishedAt desc) {
    slug,
    publishedAt
  }`;

  const journalPosts = await client.fetch(journalQuery, {}, fetchOptions);

  const imagesQuery = `*[_type == "selectedWorks"][]{
    images[]{
      asset
    }
  }`;

  const projects = await client.fetch<any[]>(imagesQuery, {}, fetchOptions);
  const media = projects[0]?.images?.flat() || [];

  const imageUrls = media
    .map((image: any) => {
      if (image?.asset) {
        try {
          const url = urlFor(image.asset).url();
          return url?.split("?")[0] || null;
        } catch {
          return null;
        }
      }
      return null;
    })
    .filter((url: string | null) => url !== null) as string[];

  const journalPages = journalPosts.map(
    (post: { slug: { current: string }; publishedAt: string }) => {
      return {
        url: `https://www.ninepointsixthree.co/journal/${post.slug.current}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }
  );

  return [
    {
      url: "https://www.ninepointsixthree.co/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      images: imageUrls,
    },
    {
      url: "https://www.ninepointsixthree.co/journal",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.ninepointsixthree.co/sounds",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...journalPages,
  ];
}
