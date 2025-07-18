"use client";

import useWindowWidth from "@/hooks/useWindowWidth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer({ data }: { data: any }) {
  const [showDesc, setShowDesc] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
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
    return windowWidth && windowWidth < 1024 ? (
      <div className="z-20 mx-[20px] mb-[21px] mt-auto flex-row text-[10px]">
        <div className="flex w-full flex-col backdrop-blur-[4px] hover:cursor-pointer">
          <div className="flex flex-row justify-between rounded-[3px] bg-[#282D324D] px-[11px] py-[6px]">
            <p className="my-auto text-nowrap text-white">Subscribe to our newsletter</p>

            <input
              className="ml-auto bg-transparent placeholder:text-black focus:outline-0"
              placeholder="Enter your email..."
            />

            <button className="rounded-[1px] bg-[#C8C0BA66] px-[9px] py-[2px] text-white">
              Submit
            </button>
          </div>
        </div>

        <div className="my-[4px] flex flex-row justify-between">
          <Link href="#" className="mt-auto uppercase">
            faq
          </Link>
          <span className="mt-auto">9pt63</span>
        </div>

        <p className="mx-auto text-center opacity-50">
          © Copyright, Terms & Conditions, Privacy Policy
        </p>
      </div>
    ) : (
      <div className="z-20 mb-[21px] mt-auto hidden w-full flex-row pl-[53px] pr-[20px] text-[14px] sm:flex">
        <div className="mb-[7px] flex w-[19vw] flex-row justify-between">
          <span></span>
          <Link href="#" className="mt-auto uppercase">
            faq
          </Link>
          <span className="mt-auto">9pt63</span>
          <span></span>
        </div>

        <div className="flex w-[43vw] flex-col backdrop-blur-[4px] hover:cursor-pointer">
          <div className="flex flex-row justify-between rounded-[3px] bg-[#282D324D] p-[8px] py-[5px]">
            <p className="my-auto text-nowrap text-white">Subscribe to our newsletter</p>

            <input
              className="ml-auto w-[200px] bg-transparent placeholder:text-black focus:outline-0"
              placeholder="Enter your email..."
            />

            <button className="rounded-[1px] bg-[#C8C0BA66] px-[9px] py-[2px] text-white">
              Submit
            </button>
          </div>
        </div>

        <p className="mb-[7px] ml-auto mt-auto">© Copyright, Terms & Conditions, Privacy Policy</p>
      </div>
    );

  if (windowWidth && windowWidth < 1024)
    return (
      <div className="z-20 mx-[20px] mb-[21px] mt-auto flex-row text-[10px]">
        <Image
          alt=""
          className="mb-[20px] h-auto w-screen"
          width="0"
          height="0"
          src="/963-logo.svg"
        />

        <Image
          alt=""
          className="mb-[20px] h-auto w-screen"
          width="0"
          height="0"
          src="/address.svg"
        />

        <div className="flex w-full flex-col backdrop-blur-[4px] hover:cursor-pointer">
          <p
            onClick={() => setShowDesc(!showDesc)}
            className={`bg-[#282D324D] p-[8px] pb-[19px] leading-[12px] text-black/50 ${showDesc ? "block" : "hidden"}`}
          >
            {data.statement}
          </p>

          <div
            onClick={() => setShowDesc(!showDesc)}
            className={`flex flex-col bg-[#282D324D] p-[8px] transition-all duration-700`}
          >
            <div className="mb-[35px] flex flex-row">
              <button className="mt-1 aspect-square h-max bg-[#282D324D] p-[9px]">
                <div className="h-[8px] w-[8px] rounded-full bg-white"></div>
              </button>

              <p className="pl-[5vw] leading-[12px] text-black/50">
                By checking this box sign up for our newsletter and receive marketing emails and
                updates on our services. You can unsubscribe at any time.
              </p>
            </div>
          </div>

          <div className="flex flex-row bg-[#282D324D] px-[11px] py-[6px]">
            <p className="my-auto text-nowrap text-white">Subscribe to our newsletter</p>

            <input
              className="ml-auto bg-transparent placeholder:text-black focus:outline-0"
              placeholder="Enter your email..."
            />

            <button className="rounded-[1px] bg-[#C8C0BA66] px-[9px] py-[2px] text-white">
              Submit
            </button>
          </div>
        </div>

        <div className="my-[4px] flex flex-row justify-between">
          <Link href="#" className="mt-auto uppercase">
            faq
          </Link>
          <span className="mt-auto">9pt63</span>
        </div>

        <p className="mx-auto text-center opacity-50">
          © Copyright, Terms & Conditions, Privacy Policy
        </p>
      </div>
    );

  return (
    <div className="z-20 mb-[21px] mt-auto hidden w-full flex-row pl-[53px] pr-[20px] text-[14px] sm:flex">
      <Image
        alt=""
        className="absolute left-0 h-auto w-screen"
        width="0"
        height="0"
        src="/963-logo-wide.svg"
      />

      <div className="mb-[7px] flex w-[19vw] flex-row justify-between">
        <span></span>
        <Link href="#" className="mt-auto uppercase">
          faq
        </Link>
        <span className="mt-auto">9pt63</span>
        <span></span>
      </div>

      <div className="flex w-[43vw] flex-col backdrop-blur-[4px] hover:cursor-pointer">
        <p
          onClick={() => setShowDesc(!showDesc)}
          className={`bg-[#282D324D] px-[8px] pb-[84px] pt-[8px] leading-[16px] text-black/50 ${showDesc ? "opacity-100" : "opacity-0"}`}
        >
          {data.statement}
        </p>

        <div
          onClick={() => setShowDesc(!showDesc)}
          className={`flex flex-col bg-[#282D324D] p-[8px] pb-[101px] transition-all duration-700`}
        >
          <div className="flex flex-row">
            <button className="mt-1 aspect-square h-max bg-[#282D324D] p-[10px]">
              <div className="h-[14px] w-[14px] rounded-full bg-white"></div>
            </button>

            <p className="pl-[5vw] leading-[16px] text-black/50">
              By checking this box sign up for our newsletter and receive marketing emails and
              updates on our services. You can unsubscribe at any time.
            </p>
          </div>
        </div>

        <div className="flex flex-row bg-[#282D324D] p-[8px] py-[5px]">
          <p className="my-auto text-nowrap text-white">Subscribe to our newsletter</p>

          <input
            className="ml-auto w-[200px] bg-transparent placeholder:text-black focus:outline-0"
            placeholder="Enter your email..."
          />

          <button className="rounded-[1px] bg-[#C8C0BA66] px-[9px] py-[2px] text-white">
            Submit
          </button>
        </div>
      </div>

      <p className="mb-[7px] ml-auto mt-auto">© Copyright, Terms & Conditions, Privacy Policy</p>
    </div>
  );
}
