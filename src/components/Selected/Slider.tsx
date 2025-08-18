"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const isAnimating = useRef(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  // Handle image load
  const handleImageLoad = (imageKey: string) => {
    setLoadedImages(prev => new Set(prev).add(imageKey));
  };

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

    // Calculate scale factor: 1.0 at edges, 1.25 at center
    const scaleFactor = 1.0 + 0.5 * (1 - distanceFromCenter / maxDistance);

    // Clamp scale between 1.0 and 1.25
    return Math.max(1.0, Math.min(1.5, scaleFactor));
  };

  // Update scales for all slides
  const updateSlideScales = useCallback(() => {
    if (!swiperRef.current || isAnimating.current) return;

    const slides = swiperRef.current.el?.querySelectorAll(".slide");

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

    // Initial update
    setTimeout(updateSlideScales, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [updateSlideScales]);

  // Handle loop transition
  const handleTransitionStart = () => {
    isAnimating.current = true;
  };

  const handleTransitionEnd = () => {
    isAnimating.current = false;
    updateSlideScales();
  };

  // Clone items for seamless looping (reduced for better performance)
  const duplicatedItems = [
    ...mediaList,
    ...mediaList,
    ...mediaList,
    ...mediaList,
    ...mediaList,
  ];

  return (
    <div className="h-full w-screen">
      <div className={`flex h-full w-full ${!showThumbnails && "opacity-0"}`}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={2}
          loop={true}
          loopAdditionalSlides={mediaList.length * 5}
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
            sticky: true,
          }}
          allowTouchMove={false}
          onTransitionStart={handleTransitionStart}
          onTransitionEnd={handleTransitionEnd}
          className="no-scrollbar w-screen !overflow-scroll"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Start auto-scrolling
            const autoScroll = () => {
              if (!swiper.destroyed) {
                swiper.slideNext(1000);
                setTimeout(autoScroll, 3000);
              }
            };
            setTimeout(autoScroll, 3000);
          }}
          direction="vertical"
          speed={1000}
        >
          {duplicatedItems.map((media, index) => {
            const uniqueKey = `${media._key}-${index}`;
            const isImageLoaded = loadedImages.has(media._key);
            
            return (
              <SwiperSlide
                key={uniqueKey}
                data-key={uniqueKey}
                className="mt-auto flex !h-max select-none"
              >
                <div
                  className={`slide relative mx-auto overflow-hidden rounded-[12px] transition-all duration-300 ease-out`}
                  style={{
                    transformOrigin: "center center",
                    height: "138px",
                    width: "110px",
                  }}
                >
                  <Image
                    src={urlFor(media.asset).height(400).url()}
                    fill
                    style={{ objectFit: "cover" }}
                    alt=""
                    sizes="200px"
                    placeholder="blur"
                    blurDataURL={media.metadata?.lqip}
                    onLoad={() => handleImageLoad(media._key)}
                    className={`transition-opacity duration-300 ${
                      isImageLoaded ? "opacity-100" : "opacity-90"
                    }`}
                    loading={index < 10 ? "eager" : "lazy"}
                    priority={index < 5}
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
