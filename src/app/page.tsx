import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import Slider from "@/components/Selected/Slider";

const IMAGES = `*[_type == "selectedWorks"][]{
  images[]{
    ...,
    "metadata": {
      "lqip": asset->metadata.lqip,
      "blurhash": asset->metadata.blurhash,
      "palette": asset->metadata.palette
    }
  }
}`;

export default async function IndexPage() {
  const projects = await client.fetch<any[]>(IMAGES, {}, fetchOptions);
  const media = projects[0].images.flat();

  return <Slider mediaList={media} />;
}
