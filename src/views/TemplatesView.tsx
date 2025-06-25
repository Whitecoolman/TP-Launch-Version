import React, { useState } from 'react';
import { 
  Layers, Plus, RefreshCw, Search, Filter, ChevronDown, 
  TrendingUp, Clock, DollarSign, Shield, 
  Zap, Award, Target, ArrowRight, CheckCircle2, 
  BarChart2, Settings, Trash2, Edit2, Copy, 
  MoreVertical, Power, Activity, Download, ExternalLink,
  Info, HelpCircle, Globe, Webhook, Eye, X,
  Sliders, ArrowUpRight, Percent, AlertTriangle, Calendar
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  type: 'basic' | 'advanced' | 'premium';
  isActive: boolean;
  symbols: string[];
  lastUsed?: string;
  successRate?: number;
  totalTrades?: number;
  color?: string;
  webhooks?: number;
  createdAt: string;
  // New fields for enhanced templates
  stopLossPips?: number;
  takeProfitPips?: number;
  riskPercentage?: number;
  trailingStop?: boolean;
  trailingStopDistance?: number;
  timeLimit?: number;
  entryType?: 'market' | 'limit' | 'stop';
  tradingHours?: {
    start: string;
    end: string;
    days: string[];
  };
  author?: string;
  tags?: string[];
}

