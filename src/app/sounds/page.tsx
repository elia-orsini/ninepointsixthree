import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import { urlFor } from "@/sanity/urlFor";
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

export default async function SoundsPage() {
  const sounds = await client.fetch<any[]>(SOUNDS_QUERY, {}, fetchOptions);

  return (
    <main className="flex w-screen flex-col">
      <div className="mx-auto mt-[90px] lg:mt-[35px] w-[calc(100vw-48px)] sm:w-[624px] h-[252px] animate-fadeUp">
        <div className="flex flex-col space-y-[18px]">
          {sounds.map((sound) => (
            <article
              key={sound._id}
              className="flex gap-x-[14px] sm:gap-x-[50px] overflow-hidden rounded-[24px] bg-[#D2D2D2B2] p-[36px] transition-all duration-300"
            >
              <div className="flex flex-1 flex-col mt-[14px]">
                <div>
                  {sound.publishedAt && (
                    <time className="text-[7.5px] leading-[9.5px] text-[#989898]">
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
                    <p className="mt-[11px] text-[10px] leading-[12px] text-[#373737]">{sound.excerpt}</p>
                  )}
                </div>

                {sound.link && (
                  <div className="mt-[24px]">
                    <a
                      href={sound.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-[24px] bg-[#6C6C6CB2] px-[14px] py-[7px] text-[10px] text-[#F8F8F8] transition-colors duration-200"
                    >
                      Listen
                    </a>
                  </div>
                )}
              </div>

              {sound.mainImage && (
                <div className="relative w-[130px] h-[130px] sm:h-[215px] sm:w-[215px] flex-shrink-0 overflow-hidden rounded-[18px]">
                  <Image
                    src={urlFor(sound.mainImage.asset).height(900).url()}
                    alt={sound.title}
                    fill
                    className="object-cover transition-transform duration-300"
                    placeholder="blur"
                    blurDataURL={sound.mainImage.asset.metadata?.lqip}
                    sizes="200px"
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
