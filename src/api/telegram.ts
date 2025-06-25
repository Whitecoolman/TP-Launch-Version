import axios from 'axios';
import { env } from '../config/env';
import type { Trade } from '../types';

const TELEGRAM_API_BASE = `https://api.telegram.org/bot${env.TELEGRAM_API_TOKEN}`;

interface TelegramResponse {
  ok: boolean;
  result: any;
  description?: string;
}

interface TelegramVerificationResponse {
  success: boolean;
  chatId: string;
  error?: string;
}

async function makeRequest<T>(method: string, data: Record<string, any>): Promise<T> {
  try {
    const response = await axios.post<TelegramResponse>(
      `${TELEGRAM_API_BASE}/${method}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.ok) {
      throw new Error(response.data.description || 'Telegram API error');
    }

    return response.data.result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.description || error.message;
      throw new Error(`Telegram API Error: ${errorMessage}`);
    }
    throw error;
  }
}

export const telegram = {
  sendMessage: async (chatId: string, text: string) => {
    if (!chatId) {
      throw new Error('Chat ID is required');
    }
    
    return makeRequest('sendMessage', {
      chat_id: chatId,
      text,
      parse_mode: 'HTML'
    });
  },

  sendTradeAlert: async (chatId: string, trade: Trade) => {
    if (!chatId) {
      throw new Error('Chat ID is required');
    }

    const message = `
🔔 <b>Trade Alert</b>

${trade.type === 'buy' ? '🟢 BUY' : '🔴 SELL'} ${trade.symbol}
Entry: ${trade.entryPrice}
${trade.stopLoss ? `SL: ${trade.stopLoss}` : ''}
${trade.takeProfit ? `TP: ${trade.takeProfit}` : ''}
Volume: ${trade.lots} lots
`;

    return makeRequest('sendMessage', {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
  },

  verifyBot: async (chatId: string): Promise<TelegramVerificationResponse> => {
    try {
      // First verify the bot is valid
      const botInfo = await makeRequest('getMe', {});
      
      if (!botInfo) {
        return {
          success: false,
          chatId: '',
          error: 'Invalid bot token'
        };
      }

      // Send a verification message to the chat
      const verificationMessage = `
🤖 <b>Automated Trader Bot Verification</b>

Your bot has been successfully connected! You will receive:
• Trade notifications
• Signal alerts
• Performance updates
• Risk warnings

Reply with /start to begin receiving notifications.
`;

      await makeRequest('sendMessage', {
        chat_id: chatId,
        text: verificationMessage,
        parse_mode: 'HTML'
      });

      return {
        success: true,
        chatId
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return {
        success: false,
        chatId: '',
        error: errorMessage
      };
    }
  }
};