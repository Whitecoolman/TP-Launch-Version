import React, { useState, useEffect } from 'react';
import { 
  Wallet, Plus, RefreshCw, Search, Filter, ChevronDown, 
  TrendingUp, TrendingDown, DollarSign, Clock, Shield, 
  Zap, Award, Target, ArrowRight, CheckCircle2, AlertTriangle,
  BarChart2, Layers, Grid, List, Settings, ExternalLink, 
  Trash2, Edit2, Eye, Calendar, Activity, Users, Webhook,
  Globe, Briefcase, Lock, Info, HelpCircle
} from 'lucide-react';
import { useMetaAccounts, useRefreshMetaAccount, useDeleteMetaAccount } from '../hooks/useMetaAccount';
import AddAccountModal from '../components/metatrader/AddAccountModal';
import AccountStatsModal from '../components/metatrader/AccountStatsModal';
import LivePerformanceChart from '../components/charts/LivePerformanceChart';
import TradeActivityCalendar from '../components/dashboard/TradeActivityCalendar';

interface TradingAccountsViewProps {
  onLogin?: () => void;
  isLoggedIn?: boolean;
}

export default function TradingAccountsView({ onLogin, isLoggedIn = false }: TradingAccountsViewProps) {
  const { data: accounts = [], isLoading, refetch } = useMetaAccounts();
  const refreshAccount = useRefreshMetaAccount();
  const deleteAccount = useDeleteMetaAccount();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showAccountOverview, setShowAccountOverview] = useState(true);
  const [selectedAccountForChart, setSelectedAccountForChart] = useState<string>('all');
  
  // Webhook section
  const [webhooks, setWebhooks] = useState([
    {
      id: 'yt-gold1',
      name: 'YT GOLD1',
      symbols: ['XAUUSD'],
      isActive: true,
      status: 'connected',
      type: 'advanced',
      lastTrigger: '5 minutes ago',
      successRate: 92.5,
      totalTrades: 145,
      todayTrades: 8,
      todayWins: 7,
      todayLosses: 1,
      todayProfit: 769.11,
      color: 'from-accent/20 to-accent/5'
    },
    {
      id: 'pro-signals',
      name: 'Pro Signals',
      symbols: ['EURUSD', 'GBPUSD', 'USDJPY'],
      isActive: true,
      status: 'connected',
      type: 'premium',
      lastTrigger: '30 minutes ago',
      successRate: 88.3,
      totalTrades: 256,
      todayTrades: 5,
      todayWins: 4,
      todayLosses: 1,
      todayProfit: 325.50,
      color: 'from-purple-500/20 to-purple-600/5'
    }
  ]);

  // Filter accounts
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          account.login.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          account.server.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || account.type === filterType;
    
    return matchesSearch && matchesType;
  });

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  // Handle account refresh
  const handleRefreshAccount = async (accountId: string) => {
    try {
      await refreshAccount.mutateAsync(accountId);
    } catch (error) {
      console.error('Failed to refresh account:', error);
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async (accountId: string) => {
    if (window.confirm('Are you sure you want to delete this account?')) {
      try {
        await deleteAccount.mutateAsync(accountId);
      } catch (error) {
        console.error('Failed to delete account:', error);
      }
    }
  };

  // Handle view account stats
  const handleViewStats = (accountId: string) => {
    setSelectedAccount(accountId);
    setShowStatsModal(true);
  };

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);
  const totalEquity = accounts.reduce((sum, account) => sum + account.equity, 0);
  const totalProfit = totalEquity - totalBalance;
  const profitPercentage = totalBalance > 0 ? (totalProfit / totalBalance) * 100 : 0;

  // Get account by ID
  const getAccountById = (id: string) => {
    return accounts.find(account => account.id === id);
  };

  // Supported platforms data
  const supportedPlatforms = [
    { name: "Hankox ActTrader", icon: "💹", description: "Premium multi-broker solution with unlimited accounts", featured: true, link: "https://hankox.com" },
    { name: "TradingView", icon: "📊", description: "Seamless TradingView webhook integration", link: "https://www.tradingview.com" },
    { name: "MetaTrader 4 & 5", icon: "📈", description: "Industry standard MT4/MT5 platforms", link: "https://www.metatrader4.com" },
    { name: "TradeLocker", icon: "🔒", description: "Professional trading platform integration", link: "https://tradelocker.com" }
  ];

  // Upcoming platforms
  const upcomingPlatforms = [
    "TradeStation", "NinjaTrader", "cTrader", "Coinbase", "Binance", "Interactive Brokers"
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-accent/30 to-purple-500/10 rounded-lg shadow-lg shadow-accent/5">
            <Wallet className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight text-shadow-glow">Trading Accounts</h1>
            <p className="text-gray-400 mt-1">Manage your connected trading accounts</p>
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
            onClick={() => setShowAddModal(true)}
            className="premium-button flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Account
          </button>
        </div>
      </div>

      {/* Account Overview - Collapsible */}
      <div className="glass-panel rounded-xl p-4 md:p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <BarChart2 className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-medium text-white">Account Overview</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Select Account:</span>
                <select 
                  value={selectedAccountForChart}
                  onChange={(e) => setSelectedAccountForChart(e.target.value)}
                  className="bg-dark-200/50 text-white rounded-lg px-2 py-1 text-sm border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
                >
                  <option value="all">All Accounts</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name} ({account.type.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowAccountOverview(!showAccountOverview)}
            className="text-sm text-accent hover:text-accent-dark transition-colors flex items-center"
          >
            {showAccountOverview ? 'Hide Overview' : 'Show Overview'}
            <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${showAccountOverview ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {showAccountOverview && (
          <div className="mt-4">
            <LivePerformanceChart account={selectedAccountForChart} />
          </div>
        )}
      </div>

      {/* Connected Webhooks Section */}
      <div className="glass-panel rounded-xl p-4 md:p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
              <Webhook className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-medium text-white">Connected Webhooks</h2>
          </div>
          <a 
            href="/signals"
            className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center"
          >
            View All Webhooks
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {webhooks.map(webhook => (
            <div 
              key={webhook.id}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 
                        hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}
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
                        <span className="text-xs text-gray-400">{webhook.lastTrigger}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">
                    +${webhook.todayProfit.toFixed(2)}
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
                      {webhook.todayTrades}
                    </div>
                  </div>
                </div>

                {/* Symbols */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {webhook.symbols.map(symbol => (
                    <span 
                      key={symbol}
                      className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300
                               border border-dark-300/30 backdrop-blur-sm"
                    >
                      {symbol}
                    </span>
                  ))}
                </div>

                {/* View Details Button */}
                <a 
                  href="/signals"
                  className="w-full py-1.5 text-xs bg-gradient-to-r from-dark-200/50 to-dark-200/30 text-gray-300 rounded-lg
                           border border-dark-300/30 hover:bg-dark-200/80 hover:text-white transition-all
                           flex items-center justify-center space-x-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[140px]">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Accounts</option>
              <option value="demo">Demo Only</option>
              <option value="live">Live Only</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-200/50'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-gray-400 hover:text-white hover:bg-dark-200/50'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-dark-200/50 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Accounts Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAccounts.map(account => (
            <div 
              key={account.id}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 
                        hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                account.type === 'demo' 
                  ? 'from-blue-500/20 via-blue-600/10 to-blue-500/5' 
                  : 'from-emerald-500/20 via-emerald-600/10 to-emerald-500/5'
              } opacity-20`} />
              
              {/* Content */}
              <div className="relative glass-panel rounded-xl p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      account.type === 'demo' 
                        ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/5' 
                        : 'bg-gradient-to-br from-emerald-500/20 to-emerald-600/5'
                    }`}>
                      <Wallet className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-white">{account.name}</h3>
                      <div className="flex items-center space-x-2 mt-0.5">
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
                              ? 'bg-emerald-400 animate-pulse' 
                              : account.connectionStatus === 'connecting'
                              ? 'bg-yellow-400 animate-pulse'
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
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleRefreshAccount(account.id)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                               rounded-lg transition-all"
                      title="Refresh account"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteAccount(account.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-dark-200/50 
                               rounded-lg transition-all"
                      title="Delete account"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Account Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                    <div className="text-xs text-gray-400 mb-1">Balance</div>
                    <div className="text-base font-medium text-white">
                      {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                    <div className="text-xs text-gray-400 mb-1">Equity</div>
                    <div className={`text-base font-medium ${
                      account.equity >= account.balance ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {account.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                    </div>
                  </div>
                </div>

                {/* Profit & Stats */}
                <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs text-gray-400">Profit/Loss</div>
                    <div className={`text-sm font-medium ${
                      (account.equity - account.balance) >= 0 ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {(account.equity - account.balance) >= 0 ? '+' : ''}
                      {(account.equity - account.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                    </div>
                  </div>
                  
                  {account.profit !== undefined && (
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs text-gray-400">Total Profit</div>
                      <div className={`text-sm font-medium ${
                        account.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {account.profit >= 0 ? '+' : ''}
                        {account.profit.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                      </div>
                    </div>
                  )}
                  
                  {account.profitPercentage !== undefined && (
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-400">Profit %</div>
                      <div className={`text-sm font-medium ${
                        account.profitPercentage >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {account.profitPercentage >= 0 ? '+' : ''}
                        {account.profitPercentage.toFixed(2)}%
                      </div>
                    </div>
                  )}
                </div>

                {/* Trading Stats */}
                {account.trades && (
                  <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 mb-4">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1">Trades</div>
                        <div className="text-sm font-medium text-white">{account.trades.total}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1">Winning</div>
                        <div className="text-sm font-medium text-emerald-400">{account.trades.winning}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-400 mb-1">Losing</div>
                        <div className="text-sm font-medium text-red-400">{account.trades.losing}</div>
                      </div>
                    </div>
                    
                    {account.winRate !== undefined && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400">Win Rate</span>
                          <span className="text-emerald-400">{account.winRate}%</span>
                        </div>
                        <div className="mt-1 h-1.5 bg-dark-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                            style={{ width: `${account.winRate}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Account Info */}
                <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 mb-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Login</div>
                      <div className="text-sm font-medium text-white">{account.login}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-0.5">Server</div>
                      <div className="text-sm font-medium text-white">{account.server}</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleViewStats(account.id)}
                    className="flex-1 py-2 text-sm bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 text-white rounded-lg
                             border border-accent/30 hover:border-accent/50 transition-all
                             flex items-center justify-center"
                  >
                    <Eye className="h-4 w-4 mr-1.5" />
                    View Stats
                  </button>
                  
                  <button 
                    className="flex-1 py-2 text-sm bg-gradient-to-r from-dark-200/50 to-dark-200/30 text-gray-300 rounded-lg
                             border border-dark-300/30 hover:bg-dark-200/80 hover:text-white transition-all
                             flex items-center justify-center"
                  >
                    <Settings className="h-4 w-4 mr-1.5" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Account Card */}
          <div 
            className="glass-panel rounded-xl p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 
                     flex flex-col items-center justify-center text-center cursor-pointer h-full min-h-[350px]"
            onClick={() => setShowAddModal(true)}
          >
            <div className="p-4 bg-accent/10 rounded-full mb-4">
              <Plus className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Add Trading Account</h3>
            <p className="text-gray-400 mb-6 max-w-xs">
              Connect a new trading account to start automated trading
            </p>
            <button className="premium-button px-6 py-2 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Add Account
            </button>
          </div>
        </div>
      ) : (
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-dark-200/50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Account</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Login</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Server</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Balance</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Equity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Profit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-300/30">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-dark-200/30 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${
                          account.type === 'demo' 
                            ? 'bg-blue-500/10' 
                            : 'bg-emerald-500/10'
                        }`}>
                          <Wallet className={`h-5 w-5 ${
                            account.type === 'demo' 
                              ? 'text-blue-400' 
                              : 'text-emerald-400'
                          }`} />
                        </div>
                        <span className="text-white font-medium">{account.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`px-2 py-1 rounded-full text-xs inline-flex items-center ${
                        account.type === 'demo' 
                          ? 'bg-blue-500/20 text-blue-400' 
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {account.type.toUpperCase()}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-300">
                      {account.login}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-300">
                      {account.server}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-white">
                      {account.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={
                        account.equity >= account.balance ? 'text-emerald-400' : 'text-red-400'
                      }>
                        {account.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={
                        (account.equity - account.balance) >= 0 ? 'text-emerald-400' : 'text-red-400'
                      }>
                        {(account.equity - account.balance) >= 0 ? '+' : ''}
                        {(account.equity - account.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })} {account.currency}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full mr-2 ${
                          account.connectionStatus === 'connected' 
                            ? 'bg-emerald-400 animate-pulse' 
                            : account.connectionStatus === 'connecting'
                            ? 'bg-yellow-400 animate-pulse'
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
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewStats(account.id)}
                          className="p-1.5 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                          title="View stats"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRefreshAccount(account.id)}
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-colors"
                          title="Refresh account"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAccount(account.id)}
                          className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-dark-200/50 rounded-lg transition-colors"
                          title="Delete account"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAccounts.length === 0 && (
            <div className="py-8 text-center">
              <p className="text-gray-400">No accounts found. Add your first trading account to get started.</p>
              <button 
                onClick={() => setShowAddModal(true)}
                className="mt-4 premium-button px-6 py-2 flex items-center mx-auto"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Account
              </button>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {accounts.length === 0 && !isLoading && (
        <div className="glass-panel rounded-xl p-8 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 text-center">
          <div className="flex flex-col items-center justify-center">
            <div className="p-4 bg-accent/10 rounded-full mb-4">
              <Wallet className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No Trading Accounts</h3>
            <p className="text-gray-400 max-w-md mb-6">
              Connect your first trading account to start automated trading with webhooks and signals.
            </p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="premium-button px-6 py-2 flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Trading Account
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="glass-panel rounded-xl p-8 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 text-center">
          <div className="flex flex-col items-center justify-center">
            <RefreshCw className="h-8 w-8 text-accent animate-spin mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">Loading Accounts</h3>
            <p className="text-gray-400">
              Retrieving your trading accounts...
            </p>
          </div>
        </div>
      )}

      {/* Supported Platforms Section */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
        <h3 className="text-xl font-medium text-white mb-4">Supported Trading Platforms</h3>
        <p className="text-gray-400 mb-6">Connect all your favorite trading platforms with one lifetime subscription</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
          {supportedPlatforms.map((platform, index) => (
            <a 
              key={index}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`glass-panel rounded-xl p-4 md:p-6 text-center transform hover:scale-105 transition-all duration-300 border ${
                platform.featured 
                  ? 'border-accent/30 bg-gradient-to-br from-accent/10 to-transparent' 
                  : 'border-dark-300/30 hover:border-accent/20'
              }`}
            >
              <div className="text-3xl md:text-4xl mb-3 md:mb-4">{platform.icon}</div>
              <h4 className="text-base md:text-lg font-medium text-white mb-2">
                {platform.name}
                {platform.featured && (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-accent/20 text-accent">
                    Featured
                  </span>
                )}
              </h4>
              <p className="text-gray-400 text-sm mb-4">{platform.description}</p>
              <div className="flex items-center justify-center text-accent text-sm">
                <span>Learn more</span>
                <ExternalLink className="h-4 w-4 ml-1" />
              </div>
            </a>
          ))}
        </div>

        {/* Coming Soon Platforms */}
        <div className="mt-6">
          <h4 className="text-lg font-medium text-white text-center mb-4">Coming Soon</h4>
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {upcomingPlatforms.map((platform) => (
              <div key={platform} className="px-3 py-2 bg-dark-200/50 text-gray-300 rounded-lg border border-dark-300/30">
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Account Modal */}
      <AddAccountModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        selectedBroker={selectedBroker}
        onSuccess={() => {
          refetch();
          setShowAddModal(false);
          setSelectedBroker(null);
        }}
      />

      {/* Account Stats Modal */}
      {selectedAccount && (
        <AccountStatsModal
          isOpen={showStatsModal}
          onClose={() => setShowStatsModal(false)}
          account={getAccountById(selectedAccount)}
        />
      )}
    </div>
  );
}