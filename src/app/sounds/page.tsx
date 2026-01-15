import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import { urlFor } from "@/sanity/urlFor";
import { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

const SOUNDS_QUERY = `*[_type == "sounds"] | order(publishedAt desc) {
  _id,
  title,
  excerpt,
  link,
  publishedAt,
  mainImage {
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        blurhash,
        palette
      }
    }
  },
  curationInfo[]{
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

export const metadata: Metadata = {
  title: "Sounds",
  openGraph: {
    title: "Sounds",
    type: "website",
    url: "https://www.ninepointsixthree.co/sounds",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sounds",
  },
  alternates: {
    canonical: "https://www.ninepointsixthree.co/sounds",
  },
};

export default async function SoundsPage() {
  const sounds = await client.fetch<any[]>(SOUNDS_QUERY, {}, fetchOptions);

  return (
    <main className="flex w-screen flex-col">
      <div className="mx-auto mt-[90px] h-[252px] w-[calc(100vw-48px)] animate-fadeUp sm:w-[624px] lg:mt-[35px]">
        <div className="flex flex-col space-y-[18px]">
          {sounds.map((sound) => (
            <article
              key={sound._id}
              className="flex gap-x-[14px] overflow-hidden rounded-[24px] bg-[#DBDBDBB2] p-[18px] transition-all duration-300 sm:gap-x-[50px]"
            >
              <div className="mt-[12px] flex flex-1 flex-col pl-[11px]">
                <div>
                  <h2 className="mt-[3px] text-[13.4px] text-[#373737]">{sound.title}</h2>

                  {sound.tags && (
                    <div className="mb-[16px] mt-[10px] flex flex-row gap-x-[4px]">
                      {sound.tags.map((tag: { name: string }) => (
                        <p
                          key={tag.name}
                          className="w-max cursor-default border-[0.65px] border-[#8E8E8E] px-[6.5px] py-[4px] text-[7.5px] leading-[125%] text-[#8E8E8E] transition-all duration-[400ms] odd:rounded-full even:rounded-[1.6px] hover:bg-[#8E8E8E] hover:text-white"
                        >
                          {tag.name}
                        </p>
                      ))}
                    </div>
                  )}

                  {sound.excerpt && (
                    <p className="auto hidden text-[10px] text-[#373737] sm:block">
                      {sound.excerpt}
                    </p>
                  )}

                  {sound.curationInfo && (
                    <div className="mt-[16px] hidden text-[10px] leading-[125%] text-[#373737] sm:block">
                      <PortableText
                        value={sound.curationInfo}
                        components={{
                          block: {
                            normal: ({ children }) => <p className="mb-[14px]">{children}</p>,
                          },
                          marks: {
                            link: ({ value, children }: any) => (
                              <a
                                href={value?.href}
                                className="inline-flex items-center gap-x-1 text-[#8E8E8E]"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {children}
                                <svg
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M0 6.37598V2.37695C0 1.61562 0.618223 1.00293 1.37402 1.00293H2.87402C3.08113 1.00293 3.24902 1.17082 3.24902 1.37793C3.24887 1.58491 3.08104 1.75293 2.87402 1.75293H1.37402C1.03062 1.75293 0.75 2.03165 0.75 2.37695V6.37598C0.75 6.71938 1.02872 7 1.37402 7H5.37305C5.71645 7 5.99707 6.72128 5.99707 6.37598V4.87598C5.99707 4.66896 6.16509 4.50113 6.37207 4.50098C6.57918 4.50098 6.74707 4.66887 6.74707 4.87598V6.37598C6.74707 7.13731 6.12885 7.75 5.37305 7.75H1.37402C0.612694 7.75 0 7.13178 0 6.37598ZM7.75 2.625C7.75 2.83211 7.58211 3 7.375 3C7.16789 3 7 2.83211 7 2.625V1.28027L4.88867 3.3916C4.74223 3.53805 4.50485 3.53805 4.3584 3.3916C4.21195 3.24515 4.21195 3.00777 4.3584 2.86133L6.46875 0.75H5.125C4.91789 0.75 4.75 0.582107 4.75 0.375C4.75 0.167893 4.91789 0 5.125 0H7.375C7.58211 0 7.75 0.167893 7.75 0.375V2.625Z"
                                    fill="#8E8E8E"
                                  />
                                </svg>
                              </a>
                            ),
                          },
                        }}
                      />
                    </div>
                  )}
                </div>

                {sound.link && (
                  <div className="mt-[24px]">
                    <a
                      href={sound.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-[74px] items-center rounded-[24px] bg-[#6C6C6CB2] py-[10px] text-center text-[11px] text-[#F8F8F8] transition-colors duration-500 hover:bg-[#BCBCBCB2] hover:text-[#373737]"
                    >
                      <span className="mx-auto">Listen</span>
                    </a>
                  </div>
                )}
              </div>

              {sound.mainImage && (
                <div className="relative h-[130px] w-[130px] flex-shrink-0 overflow-hidden rounded-[18px] sm:h-[215px] sm:w-[215px]">
                  <Image
                    src={urlFor(sound.mainImage.asset).height(900).url()}
                    alt={sound.title}
                    fill
                    className="object-cover transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={sound.mainImage.asset.metadata?.lqip}
                    sizes="200px"
                    unoptimized
                  />
                </div>
              )}
            </article>
          ))}
        </div>

        {sounds.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No sounds available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
}
