import React from 'react';
import { ExternalLink, MessageCircle, Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative py-12 md:py-16 overflow-hidden bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="https://trustedsignalsvip.com/wp-content/uploads/2025/05/dark-logo-scaled.webp" 
            alt="Automated Trader" 
            className="h-10 md:h-12 object-contain"
          />
        </div>
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {/* Quick Links */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-medium mb-3">About</h4>
            <p className="text-gray-400 text-sm mb-4">
              Cutting-edge trading automation platform for traders who demand excellence.
            </p>
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <Shield className="h-4 w-4 text-accent" />
              <span>Bank-Grade Security</span>
            </div>
          </div>
          
          {/* Connect */}
          <div>
            <h4 className="text-white font-medium mb-3">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://discord.gg/RU5t7ErGEE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>Discord</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="mailto:Support@automatedtrader.com" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>Support</span>
                  <MessageCircle className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/@automatedtrader2089" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>YouTube</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-white font-medium mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
          
          {/* Refund Policy */}
          <div>
            <h4 className="text-white font-medium mb-3">Refund Policy</h4>
            <p className="text-sm text-gray-400">
              To qualify for a refund, you must use the software daily for 14 consecutive days.
            </p>
          </div>
        </div>
        
        {/* Risk Warning */}
        <div className="mb-8 p-4 glass-panel rounded-xl border border-dark-300/30">
          <h4 className="text-white font-medium mb-2 text-center">Risk Warning</h4>
          <p className="text-sm text-gray-400 text-center">
            Trading involves significant risk of loss and is not suitable for all investors. 
            Past performance is not indicative of future results. Consider your experience, 
            investment objectives, and financial resources before trading.
          </p>
        </div>
        
        {/* Bottom Section */}
        <div className="text-center text-gray-500 text-sm">
          &copy; {currentYear} AutomatedTrader. All rights reserved.
        </div>
      </div>
    </footer>
  );
}