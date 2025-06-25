import React from 'react';
import { X, ExternalLink, Check, AlertCircle } from 'lucide-react';

interface WebhookApp {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'not_connected';
  lastSync?: string;
}

interface WebhookAppsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: {
    id: string;
    name: string;
  };
}

export default function WebhookAppsModal({ isOpen, onClose, webhook }: WebhookAppsModalProps) {
  const apps: WebhookApp[] = [
    {
      id: 'mt5',
      name: 'MetaTrader 5',
      description: 'Execute trades directly on MT5 platform',
      icon: '/mt5-logo.svg',
      status: 'connected',
      lastSync: '2 minutes ago'
    },
    {
      id: 'binance',
      name: 'Binance',
      description: 'Trade crypto on Binance spot and futures',
      icon: '/binance-logo.svg',
      status: 'not_connected'
    },
    {
      id: 'bitget',
      name: 'Bitget',
      description: 'Connect to Bitget exchange API',
      icon: '/bitget-logo.svg',
      status: 'not_connected'
    },
    {
      id: 'tradingview',
      name: 'TradingView',
      description: 'Import alerts from TradingView',
      icon: '/tradingview-logo.svg',
      status: 'connected',
      lastSync: '5 minutes ago'
    }
  ];

  if (!isOpen) return null;

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
          
          <h3 className="text-xl font-medium text-white tracking-tight">Connected Apps</h3>
          <p className="text-gray-400 mt-1">Manage integrations for {webhook.name}</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apps.map((app) => (
              <div 
                key={app.id}
                className="glass-panel glass-panel-hover rounded-xl p-4 border border-dark-300/30"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-dark-200/50 rounded-lg">
                    <img 
                      src={app.icon} 
                      alt={app.name} 
                      className="h-8 w-8 filter invert opacity-60"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-white">{app.name}</h4>
                      {app.status === 'connected' ? (
                        <div className="flex items-center text-emerald-400 text-sm">
                          <Check className="h-4 w-4 mr-1" />
                          Connected
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-400 text-sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Not connected
                        </div>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{app.description}</p>
                    {app.lastSync && (
                      <p className="text-xs text-gray-500 mt-2">Last sync: {app.lastSync}</p>
                    )}
                    <div className="mt-4">
                      {app.status === 'connected' ? (
                        <button className="premium-button-outline text-sm px-3 py-1.5">
                          Disconnect
                        </button>
                      ) : (
                        <button className="premium-button text-sm px-3 py-1.5">
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Documentation Link */}
          <div className="mt-6 p-4 glass-panel rounded-xl border border-dark-300/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-medium">Need help?</h4>
                <p className="text-gray-400 text-sm mt-1">
                  Learn how to set up and configure app integrations
                </p>
              </div>
              <a 
                href="#" 
                className="premium-button-outline text-sm px-3 py-1.5 flex items-center"
              >
                View Documentation
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}