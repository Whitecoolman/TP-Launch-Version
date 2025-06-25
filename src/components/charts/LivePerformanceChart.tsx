import React, { useEffect, useState } from 'react';
import { TrendingUp, Clock, DollarSign, Shield, Zap, Award, Target, BarChart2 } from 'lucide-react';

interface DataPoint {
  timestamp: number;
  profit: number;
}

interface LivePerformanceChartProps {
  account?: string;
}

export default function LivePerformanceChart({ account = 'all' }: LivePerformanceChartProps) {
  const [data, setData] = useState<DataPoint[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [winRate, setWinRate] = useState(89.5);
  const [trades, setTrades] = useState(145);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isMobile, setIsMobile] = useState(false);

  // Stats
  const stats = [
    {
      title: "Success Rate",
      value: "92.3%",
      change: "+5.2%",
      description: "of trades hit take profit",
      icon: <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
    },
    {
      title: "Average Profit",
      value: "$185.50",
      change: "+12.5%",
      description: "per winning trade",
      icon: <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-accent" />
    },
    {
      title: "Execution Rate",
      value: "0.04s",
      change: "99.9%",
      description: "average execution time",
      icon: <Clock className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
    },
    {
      title: "Risk Management",
      value: "Active",
      description: "Advanced protection enabled",
      icon: <Shield className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
    }
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Initialize with some historical data
    const initialData = generateHistoricalData(account);
    setData(initialData);
    setTotalProfit(initialData[initialData.length - 1].profit);

    // Update data every 5 seconds
    const interval = setInterval(() => {
      setData(prevData => {
        const newPoint = generateNewDataPoint(prevData, account);
        const newData = [...prevData, newPoint].slice(-24); // Keep last 24 points
        setTotalProfit(newPoint.profit);
        setLastUpdate(new Date());
        return newData;
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [account]);

  const generateHistoricalData = (accountId: string): DataPoint[] => {
    const points: DataPoint[] = [];
    const now = Date.now();
    
    // Adjust starting profit based on account
    let profit = accountId === 'all' ? 1500 : 
                accountId === 'mt5-demo' ? 1250 :
                accountId === 'mt4-live' ? 2500 :
                accountId === 'binance-futures' ? 850 : 1500;

    // Adjust volatility based on account
    const volatilityFactor = accountId === 'all' ? 1 :
                            accountId === 'mt5-demo' ? 0.8 :
                            accountId === 'mt4-live' ? 1.2 :
                            accountId === 'binance-futures' ? 1.5 : 1;

    for (let i = 0; i < 24; i++) {
      points.push({
        timestamp: now - (24 - i) * 3600000, // Past 24 hours
        profit: profit
      });
      // Random profit changes between -200 and +500, adjusted by volatility
      profit += (Math.random() * 700 - 200) * volatilityFactor;
    }
    return points;
  };

  const generateNewDataPoint = (prevData: DataPoint[], accountId: string): DataPoint => {
    const lastProfit = prevData[prevData.length - 1].profit;
    
    // Adjust volatility based on account
    const volatilityFactor = accountId === 'all' ? 1 :
                            accountId === 'mt5-demo' ? 0.8 :
                            accountId === 'mt4-live' ? 1.2 :
                            accountId === 'binance-futures' ? 1.5 : 1;
    
    // Random profit change between -200 and +500, adjusted by volatility
    const profitChange = (Math.random() * 700 - 200) * volatilityFactor;
    
    return {
      timestamp: Date.now(),
      profit: lastProfit + profitChange
    };
  };

  // Calculate chart dimensions
  const width = 800;
  const height = 400;
  const padding = 40;

  // Calculate scales
  const xScale = (width - padding * 2) / (data.length - 1);
  const yMin = Math.min(...data.map(d => d.profit));
  const yMax = Math.max(...data.map(d => d.profit));
  const yScale = (height - padding * 2) / (yMax - yMin);

  // Generate SVG path
  const pathD = data.map((point, i) => {
    const x = padding + i * xScale;
    const y = height - padding - (point.profit - yMin) * yScale;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate area fill path
  const areaD = `${pathD} L ${padding + (data.length - 1) * xScale} ${height - padding} L ${padding} ${height - padding} Z`;

  // Get account-specific title
  const getAccountTitle = () => {
    if (account === 'all') return "All Accounts";
    if (account === 'mt5-demo') return "MT5 Demo";
    if (account === 'mt4-live') return "MT4 Live";
    if (account === 'binance-futures') return "Binance Futures";
    
    // For platform selection
    if (account === 'metatrader') return "MetaTrader Accounts";
    if (account === 'hankox') return "Hankox Accounts";
    if (account === 'tradelocker') return "TradeLocker Accounts";
    if (account === 'binance') return "Binance Accounts";
    
    return "Live Performance";
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <Award className="h-5 w-5 text-accent" />
            <h2 className="text-lg md:text-2xl font-bold text-white">{getAccountTitle()}</h2>
          </div>
          <p className="text-xs md:text-base text-gray-400 mt-1">Last updated: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <div className="text-right mt-2 md:mt-0">
          <div className="text-lg md:text-2xl font-bold text-emerald-400">
            ${totalProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs md:text-base text-gray-400">Total Profit</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-[200px] md:h-[400px] mb-3 md:mb-8">
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
                  ${(yMax - (i * (yMax - yMin) / 5)).toFixed(0)}
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
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {data.map((point, i) => {
            const x = padding + i * xScale;
            const y = height - padding - (point.profit - yMin) * yScale;
            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  className="fill-accent"
                />
                {i % (isMobile ? 6 : 4) === 0 && (
                  <text
                    x={x}
                    y={height - padding + 20}
                    textAnchor="middle"
                    className="text-xs fill-gray-400"
                  >
                    {new Date(point.timestamp).getHours()}:00
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="glass-panel rounded-lg p-2 md:p-4 border border-dark-300/30 hover:border-accent/20 transition-all duration-300">
            <div className="flex items-start md:items-center space-x-1.5 md:space-x-3 mb-1 md:mb-2">
              <div className="p-1 md:p-2 bg-dark-200/50 rounded-lg">
                {stat.icon}
              </div>
              <div>
                <div className="text-[10px] md:text-sm text-gray-400">{stat.title}</div>
                <div className="text-sm md:text-lg font-bold text-white">{stat.value}</div>
              </div>
            </div>
            {stat.change && (
              <div className="text-[10px] md:text-xs text-emerald-400">{stat.change}</div>
            )}
            <div className="text-[10px] md:text-xs text-gray-400">{stat.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}