"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useCallback, useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

export default function Slider({
  mediaList,
  showThumbnails = true,
}: {
  mediaList: any[];
  showThumbnails?: boolean;
}) {
  const swiperRef = useRef<any>(null);

  // Calculate scale based on viewport position
  const calculateViewportScale = (element: Element) => {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // Calculate the center point of the element relative to viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    // Calculate distance from viewport center (0 = perfectly centered)
    const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

    // Maximum distance where scaling should occur (half viewport height)
    const maxDistance = viewportHeight / 5;

    // Calculate scale factor: 1.0 at edges, 1.25 at cente
    const scaleFactor = 1.0 + 0.5 * (1 - distanceFromCenter / maxDistance);

    // Clamp scale between 1.0 and 1.25
    return Math.max(1.0, Math.min(1.5, scaleFactor));
  };

  // Update scales for all slides
  const updateSlideScales = useCallback(() => {
    if (!swiperRef.current) return;

    const slides = swiperRef.current.el.querySelectorAll(".slide");

    slides.forEach((slide: Element) => {
      const scale = calculateViewportScale(slide);
      // @ts-expect-error idk
      slide.style.width = `${110 * scale}px`;
      // @ts-expect-error idk
      slide.style.height = `${138 * scale}px`;
    });
  }, []);

  // Set up scroll and resize listeners
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateSlideScales);
    };

    const handleResize = () => {
      requestAnimationFrame(updateSlideScales);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    setTimeout(updateSlideScales, 500);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSlideScales]);

  const handleSlideChangeTransitionStart = () => {
    setTimeout(() => {
      swiperRef.current.animating = false;
    }, 0);
  };

  return (
    <div className="h-full w-screen">
      <div className={`flex h-full w-full ${!showThumbnails && "opacity-0"}`}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={2}
          virtualTranslate={false}
          loop={false}
          modules={[FreeMode]}
          freeMode={true}
          allowTouchMove={false}
          onSlideChangeTransitionStart={handleSlideChangeTransitionStart}
          className="no-scrollbar !overflow-scroll"
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          direction="vertical"
        >
          {mediaList.map((media, i) => {
            return (
              <SwiperSlide
                key={media._key}
                data-key={media._key}
                className="mt-auto flex !h-max select-none"
                onClick={() => {}}
              >
                <div
                  className={`slide relative mx-auto overflow-hidden rounded-[12px] transition-all duration-300 ease-out`}
                  style={{
                    transformOrigin: "center center",
                    height: "138px",
                    width: `110px`,
                  }}
                >
                  <Image
                    src={urlFor(media.asset).height(400).url()}
                    fill
                    style={{ objectFit: "cover" }}
                    alt=""
                    sizes="200px"
                    placeholder="blur"
                    blurDataURL={urlFor(media.asset).width(10).blur(25).url()}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
