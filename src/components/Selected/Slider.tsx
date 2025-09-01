"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import useWindowWidth from "@/hooks/useWindowWidth";
import MobileSlider from "./MobileSlider";

export default function Slider({
  mediaList,
  showThumbnails,
}: {
  mediaList: any[];
  showThumbnails?: boolean;
}) {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth && windowWidth < 640;

  // All hooks must be called at the top level, regardless of mobile/desktop
  const swiperRef = useRef<any>(null);
  const isAnimating = useRef(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const scaleUpdateTimeout = useRef<NodeJS.Timeout | null>(null);

  // Handle image load
  const handleImageLoad = (imageKey: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageKey));
  };

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

  const updateSlideScales = useCallback(() => {
    if (!swiperRef.current || isAnimating.current) return;

    const currentIndex = swiperRef.current.realIndex;
    const slides = swiperRef.current.el?.querySelectorAll(".slide") || [];
    const viewportHeight = window.innerHeight;

    // Define range around current index to update (e.g., ±10 slides)
    const range = 5;
    const startIndex = Math.max(0, currentIndex - range);
    const endIndex = Math.min(slides.length - 1, currentIndex + range);

    for (let i = startIndex; i <= endIndex; i++) {
      const slide = slides[i];
      if (!slide) continue;

      const rect = slide.getBoundingClientRect();

      // Check if slide is visible on screen (with some buffer)
      const isVisible = rect.bottom > -100 && rect.top < viewportHeight + 100;

      if (isVisible) {
        const scale = calculateViewportScale(slide);
        slide.style.width = `${110 * scale}px`;
        slide.style.height = `${138 * scale}px`;
      }
    }
  }, []);

  const duplicatedItems = [...mediaList, ...mediaList, ...mediaList, ...mediaList];

  useEffect(() => {
    // Only add scroll listener for desktop
    if (isMobile) return;

    const handleScroll = (event: WheelEvent) => {
      if (swiperRef.current) {
        event.preventDefault();

        const scrollDelta = event.deltaY;

        const newTranslate = swiperRef.current.translate - scrollDelta * 0.5;

        swiperRef.current.setTranslate(newTranslate);
        swiperRef.current.update();

        if (scaleUpdateTimeout.current) {
          clearTimeout(scaleUpdateTimeout.current);
        }
        scaleUpdateTimeout.current = setTimeout(() => {
          updateSlideScales();
        }, 10);

        if (
          swiperRef.current.realIndex < 10 ||
          swiperRef.current.realIndex > duplicatedItems.length - 10
        ) {
          swiperRef.current.slideTo(Math.floor(duplicatedItems.length / 2), 0);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
      if (scaleUpdateTimeout.current) {
        clearTimeout(scaleUpdateTimeout.current);
      }
    };
  }, [isMobile, duplicatedItems.length, updateSlideScales]);

  // If mobile, render the mobile-optimized version
  if (isMobile) {
    return <MobileSlider mediaList={mediaList} showThumbnails={showThumbnails} />;
  }

  // Desktop version with manual scroll manipulation
  return (
    <div className="h-full w-screen">
      <div className={`absolute bottom-0 h-dvh w-full sm:h-screen`}>
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={2}
          virtualTranslate={false}
          loop={true}
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
            sticky: false,
          }}
          allowTouchMove={true}
          className="no-scrollbar !h-dvh !overflow-scroll"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            const initialTranslate = swiperRef.current.translate;
            const centerNumber = Math.floor(duplicatedItems.length / 2);
            const toTranslate = initialTranslate + centerNumber * -140;
            swiperRef.current.setTranslate(toTranslate);
            swiperRef.current.update();
            updateSlideScales();
          }}
          onSlideChange={() => {
            requestAnimationFrame(() => updateSlideScales());
          }}
          centeredSlides={true}
          direction="vertical"
        >
          {duplicatedItems.map((media, index) => {
            const uniqueKey = `${media._key}-${index}`;
            const isImageLoaded = loadedImages.has(media._key);
            const priority = Math.abs(swiperRef.current?.realIndex - index) < 10;

            return (
              <SwiperSlide key={uniqueKey} data-key={uniqueKey} className="flex !h-max select-none">
                <div
                  className={`slide relative mx-auto overflow-hidden rounded-[12px] transition-all duration-300 ease-out`}
                  style={{
                    transformOrigin: "center center",
                    height: "138px",
                    width: "110px",
                  }}
                >
                  <Image
                    src={urlFor(media.asset).height(700).url()}
                    fill
                    style={{ objectFit: "cover" }}
                    alt=""
                    sizes="700px"
                    placeholder="blur"
                    blurDataURL={media.metadata?.lqip}
                    onLoad={() => handleImageLoad(media._key)}
                    className={`transition-opacity duration-300 ${
                      isImageLoaded ? "opacity-100" : "opacity-90"
                    }`}
                    loading={priority ? "eager" : "lazy"}
                    priority={priority}
                    unoptimized
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
