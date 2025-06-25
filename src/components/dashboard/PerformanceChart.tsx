import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, ArrowRight, TrendingDown, Target, Award, Zap } from 'lucide-react';

interface DataPoint {
  timestamp: number;
  value: number;
}

interface ChartData {
  profit: DataPoint[];
  trades: number;
  winRate: number;
  bestTrade: number;
  avgTrade: number;
}

export default function PerformanceChart() {
  const [timeframe, setTimeframe] = useState('1W');
  const [data, setData] = useState<ChartData>({
    profit: [],
    trades: 0,
    winRate: 0,
    bestTrade: 0,
    avgTrade: 0
  });

  // Generate realistic trading data
  useEffect(() => {
    const generateData = () => {
      const points: DataPoint[] = [];
      let currentValue = 10000; // Starting balance
      
      // Define periods and intervals based on timeframe
      const periodConfig = {
        '1D': { 
          periods: 12, // Changed to 12 periods for AM/PM format
          interval: 2 * 60 * 60 * 1000, // 2 hours
          tradesPerPeriod: { min: 0, max: 2 },
          resultRange: { min: -0.3, max: 0.5 },
          multiplier: 50
        },
        '1W': { 
          periods: 7, 
          interval: 24 * 60 * 60 * 1000, // 1 day
          tradesPerPeriod: { min: 3, max: 8 },
          resultRange: { min: -0.5, max: 0.8 },
          multiplier: 100
        },
        '1M': { 
          periods: 30, 
          interval: 24 * 60 * 60 * 1000, // 1 day
          tradesPerPeriod: { min: 2, max: 6 },
          resultRange: { min: -0.6, max: 1.0 },
          multiplier: 150
        },
        '1Y': { 
          periods: 12, 
          interval: 30 * 24 * 60 * 60 * 1000, // ~1 month
          tradesPerPeriod: { min: 40, max: 60 },
          resultRange: { min: -0.8, max: 1.2 },
          multiplier: 200
        }
      };

      const config = periodConfig[timeframe as keyof typeof periodConfig];
      const now = new Date();
      // For 1D view, align the start time to the nearest even hour
      const startTime = timeframe === '1D' 
        ? new Date(now).setHours(now.getHours() - (now.getHours() % 2), 0, 0, 0) - (config.periods * config.interval)
        : now.getTime() - (config.periods * config.interval);

      let trades = 0;
      let wins = 0;
      let bestTrade = 0;
      let totalProfit = 0;

      // Add initial point
      points.push({
        timestamp: startTime,
        value: currentValue
      });

      for (let i = 1; i <= config.periods; i++) {
        // Simulate trading activity for the period
        const numTrades = Math.floor(
          Math.random() * (config.tradesPerPeriod.max - config.tradesPerPeriod.min + 1) + 
          config.tradesPerPeriod.min
        );
        let periodProfit = 0;

        for (let j = 0; j < numTrades; j++) {
          trades++;
          // Generate more realistic trade results
          const baseResult = Math.random() * 
            (config.resultRange.max - config.resultRange.min) + 
            config.resultRange.min;
          
          // Apply market conditions bias (65% positive bias)
          const marketBias = Math.random() < 0.65 ? 1 : -1;
          const tradeResult = baseResult * config.multiplier * marketBias;

          if (tradeResult > 0) wins++;
          periodProfit += tradeResult;
          bestTrade = Math.max(bestTrade, tradeResult);
          totalProfit += tradeResult;
        }

        // Apply some momentum to the price movement
        const momentum = periodProfit > 0 ? 1.1 : 0.9;
        currentValue += periodProfit * momentum;

        // Add some market volatility
        const volatility = Math.random() * 100 - 50;
        currentValue += volatility;

        // Ensure we don't go below a reasonable value
        currentValue = Math.max(currentValue, 1000);

        points.push({
          timestamp: startTime + (i * config.interval),
          value: currentValue
        });
      }

      setData({
        profit: points,
        trades,
        winRate: trades > 0 ? (wins / trades) * 100 : 0,
        bestTrade,
        avgTrade: trades > 0 ? totalProfit / trades : 0
      });
    };

    generateData();
  }, [timeframe]);

  // Chart dimensions
  const width = 800;
  const height = 300;
  const padding = 40;

  // Calculate scales
  const xScale = (width - padding * 2) / (data.profit.length - 1);
  const yMin = Math.min(...data.profit.map(d => d.value));
  const yMax = Math.max(...data.profit.map(d => d.value));
  const yScale = (height - padding * 2) / (yMax - yMin);

  // Generate SVG path
  const pathD = data.profit.map((point, i) => {
    const x = padding + i * xScale;
    const y = height - padding - (point.value - yMin) * yScale;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate area fill path
  const areaD = `${pathD} L ${padding + (data.profit.length - 1) * xScale} ${height - padding} L ${padding} ${height - padding} Z`;

  const profitChange = data.profit.length > 1 
    ? ((data.profit[data.profit.length - 1].value - data.profit[0].value) / data.profit[0].value) * 100
    : 0;

  const formatTimeLabel = (timestamp: number) => {
    const date = new Date(timestamp);
    switch (timeframe) {
      case '1D': {
        const hours = date.getHours();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        return `${hour12}${ampm}`;
      }
      case '1W':
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()];
      case '1M':
        return date.getDate().toString();
      case '1Y':
        return date.toLocaleString('default', { month: 'short' });
      default:
        return '';
    }
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
  };

  // Today's trade stats
  const todayTrades = {
    total: 12,
    winning: 9,
    losing: 3,
    profit: 325.50
  };

  return (
    <div className="glass-panel rounded-xl p-4 md:p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-1.5 md:p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
            <Award className="h-4 w-4 md:h-5 md:w-5 text-accent" />
          </div>
          <div>
            <h2 className="text-base md:text-lg font-medium text-white">Performance Overview</h2>
            <div className="flex items-center space-x-2 mt-0.5 md:mt-1">
              {profitChange >= 0 ? (
                <TrendingUp className="h-3.5 w-3.5 md:h-4 md:w-4 text-emerald-400" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 md:h-4 md:w-4 text-red-400" />
              )}
              <span className={profitChange >= 0 ? 'text-xs md:text-sm text-emerald-400' : 'text-xs md:text-sm text-red-400'}>
                {profitChange >= 0 ? '+' : ''}{profitChange.toFixed(2)}%
              </span>
              <span className="text-xs md:text-sm text-gray-400">vs last period</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex rounded-lg bg-dark-200/30 p-1 border border-dark-300/30">
            {['1D', '1W', '1M', '1Y'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period)}
                className={`px-2 py-1 md:px-3 md:py-1 rounded-md text-xs md:text-sm font-medium transition-all ${
                  timeframe === period 
                    ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
          <button className="p-1.5 md:p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>
      </div>

      {/* Today's Trade Stats */}
      <div className="mb-4 md:mb-6 p-3 md:p-4 glass-panel rounded-lg border border-accent/20 bg-gradient-to-r from-accent/10 to-purple-500/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 md:p-2 bg-dark-100/30 backdrop-blur-sm rounded-lg">
              <Target className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            </div>
            <div>
              <h3 className="text-sm md:text-base font-medium text-white">Today's Trades</h3>
              <div className="text-xs md:text-sm text-gray-400">
                {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-6">
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold text-white">{todayTrades.total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold text-emerald-400">{todayTrades.winning}</div>
              <div className="text-xs text-gray-400">Winning</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold text-red-400">{todayTrades.losing}</div>
              <div className="text-xs text-gray-400">Losing</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold text-emerald-400">+${todayTrades.profit.toFixed(2)}</div>
              <div className="text-xs text-gray-400">Profit</div>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = '/trades'}
            className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 px-3 py-1.5 text-xs md:text-sm flex items-center shadow-md shadow-accent/10"
          >
            Open Trade
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[200px] md:h-[300px] mb-6 md:mb-8">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
          {/* Grid lines */}
          {Array.from({ length: 6 }).map((_, i) => {
            const y = padding + (i * (height - padding * 2) / 5);
            return (
              <g key={i}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#2A2A2E"
                  strokeWidth="1"
                />
                <text
                  x={padding - 10}
                  y={y}
                  textAnchor="end"
                  alignmentBaseline="middle"
                  className="text-xs fill-gray-400"
                >
                  {formatCurrency(yMax - (i * (yMax - yMin) / 5))}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path
            d={areaD}
            fill="url(#areaGradient)"
            className="opacity-20"
          />

          {/* Line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#lineGradient)"
            strokeWidth="3"
            className="drop-shadow-[0_0_4px_rgba(0,122,255,0.5)]"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#007AFF" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {data.profit.map((point, i) => {
            const x = padding + i * xScale;
            const y = height - padding - (point.value - yMin) * yScale;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  className="fill-accent"
                />
                <text
                  x={x}
                  y={height - padding + 20}
                  textAnchor="middle"
                  className="text-xs fill-gray-400"
                >
                  {formatTimeLabel(point.timestamp)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats Below Chart */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-4 md:mt-6 pt-4 md:pt-6 border-t border-dark-300/30">
        <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
          <div className="flex items-center space-x-2 text-gray-400 text-xs mb-1">
            <Target className="h-3.5 w-3.5 text-accent" />
            <span>Total Trades</span>
          </div>
          <div className="text-base md:text-xl font-semibold text-white">{data.trades}</div>
        </div>
        <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
          <div className="flex items-center space-x-2 text-gray-400 text-xs mb-1">
            <Award className="h-3.5 w-3.5 text-emerald-400" />
            <span>Win Rate</span>
          </div>
          <div className="text-base md:text-xl font-semibold text-emerald-400">
            {data.winRate.toFixed(1)}%
          </div>
        </div>
        <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
          <div className="flex items-center space-x-2 text-gray-400 text-xs mb-1">
            <Zap className="h-3.5 w-3.5 text-accent" />
            <span>Best Trade</span>
          </div>
          <div className="text-base md:text-xl font-semibold text-white">
            {formatCurrency(data.bestTrade)}
          </div>
        </div>
        <div className="glass-panel rounded-lg p-3 bg-gradient-to-br from-dark-200/30 to-dark-200/10">
          <div className="flex items-center space-x-2 text-gray-400 text-xs mb-1">
            <TrendingUp className="h-3.5 w-3.5 text-purple-400" />
            <span>Avg. Trade</span>
          </div>
          <div className="text-base md:text-xl font-semibold text-white">
            {formatCurrency(data.avgTrade)}
          </div>
        </div>
      </div>

      <button className="mt-4 md:mt-6 text-accent hover:text-accent-dark transition-colors flex items-center text-sm">
        View Detailed Analytics
        <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 ml-2" />
      </button>
    </div>
  );
}