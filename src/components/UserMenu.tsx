import React, { useState, useEffect, useRef } from 'react';
import { 
  User, Settings, CreditCard, Bell, LogOut, 
  Moon, ChevronRight, Shield, Wallet, Crown,
  MessageCircle, HelpCircle, Gift, Award, Sparkles
} from 'lucide-react';

interface MenuItemProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  badge?: string;
  chevron?: boolean;
}

function MenuItem({ icon, text, onClick, badge, chevron = false }: MenuItemProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-3 text-gray-300 
                 hover:bg-dark-100/80 rounded-lg transition-all duration-300"
    >
      <div className="flex items-center space-x-3">
        <div className="text-gray-500">{icon}</div>
        <span>{text}</span>
      </div>
      <div className="flex items-center space-x-3">
        {badge && (
          <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
            {badge}
          </span>
        )}
        {chevron && <ChevronRight className="h-4 w-4 text-gray-500" />}
      </div>
    </button>
  );
}

export default function UserMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [darkMode, setDarkMode] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      <div 
        ref={menuRef}
        className="absolute right-4 top-16 w-80 bg-dark/95 backdrop-blur-xl border border-dark-300/30 shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Profile Section */}
        <div className="p-4 border-b border-dark-300/30 bg-gradient-to-br from-accent/10 to-purple-500/5">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=80&h=80"
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-accent/20"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark" />
            </div>
            <div>
              <h3 className="text-white font-medium">Alex Thompson</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Premium Trader</span>
                <span className="px-1.5 py-0.5 bg-gradient-to-r from-accent to-purple-500 text-white rounded-full text-xs">PRO</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-dark-200/30 rounded-lg">
              <div className="text-white font-medium">127</div>
              <div className="text-xs text-gray-500">Trades</div>
            </div>
            <div className="text-center p-2 bg-dark-200/30 rounded-lg">
              <div className="text-emerald-400 font-medium">89%</div>
              <div className="text-xs text-gray-500">Win Rate</div>
            </div>
            <div className="text-center p-2 bg-dark-200/30 rounded-lg">
              <div className="text-white font-medium">$48.2k</div>
              <div className="text-xs text-gray-500">Balance</div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-2 space-y-1 bg-dark-50/30">
          <MenuItem 
            icon={<User className="h-5 w-5" />} 
            text="Profile Settings" 
            chevron 
          />
          <MenuItem 
            icon={<Bell className="h-5 w-5" />} 
            text="Notifications" 
            badge="3"
            chevron 
          />
          <MenuItem 
            icon={<Wallet className="h-5 w-5" />} 
            text="Payment Methods" 
            chevron 
          />
          <MenuItem 
            icon={<Shield className="h-5 w-5" />} 
            text="Security" 
            chevron 
          />
          <MenuItem 
            icon={<Settings className="h-5 w-5" />} 
            text="Trading Preferences" 
            chevron 
          />
          <MenuItem 
            icon={<Moon className="h-5 w-5" />} 
            text="Dark Mode" 
            onClick={() => setDarkMode(!darkMode)}
          />
        </div>

        {/* Upgrade Section */}
        <div className="p-4 border-t border-dark-300/30 bg-gradient-to-r from-red-500/20 to-red-600/10">
          <div className="flex items-center space-x-3 mb-3">
            <Crown className="h-5 w-5 text-red-400" />
            <h3 className="text-white font-medium">Lifetime Access</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            One-time payment. Unlimited webhooks. Unlimited Hankox accounts.
          </p>
          <a 
            href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg py-2 text-sm flex items-center justify-center"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Get Lifetime Access
          </a>
        </div>

        {/* Refer a Friend Section */}
        <div className="p-4 border-t border-dark-300/30 bg-gradient-to-r from-emerald-500/20 to-emerald-600/10">
          <div className="flex items-center space-x-3 mb-3">
            <Gift className="h-5 w-5 text-emerald-400" />
            <h3 className="text-white font-medium">Refer a Friend</h3>
          </div>
          <p className="text-sm text-gray-300 mb-3">
            Get 1 month free when you refer a friend. They get 1 month free too!
          </p>
          <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg py-2 text-sm flex items-center justify-center">
            <Award className="h-4 w-4 mr-2" />
            Invite Friends
          </button>
        </div>

        {/* Support & Logout */}
        <div className="p-2 border-t border-dark-300/30 bg-dark-100/50">
          <MenuItem 
            icon={<HelpCircle className="h-5 w-5" />} 
            text="Help & Support" 
          />
          <MenuItem 
            icon={<Gift className="h-5 w-5" />} 
            text="Refer a Friend" 
            badge="Earn $20"
          />
          <MenuItem 
            icon={<LogOut className="h-5 w-5" />} 
            text="Sign Out" 
          />
        </div>
      </div>
    </div>
  );
}