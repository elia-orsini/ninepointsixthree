import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

const PROJECTS_WITH_IMAGES = `*[_type == "homepage"]{media[]{_key, title, style, images[]{asset}, muxvideo{asset->{playbackId, data{aspect_ratio, duration}}}}}`;

export default async function IndexPage() {
  // const projects = await client.fetch<IProject[]>(PROJECTS_WITH_IMAGES, {}, fetchOptions);
  // const media = projects.map((project) => project.media).flat();

  return (
    <main className="flex w-screen flex-col font-semibold">
      <div className="mx-auto grid h-screen w-[96px] grid-rows-10 py-[21px]">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={`img_obj_${index}`} className="relative h-full border">
            <Image src="/work-1.png" alt="" fill className="w-full object-cover" />
          </div>
        ))}
      </div>
    </main>
  );
}
