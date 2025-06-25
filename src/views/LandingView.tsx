import React, { useState } from 'react';
import HeroSection from '../components/landing/HeroSection';
import LiveProfitsSection from '../components/landing/LiveProfitsSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import PricingPlans from '../components/landing/PricingPlans';
import WebhookStatsSection from '../components/landing/WebhookStatsSection';
import LeaderboardSection from '../components/landing/LeaderboardSection';
import FaqSection from '../components/landing/FaqSection';
import FinalCTA from '../components/landing/FinalCTA';
import Footer from '../components/landing/Footer';
import DemoModal from '../components/landing/DemoModal';

const liveStats = [
  {
    id: 1,
    trader: "Chrisp Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 1250.50,
    symbol: "EURUSD",
    type: "buy",
    time: "2 minutes ago"
  },
  {
    id: 2,
    trader: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 3450.75,
    symbol: "XAUUSD",
    type: "sell",
    time: "5 minutes ago"
  },
  {
    id: 3,
    trader: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 890.25,
    symbol: "BTCUSD",
    type: "buy",
    time: "8 minutes ago"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Professional Trader",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150",
    content: "AutomatedTrader transformed my trading strategy. The webhook integration is flawless, and I've seen a 45% increase in my win rate since using it.",
    stats: {
      profit: "+62.5%",
      trades: "1,234",
      period: "3 months"
    }
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Crypto Analyst",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
    content: "The risk management features are outstanding. I can trade with confidence knowing my positions are protected by advanced automation.",
    stats: {
      profit: "+89.3%",
      trades: "2,156",
      period: "6 months"
    }
  },
  {
    id: 3,
    name: "David Park",
    role: "Fund Manager",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150",
    content: "As a fund manager, reliability is crucial. AutomatedTrader's 99.9% uptime and lightning-fast execution give me peace of mind.",
    stats: {
      profit: "+127.8%",
      trades: "5,678",
      period: "12 months"
    }
  }
];

const socialProof = {
  tradingVolume: "$2.8B+",
  activeUsers: "50K+",
  successRate: "92.3%",
  uptime: "99.9%"
};

export default function LandingView() {
  const [showDemoModal, setShowDemoModal] = useState(false);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      <HeroSection onWatchDemo={() => setShowDemoModal(true)} />
      <LiveProfitsSection stats={liveStats} />
      <WebhookStatsSection />
      <LeaderboardSection />
      <TestimonialsSection testimonials={testimonials} />
      <FeaturesSection />
      <PricingPlans />
      <FaqSection />
      <FinalCTA socialProof={socialProof} />
      <Footer />

      <DemoModal 
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
    </div>
  );
}