export default function TemplatesView() {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 'template-1',
      name: 'Gold Scalper',
      description: 'Quick scalping strategy for gold with tight stop loss',
      type: 'premium',
      isActive: true,
      symbols: ['XAUUSD'],
      lastUsed: '2 hours ago',
      successRate: 92.5,
      totalTrades: 145,
      color: 'from-accent/20 to-accent/5',
      webhooks: 3,
      createdAt: '2024-01-15',
      stopLossPips: 15,
      takeProfitPips: 35,
      riskPercentage: 1.5,
      trailingStop: true,
      trailingStopDistance: 10,
      entryType: 'market',
      author: 'Alex Trading',
      tags: ['scalping', 'gold', 'momentum']
    },
    {
      id: 'template-2',
      name: 'Forex Swing',
      description: 'Longer-term swing trading strategy for major forex pairs',
      type: 'advanced',
      isActive: true,
      symbols: ['EURUSD', 'GBPUSD', 'USDJPY'],
      lastUsed: '1 day ago',
      successRate: 88.3,
      totalTrades: 78,
      color: 'from-purple-500/20 to-purple-600/5',
      webhooks: 5,
      createdAt: '2024-02-20',
      stopLossPips: 50,
      takeProfitPips: 150,
      riskPercentage: 2,
      trailingStop: true,
      trailingStopDistance: 25,
      timeLimit: 72,
      entryType: 'limit',
      tradingHours: {
        start: '08:00',
        end: '16:00',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      },
      author: 'Pro Signals',
      tags: ['swing', 'forex', 'trend-following']
    },
    {
      id: 'template-3',
      name: 'Crypto Momentum',
      description: 'Momentum-based strategy for crypto markets',
      type: 'basic',
      isActive: false,
      symbols: ['BTCUSD', 'ETHUSD'],
      lastUsed: '1 week ago',
      successRate: 85.7,
      totalTrades: 35,
      color: 'from-emerald-500/20 to-emerald-500/5',
      webhooks: 1,
      createdAt: '2024-03-05',
      stopLossPips: 100,
      takeProfitPips: 300,
      riskPercentage: 3,
      trailingStop: false,
      entryType: 'market',
      author: 'Crypto Master',
      tags: ['crypto', 'momentum', 'breakout']
    },
    {
      id: 'template-4',
      name: 'Index Breakout',
      description: 'Breakout strategy for major indices',
      type: 'premium',
      isActive: true,
      symbols: ['NAS100', 'US30', 'SPX500'],
      lastUsed: '3 days ago',
      successRate: 78.5,
      totalTrades: 65,
      color: 'from-blue-500/20 to-blue-600/5',
      webhooks: 2,
      createdAt: '2024-03-10',
      stopLossPips: 25,
      takeProfitPips: 75,
      riskPercentage: 1,
      trailingStop: true,
      trailingStopDistance: 15,
      entryType: 'stop',
      author: 'Index Pro',
      tags: ['indices', 'breakout', 'volatility']
    }
  ]);

  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [showTemplateDetailsModal, setShowTemplateDetailsModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          template.symbols.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (template.tags && template.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                          (filterStatus === 'active' && template.isActive) ||
                          (filterStatus === 'inactive' && !template.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Handle template creation
  const handleCreateTemplate = (name: string, description: string, symbols: string[]) => {
    const newTemplate: Template = {
      id: `template-${Date.now()}`,
      name,
      description,
      symbols,
      isActive: true,
      type: 'basic',
      lastUsed: 'Never',
      successRate: 0,
      totalTrades: 0,
      color: 'from-blue-500/20 to-blue-600/5',
      webhooks: 0,
      createdAt: new Date().toISOString().split('T')[0],
      stopLossPips: 20,
      takeProfitPips: 60,
      riskPercentage: 1,
      trailingStop: false,
      entryType: 'market',
      author: 'You',
      tags: ['custom']
    };
    
    setTemplates([...templates, newTemplate]);
  };

  // Handle template edit
  const handleEditTemplate = (id: string, name: string, description: string, symbols: string[]) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, name, description, symbols } : template
    ));
  };

  // Handle template deletion
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  // Handle template activation toggle
  const handleToggleActive = (id: string) => {
    setTemplates(templates.map(template => 
      template.id === id ? { ...template, isActive: !template.isActive } : template
    ));
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // View template details
  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateDetailsModal(true);
  };

  // Get type color
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'advanced': return 'text-accent';
      case 'premium': return 'text-purple-400';
      case 'basic': return 'text-blue-400';
      default: return 'text-accent';
    }
  };

  // Get type gradient
  const getTypeGradient = (type: string) => {
    switch(type) {
      case 'advanced': return 'bg-gradient-to-br from-accent/20 via-purple-500/10 to-accent/5';
      case 'premium': return 'bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-500/5';
      case 'basic': return 'bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-500/5';
      default: return 'bg-gradient-to-br from-accent/20 via-purple-500/10 to-accent/5';
    }
  };

  // Get risk level color
  const getRiskLevelColor = (riskPercentage?: number) => {
    if (!riskPercentage) return 'text-gray-400';
    if (riskPercentage <= 1) return 'text-emerald-400';
    if (riskPercentage <= 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 bg-gradient-to-br from-accent/30 to-purple-500/10 rounded-lg shadow-lg shadow-accent/5">
            <Layers className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight text-shadow-glow">Templates</h1>
            <p className="text-gray-400 mt-1">Create and manage reusable trading templates</p>
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
            onClick={() => setShowNewTemplateModal(true)}
            className="premium-button flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-accent/5 rounded-lg">
              <Layers className="h-5 w-5 text-accent" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Templates</div>
              <div className="text-2xl font-semibold text-white">{templates.length}</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>{templates.filter(t => t.isActive).length} active</span>
            <span>{templates.length - templates.filter(t => t.isActive).length} inactive</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Success Rate</div>
              <div className="text-2xl font-semibold text-emerald-400">
                {(templates.reduce((sum, t) => sum + (t.successRate || 0), 0) / templates.length).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Average across all templates</span>
            <span className="text-emerald-400">+2.3%</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
              <Webhook className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Connected Webhooks</div>
              <div className="text-2xl font-semibold text-white">
                {templates.reduce((sum, t) => sum + (t.webhooks || 0), 0)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Using these templates</span>
            <span className="text-emerald-400">+5 this week</span>
          </div>
        </div>
        
        <div className="glass-panel rounded-xl p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg">
              <BarChart2 className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Total Trades</div>
              <div className="text-2xl font-semibold text-white">
                {templates.reduce((sum, t) => sum + (t.totalTrades || 0), 0)}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>From all templates</span>
            <span className="text-emerald-400">+18.5%</span>
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
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-dark-200/50 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div 
            key={template.id}
            className={`relative rounded-xl overflow-hidden transition-all duration-300 
                      hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${template.color} opacity-20`} />
            
            {/* Content */}
            <div className="relative glass-panel rounded-xl p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeGradient(template.type)}`}>
                    <Layers className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">{template.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`text-sm ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center text-sm">
                        {template.isActive ? (
                          <span className="text-emerald-400">active</span>
                        ) : (
                          <span className="text-gray-400">inactive</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleToggleActive(template.id)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      template.isActive ? 'bg-accent' : 'bg-dark-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      template.isActive ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                             rounded-lg transition-all"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{template.description}</p>

              {/* Risk Parameters */}
              <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <span className="text-xs text-white">Risk Parameters</span>
                  </div>
                  <div className={`text-xs ${getRiskLevelColor(template.riskPercentage)}`}>
                    {template.riskPercentage}% risk
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Stop Loss</div>
                    <div className="text-sm font-medium text-red-400">
                      {template.stopLossPips} pips
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-0.5">Take Profit</div>
                    <div className="text-sm font-medium text-emerald-400">
                      {template.takeProfitPips} pips
                    </div>
                  </div>
                </div>
                
                {/* Risk/Reward Ratio */}
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Risk/Reward</span>
                    <span className="text-white">1:{(template.takeProfitPips! / template.stopLossPips!).toFixed(1)}</span>
                  </div>
                  <div className="mt-1 h-1 bg-dark-200 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500">
                      <div className="h-full bg-dark-200" style={{ width: `${100 - (template.takeProfitPips! / (template.takeProfitPips! + template.stopLossPips!) * 100)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Features */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {template.trailingStop && (
                  <div className="px-2 py-1 text-xs rounded-lg bg-accent/10 text-accent border border-accent/20">
                    <div className="flex items-center space-x-1">
                      <Zap className="h-3 w-3" />
                      <span>Trailing {template.trailingStopDistance}p</span>
                    </div>
                  </div>
                )}
                
                {template.timeLimit && (
                  <div className="px-2 py-1 text-xs rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{template.timeLimit}h limit</span>
                    </div>
                  </div>
                )}
                
                {template.entryType && (
                  <div className="px-2 py-1 text-xs rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{template.entryType}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                  <div className="text-gray-400 text-xs mb-1">Last Used</div>
                  <div className="text-white font-medium">
                    {template.lastUsed || 'Never'}
                  </div>
                </div>

                <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                  <div className="text-gray-400 text-xs mb-1">Success Rate</div>
                  <div className="text-emerald-400 font-medium">
                    {template.successRate ? `${template.successRate}%` : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Symbols */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {template.symbols.map((symbol) => (
                  <span 
                    key={symbol} 
                    className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300
                             border border-dark-300/30 backdrop-blur-sm"
                  >
                    {symbol}
                  </span>
                ))}
              </div>

              {/* Tags */}
              {template.tags && template.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {template.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 text-xs rounded-lg bg-dark-300/50 text-gray-400
                               border border-dark-300/30 backdrop-blur-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button 
                  className="flex-1 py-2 text-sm bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 text-white rounded-lg
                           border border-accent/30 hover:border-accent/50 transition-all
                           flex items-center justify-center"
                >
                  <Plus className="h-4 w-4 mr-1.5" />
                  Use Template
                </button>
                
                <button 
                  onClick={() => handleViewTemplate(template)}
                  className="flex-1 py-2 text-sm bg-gradient-to-r from-dark-200/50 to-dark-200/30 text-gray-300 rounded-lg
                           border border-dark-300/30 hover:bg-dark-200/80 hover:text-white transition-all
                           flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-1.5" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Template Card */}
        <div 
          className="glass-panel rounded-xl p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 
                   flex flex-col items-center justify-center text-center cursor-pointer h-full min-h-[350px]"
          onClick={() => setShowNewTemplateModal(true)}
        >
          <div className="p-4 bg-accent/10 rounded-full mb-4">
            <Plus className="h-8 w-8 text-accent" />
          </div>
          <h3 className="text-xl font-medium text-white mb-2">Create New Template</h3>
          <p className="text-gray-400 mb-6 max-w-xs">
            Create a reusable template for your trading strategies
          </p>
          <button className="premium-button px-6 py-2 flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </button>
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && templates.length > 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 glass-panel rounded-xl p-8 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="p-4 bg-dark-200/50 rounded-full mb-4">
                <Layers className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No templates found</h3>
              <p className="text-gray-400 max-w-md mb-6">
                {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                  ? "No templates match your current filters. Try adjusting your search or filters."
                  : "You haven't created any templates yet. Create your first template to start automating your trades."}
              </p>
              <button 
                onClick={() => setShowNewTemplateModal(true)}
                className="premium-button flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create First Template
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Getting Started Guide */}
      {templates.length > 0 && (
        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <Info className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-lg font-medium text-white">Template Usage Guide</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">Create a Template</h3>
                  <p className="text-sm text-gray-400">
                    Define your trading parameters, risk settings, and entry/exit rules in a reusable template.
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
                  <h3 className="text-white font-medium mb-2">Apply to Webhooks</h3>
                  <p className="text-sm text-gray-400">
                    Use your template when creating new webhooks to ensure consistent trading parameters.
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
                  <h3 className="text-white font-medium mb-2">Track Performance</h3>
                  <p className="text-sm text-gray-400">
                    Monitor how each template performs across different markets and conditions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <a 
              href="/docs" 
              className="text-accent hover:text-accent-dark transition-colors flex items-center text-sm"
            >
              Learn more about templates
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      )}

      {/* Template Categories */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
              <Layers className="h-5 w-5 text-purple-400" />
            </div>
            <h2 className="text-lg font-medium text-white">Template Categories</h2>
          </div>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center">
            View All Categories
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Scalping', count: 12, icon: <Zap className="h-5 w-5 text-yellow-400" /> },
            { name: 'Swing Trading', count: 8, icon: <TrendingUp className="h-5 w-5 text-emerald-400" /> },
            { name: 'Breakout', count: 5, icon: <Activity className="h-5 w-5 text-accent" /> },
            { name: 'Trend Following', count: 7, icon: <BarChart2 className="h-5 w-5 text-purple-400" /> },
            { name: 'Mean Reversion', count: 4, icon: <Target className="h-5 w-5 text-red-400" /> },
            { name: 'Risk Management', count: 6, icon: <Shield className="h-5 w-5 text-blue-400" /> }
          ].map((category, index) => (
            <div 
              key={index}
              className="glass-panel rounded-lg p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300 hover:bg-dark-200/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-dark-200/50 rounded-lg">
                    {category.icon}
                  </div>
                  <div>
                    <div className="text-white font-medium">{category.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{category.count} templates</div>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export/Import Section */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Import & Export Templates</h3>
            <p className="text-gray-400 text-sm">
              Share your templates with others or import templates from the community
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="premium-button-outline flex items-center px-4 py-2">
              <Download className="h-4 w-4 mr-2" />
              Import Template
            </button>
            <button className="premium-button flex items-center px-4 py-2">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export Templates
            </button>
          </div>
        </div>
      </div>

      {/* Template Details Modal */}
      {showTemplateDetailsModal && selectedTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowTemplateDetailsModal(false)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-3xl z-10 p-0 overflow-hidden">
            {/* Header */}
            <div className={`relative p-6 border-b border-dark-300/50 bg-gradient-to-r ${selectedTemplate.color}`}>
              <button
                onClick={() => setShowTemplateDetailsModal(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-dark-100/30 backdrop-blur-sm rounded-lg">
                  <Layers className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">{selectedTemplate.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm ${getTypeColor(selectedTemplate.type)}`}>
                      {selectedTemplate.type}
                    </span>
                    <span className="text-gray-400">•</span>
                    <div className="flex items-center text-sm">
                      {selectedTemplate.isActive ? (
                        <span className="text-emerald-400">active</span>
                      ) : (
                        <span className="text-gray-400">inactive</span>
                      )}
                    </div>
                    {selectedTemplate.author && (
                      <>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">by {selectedTemplate.author}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Description */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-2">Description</h4>
                <p className="text-gray-300">{selectedTemplate.description}</p>
              </div>

              {/* Risk Parameters */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Risk Parameters</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Shield className="h-4 w-4 text-red-400" />
                      <span className="text-xs">Stop Loss</span>
                    </div>
                    <div className="text-base font-medium text-red-400">
                      {selectedTemplate.stopLossPips} pips
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Target className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs">Take Profit</span>
                    </div>
                    <div className="text-base font-medium text-emerald-400">
                      {selectedTemplate.takeProfitPips} pips
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Percent className="h-4 w-4 text-accent" />
                      <span className="text-xs">Risk Per Trade</span>
                    </div>
                    <div className={`text-base font-medium ${getRiskLevelColor(selectedTemplate.riskPercentage)}`}>
                      {selectedTemplate.riskPercentage}%
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Activity className="h-4 w-4 text-purple-400" />
                      <span className="text-xs">Risk/Reward</span>
                    </div>
                    <div className="text-base font-medium text-white">
                      1:{(selectedTemplate.takeProfitPips! / selectedTemplate.stopLossPips!).toFixed(1)}
                    </div>
                  </div>
                </div>
                
                {/* Risk/Reward Visualization */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Risk</span>
                    <span>Reward</span>
                  </div>
                  <div className="h-2 bg-dark-200 rounded-full overflow-hidden flex">
                    <div 
                      className="h-full bg-red-400 rounded-l-full"
                      style={{ width: `${(selectedTemplate.stopLossPips! / (selectedTemplate.stopLossPips! + selectedTemplate.takeProfitPips!)) * 100}%` }}
                    ></div>
                    <div 
                      className="h-full bg-emerald-400 rounded-r-full"
                      style={{ width: `${(selectedTemplate.takeProfitPips! / (selectedTemplate.stopLossPips! + selectedTemplate.takeProfitPips!)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Advanced Features */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Advanced Features</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-accent" />
                        <span className="text-sm text-white">Trailing Stop</span>
                      </div>
                      <div className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                        selectedTemplate.trailingStop ? 'bg-accent' : 'bg-dark-300'
                      }`}>
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                          selectedTemplate.trailingStop ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </div>
                    </div>
                    {selectedTemplate.trailingStop && selectedTemplate.trailingStopDistance && (
                      <div className="mt-2 text-xs text-gray-400">
                        Distance: {selectedTemplate.trailingStopDistance} pips
                      </div>
                    )}
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-purple-400" />
                        <span className="text-sm text-white">Time Limit</span>
                      </div>
                      <div className={`relative inline-flex h-5 w-9 items-center rounded-full ${
                        selectedTemplate.timeLimit ? 'bg-purple-500' : 'bg-dark-300'
                      }`}>
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                          selectedTemplate.timeLimit ? 'translate-x-5' : 'translate-x-1'
                        }`} />
                      </div>
                    </div>
                    {selectedTemplate.timeLimit && (
                      <div className="mt-2 text-xs text-gray-400">
                        Auto close after: {selectedTemplate.timeLimit} hours
                      </div>
                    )}
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Target className="h-4 w-4 text-blue-400" />
                      <span className="text-xs">Entry Type</span>
                    </div>
                    <div className="text-base font-medium text-white capitalize">
                      {selectedTemplate.entryType} order
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Globe className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs">Supported Symbols</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedTemplate.symbols.map(symbol => (
                        <span 
                          key={symbol}
                          className="px-1.5 py-0.5 text-xs rounded bg-dark-200/50 text-gray-300"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Trading Hours */}
                {selectedTemplate.tradingHours && (
                  <div className="mt-4 glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-xs">Trading Hours</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Time Window</div>
                        <div className="text-sm text-white">
                          {selectedTemplate.tradingHours.start} - {selectedTemplate.tradingHours.end}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Trading Days</div>
                        <div className="text-sm text-white">
                          {selectedTemplate.tradingHours.days.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Performance Stats */}
              <div className="glass-panel rounded-lg p-4 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
                <h4 className="text-base font-medium text-white mb-4">Performance Statistics</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <BarChart2 className="h-4 w-4 text-accent" />
                      <span className="text-xs">Total Trades</span>
                    </div>
                    <div className="text-base font-medium text-white">
                      {selectedTemplate.totalTrades || 0}
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Award className="h-4 w-4 text-emerald-400" />
                      <span className="text-xs">Success Rate</span>
                    </div>
                    <div className="text-base font-medium text-emerald-400">
                      {selectedTemplate.successRate || 0}%
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Webhook className="h-4 w-4 text-purple-400" />
                      <span className="text-xs">Connected Webhooks</span>
                    </div>
                    <div className="text-base font-medium text-white">
                      {selectedTemplate.webhooks || 0}
                    </div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
                    <div className="flex items-center space-x-2 text-gray-400 mb-1">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span className="text-xs">Created On</span>
                    </div>
                    <div className="text-base font-medium text-white">
                      {selectedTemplate.createdAt}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  className="premium-button flex-1 py-3 flex items-center justify-center"
                >
                  Use Template
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  className="flex-1 px-4 py-3 border border-accent/30 text-accent 
                           rounded-lg hover:bg-accent/10 transition-all duration-300"
                >
                  Edit Template
                </button>
              </div>

              {/* Warning */}
              <div className="flex items-start space-x-3 p-4 bg-dark-200/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">
                    This template will apply these risk parameters to all trades.
                  </p>
                  <p className="text-gray-400">
                    Make sure they align with your overall risk management strategy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}