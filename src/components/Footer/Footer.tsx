"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);

    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsSubmitted(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsFocused(false);
    
    // Reset submitted state after animation
    setTimeout(() => {
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <div
      className={`${shouldAnimate ? "animate-emailWidgetUp" : ""} z-20 mb-[21px] mt-auto hidden w-full flex-row text-[14px] sm:flex`}
    >
      <div className="mx-auto flex w-[375px] flex-col backdrop-blur-[22px] hover:cursor-pointer">
        <form onSubmit={handleSubmit}>
          <div 
            className={`flex flex-row justify-between rounded-[24px] bg-[#DBDBDB99] px-[25px] py-[15px] text-[10px] text-[#A6A6A6] transition-all duration-500 ease-in-out ${
              isFocused ? 'w-[500px]' : 'w-[375px]'
            }`}
          >
            <input
              className={`bg-transparent placeholder:text-[10px] placeholder:text-[#A6A6A6] focus:outline-0 transition-all duration-500 ease-in-out ${
                isFocused ? 'w-[380px]' : 'w-[260px]'
              }`}
              placeholder="Enter your email address here..."
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <button 
              type="submit"
              className="flex flex-row gap-x-[5px] rounded-[1px] px-[9px] py-[2px] text-black transition-all duration-500 ease-in-out"
            >
              <div 
                className={`my-auto h-[14px] w-[14px] rounded-full transition-all duration-500 ease-in-out ${
                  isSubmitted ? 'bg-green-500' : 'bg-[#FF1500]'
                }`}
              />
              <span>Subscribe</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
