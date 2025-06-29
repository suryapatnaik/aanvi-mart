import React, { useState, useEffect } from "react";
import SectionTitle from "../SectionTitle";
import StarRating from "../StarRating";
import { Testimonial } from "../../utils/mockData";

interface TestimonialsProps {
  title?: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoScrollInterval?: number; // in milliseconds
}

const Testimonials: React.FC<TestimonialsProps> = ({
  title = "What Our Customers Say",
  subtitle = "Real feedback from our valued customers",
  testimonials,
  autoScrollInterval = 4000, // 4 seconds default
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [autoScrollInterval, testimonials.length]);

  // Pause auto-scroll when user interacts
  const handleUserInteraction = () => {
    // Reset the interval when user manually navigates
    const event = new Event('userInteraction');
    window.dispatchEvent(event);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Get testimonials to show based on current index and screen size
  const getVisibleTestimonials = () => {
    let visibleCount = 1; // Default for mobile
    
    if (window.innerWidth >= 1024) {
      visibleCount = 3; // Large screens
    } else if (window.innerWidth >= 768) {
      visibleCount = 2; // Medium screens
    }
    
    const testimonialsToShow = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      testimonialsToShow.push(testimonials[index]);
    }
    
    return testimonialsToShow;
  };

  const renderTestimonialCard = (testimonial: Testimonial, index: number) => (
    <div
      key={`${testimonial.id}-${index}`}
      className="bg-amber-50 rounded-xl p-4 sm:p-6 shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-500 transform hover:scale-105"
    >
      {/* First Name */}
      <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3 sm:mb-4">
        {testimonial.name}
      </h4>
      
      {/* Review */}
      <blockquote className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4">
        "{testimonial.comment}"
      </blockquote>
      
      {/* Stars and Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <StarRating rating={testimonial.rating} size="sm" />
          <span className="text-xs sm:text-sm text-gray-600 ml-2">
            {testimonial.rating}/5
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {formatDate(testimonial.date)}
        </span>
      </div>
    </div>
  );

  return (
    <section className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8">
      <SectionTitle title={title} subtitle={subtitle} />
      
      {/* Desktop/Tablet Carousel View */}
      <div className="hidden sm:block">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => {
              prevTestimonial();
              handleUserInteraction();
            }}
            className="flex-shrink-0 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Carousel Container */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {getVisibleTestimonials().map((testimonial, idx) => 
                renderTestimonialCard(testimonial, currentIndex + idx)
              )}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-4 sm:mt-6 gap-1 sm:gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index);
                    handleUserInteraction();
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => {
              nextTestimonial();
              handleUserInteraction();
            }}
            className="flex-shrink-0 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Carousel View */}
      <div className="sm:hidden">
        <div className="relative">
          <div className="bg-amber-50 rounded-xl p-4 sm:p-6 shadow-lg border border-amber-100">
            {/* First Name */}
            <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-3 sm:mb-4">
              {testimonials[currentIndex].name}
            </h4>
            
            {/* Review */}
            <blockquote className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
              "{testimonials[currentIndex].comment}"
            </blockquote>
            
            {/* Stars and Date */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <StarRating rating={testimonials[currentIndex].rating} size="sm" />
                <span className="text-xs sm:text-sm text-gray-600 ml-2">
                  {testimonials[currentIndex].rating}/5
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {formatDate(testimonials[currentIndex].date)}
              </span>
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-4 gap-1 sm:gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  handleUserInteraction();
                }}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                prevTestimonial();
                handleUserInteraction();
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <span className="text-xs sm:text-sm text-gray-600">
              {currentIndex + 1} of {testimonials.length}
            </span>
            
            <button
              onClick={() => {
                nextTestimonial();
                handleUserInteraction();
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 