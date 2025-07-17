import { client } from "@/sanity/client";
import { fetchOptions } from "@/constants/constants";
import WorkPage from "@/components/Work/WorkPage";

const IMAGES = `*[_type == "selectedWorks"][]{images[]}`;

export default async function IndexPage() {
  const projects = await client.fetch<any[]>(IMAGES, {}, fetchOptions);
  const media = projects[0].images.flat();

  return (
    <main className="flex w-screen flex-col font-semibold">
      <div className="absolute ml-[20px] lg:ml-[16px] flex h-dvh flex-col justify-between py-[21px]">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
      </div>

      <WorkPage media={media} />
    </main>
  );
}
