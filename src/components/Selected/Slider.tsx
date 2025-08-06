"use client";

import Image from "next/image";
import { urlFor } from "@/sanity/urlFor";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";

export default function Slider({
  mediaList,
  showThumbnails = true,
  initialImageIndex,
}: {
  mediaList: any[];
  showThumbnails?: boolean;
  initialImageIndex?: string | string[] | undefined;
}) {
  const [loading, setLoading] = useState(false);
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const [showMain, setShowMain] = useState<boolean>(false);
  const swiperRef = useRef<any>(null);

  const animationRef = useRef<GSAPTimeline | null>(null);

  useEffect(() => {
    if (initialImageIndex && swiperRef.current) {
      setLoading(true);
      const i = parseInt(initialImageIndex as string) % mediaList.length;

      if (i) {
        swiperRef.current.slideToLoop(i - 1);
        setCenterIndex(swiperRef.current.realIndex);
      } else {
        console.warn("No slide found with the provided initialImageIndex");
      }
      setLoading(false);
    }
  }, [mediaList, initialImageIndex]);

  useGSAP(
    () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.timeline({
        defaults: { ease: "power3.inOut" },
      });

      animationRef.current
        .to("#center", {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            setLoading(true);
          },
        })
        .call(() => {
          setCenterIndex(swiperRef.current.realIndex);
        })
        .to(
          "#center",
          {
            opacity: 1,
            duration: 0.4,
            delay: 0.3,
            onStart: () => {
              setLoading(false);
            },
          },
          ">"
        );
    },
    { dependencies: [swiperRef.current?.realIndex] }
  );

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  const handleSlideChangeTransitionStart = () => {
    setTimeout(() => {
      swiperRef.current.animating = false;
    }, 0);
  };

  return (
    <div className={`flex h-full w-full ${!showThumbnails && "opacity-0"}`}>
      <div id="center" className="absolute top-0 ml-[133px] flex h-screen select-none">
        {centerIndex !== undefined && !loading && (
          <>
            <Image
              src={urlFor(mediaList[centerIndex % mediaList.length])
                .height(800)
                .url()}
              alt=""
              width={"0"}
              height={"0"}
              sizes="500px"
              className={`my-auto h-auto w-[40vw] transition-opacity duration-500 ${showMain ? "opacity-100" : "opacity-0"}`}
            />
          </>
        )}
      </div>

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
        // centeredSlides={true}
        direction="vertical"
      >
        {mediaList.map((media, i) => (
          <SwiperSlide
            key={media._key}
            data-key={media._key}
            className="mt-auto !h-max select-none"
            onMouseEnter={() => {
              setShowMain(true);
              if (swiperRef.current) {
                setCenterIndex(i);
              }
            }}
            onMouseLeave={() => setShowMain(false)}
            onClick={() => {
              //   if (swiperRef.current) {
              // swiperRef.current.slideTo(i);
              // const wheelEvent = new WheelEvent("wheel", {
              //   deltaY: 1,
              //   bubbles: true,
              // });
              // setTimeout(() => {
              //   window.dispatchEvent(wheelEvent);
              //   window.dispatchEvent(wheelEvent);
              //   window.dispatchEvent(wheelEvent);
              // }, 250);
              //   }
            }}
          >
            <div
              className={`relative h-[80px] w-[100px] overflow-hidden rounded-[12px] transition-opacity duration-300 hover:cursor-pointer hover:opacity-100 sm:w-[6.66vw] ${i === centerIndex % mediaList.length ? "opacity-100" : "opacity-100"} `}
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
        ))}
      </Swiper>
    </div>
  );
}
