import React, { useState, useEffect } from 'react';
import { X, Briefcase, Gift, Crown } from 'lucide-react';

interface PromoItem {
  id: string;
  title: string;
  description: string;
  linkUrl: string;
  backgroundColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
  ctaText?: string;
  badge?: string;
}

interface PromoSectionProps {
  className?: string;
}

export default function PromoSection({ className = '' }: PromoSectionProps) {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Sample ads data for partner sites
  const promos: PromoItem[] = [
    {
      id: 'hankox',
      title: 'Join Hankox ActTrader',
      description: 'Professional multi-broker trading solution with unlimited accounts',
      linkUrl: 'https://hankox.com',
      backgroundColor: 'from-blue-500/20 to-blue-600/5',
      textColor: 'text-blue-400',
      icon: <Briefcase className="h-5 w-5" />,
      ctaText: 'Create Account',
      badge: 'Exclusive Partner'
    },
    {
      id: 'referral',
      title: 'Refer a Friend',
      description: 'Earn 30% commission on all referrals',
      linkUrl: 'https://whop.com/checkout/plan_cnHYK4yFNvyUu',
      backgroundColor: 'from-emerald-500/20 to-emerald-600/5',
      textColor: 'text-emerald-400',
      icon: <Gift className="h-5 w-5" />,
      ctaText: 'Invite Friends',
      badge: 'Earn 30%'
    },
    {
      id: 'lifetime',
      title: 'Lifetime Access - Limited Time Offer',
      description: 'One-time payment. Unlimited webhooks. Unlimited Hankox ActTrader accounts.',
      linkUrl: 'https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true',
      backgroundColor: 'from-red-500/20 to-red-600/5',
      textColor: 'text-red-400',
      icon: <Crown className="h-5 w-5" />,
      ctaText: 'Get Lifetime Access',
      badge: 'Limited Offer'
    }
  ];

  // Rotate ads every 8 seconds
  useEffect(() => {
    if (dismissed || promos.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % promos.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [dismissed, promos.length]);

  if (dismissed || promos.length === 0) return null;

  const currentPromo = promos[currentAdIndex];

  return (
    <div className={`glass-panel rounded-xl overflow-hidden border border-dark-300/30 hover:border-accent/20 transition-all duration-300 mb-4 shadow-lg ${className}`}>
      <div className={`relative bg-gradient-to-br ${currentPromo.backgroundColor || 'from-dark-200/20 to-dark-200/5'}`}>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-3 p-1.5 bg-black/30 text-white rounded-lg hover:bg-black/50 transition-colors z-10"
          aria-label="Close promo"
        >
          <X className="h-3 w-3" />
        </button>
        
        <div className="relative flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-dark-100/30 backdrop-blur-sm rounded-lg">
              {currentPromo.icon}
            </div>
            <div>
              <h3 className="text-base md:text-lg font-medium text-white">{currentPromo.title}</h3>
              <p className="text-xs md:text-sm text-gray-300">{currentPromo.description}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block px-3 py-1 rounded-full bg-dark-100/30 text-xs text-blue-400 border border-blue-500/20">
              {currentPromo.badge}
            </div>
            <a 
              href={currentPromo.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all bg-blue-500 hover:bg-blue-600 text-white flex items-center"
            >
              {currentPromo.ctaText || 'Learn More'}
              <svg className="ml-1.5 h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
        
        <div className="flex justify-center py-1.5 bg-black/20">
          {promos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentAdIndex(index)}
              className={`w-1.5 h-1.5 mx-0.5 rounded-full transition-all ${
                index === currentAdIndex ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}