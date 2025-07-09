import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import WorkPage from "@/components/Work/WorkPage";

const IMAGES = `*[_type == "landingImages"][]{images[]}`;

export default async function IndexPage() {
  const projects = await client.fetch<any[]>(IMAGES, {}, fetchOptions);
  const media = projects[0].images.flat();

  return (
    <main className="flex w-screen flex-col font-semibold">
      <WorkPage media={media} />
    </main>
  );
}
