import React from 'react';
import { Webhook, Zap, Shield, ArrowRight, Wallet, Wrench } from 'lucide-react';

interface QuickActionsProps {
  onNewWebhook: () => void;
  onViewChange: (view: string) => void;
  onBulkModify?: () => void;
}

export default function QuickActions({ onNewWebhook, onViewChange, onBulkModify }: QuickActionsProps) {
  const actions = [
    {
      icon: <Webhook className="h-5 w-5 md:h-6 md:w-6 text-accent" />,
      title: "Create Webhook",
      description: "Set up a new TradingView webhook",
      buttonText: "New Webhook",
      onClick: onNewWebhook,
      gradient: "from-accent/20 to-accent/5"
    },
    {
      icon: <Wallet className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />,
      title: "Add Trading Account",
      description: "Connect a new trading account",
      buttonText: "Add Account",
      onClick: () => onViewChange('trading-accounts'),
      gradient: "from-purple-500/20 to-purple-500/5"
    },
    {
      icon: <Wrench className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />,
      title: "Bulk Modify Trades",
      description: "Modify multiple trades at once",
      buttonText: "Bulk Modify",
      onClick: () => onViewChange('trades'),
      gradient: "from-emerald-500/20 to-emerald-500/5"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
      {actions.map((action, index) => (
        <div 
          key={index}
          className="glass-panel glass-panel-hover rounded-xl p-4 md:p-6 border border-dark-300/30 hover:border-accent/20 bg-gradient-to-br from-dark-200/20 to-dark-200/5 transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className={`p-2 md:p-3 bg-gradient-to-br ${action.gradient} rounded-lg`}>
              {action.icon}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="text-base md:text-lg font-medium text-white">{action.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-gray-400 mt-1">{action.description}</p>
              <button
                onClick={action.onClick}
                className="mt-3 md:mt-4 w-full flex items-center justify-center py-1.5 md:py-2 text-xs md:text-sm rounded-lg transition-all bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 text-white shadow-md shadow-accent/10"
              >
                {action.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}