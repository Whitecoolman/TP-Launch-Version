import React, { useState } from 'react';
import { 
  X, TrendingUp, BarChart2, Clock, DollarSign, 
  Calendar, Activity, LineChart, PieChart, Info, 
  CheckCircle2, PlayCircle, Edit3, TrendingDown, 
  Wallet, Shield, Zap, Award, Target, ArrowRight,
  Users, Globe, Briefcase, Lock, ChevronDown, ChevronUp
} from 'lucide-react';
import type { MetaAccount } from '../../api/meta-api';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  openPrice: number;
  currentPrice: number;
  profit: number;
  time: string;
  status: 'open' | 'closed';
}

interface AccountStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  account?: MetaAccount;
}

export default function AccountStatsModal({ isOpen, onClose, account }: AccountStatsModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'trades' | 'performance'>('overview');
  const [expandedTrades, setExpandedTrades] = useState<string[]>([]);

  if (!isOpen || !account) return null;

  // Mock data for recent trades
  const recentTrades: Trade[] = [
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'buy',
      openPrice: 1.0950,
      currentPrice: 1.0980,
      profit: 300,
      time: '2 hours ago',
      status: 'open'
    },
    {
      id: '2',
      symbol: 'XAUUSD',
      type: 'sell',
      openPrice: 2025.50,
      currentPrice: 2015.80,
      profit: 970,
      time: '5 hours ago',
      status: 'open'
    },
    {
      id: '3',
      symbol: 'GBPUSD',
      type: 'buy',
      openPrice: 1.2650,
      currentPrice: 1.2680,
      profit: 300,
      time: '1 day ago',
      status: 'closed'
    },
    {
      id: '4',
      symbol: 'BTCUSD',
      type: 'sell',
      openPrice: 68500,
      currentPrice: 68200,
      profit: 300,
      time: '2 days ago',
      status: 'closed'
    }
  ];

  // Weekly activity data
  const weeklyActivity = [
    { day: 'Mon', trades: 5, profit: 450 },
    { day: 'Tue', trades: 3, profit: -120 },
    { day: 'Wed', trades: 7, profit: 890 },
    { day: 'Thu', trades: 4, profit: 320 },
    { day: 'Fri', trades: 6, profit: 560 },
    { day: 'Sat', trades: 2, profit: 150 },
    { day: 'Sun', trades: 0, profit: 0 }
  ];

  // Symbol performance data
  const symbolPerformance = [
    { symbol: 'EURUSD', trades: 12, winRate: 83, profit: 980 },
    { symbol: 'XAUUSD', trades: 8, winRate: 75, profit: 1250 },
    { symbol: 'GBPUSD', trades: 5, winRate: 60, profit: -320 },
    { symbol: 'BTCUSD', trades: 3, winRate: 100, profit: 750 }
  ];

  // Toggle trade expansion
  const toggleTradeExpand = (tradeId: string) => {
    setExpandedTrades(prev => 
      prev.includes(tradeId) 
        ? prev.filter(id => id !== tradeId)
        : [...prev, tradeId]
    );
  };

  // Get account type color
  const getAccountTypeColor = () => {
    return account.type === 'demo' 
      ? 'from-blue-500/10 to-transparent' 
      : 'from-emerald-500/10 to-transparent';
  };

  // Get account type icon
  const getAccountTypeIcon = () => {
    if (account.server.includes('Fyntura')) {
      return <Globe className="h-5 w-5 text-accent" />;
    } else if (account.server.includes('Hankox')) {
      return <Briefcase className="h-5 w-5 text-yellow-400" />;
    } else if (account.server.includes('TradeLocker')) {
      return <Lock className="h-5 w-5 text-emerald-400" />;
    } else {
      return <Wallet className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-3xl z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className={`relative p-6 border-b border-dark-300/50 bg-gradient-to-r ${getAccountTypeColor()}`}>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-dark-100/30 backdrop-blur-sm rounded-lg">
              {getAccountTypeIcon()}
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">{account.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`px-2 py-0.5 rounded-full text-xs ${
                  account.type === 'demo' 
                    ? 'bg-blue-500/20 text-blue-400' 
                    : 'bg-emerald-500/20 text-emerald-400'
                }`}>
                  {account.type.toUpperCase()}
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center text-xs">
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    account.connectionStatus === 'connected' 
                      ? 'bg-emerald-400' 
                      : account.connectionStatus === 'connecting'
                      ? 'bg-yellow-400'
                      : 'bg-red-400'
                  }`}></div>
                  <span className={
                    account.connectionStatus === 'connected' 
                      ? 'text-emerald-400' 
                      : account.connectionStatus === 'connecting'
                      ? 'text-yellow-400'
                      : 'text-red-400'
                  }>
                    {account.connectionStatus}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-dark-300/30">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'overview' 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('trades')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'trades' 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Trades
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
              activeTab === 'performance' 
                ? 'text-accent border-b-2 border-accent' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Performance
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <>
              {/* Account Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Wallet className="h-4 w-4" />
                    <span>Balance</span>
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Equity</span>
                  </div>
                  <div className={`text-xl font-semibold ${
                    account.equity >= account.balance ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {account.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                  </div>
                </div>
              </div>

              {/* More Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Shield className="h-4 w-4" />
                    <span>Margin</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {account.margin.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Zap className="h-4 w-4" />
                    <span>Free Margin</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {account.freeMargin.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Target className="h-4 w-4" />
                    <span>Leverage</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    1:{account.leverage}
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Award className="h-4 w-4" />
                    <span>Platform</span>
                  </div>
                  <div className="text-lg font-semibold text-white">
                    {account.platform.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Profit Stats */}
              {account.profit !== undefined && (
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <h4 className="text-base font-medium text-white mb-4">Profit Statistics</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                      <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <DollarSign className="h-4 w-4" />
                        <span className="text-sm">Total Profit</span>
                      </div>
                      <div className={`text-lg font-semibold ${
                        account.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {account.profit >= 0 ? '+' : ''}
                        {account.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                      </div>
                    </div>
                    
                    <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                      <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Profit %</span>
                      </div>
                      <div className={`text-lg font-semibold ${
                        account.profitPercentage && account.profitPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {account.profitPercentage && (account.profitPercentage >= 0 ? '+' : '')}
                        {account.profitPercentage?.toFixed(2)}%
                      </div>
                    </div>
                    
                    <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                      <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <Activity className="h-4 w-4" />
                        <span className="text-sm">Win Rate</span>
                      </div>
                      <div className="text-lg font-semibold text-emerald-400">
                        {account.winRate}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trading Activity */}
              {account.trades && (
                <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                  <h4 className="text-base font-medium text-white mb-4">Trading Activity</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                      <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <BarChart2 className="h-4 w-4" />
                        <span className="text-sm">Total Trades</span>
                      </div>
                      <div className="text-lg font-semibold text-white">
                        {account.trades.total}
                      </div>
                    </div>
                    
                    <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                      <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm">Winning Trades</span>
                      </div>
                      <div className="text-lg font-semibold text-emerald-400">
                        {account.trades.winning}
                      </div>
                    </div>
                    
                    <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                      <div className="flex items-center space-x-2 text-gray-400 mb-1">
                        <TrendingDown className="h-4 w-4" />
                        <span className="text-sm">Losing Trades</span>
                      </div>
                      <div className="text-lg font-semibold text-red-400">
                        {account.trades.losing}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-400">Win Rate</span>
                      <span className="text-emerald-400">{account.winRate}%</span>
                    </div>
                    <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                        style={{ width: `${account.winRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Account Details */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Account Details</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Login</div>
                    <div className="text-white">{account.login}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Server</div>
                    <div className="text-white">{account.server}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Platform</div>
                    <div className="text-white">{account.platform.toUpperCase()}</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Currency</div>
                    <div className="text-white">{account.currency}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Trades Tab */}
          {activeTab === 'trades' && (
            <>
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Recent Trades</h4>
                
                <div className="space-y-3">
                  {recentTrades.map(trade => (
                    <div 
                      key={trade.id}
                      className="glass-panel rounded-lg p-3 hover:bg-dark-200/30 transition-colors cursor-pointer border border-dark-300/30 hover:border-accent/20"
                      onClick={() => toggleTradeExpand(trade.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`p-1.5 rounded-lg ${
                            trade.type === 'buy' 
                              ? 'bg-emerald-500/10' 
                              : 'bg-red-500/10'
                          }`}>
                            {trade.type === 'buy' ? (
                              <TrendingUp className="h-4 w-4 text-emerald-400" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-white">{trade.symbol}</div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {trade.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className={`text-sm font-medium ${
                            trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                          }`}>
                            {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
                          </div>
                          {expandedTrades.includes(trade.id) ? (
                            <ChevronUp className="h-4 w-4 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedTrades.includes(trade.id) && (
                        <div className="mt-3 pt-3 border-t border-dark-300/30 grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <div className="text-xs text-gray-400 mb-0.5">Type</div>
                            <div className={`text-sm ${
                              trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'
                            }`}>
                              {trade.type.toUpperCase()}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-0.5">Open Price</div>
                            <div className="text-sm text-white">{trade.openPrice}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-0.5">Current Price</div>
                            <div className="text-sm text-white">{trade.currentPrice}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-0.5">Status</div>
                            <div className={`text-sm ${
                              trade.status === 'open' ? 'text-accent' : 'text-gray-400'
                            }`}>
                              {trade.status.toUpperCase()}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Symbol Performance */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Symbol Performance</h4>
                
                <div className="space-y-4">
                  {symbolPerformance.map(symbol => (
                    <div key={symbol.symbol} className="glass-panel rounded-lg p-3 border border-dark-300/30">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-dark-200/50 rounded-lg">
                            <Globe className="h-4 w-4 text-accent" />
                          </div>
                          <span className="text-white">{symbol.symbol}</span>
                        </div>
                        <div className={`text-sm font-medium ${
                          symbol.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {symbol.profit >= 0 ? '+' : ''}{symbol.profit.toFixed(2)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Trades</span>
                            <span className="text-white">{symbol.trades}</span>
                          </div>
                          <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-accent rounded-full"
                              style={{ width: `${(symbol.trades / 12) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Win Rate</span>
                            <span className="text-emerald-400">{symbol.winRate}%</span>
                          </div>
                          <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-400 rounded-full"
                              style={{ width: `${symbol.winRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <>
              {/* Weekly Activity */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <BarChart2 className="h-5 w-5 text-accent" />
                    <h4 className="text-base font-medium text-white">Weekly Activity</h4>
                  </div>
                  <div className="text-xs text-emerald-400">Wednesday is your best day</div>
                </div>

                <div className="h-40 flex items-end space-x-2">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex-1 flex flex-col items-center">
                      <div className="relative w-full flex flex-col items-center justify-end h-32">
                        <div 
                          className={`w-full rounded-t-sm ${
                            day.profit >= 0 
                              ? 'bg-gradient-to-t from-emerald-500/80 to-emerald-500/30' 
                              : 'bg-gradient-to-t from-red-500/80 to-red-500/30'
                          }`}
                          style={{ 
                            height: `${Math.min(Math.abs(day.profit) / 10, 100)}%`,
                            minHeight: day.trades > 0 ? '10%' : '0%'
                          }}
                        ></div>
                        {day.trades > 0 && (
                          <div className="absolute bottom-full mb-1 text-xs text-center w-full">
                            <span className={day.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                              {day.profit >= 0 ? '+' : ''}{day.profit}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-2">{day.day}</div>
                      <div className="text-xs text-gray-500">{day.trades}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Performance Metrics</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Win Rate</span>
                        <span className="text-emerald-400">{account.winRate}%</span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: `${account.winRate}%` }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Profit Factor</span>
                        <span className="text-white">2.8</span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-accent to-purple-500 rounded-full"
                          style={{ width: '70%' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Risk/Reward</span>
                        <span className="text-white">1:2.5</span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                          style={{ width: '62.5%' }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Avg. Trade</span>
                        <span className="text-white">$35.50</span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                          style={{ width: '55%' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Max Drawdown</span>
                        <span className="text-red-400">8.5%</span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                          style={{ width: '8.5%' }}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-400">Sharpe Ratio</span>
                        <span className="text-emerald-400">2.1</span>
                      </div>
                      <div className="h-2 bg-dark-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                          style={{ width: '70%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Calendar */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Trading Calendar</h4>
                <TradeActivityCalendar />
              </div>
            </>
          )}
          
          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-accent/30 text-accent 
                       rounded-lg hover:bg-accent/10 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}