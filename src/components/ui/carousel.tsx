"use client";

import React, { ReactNode, createContext, useContext, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel';
import { cn } from '@/lib/utils';

interface CarouselContextType {
  embla: EmblaCarouselType | undefined;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  selectedIndex: number;
  scrollSnaps: number[];
  scrollTo: (index: number) => void;
}

const CarouselContext = createContext<CarouselContextType | null>(null);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within a Carousel component');
  }
  return context;
};

interface CarouselProps {
  children: ReactNode;
  options?: EmblaOptionsType;
  className?: string;
}

const Carousel = ({ children, options = {}, className }: CarouselProps) => {
  const [emblaRef, embla] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const scrollTo = useCallback((index: number) => {
    if (embla) embla.scrollTo(index);
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;

    setScrollSnaps(embla.scrollSnapList());
    embla.on('select', onSelect);
    embla.on('reInit', onSelect);
    onSelect();

    return () => {
      embla.off('select', onSelect);
      embla.off('reInit', onSelect);
    };
  }, [embla, onSelect]);

  const contextValue: CarouselContextType = {
    embla,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
    selectedIndex,
    scrollSnaps,
    scrollTo,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div className={cn('relative', className)} ref={emblaRef}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

interface SliderContainerProps {
  children: ReactNode;
  className?: string;
}

const SliderContainer = ({ children, className }: SliderContainerProps) => {
  return (
    <div className={cn('overflow-hidden', className)}>
      <div className={cn('flex', className)}>
        {children}
      </div>
    </div>
  );
};

interface SliderProps {
  children: ReactNode;
  className?: string;
}

const Slider = ({ children, className }: SliderProps) => {
  return (
    <div className={cn('flex-[0_0_auto] min-w-0', className)}>
      {children}
    </div>
  );
};

interface SliderButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const SliderPrevButton = ({ children, className, onClick }: SliderButtonProps) => {
  const { scrollPrev, canScrollPrev } = useCarousel();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      scrollPrev();
    }
  };

  return (
    <button
      className={cn(className)}
      onClick={handleClick}
      disabled={!canScrollPrev}
      type="button"
    >
      {children}
    </button>
  );
};

const SliderNextButton = ({ children, className, onClick }: SliderButtonProps) => {
  const { scrollNext, canScrollNext } = useCarousel();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      scrollNext();
    }
  };

  return (
    <button
      className={cn(className)}
      onClick={handleClick}
      disabled={!canScrollNext}
      type="button"
    >
      {children}
    </button>
  );
};

interface SliderDotButtonProps {
  className?: string;
}

const SliderDotButton = ({ className }: SliderDotButtonProps) => {
  const { scrollSnaps, selectedIndex, scrollTo } = useCarousel();

  return (
    <div className={cn('flex space-x-2', className)}>
      {scrollSnaps.map((_, index) => (
        <button
          key={index}
          className={cn(
            'w-3 h-3 rounded-full transition-all duration-200',
            index === selectedIndex
              ? 'bg-gradient-to-r from-blue-500 to-purple-600'
              : 'bg-white/30 hover:bg-white/50'
          )}
          onClick={() => scrollTo(index)}
          type="button"
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default Carousel;
export {
  Slider,
  SliderContainer,
  SliderDotButton,
  SliderNextButton,
  SliderPrevButton,
  useCarousel,
}; 