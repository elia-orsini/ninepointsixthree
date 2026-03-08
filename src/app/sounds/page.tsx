import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import { urlFor } from "@/sanity/urlFor";
import { Metadata } from "next";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { ExternalLink } from "@/components/ExternalLink";

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
              className="flex gap-x-[14px] overflow-hidden rounded-[24px] bg-[#DBDBDBB2] px-[14px] py-[18px] transition-all duration-300 sm:gap-x-[50px]"
            >
              <div className="mt-[12px] flex flex-1 flex-col pl-[10px]">
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
                    <div className="mt-[16px] hidden text-[10px] text-[#373737] sm:block">
                      <PortableText
                        value={sound.curationInfo}
                        components={{
                          block: {
                            normal: ({ children }) => <p>{children}</p>,
                          },
                          marks: {
                            link: ({ value, children }: any) => (
                              <ExternalLink href={value?.href ?? "#"}>{children}</ExternalLink>
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
