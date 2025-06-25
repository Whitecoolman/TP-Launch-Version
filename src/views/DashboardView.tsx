import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, Clock, Bot, 
  Shield, Zap, Award, Target, ArrowRight, Sparkles,
  Calendar, BarChart2, DollarSign, Webhook,
  Bell, Users, ChevronDown, MessageCircle, Gift,
  Crown, Star, ChevronRight, ExternalLink, X,
  Activity, Wallet, Globe, Layers, Briefcase, Wrench
} from 'lucide-react';
import QuickActions from '../components/QuickActions';
import PerformanceChart from '../components/dashboard/PerformanceChart';
import NewWebhookModal from '../components/webhooks/NewWebhookModal';
import LivePerformanceChart from '../components/charts/LivePerformanceChart';
import LiveTradesCounter from '../components/trades/LiveTradesCounter';
import TradeActivityCalendar from '../components/dashboard/TradeActivityCalendar';
import PromoSection from '../components/dashboard/PromoSection';
import BulkModifyTradesModal from '../components/trades/BulkModifyTradesModal';

interface DashboardViewProps {
  onCopyTrader: (traderId: string, name: string, profit: number, winRate: number, price: number) => void;
  onChat: (traderId: string) => void;
  copyingTraders: string[];
  onViewChange: (view: string) => void;
}

