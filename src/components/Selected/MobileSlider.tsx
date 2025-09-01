"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useEffect, useRef, useState } from "react";

export default function MobileSlider({
  mediaList,
}: {
  mediaList: any[];
  showThumbnails?: boolean;
}) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [repeatedMediaList, setRepeatedMediaList] = useState<any[]>([]);
  const isScrollingUp = useRef(false);

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
    const maxDistance = viewportHeight / 3;

    // Calculate scale factor: 1.0 at edges, 1.5 at center
    const scaleFactor = 1.0 + 0.5 * (1 - distanceFromCenter / maxDistance);

    // Clamp scale between 1.0 and 1.5
    return Math.max(1.0, Math.min(1.5, scaleFactor));
  };

  const updateImageScales = () => {
    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll(".image-container");
    const viewportHeight = window.innerHeight;
    const scrollTop = scrollContainerRef.current?.scrollTop || 0;

    images.forEach((imageContainer) => {
      const rect = imageContainer.getBoundingClientRect();

      // Check if image is visible on screen (with some buffer)
      const isVisible = rect.bottom > -100 && rect.top < viewportHeight + 100;

      if (isVisible) {
        const scale = calculateViewportScale(imageContainer);
        (imageContainer as HTMLElement).style.width = `${110 * scale}px`;
        (imageContainer as HTMLElement).style.height = `${138 * scale}px`;

        // Debug logging
        console.log("Image scale:", {
          top: rect.top,
          center: rect.top + rect.height / 2,
          viewportCenter: viewportHeight / 2,
          scrollTop: scrollTop,
          distance: Math.abs(rect.top + rect.height / 2 - viewportHeight / 2),
          scale: scale,
        });
      }
    });
  };

  // Create repeated media list for infinite scroll
  useEffect(() => {
    if (mediaList.length > 0) {
      // Repeat the media list 6 times
      const repeated = Array.from({ length: 6 }, () => mediaList).flat();
      setRepeatedMediaList(repeated);
    }
  }, [mediaList]);

  // Start scroll position at the beginning of 4th repetition
  useEffect(() => {
    if (scrollContainerRef.current && repeatedMediaList.length > 0) {
      setTimeout(() => {
        const container = containerRef.current;
        if (container) {
          const singleRepetitionHeight = container.scrollHeight / 6;
          const targetScrollTop = singleRepetitionHeight * 3;

          scrollContainerRef.current?.scrollTo({
            top: targetScrollTop,
            behavior: "instant",
          });
        }
      }, 100);
    }
  }, [repeatedMediaList]);

  useEffect(() => {
    // Use scroll event listener for continuous scaling updates
    const handleScroll = () => {
      console.log("Scroll event fired!");
      requestAnimationFrame(updateImageScales);

      // Check if we need to teleport (end or beginning reached)
      if (scrollContainer && !isScrollingUp.current) {
        const firstSlide = containerRef.current?.querySelector(
          ".image-container:first-child"
        ) as HTMLElement;
        const lastSlide = containerRef.current?.querySelector(
          ".image-container:last-child"
        ) as HTMLElement;

        if (firstSlide && lastSlide) {
          const firstSlideRect = firstSlide.getBoundingClientRect();
          const lastSlideRect = lastSlide.getBoundingClientRect();
          const viewportHeight = window.innerHeight;

          // Calculate the middle position (beginning of 4th repetition)
          const containerHeight = containerRef.current?.scrollHeight || 0;
          const singleRepetitionHeight = containerHeight / 6;
          const middlePosition = singleRepetitionHeight * 3;

          // If the last slide is entering the viewport (within 100px margin) - teleport to middle
          if (lastSlideRect.top <= viewportHeight + 100) {
            console.log("End reached, teleporting to middle...");
            isScrollingUp.current = true;

            scrollContainer.scrollTo({
              top: middlePosition,
              behavior: "instant",
            });

            setTimeout(() => {
              isScrollingUp.current = false;
            }, 1000);
          }

          // If the first slide is entering the viewport (within 100px margin) - teleport to middle
          if (firstSlideRect.bottom >= -100) {
            console.log("Beginning reached, teleporting to middle...");
            isScrollingUp.current = true;

            scrollContainer.scrollTo({
              top: middlePosition,
              behavior: "instant",
            });

            setTimeout(() => {
              isScrollingUp.current = false;
            }, 1000);
          }
        }
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, { passive: true });

      setTimeout(updateImageScales, 100);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [repeatedMediaList]); // Re-run when repeatedMediaList changes

  return (
    <div className="h-full w-screen">
      <div
        ref={scrollContainerRef}
        className="absolute bottom-0 h-dvh w-full overflow-y-auto sm:h-screen [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
      >
        <div ref={containerRef} className="flex flex-col items-center gap-2 py-[50vh]">
          {repeatedMediaList.map((media, index) => {
            const isImageLoaded = loadedImages.has(media._key);
            const priority = index < 5; // Load first 5 images eagerly

            return (
              <div
                key={`${media._key}-${index}`}
                className="image-container relative overflow-hidden rounded-[12px] transition-all duration-300 ease-out"
                style={{
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
            );
          })}
        </div>
      </div>
    </div>
  );
}
