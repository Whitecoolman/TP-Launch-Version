import React, { useState, useEffect } from 'react';
import { 
  Webhook, Plus, Search, Filter, MoreVertical, Power, 
  DollarSign, Users, Activity, CheckCircle2, AlertTriangle, 
  TrendingUp, Clock, Copy, ChevronDown, ChevronUp, 
  Settings, Trash2, Shield, ArrowRightLeft, Zap, 
  BarChart2, ExternalLink, Edit2, Palette, ArrowRight,
  RefreshCw, Check, Info, HelpCircle, Globe
} from 'lucide-react';
import NewWebhookModal from '../components/webhooks/NewWebhookModal';
import EditWebhookModal from '../components/webhooks/EditWebhookModal';
import SetPriceModal from '../components/webhooks/SetPriceModal';
import RiskManagementModal from '../components/webhooks/RiskManagementModal';
import WebhookAppsModal from '../components/webhooks/WebhookAppsModal';
import WebhookStatsModal from '../components/webhooks/WebhookStatsModal';
import WebhookCard from '../components/webhooks/WebhookCard';

interface WebhookConfig {
  id: string;
  name: string;
  symbols: string[];
  isActive: boolean;
  isPublic: boolean;
  status: 'connected' | 'not_connected';
  type: 'advanced' | 'basic' | 'premium';
  lastTrigger?: string;
  successRate?: number;
  totalTrades?: number;
  todayTrades?: number;
  todayWins?: number;
  todayLosses?: number;
  todayProfit?: number;
  color?: string;
  price?: number;
  subscribers?: number;
  connectedAccounts?: {
    id: string;
    name: string;
    type: string;
  }[];
}

