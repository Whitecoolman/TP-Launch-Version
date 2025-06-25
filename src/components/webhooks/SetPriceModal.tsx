import React, { useState } from 'react';
import { X, DollarSign, Users, Clock, Shield, Info } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface SetPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: {
    id: string;
    name: string;
    currentPrice?: number;
    subscribers?: number;
  };
  onSavePrice: (price: number, interval: string) => void;
}

export default function SetPriceModal({ isOpen, onClose, webhook, onSavePrice }: SetPriceModalProps) {
  const [price, setPrice] = useState(webhook.currentPrice || 0);
  const [interval, setInterval] = useState('monthly');
  const [isEnabled, setIsEnabled] = useState(true);

  const handleSave = () => {
    onSavePrice(price, interval);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white tracking-tight">Set Webhook Price</h3>
          <p className="text-gray-400 mt-1">Configure subscription pricing for {webhook.name}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Input */}
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <span>Monthly subscription price</span>
              <Tooltip content="Set the price subscribers will pay to access your webhook">
                <Info className="h-4 w-4" />
              </Tooltip>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min="0"
                step="0.01"
                className="w-full bg-dark-200/50 text-white rounded-lg pl-12 pr-4 py-3
                         border border-dark-300/50 focus:outline-none focus:ring-1 
                         focus:ring-accent/50"
                placeholder="29.99"
              />
            </div>
          </div>

          {/* Billing Interval */}
          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
              <span>Billing interval</span>
              <Tooltip content="Choose how often subscribers will be billed">
                <Info className="h-4 w-4" />
              </Tooltip>
            </label>
            <div className="flex rounded-lg bg-dark-200/30 p-1">
              {['monthly', 'quarterly', 'yearly'].map((option) => (
                <button
                  key={option}
                  onClick={() => setInterval(option)}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    interval === option 
                      ? 'bg-accent text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Enable/Disable Subscriptions */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Enable subscriptions</span>
              <Tooltip content="Allow other users to subscribe to your webhook">
                <Info className="h-4 w-4 text-gray-400" />
              </Tooltip>
            </div>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isEnabled ? 'bg-accent' : 'bg-dark-300'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isEnabled ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>

          {/* Stats */}
          {webhook.subscribers && (
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">Active Subscribers</span>
                </div>
                <div className="text-xl font-semibold text-white">{webhook.subscribers}</div>
              </div>
              <div className="glass-panel rounded-xl p-4">
                <div className="flex items-center space-x-2 text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Avg. Subscription</span>
                </div>
                <div className="text-xl font-semibold text-white">3.2 months</div>
              </div>
            </div>
          )}

          {/* Terms */}
          <div className="glass-panel rounded-xl p-4 space-y-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Seller Protection</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Your webhook content is protected and only accessible to paying subscribers
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              By enabling subscriptions, you agree to our marketplace terms and conditions.
              We take a 5% commission on subscription revenue.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className="premium-button flex-1 py-2.5"
            >
              Save Changes
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