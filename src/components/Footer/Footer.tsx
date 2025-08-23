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
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationType, setAnimationType] = useState<"up" | "down" | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Scroll-based visibility control
  useEffect(() => {
    let isScrolling = false;

    const handleScroll = () => {
      if (!isScrolling && isVisible && !isAnimating) {
        setIsAnimating(true);
        setAnimationType("down");
        setIsVisible(false);
        isScrolling = true;
      }

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsAnimating(true);
        setAnimationType("up");
        setIsVisible(true);

        console.log("set timeout");

        isScrolling = false;
      }, 2000);
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isVisible, isAnimating]);

  // Handle animation completion
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setAnimationType(null);
      }, 1500); // Match animation duration

      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Scroll-triggered animation for pages where footer is at bottom
  useEffect(() => {
    if (pathname.includes("journal")) {
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
      setIsSubmitted(false);
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

  const getAnimationClass = () => {
    if (shouldAnimate) return "animate-emailWidgetUp";
    if (isAnimating && animationType === "down") return "animate-emailWidgetDown";
    if (isAnimating && animationType === "up") return "animate-emailWidgetUp";
    return "";
  };

  const getPositionClass = () => {
    // When animating up, start from the hidden position
    if (isAnimating && animationType === "up") {
      return "translate-y-[100px] opacity-0 backdrop-blur-[0px]";
    }
    // When not visible and not animating, stay hidden
    if (!isVisible && !isAnimating && pathname.includes("journal")) {
      return "translate-y-[100px] opacity-0 backdrop-blur-[0px]";
    }
    // Default visible state
    return "translate-y-0 opacity-100 backdrop-blur-[22px]";
  };

  return (
    <div
      ref={footerRef}
      className={`fixed bottom-[24px] z-20 mt-auto flex w-full flex-row text-[14px]`}
    >
      <div className="mx-auto flex w-[375px] flex-col hover:cursor-pointer">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div
            className={`${getAnimationClass()} ${getPositionClass()} mx-auto flex flex-row justify-between rounded-[24px] ${isSubmitted ? "bg-[#6C6C6C80]" : "bg-[#DBDBDB99]"} h-[46px] px-[30px] text-[10px] ${isSubmitted ? "text-[#F8F8F8]" : "text-[#A6A6A6]"} transition-all duration-500 ease-in-out ${
              isFocused || isSubmitted ? "w-[320px]" : "w-[230px]"
            }`}
          >
            {isSubmitted ? (
              <p className="my-auto whitespace-nowrap">Thank you for subscribing</p>
            ) : (
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-transparent transition-all duration-700 ease-in-out placeholder:text-[10px] placeholder:text-[#A6A6A6] focus:border-none focus:shadow-none focus:outline-none focus:ring-0 focus:ring-offset-0 ${
                  isFocused || isSubmitted ? "w-[550px]" : "w-[160px]"
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
