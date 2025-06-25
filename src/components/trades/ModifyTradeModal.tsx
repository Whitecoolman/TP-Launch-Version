import React, { useState } from 'react';
import { X, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/format';

interface ModifyTradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  trade: {
    id: string;
    symbol: string;
    type: 'buy' | 'sell';
    openPrice: number;
    currentPrice: number;
    stopLoss?: number;
    takeProfit?: number;
    lot: number;
  };
  onModify: (id: string, changes: { stopLoss?: number; takeProfit?: number }) => void;
}

export default function ModifyTradeModal({ 
  isOpen, 
  onClose, 
  trade,
  onModify 
}: ModifyTradeModalProps) {
  const [stopLoss, setStopLoss] = useState(trade.stopLoss?.toString() || '');
  const [takeProfit, setTakeProfit] = useState(trade.takeProfit?.toString() || '');
  const [modifyMode, setModifyMode] = useState<'price' | 'pips'>('price');

  if (!isOpen) return null;

  const getPipValue = (symbol: string) => {
    if (symbol.includes('JPY')) return 0.01;
    if (symbol.includes('XAU') || symbol.includes('GOLD')) return 0.1;
    if (symbol.includes('BTC') || symbol.includes('ETH')) return 1;
    return 0.0001;
  };

  const convertPipsToPrice = (pips: number, basePrice: number, type: 'buy' | 'sell', isStopLoss: boolean) => {
    const pipValue = getPipValue(trade.symbol);
    const direction = type === 'buy' ? (isStopLoss ? -1 : 1) : (isStopLoss ? 1 : -1);
    return basePrice + (direction * pips * pipValue);
  };

  const calculateRiskReward = () => {
    if (!stopLoss || !takeProfit) return null;
    
    const sl = modifyMode === 'pips' 
      ? convertPipsToPrice(Number(stopLoss), trade.currentPrice, trade.type, true)
      : Number(stopLoss);
    
    const tp = modifyMode === 'pips'
      ? convertPipsToPrice(Number(takeProfit), trade.currentPrice, trade.type, false)
      : Number(takeProfit);

    const risk = Math.abs(trade.currentPrice - sl);
    const reward = Math.abs(tp - trade.currentPrice);
    return (reward / risk).toFixed(2);
  };

  const handleSubmit = () => {
    const sl = stopLoss ? (
      modifyMode === 'pips' 
        ? convertPipsToPrice(Number(stopLoss), trade.currentPrice, trade.type, true)
        : Number(stopLoss)
    ) : undefined;

    const tp = takeProfit ? (
      modifyMode === 'pips'
        ? convertPipsToPrice(Number(takeProfit), trade.currentPrice, trade.type, false)
        : Number(takeProfit)
    ) : undefined;

    onModify(trade.id, { stopLoss: sl, takeProfit: tp });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white">Modify {trade.symbol}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm ${trade.type === 'buy' ? 'text-emerald-400' : 'text-red-400'}`}>
              {trade.type.toUpperCase()}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{trade.lot} lots</span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Mode Toggle */}
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            <button
              onClick={() => setModifyMode('price')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                modifyMode === 'price' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Price
            </button>
            <button
              onClick={() => setModifyMode('pips')}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                modifyMode === 'pips' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Pips
            </button>
          </div>

          {/* Current Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Open Price</div>
              <div className="text-lg font-medium text-white">{trade.openPrice}</div>
            </div>
            <div className="glass-panel rounded-lg p-4">
              <div className="text-sm text-gray-400 mb-1">Current Price</div>
              <div className="text-lg font-medium text-white">{trade.currentPrice}</div>
            </div>
          </div>

          {/* Stop Loss & Take Profit */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Stop Loss {modifyMode === 'pips' ? '(pips)' : '(price)'}
              </label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
                step={modifyMode === 'pips' ? '1' : getPipValue(trade.symbol)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Take Profit {modifyMode === 'pips' ? '(pips)' : '(price)'}
              </label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
                step={modifyMode === 'pips' ? '1' : getPipValue(trade.symbol)}
                className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
              />
            </div>
          </div>

          {/* Risk/Reward Ratio */}
          {stopLoss && takeProfit && (
            <div className="glass-panel rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Risk/Reward Ratio</span>
                <span className="text-emerald-400 font-medium">1:{calculateRiskReward()}</span>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="flex items-start space-x-3 p-4 bg-dark-200/30 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                Modifying stop loss or take profit levels will affect your risk management.
              </p>
              <p className="text-gray-400">
                Make sure the new levels align with your trading strategy.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSubmit}
              className="premium-button flex-1 py-2.5 flex items-center justify-center"
            >
              Modify Trade
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                       rounded-lg hover:bg-dark-200/50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}