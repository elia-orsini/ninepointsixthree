"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { path: "/", name: "Selected" },
  { path: "/journal", name: "Journal" },
  { path: "/audio", name: "Audio" },
];

export default function Navbar({ information }: { information: any }) {
  const [showInfo, setShowInfo] = useState(false);
  const pathname = usePathname() || "/";

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>({});

  useLayoutEffect(() => {
    const el = itemRefs.current[pathname];

    if (itemRefs && itemRefs.current) {
      Object.keys(itemRefs.current).map((key: string) => {
        itemRefs.current[key].classList.remove("hover:cursor-default");
        itemRefs.current[key].classList.remove("!text-white");
        itemRefs.current[key].classList.remove("!bg-[#6C6C6CB2]");
      });
    }
    el?.classList.add("hover:cursor-default");
    el?.classList.add("!text-white");
    el?.classList.add("!bg-[#6C6C6CB2]");
  }, [pathname]);

  return (
    <div className="fixed z-20 mt-[34px] flex w-screen flex-row justify-between gap-x-[5px] px-[60px]">
      <div className="flex rounded-[24px] bg-[#DBDBDBB2] text-black backdrop-blur-[5px]">
        <button
          onClick={() => setShowInfo(true)}
          className={`m-auto px-[24px] py-[10px] ${showInfo ? "hidden" : "block"}`}
        >
          9.63
        </button>
      </div>

      {showInfo && (
        <div className="absolute w-[40vw] rounded-[24px] bg-[#6C6C6CB2] pb-[18px] text-white backdrop-blur-[22px]">
          <button onClick={() => setShowInfo(false)} className="px-[18px] pb-[8px] pt-[18px]">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.01367 8.76337L5.01462 4.76242M5.01462 4.76242L9.01556 0.761475M5.01462 4.76242L1.01367 0.761475M5.01462 4.76242L9.01556 8.76337"
                stroke="#BCBCBC"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="px-[36px] pb-[18px] leading-[10px]">
            <p className="leading-[14px]">{information.statement}</p>

            <div className="mt-[18px]">
              <div className="grid grid-cols-3 text-[7.5px] text-[#BCBCBC]">
                <p>Service</p>
                <p>Clients</p>
                <p>Press</p>
              </div>
              <div className="mt-[6px] grid grid-cols-3">
                <div className="flex flex-col">
                  <p>Brand Positioning</p>
                  <p>Brand Architecture</p>
                </div>
                <div className="flex flex-col">
                  <p>Justsmile</p>
                  <p>Talome</p>
                  <p>Aymeric</p>
                </div>
                <div className="flex flex-col">
                  <p>Visuelle</p>
                  <p>Visual Journal</p>
                </div>
              </div>
            </div>

            <div className="mt-[18px]">
              <div className="grid grid-cols-3 text-[7.5px] text-[#BCBCBC]">
                <p>Email</p>
                <p>Socials</p>
              </div>
              <div className="mt-[6px] grid grid-cols-3">
                <p>studio@</p>
                <p>9pt63</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} className="relative flex w-max flex-row gap-x-[6px] rounded-[3px]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            //@ts-expect-error idk
            ref={(el) => (itemRefs.current[item.path] = el)}
            className={`relative z-10 w-[74px] rounded-[24px] bg-[#DBDBDBB2] py-[10px] text-center text-black no-underline backdrop-blur-[5px] first:ml-[5px] hover:bg-[#DBDBDB99] hover:text-black`}
          >
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
