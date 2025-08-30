"use client";

import { useState } from "react";

export default function MobileFooter() {
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setIsSubmitted(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setIsSubmitted(false);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setEmail("");
        setIsSubmitted(true);
        setIsFocused(false);
      } else {
        console.log(data.error);
        setIsSubmitted(false);
      }
    } catch (error) {
      console.log(error);
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative z-50 -mb-[74px] flex w-full flex-row text-[14px]">
      <div className="flex w-full flex-col hover:cursor-pointer">
        <form onSubmit={handleSubmit} className="flex w-full flex-col">
          <div
            className={`mx-auto flex flex-row justify-between rounded-[24px] ${isSubmitted ? "bg-[#6C6C6C80]" : "bg-[#DBDBDB99]"} h-[46px] px-[30px] text-[11px] ${isSubmitted ? "text-[#F8F8F8]" : "text-[#A6A6A6]"} transition-all duration-500 ease-in-out ${
              isFocused || isSubmitted ? "w-full" : "w-full"
            }`}
          >
            {isSubmitted ? (
              <p className="my-auto whitespace-nowrap">Thank you for subscribing</p>
            ) : (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-transparent transition-all duration-700 ease-in-out placeholder:text-[11px] placeholder:text-[#A6A6A6] focus:border-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                  isFocused || isSubmitted ? "w-full" : "w-full"
                }`}
                style={{ outline: "none", boxShadow: "none" }}
                placeholder={
                  isFocused ? "Enter your email address here..." : "Join the mailing list"
                }
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={isLoading}
              />
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`my-auto flex flex-row gap-x-[5px] rounded-[1px] py-[2px] ${isSubmitted ? "text-[#F8F8F8]" : "text-[#373737]"} transition-all duration-500 ease-in-out ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
            >
              <div
                className={`my-auto h-[10px] w-[10px] rounded-full transition-all duration-500 ease-in-out ${
                  isSubmitted ? "bg-[#3CFF00]" : "bg-[#FF1500]"
                }`}
              />
              <span>{isLoading ? "Subscribing..." : isSubmitted ? "Subscribed" : "Subscribe"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
