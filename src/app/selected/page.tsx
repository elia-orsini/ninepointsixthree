import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import SelectedPage from "@/components/Selected/SelectedPage";

const IMAGES = `*[_type == "selectedWorks"][]{images[]}`;

export default async function IndexPage() {
  const projects = await client.fetch<any[]>(IMAGES, {}, fetchOptions);
  const media = projects[0].images.flat();

  return (
    <main className="flex w-screen flex-col font-semibold">
      <SelectedPage media={media} />
    </main>
  );
}
