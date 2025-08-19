"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { TransitionLink } from "./TransitionLink";

const navItems = [
  { path: "/", name: "Selected" },
  { path: "/journal", name: "Journal" },
  { path: "/sounds", name: "Sounds" },
];

export default function Navbar({ information, email }: { information: any; email: string }) {
  const [showInfo, setShowInfo] = useState(false);
  const pathname = usePathname() || "/";

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>({});

  useLayoutEffect(() => {
    const el = itemRefs.current[pathname];

    if (itemRefs && itemRefs.current) {
      Object.keys(itemRefs.current).map((key: string) => {
        itemRefs.current[key].classList.remove("hover:cursor-default");
        itemRefs.current[key].classList.remove("!text-[#f8f8f8]");
        itemRefs.current[key].classList.remove("!bg-[#6C6C6CB2]");
      });
    }
    el?.classList.add("hover:cursor-default");
    el?.classList.add("!text-[#f8f8f8]");
    el?.classList.add("!bg-[#6C6C6CB2]");
  }, [pathname]);

  useEffect(() => {
    document.querySelector(".main-content")?.classList.add("loaded");
  }, []);

  return (
    <div className="fixed z-40 mt-[34px] flex w-screen flex-row justify-between gap-x-[5px] px-[24px] sm:px-[60px]">
      {showInfo ? (
        <div></div>
      ) : (
        <div className="flex rounded-[24px] bg-[#DBDBDBB2] text-[#373737] backdrop-blur-[5px]">
          <button
            onClick={() => setShowInfo(true)}
            className={`m-auto px-[24px] py-[10px] transition-all duration-300 ${showInfo ? "pointer-events-none opacity-0" : "opacity-100"}`}
          >
            9.63
          </button>
        </div>
      )}

      <div
        className={`absolute left-0 top-0 z-50 ml-[24px] w-[calc(100vw-48px)] rounded-[24px] bg-[#6C6C6CB2] pb-[18px] text-[#f8f8f8] backdrop-blur-[22px] transition-all duration-500 ease-in-out md:ml-[60px] md:w-[670px] ${
          showInfo
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <button
          onClick={() => setShowInfo(false)}
          className="px-[18px] pb-[8px] pt-[18px] transition-colors duration-300 hover:opacity-70"
        >
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
              <a href={`mailto:${email}`}>{email}</a>
              <p>9pt63</p>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setShowInfo(false)}
        className={`fixed left-0 top-0 z-20 h-full w-full transition-all duration-500 ease-in-out ${showInfo ? "visible opacity-100" : "pointer-events-none invisible opacity-0"} bg-transparent backdrop-blur-[22px]`}
      ></div>

      <div ref={containerRef} className="relative flex w-max flex-row gap-x-[6px] rounded-[3px]">
        {navItems.map((item) => (
          <TransitionLink
            key={item.path}
            href={item.path}
            //@ts-expect-error idk
            ref={(el) => (itemRefs.current[item.path] = el)}
            className={`relative z-10 w-[74px] rounded-[24px] bg-[#DBDBDBB2] py-[10px] text-center text-[#373737] no-underline backdrop-blur-[5px] transition-colors duration-500 first:ml-[5px] hover:bg-[#BCBCBCB2] hover:text-[#373737]`}
          >
            <span>{item.name}</span>
          </TransitionLink>
        ))}
      </div>
    </div>
  );
}
