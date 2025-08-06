import Slider from "./Slider";

export default function SelectedPage({ media }: { media: any[] }) {
  return (
    <div className="mx-auto">
      <Slider mediaList={media} />
    </div>
  );
}
