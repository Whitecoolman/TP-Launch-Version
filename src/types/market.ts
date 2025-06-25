export interface Market {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap?: number;
  signal?: 'buy' | 'sell' | 'neutral';
  strength?: number;
  volatility?: number;
  trending?: boolean;
}