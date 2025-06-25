import React, { useState } from 'react';
import { Clock, Copy, MoreVertical, Power, DollarSign, Users, Activity, CheckCircle2, AlertTriangle, TrendingUp, Edit2 } from 'lucide-react';
import WebhookMenu from './WebhookMenu';
import WebhookColorPicker from './WebhookColorPicker';
import WebhookStatsModal from './WebhookStatsModal';
import EditWebhookModal from './EditWebhookModal';
import SetPriceModal from './SetPriceModal';
import RiskManagementModal from './RiskManagementModal';
import WebhookAppsModal from './WebhookAppsModal';

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

interface WebhookCardProps {
  webhook: WebhookConfig;
  onEdit: (id: string, name: string, symbols: string[]) => void;
  onChangeColor: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  onTogglePublic: (id: string) => void;
  onSetPrice?: (id: string, price: number, interval: string) => void;
}

export default function WebhookCard({
  webhook,
  onEdit,
  onChangeColor,
  onDelete,
  onToggleActive,
  onTogglePublic,
  onSetPrice
}: WebhookCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [showRiskModal, setShowRiskModal] = useState(false);
  const [showAppsModal, setShowAppsModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showOpenTradeModal, setShowOpenTradeModal] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(webhook.name);

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://api.automatedtrader.com/webhook/${webhook.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEdit = (id: string, name: string, symbols: string[]) => {
    onEdit(id, name, symbols);
    setShowEditModal(false);
  };

  const handleSetPrice = (price: number, interval: string) => {
    if (onSetPrice) {
      onSetPrice(webhook.id, price, interval);
    }
    setShowPriceModal(false);
  };

  const handleSaveRiskSettings = (settings: any) => {
    // Implement risk settings save logic
    console.log('Saving risk settings:', settings);
    setShowRiskModal(false);
  };

  const handleSaveName = () => {
    if (editedName.trim()) {
      onEdit(webhook.id, editedName, webhook.symbols);
      setIsEditingName(false);
    }
  };

  const getBgGradient = () => {
    if (!webhook.color) {
      return webhook.type === 'advanced' 
        ? 'from-accent/20 via-purple-500/10 to-accent/5' 
        : webhook.type === 'premium'
          ? 'from-purple-500/20 via-purple-600/10 to-purple-500/5'
          : 'from-blue-500/20 via-blue-600/10 to-blue-500/5';
    }
    return webhook.color;
  };

  const getTypeColor = () => {
    switch(webhook.type) {
      case 'advanced': return 'text-accent';
      case 'premium': return 'text-purple-400';
      case 'basic': return 'text-blue-400';
      default: return 'text-accent';
    }
  };

  const getTypeGradient = () => {
    switch(webhook.type) {
      case 'advanced': return 'bg-gradient-to-br from-accent/20 via-purple-500/10 to-accent/5';
      case 'premium': return 'bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-500/5';
      case 'basic': return 'bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-500/5';
      default: return 'bg-gradient-to-br from-accent/20 via-purple-500/10 to-accent/5';
    }
  };

  return (
    <>
      <div className={`relative rounded-xl overflow-hidden transition-all duration-300 
                      hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-accent/5`}>
        {/* Background Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getBgGradient()} opacity-20`} />
        
        {/* Content */}
        <div className="relative glass-panel rounded-xl p-6 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getTypeGradient()}`}>
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                {isEditingName ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="bg-dark-200/50 text-white rounded-lg px-3 py-1
                               border border-dark-300/50 focus:outline-none focus:ring-1 
                               focus:ring-accent/50"
                      autoFocus
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                    />
                    <button 
                      onClick={handleSaveName}
                      className="p-1 bg-accent/20 text-accent rounded-lg hover:bg-accent/30"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        setEditedName(webhook.name);
                        setIsEditingName(false);
                      }}
                      className="p-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30"
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-medium text-white">{webhook.name}</h3>
                    <button 
                      onClick={() => setIsEditingName(true)}
                      className="p-1 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm ${getTypeColor()}`}>
                    {webhook.type}
                  </span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center text-sm">
                    {webhook.status === 'connected' ? (
                      <span className="text-emerald-400">connected</span>
                    ) : (
                      <span className="text-gray-400">not connected</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                onClick={handleCopy}
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                         rounded-lg transition-all"
                title="Copy webhook URL"
              >
                {copied ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <Copy className="h-5 w-5" />}
              </button>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 
                         rounded-lg transition-all"
              >
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Today's Stats */}
          {webhook.todayTrades && webhook.todayTrades > 0 && (
            <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white">Today's Activity</span>
                </div>
                <div className="text-xs text-emerald-400">
                  {webhook.todayProfit && webhook.todayProfit > 0 ? `+$${webhook.todayProfit.toFixed(2)}` : ''}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-sm font-medium text-white">{webhook.todayTrades}</div>
                  <div className="text-xs text-gray-400">Trades</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-emerald-400">{webhook.todayWins || 0}</div>
                  <div className="text-xs text-gray-400">Wins</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-red-400">{webhook.todayLosses || 0}</div>
                  <div className="text-xs text-gray-400">Losses</div>
                </div>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <div className="text-gray-400 text-sm mb-1">Last Signal</div>
              <div className="text-white font-medium">
                {webhook.lastTrigger || 'Never'}
              </div>
            </div>

            <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
              <div className="text-gray-400 text-sm mb-1">Success Rate</div>
              <div className="text-emerald-400 font-medium">
                {webhook.successRate ? `${webhook.successRate}%` : 'N/A'}
              </div>
            </div>
          </div>

          {/* Connected Accounts */}
          {webhook.connectedAccounts && webhook.connectedAccounts.length > 0 && (
            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Connected Accounts ({webhook.connectedAccounts.length})</div>
              <div className="flex flex-wrap gap-1.5">
                {webhook.connectedAccounts.map((account) => (
                  <div 
                    key={account.id}
                    className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300 border border-dark-300/30 flex items-center space-x-1"
                  >
                    <span>{account.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                      account.type === 'demo' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {account.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Symbols */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {webhook.symbols.map((symbol) => (
              <span 
                key={symbol} 
                className="px-2 py-1 text-xs rounded-lg bg-dark-200/50 text-gray-300
                         border border-dark-300/30 backdrop-blur-sm"
              >
                {symbol}
              </span>
            ))}
          </div>

          {/* Public Stats */}
          {webhook.isPublic && (
            <div className="glass-panel rounded-lg p-3 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white">Subscribers</span>
                </div>
                <div className="text-sm font-medium text-white">{webhook.subscribers || 0}</div>
              </div>
              {webhook.price && (
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-white">Price</span>
                  </div>
                  <div className="text-sm font-medium text-emerald-400">${webhook.price}/mo</div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-2 mb-4">
            <button 
              onClick={() => setShowOpenTradeModal(true)}
              className="flex-1 py-2 text-sm bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 text-white rounded-lg
                       border border-accent/30 hover:border-accent/50 transition-all
                       flex items-center justify-center"
            >
              <TrendingUp className="h-4 w-4 mr-1.5" />
              Open Trade
            </button>
            
            <button 
              onClick={() => setShowStats(true)}
              className="flex-1 py-2 text-sm bg-gradient-to-r from-dark-200/50 to-dark-200/30 text-gray-300 rounded-lg
                       border border-dark-300/30 hover:bg-dark-200/80 hover:text-white transition-all
                       flex items-center justify-center"
            >
              <Activity className="h-4 w-4 mr-1.5" />
              View Stats
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex flex-col items-center space-y-1">
                <span className="text-xs text-gray-400">Active</span>
                <button
                  onClick={() => onToggleActive(webhook.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    webhook.isActive ? 'bg-gradient-to-r from-accent to-purple-500' : 'bg-dark-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    webhook.isActive ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              <div className="flex flex-col items-center space-y-1">
                <span className="text-xs text-gray-400">Public</span>
                <button
                  onClick={() => onTogglePublic(webhook.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    webhook.isPublic ? 'bg-gradient-to-r from-accent to-purple-500' : 'bg-dark-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    webhook.isPublic ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {webhook.isPublic && (
                <div className="flex flex-col items-center space-y-1">
                  <span className="text-xs text-gray-400">Price</span>
                  <button
                    onClick={() => setShowPriceModal(true)}
                    className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <DollarSign className="h-4 w-4" />
                    <span>{webhook.price || 0}/mo</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {showMenu && (
          <WebhookMenu
            onEdit={() => setShowEditModal(true)}
            onChangeColor={() => setShowColorPicker(true)}
            onDelete={() => onDelete(webhook.id)}
            onSetPrice={() => setShowPriceModal(true)}
            onManageRisk={() => setShowRiskModal(true)}
            onManageApps={() => setShowAppsModal(true)}
            isPublic={webhook.isPublic}
          />
        )}

        {showColorPicker && (
          <div className="absolute right-2 top-12 bg-dark-200/95 rounded-xl border border-dark-300/50 
                        shadow-xl backdrop-blur-xl p-4 z-50">
            <h4 className="text-sm font-medium text-white mb-3">Choose Color</h4>
            <WebhookColorPicker
              selectedColor={webhook.color || ''}
              onColorSelect={(color) => {
                onChangeColor(webhook.id);
                setShowColorPicker(false);
              }}
            />
          </div>
        )}
      </div>

      <WebhookStatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        webhook={webhook}
      />

      <EditWebhookModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEdit}
        webhook={webhook}
      />

      <SetPriceModal
        isOpen={showPriceModal}
        onClose={() => setShowPriceModal(false)}
        webhook={webhook}
        onSavePrice={handleSetPrice}
      />

      <RiskManagementModal
        isOpen={showRiskModal}
        onClose={() => setShowRiskModal(false)}
        webhook={webhook}
        onSave={handleSaveRiskSettings}
      />

      <WebhookAppsModal
        isOpen={showAppsModal}
        onClose={() => setShowAppsModal(false)}
        webhook={webhook}
      />

      {/* Open Trade Modal */}
      {showOpenTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm\" onClick={() => setShowOpenTradeModal(false)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
            <div className="relative p-6 border-b border-dark-300/50">
              <button
                onClick={() => setShowOpenTradeModal(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">Open Trade with {webhook.name}</h3>
                  <p className="text-gray-400 mt-1">Execute a trade using this webhook's settings</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                <h4 className="text-base font-medium text-white mb-3">Webhook Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Type</div>
                    <div className={`text-sm font-medium ${getTypeColor()}`}>{webhook.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Symbols</div>
                    <div className="text-sm font-medium text-white">{webhook.symbols.join(', ')}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Success Rate</div>
                    <div className="text-sm font-medium text-emerald-400">{webhook.successRate || 'N/A'}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Total Trades</div>
                    <div className="text-sm font-medium text-white">{webhook.totalTrades || 0}</div>
                  </div>
                </div>
              </div>

              <div className="glass-panel rounded-lg p-4 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
                <h4 className="text-base font-medium text-white mb-3">Select Account</h4>
                <div className="space-y-2">
                  {webhook.connectedAccounts && webhook.connectedAccounts.map((account) => (
                    <div 
                      key={account.id}
                      className="flex items-center space-x-3 p-3 bg-dark-200/30 rounded-lg border border-dark-300/30 hover:border-accent/20 transition-all"
                    >
                      <input
                        type="radio"
                        id={`account-${account.id}`}
                        name="trading-account"
                        className="h-4 w-4 border-dark-300 bg-dark-200 text-accent focus:ring-accent focus:ring-offset-dark-100"
                      />
                      <label htmlFor={`account-${account.id}`} className="flex items-center space-x-2 cursor-pointer">
                        <div className={`p-1.5 rounded-lg ${
                          account.type === 'demo' ? 'bg-blue-500/10' : 'bg-emerald-500/10'
                        }`}>
                          <Wallet className={`h-4 w-4 ${
                            account.type === 'demo' ? 'text-blue-400' : 'text-emerald-400'
                          }`} />
                        </div>
                        <div>
                          <div className="text-white">{account.name}</div>
                          <div className={`text-xs ${
                            account.type === 'demo' ? 'text-blue-400' : 'text-emerald-400'
                          }`}>
                            {account.type.toUpperCase()}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  className="premium-button flex-1 py-2.5 flex items-center justify-center"
                  onClick={() => setShowOpenTradeModal(false)}
                >
                  Open Trade
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowOpenTradeModal(false)}
                  className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                           rounded-lg hover:bg-dark-200/50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}