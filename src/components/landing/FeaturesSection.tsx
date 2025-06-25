import React, { useState } from 'react';
import { 
  Shield, Bot, LineChart, Webhook, Users, BellRing,
  TrendingUp, TrendingDown, DollarSign, Star, ArrowRight,
  Clock, Check, Store, BarChart2, Coins, Zap, Award, Target
} from 'lucide-react';

const topTraders = [
  {
    name: "Alex Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 32.5,
    winRate: 92,
    trades: 1234,
    followers: 892
  },
  {
    name: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 28.7,
    winRate: 88,
    trades: 856,
    followers: 654
  },
  {
    name: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 45.2,
    winRate: 95,
    trades: 2341,
    followers: 1243
  }
];

const webhookExamples = [
  {
    name: "GOLD Strategy",
    symbol: "XAUUSD",
    type: "buy",
    profit: 1250.50,
    time: "2 minutes ago",
    success: true
  },
  {
    name: "Crypto Signals",
    symbol: "BTCUSD",
    type: "sell",
    profit: 890.25,
    time: "5 minutes ago",
    success: true
  },
  {
    name: "Forex Master",
    symbol: "EURUSD",
    type: "buy",
    profit: 450.75,
    time: "8 minutes ago",
    success: true
  }
];

const topSellingWebhooks = [
  {
    name: "Gold Scalper Pro",
    creator: "Alex Trading",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    price: 49.99,
    subscribers: 1234,
    rating: 4.9,
    monthlyRevenue: 12450,
    winRate: 92
  },
  {
    name: "Crypto Momentum",
    creator: "Pro Signals",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    price: 39.99,
    subscribers: 856,
    rating: 4.8,
    monthlyRevenue: 8890,
    winRate: 88
  },
  {
    name: "Forex Elite",
    creator: "Master Trader",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    price: 59.99,
    subscribers: 2341,
    rating: 4.95,
    monthlyRevenue: 15680,
    winRate: 95
  }
];

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<'webhooks' | 'copyTrading' | 'marketplace'>('webhooks');

  return (
    <div className="py-12 md:py-20 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/10 to-dark/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.15),transparent_50%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.15),transparent_50%)] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-shadow-glow">
            Everything You Need to <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent animate-gradient-x">Trade Like a Pro</span>
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            Our platform combines advanced technology with an intuitive interface
            to give you the ultimate trading experience
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex justify-center mb-6 md:mb-12 overflow-x-auto pb-2">
          <div className="flex rounded-lg bg-dark-200/30 p-1 border border-dark-300/30">
            <button
              onClick={() => setActiveTab('webhooks')}
              className={`flex items-center space-x-1 px-2 py-1.5 md:space-x-2 md:px-4 md:py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'webhooks' 
                  ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-md shadow-accent/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Webhook className="h-3.5 w-3.5 md:h-5 md:w-5" />
              <span className="hidden sm:inline text-sm md:text-base">Webhook Automation</span>
              <span className="sm:hidden text-xs">Webhooks</span>
            </button>
            <button
              onClick={() => setActiveTab('copyTrading')}
              className={`flex items-center space-x-1 px-2 py-1.5 md:space-x-2 md:px-4 md:py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'copyTrading' 
                  ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-md shadow-accent/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Users className="h-3.5 w-3.5 md:h-5 md:w-5" />
              <span className="hidden sm:inline text-sm md:text-base">Copy Trading</span>
              <span className="sm:hidden text-xs">Copy</span>
            </button>
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`flex items-center space-x-1 px-2 py-1.5 md:space-x-2 md:px-4 md:py-3 rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'marketplace' 
                  ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-md shadow-accent/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Store className="h-3.5 w-3.5 md:h-5 md:w-5" />
              <span className="hidden sm:inline text-sm md:text-base">Sell Your Signals</span>
              <span className="sm:hidden text-xs">Sell</span>
            </button>
          </div>
        </div>

        {/* Feature Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 items-start">
          {/* Left Panel - Feature Description */}
          <div className="glass-panel rounded-xl p-3 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
            {activeTab === 'webhooks' && (
              <>
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-6">
                  <div className="p-1.5 md:p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                    <Webhook className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-white text-shadow-glow">Webhook Automation</h3>
                    <p className="text-xs md:text-base text-gray-400">Turn TradingView alerts into automated trades</p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4 mb-3 md:mb-6">
                  {webhookExamples.map((webhook, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 md:p-4 bg-dark-200/30 rounded-lg border border-dark-300/30 hover:border-accent/20 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <div className="p-1 md:p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                          <Webhook className="h-3.5 w-3.5 md:h-5 md:w-5 text-accent" />
                        </div>
                        <div>
                          <div className="text-xs md:text-base text-white font-medium">{webhook.name}</div>
                          <div className="flex items-center space-x-1 md:space-x-2 text-xs">
                            <span className="text-gray-400">{webhook.symbol}</span>
                            <span className={`px-1 py-0.5 rounded-full text-[10px] md:text-xs ${
                              webhook.type === 'buy' 
                                ? 'bg-emerald-500/20 text-emerald-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {webhook.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs md:text-base text-emerald-400 font-medium">
                          +${webhook.profit.toLocaleString()}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-400">{webhook.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#pricing" className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 w-full flex items-center justify-center py-2 md:py-3 text-xs md:text-base shadow-lg shadow-accent/10">
                  Create Webhook
                  <ArrowRight className="ml-1 md:ml-2 h-3.5 w-3.5 md:h-5 md:w-5" />
                </a>
              </>
            )}

            {activeTab === 'copyTrading' && (
              <>
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-6">
                  <div className="p-1.5 md:p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                    <Users className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-white text-shadow-glow">Copy Trading</h3>
                    <p className="text-xs md:text-base text-gray-400">Follow top traders and copy their success</p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4 mb-3 md:mb-6">
                  {topTraders.map((trader, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 md:p-4 bg-dark-200/30 rounded-lg border border-dark-300/30 hover:border-accent/20 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <img
                          src={trader.avatar}
                          alt={trader.name}
                          className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-accent/20"
                        />
                        <div>
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <span className="text-xs md:text-base text-white font-medium">{trader.name}</span>
                            <div className="flex items-center space-x-0.5 text-yellow-400">
                              <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                              <span className="text-[10px] md:text-xs">{trader.winRate}%</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] md:text-xs text-gray-400">
                            <span>{trader.trades.toLocaleString()} trades</span>
                            <span>{trader.followers.toLocaleString()} followers</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs md:text-base text-emerald-400 font-medium">
                        +{trader.profit}%
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#pricing" className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 w-full flex items-center justify-center py-2 md:py-3 text-xs md:text-base shadow-lg shadow-accent/10">
                  Start Copy Trading
                  <ArrowRight className="ml-1 md:ml-2 h-3.5 w-3.5 md:h-5 md:w-5" />
                </a>
              </>
            )}

            {activeTab === 'marketplace' && (
              <>
                <div className="flex items-center space-x-2 md:space-x-3 mb-3 md:mb-6">
                  <div className="p-1.5 md:p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                    <Store className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-xl font-bold text-white text-shadow-glow">Signal Marketplace</h3>
                    <p className="text-xs md:text-base text-gray-400">Turn your strategies into passive income</p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4 mb-3 md:mb-6">
                  {topSellingWebhooks.map((webhook, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-2 md:p-4 bg-dark-200/30 rounded-lg border border-dark-300/30 hover:border-accent/20 transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      <div className="flex items-center space-x-2 md:space-x-3">
                        <img
                          src={webhook.avatar}
                          alt={webhook.creator}
                          className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-accent/20"
                        />
                        <div>
                          <div className="flex items-center space-x-1 md:space-x-2">
                            <span className="text-xs md:text-base text-white font-medium">{webhook.name}</span>
                            <div className="flex items-center space-x-0.5 text-yellow-400">
                              <Star className="h-3 w-3 md:h-4 md:w-4 fill-current" />
                              <span className="text-[10px] md:text-xs">{webhook.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] md:text-xs text-gray-400">
                            <span>${webhook.price}/mo</span>
                            <span>{webhook.subscribers.toLocaleString()} subscribers</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs md:text-base text-emerald-400 font-medium">
                          ${webhook.monthlyRevenue.toLocaleString()}
                        </div>
                        <div className="text-[10px] md:text-xs text-gray-400">Monthly Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>

                <a href="#pricing" className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 w-full flex items-center justify-center py-2 md:py-3 text-xs md:text-base shadow-lg shadow-accent/10">
                  Start Selling Signals
                  <ArrowRight className="ml-1 md:ml-2 h-3.5 w-3.5 md:h-5 md:w-5" />
                </a>
              </>
            )}
          </div>

          {/* Right Panel - Stats & Benefits */}
          <div className="space-y-3 md:space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {activeTab === 'webhooks' ? (
                <>
                  <div className="glass-panel rounded-xl p-2 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transform hover:scale-105">
                    <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
                      <Clock className="h-3.5 w-3.5 md:h-5 md:w-5 text-accent" />
                      <div className="text-sm md:text-xl font-bold text-white">0.04s</div>
                    </div>
                    <div className="text-[10px] md:text-sm text-gray-400">Average execution time</div>
                  </div>
                  <div className="glass-panel rounded-xl p-2 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transform hover:scale-105">
                    <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
                      <TrendingUp className="h-3.5 w-3.5 md:h-5 md:w-5 text-emerald-400" />
                      <div className="text-sm md:text-xl font-bold text-white">92.3%</div>
                    </div>
                    <div className="text-[10px] md:text-sm text-gray-400">Success rate</div>
                  </div>
                </>
              ) : activeTab === 'copyTrading' ? (
                <>
                  <div className="glass-panel rounded-xl p-2 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transform hover:scale-105">
                    <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
                      <Users className="h-3.5 w-3.5 md:h-5 md:w-5 text-accent" />
                      <div className="text-sm md:text-xl font-bold text-white">50K+</div>
                    </div>
                    <div className="text-[10px] md:text-sm text-gray-400">Active traders</div>
                  </div>
                  <div className="glass-panel rounded-xl p-2 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transform hover:scale-105">
                    <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
                      <DollarSign className="h-3.5 w-3.5 md:h-5 md:w-5 text-emerald-400" />
                      <div className="text-sm md:text-xl font-bold text-white">$2.8B+</div>
                    </div>
                    <div className="text-[10px] md:text-sm text-gray-400">Monthly volume</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="glass-panel rounded-xl p-2 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transform hover:scale-105">
                    <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
                      <Coins className="h-3.5 w-3.5 md:h-5 md:w-5 text-accent" />
                      <div className="text-sm md:text-xl font-bold text-white">$1.2M+</div>
                    </div>
                    <div className="text-[10px] md:text-sm text-gray-400">Monthly marketplace volume</div>
                  </div>
                  <div className="glass-panel rounded-xl p-2 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transform hover:scale-105">
                    <div className="flex items-center space-x-1 md:space-x-3 mb-1 md:mb-2">
                      <BarChart2 className="h-3.5 w-3.5 md:h-5 md:w-5 text-emerald-400" />
                      <div className="text-sm md:text-xl font-bold text-white">15K+</div>
                    </div>
                    <div className="text-[10px] md:text-sm text-gray-400">Active subscribers</div>
                  </div>
                </>
              )}
            </div>

            {/* Benefits List */}
            <div className="glass-panel rounded-xl p-3 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <h4 className="text-sm md:text-lg font-medium text-white mb-2 md:mb-4 text-shadow-glow">
                {activeTab === 'webhooks' 
                  ? 'Webhook Benefits' 
                  : activeTab === 'copyTrading'
                  ? 'Copy Trading Benefits'
                  : 'Marketplace Benefits'}
              </h4>
              <div className="space-y-2 md:space-y-4">
                {(activeTab === 'webhooks' ? [
                  "Instant trade execution from TradingView alerts",
                  "Advanced risk management and position sizing",
                  "Support for multiple exchanges and brokers",
                  "Real-time performance tracking",
                  "Customizable trade parameters",
                  "24/7 automated trading"
                ] : activeTab === 'copyTrading' ? [
                  "Follow multiple traders simultaneously",
                  "Automatic position sizing and risk management",
                  "Real-time trade copying with ultra-low latency",
                  "Advanced trader performance analytics",
                  "Customizable copy settings per trader",
                  "Stop-loss and take-profit protection"
                ] : [
                  "Turn your trading strategies into passive income",
                  "Built-in subscription management system",
                  "Detailed analytics and subscriber insights",
                  "Automated payouts and invoicing",
                  "Customizable pricing and subscription tiers",
                  "Protection against unauthorized sharing"
                ]).map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-1.5 md:space-x-3 transform hover:scale-[1.02] transition-all duration-300">
                    <div className="p-0.5 md:p-1 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg mt-0.5">
                      <Check className="h-2.5 w-2.5 md:h-4 md:w-4 text-accent" />
                    </div>
                    <span className="text-[10px] md:text-sm text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Highlight */}
            <div className="glass-panel rounded-xl p-3 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-accent/10 to-dark-200/5">
              <div className="flex items-center space-x-2 md:space-x-3 mb-2 md:mb-4">
                {activeTab === 'webhooks' ? (
                  <Zap className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                ) : activeTab === 'copyTrading' ? (
                  <Award className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                ) : (
                  <Target className="h-4 w-4 md:h-6 md:w-6 text-accent" />
                )}
                <h4 className="text-sm md:text-lg font-medium text-white text-shadow-glow">
                  {activeTab === 'webhooks' 
                    ? 'Lightning Fast Execution' 
                    : activeTab === 'copyTrading'
                    ? 'Elite Trader Network'
                    : 'Passive Income Stream'}
                </h4>
              </div>
              <p className="text-xs md:text-sm text-gray-300 mb-3 md:mb-4">
                {activeTab === 'webhooks' 
                  ? 'Our system processes and executes trades in milliseconds, ensuring you never miss a trading opportunity. With 99.9% uptime, your strategies run 24/7 without interruption.' 
                  : activeTab === 'copyTrading'
                  ? 'Access a curated network of professional traders with verified track records. Our rigorous selection process ensures you are copying only the best performers in the market.'
                  : 'Transform your trading expertise into a sustainable income stream. Top signal providers on our platform earn $10,000+ monthly from subscribers.'}
              </p>
              <a 
                href="#pricing" 
                className="text-xs md:text-sm text-accent hover:text-accent-dark transition-colors flex items-center"
              >
                Learn more
                <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-4 md:w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}