export default function SignalsView() {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([
    {
      id: 'yt-gold1',
      name: 'YT GOLD1',
      symbols: ['XAUUSD'],
      isActive: true,
      isPublic: false,
      status: 'connected',
      type: 'advanced',
      lastTrigger: '5 minutes ago',
      successRate: 92.5,
      totalTrades: 145,
      todayTrades: 8,
      todayWins: 7,
      todayLosses: 1,
      todayProfit: 769.11,
      color: 'from-accent/20 to-accent/5',
      connectedAccounts: [
        { id: '1', name: 'MT5 Demo', type: 'demo' },
        { id: '2', name: 'MT4 Live', type: 'live' }
      ]
    },
    {
      id: 'pro-signals',
      name: 'Pro Signals',
      symbols: ['EURUSD', 'GBPUSD', 'USDJPY'],
      isActive: true,
      isPublic: true,
      status: 'connected',
      type: 'premium',
      lastTrigger: '30 minutes ago',
      successRate: 88.3,
      totalTrades: 256,
      todayTrades: 5,
      todayWins: 4,
      todayLosses: 1,
      todayProfit: 325.50,
      color: 'from-purple-500/20 to-purple-600/5',
      price: 49.99,
      subscribers: 124,
      connectedAccounts: [
        { id: '1', name: 'MT5 Demo', type: 'demo' }
      ]
    },
    {
      id: 'gold-test',
      name: 'GOLD TEST',
      symbols: ['XAUUSD'],
      isActive: false,
      isPublic: false,
      status: 'not_connected',
      type: 'basic',
      lastTrigger: '2 hours ago',
      successRate: 85.7,
      totalTrades: 35,
      color: 'from-emerald-500/20 to-emerald-500/5'
    },
    {
      id: 'youtube-1',
      name: 'Youtube 1',
      symbols: ['GBPJPY', 'EURUSD'],
      isActive: true,
      isPublic: false,
      status: 'connected',
      type: 'basic',
      lastTrigger: '1 hour ago',
      successRate: 78.5,
      totalTrades: 65,
      todayTrades: 3,
      todayWins: 2,
      todayLosses: 1,
      todayProfit: 156.25,
      color: 'from-red-500/20 to-red-600/5',
      connectedAccounts: [
        { id: '2', name: 'MT4 Live', type: 'live' }
      ]
    }
  ]);

  const [showNewWebhookModal, setShowNewWebhookModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState<WebhookConfig | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copiedWebhookId, setCopiedWebhookId] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Filter webhooks
  const filteredWebhooks = webhooks.filter(webhook => {
    const matchesSearch = webhook.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          webhook.symbols.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || webhook.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && webhook.isActive) ||
                          (filterStatus === 'inactive' && !webhook.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle webhook creation
  const handleCreateWebhook = (name: string, symbols: string[]) => {
    const newWebhook: WebhookConfig = {
      id: `webhook-${Date.now()}`,
      name,
      symbols,
      isActive: true,
      isPublic: false,
      status: 'connected',
      type: 'basic',
      lastTrigger: 'Never',
      successRate: 0,
      totalTrades: 0,
      color: 'from-blue-500/20 to-blue-600/5'
    };
    
    setWebhooks([...webhooks, newWebhook]);
  };

  // Handle webhook edit
  const handleEditWebhook = (id: string, name: string, symbols: string[]) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, name, symbols } : webhook
    ));
  };

  // Handle webhook deletion
  const handleDeleteWebhook = (id: string) => {
    setWebhooks(webhooks.filter(webhook => webhook.id !== id));
  };

  // Handle webhook activation toggle
  const handleToggleActive = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, isActive: !webhook.isActive } : webhook
    ));
  };

  // Handle webhook public toggle
  const handleTogglePublic = (id: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, isPublic: !webhook.isPublic } : webhook
    ));
  };

  // Handle webhook color change
  const handleChangeColor = (id: string) => {
    // In a real app, this would open a color picker
    // For now, we'll just cycle through some predefined colors
    const colors = [
      'from-accent/20 to-accent/5',
      'from-purple-500/20 to-purple-600/5',
      'from-emerald-500/20 to-emerald-500/5',
      'from-red-500/20 to-red-600/5',
      'from-blue-500/20 to-blue-600/5',
      'from-amber-500/20 to-amber-600/5'
    ];
    
    setWebhooks(webhooks.map(webhook => {
      if (webhook.id === id) {
        const currentIndex = colors.indexOf(webhook.color || colors[0]);
        const nextIndex = (currentIndex + 1) % colors.length;
        return { ...webhook, color: colors[nextIndex] };
      }
      return webhook;
    }));
  };

  // Handle webhook price setting
  const handleSetPrice = (id: string, price: number, interval: string) => {
    setWebhooks(webhooks.map(webhook => 
      webhook.id === id ? { ...webhook, price } : webhook
    ));
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Handle copy webhook URL
  const handleCopyWebhookUrl = (id: string) => {
    // In a real app, this would copy the actual webhook URL to clipboard
    navigator.clipboard.writeText(`https://api.automatedtrader.com/webhook/${id}`);
    setCopiedWebhookId(id);
    setTimeout(() => setCopiedWebhookId(null), 2000);
  };

  // Toggle dropdown menu
  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  // Calculate total stats
  const totalStats = {
    webhooks: webhooks.length,
    active: webhooks.filter(w => w.isActive).length,
    todayTrades: webhooks.reduce((sum, w) => sum + (w.todayTrades || 0), 0),
    todayProfit: webhooks.reduce((sum, w) => sum + (w.todayProfit || 0), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-accent/30 to-purple-500/10 rounded-lg shadow-lg shadow-accent/5">
            <Webhook className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight text-shadow-glow">Webhooks</h1>
            <p className="text-gray-400 mt-1">Automate your trading with TradingView signals</p>
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
            onClick={() => setShowNewWebhookModal(true)}
            className="premium-button flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Webhook
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg">
              <Webhook className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Webhooks</div>
              <div className="text-2xl font-semibold text-white">{totalStats.webhooks}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{totalStats.active} active</span>
            <span>{webhooks.length - totalStats.active} inactive</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Today's Trades</div>
              <div className="text-2xl font-semibold text-white">{totalStats.todayTrades}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>From all webhooks</span>
            <span className="text-emerald-400">+12 today</span>
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
                +${totalStats.todayProfit.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>From all webhooks</span>
            <span className="text-emerald-400">+18.5%</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-2xl font-semibold text-white">89.5%</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Average across all webhooks</span>
            <span className="text-emerald-400">+2.3%</span>
          </div>
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
              <option value="all">All Types</option>
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="advanced">Advanced</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative min-w-[140px]">
            <Power className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                       border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search webhooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-dark-200/50 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Webhooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWebhooks.map(webhook => (
          <WebhookCard
            key={webhook.id}
            webhook={webhook}
            onEdit={handleEditWebhook}
            onChangeColor={handleChangeColor}
            onDelete={handleDeleteWebhook}
            onToggleActive={handleToggleActive}
            onTogglePublic={handleTogglePublic}
            onSetPrice={handleSetPrice}
          />
        ))}

        {/* Empty State */}
        {filteredWebhooks.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 glass-panel rounded-xl p-8 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-dark-200/50 rounded-full mb-4">
                <Webhook className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No webhooks found</h3>
              <p className="text-gray-400 max-w-md mb-6">
                {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                  ? "No webhooks match your current filters. Try adjusting your search or filters."
                  : "You haven't created any webhooks yet. Create your first webhook to start automating your trades."}
              </p>
              <button 
                onClick={() => setShowNewWebhookModal(true)}
                className="premium-button flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create First Webhook
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Getting Started Guide */}
      {webhooks.length > 0 && (
        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <Info className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-lg font-medium text-white">Webhook Setup Guide</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Create a Webhook</h3>
                  <p className="text-sm text-gray-400">
                    Set up a webhook with your desired trading parameters and get your unique webhook URL.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Configure TradingView</h3>
                  <p className="text-sm text-gray-400">
                    Add your webhook URL to TradingView alerts to trigger automated trades.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Start Automating</h3>
                  <p className="text-sm text-gray-400">
                    Your trades will execute automatically when TradingView alerts are triggered.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <a 
              href="https://docs.automatedtrader.com/webhooks" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-dark transition-colors flex items-center text-sm"
            >
              Learn more about webhooks
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Modals */}
      <NewWebhookModal
        isOpen={showNewWebhookModal}
        onClose={() => setShowNewWebhookModal(false)}
        onCreateWebhook={handleCreateWebhook}
      />

      {selectedWebhook && (
        <>
          <EditWebhookModal
            isOpen={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSave={handleEditWebhook}
            webhook={selectedWebhook}
          />

          <SetPriceModal
            isOpen={showPriceModal}
            onClose={() => setShowPriceModal(false)}
            webhook={selectedWebhook}
            onSavePrice={(price, interval) => handleSetPrice(selectedWebhook.id, price, interval)}
          />

          <RiskManagementModal
            isOpen={showRiskModal}
            onClose={() => setShowRiskModal(false)}
            webhook={selectedWebhook}
            onSave={() => setShowRiskModal(false)}
          />

          <WebhookAppsModal
            isOpen={showAppsModal}
            onClose={() => setShowAppsModal(false)}
            webhook={selectedWebhook}
          />

          <WebhookStatsModal
            isOpen={showStatsModal}
            onClose={() => setShowStatsModal(false)}
            webhook={selectedWebhook}
          />
        </>
      )}
    </div>
  );
}