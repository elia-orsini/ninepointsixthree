"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";

export default function Landing() {
  const windowWidth = useWindowWidth();

  return (
    <main className="flex h-full w-screen flex-col bg-red-200 font-semibold">
      {windowWidth && windowWidth < 1024 ? (
        <Image
          alt=""
          className="px-[20px] fixed left-1/2 top-1/2 my-auto h-auto w-screen -translate-x-1/2 -translate-y-1/2 transform"
          width="0"
          height="0"
          src="/963-logo.svg"
        />
      ) : (
        <Image
          alt=""
          className="fixed left-1/2 top-1/2 my-auto h-auto w-screen -translate-x-1/2 -translate-y-1/2 transform"
          width="0"
          height="0"
          src="/963-logo-wide.svg"
        />
      )}
    </main>
  );
}
