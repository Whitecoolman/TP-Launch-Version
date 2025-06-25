// Environment configuration for Vite
export const env = {
  // Meta API Configuration
  META_API_TOKEN: import.meta.env.VITE_META_API_TOKEN || '',
  
  // Telegram Configuration
  TELEGRAM_API_TOKEN: import.meta.env.VITE_TELEGRAM_API_TOKEN || '',
  TELEGRAM_BOT_USERNAME: '@AutomatedTraderBot',
  
  // Application URLs
  APP_URL: import.meta.env.VITE_APP_URL || '',
  LANDING_URL: import.meta.env.VITE_LANDING_URL || '/',
  
  // Sellix Configuration
  SELLIX_WEBHOOK_SECRET: import.meta.env.VITE_SELLIX_WEBHOOK_SECRET || '',
  
  // Analytics & Marketing
  GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  KLAVIO_PRIVATE_KEY: import.meta.env.VITE_KLAVIO_PRIVATE_KEY || '',
  
  // API Endpoints
  WEBHOOK_RECEIVER_URL: import.meta.env.VITE_WEBHOOK_RECEIVER_URL || 'http://localhost:4000',
  TRADE_MANAGEMENT_URL: import.meta.env.VITE_TRADE_MANAGEMENT_URL || 'http://localhost:4001',
  
  // Feature Flags
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  MODE: import.meta.env.MODE
};