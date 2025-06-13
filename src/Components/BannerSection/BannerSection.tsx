import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import BannerOne from "../../assets/Banners/desktop/Banner1.png";
import BannerTwo from "../../assets/Banners/desktop/Banner2.png";

import BannerOneMob from "../../assets/Banners/mobile/Banner1.png";
import BannerTwoMob from "../../assets/Banners/mobile/Banner2.png";

const desktopSlides = [BannerOne, BannerTwo, BannerOne];
const mobileSlides = [BannerOneMob, BannerTwoMob, BannerOneMob];

export const BannerSection: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();

    // Fix: Only trigger scrollNext autoplay if there are more than 1 slide for the current device
    let intervalId: ReturnType<typeof setInterval>;
    const isMobile = window.innerWidth < 768;
    const slidesCount = isMobile ? mobileSlides.length : desktopSlides.length;
    if (emblaApi.scrollNext && slidesCount > 1) {
      intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 2000);
    }
    // Cleanup interval on unmount or emblaApi change
    return () => clearInterval(intervalId);
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <div className="relative">
      {/* Embla Carousel */}
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="hidden gap-4 md:flex">
          {desktopSlides.map((imgSrc, index) => (
            <div
              key={index}
              className="embla__slide h-auto flex items-center justify-center rounded-lg overflow-hidden relative"
            >
              <img
                src={imgSrc}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-contain bg-red-400"
              />
            </div>
          ))}
        </div>

        <div className="gap-4 flex md:hidden">
          {mobileSlides.map((imgSrc, index) => (
            <div
              key={index}
              className="embla__slide h-auto flex items-center justify-center rounded-lg overflow-hidden relative"
            >
              <img
                src={imgSrc}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-contain bg-red-400"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-3 w-3 rounded-full transition-all ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
