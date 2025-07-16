"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showDesc, setShowDesc] = useState<boolean>(false);
  let pathname = usePathname() || "/";

  if (pathname.includes("/work/")) {
    pathname = "/work";
  }

  useEffect(() => {
    if (pathname === "/contact") {
      setShowDesc(false);
    }

    if (pathname === "/info") {
      setShowDesc(true);
    }
  }, [pathname]);

  if (pathname === "/work" || pathname === "/")
    return (
      <div className="z-20 mb-[21px] mt-auto hidden w-full flex-row pl-[53px] pr-[20px] text-[14px] sm:flex">
        <div className="mb-[7px] flex w-[19vw] flex-row justify-between pr-[40px]">
          <Link href="#" className="mt-auto uppercase">
            faq
          </Link>
          <a href="#" className="mt-auto uppercase">
            instagram
          </a>
        </div>

        <div
          onClick={() => setShowDesc(!showDesc)}
          className="flex w-[43vw] flex-col backdrop-blur-[4px] hover:cursor-pointer"
        >
          <div className="flex flex-row justify-between bg-[#282D324D] p-[8px] py-[5px]">
            <p className="my-auto text-nowrap text-white">Subscribe to our newsletter</p>

            <input
              className="bg-transparent placeholder:uppercase placeholder:text-black focus:outline-0"
              placeholder="enter your email..."
            />

            <button className="bg-[#C8C0BA66] px-[6px] py-[2px] uppercase text-white">
              submit
            </button>
          </div>
        </div>

        <p className="mb-[7px] ml-auto mt-auto">© Copyright, Terms & Conditions, Privacy Policy</p>
      </div>
    );

  return (
    <div className="z-20 mb-[21px] mt-auto hidden w-full flex-row pl-[53px] pr-[20px] text-[14px] sm:flex">
      <Image
        alt=""
        className="absolute left-0 h-auto w-screen"
        width="0"
        height="0"
        src="/963-logo.svg"
      />

      <div className="mb-[7px] flex w-[19vw] flex-row justify-between pr-[40px]">
        <Link href="#" className="mt-auto uppercase">
          faq
        </Link>
        <a href="#" className="mt-auto uppercase">
          instagram
        </a>
      </div>

      <div
        onClick={() => setShowDesc(!showDesc)}
        className="flex w-[43vw] flex-col backdrop-blur-[4px] hover:cursor-pointer"
      >
        <p
          className={`bg-[#282D324D] p-[8px] pb-[84px] text-black/50 ${showDesc ? "opacity-100" : "opacity-0"}`}
        >
          9.63 is a brand consultancy founded on the belief that every business has a story to tell.
          Our approach is fueled by a deep sense of curiosity and a passion for discovery. In
          partnership with forward-thinking cultural and commercial brands, we help uncover their
          purpose, identify and clarify core values, and develop a foundation for future success. By
          leveraging tactical intuition, we create brand strategies and identity systems that engage
          deeply with the world we live in. Ultimately, we seek to produce thoughtful solutions that
          convey our clients’ brand essence and propel them into the forefront of modern culture.
        </p>

        <div className={`flex flex-col bg-[#282D324D] p-[8px] transition-all duration-700`}>
          <div className="mb-[93px] flex flex-row">
            <button className="mt-1 aspect-square h-max bg-[#282D324D] p-[10px]">
              <div className="h-[14px] w-[14px] rounded-full bg-white"></div>
            </button>

            <p className="pl-[5vw] text-black/50">
              By checking this box sign up for our newsletter and receive marketing emails and
              updates on our services. You can unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="flex flex-row justify-between bg-[#282D324D] p-[8px] py-[5px]">
          <p className="my-auto text-nowrap text-white">Subscribe to our newsletter</p>

          <input
            className="bg-transparent placeholder:uppercase placeholder:text-black focus:outline-0"
            placeholder="enter your email..."
          />

          <button className="bg-[#C8C0BA66] px-[6px] py-[2px] uppercase text-white">submit</button>
        </div>
      </div>

      <p className="mb-[7px] ml-auto mt-auto">© Copyright, Terms & Conditions, Privacy Policy</p>
    </div>
  );
}
