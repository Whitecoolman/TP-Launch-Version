import { atom } from 'jotai';
import type { User, Trade, Alert, WebhookConfig, TelegramConfig } from '../types';

// Auth
export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom((get) => !!get(userAtom));

// Trading
export const activeTradesAtom = atom<Trade[]>([]);
export const tradingBalanceAtom = atom(0);
export const tradingStatsAtom = atom({
  winRate: 0,
  totalTrades: 0,
  profitFactor: 0,
  averageWin: 0,
  averageLoss: 0
});

// Alerts & Notifications
export const alertsAtom = atom<Alert[]>([]);
export const unreadAlertsAtom = atom((get) => 
  get(alertsAtom).filter(alert => !alert.read).length
);

// Webhooks
export const webhooksAtom = atom<WebhookConfig[]>([]);
export const activeWebhooksAtom = atom((get) =>
  get(webhooksAtom).filter(webhook => webhook.isActive)
);

// Telegram Configuration
export const telegramConfigAtom = atom<TelegramConfig>({
  enabled: false,
  notifications: {
    trades: true,
    signals: true,
    alerts: true,
    performance: false,
    risk: true
  }
});

// UI State
export const sidebarCollapsedAtom = atom(false);
export const activeViewAtom = atom('dashboard');
export const themeAtom = atom<'light' | 'dark'>('dark');