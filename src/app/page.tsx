import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";

const PROJECTS_WITH_IMAGES = `*[_type == "homepage"]{media[]{_key, title, style, images[]{asset}, muxvideo{asset->{playbackId, data{aspect_ratio, duration}}}}}`;

export default async function IndexPage() {
  // const projects = await client.fetch<IProject[]>(PROJECTS_WITH_IMAGES, {}, fetchOptions);
  // const media = projects.map((project) => project.media).flat();

  return (
    <main className="flex h-dvh w-screen flex-col font-semibold sm:h-screen">
      nine point six three
    </main>
  );
}
