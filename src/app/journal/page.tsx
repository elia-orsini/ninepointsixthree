import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/urlFor";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// Query to fetch all journal posts
const journalQuery = `*[_type == "journal"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body
}`;

// Type for journal post
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

export default async function JournalPage() {
  const posts: JournalPost[] = await client.fetch(journalQuery);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-16">
          {posts.map((post) => (
            <article key={post._id} className="border-b border-gray-200 pb-16 last:border-b-0">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Image */}
                {post.mainImage && (
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <div className="mb-4">
                    <time className="text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>

                  <h2 className="mb-4 text-xl font-bold text-gray-900">
                    <Link
                      href={`/journal/${post.slug.current}`}
                      className="transition-colors hover:text-gray-600"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  {post.body && (
                    <div className="line-clamp-3 text-gray-600">
                      <PortableText
                        value={post.body}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="mb-4">{children}</p>,
                          },
                        }}
                      />
                    </div>
                  )}

                  <div className="mt-6">
                    <Link
                      href={`/journal/${post.slug.current}`}
                      className="inline-flex items-center font-medium"
                    >
                      Read more
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No journal posts found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
