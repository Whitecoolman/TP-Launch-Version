import { atom } from 'jotai';

export interface TradeFilters {
  timeframe: string;
  tradeType: string;
  pair: string;
  outcome: string;
  search: string;
}

export const tradesFilterAtom = atom<TradeFilters>({
  timeframe: 'Last Week',
  tradeType: 'All Types',
  pair: 'All Pairs',
  outcome: 'All Outcomes',
  search: ''
});

// Predefined filter options
export const filterOptions = {
  timeframes: ['Last Week', 'Last Month', 'Last 3 Months', 'Last Year', 'All Time'],
  tradeTypes: ['All Types', 'Manual Trades', 'Copy Trades', 'Webhook Trades'],
  pairs: ['All Pairs', 'EURUSD', 'GBPUSD', 'USDJPY', 'BTCUSD', 'ETHUSD'],
  outcomes: ['All Outcomes', 'Profit', 'Loss', 'Break Even']
};