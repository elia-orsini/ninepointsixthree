import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Query all journal slugs
  const journalQuery = `*[_type == "journal"] | order(publishedAt desc) {
    slug,
    publishedAt
  }`;

  const journalPosts = await client.fetch(journalQuery);

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
