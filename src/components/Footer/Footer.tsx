"use client";

export default function Footer() {
  return (
    <div className="z-20 mb-[21px] mt-auto hidden w-full flex-row pl-[53px] pr-[20px] text-[14px] sm:flex">
      {/* <div className="mb-[7px] flex w-[19vw] flex-row justify-between">
        <span></span>
        <Link href="#" className="mt-auto uppercase">
          faq
        </Link>
        <span className="mt-auto">9pt63</span>
        <span></span>
      </div> */}

      <div className="mx-auto flex w-[43vw] flex-col backdrop-blur-[22px] hover:cursor-pointer">
        <div className="flex flex-row justify-between rounded-[12px] rounded-[3px] bg-[#DBDBDB80] px-[25px] py-[15px] text-[#A6A6A6]">
          <input
            className="w-[260px] bg-transparent placeholder:text-[#A6A6A6] focus:outline-0"
            placeholder="Enter your email address here..."
          />

          <button className="flex flex-row gap-x-[5px] rounded-[1px] px-[9px] py-[2px] text-[#6C6C6C]">
            <div className="my-auto h-[14px] w-[14px] rounded-full bg-[#FF1500]" />
            <span>Subscribe</span>
          </button>
        </div>
      </div>

      {/* <p className="mb-[7px] ml-auto mt-auto">© Copyright, Terms & Conditions, Privacy Policy</p> */}
    </div>
  );
}
