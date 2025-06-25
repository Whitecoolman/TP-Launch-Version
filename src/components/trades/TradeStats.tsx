import React from 'react';
import { TrendingUp, TrendingDown, BarChart2, Clock, DollarSign, Target, Award, Zap } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  percentage?: number;
  progressValue?: number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down';
  highlight?: boolean;
}

function StatCard({ label, value, percentage, progressValue, icon, trend, highlight }: StatCardProps) {
  return (
    <div className={`glass-panel rounded-xl p-4 border border-dark-300/20 transition-all duration-300 hover:scale-[1.02] ${
      highlight ? 'bg-gradient-to-br from-accent/10 to-transparent' : ''
    }`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon && <div className={highlight ? 'text-accent' : 'text-gray-400'}>{icon}</div>}
          <span className="text-gray-400 text-sm">{label}</span>
        </div>
        {percentage !== undefined && (
          <div className={`text-sm ${percentage >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {percentage > 0 ? '+' : ''}{percentage}%
          </div>
        )}
      </div>
      <div className="flex items-baseline space-x-2">
        <div className={`text-xl font-semibold ${highlight ? 'text-accent' : 'text-white'}`}>{value}</div>
        {trend && (
          <div className={trend === 'up' ? 'text-emerald-400' : 'text-red-400'}>
            {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
          </div>
        )}
      </div>
      {progressValue !== undefined && (
        <div className="mt-2">
          <div className="h-1.5 bg-dark-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                highlight ? 'bg-accent' : 'bg-emerald-400'
              }`}
              style={{ width: `${progressValue}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0%</span>
            <span>{progressValue}%</span>
            <span>100%</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TradeStats() {
  const stats = [
    {
      label: "Total Profit",
      value: "$48,234",
      icon: <DollarSign className="h-4 w-4" />,
      percentage: 12.5,
      trend: 'up' as const,
      highlight: true
    },
    {
      label: "Average Profit",
      value: "$510.51",
      icon: <TrendingUp className="h-4 w-4" />,
      percentage: 8.3,
      trend: 'up' as const,
      highlight: true
    },
    {
      label: "Total Trades",
      value: "1,234",
      icon: <BarChart2 className="h-4 w-4" />,
      percentage: 8.3,
      trend: 'up' as const
    },
    {
      label: "Avg Trade Duration",
      value: "2h 15m",
      icon: <Clock className="h-4 w-4" />
    },
    {
      label: "Total Volume",
      value: "125.5 lots",
      icon: <Target className="h-4 w-4" />,
      percentage: 15.7,
      trend: 'up' as const
    },
    {
      label: "Best Trade",
      value: "$2,850",
      icon: <Zap className="h-4 w-4" />,
      progressValue: 95
    },
    {
      label: "Worst Trade",
      value: "-$450",
      progressValue: 25,
      trend: 'down' as const
    },
    {
      label: "Average RR Ratio",
      value: "1:3.5",
      progressValue: 78
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          label={stat.label}
          value={stat.value}
          percentage={stat.percentage}
          progressValue={stat.progressValue}
          icon={stat.icon}
          trend={stat.trend}
          highlight={stat.highlight}
        />
      ))}
    </div>
  );
}