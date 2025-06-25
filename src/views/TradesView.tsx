import React, { useState } from 'react';
import { 
  Plus, TrendingUp, TrendingDown, Clock, DollarSign, 
  Filter, Search, Calendar, BarChart2, ArrowRight, 
  ChevronDown, Users, Webhook, Shield, Target, 
  Zap, Award, CheckCircle2, X, Edit3, RefreshCw,
  Download, ExternalLink, Sliders, Layers, Activity,
  Settings, Wrench
} from 'lucide-react';
import TradeStats from '../components/trades/TradeStats';
import TradesCalendar from '../components/trades/TradesCalendar';
import TradeFilters from '../components/trades/TradeFilters';
import OpenTradeModal from '../components/trades/OpenTradeModal';
import ModifyTradeModal from '../components/trades/ModifyTradeModal';
import BulkModifyTradesModal from '../components/trades/BulkModifyTradesModal';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  lot: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  time: string;
  tradeBy: string;
  profit: number;
  profitPercentage?: number;
  status?: 'open' | 'closed';
  duration?: string;
}

interface TradesViewProps {
  onOpenTrade?: () => void;
}

export default function TradesView({ onOpenTrade }: TradesViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'advanced' | 'history'>('overview');
  const [timeframe, setTimeframe] = useState('today');
  const [filterSymbol, setFilterSymbol] = useState('all');
  const [filterSource, setFilterSource] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOpenTradeModal, setShowOpenTradeModal] = useState(false);
  const [showModifyTradeModal, setShowModifyTradeModal] = useState(false);
  const [showBulkModifyModal, setShowBulkModifyModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live trades data
  const liveTrades: Trade[] = [
    {
      id: '1',
      symbol: 'XAUUSD',
      type: 'sell',
      lot: 0.55,
      openPrice: 2687.59,
      currentPrice: 2685.26,
      stopLoss: 2695.00,
      takeProfit: 2675.00,
      time: '2024-11-08 18:51:01',
      tradeBy: 'YT GOLD1',
      profit: 251.91,
      profitPercentage: 0.85,
      status: 'open',
      duration: '2h 15m'
    },
    {
      id: '2',
      symbol: 'XAUUSD',
      type: 'sell',
      lot: 0.14,
      openPrice: 2698.97,
      currentPrice: 2685.26,
      stopLoss: 2710.00,
      takeProfit: 2670.00,
      time: '2024-11-08 17:20:07',
      tradeBy: 'YT GOLD1',
      profit: 769.11,
      profitPercentage: 1.25,
      status: 'open',
      duration: '3h 45m'
    },
    {
      id: '3',
      symbol: 'EURUSD',
      type: 'buy',
      lot: 1.2,
      openPrice: 1.0950,
      currentPrice: 1.0975,
      stopLoss: 1.0930,
      takeProfit: 1.0990,
      time: '2024-11-08 16:30:22',
      tradeBy: 'Pro Signals',
      profit: 325.50,
      profitPercentage: 0.65,
      status: 'open',
      duration: '4h 30m'
    }
  ];

  // Historical trades data
  const historyTrades: Trade[] = [
    {
      id: '4',
      symbol: 'BTCUSD',
      type: 'buy',
      lot: 0.1,
      openPrice: 68500,
      currentPrice: 69200,
      time: '2024-11-07 14:20:15',
      tradeBy: 'Crypto Signals',
      profit: 700.00,
      profitPercentage: 1.02,
      status: 'closed',
      duration: '5h 10m'
    },
    {
      id: '5',
      symbol: 'GBPUSD',
      type: 'sell',
      lot: 0.8,
      openPrice: 1.2850,
      currentPrice: 1.2820,
      time: '2024-11-07 10:15:30',
      tradeBy: 'Forex Master',
      profit: 240.00,
      profitPercentage: 0.23,
      status: 'closed',
      duration: '3h 25m'
    },
    {
      id: '6',
      symbol: 'NAS100',
      type: 'buy',
      lot: 0.5,
      openPrice: 19250,
      currentPrice: 19150,
      time: '2024-11-06 15:45:20',
      tradeBy: 'YT GOLD1',
      profit: -500.00,
      profitPercentage: -0.52,
      status: 'closed',
      duration: '1d 2h'
    },
    {
      id: '7',
      symbol: 'XAUUSD',
      type: 'buy',
      lot: 0.25,
      openPrice: 2650.50,
      currentPrice: 2687.59,
      time: '2024-11-05 09:30:45',
      tradeBy: 'Gold Signals',
      profit: 925.25,
      profitPercentage: 1.40,
      status: 'closed',
      duration: '2d 5h'
    }
  ];

  // Combined trades for filtering
  const allTrades = [...liveTrades, ...historyTrades];

  // Filter trades
  const filteredTrades = allTrades.filter(trade => {
    const matchesSymbol = filterSymbol === 'all' || trade.symbol === filterSymbol;
    const matchesSource = filterSource === 'all' || trade.tradeBy === filterSource;
    const matchesType = filterType === 'all' || 
                        (filterType === 'buy' && trade.type === 'buy') || 
                        (filterType === 'sell' && trade.type === 'sell');
    const matchesSearch = searchQuery === '' || 
                          trade.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          trade.tradeBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSymbol && matchesSource && matchesType && matchesSearch;
  });

  // Get unique symbols and sources for filters
  const symbols = ['all', ...Array.from(new Set(allTrades.map(t => t.symbol)))];
  const sources = ['all', ...Array.from(new Set(allTrades.map(t => t.tradeBy)))];

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Handle modify trade
  const handleModifyTrade = (trade: Trade) => {
    setSelectedTrade(trade);
    setShowModifyTradeModal(true);
  };

  // Handle close trade
  const handleCloseTrade = (tradeId: string) => {
    console.log('Closing trade:', tradeId);
    // Implement trade closing logic
  };

  // Calculate total profit
  const totalProfit = liveTrades.reduce((sum, trade) => sum + trade.profit, 0);
  const totalHistoricalProfit = historyTrades.reduce((sum, trade) => sum + trade.profit, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-emerald-500/30 to-accent/10 rounded-lg shadow-lg shadow-emerald-500/5">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight text-shadow-glow">Trades</h1>
            <p className="text-gray-400 mt-1">Monitor and manage your trading positions</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button 
            onClick={() => setShowBulkModifyModal(true)}
            className="px-3 py-2 text-accent border border-accent/30 rounded-lg hover:bg-accent/10 transition-all flex items-center"
          >
            <Wrench className="h-4 w-4 mr-2" />
            <span>Bulk Modify</span>
          </button>
          <button 
            className="premium-button flex items-center"
            onClick={() => setShowOpenTradeModal(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Open Trade
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-dark-300/30">
        <div className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'advanced', label: 'Advanced Analytics' },
            { id: 'history', label: 'Trade History' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`pb-4 relative ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-accent"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Filters Bar */}
      <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
        <div className="flex flex-wrap items-center gap-4">
          {/* Time Filter */}
          <div className="relative min-w-[140px]">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="all">All Time</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Symbol Filter */}
          <div className="relative min-w-[140px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterSymbol}
              onChange={(e) => setFilterSymbol(e.target.value)}
              className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Symbols</option>
              {symbols.filter(s => s !== 'all').map(symbol => (
                <option key={symbol} value={symbol}>{symbol}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Source Filter */}
          <div className="relative min-w-[160px]">
            <Webhook className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Sources</option>
              {sources.filter(s => s !== 'all').map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Type Filter */}
          <div className="relative min-w-[120px]">
            <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Types</option>
              <option value="buy">Buy Only</option>
              <option value="sell">Sell Only</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search trades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 bg-dark-200/50 text-gray-300 rounded-lg 
                       border border-dark-300/30 focus:outline-none focus:ring-1 
                       focus:ring-accent/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Live Trades Panel */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-accent/10 to-purple-500/5 hover:border-accent/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <Zap className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-lg font-medium text-white">Live Trades</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-emerald-400 font-medium">
              Total Profit: +${totalProfit.toFixed(2)}
            </div>
            <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
              <Sliders className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Live Trades List */}
        <div className="space-y-4">
          {liveTrades.map(trade => (
            <div 
              key={trade.id}
              className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors border border-dark-300/30 hover:border-emerald-500/20"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    trade.type === 'buy' ? 'bg-emerald-500/10' : 'bg-red-500/10'
                  }`}>
                    {trade.type === 'buy' ? (
                      <TrendingUp className="h-5 w-5 text-emerald-400" />
                    ) : (
                      <TrendingDown className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-white">{trade.symbol}</h3>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        trade.type === 'buy' 
                          ? 'bg-emerald-500/20 text-emerald-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {trade.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-sm text-gray-400">{trade.lot} lots</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-sm text-gray-400">{trade.tradeBy}</span>
                      <span className="text-gray-500">•</span>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{trade.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-6">
                  <div className="flex flex-col items-end">
                    <div className="text-sm text-gray-400">Entry: {trade.openPrice}</div>
                    <div className={`text-sm ${
                      trade.type === 'buy'
                        ? trade.currentPrice > trade.openPrice ? 'text-emerald-400' : 'text-red-400'
                        : trade.currentPrice < trade.openPrice ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      Current: {trade.currentPrice}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className={`text-lg font-medium ${
                      trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                    </div>
                    <div className={`text-xs ${
                      trade.profitPercentage && trade.profitPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {trade.profitPercentage && (trade.profitPercentage >= 0 ? '+' : '')}{trade.profitPercentage?.toFixed(2)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleModifyTrade(trade)}
                      className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                    >
                      <Edit3 className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleCloseTrade(trade.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <>
          {/* Trade Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg">
                  <BarChart2 className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Trades</div>
                  <div className="text-xl font-semibold text-white">1,234</div>
                </div>
              </div>
              <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-accent to-accent-dark rounded-full" />
              </div>
              <div className="mt-2 text-xs text-emerald-400">+12.5% vs last month</div>
            </div>

            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
                  <Target className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Win Rate</div>
                  <div className="text-xl font-semibold text-emerald-400">89.5%</div>
                </div>
              </div>
              <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
                <div className="h-full w-[89.5%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
              </div>
              <div className="mt-2 text-xs text-emerald-400">+2.3% vs last month</div>
            </div>

            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
                  <Award className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Best Trade</div>
                  <div className="text-xl font-semibold text-white">$2,850</div>
                </div>
              </div>
              <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
                <div className="h-full w-[95%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full" />
              </div>
              <div className="mt-2 text-xs text-emerald-400">+$350 vs last month</div>
            </div>

            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg">
                  <DollarSign className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="text-sm text-gray-400">Total Profit</div>
                  <div className="text-xl font-semibold text-emerald-400">$48,256</div>
                </div>
              </div>
              <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-accent to-accent-dark rounded-full" />
              </div>
              <div className="mt-2 text-xs text-emerald-400">+18.2% vs last month</div>
            </div>
          </div>

          {/* Calendar */}
          <TradesCalendar />

          {/* Trade History */}
          <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg">
                  <Layers className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-lg font-medium text-white">Recent Trade History</h2>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                  <Download className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className="text-sm text-accent hover:text-accent-dark transition-colors flex items-center"
                >
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Trade History Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark-200/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entry</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Exit</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-300/30">
                  {historyTrades.slice(0, 5).map((trade) => (
                    <tr key={trade.id} className="hover:bg-dark-200/30 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">{trade.symbol}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className={`flex items-center ${
                          trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {trade.type === 'buy' ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {trade.type.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-300">{trade.lot} lots</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-300">{trade.openPrice}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-300">{trade.currentPrice}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-300">{trade.tradeBy}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center text-gray-400 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{trade.duration}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-right">
                        <div className={`font-medium ${
                          trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {activeTab === 'advanced' && (
        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
                <BarChart2 className="h-5 w-5 text-purple-400" />
              </div>
              <h2 className="text-lg font-medium text-white">Advanced Analytics</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                <Download className="h-5 w-5" />
              </button>
              <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center">
                Export Report
                <ExternalLink className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Advanced Analytics Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Performance Metrics */}
            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <h3 className="text-base font-medium text-white mb-4">Performance Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Win Rate</span>
                  <span className="text-emerald-400 font-medium">89.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Profit Factor</span>
                  <span className="text-white font-medium">2.8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Win</span>
                  <span className="text-emerald-400 font-medium">$325.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Loss</span>
                  <span className="text-red-400 font-medium">-$125.25</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="text-white font-medium">12 trades</span>
                </div>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <h3 className="text-base font-medium text-white mb-4">Risk Metrics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Max Drawdown</span>
                  <span className="text-red-400 font-medium">8.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Risk/Trade</span>
                  <span className="text-white font-medium">1.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Risk/Reward</span>
                  <span className="text-white font-medium">1:2.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sharpe Ratio</span>
                  <span className="text-emerald-400 font-medium">2.1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sortino Ratio</span>
                  <span className="text-emerald-400 font-medium">2.8</span>
                </div>
              </div>
            </div>

            {/* Time Analysis */}
            <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <h3 className="text-base font-medium text-white mb-4">Time Analysis</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Avg. Hold Time</span>
                  <span className="text-white font-medium">2h 15m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Best Session</span>
                  <span className="text-emerald-400 font-medium">London</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Best Day</span>
                  <span className="text-emerald-400 font-medium">Tuesday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Trade Frequency</span>
                  <span className="text-white font-medium">8.5/day</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Efficiency Score</span>
                  <span className="text-emerald-400 font-medium">92.5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Chart Placeholder */}
          <div className="mt-6 glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
            <h3 className="text-base font-medium text-white mb-4">Performance Over Time</h3>
            <div className="h-64 bg-dark-200/30 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Performance chart will be displayed here</span>
            </div>
          </div>

          {/* Symbol Performance */}
          <div className="mt-6 glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
            <h3 className="text-base font-medium text-white mb-4">Symbol Performance</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-dark-200/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Trades</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Win Rate</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Avg. Trade</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Best Trade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-300/30">
                  {[
                    { symbol: 'EURUSD', trades: 345, winRate: 92.5, profit: 12450.75, avgTrade: 36.09, bestTrade: 850.25 },
                    { symbol: 'XAUUSD', trades: 256, winRate: 88.3, profit: 18750.50, avgTrade: 73.24, bestTrade: 2850.75 },
                    { symbol: 'BTCUSD', trades: 124, winRate: 85.5, profit: 9850.25, avgTrade: 79.44, bestTrade: 1250.50 },
                    { symbol: 'GBPUSD', trades: 198, winRate: 90.4, profit: 7250.75, avgTrade: 36.62, bestTrade: 750.25 }
                  ].map((item, index) => (
                    <tr key={index} className="hover:bg-dark-200/30 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-white font-medium">{item.symbol}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-300">{item.trades}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-emerald-400">{item.winRate}%</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-emerald-400">${item.profit.toLocaleString()}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-gray-300">${item.avgTrade.toFixed(2)}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-emerald-400">${item.bestTrade.toLocaleString()}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg">
                <Layers className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-medium text-white">Trade History</h2>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-emerald-400 font-medium">
                Total Profit: +${totalHistoricalProfit.toFixed(2)}
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Trade History Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-200/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Entry</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Exit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-300/30">
                {historyTrades.map((trade) => (
                  <tr key={trade.id} className="hover:bg-dark-200/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-white font-medium">{trade.symbol}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${
                        trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {trade.type === 'buy' ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {trade.type.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-gray-300">{trade.lot} lots</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-gray-300">{trade.openPrice}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-gray-300">{trade.currentPrice}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="text-gray-300">{trade.tradeBy}</span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{trade.duration}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className={`font-medium ${
                        trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <button className="p-1.5 text-accent hover:bg-accent/10 rounded-lg transition-colors">
                        <BarChart2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing 1-10 of 1,234 trades
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                <ChevronDown className="h-5 w-5 rotate-90" />
              </button>
              <div className="px-3 py-1.5 bg-dark-200/50 rounded-lg text-white">
                1
              </div>
              <div className="px-3 py-1.5 text-gray-400">
                2
              </div>
              <div className="px-3 py-1.5 text-gray-400">
                3
              </div>
              <div className="px-3 py-1.5 text-gray-400">
                ...
              </div>
              <div className="px-3 py-1.5 text-gray-400">
                124
              </div>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                <ChevronDown className="h-5 w-5 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <OpenTradeModal
        isOpen={showOpenTradeModal}
        onClose={() => setShowOpenTradeModal(false)}
      />

      {selectedTrade && (
        <ModifyTradeModal
          isOpen={showModifyTradeModal}
          onClose={() => setShowModifyTradeModal(false)}
          trade={{
            id: selectedTrade.id,
            symbol: selectedTrade.symbol,
            type: selectedTrade.type,
            openPrice: selectedTrade.openPrice,
            currentPrice: selectedTrade.currentPrice,
            stopLoss: selectedTrade.stopLoss,
            takeProfit: selectedTrade.takeProfit,
            lot: selectedTrade.lot
          }}
          onModify={(id, changes) => {
            console.log('Modifying trade:', id, changes);
            setShowModifyTradeModal(false);
          }}
        />
      )}

      {/* Bulk Modify Trades Modal */}
      <BulkModifyTradesModal
        isOpen={showBulkModifyModal}
        onClose={() => setShowBulkModifyModal(false)}
        trades={liveTrades}
        onBulkModify={(changes) => {
          console.log('Bulk modifying trades:', changes);
          setShowBulkModifyModal(false);
        }}
      />
    </div>
  );
}