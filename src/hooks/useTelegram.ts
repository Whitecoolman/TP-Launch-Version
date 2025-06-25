import { useMutation, useQueryClient } from '@tanstack/react-query';
import { telegram } from '../api/telegram';
import type { Trade } from '../types';

export function useSendTelegramMessage() {
  return useMutation({
    mutationFn: async ({ chatId, text }: { chatId: string; text: string }) => {
      if (!chatId || !text) {
        throw new Error('Chat ID and message text are required');
      }
      return telegram.sendMessage(chatId, text);
    },
    onError: (error) => {
      console.error('Failed to send Telegram message:', error);
    }
  });
}

export function useSendTradeAlert() {
  return useMutation({
    mutationFn: async ({ chatId, trade }: { chatId: string; trade: Trade }) => {
      if (!chatId || !trade) {
        throw new Error('Chat ID and trade details are required');
      }
      return telegram.sendTradeAlert(chatId, trade);
    },
    onError: (error) => {
      console.error('Failed to send trade alert:', error);
    }
  });
}

export function useVerifyTelegramBot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chatId: string) => {
      if (!chatId) {
        throw new Error('Chat ID is required');
      }
      return telegram.verifyBot(chatId);
    },
    onSuccess: (data) => {
      if (data.success) {
        // Invalidate and refetch any relevant queries
        queryClient.invalidateQueries({ queryKey: ['telegramConfig'] });
      }
    },
    onError: (error) => {
      console.error('Failed to verify Telegram bot:', error);
    }
  });
}