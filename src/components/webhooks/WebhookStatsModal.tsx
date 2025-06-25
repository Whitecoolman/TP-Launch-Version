import React from 'react';
import { X, TrendingUp, BarChart2, Clock, AlertCircle, ArrowRight, 
         Calendar, Activity, LineChart, PieChart, Info, CheckCircle2,
         PlayCircle, Edit3, TrendingDown } from 'lucide-react';

interface Alert {
  id: string;
  type: 'market_execution' | 'modify_order' | 'close_trade';
  symbol: string;
  message: string;
  timestamp: string;
  status: 'success' | 'pending' | 'error';
  profitAmount?: number;
  profitPercentage?: number;
}

interface WebhookStats {
  id: string;
  name: string;
  type: 'advanced' | 'basic';
  status: 'connected' | 'not_connected';
  lastTrigger?: string;
  successRate?: number;
  totalTrades?: number;
  symbols: string[];
  color?: string;
  recentAlerts?: Alert[];
}

interface WebhookStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: WebhookStats;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'market_execution',
    symbol: 'EURUSD',
    message: 'Buy EURUSD at 1.0950',
    timestamp: '2 minutes ago',
    status: 'success',
    profitAmount: 125.50,
    profitPercentage: 1.25
  },
  {
    id: '2',
    type: 'modify_order',
    symbol: 'XAUUSD',
    message: 'Modified SL to 2010.00, TP to 2025.00',
    timestamp: '15 minutes ago',
    status: 'success',
    profitAmount: -45.20,
    profitPercentage: -0.45
  },
  {
    id: '3',
    type: 'close_trade',
    symbol: 'BTCUSD',
    message: 'Closed BTCUSD position',
    timestamp: '1 hour ago',
    status: 'success',
    profitAmount: 230.50,
    profitPercentage: 2.3
  }
];

