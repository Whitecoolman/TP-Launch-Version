import React, { useState, useEffect } from 'react';
import { 
  Award, ArrowRight, Star, Shield, Users, Clock, Bot, 
  DollarSign, Zap, TrendingUp, ChevronRight, Play
} from 'lucide-react';

const tradingStats = [
  { value: "0.04s", label: "Execution Speed", change: "Industry leading" },
  { value: "50K+", label: "Active Traders", change: "+8.3% this month" },
  { value: "92.3%", label: "Success Rate", change: "+5.2% this month" },
  { value: "99.9%", label: "Uptime", change: "Enterprise grade" }
];

const liveUpdates = [
  { profit: 1250.50, trader: "Alex Trading", time: "2 minutes ago", type: "buy" },
  { profit: 890.25, trader: "Pro Signals", time: "5 minutes ago", type: "sell" },
  { profit: 450.75, trader: "Master Trader", time: "8 minutes ago", type: "buy" }
];

// Rotating text phrases
const rotatingPhrases = [
  "Automate Your Tradingview",
  "Copy Top Traders Instantly",
  "Turn TradingView Alerts into Real Orders",
  "Connect Directly to MT4, MT5, TradeLocker Hankox & More",
  "Plug-and-Play Automation Starts Now"
];

interface HeroSectionProps {
  onWatchDemo?: () => void;
}

export default function HeroSection({ onWatchDemo }: HeroSectionProps) {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % liveUpdates.length);
    }, 3000);
    
    // Rotate through phrases
    const phraseInterval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % rotatingPhrases.length);
        setIsChanging(false);
      }, 500); // Wait for fade out before changing text
    }, 4000);
    
    return () => {
      clearInterval(updateInterval);
      clearInterval(phraseInterval);
    };
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/80 to-dark"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,122,255,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)]"></div>
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-accent/30 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-[128px] animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 md:py-20 w-full">
        {/* Top Badge */}
        <div className="flex justify-center mb-4 md:mb-8 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 text-accent
                        border border-accent/20 backdrop-blur-sm">
            <Award className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
            <span className="text-xs md:text-sm">Ranked #1 Trading Automation Platform</span>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <img 
            src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp" 
            alt="Automated Trader" 
            className="h-12 md:h-16 object-contain"
          />
        </div>

        {/* Main Heading */}
        <div className="text-center mb-6 md:mb-12 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-6 tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-accent via-purple-500 to-accent 
                           bg-clip-text text-transparent animate-gradient-x">
              {rotatingPhrases[currentPhrase]}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Connect TradingView to automated execution in 5 minutes. Join 50,000+ traders achieving{' '}
            <span className="text-emerald-400 font-semibold">312% higher returns</span> with our advanced platform.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8 md:mb-16
                      animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <a 
            href="#pricing"
            className="w-full sm:w-auto group px-4 md:px-8 py-2.5 md:py-4 bg-accent hover:bg-accent-dark text-white rounded-xl
                     flex items-center justify-center space-x-2 transition-all duration-300
                     transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-accent/20"
          >
            <span className="text-base md:text-lg font-medium">Get Started</span>
            <ChevronRight className="h-4 w-4 md:h-5 md:w-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
          
          <button 
            onClick={onWatchDemo}
            className="w-full sm:w-auto px-4 md:px-8 py-2.5 md:py-4 border-2 border-accent/30 text-accent rounded-xl
                     hover:bg-accent/10 transition-all duration-300 text-base md:text-lg font-medium
                     transform hover:translate-y-[-2px] flex items-center justify-center"
          >
            <Play className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Watch Demo
          </button>
        </div>

        {/* Live Updates */}
        <div className="max-w-lg mx-auto mb-8 md:mb-16 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
          <div className="glass-panel rounded-xl p-3 md:p-4 border border-accent/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-xs md:text-sm text-emerald-400">Live Updates</span>
              </div>
              <span className="text-xs md:text-sm text-gray-400">{liveUpdates[currentUpdate].time}</span>
            </div>
            <div className="mt-1 md:mt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-white">{liveUpdates[currentUpdate].trader}</span>
                <span className="text-xs md:text-sm text-emerald-400">+${liveUpdates[currentUpdate].profit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          {tradingStats.map((stat, index) => (
            <div key={index} className="glass-panel rounded-xl p-3 md:p-6 text-center
                                    transform hover:scale-105 transition-all duration-300">
              <div className="text-lg md:text-3xl font-bold text-white mb-1 md:mb-2">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              <div className="text-[10px] md:text-xs text-accent mt-1 md:mt-2">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-8 mt-8 md:mt-16 text-xs md:text-sm text-gray-400
                      animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-400" />
            <span>4.9/5 Rating (10K+ Reviews)</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Shield className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
            <span>Bank-Grade Security</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Clock className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            <span>5-Min Setup</span>
          </div>
        </div>
      </div>
    </div>
  );
}