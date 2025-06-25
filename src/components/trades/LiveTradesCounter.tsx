import React, { useState, useEffect } from 'react';
import { Activity, TrendingUp, TrendingDown, Clock, DollarSign, Target, ArrowRight } from 'lucide-react';

interface LiveTrade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  profit: number;
  duration: string;
  entryPrice: number;
  currentPrice: number;
  lots: number;
}

export default function LiveTradesCounter() {
  const [liveTrades, setLiveTrades] = useState<LiveTrade[]>([
    {
      id: '1',
      symbol: 'EURUSD',
      type: 'buy',
      profit: 125.50,
      duration: '2h 15m',
      entryPrice: 1.0950,
      currentPrice: 1.0980,
      lots: 1.0
    },
    {
      id: '2',
      symbol: 'XAUUSD',
      type: 'sell',
      profit: -45.20,
      duration: '45m',
      entryPrice: 2025.50,
      currentPrice: 2015.80,
      lots: 0.5
    },
    {
      id: '3',
      symbol: 'BTCUSD',
      type: 'buy',
      profit: 350.75,
      duration: '1h 30m',
      entryPrice: 39850,
      currentPrice: 40200,
      lots: 0.1
    }
  ]);
  const [selectedTrade, setSelectedTrade] = useState<string | null>(null);
  const [todayStats, setTodayStats] = useState({
    totalTrades: 12,
    winningTrades: 9,
    losingTrades: 3,
    profit: 325.50
  });

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveTrades(prev => prev.map(trade => {
        // Randomly update current price and profit
        const priceChange = (Math.random() * 0.002 - 0.001) * trade.currentPrice;
        const newCurrentPrice = trade.currentPrice + priceChange;
        
        // Calculate new profit based on price change
        const priceDiff = trade.type === 'buy' 
          ? newCurrentPrice - trade.entryPrice 
          : trade.entryPrice - newCurrentPrice;
        
        const multiplier = trade.symbol === 'BTCUSD' ? 1 : (trade.symbol === 'XAUUSD' ? 100 : 100000);
        const newProfit = priceDiff * trade.lots * multiplier;
        
        return {
          ...trade,
          currentPrice: newCurrentPrice,
          profit: trade.symbol === 'BTCUSD' ? newProfit : Math.round(newProfit * 100) / 100
        };
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalProfit = liveTrades.reduce((sum, trade) => sum + trade.profit, 0);
  const profitableTrades = liveTrades.filter(trade => trade.profit > 0).length;

  return (
    <div className="space-y-4">
      {/* Today's Stats */}
      <div className="glass-panel rounded-xl p-4 bg-gradient-to-br from-accent/10 to-purple-500/5 border border-accent/20 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-accent" />
            <h3 className="text-sm md:text-base font-medium text-white">Today's Trading</h3>
          </div>
          <div className="text-xs text-gray-400">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="glass-panel rounded-lg p-2 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
            <div className="text-xs text-gray-400 mb-1">Total Trades</div>
            <div className="text-base font-medium text-white">{todayStats.totalTrades}</div>
          </div>
          <div className="glass-panel rounded-lg p-2 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
            <div className="text-xs text-gray-400 mb-1">Winning</div>
            <div className="text-base font-medium text-emerald-400">{todayStats.winningTrades}</div>
          </div>
          <div className="glass-panel rounded-lg p-2 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
            <div className="text-xs text-gray-400 mb-1">Losing</div>
            <div className="text-base font-medium text-red-400">{todayStats.losingTrades}</div>
          </div>
          <div className="glass-panel rounded-lg p-2 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
            <div className="text-xs text-gray-400 mb-1">Profit</div>
            <div className="text-base font-medium text-emerald-400">+${todayStats.profit.toFixed(2)}</div>
          </div>
        </div>
        
        <button 
          onClick={() => window.location.href = '/trades'}
          className="w-full mt-3 premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 py-1.5 text-xs md:text-sm flex items-center justify-center shadow-md shadow-accent/10"
        >
          Open New Trade
          <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
        </button>
      </div>

      <div className="flex items-center space-x-6 bg-dark-200/20 rounded-xl p-3">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2.5 px-3 py-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-emerald-400 font-medium tracking-wide">LIVE</span>
          </div>
          <span className="text-xs text-gray-400 mt-1.5">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>

        <div className="h-8 w-px bg-dark-300/50"></div>

        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-dark-200/30 border border-dark-300/30">
              <Activity className="h-4 w-4 text-accent" />
              <span className="text-white font-medium">{liveTrades.length}</span>
            </div>
            <span className="text-xs text-gray-400 mt-1.5">Open</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium">{profitableTrades}</span>
            </div>
            <span className="text-xs text-gray-400 mt-1.5">Profit</span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 px-4 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <TrendingDown className="h-4 w-4 text-red-400" />
              <span className="text-red-400 font-medium">{liveTrades.length - profitableTrades}</span>
            </div>
            <span className="text-xs text-gray-400 mt-1.5">Loss</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {liveTrades.map(trade => (
          <div 
            key={trade.id}
            className={`glass-panel rounded-lg p-3 hover:bg-dark-200/30 transition-colors cursor-pointer ${
              selectedTrade === trade.id ? 'border border-accent' : ''
            }`}
            onClick={() => setSelectedTrade(selectedTrade === trade.id ? null : trade.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`p-1.5 rounded-lg ${
                  trade.type === 'buy' 
                    ? 'bg-emerald-500/10' 
                    : 'bg-red-500/10'
                }`}>
                  {trade.type === 'buy' ? (
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
                <div>
                  <div className="text-white">{trade.symbol}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {trade.lots} lots @ {trade.entryPrice.toFixed(trade.symbol === 'BTCUSD' ? 1 : 5)}
                  </div>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)}
              </div>
            </div>

            {selectedTrade === trade.id && (
              <div className="mt-3 pt-3 border-t border-dark-300/30 grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Duration: {trade.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Current: {trade.currentPrice.toFixed(trade.symbol === 'BTCUSD' ? 1 : 5)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Entry: {trade.entryPrice.toFixed(trade.symbol === 'BTCUSD' ? 1 : 5)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-3.5 w-3.5 text-gray-400" />
                  <span className="text-xs text-gray-400">Type: {trade.type.toUpperCase()}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-dark-300/30">
        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-400">Total Profit</div>
          <div className={`font-medium ${
            totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'
          }`}>
            {totalProfit >= 0 ? '+' : ''}{totalProfit.toFixed(2)} USD
          </div>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <div className="text-gray-400">Win Rate</div>
          <div className="text-white font-medium">
            {((profitableTrades / liveTrades.length) * 100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}