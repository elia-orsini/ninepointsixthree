"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { path: "/work", name: "Selected" },
  { path: "/info", name: "Info" },
  { path: "/contact", name: "Contact" },
];

export default function Navbar() {
  let pathname = usePathname() || "/";

  if (pathname.includes("/work/")) {
    pathname = "/work";
  }

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<any>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = itemRefs.current[pathname];
    const container = containerRef.current;

    if (itemRefs && itemRefs.current) {
      Object.keys(itemRefs.current).map((key: string) => {
        itemRefs.current[key].classList.remove("!text-white");
        itemRefs.current[key].classList.remove("hover:cursor-default");
      });
    }
    el?.classList.add("!text-white");
    el?.classList.add("hover:cursor-default");

    if (el && container) {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setIndicatorStyle({
        left: elRect.left - containerRect.left - 5,
        width: elRect.width + 10,
      });
    }
  }, [pathname]);

  return (
    <div className="fixed left-1/2 z-20 mt-[21px] flex w-max -translate-x-1/2 transform flex-row gap-x-[5px] backdrop-blur-[4px]">
      <div className="flex rounded-[1px] bg-[#282D324D]">
        {pathname === "/" ? (
          <p className="m-auto px-[16px] py-[6px] hover:cursor-default">9.63</p>
        ) : (
          <Link href={"/"} className="m-auto px-[16px] py-[6px]">
            9.63
          </Link>
        )}
      </div>

      <div
        ref={containerRef}
        className="relative flex w-max flex-row gap-x-[20px] rounded-[1px] bg-[#282D324D] p-[5px]"
      >
        {navItems.map((item, i) => (
          <Link
            key={item.path}
            href={item.path}
            //@ts-expect-error idk
            ref={(el) => (itemRefs.current[item.path] = el)}
            className={`relative z-10 rounded-[1px] py-[2px] text-black no-underline first:ml-[5px] ${i === 2 && "mr-[5px]"}`}
          >
            <span>{item.name}</span>
          </Link>
        ))}

        <motion.div
          className={`absolute bottom-[5px] top-[5px] z-0 rounded-[1px] bg-[#FFFFFF30] ${pathname === "/" ? "opacity-0" : "opacity-100"}`}
          animate={indicatorStyle}
          transition={{
            type: "spring",
            stiffness: 130,
            damping: 20,
          }}
        />
      </div>
    </div>
  );
}
