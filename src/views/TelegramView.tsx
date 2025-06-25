import React, { useState, useEffect } from 'react';
import { 
  MessageCircle, Bell, Bot, Link2, Copy, CheckCircle2, 
  Settings, Shield, AlertTriangle, ArrowRight, Zap,
  BarChart2, Users, DollarSign, Loader
} from 'lucide-react';
import { useSendTelegramMessage, useSendTradeAlert } from '../hooks/useTelegram';
import { env } from '../config/env';

interface TelegramSettings {
  trades: boolean;
  signals: boolean;
  alerts: boolean;
  performance: boolean;
  risk: boolean;
}

export default function TelegramView() {
  const [botConnected, setBotConnected] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [verificationCode] = useState(() => 
    Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [notificationTypes, setNotificationTypes] = useState<TelegramSettings>({
    trades: true,
    signals: true,
    alerts: true,
    performance: false,
    risk: true
  });

  const sendMessage = useSendTelegramMessage();
  const sendTradeAlert = useSendTradeAlert();

  useEffect(() => {
    // Load saved chat ID and connection status from localStorage
    const savedChatId = localStorage.getItem('telegram_chat_id');
    if (savedChatId) {
      setChatId(savedChatId);
      setBotConnected(true);
    }
  }, []);

  const handleConnect = async () => {
    setIsVerifying(true);
    try {
      // Send verification message
      await sendMessage.mutateAsync({
        chatId: env.TELEGRAM_BOT_USERNAME,
        text: `🔐 Verification Code: ${verificationCode}\n\nPlease enter this code on the website to complete the connection.`,
        parseMode: 'HTML'
      });

      // In a real implementation, you would:
      // 1. Start polling for the user's message to the bot
      // 2. Verify the code matches
      // 3. Store the chat ID for future notifications
      
      // For demo purposes, we'll simulate success after 2 seconds
      setTimeout(() => {
        const mockChatId = '123456789';
        setChatId(mockChatId);
        setBotConnected(true);
        localStorage.setItem('telegram_chat_id', mockChatId);
        setIsVerifying(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to send verification message:', error);
      setIsVerifying(false);
    }
  };

  const handleDisconnect = () => {
    setBotConnected(false);
    setChatId(null);
    localStorage.removeItem('telegram_chat_id');
  };

  const toggleNotification = (type: keyof TelegramSettings) => {
    setNotificationTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Test notification
  const sendTestNotification = async () => {
    if (!chatId) return;

    try {
      await sendTradeAlert.mutateAsync({
        chatId,
        trade: {
          symbol: 'BTCUSD',
          type: 'buy',
          entryPrice: 50000,
          stopLoss: 49500,
          takeProfit: 51000,
          lots: 0.1
        }
      });
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <MessageCircle className="h-8 w-8 text-accent" />
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Telegram Integration</h1>
            <p className="text-gray-400 mt-1">Receive real-time trade notifications and alerts</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-accent" />
              <span className="text-gray-400">Bot Status</span>
            </div>
            <div className={`flex items-center ${
              botConnected ? 'text-emerald-400' : 'text-gray-400'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-2 ${
                botConnected ? 'bg-emerald-400' : 'bg-gray-400'
              }`} />
              {botConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-accent" />
              <span className="text-gray-400">Messages Sent</span>
            </div>
            <span className="text-white font-medium">1,234</span>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <span className="text-gray-400">Subscribers</span>
            </div>
            <span className="text-white font-medium">892</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bot Setup */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bot Connection */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Bot className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white">Telegram Bot</h2>
                <p className="text-gray-400 mt-1">Connect your Telegram bot to receive notifications</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bot Username</label>
                <div className="text-white bg-dark-200/50 rounded-lg px-4 py-2.5 border border-dark-300/50">
                  {env.TELEGRAM_BOT_USERNAME}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={botConnected ? handleDisconnect : handleConnect}
                  disabled={isVerifying}
                  className={`flex-1 py-2.5 rounded-lg transition-all flex items-center justify-center ${
                    botConnected
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      : 'premium-button'
                  }`}
                >
                  {isVerifying ? (
                    <>
                      <Loader className="h-5 w-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : botConnected ? (
                    'Disconnect Bot'
                  ) : (
                    'Connect Bot'
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Bell className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white">Notification Settings</h2>
                <p className="text-gray-400 mt-1">Configure what notifications you want to receive</p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(notificationTypes).map(([key, enabled]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-dark-200/50 rounded-lg">
                      {key === 'trades' && <BarChart2 className="h-5 w-5 text-accent" />}
                      {key === 'signals' && <Zap className="h-5 w-5 text-purple-400" />}
                      {key === 'alerts' && <AlertTriangle className="h-5 w-5 text-yellow-400" />}
                      {key === 'performance' && <DollarSign className="h-5 w-5 text-emerald-400" />}
                      {key === 'risk' && <Shield className="h-5 w-5 text-red-400" />}
                    </div>
                    <div>
                      <div className="text-white capitalize">{key}</div>
                      <div className="text-sm text-gray-400">
                        {key === 'trades' && 'Real-time trade executions'}
                        {key === 'signals' && 'New trading signals'}
                        {key === 'alerts' && 'Important system alerts'}
                        {key === 'performance' && 'Daily performance updates'}
                        {key === 'risk' && 'Risk management warnings'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleNotification(key as keyof TelegramSettings)}
                    disabled={!botConnected}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-opacity ${
                      !botConnected ? 'opacity-50 cursor-not-allowed' : ''
                    } ${enabled ? 'bg-accent' : 'bg-dark-300'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>

            {botConnected && (
              <button
                onClick={sendTestNotification}
                className="mt-6 w-full premium-button py-3 flex items-center justify-center"
              >
                Send Test Notification
              </button>
            )}
          </div>
        </div>

        {/* Setup Instructions */}
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-4">Quick Setup Guide</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <p className="text-gray-400">
                  Start a chat with {env.TELEGRAM_BOT_USERNAME} on Telegram
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <p className="text-gray-400">
                  Send the command /start to initialize the bot
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <p className="text-gray-400">
                  Click the Connect Bot button and follow the verification process
                </p>
              </div>
            </div>

            <button 
              onClick={() => window.open(`https://t.me/${env.TELEGRAM_BOT_USERNAME.slice(1)}`, '_blank')}
              className="w-full mt-6 premium-button flex items-center justify-center"
            >
              Open Telegram
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>

          {/* Terms & Privacy */}
          <div className="glass-panel rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Privacy & Security</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Your chat ID is securely stored and used only for sending notifications.
                  You can revoke access at any time by disconnecting the bot or blocking it on Telegram.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}