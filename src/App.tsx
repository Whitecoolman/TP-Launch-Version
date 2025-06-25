import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';
import LandingView from './views/LandingView';
import DashboardView from './views/DashboardView';
import TradesView from './views/TradesView';
import SignalsView from './views/SignalsView';
import AnalyticsView from './views/AnalyticsView';
import AlertsView from './views/AlertsView';
import TelegramView from './views/TelegramView';
import TestLoginView from './views/TestLoginView';
import MembershipView from './views/MembershipView';
import LifetimeComingSoonView from './views/LifetimeComingSoonView';
import StatusLogsView from './views/StatusLogsView';
import TradingAccountsView from './views/TradingAccountsView';
import AccountBridgeView from './views/AccountBridgeView';
import DocsView from './views/DocsView';
import TemplatesView from './views/TemplatesView';
import ChatWindow from './components/ChatWindow';
import CheckoutModal from './components/CheckoutModal';
import OpenTradeModal from './components/trades/OpenTradeModal';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [copyingTraders, setCopyingTraders] = useState<string[]>([]);
  const [checkoutTrader, setCheckoutTrader] = useState<any>(null);
  const [menuCollapsed, setMenuCollapsed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOpenTradeModal, setShowOpenTradeModal] = useState(false);

  const handleCopyTrader = (traderId: string, name: string, profit: number, winRate: number, price: number) => {
    if (copyingTraders.includes(traderId)) {
      setCopyingTraders(prev => prev.filter(id => id !== traderId));
    } else {
      const avatarUrl = `https://images.unsplash.com/photo-${
        name === "Alex Trading" ? "1560250097-0b93528c311a" :
        name === "Pro Signals" ? "1573497019940-1c28c88b4f3e" :
        "1566492031773-4f4e44671857"
      }?auto=format&fit=crop&w=80&h=80`;

      setCheckoutTrader({ traderId, name, profit, winRate, price, avatarUrl });
    }
  };

  const handleSubscribe = () => {
    if (checkoutTrader) {
      setCopyingTraders(prev => [...prev, checkoutTrader.traderId]);
      setCheckoutTrader(null);
    }
  };

  const toggleChat = (traderId: string) => {
    setActiveChats(prev => 
      prev.includes(traderId) 
        ? prev.filter(id => id !== traderId)
        : [...prev, traderId]
    );
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveView('dashboard');
  };

  const handleOpenTrade = () => {
    setShowOpenTradeModal(true);
  };

  const renderView = () => {
    switch (activeView) {
      case 'test-login':
        return <TestLoginView />;
      case 'landing':
        return <LandingView />;
      case 'membership':
        return <MembershipView />;
      case 'lifetime-coming-soon':
        return <LifetimeComingSoonView />;
      case 'dashboard':
        return (
          <DashboardView 
            onCopyTrader={handleCopyTrader} 
            onChat={toggleChat} 
            copyingTraders={copyingTraders}
            onViewChange={setActiveView}
          />
        );
      case 'trades':
        return <TradesView onOpenTrade={handleOpenTrade} />;
      case 'signals':
        return <SignalsView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'templates':
        return <TemplatesView />;
      case 'alerts':
        return <AlertsView />;
      case 'trading-accounts':
        return <TradingAccountsView onLogin={handleLogin} isLoggedIn={isLoggedIn} />;
      case 'account-bridge':
        return <AccountBridgeView />;
      case 'telegram':
        return <TelegramView />;
      case 'status-logs':
        return <StatusLogsView />;
      case 'docs':
        return <DocsView />;
      default:
        return <DashboardView 
          onCopyTrader={handleCopyTrader} 
          onChat={toggleChat} 
          copyingTraders={copyingTraders}
          onViewChange={setActiveView}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-100">
      <SideMenu 
        activeView={activeView} 
        onViewChange={setActiveView} 
        isCollapsed={menuCollapsed}
        onCollapsedChange={setMenuCollapsed}
      />
      <Navbar />
      
      <main className={`pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        menuCollapsed ? 'ml-20' : 'ml-0 md:ml-64 lg:ml-80'
      }`}>
        <div className="max-w-7xl mx-auto">
          {renderView()}
        </div>
      </main>

      <div className="fixed bottom-4 right-4 flex flex-col space-y-4">
        {activeChats.map((traderId) => (
          <ChatWindow
            key={traderId}
            traderId={traderId}
            traderName={traderId}
            onMinimize={() => toggleChat(traderId)}
          />
        ))}
      </div>

      {checkoutTrader && (
        <CheckoutModal
          isOpen={true}
          onClose={() => setCheckoutTrader(null)}
          trader={checkoutTrader}
          onSubscribe={handleSubscribe}
        />
      )}

      <OpenTradeModal
        isOpen={showOpenTradeModal}
        onClose={() => setShowOpenTradeModal(false)}
      />
    </div>
  );
}

export default App;