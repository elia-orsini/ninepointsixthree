import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/urlFor";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

const journalPostQuery = `*[_type == "journal" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  publishedAt,
  body
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
  params: {
    slug: string;
  };
}

export default async function JournalPostPage({ params }: PageProps) {
  const post: JournalPost = await client.fetch(journalPostQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <div className="mx-auto mb-[24px] mt-[69px] w-[40vw] rounded-[24px] bg-[#D2D2D2B2] p-[36px]">
        <header className="mb-[21.6px]">
          <div className="mb-[10px]">
            <time className="text-[7.5px] leading-[7.5px] text-[#989898]">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-[13.4px] leading-[13.4px] text-black">{post.title}</h1>
        </header>

        {post.body && (
          <article className="prose prose-lg max-w-none leading-[10px]">
            <PortableText
              value={post.body}
              components={{
                block: {
                  normal: ({ children }) => <p className="mb-[22px]">{children}</p>,
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="mb-6 list-inside list-disc space-y-2">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="mb-6 list-inside list-decimal space-y-2">{children}</ol>
                  ),
                },
                listItem: ({ children }) => <li className="text-gray-700">{children}</li>,
                marks: {
                  link: ({ value, children }: any) => (
                    <a
                      href={value?.href}
                      className="text-blue-600 underline hover:text-blue-800"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                },
                types: {
                  image: ({ value }: any) => (
                    <div className="my-[22px]">
                      <img
                        src={urlFor(value).url()}
                        alt={value.alt || value.title || "Image"}
                        className="h-auto w-full"
                      />
                      {(value.caption || value.title) && (
                        <p className="mt-2 text-center text-[7.5px] text-[#989898]">
                          {value.caption || value.title}
                        </p>
                      )}
                    </div>
                  ),
                },
              }}
            />
          </article>
        )}
      </div>
    </main>
  );
}
