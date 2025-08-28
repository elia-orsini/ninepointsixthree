import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import { urlFor } from "@/sanity/urlFor";
import { Metadata } from "next";
import Image from "next/image";

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
  }
}`;

export const metadata: Metadata = {
  title: "Sounds | Nine Point Six Three",
  openGraph: {
    title: "Sounds | Nine Point Six Three",
    type: "website",
    url: "https://www.ninepointsixthree.co/sounds",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sounds | Nine Point Six Three",
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
              className="flex gap-x-[14px] overflow-hidden rounded-[24px] bg-[#D2D2D2B2] p-[18px] transition-all duration-300 sm:gap-x-[50px]"
            >
              <div className="mt-[14px] flex flex-1 flex-col pl-[18px]">
                <div>
                  {sound.publishedAt && (
                    <time className="text-[7.5px] leading-[118%] text-[#989898]">
                      {new Date(sound.publishedAt)
                        .toLocaleDateString("en-US", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace(/\//g, "-")}
                    </time>
                  )}

                  <h2 className="mt-[3px] text-[13.4px] text-[#373737]">{sound.title}</h2>

                  {sound.excerpt && (
                    <p className="text-[11px]auto mt-[11px] hidden text-[#373737] sm:block">
                      {sound.excerpt}
                    </p>
                  )}
                </div>

                {sound.link && (
                  <div className="mt-[22px]">
                    <a
                      href={sound.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-[74px] items-center rounded-[24px] bg-[#6C6C6CB2] py-[10px] text-center text-[11px] text-[#F8F8F8] transition-colors duration-200"
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
