import React, { useState, useEffect } from 'react';
import { X, Copy, AlertTriangle, Check, Plus, HelpCircle } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface WebhookConfig {
  id: string;
  name: string;
  symbols: string[];
  isActive: boolean;
  isPublic: boolean;
  status: 'connected' | 'not_connected';
  type: 'advanced' | 'basic';
  lastTrigger?: string;
  successRate?: number;
  totalTrades?: number;
  color?: string;
}

interface EditWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, name: string, symbols: string[]) => void;
  webhook: WebhookConfig;
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

export default function EditWebhookModal({ isOpen, onClose, onSave, webhook }: EditWebhookModalProps) {
  const [mode, setMode] = useState<WebhookMode>(webhook.type);
  const [orderType, setOrderType] = useState<OrderType>('Market Order');
  
  // Basic Mode Fields
  const [webhookName, setWebhookName] = useState(webhook.name);
  const [messageName, setMessageName] = useState('');
  const [pair, setPair] = useState(webhook.symbols[0] || '');
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

  useEffect(() => {
    if (webhook) {
      setMode(webhook.type);
      setWebhookName(webhook.name);
      setPair(webhook.symbols[0] || '');
    }
  }, [webhook]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(webhook.id, webhookName, [pair]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        <div className="relative p-5 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-lg font-medium text-white tracking-tight">Edit webhook</h3>
        </div>

        <div className="p-5 space-y-5">
          {/* Mode Selector */}
          <div className="flex rounded-lg bg-dark-200/30 p-1">
            <button
              onClick={() => setMode('basic')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'basic' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setMode('advanced')}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                mode === 'advanced' 
                  ? 'bg-accent text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Advanced
            </button>
          </div>

          {mode === 'basic' && (
            <>
              {/* Order Type Selector */}
              <div className="flex rounded-lg bg-dark-200/30 p-1">
                {(['Market Order', 'Modify Order', 'Close Order'] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => setOrderType(type)}
                    className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all ${
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
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Webhook name</span>
                    <Tooltip content={tooltips.webhookName}>
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={webhookName}
                    onChange={(e) => setWebhookName(e.target.value)}
                    placeholder="First webhook"
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Pair</span>
                    <Tooltip content={tooltips.pair}>
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={pair}
                    onChange={(e) => setPair(e.target.value)}
                    placeholder="BTCUSD"
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                  />
                </div>
              </div>
            </>
          )}

          {mode === 'advanced' && (
            <div className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Name</span>
                  <Tooltip content={tooltips.webhookName}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={webhookName}
                  onChange={(e) => setWebhookName(e.target.value)}
                  placeholder="First webhook"
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                  <span>Pair</span>
                  <Tooltip content={tooltips.pair}>
                    <HelpCircle className="h-4 w-4" />
                  </Tooltip>
                </label>
                <input
                  type="text"
                  value={pair}
                  onChange={(e) => setPair(e.target.value)}
                  placeholder="BTCUSD"
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>
            </div>
          )}

          <button
            onClick={handleSave}
            className="w-full premium-button py-2.5 flex items-center justify-center space-x-2"
          >
            <span>Save Changes</span>
            <Check className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}