import React, { useState } from 'react';
import { Trophy, TrendingUp, Users, Star, ArrowRight, DollarSign, Clock, BarChart2, Target, ArrowUpRight, Sparkles, Crown, Shield, Zap, Award } from 'lucide-react';

interface Trader {
  id: string;
  name: string;
  avatar: string;
  profit: number;
  winRate: number;
  trades: number;
  followers: number;
  monthlyReturn: number;
  averageTrade: number;
  tradingTime: string;
  verified: boolean;
}

const topTraders: Trader[] = [
  {
    id: '1',
    name: "Alex Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 892450.50,
    winRate: 92.5,
    trades: 1234,
    followers: 892,
    monthlyReturn: 45.8,
    averageTrade: 725.65,
    tradingTime: "2 years",
    verified: true
  },
  {
    id: '2',
    name: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 654320.75,
    winRate: 88.3,
    trades: 856,
    followers: 654,
    monthlyReturn: 38.2,
    averageTrade: 764.39,
    tradingTime: "1.5 years",
    verified: true
  },
  {
    id: '3',
    name: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 1245680.25,
    winRate: 95.1,
    trades: 2341,
    followers: 1243,
    monthlyReturn: 52.4,
    averageTrade: 532.11,
    tradingTime: "3 years",
    verified: true
  }
];

