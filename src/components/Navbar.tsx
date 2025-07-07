"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  {
    path: "/work",
    name: "work",
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/contact",
    name: "contact",
  },
];

export default function Navbar() {
  let pathname = usePathname() || "/";

  if (pathname.includes("/work/")) {
    pathname = "/work";
  }

  const [hoveredPath, setHoveredPath] = useState(pathname);

  return (
    <div className="fixed left-1/2 z-20 mt-[21px] flex w-max -translate-x-1/2 transform flex-row gap-x-[5px] uppercase backdrop-blur-[4px]">
      <div className="flex rounded-[1px] bg-[#282D324D]">
        <p className="m-auto px-[16px] py-[6px]">9.63</p>
      </div>
      <div className="flex w-max flex-row gap-x-[12px] rounded-[1px] bg-[#282D324D] p-[5px]">
        {navItems.map((item, index) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              className={`relative rounded-[1px] px-[4px] py-[2px] no-underline duration-300 ease-in ${
                isActive ? "bg-[#C8C0BA66] text-white" : ""
              }`}
              data-active={isActive}
              href={item.path}
              onMouseOver={() => setHoveredPath(item.path)}
              onMouseLeave={() => setHoveredPath(pathname)}
            >
              <div className="z-40">{item.name}</div>
              {item.path === hoveredPath && (
                <motion.div
                  className="absolute bottom-0 left-0 -z-10 h-full rounded-[1px] bg-[#FFFFFF30]"
                  layoutId="navbar"
                  aria-hidden="true"
                  style={{
                    width: "100%",
                  }}
                  transition={{
                    type: "spring",
                    bounce: 0.01,
                    stiffness: 130,
                    damping: 20,
                    duration: 0.3,
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
