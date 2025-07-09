import Slider from "./Slider";

export default function WorkPage({ media }: { media: any[] }) {
  console.log(media);

  return (
    <div className="mx-auto py-[21px]">
      <Slider mediaList={media} />
    </div>
  );
}
