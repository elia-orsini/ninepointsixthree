"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useCallback, useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

export default function Slider({ mediaList }: { mediaList: any[]; showThumbnails?: boolean }) {
  const swiperRef = useRef<any>(null);
  const isAnimating = useRef(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [scroll, setScroll] = useState(0);

  // Handle image load
  const handleImageLoad = (imageKey: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageKey));
  };

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (swiperRef.current) {
        event.preventDefault();

        const scrollDelta = event.deltaY;

        setScroll((s) => s + scrollDelta);
        const newTranslate = swiperRef.current.translate - scrollDelta * 0.5;

        let finalTranslate = newTranslate;
        if (newTranslate > 0) {
          finalTranslate = newTranslate;
        }

        swiperRef.current.setTranslate(finalTranslate);
        swiperRef.current.update();
        updateSlideScales();

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
    };
  }, [swiperRef, swiperRef.current, scroll]);

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

    const slides = swiperRef.current.el?.querySelectorAll(".slide");

    slides.forEach((slide: Element) => {
      const scale = calculateViewportScale(slide);
      // @ts-expect-error idk
      slide.style.width = `${110 * scale}px`;
      // @ts-expect-error idk
      slide.style.height = `${138 * scale}px`;
    });
  }, []);

  const duplicatedItems = [...mediaList, ...mediaList, ...mediaList, ...mediaList];

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
