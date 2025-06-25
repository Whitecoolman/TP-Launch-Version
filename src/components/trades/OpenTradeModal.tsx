import React, { useState, useEffect } from 'react';
import { 
  X, AlertTriangle, ArrowRight, DollarSign, Percent, Check, Wallet, RefreshCw,
  Plus, Minus, Target, TrendingUp, TrendingDown, Clock, Shield, Zap, Save, Copy,
  ChevronDown, ChevronUp, Trash2, Settings, BarChart2, HelpCircle
} from 'lucide-react';
import { useMetaAccounts } from '../../hooks/useMetaAccount';

interface OpenTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TakeProfit {
  id: string;
  price: string;
  percentage: number;
}

interface RiskPreset {
  id: string;
  name: string;
  description: string;
  stopLoss: number;
  takeProfits: TakeProfit[];
  trailingStop: boolean;
  trailingStopDistance: number;
  trailingStopActivation: number;
  riskPercentage: number;
  timeLimit?: number;
}

export default function OpenTradeModal({ isOpen, onClose }: OpenTradeModalProps) {
  const { data: accounts = [], isLoading: isAccountsLoading } = useMetaAccounts();
  
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [symbol, setSymbol] = useState<string>('EURUSD');
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [lotSize, setLotSize] = useState<number>(0.01);
  const [stopLoss, setStopLoss] = useState<string>('');
  const [takeProfits, setTakeProfits] = useState<TakeProfit[]>([
    { id: '1', price: '', percentage: 100 }
  ]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  
  // Advanced settings
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [useTrailingStop, setUseTrailingStop] = useState<boolean>(false);
  const [trailingStopDistance, setTrailingStopDistance] = useState<number>(20);
  const [trailingStopActivation, setTrailingStopActivation] = useState<number>(10);
  const [riskPercentage, setRiskPercentage] = useState<number>(1);
  const [timeLimit, setTimeLimit] = useState<number>(0);
  const [showPresets, setShowPresets] = useState<boolean>(false);
  
  // Common forex pairs
  const commonPairs = [
    'EURUSD', 'GBPUSD', 'USDJPY', 'AUDUSD', 'USDCAD', 'NZDUSD', 'USDCHF',
    'EURGBP', 'EURJPY', 'GBPJPY', 'XAUUSD', 'BTCUSD', 'ETHUSD'
  ];

  // Risk management presets
  const riskPresets: RiskPreset[] = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Low risk, moderate reward strategy with tight stop loss',
      stopLoss: 15,
      takeProfits: [
        { id: '1', price: '', percentage: 100 }
      ],
      trailingStop: false,
      trailingStopDistance: 0,
      trailingStopActivation: 0,
      riskPercentage: 0.5
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Moderate risk/reward with multiple take profit levels',
      stopLoss: 25,
      takeProfits: [
        { id: '1', price: '', percentage: 50 },
        { id: '2', price: '', percentage: 50 }
      ],
      trailingStop: true,
      trailingStopDistance: 15,
      trailingStopActivation: 10,
      riskPercentage: 1
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'Higher risk/reward with trailing stop and multiple targets',
      stopLoss: 35,
      takeProfits: [
        { id: '1', price: '', percentage: 30 },
        { id: '2', price: '', percentage: 30 },
        { id: '3', price: '', percentage: 40 }
      ],
      trailingStop: true,
      trailingStopDistance: 25,
      trailingStopActivation: 15,
      riskPercentage: 2
    },
    {
      id: 'scalping',
      name: 'Scalping',
      description: 'Quick in-and-out trades with tight stops and small targets',
      stopLoss: 10,
      takeProfits: [
        { id: '1', price: '', percentage: 100 }
      ],
      trailingStop: false,
      trailingStopDistance: 0,
      trailingStopActivation: 0,
      riskPercentage: 0.5,
      timeLimit: 30 // 30 minutes
    },
    {
      id: 'swing',
      name: 'Swing Trading',
      description: 'Longer-term trades with wider stops and multiple targets',
      stopLoss: 50,
      takeProfits: [
        { id: '1', price: '', percentage: 25 },
        { id: '2', price: '', percentage: 25 },
        { id: '3', price: '', percentage: 25 },
        { id: '4', price: '', percentage: 25 }
      ],
      trailingStop: true,
      trailingStopDistance: 30,
      trailingStopActivation: 20,
      riskPercentage: 1.5
    }
  ];

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedAccount('');
      setSymbol('EURUSD');
      setOrderType('buy');
      setLotSize(0.01);
      setStopLoss('');
      setTakeProfits([{ id: '1', price: '', percentage: 100 }]);
      setError(null);
      setSuccess(false);
      setShowAdvancedSettings(false);
      setUseTrailingStop(false);
      setTrailingStopDistance(20);
      setTrailingStopActivation(10);
      setRiskPercentage(1);
      setTimeLimit(0);
      setShowPresets(false);
      
      // Auto-select first account if available
      if (accounts.length > 0 && !selectedAccount) {
        setSelectedAccount(accounts[0].id);
      }
    }
  }, [isOpen, accounts]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!selectedAccount) {
      setError('Please select a trading account');
      return;
    }
    
    if (!symbol) {
      setError('Please enter a trading symbol');
      return;
    }
    
    if (lotSize <= 0) {
      setError('Lot size must be greater than 0');
      return;
    }
    
    // Validate take profits
    const totalPercentage = takeProfits.reduce((sum, tp) => sum + tp.percentage, 0);
    if (totalPercentage !== 100) {
      setError('Take profit percentages must add up to 100%');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Simulate API call to open trade
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccess(true);
      
      // Close modal after delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to open trade. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getAccountName = (accountId: string) => {
    const account = accounts.find(acc => acc.id === accountId);
    return account ? account.name : 'Unknown Account';
  };

  const addTakeProfit = () => {
    // Recalculate percentages to make room for new TP
    const newPercentage = 20;
    const currentTotal = takeProfits.reduce((sum, tp) => sum + tp.percentage, 0);
    const remainingPercentage = 100 - currentTotal;
    
    if (remainingPercentage <= 0) {
      // Redistribute existing percentages
      const newTakeProfits = takeProfits.map(tp => ({
        ...tp,
        percentage: Math.floor(tp.percentage * 0.8) // Reduce each by 20%
      }));
      
      // Calculate what's left to reach 100%
      const newTotal = newTakeProfits.reduce((sum, tp) => sum + tp.percentage, 0);
      const leftover = 100 - newTotal - newPercentage;
      
      // Add the leftover to the first TP
      if (newTakeProfits.length > 0) {
        newTakeProfits[0].percentage += leftover;
      }
      
      setTakeProfits([
        ...newTakeProfits,
        { id: Date.now().toString(), price: '', percentage: newPercentage }
      ]);
    } else {
      setTakeProfits([
        ...takeProfits,
        { id: Date.now().toString(), price: '', percentage: newPercentage }
      ]);
    }
  };

  const removeTakeProfit = (id: string) => {
    if (takeProfits.length <= 1) return;
    
    const tpToRemove = takeProfits.find(tp => tp.id === id);
    if (!tpToRemove) return;
    
    const remainingTPs = takeProfits.filter(tp => tp.id !== id);
    const percentageToRedistribute = tpToRemove.percentage;
    
    // Redistribute the percentage to the first TP
    if (remainingTPs.length > 0) {
      remainingTPs[0].percentage += percentageToRedistribute;
    }
    
    setTakeProfits(remainingTPs);
  };

  const updateTakeProfitPrice = (id: string, price: string) => {
    setTakeProfits(takeProfits.map(tp => 
      tp.id === id ? { ...tp, price } : tp
    ));
  };

  const updateTakeProfitPercentage = (id: string, percentage: number) => {
    // Ensure percentage is between 1 and 100
    const validPercentage = Math.min(100, Math.max(1, percentage));
    
    // Get the current total excluding this TP
    const otherTPs = takeProfits.filter(tp => tp.id !== id);
    const otherTotal = otherTPs.reduce((sum, tp) => sum + tp.percentage, 0);
    
    // Calculate how much we can allocate to this TP
    const maxAllowable = 100 - otherTotal;
    const finalPercentage = Math.min(validPercentage, maxAllowable);
    
    setTakeProfits(takeProfits.map(tp => 
      tp.id === id ? { ...tp, percentage: finalPercentage } : tp
    ));
  };

  const applyRiskPreset = (preset: RiskPreset) => {
    setStopLoss(preset.stopLoss.toString());
    setTakeProfits(preset.takeProfits);
    setUseTrailingStop(preset.trailingStop);
    setTrailingStopDistance(preset.trailingStopDistance);
    setTrailingStopActivation(preset.trailingStopActivation);
    setRiskPercentage(preset.riskPercentage);
    if (preset.timeLimit) setTimeLimit(preset.timeLimit);
    setShowPresets(false);
  };

  const calculateRiskReward = () => {
    if (!stopLoss || takeProfits.length === 0 || !takeProfits[0].price) return null;
    
    const slPips = parseFloat(stopLoss);
    const tpPips = parseFloat(takeProfits[0].price);
    
    if (isNaN(slPips) || isNaN(tpPips)) return null;
    
    const risk = slPips;
    const reward = tpPips;
    
    return (reward / risk).toFixed(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white">Open New Trade</h3>
          <p className="text-gray-400 mt-1">Execute a trade with advanced risk management</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Account Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Trading Account
            </label>
            {isAccountsLoading ? (
              <div className="flex items-center space-x-2">
                <RefreshCw className="h-5 w-5 text-accent animate-spin" />
                <span className="text-gray-400">Loading accounts...</span>
              </div>
            ) : accounts.length === 0 ? (
              <div className="flex flex-col space-y-2">
                <div className="text-yellow-400 flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>No trading accounts connected</span>
                </div>
                <button
                  type="button"
                  onClick={() => window.location.href = '/trading-accounts'}
                  className="text-accent hover:text-accent-dark transition-colors flex items-center"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Connect an account first
                </button>
              </div>
            ) : (
              <select
                value={selectedAccount}
                onChange={(e) => setSelectedAccount(e.target.value)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              >
                <option value="">Select an account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} ({account.type.toUpperCase()}) - {account.balance.toFixed(2)} {account.currency}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Symbol Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Symbol
            </label>
            <div className="relative">
              <input
                type="text"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                placeholder="EURUSD"
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {commonPairs.map((pair) => (
                  <button
                    key={pair}
                    type="button"
                    onClick={() => setSymbol(pair)}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      symbol === pair 
                        ? 'bg-accent text-white' 
                        : 'bg-dark-200/50 text-gray-300 hover:bg-dark-200/80'
                    }`}
                  >
                    {pair}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Order Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Order Type
            </label>
            <div className="flex rounded-lg bg-dark-200/30 p-1">
              <button
                type="button"
                onClick={() => setOrderType('buy')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  orderType === 'buy' 
                    ? 'bg-emerald-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>BUY</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('sell')}
                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  orderType === 'sell' 
                    ? 'bg-red-500 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <TrendingDown className="h-4 w-4" />
                  <span>SELL</span>
                </div>
              </button>
            </div>
          </div>

          {/* Risk Presets */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-400">
                Risk Management
              </label>
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="text-accent hover:text-accent-dark transition-colors text-sm flex items-center"
              >
                <Shield className="h-4 w-4 mr-1" />
                <span>Presets</span>
                {showPresets ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
              </button>
            </div>
            
            {showPresets && (
              <div className="mt-2 glass-panel rounded-lg p-4 border border-dark-300/30 space-y-3">
                <div className="text-sm text-white mb-2">Select a risk management preset:</div>
                {riskPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => applyRiskPreset(preset)}
                    className="w-full flex items-start space-x-3 p-3 rounded-lg hover:bg-dark-200/50 transition-colors text-left"
                  >
                    <div className="p-2 bg-dark-200/50 rounded-lg">
                      {preset.id === 'conservative' && <Shield className="h-5 w-5 text-emerald-400" />}
                      {preset.id === 'balanced' && <Target className="h-5 w-5 text-accent" />}
                      {preset.id === 'aggressive' && <Zap className="h-5 w-5 text-red-400" />}
                      {preset.id === 'scalping' && <Clock className="h-5 w-5 text-yellow-400" />}
                      {preset.id === 'swing' && <BarChart2 className="h-5 w-5 text-purple-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{preset.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{preset.description}</div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <div className="px-2 py-0.5 bg-dark-200/50 rounded-full text-xs text-gray-300">
                          SL: {preset.stopLoss} pips
                        </div>
                        <div className="px-2 py-0.5 bg-dark-200/50 rounded-full text-xs text-gray-300">
                          TP: {preset.takeProfits.length} level{preset.takeProfits.length > 1 ? 's' : ''}
                        </div>
                        {preset.trailingStop && (
                          <div className="px-2 py-0.5 bg-dark-200/50 rounded-full text-xs text-gray-300">
                            Trailing Stop
                          </div>
                        )}
                        <div className="px-2 py-0.5 bg-dark-200/50 rounded-full text-xs text-gray-300">
                          Risk: {preset.riskPercentage}%
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Lot Size */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Lot Size
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={lotSize}
                onChange={(e) => setLotSize(parseFloat(e.target.value))}
                step="0.01"
                min="0.01"
                max="100"
                className="flex-1 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
              <div className="flex space-x-2">
                {[0.01, 0.1, 0.5, 1, 5].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setLotSize(size)}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      lotSize === size 
                        ? 'bg-accent text-white' 
                        : 'bg-dark-200/50 text-gray-300 hover:bg-dark-200/80'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Stop Loss (pips)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                placeholder="e.g., 20"
                className="flex-1 bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
              <div className="flex space-x-2">
                {[10, 20, 50, 100].map((pips) => (
                  <button
                    key={pips}
                    type="button"
                    onClick={() => setStopLoss(pips.toString())}
                    className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                      stopLoss === pips.toString() 
                        ? 'bg-accent text-white' 
                        : 'bg-dark-200/50 text-gray-300 hover:bg-dark-200/80'
                    }`}
                  >
                    {pips}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Take Profit Levels */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-400">
                Take Profit Levels
              </label>
              <button
                type="button"
                onClick={addTakeProfit}
                className="text-accent hover:text-accent-dark transition-colors text-sm flex items-center"
                disabled={takeProfits.length >= 5}
              >
                <Plus className="h-4 w-4 mr-1" />
                <span>Add Level</span>
              </button>
            </div>
            
            <div className="space-y-3">
              {takeProfits.map((tp, index) => (
                <div key={tp.id} className="flex items-center space-x-3">
                  <div className="p-1.5 bg-dark-200/50 rounded-lg">
                    <Target className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Price (pips)
                      </label>
                      <input
                        type="text"
                        value={tp.price}
                        onChange={(e) => updateTakeProfitPrice(tp.id, e.target.value)}
                        placeholder={`TP ${index + 1}`}
                        className="w-full bg-dark-200/50 text-white rounded-lg px-3 py-2
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Position Size %
                      </label>
                      <input
                        type="number"
                        value={tp.percentage}
                        onChange={(e) => updateTakeProfitPercentage(tp.id, parseInt(e.target.value))}
                        min="1"
                        max="100"
                        className="w-full bg-dark-200/50 text-white rounded-lg px-3 py-2
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50 text-sm"
                      />
                    </div>
                  </div>
                  {takeProfits.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTakeProfit(tp.id)}
                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>Total allocation:</span>
              <span className={`font-medium ${
                takeProfits.reduce((sum, tp) => sum + tp.percentage, 0) === 100 
                  ? 'text-emerald-400' 
                  : 'text-red-400'
              }`}>
                {takeProfits.reduce((sum, tp) => sum + tp.percentage, 0)}%
              </span>
            </div>
          </div>

          {/* Advanced Settings Toggle */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className="w-full flex items-center justify-between p-3 bg-dark-200/30 rounded-lg hover:bg-dark-200/50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-accent" />
                <span className="text-white font-medium">Advanced Settings</span>
              </div>
              {showAdvancedSettings ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Advanced Settings Panel */}
          {showAdvancedSettings && (
            <div className="space-y-4 glass-panel rounded-lg p-4 border border-dark-300/30">
              {/* Trailing Stop */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-400">
                      Trailing Stop
                    </label>
                    <div className="relative group">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-dark-100 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Trailing stop follows price movement in your favor, adjusting the stop loss level automatically.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUseTrailingStop(!useTrailingStop)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                      useTrailingStop ? 'bg-accent' : 'bg-dark-300'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      useTrailingStop ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                {useTrailingStop && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Distance (pips)
                      </label>
                      <input
                        type="number"
                        value={trailingStopDistance}
                        onChange={(e) => setTrailingStopDistance(parseInt(e.target.value))}
                        min="1"
                        className="w-full bg-dark-200/50 text-white rounded-lg px-3 py-2
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Activation (pips)
                      </label>
                      <input
                        type="number"
                        value={trailingStopActivation}
                        onChange={(e) => setTrailingStopActivation(parseInt(e.target.value))}
                        min="0"
                        className="w-full bg-dark-200/50 text-white rounded-lg px-3 py-2
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50 text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Risk Percentage */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Risk Percentage
                </label>
                <div className="flex items-center space-x-3">
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={riskPercentage}
                    onChange={(e) => setRiskPercentage(parseFloat(e.target.value))}
                    className="flex-1 accent-accent"
                  />
                  <div className="w-16 text-center text-white font-medium">
                    {riskPercentage}%
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Conservative</span>
                  <span>Aggressive</span>
                </div>
              </div>
              
              {/* Time Limit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-400">
                      Time Limit
                    </label>
                    <div className="relative group">
                      <HelpCircle className="h-4 w-4 text-gray-500" />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-dark-100 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Automatically close the trade after a specific time period (in minutes). Set to 0 to disable.
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setTimeLimit(Math.max(0, timeLimit - 15))}
                      className="p-1 bg-dark-200/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-white font-medium w-16 text-center">
                      {timeLimit > 0 ? `${timeLimit} min` : 'None'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTimeLimit(timeLimit + 15)}
                      className="p-1 bg-dark-200/50 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {timeLimit > 0 && (
                  <div className="flex items-center space-x-3 mt-2">
                    <input
                      type="range"
                      min="0"
                      max="240"
                      step="15"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                      className="flex-1 accent-accent"
                    />
                  </div>
                )}
              </div>
              
              {/* Save as Preset */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-3 py-1.5 bg-dark-200/50 text-gray-300 rounded-lg hover:bg-dark-200/80 transition-colors text-sm"
                >
                  <Save className="h-4 w-4" />
                  <span>Save as Preset</span>
                </button>
              </div>
            </div>
          )}

          {/* Risk Calculation */}
          <div className="glass-panel rounded-lg p-4 bg-dark-200/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Percent className="h-4 w-4 text-accent" />
                <span className="text-white font-medium">Risk Calculation</span>
              </div>
              <div className="text-accent">{riskPercentage}% of account</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Potential Loss:</span>
                  <span className="text-red-400">-$120.00</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Potential Profit:</span>
                  <span className="text-emerald-400">+$240.00</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Risk/Reward:</span>
                  <span className="text-white font-medium">1:{calculateRiskReward() || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Expected Value:</span>
                  <span className="text-emerald-400">+$85.50</span>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 text-red-400 rounded-lg p-4 flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={isSubmitting || success || !selectedAccount}
              className={`premium-button flex-1 py-3 flex items-center justify-center ${
                orderType === 'buy' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : success ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Trade Executed!
                </>
              ) : (
                <>
                  {orderType === 'buy' ? 'Buy' : 'Sell'} {symbol}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-dark-300/50 text-gray-400 
                       rounded-lg hover:bg-dark-200/50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}