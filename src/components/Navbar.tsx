import React, { useState, useEffect, useRef } from 'react';
import { 
  Bell, Search, User, Menu, X, ArrowRight, 
  Settings, CreditCard, LogOut, 
  Wallet, Shield, Zap, ChevronDown, Globe, 
  BarChart2, TrendingUp, Webhook, Plus,
  ExternalLink, HelpCircle, Home, MessageCircle,
  Gift, Award, Clock, Calendar, Users, Coins,
  Lock, Bot, ArrowRightLeft, Activity, BookOpen,
  Wrench, Crown, Sparkles
} from 'lucide-react';
import UserMenu from './UserMenu';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New trade executed', time: '2 min ago', read: false },
    { id: 2, title: 'Stop loss hit on EURUSD', time: '15 min ago', read: false },
    { id: 3, title: 'Take profit reached on XAUUSD', time: '1 hour ago', read: false }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showHelpMenu, setShowHelpMenu] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  // Refs for fixed positioning
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const actionsContainerRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notifications-menu') && !target.closest('.notifications-button')) {
        setShowNotifications(false);
      }
      if (!target.closest('.quick-actions-menu') && !target.closest('.quick-actions-button')) {
        setShowQuickActions(false);
      }
      if (!target.closest('.help-menu') && !target.closest('.help-button')) {
        setShowHelpMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(notification => !notification.read).length;

  const handleViewChange = (view: string) => {
    setActiveView(view);
    // This would typically be handled by a router or parent component
    // For now, we'll just close the mobile menu
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-dark/80 backdrop-blur-xl border-b border-dark-300/30 ml-20 md:ml-64 lg:ml-80 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          {/* Left Section - Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
          
          {/* Center Section - Search */}
          <div className="flex-1 flex items-center justify-center">
            <div 
              ref={searchContainerRef}
              className={`hidden md:flex items-center transition-all duration-300 ${
                isSearchExpanded ? 'w-96' : 'w-64'
              }`}
              style={{ minWidth: isSearchExpanded ? '24rem' : '16rem' }}
            >
              <form onSubmit={handleSearch} className="w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search webhooks, trades, markets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchExpanded(true)}
                    onBlur={() => setIsSearchExpanded(false)}
                    className="w-full pl-10 pr-4 py-2 bg-dark-200/50 text-gray-300 rounded-lg 
                             border border-dark-300/30 focus:outline-none focus:ring-1 
                             focus:ring-accent/50 transition-all duration-300"
                  />
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Section - Actions */}
          <div className="flex items-center space-x-1 md:space-x-2" ref={actionsContainerRef}>
            {/* Quick Actions Button */}
            <button 
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="quick-actions-button p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all duration-300 relative"
            >
              <Plus className="h-5 w-5" />
            </button>
            
            {/* Help Button */}
            <button 
              onClick={() => setShowHelpMenu(!showHelpMenu)}
              className="help-button p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all duration-300 relative"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
            
            {/* Notifications Button */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="notifications-button p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all duration-300 relative"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* User Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center space-x-2 p-1.5 text-gray-400 
                       hover:text-white hover:bg-dark-200/50 rounded-lg 
                       transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=80&h=80"
                alt="Profile"
                className="w-7 h-7 rounded-full border border-accent/20"
              />
              <ChevronDown className="h-4 w-4 hidden md:block" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-dark-300/50 px-4 py-4">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search webhooks, trades, markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-200/50 text-gray-300 rounded-lg 
                         border border-dark-300/30 focus:outline-none focus:ring-1 
                         focus:ring-accent/50 transition-all duration-300"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleViewChange('dashboard')}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  activeView === 'dashboard' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-dark-200/30 text-gray-300 hover:text-white hover:bg-dark-200/50'
                }`}
              >
                <BarChart2 className="h-5 w-5" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => handleViewChange('trades')}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  activeView === 'trades' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-dark-200/30 text-gray-300 hover:text-white hover:bg-dark-200/50'
                }`}
              >
                <TrendingUp className="h-5 w-5" />
                <span>Trades</span>
              </button>
              <button 
                onClick={() => handleViewChange('signals')}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  activeView === 'signals' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-dark-200/30 text-gray-300 hover:text-white hover:bg-dark-200/50'
                }`}
              >
                <Webhook className="h-5 w-5" />
                <span>Webhooks</span>
              </button>
              <button 
                onClick={() => handleViewChange('markets')}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  activeView === 'markets' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-dark-200/30 text-gray-300 hover:text-white hover:bg-dark-200/50'
                }`}
              >
                <Globe className="h-5 w-5" />
                <span>Markets</span>
              </button>
              <button 
                onClick={() => handleViewChange('trading-accounts')}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  activeView === 'trading-accounts' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-dark-200/30 text-gray-300 hover:text-white hover:bg-dark-200/50'
                }`}
              >
                <Wallet className="h-5 w-5" />
                <span>Accounts</span>
              </button>
              <button 
                onClick={() => handleViewChange('alerts')}
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all ${
                  activeView === 'alerts' 
                    ? 'bg-accent/10 text-accent' 
                    : 'bg-dark-200/30 text-gray-300 hover:text-white hover:bg-dark-200/50'
                }`}
              >
                <Bell className="h-5 w-5" />
                <span>Alerts</span>
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
              >
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="ml-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
            </div>
            
            <button 
              onClick={() => handleViewChange('membership')}
              className="premium-button w-full flex items-center justify-center py-3"
            >
              Upgrade to Pro
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="notifications-menu absolute right-4 top-16 w-80 bg-dark-100/95 backdrop-blur-xl rounded-xl border border-dark-300/50 shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-dark-300/30 flex items-center justify-between">
            <h3 className="text-white font-medium">Notifications</h3>
            <button 
              onClick={markAllAsRead}
              className="text-xs text-accent hover:text-accent-dark transition-colors"
            >
              Mark all as read
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-dark-300/30">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`p-4 hover:bg-dark-200/30 transition-colors cursor-pointer ${
                      notification.read ? 'opacity-70' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${notification.read ? 'bg-dark-300/50' : 'bg-accent/10'}`}>
                        <Bell className={`h-4 w-4 ${notification.read ? 'text-gray-400' : 'text-accent'}`} />
                      </div>
                      <div>
                        <p className="text-white text-sm">{notification.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-accent rounded-full ml-auto"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">No notifications yet</p>
              </div>
            )}
          </div>
          
          <div className="p-3 border-t border-dark-300/30 text-center">
            <button 
              onClick={() => {
                handleViewChange('alerts');
                setShowNotifications(false);
              }}
              className="text-accent hover:text-accent-dark transition-colors text-sm"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions Dropdown */}
      {showQuickActions && (
        <div className="quick-actions-menu absolute right-16 top-16 w-64 bg-dark-100/95 backdrop-blur-xl rounded-xl border border-dark-300/50 shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-dark-300/30">
            <h3 className="text-white font-medium">Quick Actions</h3>
          </div>
          
          <div className="p-2">
            <button 
              onClick={() => {
                handleViewChange('signals');
                setShowQuickActions(false);
              }}
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left"
            >
              <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                <Webhook className="h-4 w-4 text-accent" />
              </div>
              <div>
                <div className="text-white text-sm">New Webhook</div>
                <div className="text-gray-400 text-xs mt-0.5">Create TradingView webhook</div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                handleViewChange('trades');
                setShowQuickActions(false);
              }}
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left"
            >
              <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
                <TrendingUp className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-white text-sm">Open Trade</div>
                <div className="text-gray-400 text-xs mt-0.5">Execute market order</div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                handleViewChange('trading-accounts');
                setShowQuickActions(false);
              }}
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left"
            >
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
                <Wallet className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-white text-sm">Add Account</div>
                <div className="text-gray-400 text-xs mt-0.5">Connect trading account</div>
              </div>
            </button>
            
            <button 
              onClick={() => {
                handleViewChange('trades');
                setShowQuickActions(false);
              }}
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left"
            >
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-lg">
                <Wrench className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-white text-sm">Bulk Modify</div>
                <div className="text-gray-400 text-xs mt-0.5">Modify multiple trades</div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Help Menu Dropdown */}
      {showHelpMenu && (
        <div className="help-menu absolute right-10 top-16 w-64 bg-dark-100/95 backdrop-blur-xl rounded-xl border border-dark-300/50 shadow-xl z-50 overflow-hidden">
          <div className="p-4 border-b border-dark-300/30">
            <h3 className="text-white font-medium">Help & Resources</h3>
          </div>
          
          <div className="p-2">
            <button 
              onClick={() => {
                handleViewChange('docs');
                setShowHelpMenu(false);
              }}
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left"
            >
              <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                <BookOpen className="h-4 w-4 text-accent" />
              </div>
              <div>
                <div className="text-white text-sm">Documentation</div>
                <div className="text-gray-400 text-xs mt-0.5">Guides & tutorials</div>
              </div>
            </button>
            
            <a 
              href="https://discord.gg/RU5t7ErGEE" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left block"
            >
              <div className="p-2 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-lg">
                <MessageCircle className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-white text-sm">Discord Community</div>
                <div className="text-gray-400 text-xs mt-0.5">Join our community</div>
              </div>
            </a>
            
            <a 
              href="https://www.youtube.com/@automatedtrader2089" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left block"
            >
              <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-lg">
                <ExternalLink className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <div className="text-white text-sm">Video Tutorials</div>
                <div className="text-gray-400 text-xs mt-0.5">Watch on YouTube</div>
              </div>
            </a>
            
            <button 
              onClick={() => {
                handleViewChange('status-logs');
                setShowHelpMenu(false);
              }}
              className="w-full flex items-center space-x-3 p-3 hover:bg-dark-200/30 rounded-lg transition-colors text-left"
            >
              <div className="p-2 bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 rounded-lg">
                <Activity className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <div className="text-white text-sm">System Status</div>
                <div className="text-gray-400 text-xs mt-0.5">Service health & uptime</div>
              </div>
            </button>
          </div>
        </div>
      )}

      <UserMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </nav>
  );
}