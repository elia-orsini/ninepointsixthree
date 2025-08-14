"use client";

export default function Footer() {
  return (
    <div className="z-20 mb-[21px] mt-auto hidden w-full flex-row text-[14px] sm:flex">
      <div className="mx-auto flex w-[375px] flex-col backdrop-blur-[22px] hover:cursor-pointer">
        <div className="flex flex-row justify-between rounded-[24px] bg-[#DBDBDB99] px-[25px] py-[15px] text-[10px] text-[#A6A6A6]">
          <input
            className="w-[260px] bg-transparent placeholder:text-[10px] placeholder:text-[#A6A6A6] focus:outline-0"
            placeholder="Enter your email address here..."
          />

          <button className="flex flex-row gap-x-[5px] rounded-[1px] px-[9px] py-[2px] text-black">
            <div className="my-auto h-[14px] w-[14px] rounded-full bg-[#FF1500]" />
            <span>Subscribe</span>
          </button>
        </div>
      </div>
    </div>
  );
}
