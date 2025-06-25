import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Bot, Shield, Zap, DollarSign, Clock, Users } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    id: 1,
    question: "How does webhook automation work?",
    answer: "Our platform receives signals from your TradingView alerts via webhooks and automatically executes trades based on your predefined settings. The entire process takes less than 0.04 seconds, ensuring you never miss a trading opportunity.",
    icon: <Bot className="h-5 w-5 text-accent" />
  },
  {
    id: 2,
    question: "Is my trading account secure?",
    answer: "Yes, we use bank-grade encryption and never store your trading passwords. We only require API access with specific permissions, and all connections are secured with 256-bit SSL encryption.",
    icon: <Shield className="h-5 w-5 text-purple-400" />
  },
  {
    id: 3,
    question: "What happens if my internet goes down?",
    answer: "Our system runs on enterprise-grade cloud infrastructure with 99.9% uptime. Even if your local internet connection fails, our servers continue executing your trades without interruption.",
    icon: <Zap className="h-5 w-5 text-emerald-400" />
  },
  {
    id: 4,
    question: "Do I need coding knowledge?",
    answer: "No coding required! Our platform is designed to be user-friendly with a simple point-and-click interface. You can set up complex trading strategies without writing a single line of code.",
    icon: <MessageCircle className="h-5 w-5 text-accent" />
  },
  {
    id: 5,
    question: "How much money do I need to start?",
    answer: "You can start with any amount your broker allows. Our platform supports position sizing based on percentage or fixed lot sizes, making it suitable for accounts of all sizes. We recommend starting with an amount you're comfortable with and scaling up as you gain confidence.",
    icon: <DollarSign className="h-5 w-5 text-emerald-400" />
  },
  {
    id: 6,
    question: "How long does it take to set up?",
    answer: "Setting up your first automated strategy takes just 5 minutes. Connect your trading account, create a webhook, and link it to your TradingView alerts. Our step-by-step guide and video tutorials make the process seamless. Most users are live trading within their first hour.",
    icon: <Clock className="h-5 w-5 text-accent" />
  },
  {
    id: 7,
    question: "Can I copy multiple traders at once?",
    answer: "Yes! Our Pro and Enterprise plans allow you to follow multiple traders simultaneously. You can customize allocation and risk settings for each trader individually. Our smart allocation system ensures optimal position sizing across all your copy trades.",
    icon: <Users className="h-5 w-5 text-purple-400" />
  }
];

export default function FaqSection() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="py-12 md:py-20 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-100/10 to-dark/80 z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,122,255,0.1),transparent_50%)] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(124,58,237,0.1),transparent_50%)] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 text-accent mb-4 md:mb-8
                        border border-accent/20 backdrop-blur-sm">
            <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
            <span className="text-xs md:text-base">Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 text-shadow-glow">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to know about automated trading
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="glass-panel rounded-xl overflow-hidden transition-all duration-300 border border-dark-300/30 hover:border-accent/20"
            >
              <button
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-3 md:p-6 text-left"
                aria-expanded={activeId === faq.id}
              >
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-1.5 md:p-2 bg-dark-200/50 rounded-lg">
                    {faq.icon}
                  </div>
                  <span className="text-sm md:text-lg font-medium text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 md:h-5 md:w-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    activeId === faq.id ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  activeId === faq.id 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div className="p-3 md:p-6 pt-0 text-gray-400 border-t border-dark-300/30">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-8 md:mt-16 text-center">
          <p className="text-gray-400 mb-3 md:mb-4 text-sm md:text-base">
            Still have questions? We're here to help!
          </p>
          <a 
            href="https://discord.gg/RU5t7ErGEE" 
            target="_blank"
            rel="noopener noreferrer"
            className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 inline-flex items-center px-4 md:px-8 py-2 md:py-3 text-sm md:text-base shadow-lg shadow-accent/10"
          >
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}