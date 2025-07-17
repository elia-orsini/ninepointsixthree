import Slider from "./Slider";

export default function WorkPage({ media }: { media: any[] }) {
  console.log(media);

  return (
    <div className="mx-auto">
      <Slider mediaList={media} />
    </div>
  );
}
