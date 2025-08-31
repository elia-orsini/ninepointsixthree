"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useCallback, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

export default function MobileSlider({
  mediaList,
}: {
  mediaList: any[];
  showThumbnails?: boolean;
}) {
  const swiperRef = useRef<any>(null);
  const slidesRef = useRef<NodeListOf<HTMLElement> | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

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
    if (!swiperRef.current) return;

    if (!slidesRef.current) {
      slidesRef.current = swiperRef.current.el?.querySelectorAll(".slide");
    }

    if (!slidesRef.current || slidesRef.current.length === 0) return;

    const currentIndex = swiperRef.current.realIndex;
    const viewportHeight = window.innerHeight;

    const range = 5;
    const startIndex = Math.max(0, currentIndex - range);
    const endIndex = Math.min(slidesRef.current.length - 1, currentIndex + range);

    for (let i = startIndex; i <= endIndex; i++) {
      const slide = slidesRef.current[i];
      if (!slide) continue;

      const rect = slide.getBoundingClientRect();

      const isVisible = rect.bottom > -100 && rect.top < viewportHeight + 100;

      if (isVisible) {
        const scale = calculateViewportScale(slide);
        slide.style.width = `${110 * scale}px`;
        slide.style.height = `${138 * scale}px`;
      }
    }
  }, []);

  const duplicatedItems = [...mediaList, ...mediaList, ...mediaList];

  return (
    <div className="h-full w-screen">
      <div className="absolute bottom-0 h-dvh w-full sm:h-screen">
        <Swiper
          slidesPerView={"auto"}
          spaceBetween={2}
          loop={true}
          modules={[FreeMode]}
          freeMode={{
            enabled: true,
            sticky: false,
            momentum: false,
            momentumRatio: 0,
            momentumVelocityRatio: 0,
          }}
          allowTouchMove={true}
          className="no-scrollbar !h-full !overflow-scroll"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            const centerNumber = Math.floor(duplicatedItems.length / 2);
            swiper.slideTo(centerNumber, 0);
            setTimeout(() => {
              slidesRef.current = null;
              updateSlideScales();
            }, 100);
          }}
          onSlideChange={() => {
            if (swiperRef.current && swiperRef.current.el) {
              requestAnimationFrame(() => updateSlideScales());
            }
          }}
          centeredSlides={true}
          direction="vertical"
          speed={400}
          touchRatio={1}
          touchAngle={45}
          grabCursor={true}
          resistance={true}
          resistanceRatio={0.85}
          effect="slide"
          followFinger={true}
          shortSwipes={true}
          longSwipes={true}
          longSwipesRatio={0.5}
          longSwipesMs={300}
        >
          {duplicatedItems.map((media, index) => {
            const uniqueKey = `${media._key}-${index}`;
            const isImageLoaded = loadedImages.has(media._key);
            const priority = Math.abs(swiperRef.current?.realIndex - index) < 10;

            return (
              <SwiperSlide key={uniqueKey} data-key={uniqueKey} className="flex !h-max select-none">
                <div
                  className="slide relative mx-auto overflow-hidden rounded-[12px] transition-all duration-300 ease-out"
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
