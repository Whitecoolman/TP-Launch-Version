import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, TrendingDown, Clock, DollarSign, Activity, BarChart2, X, Info, ExternalLink, Download } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface DayStats {
  trades: number;
  profit: number;
  winRate: number;
  riskReward?: number;
  winningTrades?: number;
  losingTrades?: number;
}

export default function TradesCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Mock data for calendar stats with realistic numbers
  const monthStats: { [key: number]: DayStats } = {
    1: { trades: 1, profit: 1050, winRate: 100, riskReward: 3.5, winningTrades: 1, losingTrades: 0 },
    5: { trades: 1, profit: 600, winRate: 100, riskReward: 2.0, winningTrades: 1, losingTrades: 0 },
    10: { trades: 1, profit: 600, winRate: 100, riskReward: 2.0, winningTrades: 1, losingTrades: 0 },
    11: { trades: 2, profit: 1090, winRate: 50, riskReward: 0.0, winningTrades: 1, losingTrades: 1 },
    13: { trades: 2, profit: -638, winRate: 0, riskReward: 0.0, winningTrades: 0, losingTrades: 2 },
    14: { trades: 3, profit: 556, winRate: 33.33, riskReward: 0.0, winningTrades: 1, losingTrades: 2 },
    17: { trades: 3, profit: -788, winRate: 0, riskReward: -0.31, winningTrades: 0, losingTrades: 3 },
    18: { trades: 2, profit: 875, winRate: 100, riskReward: 0.0, winningTrades: 2, losingTrades: 0 },
    19: { trades: 1, profit: 608, winRate: 100, riskReward: 0.0, winningTrades: 1, losingTrades: 0 },
    20: { trades: 5, profit: 1180, winRate: 40, riskReward: 0.0, winningTrades: 2, losingTrades: 3 },
    21: { trades: 3, profit: 113, winRate: 50, riskReward: 0.0, winningTrades: 1, losingTrades: 1 },
    24: { trades: 3, profit: 225, winRate: 33.33, riskReward: 0.0, winningTrades: 1, losingTrades: 2 },
    25: { trades: 3, profit: 30, winRate: 33.33, riskReward: -1.14, winningTrades: 1, losingTrades: 2 },
    26: { trades: 2, profit: -37.5, winRate: 50, riskReward: -0.83, winningTrades: 1, losingTrades: 1 }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    setSelectedDay(null);
  };

  const getDayColor = (day: number, stats?: DayStats) => {
    if (!stats) return 'hover:bg-dark-200/50';
    
    const intensity = Math.min(Math.abs(stats.profit) / 1000 * 100, 100);
    const intensityClass = `opacity-${Math.round(intensity / 10) * 10}`;
    
    return stats.profit >= 0 
      ? `bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 ${intensityClass}` 
      : `bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 ${intensityClass}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const formatCurrency = (value: number) => {
    if (Math.abs(value) >= 1000) {
      return `${value >= 0 ? '' : '-'}$${Math.abs(value / 1000).toFixed(2)}K`;
    }
    return `${value >= 0 ? '' : '-'}$${Math.abs(value).toFixed(0)}`;
  };

  // Calculate monthly stats
  const monthlyStats = {
    totalTrades: Object.values(monthStats).reduce((sum, day) => sum + day.trades, 0),
    totalProfit: Object.values(monthStats).reduce((sum, day) => sum + day.profit, 0),
    winDays: Object.values(monthStats).filter(day => day.profit > 0).length,
    lossDays: Object.values(monthStats).filter(day => day.profit < 0).length,
    tradeDays: Object.keys(monthStats).length
  };

  const winRate = monthlyStats.totalTrades > 0 
    ? ((Object.values(monthStats).reduce((sum, day) => sum + (day.winningTrades || 0), 0) / 
       monthlyStats.totalTrades) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="glass-panel rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-lg font-medium text-white">Trading Activity</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 hover:bg-dark-200/50 rounded transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-400" />
          </button>
          <span className="text-white font-medium">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </span>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-dark-200/50 rounded transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {DAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Empty cells for previous month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-start-${index}`} className="aspect-square" />
        ))}

        {/* Calendar Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const stats = monthStats[day];
          const today = isToday(day);

          return (
            <div 
              key={day}
              className={`aspect-square relative flex flex-col items-center justify-start p-1
                         ${getDayColor(day, stats)}
                         ${today ? 'ring-2 ring-accent' : ''}
                         rounded-lg transition-colors cursor-pointer`}
              onClick={() => setSelectedDay(selectedDay === day ? null : day)}
            >
              <span className={`text-xs ${stats ? 'font-medium' : 'text-gray-400'} absolute top-1 left-2`}>
                {day}
              </span>
              
              {stats && (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className={`text-sm font-bold ${stats.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(stats.profit)}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stats.trades} {stats.trades === 1 ? 'trade' : 'trades'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {stats.winRate.toFixed(0)}% win
                  </div>
                </div>
              )}
              
              {today && !stats && (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="p-1.5 bg-accent/10 rounded-lg">
                    <Clock className="h-4 w-4 text-accent" />
                  </div>
                  <div className="text-accent font-medium text-sm mt-1">Today</div>
                  <div className="text-xs text-gray-400 mt-0.5">No trades yet</div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty cells for next month */}
        {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, index) => (
          <div key={`empty-end-${index}`} className="aspect-square" />
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="mt-6 pt-6 border-t border-dark-300/30">
        <div className="grid grid-cols-3 gap-4">
          <div className="glass-panel rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Total Trades</div>
            <div className="text-xl font-semibold text-white">
              {monthlyStats.totalTrades}
            </div>
            <div className="text-xs text-gray-400 mt-1">Across {monthlyStats.tradeDays} days</div>
          </div>
          <div className="glass-panel rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Win Rate</div>
            <div className="text-xl font-semibold text-emerald-400">
              {winRate}%
            </div>
            <div className="text-xs text-emerald-400 mt-1">+2.3% vs last month</div>
          </div>
          <div className="glass-panel rounded-lg p-4">
            <div className="text-sm text-gray-400 mb-1">Net Profit</div>
            <div className={`text-xl font-semibold ${monthlyStats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {monthlyStats.totalProfit >= 0 ? '+' : ''}{formatCurrency(monthlyStats.totalProfit)}
            </div>
            <div className="text-xs text-emerald-400 mt-1">+18.2% vs last month</div>
          </div>
        </div>
      </div>

      {/* Day Detail Modal */}
      {selectedDay && monthStats[selectedDay] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDay(null)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-md z-10 p-0 overflow-hidden">
            <div className={`relative p-6 border-b border-dark-300/50 ${
              monthStats[selectedDay].profit >= 0 ? 'bg-gradient-to-r from-emerald-500/20 to-emerald-500/5' : 'bg-gradient-to-r from-red-500/20 to-red-500/5'
            }`}>
              <button
                onClick={() => setSelectedDay(null)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-dark-200/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">
                    {new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-300">{monthStats[selectedDay].trades} trades</span>
                    <span className="text-gray-400">•</span>
                    <span className={monthStats[selectedDay].profit >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                      {monthStats[selectedDay].profit >= 0 ? '+' : ''}{formatCurrency(monthStats[selectedDay].profit)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <Activity className="h-4 w-4" />
                    <span>Win Rate</span>
                  </div>
                  <div className="text-xl font-semibold text-white">{monthStats[selectedDay].winRate}%</div>
                  <div className="flex items-center mt-2">
                    <div className="flex-1 h-1.5 bg-dark-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-accent rounded-full"
                        style={{ width: `${monthStats[selectedDay].winRate}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-400 mb-2">
                    <BarChart2 className="h-4 w-4" />
                    <span>Risk/Reward</span>
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {monthStats[selectedDay].riskReward ? monthStats[selectedDay].riskReward.toFixed(2) : 'N/A'}
                  </div>
                </div>
              </div>

              {/* Trade Breakdown */}
              <div className="glass-panel rounded-lg p-4">
                <h4 className="text-base font-medium text-white mb-3">Trade Breakdown</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                      <span className="text-gray-300">Winning Trades</span>
                    </div>
                    <span className="text-white font-medium">{monthStats[selectedDay].winningTrades}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="text-gray-300">Losing Trades</span>
                    </div>
                    <span className="text-white font-medium">{monthStats[selectedDay].losingTrades}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="text-gray-300">Total Trades</span>
                    </div>
                    <span className="text-white font-medium">{monthStats[selectedDay].trades}</span>
                  </div>
                </div>
              </div>

              {/* Profit Summary */}
              <div className={`glass-panel rounded-lg p-4 ${
                monthStats[selectedDay].profit >= 0 ? 'bg-emerald-500/5 border border-emerald-500/20' : 'bg-red-500/5 border border-red-500/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <DollarSign className="h-4 w-4" />
                    <span>Net Profit</span>
                  </div>
                  <span className={`text-xl font-bold ${
                    monthStats[selectedDay].profit >= 0 ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {monthStats[selectedDay].profit >= 0 ? '+' : ''}{formatCurrency(monthStats[selectedDay].profit)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedDay(null)}
                  className="px-4 py-2 bg-accent/10 text-accent rounded-lg 
                           hover:bg-accent/20 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400/20"></div>
          <span>Profitable Day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-400/20"></div>
          <span>Loss Day</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full ring-2 ring-accent"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}