export default function DashboardView({ onCopyTrader, onChat, copyingTraders, onViewChange }: DashboardViewProps) {
  const [showWebhookModal, setShowWebhookModal] = useState(false);
  const [showBulkModifyModal, setShowBulkModifyModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [animatedStats, setAnimatedStats] = useState({
    balance: 0,
    profit: 0,
    winRate: 0,
    trades: 0
  });

  // Today's trade stats
  const todayStats = {
    totalTrades: 12,
    winningTrades: 9,
    losingTrades: 3,
    profit: 325.50
  };

  // Target values for animation
  const targetStats = {
    balance: 48256.32,
    profit: 15234.50,
    winRate: 89.5,
    trades: 12
  };

  // Most profitable webhook today
  const mostProfitableWebhook = {
    name: "YT GOLD1",
    profit: 769.11,
    trades: 8,
    winRate: 92.5,
    color: "from-accent/20 via-purple-500/10 to-accent/5"
  };

  // Animate stats on load
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        balance: Math.min(prev.balance + 1000, targetStats.balance),
        profit: Math.min(prev.profit + 500, targetStats.profit),
        winRate: Math.min(prev.winRate + 2, targetStats.winRate),
        trades: Math.min(prev.trades + 1, targetStats.trades)
      }));
    }, 50);

    if (
      animatedStats.balance >= targetStats.balance &&
      animatedStats.profit >= targetStats.profit &&
      animatedStats.winRate >= targetStats.winRate &&
      animatedStats.trades >= targetStats.trades
    ) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [animatedStats]);

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  // Get current trading session
  const getTradingSession = () => {
    const hour = currentTime.getHours();
    const day = currentTime.getDay(); // 0 = Sunday, 6 = Saturday
    
    if (day === 0 || day === 6) return "Weekend Session";
    
    if (hour >= 0 && hour < 8) return "Asian Session";
    if (hour >= 8 && hour < 16) return "London Session";
    return "New York Session";
  };

  // Get session icon
  const getSessionIcon = () => {
    const session = getTradingSession();
    if (session === "Asian Session") return <Clock className="h-4 w-4 text-yellow-400" />;
    if (session === "London Session") return <Clock className="h-4 w-4 text-blue-400" />;
    if (session === "New York Session") return <Clock className="h-4 w-4 text-orange-400" />;
    return <Clock className="h-4 w-4 text-purple-400" />;
  };

  const handleCreateWebhook = (name: string) => {
    console.log('Creating webhook:', name);
    setShowWebhookModal(false);
  };

  // Recent webhooks with activity
  const recentWebhooks = [
    {
      id: 'webhook-1',
      name: 'YT GOLD1',
      symbol: 'XAUUSD',
      type: 'buy',
      profit: 769.11,
      time: '2h ago',
      trades: 8,
      color: "from-accent/20 via-purple-500/10 to-accent/5",
      status: 'active',
      lastSignal: '15 minutes ago',
      successRate: 92.5
    },
    {
      id: 'webhook-2',
      name: 'Pro Signals',
      symbol: 'EURUSD',
      type: 'sell',
      profit: 325.50,
      time: '4h ago',
      trades: 5,
      color: "from-purple-500/20 via-purple-600/10 to-purple-500/5",
      status: 'active',
      lastSignal: '30 minutes ago',
      successRate: 88.3
    },
    {
      id: 'webhook-3',
      name: 'Forex Master',
      symbol: 'GBPUSD',
      type: 'buy',
      profit: 156.25,
      time: '6h ago',
      trades: 3,
      color: "from-emerald-500/20 via-emerald-600/10 to-emerald-500/5",
      status: 'active',
      lastSignal: '1 hour ago',
      successRate: 85.7
    }
  ];

  // Mock trades for bulk modify
  const mockTrades = [
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'buy',
      lot: 1.0,
      openPrice: 1.0950,
      currentPrice: 1.0980,
      stopLoss: 1.0930,
      takeProfit: 1.0990,
      profit: 300,
      time: '2024-01-24 02:25:50',
      tradeBy: 'YT GOLD1'
    },
    {
      id: '2',
      symbol: 'XAUUSD',
      type: 'sell',
      lot: 0.5,
      openPrice: 2025.50,
      currentPrice: 2015.80,
      stopLoss: 2035.00,
      takeProfit: 2000.00,
      profit: -97.00,
      time: '2024-01-24 01:30:00',
      tradeBy: 'Pro Signals'
    },
    {
      id: '3',
      symbol: 'GBPUSD',
      type: 'buy',
      lot: 0.5,
      openPrice: 1.2650,
      currentPrice: 1.2680,
      stopLoss: 1.2630,
      takeProfit: 1.2700,
      profit: 150,
      time: '2024-01-24 01:15:30',
      tradeBy: 'Forex Master'
    }
  ];

  const handleBulkModify = (changes: any) => {
    console.log('Bulk modify changes:', changes);
    setShowBulkModifyModal(false);
  };

  // Money-making opportunities
  const moneyMakingOptions = [
    {
      title: "Automated Trading",
      description: "Set up webhooks to automatically execute trades from TradingView signals",
      icon: <Webhook className="h-5 w-5 text-accent" />,
      action: "Create Webhook",
      onClick: () => onViewChange('signals')
    },
    {
      title: "Copy Trading",
      description: "Follow and copy top-performing traders automatically",
      icon: <Users className="h-5 w-5 text-purple-400" />,
      action: "Explore Traders",
      onClick: () => onViewChange('dashboard')
    },
    {
      title: "Sell Your Signals",
      description: "Turn your trading expertise into passive income",
      icon: <DollarSign className="h-5 w-5 text-emerald-400" />,
      action: "Start Selling",
      onClick: () => onViewChange('signals')
    }
  ];

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header with Welcome and Stats */}
      <div className="relative rounded-xl overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-purple-500/10 to-dark-200/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.2),transparent_70%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.2),transparent_70%)]"></div>
        
        {/* Content */}
        <div className="relative glass-panel rounded-xl p-6 md:p-8 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Welcome Section */}
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-accent/30 to-purple-500/10 rounded-xl shadow-lg shadow-accent/5">
                <Award className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight text-shadow-glow">
                  {getGreeting()}, Alex! 👋
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <div className="flex items-center text-emerald-400 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+23% this week</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-accent text-sm font-medium">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="px-2.5 py-1 bg-gradient-to-r from-accent/20 to-purple-500/20 text-white rounded-full text-xs font-medium flex items-center space-x-1.5 shadow-sm">
                    {getSessionIcon()}
                    <span>{getTradingSession()}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Today's Trading Card */}
            <div className="glass-panel rounded-xl p-3 md:p-4 border border-accent/20 bg-gradient-to-r from-accent/10 to-purple-500/5 w-full md:w-auto">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-accent" />
                <h3 className="text-sm md:text-base font-medium text-white">Today's Trading</h3>
              </div>
              
              <div className="grid grid-cols-4 gap-2 mb-2">
                <div className="glass-panel rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Total</div>
                  <div className="text-base font-medium text-white">{todayStats.totalTrades}</div>
                </div>
                <div className="glass-panel rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Winning</div>
                  <div className="text-base font-medium text-emerald-400">{todayStats.winningTrades}</div>
                </div>
                <div className="glass-panel rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Losing</div>
                  <div className="text-base font-medium text-red-400">{todayStats.losingTrades}</div>
                </div>
                <div className="glass-panel rounded-lg p-2 text-center">
                  <div className="text-xs text-gray-400">Profit</div>
                  <div className="text-base font-medium text-emerald-400">+${todayStats.profit.toFixed(2)}</div>
                </div>
              </div>
              
              <button 
                onClick={() => onViewChange('trades')}
                className="w-full premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 py-1.5 text-xs md:text-sm flex items-center justify-center shadow-md shadow-accent/10"
              >
                Open Trade
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Money Making Opportunities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4">
            {moneyMakingOptions.map((option, index) => (
              <div key={index} className="glass-panel rounded-lg p-3 md:p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 md:p-2 bg-dark-200/50 rounded-lg mt-0.5">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm md:text-base font-medium text-white">{option.title}</div>
                    <div className="text-[10px] md:text-xs text-gray-400 mt-1">{option.description}</div>
                    <button 
                      onClick={option.onClick}
                      className="mt-2 text-[10px] md:text-xs text-accent hover:text-accent-dark transition-colors flex items-center"
                    >
                      {option.action}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rotating Promo Section */}
      <PromoSection />

      {/* Quick Actions */}
      <QuickActions onNewWebhook={() => setShowWebhookModal(true)} onViewChange={onViewChange} />

      {/* Live Trades and Calendar Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Trades */}
        <div className="lg:col-span-2 glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-accent/10 to-purple-500/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                <Zap className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-lg font-medium text-white">Live Trades</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setShowBulkModifyModal(true)}
                className="px-3 py-1.5 text-sm border border-accent/30 text-accent rounded-lg
                         hover:bg-accent/10 transition-all duration-300 flex items-center"
              >
                <Wrench className="h-4 w-4 mr-1.5" />
                Bulk Modify
              </button>
              <button 
                onClick={() => onViewChange('trades')}
                className="text-sm text-accent hover:text-accent-dark transition-colors flex items-center"
              >
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
          
          <LiveTradesCounter />
        </div>
        
        {/* Trade Calendar */}
        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-purple-500/10 to-dark-200/5 hover:border-purple-500/20 transition-all duration-300">
          <TradeActivityCalendar />
        </div>
      </div>

      {/* Most Profitable Webhook Today */}
      <div className="glass-panel rounded-xl p-4 md:p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 bg-gradient-to-br ${mostProfitableWebhook.color} rounded-lg`}>
              <Award className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-lg font-medium text-white">Most Profitable Webhook Today</h2>
          </div>
          <button 
            onClick={() => onViewChange('signals')}
            className="text-sm text-accent hover:text-accent-dark transition-colors flex items-center"
          >
            View All Webhooks
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
        
        <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-accent/10 to-transparent hover:border-accent/20 transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${mostProfitableWebhook.color}`}>
                <Webhook className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{mostProfitableWebhook.name}</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-emerald-400 font-medium">+${mostProfitableWebhook.profit.toFixed(2)}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{mostProfitableWebhook.trades} trades</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-emerald-400">{mostProfitableWebhook.winRate}% win rate</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => onViewChange('signals')}
              className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 px-4 py-2 text-sm flex items-center shadow-md shadow-accent/10"
            >
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        {/* Enhanced Webhooks Grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentWebhooks.map((webhook) => (
            <div 
              key={webhook.id}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 
                        hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}
              onClick={() => onViewChange('signals')}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${webhook.color} opacity-20`} />
              
              {/* Content */}
              <div className="relative glass-panel rounded-xl p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${webhook.color}`}>
                      <Webhook className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">{webhook.name}</h3>
                      <div className="flex items-center space-x-2 mt-0.5">
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1"></div>
                          <span className="text-emerald-400">ACTIVE</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-400">{webhook.lastSignal}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    +${webhook.profit.toFixed(2)}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="glass-panel rounded-lg p-2 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                    <div className="text-xs text-gray-400 mb-0.5">Success Rate</div>
                    <div className="text-sm font-medium text-emerald-400">
                      {webhook.successRate}%
                    </div>
                  </div>

                  <div className="glass-panel rounded-lg p-2 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                    <div className="text-xs text-gray-400 mb-0.5">Trades Today</div>
                    <div className="text-sm font-medium text-white">
                      {webhook.trades}
                    </div>
                  </div>
                </div>

                {/* Symbols */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <span 
                    className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300
                             border border-dark-300/30 backdrop-blur-sm"
                  >
                    {webhook.symbol}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-lg ${
                    webhook.type === 'buy' 
                      ? 'bg-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/20 text-red-400'
                  } border border-dark-300/30 backdrop-blur-sm`}>
                    {webhook.type.toUpperCase()}
                  </span>
                </div>

                {/* View Details Button */}
                <button 
                  className="w-full py-1.5 text-xs bg-gradient-to-r from-dark-200/50 to-dark-200/30 text-gray-300 rounded-lg
                           border border-dark-300/30 hover:bg-dark-200/80 hover:text-white transition-all
                           flex items-center justify-center space-x-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => onViewChange('signals')}
            className="text-accent hover:text-accent-dark transition-colors flex items-center text-sm"
          >
            View All Webhooks
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <BarChart2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">Performance Overview</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Select Account:</span>
                <select 
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                  className="bg-dark-200/50 text-white rounded-lg px-2 py-1 text-sm border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
                >
                  <option value="all">All Accounts</option>
                  <option value="metatrader">MetaTrader</option>
                  <option value="hankox">Hankox</option>
                  <option value="tradelocker">TradeLocker</option>
                  <option value="binance">Binance</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex rounded-lg bg-dark-200/30 p-1 border border-dark-300/30">
            {['1D', '1W', '1M', '1Y'].map((period) => (
              <button
                key={period}
                className={`px-2 py-1 md:px-3 md:py-1 rounded-md text-xs md:text-sm font-medium transition-all ${
                  period === '1W' 
                    ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <LivePerformanceChart account={selectedAccount} />
      </div>

      <NewWebhookModal
        isOpen={showWebhookModal}
        onClose={() => setShowWebhookModal(false)}
        onCreateWebhook={handleCreateWebhook}
      />

      <BulkModifyTradesModal
        isOpen={showBulkModifyModal}
        onClose={() => setShowBulkModifyModal(false)}
        trades={mockTrades}
        onBulkModify={handleBulkModify}
      />
    </div>
  );
}