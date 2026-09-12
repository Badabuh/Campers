"use client";
import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { CamperGalleryItem } from "@/types/camper";
import type { Swiper as SwiperInstance } from "swiper";
import styles from "./Gallery.module.css";

interface GalleryProps {
  images: CamperGalleryItem[];
  camperName: string;
}

export default function Gallery({ images, camperName }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);
  const swiperStyle = {
    "--swiper-navigation-color": "#fff",
    "--swiper-pagination-color": "#fff",
  } as CSSProperties;

  return (
    <>
      <Swiper
        style={swiperStyle}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.mainSwiper}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <Image
              loading="eager"
              src={image.original}
              alt={`${camperName} image`}
              width={638}
              height={505}
              className={styles.mainImage}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={32}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={styles.thumbsSwiper}
      >
        {images.map((image) => (
          <SwiperSlide key={`${image.id}-thumb`}>
            <Image
              loading="eager"
              src={image.thumb}
              alt={`${camperName} thumbnail`}
              width={136}
              height={144}
              className={styles.thumbImage}
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
