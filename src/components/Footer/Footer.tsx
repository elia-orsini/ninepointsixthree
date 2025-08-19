"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function Footer() {
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  // Route change animation
  useEffect(() => {
    setShouldAnimate(true);

    const timer = setTimeout(() => {
      setShouldAnimate(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Reset animation state when pathname changes
  useEffect(() => {
    setHasAnimated(false);
  }, [pathname]);

  // Scroll-triggered animation for pages where footer is at bottom
  useEffect(() => {
    if (pathname.includes("journal") || pathname.includes("sounds")) {
      const handleScroll = () => {
        if (hasAnimated || !footerRef.current) return;

        const rect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Check if footer is visible in viewport (with some tolerance)
        const isVisible = rect.top <= viewportHeight && rect.bottom >= viewportHeight;

        if (isVisible) {
          setShouldAnimate(true);
          setHasAnimated(true);

          const timer = setTimeout(() => {
            setShouldAnimate(false);
          }, 1500);

          return () => clearTimeout(timer);
        }
      };

      // Add scroll listener
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Check initial visibility after a short delay to ensure DOM is ready
      const initialCheck = setTimeout(() => {
        handleScroll();
      }, 500);

      return () => {
        window.removeEventListener("scroll", handleScroll);
        clearTimeout(initialCheck);
      };
    }
  }, [pathname, hasAnimated]);

  // Auto-dismiss message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleFocus = () => {
    setIsFocused(true);
    setIsSubmitted(false);
    setMessage("");
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setMessage("");

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
        setMessage("Something went wrong");
        setIsSubmitted(false);
      }
    } catch (error) {
      console.log(error);
      setMessage("Network error. Please try again.");
      setIsSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      ref={footerRef}
      className={`${pathname.includes("journal") ? "mb-[24px]" : "fixed bottom-[24px]"} z-20 mt-auto flex w-full flex-row text-[14px]`}
    >
      <div className="mx-auto flex w-[375px] flex-col hover:cursor-pointer">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div
            className={`${shouldAnimate ? "animate-emailWidgetUp" : ""} mx-auto flex flex-row justify-between rounded-[24px] backdrop-blur-[22px] ${isSubmitted ? "bg-[#6C6C6C80]" : "bg-[#DBDBDB99]"} h-[46px] px-[30px] text-[10px] ${isSubmitted ? "text-[#F8F8F8]" : "text-[#A6A6A6]"} transition-all duration-500 ease-in-out ${
              isFocused || isSubmitted ? "w-[350px]" : "w-[250px]"
            }`}
          >
            {isSubmitted ? (
              <p className="my-auto whitespace-nowrap">Thank you for subscribing</p>
            ) : (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-transparent transition-all duration-700 ease-in-out placeholder:text-[10px] placeholder:text-[#A6A6A6] focus:border-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                  isFocused || isSubmitted ? "w-[600px]" : "w-[200px]"
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

      <div
        className={`absolute left-1/2 mx-auto mb-2 -translate-x-1/2 transform text-center text-[10px] text-red-600 transition-all duration-500 ease-in-out ${message ? "visible -translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-2 opacity-0"}`}
      >
        {message}
      </div>
    </div>
  );
}
