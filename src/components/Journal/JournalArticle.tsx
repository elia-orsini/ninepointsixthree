import { urlFor } from "@/sanity/urlFor";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

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

interface JournalArticleProps {
  post: JournalPost;
  showFullContent?: boolean;
  showReadMore?: boolean;
}

export default function JournalArticle({ post }: JournalArticleProps) {
  return (
    <article className="rounded-[24px] bg-[#DBDBDBB2] px-[29px] pb-[19px] pt-[30px]">
      <header className="mb-[13px]">
        <div className="mb-[7px] flex flex-row gap-x-[18px]">
          <p className="text-[7.5px] leading-[125%] text-[#989898]">{post.series}</p>

          <time className="text-[7.5px] leading-[125%] text-[#989898]">
            {new Date(post.publishedAt)
              .toLocaleDateString("en-US", {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit",
              })
              .replace(/\//g, "-")}
          </time>
        </div>

        <h2 className="text-[13.4px] leading-[125%] text-[#373737]">{post.title}</h2>
      </header>

      {post.excerpt && (
        <p className="mb-[14px] text-[11px] leading-[125%] text-[#989898]">{post.excerpt}</p>
      )}

      {post.body && (
        <div className="text-[11px] leading-[125%] text-[#373737]">
          <PortableText
            value={post.body}
            components={{
              block: {
                normal: ({ children }) => <p className="mb-[14px]">{children}</p>,
              },
              list: {
                bullet: ({ children }) => (
                  <ul className="list-inside list-disc space-y-2">{children}</ul>
                ),
                number: ({ children }) => (
                  <ol className="list-inside list-decimal space-y-2">{children}</ol>
                ),
              },
              listItem: ({ children }) => <li className="">{children}</li>,
              marks: {
                link: ({ value, children }: any) => (
                  <a
                    href={value?.href}
                    className="text-[#989898]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              },
              types: {
                image: ({ value }: any) => {
                  const imageUrl = urlFor(value).height(1000).url();
                  const aspectRatio = value.metadata?.dimensions.aspectRatio || 0.75;

                  return (
                    <div className="mb-[14px]">
                      <div className="relative w-full" style={{ aspectRatio: aspectRatio }}>
                        <Image
                          src={imageUrl}
                          alt={value.caption || value.title || post.title}
                          fill
                          className="object-contain"
                          placeholder="blur"
                          sizes="800"
                          blurDataURL={
                            value.metadata?.lqip ||
                            "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                          }
                          unoptimized
                        />
                      </div>
                      {value.caption && (
                        <p className="mt-[4px] text-left text-[7.5px] leading-[125%] text-[#989898]">
                          {value.caption}
                        </p>
                      )}
                    </div>
                  );
                },
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