export default function WebhookStatsModal({ isOpen, onClose, webhook }: WebhookStatsModalProps) {
  if (!isOpen) return null;

  const weeklyActivity = [
    { day: 'Sun', total: 5, long: 3, short: 2 },
    { day: 'Mon', total: 7, long: 4, short: 3 },
    { day: 'Tue', total: 6, long: 4, short: 2 },
    { day: 'Wed', total: 8, long: 5, short: 3 },
    { day: 'Thu', total: 7, long: 4, short: 3 },
    { day: 'Fri', total: 6, long: 4, short: 2 },
    { day: 'Sat', total: 4, long: 3, short: 1 }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'market_execution':
        return <PlayCircle className="h-4 w-4 text-emerald-400" />;
      case 'modify_order':
        return <Edit3 className="h-4 w-4 text-yellow-400" />;
      case 'close_trade':
        return <X className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getBgGradient = () => {
    if (!webhook.color) return 'from-accent/10 to-transparent';
    return webhook.color.replace(/\/20|\/10|\/5/g, (match) => {
      const opacity = parseInt(match.substring(1));
      return `/${opacity * 2}`;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-md z-10 p-0 overflow-hidden">
        {/* Header */}
        <div className={`relative p-4 border-b border-dark-300/50 bg-gradient-to-r ${getBgGradient()}`}>
          <button
            onClick={onClose}
            className="absolute right-3 top-3 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-dark-100/30 backdrop-blur-sm rounded-lg">
              <Activity className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-base font-medium text-white">{webhook.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-accent">{webhook.type}</span>
                <span className="text-xs text-emerald-400">• connected</span>
                <span className="text-xs text-gray-400">Last: {webhook.lastTrigger || '5 minutes ago'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Overview Stats */}
          <div className="grid grid-cols-2 gap-2">
            <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
              <div className="text-gray-400 text-xs mb-1">Total Trades</div>
              <div className="text-base font-semibold text-white">{webhook.totalTrades || 145}</div>
            </div>
            
            <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
              <div className="text-gray-400 text-xs mb-1">Success Rate</div>
              <div className="text-base font-semibold text-emerald-400">{webhook.successRate || 78.5}%</div>
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Info className="h-4 w-4 text-accent" />
                <h3 className="text-xs font-medium text-white">Recent Alerts</h3>
              </div>
              <button className="text-xs text-accent hover:text-accent-dark transition-colors">
                View All
              </button>
            </div>

            <div className="space-y-2 max-h-[150px] overflow-y-auto">
              {mockAlerts.map((alert) => (
                <div 
                  key={alert.id}
                  className="glass-panel rounded-lg p-2 hover:bg-dark-200/30 transition-colors border border-dark-300/30 hover:border-accent/20"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      <div className="p-1 bg-gradient-to-br from-dark-200/30 to-dark-200/10 rounded-lg">
                        {getActionIcon(alert.type)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-white font-medium">{alert.symbol}</span>
                          <span className="text-[10px] text-gray-400">{alert.timestamp}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{alert.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {alert.profitAmount !== undefined && (
                        <div className={`flex items-center space-x-0.5 ${
                          alert.profitAmount >= 0 ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {alert.profitAmount >= 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : (
                            <TrendingDown className="h-3 w-3" />
                          )}
                          <span className="text-[10px]">
                            {alert.profitAmount >= 0 ? '+' : ''}{Math.abs(alert.profitAmount).toFixed(2)}
                          </span>
                        </div>
                      )}
                      {getStatusIcon(alert.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Activity & Win Rate */}
          <div className="grid grid-cols-1 gap-3">
            <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <BarChart2 className="h-4 w-4 text-accent" />
                  <h3 className="text-xs font-medium text-white">Trading Activity</h3>
                </div>
                <div className="text-[10px] text-emerald-400">Wednesday is a hot day</div>
              </div>

              <div className="h-24 flex items-end space-x-1">
                {weeklyActivity.map((day) => (
                  <div key={day.day} className="flex-1">
                    <div className="relative h-full flex flex-col justify-end space-y-0.5">
                      <div 
                        className="w-full bg-gradient-to-t from-gray-700/80 to-gray-700/50 rounded-sm"
                        style={{ height: `${(day.total / 8) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-gradient-to-t from-emerald-500/80 to-emerald-500/50 rounded-sm"
                        style={{ height: `${(day.long / 8) * 100}%` }}
                      ></div>
                      <div 
                        className="w-full bg-gradient-to-t from-red-500/80 to-red-500/50 rounded-sm"
                        style={{ height: `${(day.short / 8) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-center mt-1">
                      <div className="text-[8px] text-gray-400">{day.day}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center space-x-3 mt-1">
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gradient-to-t from-gray-700/80 to-gray-700/50 rounded-sm"></div>
                  <span className="text-[8px] text-gray-400">Total</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gradient-to-t from-emerald-500/80 to-emerald-500/50 rounded-sm"></div>
                  <span className="text-[8px] text-gray-400">Long</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-gradient-to-t from-red-500/80 to-red-500/50 rounded-sm"></div>
                  <span className="text-[8px] text-gray-400">Short</span>
                </div>
              </div>
            </div>

            <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/20 to-dark-200/5 border border-dark-300/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <h3 className="text-xs font-medium text-white">Performance</h3>
                </div>
                <div className="text-[10px] text-emerald-400">+12.5% vs last week</div>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="text-gray-400">Win Rate</span>
                    <span className="text-emerald-400 font-medium">78.5%</span>
                  </div>
                  <div className="h-1 bg-dark-200 rounded-full overflow-hidden">
                    <div className="h-full w-[78.5%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="text-gray-400">Profit Factor</span>
                    <span className="text-white font-medium">2.8</span>
                  </div>
                  <div className="h-1 bg-dark-200 rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-accent to-purple-500 rounded-full"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center text-[10px] mb-1">
                    <span className="text-gray-400">Risk/Reward</span>
                    <span className="text-white font-medium">1:2.5</span>
                  </div>
                  <div className="h-1 bg-dark-200 rounded-full overflow-hidden">
                    <div className="h-full w-[62.5%] bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs border border-accent/30 text-accent 
                       rounded-lg hover:bg-accent/10 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}