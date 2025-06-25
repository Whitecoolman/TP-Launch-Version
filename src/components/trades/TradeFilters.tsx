import React from 'react';
import { Search, Filter, Calendar, ChevronDown } from 'lucide-react';
import { useAtom } from 'jotai';
import { tradesFilterAtom, filterOptions } from '../../store/tradesFilterStore';

export default function TradeFilters() {
  const [filters, setFilters] = useAtom(tradesFilterAtom);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* Time Filter */}
      <div className="relative min-w-[160px]">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          value={filters.timeframe}
          onChange={(e) => handleFilterChange('timeframe', e.target.value)}
          className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.timeframes.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Trade Type Filter */}
      <div className="relative min-w-[160px]">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <select
          value={filters.tradeType}
          onChange={(e) => handleFilterChange('tradeType', e.target.value)}
          className="h-10 w-full pl-10 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.tradeTypes.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Symbol Filter */}
      <div className="relative min-w-[140px]">
        <select
          value={filters.pair}
          onChange={(e) => handleFilterChange('pair', e.target.value)}
          className="h-10 w-full pl-4 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.pairs.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Outcome Filter */}
      <div className="relative min-w-[140px]">
        <select
          value={filters.outcome}
          onChange={(e) => handleFilterChange('outcome', e.target.value)}
          className="h-10 w-full pl-4 pr-10 bg-dark-200/50 text-gray-300 rounded-lg
                   border border-dark-300/30 focus:outline-none focus:ring-1 focus:ring-accent/50"
        >
          {filterOptions.outcomes.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search trades..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full h-10 pl-10 pr-4 bg-dark-200/50 text-gray-300 rounded-lg 
                   border border-dark-300/30 focus:outline-none focus:ring-1 
                   focus:ring-accent/50 transition-all duration-300"
        />
      </div>
    </div>
  );
}