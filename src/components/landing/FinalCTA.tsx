import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SocialProof {
  tradingVolume: string;
  activeUsers: string;
  successRate: string;
  uptime: string;
}

interface FinalCTAProps {
  socialProof: SocialProof;
}

export default function FinalCTA({ socialProof }: FinalCTAProps) {
  return (
    <div className="py-12 md:py-20 relative overflow-hidden bg-gradient-to-b from-dark-100/30 to-dark">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.15),transparent_50%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-shadow-glow">
          Ready to Transform Your Trading?
        </h2>
        <p className="text-base md:text-xl text-gray-400 mb-6 md:mb-8 max-w-2xl mx-auto">
          Join thousands of traders already using AutomatedTrader to achieve consistent profits
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
          <a 
            href="#pricing" 
            className="w-full sm:w-auto premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 px-4 md:px-8 py-2 md:py-4 text-sm md:text-lg flex items-center justify-center shadow-lg shadow-accent/10"
          >
            Get Started Now
            <ArrowRight className="ml-1.5 md:ml-2 h-4 w-4 md:h-5 md:w-5" />
          </a>
          <a 
            href="https://discord.gg/RU5t7ErGEE" 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 md:px-8 py-2 md:py-4 text-sm md:text-lg border border-accent/30 text-accent rounded-lg
                     hover:bg-accent/10 transition-all duration-300 flex items-center justify-center"
          >
            Schedule Demo
          </a>
        </div>
        <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-white">{socialProof.tradingVolume}</div>
            <div className="text-xs md:text-sm text-gray-400">Trading Volume</div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-white">{socialProof.activeUsers}</div>
            <div className="text-xs md:text-sm text-gray-400">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-white">{socialProof.successRate}</div>
            <div className="text-xs md:text-sm text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-lg md:text-2xl font-bold text-white">{socialProof.uptime}</div>
            <div className="text-xs md:text-sm text-gray-400">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
}