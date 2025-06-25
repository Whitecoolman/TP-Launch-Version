import React from 'react';
import { X, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-4xl z-10 p-0 overflow-hidden">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-white bg-black/50 hover:bg-black/70 
                     rounded-lg transition-all duration-300 z-20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Video Section */}
          <div className="aspect-video w-full bg-dark-200">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/9lcN3HTrt-U?autoplay=1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Stats & CTA Section */}
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="glass-panel rounded-xl p-3 md:p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-emerald-400 mb-1">+312%</div>
              <div className="text-xs md:text-sm text-gray-400">Avg. Monthly Returns</div>
            </div>
            <div className="glass-panel rounded-xl p-3 md:p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-white mb-1">50K+</div>
              <div className="text-xs md:text-sm text-gray-400">Active Traders</div>
            </div>
            <div className="glass-panel rounded-xl p-3 md:p-4 text-center">
              <div className="text-xl md:text-2xl font-bold text-accent mb-1">0.04s</div>
              <div className="text-xs md:text-sm text-gray-400">Execution Speed</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <img
                    key={i}
                    src={`https://images.unsplash.com/photo-${i === 1 ? '1560250097-0b93528c311a' : 
                          i === 2 ? '1573497019940-1c28c88b4f3e' : 
                          '1566492031773-4f4e44671857'}?auto=format&fit=crop&w=32&h=32`}
                    alt={`Trader ${i}`}
                    className="w-8 h-8 rounded-full border-2 border-dark"
                  />
                ))}
              </div>
              <div className="text-xs md:text-sm text-gray-400">
                Join thousands of profitable traders
              </div>
            </div>
            <a 
              href="#pricing"
              className="premium-button px-4 md:px-6 py-2 md:py-3 flex items-center"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}