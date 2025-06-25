import React, { useState } from 'react';
import { 
  BookOpen, Search, ChevronDown, ChevronRight, Webhook, Bot, Users, 
  ArrowRightLeft, Wallet, MessageCircle, Shield, Zap, DollarSign, 
  Clock, Globe, ExternalLink, Copy, Check, AlertTriangle, HelpCircle,
  FileText, Layers, Code, Terminal, Server, Database, Lock, Coins
} from 'lucide-react';

export default function DocsView() {
  const [activeSection, setActiveSection] = useState('getting-started');
  const [expandedItems, setExpandedItems] = useState<string[]>(['introduction']);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Toggle section expansion
  const toggleExpand = (itemId: string) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  // Copy text to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Navigation sections
  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="h-5 w-5" />,
      items: [
        { id: 'introduction', title: 'Introduction' },
        { id: 'quick-start', title: 'Quick Start Guide' },
        { id: 'dashboard', title: 'Dashboard Overview' },
        { id: 'account-setup', title: 'Account Setup' }
      ]
    },
    {
      id: 'trading-accounts',
      title: 'Trading Accounts',
      icon: <Wallet className="h-5 w-5" />,
      items: [
        { id: 'metatrader', title: 'MetaTrader (MT4/MT5)' },
        { id: 'hankox', title: 'Hankox ActTrader' },
        { id: 'tradelocker', title: 'TradeLocker' },
        { id: 'binance', title: 'Binance' },
        { id: 'account-management', title: 'Account Management' }
      ]
    },
    {
      id: 'webhooks',
      title: 'Webhooks & Automation',
      icon: <Webhook className="h-5 w-5" />,
      items: [
        { id: 'webhook-basics', title: 'Webhook Basics' },
        { id: 'tradingview-setup', title: 'TradingView Setup' },
        { id: 'webhook-types', title: 'Webhook Types' },
        { id: 'advanced-webhooks', title: 'Advanced Webhooks' },
        { id: 'risk-management', title: 'Risk Management' }
      ]
    },
    {
      id: 'account-bridges',
      title: 'Account Bridges',
      icon: <ArrowRightLeft className="h-5 w-5" />,
      items: [
        { id: 'bridge-basics', title: 'Bridge Basics' },
        { id: 'creating-bridges', title: 'Creating Bridges' },
        { id: 'position-sizing', title: 'Position Sizing' },
        { id: 'sync-modes', title: 'Synchronization Modes' }
      ]
    },
    {
      id: 'copy-trading',
      title: 'Copy Trading',
      icon: <Users className="h-5 w-5" />,
      items: [
        { id: 'copy-basics', title: 'Copy Trading Basics' },
        { id: 'finding-traders', title: 'Finding Traders' },
        { id: 'risk-settings', title: 'Risk Settings' },
        { id: 'performance-tracking', title: 'Performance Tracking' }
      ]
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <MessageCircle className="h-5 w-5" />,
      items: [
        { id: 'telegram-setup', title: 'Telegram Setup' },
        { id: 'notification-types', title: 'Notification Types' },
        { id: 'custom-alerts', title: 'Custom Alerts' }
      ]
    },
    {
      id: 'api',
      title: 'API Reference',
      icon: <Code className="h-5 w-5" />,
      items: [
        { id: 'api-overview', title: 'API Overview' },
        { id: 'authentication', title: 'Authentication' },
        { id: 'endpoints', title: 'Endpoints' },
        { id: 'rate-limits', title: 'Rate Limits' }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <AlertTriangle className="h-5 w-5" />,
      items: [
        { id: 'common-issues', title: 'Common Issues' },
        { id: 'connection-problems', title: 'Connection Problems' },
        { id: 'webhook-errors', title: 'Webhook Errors' },
        { id: 'support', title: 'Getting Support' }
      ]
    }
  ];

  // Content for each section
  const getContent = (sectionId: string, itemId: string) => {
    // Introduction content
    if (sectionId === 'getting-started' && itemId === 'introduction') {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Welcome to Automated Trader</h2>
          <p className="text-gray-300">
            Automated Trader is a powerful platform that allows you to automate your trading strategies across multiple platforms and accounts. 
            Whether you're using TradingView alerts, following signal providers, or creating your own custom strategies, our platform provides 
            the tools you need to execute trades automatically with precision and reliability.
          </p>
          
          <div className="glass-panel rounded-xl p-6 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
            <h3 className="text-lg font-medium text-white mb-3">Key Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                  <Webhook className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Webhook Automation</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Connect TradingView alerts to execute trades automatically on your trading accounts.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                  <ArrowRightLeft className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Account Bridges</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Copy trades between different platforms and accounts with customizable settings.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                  <Users className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Copy Trading</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Follow and copy top-performing traders automatically (coming soon).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                  <MessageCircle className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-medium">Notifications</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Receive real-time alerts and trade notifications via Telegram.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Getting Started</h3>
          <p className="text-gray-300">
            To get started with Automated Trader, follow these simple steps:
          </p>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <h4 className="text-white font-medium">Connect a Trading Account</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Add your first trading account from the Trading Accounts page. We support MetaTrader, Hankox ActTrader, 
                  TradeLocker, and Binance.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <h4 className="text-white font-medium">Create a Webhook</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Set up a webhook to receive signals from TradingView or other sources. Configure your trading parameters 
                  like position size, stop loss, and take profit.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <h4 className="text-white font-medium">Set Up Notifications</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Connect your Telegram account to receive real-time notifications about your trades and account status.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                4
              </div>
              <div>
                <h4 className="text-white font-medium">Monitor Your Performance</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Track your trading performance in real-time on the dashboard and analytics pages.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    // MetaTrader documentation
    if (sectionId === 'trading-accounts' && itemId === 'metatrader') {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">MetaTrader (MT4/MT5)</h2>
          <p className="text-gray-300">
            MetaTrader is the most popular trading platform for Forex and CFD trading. Our platform supports both MetaTrader 4 (MT4) 
            and MetaTrader 5 (MT5) versions, allowing you to automate your trading on these platforms.
          </p>
          
          <div className="glass-panel rounded-xl p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
            <h3 className="text-lg font-medium text-white mb-3">Connecting Your MetaTrader Account</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium">Gather Your Account Information</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    You'll need the following information from your MetaTrader platform:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-400 mt-2 space-y-1">
                    <li>Login number (your account number)</li>
                    <li>Password (investor or master password)</li>
                    <li>Server name (e.g., ICMarkets-Live1, Pepperstone-Demo)</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium">Choose the Right Password Type</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    <strong>Investor Password:</strong> Provides read-only access to your account. Use this if you only want to monitor your account without executing trades.
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    <strong>Master Password:</strong> Provides full access to your account, including the ability to execute trades. Use this if you want to automate trading.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium">Add Your Account</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Click the "Add Account" button on the Trading Accounts page, select MetaTrader, and enter your account details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-white font-medium">Verify Connection</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Once connected, you'll see your account balance, equity, and other details. The connection status should show "Connected".
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Finding Your Server Name</h3>
          <p className="text-gray-300 mb-4">
            If you're unsure about your server name, you can find it in your MetaTrader platform:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-blue-500/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">In MetaTrader 4</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Go to Tools → Options → Server tab. The server name is displayed at the top.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-blue-500/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">In MetaTrader 5</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Go to Tools → Options → Server tab. The server name is displayed at the top.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-blue-500/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h4 className="text-white font-medium">From Login Screen</h4>
                <p className="text-sm text-gray-400 mt-1">
                  When logging into your MT4/MT5 account, the server name is displayed in the dropdown menu.
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Common Server Names</h3>
          <p className="text-gray-300 mb-4">
            Here are some common server names for popular brokers:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-200/50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Broker</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">MT4 Server</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">MT5 Server</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-300/30">
                <tr>
                  <td className="px-4 py-3 text-white">IC Markets</td>
                  <td className="px-4 py-3 text-gray-300">ICMarkets-Live1</td>
                  <td className="px-4 py-3 text-gray-300">ICMarkets-Live5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">Pepperstone</td>
                  <td className="px-4 py-3 text-gray-300">Pepperstone-Live1</td>
                  <td className="px-4 py-3 text-gray-300">Pepperstone-Live5</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">FXCM</td>
                  <td className="px-4 py-3 text-gray-300">FXCM-USDDemo01</td>
                  <td className="px-4 py-3 text-gray-300">FXCM-USDReal01</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">Fyntura</td>
                  <td className="px-4 py-3 text-gray-300">Fyntura-Demo</td>
                  <td className="px-4 py-3 text-gray-300">Fyntura-Live</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3 mt-6">
            <HelpCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Need Help?</p>
              <p className="text-sm text-gray-400 mt-1">
                If you're having trouble connecting your MetaTrader account, please contact our support team or check the troubleshooting section.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Webhook Basics
    if (sectionId === 'webhooks' && itemId === 'webhook-basics') {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Webhook Basics</h2>
          <p className="text-gray-300">
            Webhooks allow you to automate your trading by receiving signals from external sources like TradingView and executing trades 
            automatically on your connected trading accounts.
          </p>
          
          <h3 className="text-xl font-medium text-white mt-6">What is a Webhook?</h3>
          <p className="text-gray-300 mb-4">
            A webhook is a way for applications to provide real-time information to other applications. In the context of trading, 
            webhooks allow platforms like TradingView to send trading signals to our platform, which then executes trades on your 
            connected trading accounts.
          </p>
          
          <div className="glass-panel rounded-xl p-6 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20">
            <h3 className="text-lg font-medium text-white mb-3">How Webhooks Work</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium">Create a Webhook</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Create a webhook in our platform and configure its settings (trading pair, position size, stop loss, take profit, etc.).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium">Get Webhook URL</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Each webhook has a unique URL that you'll use to send signals to our platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium">Set Up External Source</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Configure your external source (e.g., TradingView) to send signals to your webhook URL when certain conditions are met.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-white font-medium">Automated Execution</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    When a signal is received, our platform automatically executes the trade on your connected trading account based on your webhook settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Webhook Types</h3>
          <p className="text-gray-300 mb-4">
            We offer different types of webhooks to suit your trading needs:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Basic Webhook</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Simple webhook for executing market orders, modifying orders, and closing trades. Perfect for beginners.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Premium Webhook</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Advanced webhook with features like multiple take-profit levels, dynamic trailing stop-loss, and time-based exit strategies.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Advanced Webhook</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Full-featured webhook for professional traders with custom integrations, third-party indicators, and algorithmic trading capabilities.
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Example Webhook URL</h3>
          <p className="text-gray-300 mb-4">
            Here's an example of what a webhook URL looks like:
          </p>
          
          <div className="relative">
            <div className="glass-panel rounded-lg p-4 bg-dark-200/50 border border-dark-300/50 font-mono text-sm text-white overflow-x-auto">
              https://api.automatedtrader.com/webhook/abc123def456
            </div>
            <button 
              onClick={() => handleCopy("https://api.automatedtrader.com/webhook/abc123def456")}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
            >
              {copiedText === "https://api.automatedtrader.com/webhook/abc123def456" ? (
                <Check className="h-4 w-4 text-emerald-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
          
          <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3 mt-6">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Security Warning</p>
              <p className="text-sm text-gray-400 mt-1">
                Keep your webhook URLs private. Anyone with your webhook URL can potentially send signals to your trading account. 
                Use IP restrictions and other security measures when possible.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Account Bridges
    if (sectionId === 'account-bridges' && itemId === 'bridge-basics') {
      return (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">Account Bridge Basics</h2>
          <p className="text-gray-300">
            Account Bridges allow you to copy trades between different trading accounts, even across different platforms. This powerful 
            feature enables you to execute a strategy on one account and have it automatically replicated on other accounts.
          </p>
          
          <div className="glass-panel rounded-xl p-6 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 mt-6">
            <h3 className="text-lg font-medium text-white mb-3">How Account Bridges Work</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium">Select Source Account</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose the trading account that will be the source of trades. This is the account where trades are initially executed.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium">Select Target Account</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Choose the trading account that will copy trades from the source account. This can be on the same or a different platform.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium">Configure Position Sizing</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Set up how position sizes should be calculated on the target account. Options include percentage-based, fixed lot size, or risk-based.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="text-white font-medium">Choose Sync Mode</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Select between one-way sync (source to target only) or two-way sync (bidirectional copying between accounts).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <div>
                  <h4 className="text-white font-medium">Activate Bridge</h4>
                  <p className="text-sm text-gray-400 mt-1">
                    Once configured, activate the bridge to start copying trades between accounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Use Cases for Account Bridges</h3>
          <p className="text-gray-300 mb-4">
            Account bridges can be used in various scenarios:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Multi-Account Management</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Manage multiple trading accounts with the same strategy without having to manually execute trades on each account.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Cross-Platform Trading</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Execute trades on one platform (e.g., MetaTrader) and have them automatically copied to another platform (e.g., Binance).
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Risk Diversification</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Spread your trading risk across multiple brokers or platforms while maintaining a unified strategy.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-accent/10 rounded-lg mt-0.5">
                <Check className="h-4 w-4 text-accent" />
              </div>
              <div>
                <h4 className="text-white font-medium">Demo to Live Transition</h4>
                <p className="text-sm text-gray-400 mt-1">
                  Test your strategy on a demo account and simultaneously execute it on a live account with smaller position sizes.
                </p>
              </div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium text-white mt-6">Supported Platform Combinations</h3>
          <p className="text-gray-300 mb-4">
            You can create bridges between the following platforms:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-200/50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Source Platform</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Target Platform</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">Supported</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-300/30">
                <tr>
                  <td className="px-4 py-3 text-white">MetaTrader 4/5</td>
                  <td className="px-4 py-3 text-white">MetaTrader 4/5</td>
                  <td className="px-4 py-3 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">MetaTrader 4/5</td>
                  <td className="px-4 py-3 text-white">Hankox ActTrader</td>
                  <td className="px-4 py-3 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">Hankox ActTrader</td>
                  <td className="px-4 py-3 text-white">MetaTrader 4/5</td>
                  <td className="px-4 py-3 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">Binance</td>
                  <td className="px-4 py-3 text-white">MetaTrader 4/5</td>
                  <td className="px-4 py-3 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">TradeLocker</td>
                  <td className="px-4 py-3 text-white">Hankox ActTrader</td>
                  <td className="px-4 py-3 text-emerald-400">✓</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white">Binance</td>
                  <td className="px-4 py-3 text-white">Binance</td>
                  <td className="px-4 py-3 text-emerald-400">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3 mt-6">
            <HelpCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">Performance Considerations</p>
              <p className="text-sm text-gray-400 mt-1">
                Account bridges operate with ultra-low latency (typically under 100ms), ensuring that trades are copied quickly and accurately. 
                However, market conditions, broker execution speeds, and internet connectivity can affect the exact timing of trade execution.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    // Default content for other sections
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="p-4 bg-dark-200/50 rounded-full mb-4">
          <FileText className="h-8 w-8 text-accent" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">Documentation Coming Soon</h3>
        <p className="text-gray-400 text-center max-w-md">
          We're currently working on this section of the documentation. 
          Please check back soon for detailed information about {itemId.split('-').join(' ')}.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
            <BookOpen className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Documentation</h1>
            <p className="text-gray-400 mt-1">Comprehensive guides and reference materials</p>
          </div>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                     border border-dark-300/30 focus:outline-none focus:ring-1 
                     focus:ring-accent/50 transition-all duration-300"
          />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="glass-panel rounded-xl p-4 sticky top-24">
            <nav className="space-y-1">
              {sections.map((section) => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      toggleExpand(section.id);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                      activeSection === section.id 
                        ? 'bg-accent/10 text-accent' 
                        : 'text-gray-400 hover:text-white hover:bg-dark-200/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {section.icon}
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {expandedItems.includes(section.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedItems.includes(section.id) && (
                    <div className="pl-4 space-y-1 mt-1">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveSection(section.id);
                            toggleExpand(item.id);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${
                            activeSection === section.id && expandedItems.includes(item.id)
                              ? 'bg-accent/5 text-white' 
                              : 'text-gray-400 hover:text-white hover:bg-dark-200/50'
                          }`}
                        >
                          <span className="text-sm">{item.title}</span>
                          {expandedItems.includes(item.id) ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="mt-6 pt-6 border-t border-dark-300/30">
              <div className="flex items-center space-x-3 mb-4">
                <HelpCircle className="h-5 w-5 text-accent" />
                <h3 className="text-white font-medium">Need Help?</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <a 
                href="https://discord.gg/RU5t7ErGEE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="premium-button w-full flex items-center justify-center py-2 text-sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="glass-panel rounded-xl p-6">
            {sections.map((section) => (
              <div key={section.id} className={activeSection === section.id ? 'block' : 'hidden'}>
                {section.items.map((item) => (
                  <div key={item.id} className={expandedItems.includes(item.id) ? 'block' : 'hidden'}>
                    {getContent(section.id, item.id)}
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Related Documentation */}
          <div className="glass-panel rounded-xl p-6 mt-8">
            <h3 className="text-lg font-medium text-white mb-4">Related Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a 
                href="#" 
                className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors border border-dark-300/30 hover:border-accent/20"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Webhook className="h-5 w-5 text-accent" />
                  <h4 className="text-white font-medium">Webhook Setup Guide</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Learn how to set up and configure webhooks for automated trading.
                </p>
              </a>
              
              <a 
                href="#" 
                className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors border border-dark-300/30 hover:border-accent/20"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <h4 className="text-white font-medium">Security Best Practices</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Protect your trading accounts and webhooks with these security tips.
                </p>
              </a>
              
              <a 
                href="#" 
                className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors border border-dark-300/30 hover:border-accent/20"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Terminal className="h-5 w-5 text-accent" />
                  <h4 className="text-white font-medium">API Documentation</h4>
                </div>
                <p className="text-sm text-gray-400">
                  Technical reference for developers integrating with our API.
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}