"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { path: "/work", name: "work" },
  { path: "/about", name: "about" },
  { path: "/contact", name: "contact" },
];

export default function Navbar() {
  let pathname = usePathname() || "/";

  if (pathname.includes("/work/")) {
    pathname = "/work";
  }

  return (
    <div className="fixed left-1/2 z-20 mt-[21px] flex w-max -translate-x-1/2 transform flex-row gap-x-[5px] uppercase backdrop-blur-[4px]">
      <div className="flex rounded-[1px] bg-[#282D324D]">
        <p className="m-auto px-[16px] py-[6px]">9.63</p>
      </div>

      <div className="relative flex w-max flex-row gap-x-[12px] rounded-[1px] bg-[#282D324D] p-[5px]">
        {navItems.map((item) => {
          const isActive = item.path === pathname;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative rounded-[1px] px-[4px] py-[2px] text-white no-underline`}
            >
              <span className="relative z-10">{item.name}</span>

              {isActive && (
                <motion.div
                  layoutId="navbar-active"
                  className="absolute inset-0 -z-10 rounded-[1px] bg-[#FFFFFF50]"
                  transition={{
                    type: "spring",
                    bounce: 0.01,
                    stiffness: 130,
                    damping: 20,
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
