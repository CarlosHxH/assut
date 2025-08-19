"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface SlideItem {
  href: string;
  src: string;
  alt: string;
}

interface CarouselProps {
  slides: SlideItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  autoPlay = false,
  autoPlayInterval = 5000,
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (autoPlay && slides.length > 1) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div className={`relative w-full ${className}`}>
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {slides.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              width={500}
              height={500}
              src={item.src}
              alt={item.alt}
              className="absolute top-1/2 left-1/2 block h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
            />
          </div>
        ))}
      </div>

      {/* Slider controls */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            onClick={prevSlide}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
              <svg
                className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>

          <button
            type="button"
            className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
            onClick={nextSlide}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white group-focus:outline-none dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
              <svg
                className="h-4 w-4 text-white rtl:rotate-180 dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`h-3 w-3 rounded-full ${
                  index === currentSlide
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/80"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Carousel;
