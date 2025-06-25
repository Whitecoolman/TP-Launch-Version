import React, { useState } from 'react';
import { X, AlertTriangle, ArrowRight, Shield, Zap, CheckCircle2, Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  lot: number;
  openPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  profit: number;
  time: string;
  tradeBy: string;
}

interface BulkModifyTradesModalProps {
  isOpen: boolean;
  onClose: () => void;
  trades: Trade[];
  onBulkModify: (changes: {
    stopLossAction: 'none' | 'set' | 'adjust';
    stopLossValue: number;
    takeProfitAction: 'none' | 'set' | 'adjust';
    takeProfitValue: number;
    applyTo: 'all' | 'profitable' | 'losing' | 'selected';
    selectedTrades: string[];
    trailingStop: boolean;
    trailingStopDistance: number;
  }) => void;
}

export default function BulkModifyTradesModal({ 
  isOpen, 
  onClose, 
  trades,
  onBulkModify 
}: BulkModifyTradesModalProps) {
  const [stopLossAction, setStopLossAction] = useState<'none' | 'set' | 'adjust'>('none');
  const [stopLossValue, setStopLossValue] = useState<number>(0);
  const [takeProfitAction, setTakeProfitAction] = useState<'none' | 'set' | 'adjust'>('none');
  const [takeProfitValue, setTakeProfitValue] = useState<number>(0);
  const [applyTo, setApplyTo] = useState<'all' | 'profitable' | 'losing' | 'selected'>('all');
  const [selectedTrades, setSelectedTrades] = useState<string[]>([]);
  const [trailingStop, setTrailingStop] = useState<boolean>(false);
  const [trailingStopDistance, setTrailingStopDistance] = useState<number>(20);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  if (!isOpen) return null;

  const profitableTrades = trades.filter(trade => trade.profit > 0);
  const losingTrades = trades.filter(trade => trade.profit <= 0);

  const getAffectedTradesCount = () => {
    switch (applyTo) {
      case 'all':
        return trades.length;
      case 'profitable':
        return profitableTrades.length;
      case 'losing':
        return losingTrades.length;
      case 'selected':
        return selectedTrades.length;
      default:
        return 0;
    }
  };

  const handleSubmit = () => {
    if (stopLossAction === 'none' && takeProfitAction === 'none') {
      return;
    }

    if (showConfirmation) {
      onBulkModify({
        stopLossAction,
        stopLossValue,
        takeProfitAction,
        takeProfitValue,
        applyTo,
        selectedTrades,
        trailingStop,
        trailingStopDistance
      });
      onClose();
    } else {
      setShowConfirmation(true);
    }
  };

  const toggleTradeSelection = (tradeId: string) => {
    setSelectedTrades(prev => 
      prev.includes(tradeId)
        ? prev.filter(id => id !== tradeId)
        : [...prev, tradeId]
    );
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
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Settings className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">Bulk Modify Trades</h3>
              <p className="text-gray-400 mt-1">Apply changes to multiple trades at once</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {showConfirmation ? (
            <div className="space-y-6">
              <div className="glass-panel rounded-xl p-4 bg-accent/10 border border-accent/20">
                <div className="flex items-center space-x-3 mb-4">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                  <h4 className="text-white font-medium">Confirm Changes</h4>
                </div>
                <p className="text-gray-300 mb-4">
                  You are about to modify {getAffectedTradesCount()} trades. Please review your changes before proceeding.
                </p>
                
                <div className="space-y-3">
                  {stopLossAction !== 'none' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Stop Loss:</span>
                      <span className="text-white">
                        {stopLossAction === 'set' ? `Set to ${stopLossValue}` : `Adjust by ${stopLossValue > 0 ? '+' : ''}${stopLossValue}`}
                      </span>
                    </div>
                  )}
                  
                  {takeProfitAction !== 'none' && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Take Profit:</span>
                      <span className="text-white">
                        {takeProfitAction === 'set' ? `Set to ${takeProfitValue}` : `Adjust by ${takeProfitValue > 0 ? '+' : ''}${takeProfitValue}`}
                      </span>
                    </div>
                  )}
                  
                  {trailingStop && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Trailing Stop:</span>
                      <span className="text-white">Enabled, {trailingStopDistance} pips</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Apply To:</span>
                    <span className="text-white capitalize">{applyTo} trades</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSubmit}
                  className="premium-button flex-1 py-3 flex items-center justify-center"
                >
                  Confirm Changes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="flex-1 px-4 py-3 border border-dark-300/50 text-gray-400 
                           rounded-lg hover:bg-dark-200/50 transition-all duration-300"
                >
                  Back to Edit
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Stop Loss Settings */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-medium text-white mb-4">Stop Loss</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Action</label>
                    <select
                      value={stopLossAction}
                      onChange={(e) => setStopLossAction(e.target.value as 'none' | 'set' | 'adjust')}
                      className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                               border border-dark-300/50 focus:outline-none focus:ring-1 
                               focus:ring-accent/50"
                    >
                      <option value="none">No Change</option>
                      <option value="set">Set to Value</option>
                      <option value="adjust">Adjust by Value</option>
                    </select>
                  </div>
                  
                  {stopLossAction !== 'none' && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        {stopLossAction === 'set' ? 'Value' : 'Adjustment'}
                        {stopLossAction === 'adjust' && ' (positive = widen, negative = tighten)'}
                      </label>
                      <input
                        type="number"
                        value={stopLossValue}
                        onChange={(e) => setStopLossValue(Number(e.target.value))}
                        className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50"
                      />
                    </div>
                  )}
                  
                  {stopLossAction !== 'none' && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="trailing-stop"
                          checked={trailingStop}
                          onChange={(e) => setTrailingStop(e.target.checked)}
                          className="h-4 w-4 rounded border-dark-300 bg-dark-200 text-accent focus:ring-accent focus:ring-offset-dark-100"
                        />
                        <label htmlFor="trailing-stop" className="text-white">Enable Trailing Stop</label>
                      </div>
                    </div>
                  )}
                  
                  {trailingStop && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Trailing Distance (pips)</label>
                      <input
                        type="number"
                        value={trailingStopDistance}
                        onChange={(e) => setTrailingStopDistance(Number(e.target.value))}
                        min="1"
                        className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Take Profit Settings */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-medium text-white mb-4">Take Profit</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Action</label>
                    <select
                      value={takeProfitAction}
                      onChange={(e) => setTakeProfitAction(e.target.value as 'none' | 'set' | 'adjust')}
                      className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                               border border-dark-300/50 focus:outline-none focus:ring-1 
                               focus:ring-accent/50"
                    >
                      <option value="none">No Change</option>
                      <option value="set">Set to Value</option>
                      <option value="adjust">Adjust by Value</option>
                    </select>
                  </div>
                  
                  {takeProfitAction !== 'none' && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">
                        {takeProfitAction === 'set' ? 'Value' : 'Adjustment'}
                        {takeProfitAction === 'adjust' && ' (positive = widen, negative = tighten)'}
                      </label>
                      <input
                        type="number"
                        value={takeProfitValue}
                        onChange={(e) => setTakeProfitValue(Number(e.target.value))}
                        className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Apply To */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-medium text-white mb-4">Apply To</h4>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setApplyTo('all')}
                      className={`p-3 rounded-lg border ${
                        applyTo === 'all' 
                          ? 'border-accent bg-accent/10 text-white' 
                          : 'border-dark-300/30 bg-dark-200/30 text-gray-400 hover:bg-dark-200/50'
                      } transition-all`}
                    >
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5" />
                        <span>All Trades</span>
                      </div>
                      <div className="text-xs mt-1">{trades.length} trades</div>
                    </button>
                    
                    <button
                      onClick={() => setApplyTo('profitable')}
                      className={`p-3 rounded-lg border ${
                        applyTo === 'profitable' 
                          ? 'border-emerald-400 bg-emerald-500/10 text-white' 
                          : 'border-dark-300/30 bg-dark-200/30 text-gray-400 hover:bg-dark-200/50'
                      } transition-all`}
                    >
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5" />
                        <span>Profitable</span>
                      </div>
                      <div className="text-xs mt-1">{profitableTrades.length} trades</div>
                    </button>
                    
                    <button
                      onClick={() => setApplyTo('losing')}
                      className={`p-3 rounded-lg border ${
                        applyTo === 'losing' 
                          ? 'border-red-400 bg-red-500/10 text-white' 
                          : 'border-dark-300/30 bg-dark-200/30 text-gray-400 hover:bg-dark-200/50'
                      } transition-all`}
                    >
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-5 w-5" />
                        <span>Losing</span>
                      </div>
                      <div className="text-xs mt-1">{losingTrades.length} trades</div>
                    </button>
                    
                    <button
                      onClick={() => setApplyTo('selected')}
                      className={`p-3 rounded-lg border ${
                        applyTo === 'selected' 
                          ? 'border-accent bg-accent/10 text-white' 
                          : 'border-dark-300/30 bg-dark-200/30 text-gray-400 hover:bg-dark-200/50'
                      } transition-all`}
                    >
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Selected</span>
                      </div>
                      <div className="text-xs mt-1">{selectedTrades.length} selected</div>
                    </button>
                  </div>
                  
                  {applyTo === 'selected' && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-400 mb-2">Select Trades</h5>
                      <div className="max-h-40 overflow-y-auto space-y-2">
                        {trades.map(trade => (
                          <div 
                            key={trade.id}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="checkbox"
                              id={`trade-${trade.id}`}
                              checked={selectedTrades.includes(trade.id)}
                              onChange={() => toggleTradeSelection(trade.id)}
                              className="h-4 w-4 rounded border-dark-300 bg-dark-200 text-accent focus:ring-accent focus:ring-offset-dark-100"
                            />
                            <label 
                              htmlFor={`trade-${trade.id}`}
                              className="flex items-center space-x-2 text-white cursor-pointer"
                            >
                              <span>{trade.symbol}</span>
                              <span className={`px-2 py-0.5 text-xs rounded-full ${
                                trade.type === 'buy' 
                                  ? 'bg-emerald-500/20 text-emerald-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {trade.type.toUpperCase()}
                              </span>
                              <span className={`${
                                trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                              }`}>
                                {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USD
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Warning */}
              <div className="flex items-start space-x-3 p-4 bg-dark-200/30 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300">
                    Bulk modifying trades can significantly impact your risk management.
                  </p>
                  <p className="text-gray-400">
                    Make sure you understand the implications before proceeding.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSubmit}
                  disabled={stopLossAction === 'none' && takeProfitAction === 'none'}
                  className="premium-button flex-1 py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply Changes
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-dark-300/50 text-gray-400 
                           rounded-lg hover:bg-dark-200/50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}