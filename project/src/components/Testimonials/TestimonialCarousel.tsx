import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Testimonial } from '../../types/testimonial';
import TestimonialCard from './TestimonialCard';
import useWindowSize from '../../hooks/useWindowSize';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const next = () => {
    setCurrentIndex((current) => 
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const prev = () => {
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  if (!testimonials.length) return null;

  return (
    <div className="relative w-full px-4 md:px-0">
  <div className="overflow-hidden mx-auto">
    <div className="relative flex items-center justify-center">
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`w-full min-w-full transition-all duration-500 px-0.001 ${
              isMobile
                ? 'scale-90'
                : index === currentIndex
                ? 'scale-100 opacity-90'
                : 'scale-80 opacity-45'
            }`}
          >
            <div className="max-w-sm mx-auto">
              <TestimonialCard {...testimonial} />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  {testimonials.length > 1 && (
    <>
      <button
        onClick={prev}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 bg-white p-2 md:p-3 
          rounded-full shadow-lg hover:bg-gray-50 transition-colors z-20"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#F1003E]" />
      </button>
      <button
        onClick={next}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 bg-white p-2 md:p-3 
          rounded-full shadow-lg hover:bg-gray-50 transition-colors z-20"
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#F1003E]" />
      </button>
    </>
  )}

  <div className="flex justify-center gap-2 mt-6">
    {testimonials.map((_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index)}
        className={`w-2 h-2 rounded-full transition-all ${
          index === currentIndex 
            ? 'bg-white w-6' 
            : 'bg-white/50 hover:bg-white/70'
        }`}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ))}
  </div>
</div>

  );
}