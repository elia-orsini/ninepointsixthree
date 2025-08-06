"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";

const navItems = [
  { path: "/selected", name: "Selected" },
  { path: "/journal", name: "Journal" },
  { path: "/audio", name: "Audio" },
];

export default function Navbar() {
  let pathname = usePathname() || "/";

  if (pathname.includes("/selected/")) {
    pathname = "/selected";
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>({});
  // const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = itemRefs.current[pathname];
    // const container = containerRef.current;

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

    // if (el && container) {
    //   const elRect = el.getBoundingClientRect();
    //   const containerRect = container.getBoundingClientRect();
    //   setIndicatorStyle({
    //     left: elRect.left - containerRect.left - 5,
    //     width: elRect.width + 10,
    //   });
    // }
  }, [pathname]);

  return (
    <div className="fixed z-20 mt-[34px] flex w-screen flex-row justify-between gap-x-[5px] px-[60px]">
      <div className="flex rounded-[12px] bg-[#DBDBDBB2] text-[#6C6C6C] backdrop-blur-[5px]">
        {pathname === "/" ? (
          <p className="m-auto px-[16px] py-[6px] hover:cursor-default">9.63</p>
        ) : (
          <Link href={"/"} className="m-auto px-[16px] py-[6px]">
            9.63
          </Link>
        )}
      </div>

      <div ref={containerRef} className="relative flex w-max flex-row gap-x-[6px] rounded-[3px]">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            //@ts-expect-error idk
            ref={(el) => (itemRefs.current[item.path] = el)}
            className={`relative z-10 rounded-[13px] bg-[#DBDBDBB2] px-[14px] py-[10px] text-[#6C6C6C] no-underline backdrop-blur-[5px] first:ml-[5px] hover:bg-[#DBDBDB99] hover:text-black`}
          >
            <span>{item.name}</span>
          </Link>
        ))}

        {/* <motion.div
          className={`absolute bottom-[5px] top-[5px] z-0 rounded-[1px] bg-[#FFFFFF30] ${pathname === "/" ? "opacity-0" : "opacity-100"}`}
          animate={indicatorStyle}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 20,
          }}
        /> */}
      </div>
    </div>
  );
}