export default function LeaderboardSection() {
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);

  return (
    <div className="py-16 md:py-20 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/10 to-dark/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.15),transparent_50%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 text-accent mb-4 md:mb-8
                        border border-accent/20 backdrop-blur-sm">
            <Trophy className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
            <span className="text-xs md:text-base">Top Performing Traders</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-shadow-glow">
            Copy the <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent animate-gradient-x">Best Traders</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            Follow and automatically copy trades from our top-performing traders
          </p>
        </div>

        {/* Lifetime Access Coming Soon Banner */}
        <div className="glass-panel rounded-xl p-4 md:p-6 mb-8 md:mb-12 border border-red-500/30 bg-gradient-to-r from-red-500/10 to-red-600/5 box-shadow-glow">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Crown className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg md:text-xl font-bold text-white">Lifetime Members</h3>
                  <div className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">Coming Soon</div>
                </div>
                <p className="text-sm md:text-base text-gray-300">
                  Lifetime members will get first access to our copy trading platform
                </p>
              </div>
            </div>
            <a 
              href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-4 py-2 text-sm md:text-base flex items-center whitespace-nowrap shadow-lg shadow-red-500/20"
            >
              Get Lifetime Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {topTraders.map((trader, index) => (
            <div 
              key={trader.id}
              className={`glass-panel rounded-xl p-4 md:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10 border border-dark-300/30 hover:border-accent/30 ${
                selectedTrader?.id === trader.id ? 'border-2 border-accent' : ''
              }`}
              onClick={() => setSelectedTrader(trader)}
            >
              {/* Rank Badge */}
              <div className="absolute -top-3 -right-3">
                <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${
                  index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-black' :
                  index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-black' :
                  index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' :
                  'bg-dark-300 text-gray-400'
                }`}>
                  #{index + 1}
                </div>
              </div>

              {/* Trader Info */}
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="relative">
                    <img
                      src={trader.avatar}
                      alt={trader.name}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-accent/20"
                    />
                    {trader.verified && (
                      <div className="absolute -top-1 -right-1 bg-accent rounded-full p-0.5">
                        <Sparkles className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base md:text-lg font-medium text-white">{trader.name}</h3>
                      <div className="flex items-center space-x-1 text-yellow-400">
                        <Star className="h-3.5 w-3.5 md:h-4 md:w-4 fill-current" />
                        <span className="text-xs md:text-sm">{trader.winRate}%</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex items-center text-emerald-400 text-xs md:text-sm">
                        <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1" />
                        <span>+{trader.monthlyReturn}%</span>
                      </div>
                      <span className="text-gray-400 text-xs">•</span>
                      <div className="flex items-center text-gray-400 text-xs md:text-sm">
                        <Users className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1" />
                        <span>{trader.followers.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Chart */}
              <div className="h-20 md:h-24 mb-4 md:mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-accent/5 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 w-full h-px bg-accent/20"></div>
                <div className="absolute left-0 top-0 h-full w-px bg-accent/20"></div>
                
                {/* Simulated chart line */}
                <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <path 
                    d="M0,35 C10,32 20,28 30,25 C40,22 50,15 60,18 C70,21 80,10 90,5 L100,2" 
                    fill="none" 
                    stroke="url(#lineGradient)" 
                    strokeWidth="2"
                    className="drop-shadow-[0_0_3px_rgba(0,122,255,0.5)]"
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#007AFF" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="glass-panel rounded-lg p-2 md:p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                  <div className="flex items-center space-x-1.5 md:space-x-2 text-gray-400 text-xs mb-1">
                    <BarChart2 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span>Total Trades</span>
                  </div>
                  <div className="text-sm md:text-lg font-medium text-white">{trader.trades.toLocaleString()}</div>
                </div>
                <div className="glass-panel rounded-lg p-2 md:p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                  <div className="flex items-center space-x-1.5 md:space-x-2 text-gray-400 text-xs mb-1">
                    <Target className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span>Win Rate</span>
                  </div>
                  <div className="text-sm md:text-lg font-medium text-white">{trader.winRate}%</div>
                </div>
              </div>

              {/* Assets */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                {['EURUSD', 'GBPUSD', 'XAUUSD'].map((asset) => (
                  <span 
                    key={asset}
                    className="px-1.5 py-0.5 md:px-2 md:py-1 text-[10px] md:text-xs rounded-lg bg-dark-200/50 text-gray-300 border border-dark-300/30"
                  >
                    {asset}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 md:space-x-2">
                  <DollarSign className="h-3.5 w-3.5 md:h-4 md:w-4 text-gray-400" />
                  <span className="text-xs md:text-sm text-gray-300">
                    ${index === 0 ? '49.99' : index === 1 ? '39.99' : '59.99'}/m
                  </span>
                </div>
                <a 
                  href="#pricing"
                  className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm flex items-center shadow-md shadow-accent/10"
                >
                  Copy Trader
                  <ArrowUpRight className="ml-1.5 md:ml-2 h-3.5 w-3.5 md:h-4 md:w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-8 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <div className="glass-panel rounded-xl p-3 md:p-6 text-center bg-gradient-to-br from-dark-200/30 to-dark-200/5 hover:from-dark-200/40 hover:to-dark-200/10 transition-all duration-300 border border-dark-300/30 hover:border-accent/20 transform hover:scale-105">
            <DollarSign className="h-5 w-5 md:h-8 md:w-8 text-accent mx-auto mb-2 md:mb-4" />
            <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">$4.8M+</div>
            <div className="text-xs md:text-sm text-gray-400">Total Profit Copied</div>
          </div>
          <div className="glass-panel rounded-xl p-3 md:p-6 text-center bg-gradient-to-br from-dark-200/30 to-dark-200/5 hover:from-dark-200/40 hover:to-dark-200/10 transition-all duration-300 border border-dark-300/30 hover:border-accent/20 transform hover:scale-105">
            <Users className="h-5 w-5 md:h-8 md:w-8 text-accent mx-auto mb-2 md:mb-4" />
            <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">15K+</div>
            <div className="text-xs md:text-sm text-gray-400">Active Copiers</div>
          </div>
          <div className="glass-panel rounded-xl p-3 md:p-6 text-center bg-gradient-to-br from-dark-200/30 to-dark-200/5 hover:from-dark-200/40 hover:to-dark-200/10 transition-all duration-300 border border-dark-300/30 hover:border-accent/20 transform hover:scale-105">
            <Star className="h-5 w-5 md:h-8 md:w-8 text-accent mx-auto mb-2 md:mb-4" />
            <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">92.5%</div>
            <div className="text-xs md:text-sm text-gray-400">Average Win Rate</div>
          </div>
          <div className="glass-panel rounded-xl p-3 md:p-6 text-center bg-gradient-to-br from-dark-200/30 to-dark-200/5 hover:from-dark-200/40 hover:to-dark-200/10 transition-all duration-300 border border-dark-300/30 hover:border-accent/20 transform hover:scale-105">
            <Clock className="h-5 w-5 md:h-8 md:w-8 text-accent mx-auto mb-2 md:mb-4" />
            <div className="text-xl md:text-3xl font-bold text-white mb-1 md:mb-2">0.04s</div>
            <div className="text-xs md:text-sm text-gray-400">Copy Latency</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 md:mt-16 text-center">
          <a 
            href="#pricing" 
            className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 inline-flex items-center px-4 md:px-8 py-2 md:py-3 text-sm md:text-base shadow-lg shadow-accent/10"
          >
            <Trophy className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            View Full Leaderboard
          </a>
          <p className="text-gray-400 mt-3 md:mt-4 text-xs md:text-sm">
            Join thousands of traders already copying our top performers
          </p>
        </div>
      </div>
    </div>
  );
}