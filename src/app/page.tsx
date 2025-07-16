import Image from "next/image";

export default async function IndexPage() {
  return (
    <main className="flex h-full w-screen flex-col bg-red-200 font-semibold">
      <Image
        alt=""
        className="fixed left-1/2 top-1/2 my-auto h-auto w-screen -translate-x-1/2 -translate-y-1/2 transform"
        width="0"
        height="0"
        src="/963-logo.svg"
      />
    </main>
  );
}
