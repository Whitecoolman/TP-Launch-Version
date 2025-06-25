import React, { useState } from 'react';
import { X, Copy, AlertTriangle, Check, Plus, HelpCircle } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface NewWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWebhook: (name: string, symbols: string[]) => void;
}

type WebhookMode = 'basic' | 'advanced';
type OrderType = 'Market Order' | 'Modify Order' | 'Close Order';

const tooltips = {
  webhookName: "A unique name to identify your webhook",
  messageName: "Name of the message template that will be sent to TradingView",
  pair: "Trading pair symbol (e.g., BTCUSD, EURUSD)",
  orderType: "Type of order to execute",
  sizeType: "Choose between percentage of account balance or fixed lot size",
  stopLoss: "Price level where the trade will be closed to limit losses",
  takeProfit: "Price level where the trade will be closed to secure profits",
  partialClose: "Close only a portion of the open position",
  allTrades: "Close all open trades for this symbol",
  modifyPrice: "New price level for stop loss or take profit",
  closeType: "Method of closing the trade",
  fixedSize: "Trading volume in lots",
  percentageSize: "Position size as a percentage of account balance"
};

export default function NewWebhookModal({ isOpen, onClose, onCreateWebhook }: NewWebhookModalProps) {
  const [mode, setMode] = useState<WebhookMode>('basic');
  const [orderType, setOrderType] = useState<OrderType>('Market Order');
  
  // Basic Mode Fields
  const [webhookName, setWebhookName] = useState('');
  const [messageName, setMessageName] = useState('');
  const [pair, setPair] = useState('');
  const [orderDirection, setOrderDirection] = useState('Buy');
  const [usePercentageSize, setUsePercentageSize] = useState(true);
  const [percentageSize, setPercentageSize] = useState(1);
  const [fixedSize, setFixedSize] = useState(2);
  const [stopLoss, setStopLoss] = useState(200);
  const [takeProfit, setTakeProfit] = useState(200);
  
  // Close Order Fields
  const [partialClose, setPartialClose] = useState(false);
  const [closeAllTrades, setCloseAllTrades] = useState(false);
  const [closeType, setCloseType] = useState('Market');
  
  // Modify Order Fields
  const [modifyPrice, setModifyPrice] = useState('');
  const [modifyType, setModifyType] = useState('Stop Loss');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-3xl z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className="relative p-8 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-2xl font-medium text-white tracking-tight">Create New Webhook</h3>
          <p className="text-gray-400 mt-2">Set up automated trading with TradingView signals</p>
        </div>

        <div className="p-8 space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Mode Selector */}
          <div className="flex rounded-xl bg-dark-200/30 p-1.5">
            <button
              onClick={() => setMode('basic')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'basic' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Basic Mode
            </button>
            <button
              onClick={() => setMode('advanced')}
              className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                mode === 'advanced' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Advanced Mode
            </button>
          </div>

          {/* Mode Description */}
          <div className="bg-dark-200/30 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                {mode === 'basic' ? (
                  <>
                    <p className="text-white">Basic webhook supports three message types:</p>
                    <ul className="list-disc text-gray-400 ml-4 space-y-1">
                      <li>Market Order: Places a market order based on specified inputs</li>
                      <li>Update SL/TP: Updates the stop-loss or take-profit price</li>
                      <li>Close Trade: Closes open trades with optional partial closing</li>
                    </ul>
                  </>
                ) : (
                  <p className="text-white">
                    Advanced mode enables direct integration with TradingView indicators and
                    custom strategies. Perfect for complex automation needs.
                  </p>
                )}
              </div>
            </div>
          </div>

          {mode === 'basic' && (
            <>
              {/* Order Type Selector */}
              <div className="flex rounded-xl bg-dark-200/30 p-1.5">
                {(['Market Order', 'Modify Order', 'Close Order'] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                      orderType === type 
                        ? 'bg-accent text-white' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Common Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Webhook Name</span>
                    <Tooltip content={tooltips.webhookName}>
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={webhookName}
                    onChange={(e) => setWebhookName(e.target.value)}
                    placeholder="My First Webhook"
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Trading Pair</span>
                    <Tooltip content={tooltips.pair}>
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                    placeholder="BTCUSD"
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                  />
                </div>
              </div>

              {/* Order Type Specific Fields */}
              <div className="space-y-6">
                {orderType === 'Market Order' && (
                  <>
                    <div>
                      <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                        <span>Order Direction</span>
                        <Tooltip content={tooltips.orderType}>
                          <HelpCircle className="h-4 w-4" />
                        </Tooltip>
                      </label>
                      <select
                        value={orderDirection}
                        onChange={(e) => setOrderDirection(e.target.value)}
                        className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                                 border border-dark-300/50 focus:outline-none focus:ring-1 
                                 focus:ring-accent/50"
                      >
                        <option>Buy</option>
                        <option>Sell</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center space-x-2 text-sm text-gray-400">
                          <span>Position Size</span>
                          <Tooltip content={tooltips.sizeType}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <button
                          onClick={() => setUsePercentageSize(!usePercentageSize)}
                          className="text-sm text-accent hover:text-accent-dark"
                        >
                          Switch to {usePercentageSize ? 'fixed' : 'percentage'}
                        </button>
                      </div>
                      {usePercentageSize ? (
                        <div className="space-y-2">
                          <input
                            type="range"
                            min="1"
                            max="100"
                            value={percentageSize}
                            onChange={(e) => setPercentageSize(Number(e.target.value))}
                            className="w-full accent-accent"
                          />
                          <div className="flex justify-between text-sm text-gray-400">
                            <span>1%</span>
                            <span>{percentageSize}%</span>
                            <span>100%</span>
                          </div>
                        </div>
                      ) : (
                        <input
                          type="number"
                          value={fixedSize}
                          onChange={(e) => setFixedSize(Number(e.target.value))}
                          className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                                   border border-dark-300/50 focus:outline-none focus:ring-1 
                                   focus:ring-accent/50"
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>Stop Loss (pips)</span>
                          <Tooltip content={tooltips.stopLoss}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          value={stopLoss}
                          onChange={(e) => setStopLoss(Number(e.target.value))}
                          className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                                   border border-dark-300/50 focus:outline-none focus:ring-1 
                                   focus:ring-accent/50"
                        />
                      </div>

                      <div>
                        <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                          <span>Take Profit (pips)</span>
                          <Tooltip content={tooltips.takeProfit}>
                            <HelpCircle className="h-4 w-4" />
                          </Tooltip>
                        </label>
                        <input
                          type="number"
                          value={takeProfit}
                          onChange={(e) => setTakeProfit(Number(e.target.value))}
                          className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                                   border border-dark-300/50 focus:outline-none focus:ring-1 
                                   focus:ring-accent/50"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {mode === 'advanced' && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Webhook Name</span>
                  <Tooltip content={tooltips.webhookName}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={webhookName}
                  onChange={(e) => setWebhookName(e.target.value)}
                  placeholder="My Advanced Webhook"
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Trading Pairs</span>
                  <Tooltip content="Comma-separated list of trading pairs">
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={pair}
                  onChange={(e) => setPair(e.target.value)}
                  placeholder="BTCUSD, ETHUSD, EURUSD"
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-3
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-dark-300/50">
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-400 hover:text-gray-300 
                       transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onCreateWebhook(webhookName, [pair]);
                onClose();
              }}
              disabled={!webhookName || !pair}
              className="premium-button px-8 py-3 flex items-center space-x-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Create Webhook</span>
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}