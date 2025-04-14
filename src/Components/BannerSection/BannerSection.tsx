import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import BannerOne from '../../assets/Banners/Banner1.png';
import BannerTwo from '../../assets/Banners/Banner2.png';

const slides = [BannerOne, BannerTwo, BannerOne];

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
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  return (
    <div className="m-5 relative">
      {/* Embla Carousel */}
      <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="embla__container flex gap-4">
          {slides.map((imgSrc, index) => (
            <div
              key={index}
              className="embla__slide min-w-[80%] h-70 flex items-center justify-center rounded-lg overflow-hidden relative"
            >
              <img src={imgSrc} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" />
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
              index === selectedIndex ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
