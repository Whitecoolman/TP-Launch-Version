import React, { useState } from 'react';
import { 
  Bell, Filter, Search, TrendingUp, Clock, DollarSign, 
  CheckCircle2, AlertTriangle, Webhook, Users, Calendar,
  ArrowRight, ChevronDown, ChevronUp, Zap, Shield, 
  PlayCircle, Edit3, X, TrendingDown, BarChart2, 
  Settings, Trash2, Copy, ExternalLink, MessageCircle,
  Plus, Check
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'webhook' | 'copy_trade' | 'system';
  webhookAction?: 'market_execution' | 'modify_order' | 'close_trade';
  title: string;
  message: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
  tradeStatus?: 'active' | 'closed';
  profitAmount?: number;
  profitPercentage?: number;
  traderAvatar?: string;
  // Additional trade details
  symbol?: string;
  entryPrice?: number;
  currentPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  volume?: number;
  duration?: string;
  tradeType?: 'buy' | 'sell';
  severity?: 'info' | 'warning' | 'error';
  // Webhook details
  webhookId?: string;
  webhookName?: string;
  webhookColor?: string;
  webhookUrl?: string;
}

interface WebhookGroup {
  id: string;
  name: string;
  color: string;
  alerts: Alert[];
  url?: string;
}

export default function AlertsView() {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeframe, setTimeframe] = useState('today');
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [expandedAlerts, setExpandedAlerts] = useState<string[]>([]);
  const [expandedWebhooks, setExpandedWebhooks] = useState<string[]>(['yt-gold1', 'pro-signals']);
  const [copiedWebhook, setCopiedWebhook] = useState<string | null>(null);

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'webhook',
      webhookAction: 'market_execution',
      title: 'EURUSD Buy Signal',
      message: 'Buy EURUSD at 1.0950, SL: 1.0930, TP: 1.0980',
      timestamp: '2 minutes ago',
      status: 'success',
      tradeStatus: 'active',
      profitAmount: 125.50,
      profitPercentage: 1.25,
      symbol: 'EURUSD',
      entryPrice: 1.0950,
      currentPrice: 1.0965,
      stopLoss: 1.0930,
      takeProfit: 1.0980,
      volume: 1.0,
      duration: '2h 15m',
      tradeType: 'buy',
      webhookId: 'yt-gold1',
      webhookName: 'YT GOLD1',
      webhookColor: 'from-accent/20 to-accent/5',
      webhookUrl: 'https://api.automatedtrader.com/webhook/yt-gold1-abc123'
    },
    {
      id: '2',
      type: 'copy_trade',
      title: 'Alex Trading',
      message: 'Opened XAUUSD long position',
      timestamp: '5 minutes ago',
      status: 'pending',
      tradeStatus: 'active',
      profitAmount: -45.20,
      profitPercentage: -0.45,
      traderAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80',
      symbol: 'XAUUSD',
      entryPrice: 2015.50,
      currentPrice: 2014.80,
      stopLoss: 2010.00,
      takeProfit: 2025.00,
      volume: 0.5,
      duration: '45m',
      tradeType: 'buy',
      webhookId: 'pro-signals',
      webhookName: 'Pro Signals',
      webhookColor: 'from-purple-500/20 to-purple-600/5',
      webhookUrl: 'https://api.automatedtrader.com/webhook/pro-signals-def456'
    },
    {
      id: '3',
      type: 'webhook',
      webhookAction: 'modify_order',
      title: 'NAS100 Modify Order',
      message: 'Modified SL to 17680, TP to 17580',
      timestamp: '10 minutes ago',
      status: 'success',
      tradeStatus: 'active',
      profitAmount: 180.30,
      profitPercentage: 1.8,
      symbol: 'NAS100',
      entryPrice: 17550,
      currentPrice: 17620,
      stopLoss: 17680,
      takeProfit: 17580,
      volume: 1.0,
      duration: '1h 30m',
      tradeType: 'sell',
      webhookId: 'yt-gold1',
      webhookName: 'YT GOLD1',
      webhookColor: 'from-accent/20 to-accent/5',
      webhookUrl: 'https://api.automatedtrader.com/webhook/yt-gold1-abc123'
    },
    {
      id: '4',
      type: 'webhook',
      webhookAction: 'close_trade',
      title: 'GBPUSD Close Trade',
      message: 'Closed GBPUSD position at 1.2650',
      timestamp: '15 minutes ago',
      status: 'success',
      tradeStatus: 'closed',
      profitAmount: 345.60,
      profitPercentage: 3.45,
      symbol: 'GBPUSD',
      entryPrice: 1.2600,
      currentPrice: 1.2650,
      volume: 2.0,
      duration: '4h 20m',
      tradeType: 'buy',
      webhookId: 'gold-test',
      webhookName: 'GOLD TEST',
      webhookColor: 'from-emerald-500/20 to-emerald-500/5',
      webhookUrl: 'https://api.automatedtrader.com/webhook/gold-test-ghi789'
    },
    {
      id: '5',
      type: 'copy_trade',
      title: 'Pro Signals',
      message: 'Closed BTCUSD position with +2.3% profit',
      timestamp: '20 minutes ago',
      status: 'success',
      tradeStatus: 'closed',
      profitAmount: 230.50,
      profitPercentage: 2.3,
      traderAvatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80',
      symbol: 'BTCUSD',
      entryPrice: 42150,
      currentPrice: 42300,
      volume: 0.1,
      duration: '3h 45m',
      tradeType: 'buy',
      webhookId: 'pro-signals',
      webhookName: 'Pro Signals',
      webhookColor: 'from-purple-500/20 to-purple-600/5',
      webhookUrl: 'https://api.automatedtrader.com/webhook/pro-signals-def456'
    },
    {
      id: '6',
      type: 'system',
      title: 'Risk Warning',
      message: 'Daily loss limit approaching (75% of limit reached)',
      timestamp: '30 minutes ago',
      status: 'pending',
      severity: 'warning',
      webhookId: 'system',
      webhookName: 'System',
      webhookColor: 'from-yellow-500/20 to-yellow-600/5'
    },
    {
      id: '7',
      type: 'system',
      title: 'Account Connection',
      message: 'MetaTrader account successfully connected',
      timestamp: '1 hour ago',
      status: 'success',
      severity: 'info',
      webhookId: 'system',
      webhookName: 'System',
      webhookColor: 'from-blue-500/20 to-blue-600/5'
    },
    {
      id: '8',
      type: 'system',
      title: 'API Error',
      message: 'Failed to connect to Binance API. Please check your credentials.',
      timestamp: '2 hours ago',
      status: 'error',
      severity: 'error',
      webhookId: 'system',
      webhookName: 'System',
      webhookColor: 'from-red-500/20 to-red-600/5'
    },
    {
      id: '9',
      type: 'webhook',
      webhookAction: 'market_execution',
      title: 'GBPJPY Buy Signal',
      message: 'Buy GBPJPY at 185.50, SL: 185.00, TP: 186.50',
      timestamp: '3 hours ago',
      status: 'success',
      tradeStatus: 'active',
      profitAmount: 75.30,
      profitPercentage: 0.85,
      symbol: 'GBPJPY',
      entryPrice: 185.50,
      currentPrice: 185.75,
      stopLoss: 185.00,
      takeProfit: 186.50,
      volume: 0.5,
      duration: '3h',
      tradeType: 'buy',
      webhookId: 'youtube-1',
      webhookName: 'Youtube 1',
      webhookColor: 'from-red-500/20 to-red-600/5',
      webhookUrl: 'https://api.automatedtrader.com/webhook/youtube-1-jkl012'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (alert.symbol && alert.symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (alert.webhookName && alert.webhookName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  // Group alerts by webhook
  const groupedAlerts: WebhookGroup[] = filteredAlerts.reduce((groups, alert) => {
    if (!alert.webhookId) return groups;
    
    const existingGroup = groups.find(g => g.id === alert.webhookId);
    if (existingGroup) {
      existingGroup.alerts.push(alert);
    } else {
      groups.push({
        id: alert.webhookId,
        name: alert.webhookName || 'Unknown',
        color: alert.webhookColor || 'from-gray-500/20 to-gray-500/5',
        alerts: [alert],
        url: alert.webhookUrl
      });
    }
    return groups;
  }, [] as WebhookGroup[]);

  const toggleAlertExpand = (alertId: string) => {
    setExpandedAlerts(prev => 
      prev.includes(alertId) 
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  };

  const toggleWebhookExpand = (webhookId: string) => {
    setExpandedWebhooks(prev => 
      prev.includes(webhookId) 
        ? prev.filter(id => id !== webhookId)
        : [...prev, webhookId]
    );
  };

  const handleCopyWebhookUrl = (url: string, webhookId: string) => {
    if (!url) return;
    
    navigator.clipboard.writeText(url);
    setCopiedWebhook(webhookId);
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setCopiedWebhook(null);
    }, 2000);
  };

  const getStatusIcon = (status: string, severity?: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      default:
        if (severity === 'warning') return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
        if (severity === 'error') return <AlertTriangle className="h-5 w-5 text-red-400" />;
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webhook':
        return <Webhook className="h-5 w-5 text-accent" />;
      case 'copy_trade':
        return <Users className="h-5 w-5 text-purple-400" />;
      case 'system':
        return <Shield className="h-5 w-5 text-blue-400" />;
      default:
        return null;
    }
  };

  const getWebhookActionIcon = (action?: string) => {
    switch (action) {
      case 'market_execution':
        return <PlayCircle className="h-4 w-4 text-emerald-400" />;
      case 'modify_order':
        return <Edit3 className="h-4 w-4 text-yellow-400" />;
      case 'close_trade':
        return <X className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getWebhookActionLabel = (action?: string) => {
    switch (action) {
      case 'market_execution':
        return 'Market Execution';
      case 'modify_order':
        return 'Modify Order';
      case 'close_trade':
        return 'Close Trade';
      default:
        return '';
    }
  };

  const getSeverityClass = (severity?: string) => {
    switch (severity) {
      case 'warning':
        return 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400';
      case 'error':
        return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'info':
      default:
        return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
    }
  };

  const getWebhookTypeIcon = (webhookId: string) => {
    if (webhookId === 'system') return <Shield className="h-6 w-6 text-blue-400" />;
    if (webhookId === 'pro-signals') return <Users className="h-6 w-6 text-purple-400" />;
    return <Webhook className="h-6 w-6 text-accent" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-accent/30 to-purple-500/10 rounded-lg shadow-lg shadow-accent/5">
            <Bell className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight text-shadow-glow">Alerts</h1>
            <p className="text-gray-400 mt-1">Monitor your trading signals and notifications</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                         border border-dark-300/30 hover:bg-dark-200/50 transition-colors">
            <Calendar className="h-4 w-4" />
            <span>History</span>
          </button>
          <button className="premium-button flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>Configure</span>
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg bg-dark-200/30 p-1 border border-dark-300/30">
            {[
              { id: 'all', label: 'All Alerts' },
              { id: 'webhook', label: 'Webhook' },
              { id: 'copy_trade', label: 'Copy Trade' },
              { id: 'system', label: 'System' }
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  filterType === type.id 
                    ? 'bg-accent text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="h-10 pl-4 pr-10 bg-dark-200/30 text-gray-300 rounded-lg 
                       border border-dark-300/30 appearance-none cursor-pointer
                       focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg">
              <Bell className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Alerts</div>
              <div className="text-2xl font-semibold text-white">{alerts.length}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Last 24 hours</span>
            <span className="text-emerald-400">+5 new</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Active Trades</div>
              <div className="text-2xl font-semibold text-white">
                {alerts.filter(a => a.tradeStatus === 'active').length}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>From alerts</span>
            <span className="text-emerald-400">+3 today</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Today's Profit</div>
              <div className="text-2xl font-semibold text-emerald-400">
                +${alerts.reduce((sum, alert) => sum + (alert.profitAmount || 0), 0).toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>From all trades</span>
            <span className="text-emerald-400">+12.5%</span>
          </div>
        </div>
      </div>

      {/* Alerts List Grouped by Webhook */}
      <div className="space-y-6">
        {groupedAlerts.length > 0 ? (
          groupedAlerts.map((group) => (
            <div key={group.id} className="glass-panel rounded-xl overflow-hidden border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
              {/* Webhook Header with Gradient */}
              <div className={`relative bg-gradient-to-r ${group.color} p-5`}>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.1),transparent_70%)]"></div>
                
                <div className="relative flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 bg-dark-100/30 backdrop-blur-sm rounded-xl border border-dark-300/30">
                      {getWebhookTypeIcon(group.id)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{group.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center text-xs">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5"></div>
                          <span className="text-emerald-400 uppercase font-medium tracking-wide">Active</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-300">{group.alerts.length} alerts</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => toggleWebhookExpand(group.id)}
                      className="p-2 text-white/70 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                    >
                      {expandedWebhooks.includes(group.id) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                    {group.id !== 'system' && group.url && (
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleCopyWebhookUrl(group.url || '', group.id)}
                          className="p-2 text-white/70 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                          title="Copy webhook URL"
                        >
                          {copiedWebhook === group.id ? (
                            <Check className="h-5 w-5 text-emerald-400" />
                          ) : (
                            <Copy className="h-5 w-5" />
                          )}
                        </button>
                        <button className="p-2 text-white/70 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                          <Settings className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Alerts for this webhook */}
              {expandedWebhooks.includes(group.id) && (
                <div className="p-4 space-y-4">
                  {group.alerts.map((alert) => (
                    <div 
                      key={alert.id}
                      className="glass-panel rounded-xl p-4 hover:bg-dark-200/30 transition-all duration-300 border border-dark-300/30 hover:border-accent/20 cursor-pointer"
                      onClick={() => toggleAlertExpand(alert.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-2 bg-dark-200/50 rounded-lg">
                            {getTypeIcon(alert.type)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              {alert.type === 'copy_trade' && alert.traderAvatar && (
                                <img 
                                  src={alert.traderAvatar} 
                                  alt={alert.title}
                                  className="w-6 h-6 rounded-full border border-accent/20" 
                                />
                              )}
                              <h3 className="text-white font-medium">{alert.title}</h3>
                              {alert.type === 'webhook' && alert.webhookAction && (
                                <div className="flex items-center space-x-1.5 px-2 py-1 rounded-full bg-dark-200/50">
                                  {getWebhookActionIcon(alert.webhookAction)}
                                  <span className="text-xs text-gray-300">
                                    {getWebhookActionLabel(alert.webhookAction)}
                                  </span>
                                </div>
                              )}
                              {alert.type === 'system' && alert.severity && (
                                <div className={`flex items-center space-x-1.5 px-2 py-1 rounded-full ${getSeverityClass(alert.severity)}`}>
                                  <span className="text-xs capitalize">{alert.severity}</span>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm">{alert.message}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-gray-500">{alert.timestamp}</span>
                              {alert.tradeStatus && (
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  alert.tradeStatus === 'active' 
                                    ? 'bg-accent/10 text-accent' 
                                    : 'bg-gray-500/10 text-gray-400'
                                }`}>
                                  {alert.tradeStatus.charAt(0).toUpperCase() + alert.tradeStatus.slice(1)}
                                </span>
                              )}
                              {alert.profitAmount !== undefined && (
                                <div className={`flex items-center ${
                                  alert.profitAmount >= 0 ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                  {alert.profitAmount >= 0 ? (
                                    <TrendingUp className="h-4 w-4 mr-1" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4 mr-1" />
                                  )}
                                  <span className="font-medium">
                                    {alert.profitAmount >= 0 ? '+' : ''}{alert.profitAmount.toFixed(2)} USD
                                    {alert.profitPercentage && ` (${alert.profitAmount >= 0 ? '+' : ''}${alert.profitPercentage.toFixed(2)}%)`}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(alert.status, alert.severity)}
                          {expandedAlerts.includes(alert.id) ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedAlerts.includes(alert.id) && alert.symbol && (
                        <div className="mt-4 pt-4 border-t border-dark-300/30">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="glass-panel rounded-lg p-3">
                              <div className="text-xs text-gray-400 mb-1">Symbol</div>
                              <div className="text-sm font-medium text-white">{alert.symbol}</div>
                            </div>
                            
                            {alert.entryPrice && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Entry Price</div>
                                <div className="text-sm font-medium text-white">{alert.entryPrice}</div>
                              </div>
                            )}
                            
                            {alert.currentPrice && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Current Price</div>
                                <div className={`text-sm font-medium ${
                                  alert.tradeType === 'buy' 
                                    ? alert.currentPrice > alert.entryPrice ? 'text-emerald-400' : 'text-red-400'
                                    : alert.currentPrice < alert.entryPrice ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                  {alert.currentPrice}
                                </div>
                              </div>
                            )}
                            
                            {alert.volume && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Volume</div>
                                <div className="text-sm font-medium text-white">{alert.volume} lots</div>
                              </div>
                            )}
                            
                            {alert.stopLoss && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Stop Loss</div>
                                <div className="text-sm font-medium text-red-400">{alert.stopLoss}</div>
                              </div>
                            )}
                            
                            {alert.takeProfit && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Take Profit</div>
                                <div className="text-sm font-medium text-emerald-400">{alert.takeProfit}</div>
                              </div>
                            )}
                            
                            {alert.duration && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Duration</div>
                                <div className="text-sm font-medium text-white">{alert.duration}</div>
                              </div>
                            )}
                            
                            {alert.profitAmount !== undefined && (
                              <div className="glass-panel rounded-lg p-3">
                                <div className="text-xs text-gray-400 mb-1">Profit/Loss</div>
                                <div className={`text-sm font-medium ${
                                  alert.profitAmount >= 0 ? 'text-emerald-400' : 'text-red-400'
                                }`}>
                                  {alert.profitAmount >= 0 ? '+' : ''}{alert.profitAmount.toFixed(2)} USD
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Action Buttons */}
                          <div className="flex justify-end mt-4 space-x-3">
                            {alert.tradeStatus === 'active' && (
                              <>
                                <button className="px-3 py-1.5 text-sm border border-accent/30 text-accent rounded-lg
                                               hover:bg-accent/10 transition-all duration-300 flex items-center">
                                  <Edit3 className="h-4 w-4 mr-1.5" />
                                  Modify
                                </button>
                                <button className="px-3 py-1.5 text-sm border border-red-500/30 text-red-400 rounded-lg
                                               hover:bg-red-500/10 transition-all duration-300 flex items-center">
                                  <X className="h-4 w-4 mr-1.5" />
                                  Close
                                </button>
                              </>
                            )}
                            <button className="premium-button px-3 py-1.5 text-sm flex items-center">
                              <BarChart2 className="h-4 w-4 mr-1.5" />
                              View Chart
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
            <div className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No alerts found</h3>
              <p className="text-gray-400 text-center max-w-md">
                {searchQuery 
                  ? `No alerts matching "${searchQuery}" were found. Try a different search term.`
                  : 'You have no alerts in the selected timeframe.'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Alert Settings */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
              <Bell className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-medium text-white">Notification Channels</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel rounded-lg p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-dark-200/50 rounded-lg">
                <MessageCircle className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="text-white font-medium">Telegram</h3>
                <p className="text-xs text-gray-400 mt-1">Receive alerts on Telegram</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-300">Status</span>
              <div className="flex items-center text-emerald-400 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5"></div>
                <span>Connected</span>
              </div>
            </div>
            
            <button className="w-full px-3 py-2 border border-accent/30 text-accent rounded-lg
                           hover:bg-accent/10 transition-all duration-300 flex items-center justify-center">
              <Settings className="h-4 w-4 mr-1.5" />
              Configure
            </button>
          </div>
          
          <div className="glass-panel rounded-lg p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-dark-200/50 rounded-lg">
                <ExternalLink className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Discord</h3>
                <p className="text-xs text-gray-400 mt-1">Receive alerts on Discord</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-300">Status</span>
              <div className="flex items-center text-gray-400 text-sm">
                <div className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></div>
                <span>Not Connected</span>
              </div>
            </div>
            
            <button className="w-full px-3 py-2 border border-purple-500/30 text-purple-400 rounded-lg
                           hover:bg-purple-500/10 transition-all duration-300 flex items-center justify-center">
              <Plus className="h-4 w-4 mr-1.5" />
              Connect
            </button>
          </div>
          
          <div className="glass-panel rounded-lg p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-dark-200/50 rounded-lg">
                <Bell className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Email</h3>
                <p className="text-xs text-gray-400 mt-1">Receive alerts via email</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-300">Status</span>
              <div className="flex items-center text-emerald-400 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-1.5"></div>
                <span>Connected</span>
              </div>
            </div>
            
            <button className="w-full px-3 py-2 border border-blue-500/30 text-blue-400 rounded-lg
                           hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center">
              <Settings className="h-4 w-4 mr-1.5" />
              Configure
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <button className="premium-button px-6 py-2.5 flex items-center">
            Manage Alert Preferences
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}