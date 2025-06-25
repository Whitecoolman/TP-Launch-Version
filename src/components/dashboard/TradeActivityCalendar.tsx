import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, TrendingUp, TrendingDown, DollarSign, ArrowRight } from 'lucide-react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface DayStats {
  trades: number;
  profit: number;
  winRate: number;
  winningTrades: number;
  losingTrades: number;
}

export default function TradeActivityCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Mock data for calendar stats with realistic numbers
  const monthStats: { [key: number]: DayStats } = {
    1: { trades: 5, profit: 1050, winRate: 80, winningTrades: 4, losingTrades: 1 },
    5: { trades: 3, profit: 600, winRate: 100, winningTrades: 3, losingTrades: 0 },
    10: { trades: 4, profit: 600, winRate: 75, winningTrades: 3, losingTrades: 1 },
    11: { trades: 2, profit: 1090, winRate: 50, winningTrades: 1, losingTrades: 1 },
    13: { trades: 2, profit: -638, winRate: 0, winningTrades: 0, losingTrades: 2 },
    14: { trades: 3, profit: 556, winRate: 33, winningTrades: 1, losingTrades: 2 },
    17: { trades: 3, profit: -788, winRate: 0, winningTrades: 0, losingTrades: 3 },
    18: { trades: 2, profit: 875, winRate: 100, winningTrades: 2, losingTrades: 0 },
    19: { trades: 1, profit: 608, winRate: 100, winningTrades: 1, losingTrades: 0 },
    20: { trades: 5, profit: 1180, winRate: 80, winningTrades: 4, losingTrades: 1 },
    21: { trades: 3, profit: 113, winRate: 67, winningTrades: 2, losingTrades: 1 },
    24: { trades: 3, profit: 225, winRate: 67, winningTrades: 2, losingTrades: 1 },
    25: { trades: 3, profit: 30, winRate: 33, winningTrades: 1, losingTrades: 2 },
    26: { trades: 2, profit: -37.5, winRate: 50, winningTrades: 1, losingTrades: 1 }
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
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const nextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };

  const getDayColor = (day: number, stats?: DayStats) => {
    if (!stats) return 'hover:bg-dark-200/50';
    
    if (stats.profit >= 0) {
      const intensity = Math.min(Math.abs(stats.profit) / 1000 * 100, 100);
      return `bg-emerald-500/${Math.round(intensity/10) + 10} hover:bg-emerald-500/${Math.round(intensity/10) + 15} border border-emerald-500/20`;
    } else {
      const intensity = Math.min(Math.abs(stats.profit) / 1000 * 100, 100);
      return `bg-red-500/${Math.round(intensity/10) + 10} hover:bg-red-500/${Math.round(intensity/10) + 15} border border-red-500/20`;
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  const formatCurrency = (value: number) => {
    if (value >= 0) {
      return `+$${Math.abs(value).toFixed(0)}`;
    } else {
      return `-$${Math.abs(value).toFixed(0)}`;
    }
  };

  // Calculate monthly stats
  const monthlyStats = {
    totalTrades: Object.values(monthStats).reduce((sum, day) => sum + day.trades, 0),
    totalProfit: Object.values(monthStats).reduce((sum, day) => sum + day.profit, 0),
    winDays: Object.values(monthStats).filter(day => day.profit > 0).length,
    lossDays: Object.values(monthStats).filter(day => day.profit < 0).length,
    tradeDays: Object.keys(monthStats).length
  };

  const totalWinningTrades = Object.values(monthStats).reduce((sum, day) => sum + day.winningTrades, 0);
  const winRate = monthlyStats.totalTrades > 0 
    ? ((totalWinningTrades / monthlyStats.totalTrades) * 100).toFixed(1)
    : "0.0";

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
            <Calendar className="h-4 w-4 text-purple-400" />
          </div>
          <h2 className="text-base font-medium text-white">Trade Activity</h2>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={prevMonth}
            className="p-1 hover:bg-dark-200/50 rounded-lg transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-3.5 w-3.5 text-gray-400" />
          </button>
          <span className="text-sm text-white font-medium">
            {MONTHS[currentDate.getMonth()].substring(0, 3)} {currentDate.getFullYear()}
          </span>
          <button 
            onClick={nextMonth}
            className="p-1 hover:bg-dark-200/50 rounded-lg transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Day Headers */}
        {DAYS.map(day => (
          <div key={day} className="text-center text-[10px] font-medium text-gray-500 py-0.5">
            {day}
          </div>
        ))}

        {/* Empty cells for previous month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-start-${index}`} className="aspect-square rounded-sm bg-dark-200/10" />
        ))}

        {/* Calendar Days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const stats = monthStats[day];
          const today = isToday(day);

          return (
            <div 
              key={day}
              className={`aspect-square relative flex flex-col items-center justify-start p-0.5
                         ${getDayColor(day, stats)}
                         ${today ? 'ring-1 ring-purple-400' : ''}
                         rounded-sm transition-colors cursor-pointer`}
              onClick={() => stats && setSelectedDay(selectedDay === day ? null : day)}
            >
              <span className={`text-[8px] ${stats ? 'font-medium' : 'text-gray-400'} absolute top-0.5 left-1`}>
                {day}
              </span>
              
              {stats && (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className={`text-[8px] font-bold ${stats.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {formatCurrency(stats.profit)}
                  </div>
                  <div className="text-[6px] text-gray-400">
                    {stats.trades}
                  </div>
                </div>
              )}
              
              {today && !stats && (
                <div className="flex flex-col items-center justify-center h-full w-full">
                  <div className="w-1 h-1 bg-accent rounded-full"></div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty cells for next month */}
        {Array.from({ length: (7 - ((firstDayOfMonth + daysInMonth) % 7)) % 7 }).map((_, index) => (
          <div key={`empty-end-${index}`} className="aspect-square rounded-sm bg-dark-200/10" />
        ))}
      </div>

      {/* Monthly Summary */}
      <div className="mt-3 pt-3 border-t border-dark-300/30">
        <div className="flex justify-between items-center text-[10px] text-gray-400">
          <div>This Month:</div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
              <span>{monthlyStats.winDays} Wins</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              <span>{monthlyStats.lossDays} Losses</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[10px] text-gray-400">Win Rate:</div>
          <div className="text-xs text-emerald-400 font-medium">{winRate}%</div>
        </div>
        
        <div className="mt-1 h-1 bg-dark-200 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${winRate}%` }}></div>
        </div>
        
        <div className="mt-2 flex items-center justify-between">
          <div className="text-[10px] text-gray-400">Total Profit:</div>
          <div className={`text-xs font-medium ${monthlyStats.totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {monthlyStats.totalProfit >= 0 ? '+' : ''}{formatCurrency(monthlyStats.totalProfit)}
          </div>
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && monthStats[selectedDay] && (
        <div className="mt-3 pt-3 border-t border-dark-300/30">
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium text-white">
              {MONTHS[currentDate.getMonth()]} {selectedDay}
            </div>
            <div className={`text-xs font-medium ${monthStats[selectedDay].profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(monthStats[selectedDay].profit)}
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-3 gap-2">
            <div className="glass-panel rounded-lg p-1.5">
              <div className="text-[8px] text-gray-400">Trades</div>
              <div className="text-xs font-medium text-white">{monthStats[selectedDay].trades}</div>
            </div>
            <div className="glass-panel rounded-lg p-1.5">
              <div className="text-[8px] text-gray-400">Win Rate</div>
              <div className="text-xs font-medium text-emerald-400">{monthStats[selectedDay].winRate}%</div>
            </div>
            <div className="glass-panel rounded-lg p-1.5">
              <div className="text-[8px] text-gray-400">W/L</div>
              <div className="text-xs font-medium text-white">
                <span className="text-emerald-400">{monthStats[selectedDay].winningTrades}</span>
                /
                <span className="text-red-400">{monthStats[selectedDay].losingTrades}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}