import React from 'react';
import { X, Check, Shield, Zap, Clock } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  trader: {
    name: string;
    profit: number;
    winRate: number;
    price: number;
    avatarUrl: string;
  };
  onSubscribe: () => void;
}

export default function CheckoutModal({ isOpen, onClose, trader, onSubscribe }: CheckoutModalProps) {
  if (!isOpen) return null;

  const benefits = [
    {
      icon: <Zap className="h-5 w-5 text-accent" />,
      text: "Real-time trade copying with ultra-low latency"
    },
    {
      icon: <Shield className="h-5 w-5 text-accent" />,
      text: "Automatic position sizing and risk management"
    },
    {
      icon: <Clock className="h-5 w-5 text-accent" />,
      text: "24/7 automated trading with instant execution"
    }
  ];

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
          
          <div className="flex items-center space-x-4">
            <img
              src={trader.avatarUrl}
              alt={trader.name}
              className="w-16 h-16 rounded-full border-2 border-accent/20"
            />
            <div>
              <h3 className="text-xl font-medium text-white tracking-tight">{trader.name}</h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-emerald-400">+{trader.profit}% Profit</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-300">{trader.winRate}% Win Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Copy Trading Benefits</h4>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="p-1.5 bg-accent/10 rounded-lg">
                    {benefit.icon}
                  </div>
                  <span className="text-gray-300">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-dark-200/50 rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-400">Monthly Subscription</span>
              <div className="text-right">
                <span className="text-2xl font-semibold text-white">${trader.price}</span>
                <span className="text-gray-400">/month</span>
              </div>
            </div>
            
            <button
              onClick={onSubscribe}
              className="premium-button w-full py-3 flex items-center justify-center space-x-2"
            >
              <Check className="h-5 w-5" />
              <span>Subscribe & Start Copying</span>
            </button>
            
            <p className="text-center text-gray-400 text-sm mt-4">
              Cancel anytime. Instant access after payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}