import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialStats {
  profit: string;
  trades: string;
  period: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  stats: TestimonialStats;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    } else if (isRightSwipe) {
      setActiveTestimonial((prev) => 
        prev === 0 ? testimonials.length - 1 : prev - 1
      );
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="py-16 md:py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by Top Traders
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            See what professional traders are saying about our platform
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-center">
            <button 
              onClick={() => setActiveTestimonial((prev) => 
                prev === 0 ? testimonials.length - 1 : prev - 1
              )}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                       rounded-lg transition-all absolute left-0 md:left-4 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div 
              className="glass-panel rounded-xl p-4 md:p-8 max-w-4xl mx-4 md:mx-16"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].name}
                  className="w-20 h-20 rounded-full border-2 border-accent/20 mx-auto md:mx-0"
                />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-xl font-medium text-white text-center md:text-left">
                        {testimonials[activeTestimonial].name}
                      </h3>
                      <p className="text-accent text-center md:text-left">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                    <Quote className="h-8 w-8 text-accent/20 hidden md:block" />
                  </div>
                  <p className="text-gray-300 mt-4 text-lg text-center md:text-left">
                    {testimonials[activeTestimonial].content}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-dark-300/30">
                    <div>
                      <div className="text-emerald-400 font-medium text-lg">
                        {testimonials[activeTestimonial].stats.profit}
                      </div>
                      <div className="text-gray-400 text-sm">Total Profit</div>
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">
                        {testimonials[activeTestimonial].stats.trades}
                      </div>
                      <div className="text-gray-400 text-sm">Total Trades</div>
                    </div>
                    <div>
                      <div className="text-white font-medium text-lg">
                        {testimonials[activeTestimonial].stats.period}
                      </div>
                      <div className="text-gray-400 text-sm">Time Period</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setActiveTestimonial((prev) => 
                (prev + 1) % testimonials.length
              )}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                       rounded-lg transition-all absolute right-0 md:right-4 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeTestimonial 
                    ? 'bg-accent w-6' 
                    : 'bg-dark-300 hover:bg-dark-200'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}