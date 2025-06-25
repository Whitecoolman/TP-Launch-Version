import React, { useState } from 'react';
import { 
  Plus, TrendingUp, TrendingDown, Users, Clock, Bot, Webhook, 
  Settings, CreditCard, Bell, LogOut, 
  Home, ChevronRight, ChevronLeft, Box,
  MessageCircle, Coins, Trophy, DollarSign,
  Shield, Lock, CheckCircle2, Zap, Award, Target, ArrowRight, Sparkles,
  ArrowRightLeft, Wallet, RefreshCw, Crown,
  ExternalLink, Calendar, Filter, Search, ChevronDown,
  Sun, Moon, Sunrise, Sunset, Globe, Coffee, Briefcase, Activity,
  BookOpen, BarChart2, Layers
} from 'lucide-react';
import { useMetaAccounts } from '../hooks/useMetaAccount';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';

interface SideMenuProps {
  activeView: string;
  onViewChange: (view: string) => void;
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

const SideMenu = ({ 
  activeView, 
  onViewChange,
  isCollapsed,
  onCollapsedChange
}: SideMenuProps) => {
  const [isAppsExpanded, setIsAppsExpanded] = useState(true);
  const { data: accounts } = useMetaAccounts();
  const [user] = useAtom(userAtom);

  // Group menu items by category for better organization
  const dashboardItems = [
    { id: 'dashboard', icon: <BarChart2 className="h-5 w-5" />, label: 'Dashboard' },
    { id: 'trades', icon: <TrendingUp className="h-5 w-5" />, label: 'Trades' },
    { id: 'alerts', icon: <Bell className="h-5 w-5" />, label: 'Alerts', badge: '3' },
  ];
  
  const tradingItems = [
    { id: 'signals', icon: <Webhook className="h-5 w-5" />, label: 'Webhooks', badge: '5' },
    { id: 'templates', icon: <Layers className="h-5 w-5" />, label: 'Templates', badge: 'New' },
    { id: 'trading-accounts', icon: <Wallet className="h-5 w-5" />, label: 'Trading Accounts' },
    { id: 'account-bridge', icon: <ArrowRightLeft className="h-5 w-5" />, label: 'Account Bridge', badge: 'New' },
    { id: 'telegram', icon: <MessageCircle className="h-5 w-5" />, label: 'Telegram' },
  ];
  
  const otherItems = [
    { id: 'docs', icon: <BookOpen className="h-5 w-5" />, label: 'Documentation', badge: 'New' },
    { id: 'status-logs', icon: <Activity className="h-5 w-5" />, label: 'Status Logs' },
    { id: 'settings', icon: <Settings className="h-5 w-5" />, label: 'Settings' },
  ];
  
  const marketingItems = [
    { id: 'landing', icon: <Home className="h-5 w-5" />, label: 'Landing Page' },
    { id: 'membership', icon: <CreditCard className="h-5 w-5" />, label: 'Membership' },
    { id: 'lifetime-coming-soon', icon: <Crown className="h-5 w-5" />, label: 'Lifetime Access', badge: 'New' },
  ];

  // Simulated admin check - replace with actual auth logic
  const isAdmin = true;

  // Render a section of menu items
  const renderMenuSection = (items, sectionTitle = null) => (
    <div className="space-y-1">
      {!isCollapsed && sectionTitle && (
        <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {sectionTitle}
        </div>
      )}
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onViewChange(item.id)}
          className={`w-full flex items-center ${
            isCollapsed ? 'justify-center' : 'justify-between'
          } p-3 text-gray-300 hover:bg-dark-100/80 rounded-lg transition-all duration-300
            ${activeView === item.id ? 'bg-dark-100/80 text-white' : ''}`}
        >
          <div className="flex items-center space-x-3">
            <div className={activeView === item.id ? 'text-white' : 'text-gray-500'}>
              {item.icon}
            </div>
            {!isCollapsed && <span>{item.label}</span>}
          </div>
          {!isCollapsed && item.badge && (
            <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-dark/95 backdrop-blur-xl 
                  border-r border-dark-300/30 transition-all duration-300 z-50
                  ${isCollapsed ? 'w-20' : 'w-64 md:w-80'}`}
    >
      <button
        onClick={() => onCollapsedChange(!isCollapsed)}
        className="absolute -right-3 top-6 p-1.5 rounded-full bg-dark-200 border border-dark-300/30
                   text-gray-400 hover:text-white transition-colors duration-300 hidden md:block"
      >
        {isCollapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
      </button>

      <div className="p-4 h-full flex flex-col overflow-y-auto">
        {/* Logo at the top of the menu */}
        <div className={`flex justify-center mb-6 ${isCollapsed ? 'px-2' : 'px-4'} pt-4`}>
          {isCollapsed ? (
            <img 
              src="https://trustedsignalsvip.com/wp-content/uploads/2025/06/Untitled-design-1.png" 
              alt="Automated Trader" 
              className="h-10 object-contain"
            />
          ) : (
            <img 
              src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp" 
              alt="Automated Trader" 
              className="h-12 object-contain"
            />
          )}
        </div>

        {/* Main navigation sections */}
        <div className="flex-1 space-y-6">
          {renderMenuSection(dashboardItems, "Dashboard")}
          {renderMenuSection(tradingItems, "Trading")}
          {renderMenuSection(otherItems, "System")}
          
          {/* Marketing section at the bottom */}
          <div className="pt-4 mt-4 border-t border-dark-300/30">
            {renderMenuSection(marketingItems, "Marketing")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;