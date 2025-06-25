import React, { useState } from 'react';
import { Check, ChevronRight, Info, HelpCircle, Shield, Bot, Zap, Users, Lock, Star, Clock, ArrowRight, DollarSign, Plus, Minus, Sparkles, AlertTriangle } from 'lucide-react';
import Tooltip from '../ui/Tooltip';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
  webhookType: string;
  webhookCount: string;
  gradient: string;
}

export default function PricingPlans() {
  const [accounts, setAccounts] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [animationIndex, setAnimationIndex] = useState(0);
  
  // Animate features sequentially
  React.useEffect(() => {
    const interval = setInterval(() => {
      setAnimationIndex(prev => (prev + 1) % 12);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const plans: Plan[] = [
    {
      id: 'basic',
      name: "Basic Plan",
      price: 29,
      description: "Perfect for beginners who want reliable, direct signal-based execution without advanced customization.",
      icon: <Bot className="h-4 w-4 md:h-5 md:w-5" />,
      webhookType: "Basic Webhook",
      webhookCount: "1 Basic Webhook",
      features: [
        "Market Orders (Buy/Sell)",
        "Modify Orders (SL/TP)",
        "Close Trades (Full or Partial)",
        "Simple setup for basic automation",
        "1 Webhook"
      ],
      gradient: "bg-gradient-to-br from-blue-500/20 via-blue-600/10 to-blue-500/5"
    },
    {
      id: 'premium',
      name: "Premium Plan",
      price: 59,
      description: "Ideal for intermediate traders who want more risk control and automation tools to lock in profits and manage open trades dynamically.",
      icon: <Zap className="h-4 w-4 md:h-5 md:w-5" />,
      webhookType: "Premium Webhook",
      webhookCount: "3 Premium Webhooks",
      popular: true,
      features: [
        "Everything from Basic",
        "Multiple Take-Profit Levels with Smart Distribution",
        "Advanced Position Sizing with Risk Management",
        "Dynamic Trailing Stop-Loss System",
        "Time-Based Exit Strategies",
        "Break-Even Automation",
        "3 Webhooks"
      ],
      gradient: "bg-gradient-to-br from-accent/20 via-purple-500/15 to-accent/5"
    },
    {
      id: 'advanced',
      name: "Advanced Plan",
      price: 99,
      description: "Perfect for pro traders, algo companies, or developers needing deep automation + multiple systems running at once.",
      icon: <Shield className="h-4 w-4 md:h-5 md:w-5" />,
      webhookType: "Advanced Webhook",
      webhookCount: "10 Advanced Webhooks",
      features: [
        "Full integration with 3rd-party indicators or signals",
        "Webhooks can be automatically triggered from inside custom indicators",
        "Designed for automated algo trading and full-scale systems",
        "Plug-and-play integrations with smart trading bots",
        "10 Webhooks"
      ],
      gradient: "bg-gradient-to-br from-purple-500/20 via-purple-600/10 to-purple-500/5"
    }
  ];

  const supportedPlatforms = [
    { name: "TradingView", icon: "📊", description: "Seamless TradingView webhook integration" },
    { name: "Hankox ActTrader", icon: "💹", description: "Professional multi-broker solution" },
    { name: "MetaTrader 4 & 5", icon: "📈", description: "Industry standard MT4/MT5 platforms" },
    { name: "TradeLocker", icon: "🔒", description: "Professional trading platform integration" }
  ];

  const upcomingPlatforms = [
    { name: "TradeStation", icon: "📉" },
    { name: "NinjaTrader", icon: "🎯" },
    { name: "cTrader", icon: "🌐" },
    { name: "Coinbase", icon: "₿" },
    { name: "Binance", icon: "🔶" },
    { name: "Interactive Brokers", icon: "🏛️" },
    { name: "Kraken", icon: "🐙" },
    { name: "Bitfinex", icon: "📈" },
    { name: "KuCoin", icon: "🌟" }
  ];

  const getAccountPrice = (basePrice: number, accounts: number) => {
    if (accounts === 1) return basePrice;
    const extraAccounts = accounts - 1;
    const extraAccountPrice = extraAccounts * 19;
    return basePrice + extraAccountPrice;
  };

  const getCheckoutUrl = (planId: string, accounts: number) => {
    const urls: Record<string, Record<number, string>> = {
      basic: {
        1: 'https://whop.com/checkout/plan_MLc4Bsvzehuvb/',
        2: 'https://whop.com/checkout/plan_GSV8lX0T1cEXd?d2c=true',
        3: 'https://whop.com/checkout/plan_xqcYLvetnUb3C?d2c=true',
        4: 'https://whop.com/checkout/plan_haQpkR5d4pr5v?d2c=true',
        5: 'https://whop.com/checkout/plan_slUS3RRlVVr0z?d2c=true',
        6: 'https://whop.com/checkout/plan_dKJRiHqMGJp6M?d2c=true',
        7: 'https://whop.com/checkout/plan_YLGQBdCzCDtDN?d2c=true',
        8: 'https://whop.com/checkout/plan_mUrHsA6PL2kME?d2c=true',
        9: 'https://whop.com/checkout/plan_pXvVuWSI4AiKh?d2c=true',
        10: 'https://whop.com/checkout/plan_1G1Mm3U0BJmg9?d2c=true',
        11: 'https://whop.com/checkout/plan_zrWZy17sNtFi0?d2c=true'
      },
      premium: {
        1: 'https://whop.com/checkout/plan_PTz4AqPFsE4b6?d2c=true',
        2: 'https://whop.com/checkout/plan_j4uaRw9eFwisv?d2c=true',
        3: 'https://whop.com/checkout/plan_P2g5lLURMamvc?d2c=true',
        4: 'https://whop.com/checkout/plan_ItezqL28z9AWy?d2c=true',
        5: 'https://whop.com/checkout/plan_f8WHAzQ3jyoIM?d2c=true',
        6: 'https://whop.com/checkout/plan_CgfemWq66JTjn?d2c=true',
        7: 'https://whop.com/checkout/plan_K4Ly1TP6ExzYs?d2c=true',
        8: 'https://whop.com/checkout/plan_jJZqcSvAMfqHt?d2c=true',
        9: 'https://whop.com/checkout/plan_JGfvFensjfPqW?d2c=true',
        10: 'https://whop.com/checkout/plan_2poDrT8N92CBS?d2c=true',
        11: 'https://whop.com/checkout/plan_siebmzJ9BWBpo?d2c=true'
      },
      advanced: {
        1: 'https://whop.com/checkout/plan_SBfkVjoctLgPQ?d2c=true',
        2: 'https://whop.com/checkout/plan_bYHAt3a1UUrZS?d2c=true',
        3: 'https://whop.com/checkout/plan_anUXlnm6Dlk4L?d2c=true',
        4: 'https://whop.com/checkout/plan_P0Cxwlk89untf?d2c=true',
        5: 'https://whop.com/checkout/plan_uWYjxGuPNVUz5?d2c=true',
        6: 'https://whop.com/checkout/plan_YgIgl07I9KA4b?d2c=true',
        7: 'https://whop.com/checkout/plan_lkxyNkLYHFE0t?d2c=true',
        8: 'https://whop.com/checkout/plan_EwaBlcBhm6u04?d2c=true',
        9: 'https://whop.com/checkout/plan_ZtilA591vTQZn?d2c=true',
        10: 'https://whop.com/checkout/plan_w5gQEk36Kr0xr?d2c=true',
        11: 'https://whop.com/checkout/plan_wWtnU0U6jkqep?d2c=true'
      },
      lifetime: {
        1: 'https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true'
      }
    };

    return urls[planId]?.[accounts] || '#';
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const url = getCheckoutUrl(planId, accounts);
    window.open(url, '_blank');
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic':
        return <span className="text-lg mr-2">🔹</span>;
      case 'premium':
        return <span className="text-lg mr-2">🔸</span>;
      case 'advanced':
        return <span className="text-lg mr-2">🔶</span>;
      default:
        return null;
    }
  };

  // How to Get Started steps
  const getStartedSteps = [
    {
      title: "Select Your Account",
      description: "Choose between demo or live trading. One account is included with your subscription.",
      icon: <Users className="h-5 w-5 md:h-6 md:w-6 text-accent" />
    },
    {
      title: "Set Up Webhooks",
      description: "Connect TradingView or any platform that supports webhooks to trigger your trading strategy.",
      icon: <Zap className="h-5 w-5 md:h-6 md:w-6 text-purple-400" />
    },
    {
      title: "Configure Automation",
      description: "Define your risk parameters, entry/exit rules, and position sizing for automated execution.",
      icon: <Bot className="h-5 w-5 md:h-6 md:w-6 text-emerald-400" />
    },
    {
      title: "Start Trading",
      description: "Your system will now automatically execute trades based on your strategy signals.",
      icon: <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-accent" />
    }
  ];

  return (
    <div className="py-12 md:py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-16">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-accent/10 text-accent mb-3 md:mb-8
                        border border-accent/20 backdrop-blur-sm">
            <Sparkles className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2" />
            <span className="text-sm md:text-base">Flexible Pricing</span>
          </div>
          <h2 className="text-xl md:text-4xl font-bold text-white mb-2 md:mb-4">
            Choose Your <span className="bg-gradient-to-r from-accent via-purple-500 to-accent bg-clip-text text-transparent">Trading Edge</span>
          </h2>
          <p className="text-sm md:text-xl text-gray-400 max-w-3xl mx-auto">
            Select the plan that fits your trading needs and scale as you grow
          </p>
        </div>

        {/* How to Get Started Section */}
        <div className="glass-panel rounded-xl p-3 md:p-8 max-w-4xl mx-auto mb-6 md:mb-16 backdrop-blur-xl border border-accent/20 shadow-lg shadow-accent/5">
          <h3 className="text-base md:text-2xl font-bold text-white mb-3 md:mb-6 text-center">How to Get Started</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {getStartedSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="relative mb-2 md:mb-4">
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-accent/20 to-purple-500/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent flex items-center justify-center text-white font-bold text-xs md:text-sm">
                    {index + 1}
                  </div>
                </div>
                <h4 className="text-sm md:text-lg font-medium text-white mb-1 md:mb-2">{step.title}</h4>
                <p className="text-[10px] md:text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Account Selector */}
        <div className="glass-panel rounded-xl p-3 md:p-6 max-w-xl mx-auto mb-4 md:mb-12 backdrop-blur-xl border border-accent/20 shadow-lg shadow-accent/5">
          <h3 className="text-sm md:text-lg font-medium text-white mb-2 md:mb-4">How many trading accounts do you need?</h3>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 md:gap-4">
            <div className="text-gray-400">
              <span className="text-white font-medium">{accounts}</span> {accounts === 1 ? 'Account' : 'Accounts'}
              <p className="text-[10px] md:text-sm mt-1">Each additional account is $19/month</p>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <button
                onClick={() => setAccounts(Math.max(1, accounts - 1))}
                disabled={accounts <= 1}
                className="p-1 md:p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease accounts"
              >
                <Minus className="h-3.5 w-3.5 md:h-5 md:w-5" />
              </button>
              <span className="text-base md:text-xl font-medium text-white w-5 md:w-8 text-center">{accounts}</span>
              <button
                onClick={() => setAccounts(Math.min(11, accounts + 1))}
                disabled={accounts >= 11}
                className="p-1 md:p-2 text-emerald-400 hover:text-emerald-300 hover:bg-dark-200/50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase accounts"
              >
                <Plus className="h-3.5 w-3.5 md:h-5 md:w-5" />
              </button>
            </div>
          </div>
          <div className="mt-2 md:mt-4 h-1 md:h-2 bg-dark-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all"
              style={{ width: `${(accounts / 11) * 100}%` }}
            />
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
          {plans.map((plan, planIndex) => (
            <div 
              key={plan.id}
              className="relative rounded-xl p-0.5 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Animated border gradient */}
              <div className={`absolute inset-0 rounded-xl ${plan.gradient} opacity-70 hover:opacity-100 transition-opacity blur-[1px]`}></div>
              
              <div className="relative glass-panel rounded-xl p-3 md:p-8 backdrop-blur-xl border border-dark-300/30">
                {plan.popular && (
                  <div className="absolute -top-2 md:-top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-accent to-purple-500 text-white px-2 py-0.5 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-medium shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="flex items-center mb-2 md:mb-4">
                  {getPlanIcon(plan.id)}
                  <h3 className="text-sm md:text-2xl font-bold text-white">{plan.name}</h3>
                </div>

                <div className="mb-2 md:mb-6">
                  <p className="text-[10px] md:text-base text-gray-400">{plan.description}</p>
                </div>

                <div className="flex items-baseline mb-1 md:mb-2">
                  <span className="text-lg md:text-4xl font-bold text-white">
                    ${getAccountPrice(plan.price, accounts)}
                  </span>
                  <span className="text-[10px] md:text-base text-gray-400 ml-1 md:ml-2">/month</span>
                  {accounts > 1 && (
                    <span className="ml-1 md:ml-2 text-[8px] px-1 py-0.5 md:text-xs md:px-2 md:py-1 bg-accent/10 text-accent rounded-full">
                      +{accounts - 1} accounts
                    </span>
                  )}
                </div>
                
                <div className="mb-2 md:mb-6">
                  <div className="text-[10px] md:text-sm text-accent">{plan.webhookCount}</div>
                </div>

                <a
                  href={getCheckoutUrl(plan.id, accounts)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-1.5 md:py-4 rounded-lg transition-all flex items-center justify-center 
                             text-xs md:text-lg font-medium mb-3 md:mb-8 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 text-white shadow-lg shadow-accent/20'
                      : 'border-2 border-accent/30 text-accent hover:bg-accent/10'
                  }`}
                >
                  Get Started
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5" />
                </a>

                <div className="mb-2 md:mb-4">
                  <div className="text-white font-medium text-xs md:text-base">Webhook Type: <span className="text-accent">{plan.webhookType}</span></div>
                </div>

                <div className="space-y-1.5 md:space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div 
                      key={featureIndex} 
                      className={`flex items-start space-x-1.5 md:space-x-3 transition-all duration-300 ${
                        animationIndex === planIndex * 4 + (featureIndex % 4) ? 'scale-105 text-white' : 'text-gray-300'
                      }`}
                    >
                      <div className={`p-0.5 md:p-1 rounded-lg mt-0.5 ${
                        plan.popular ? 'bg-accent/10' : 'bg-dark-200/50'
                      }`}>
                        <Check className={`h-2.5 w-2.5 md:h-4 md:w-4 ${
                          plan.popular ? 'text-accent' : 'text-emerald-400'
                        }`} />
                      </div>
                      <span className="text-[10px] md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lifetime Plan */}
        <div className="mt-6 md:mt-16 relative rounded-xl p-0.5 max-w-3xl mx-auto transform hover:scale-[1.02] transition-all duration-500">
          {/* Animated border gradient */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-500/30 via-red-600/20 to-red-500/30 opacity-70 hover:opacity-100 transition-opacity blur-[1px]"></div>
          
          <div className="relative glass-panel rounded-xl p-3 md:p-8 backdrop-blur-xl border border-dark-300/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-8">
              <div>
                <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-1 md:mb-2">
                  <span className="text-base md:text-lg">🏆</span>
                  <div className="px-2 py-0.5 md:px-3 md:py-1 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 rounded-full text-xs md:text-sm font-medium">
                    Limited Time Offer
                  </div>
                  <Tooltip content="This offer is only available for a limited time">
                    <HelpCircle className="h-3 w-3 md:h-4 md:w-4 text-red-400" />
                  </Tooltip>
                </div>
                <h3 className="text-base md:text-2xl font-bold text-white mb-1 md:mb-2">Lifetime Access</h3>
                <p className="text-[10px] md:text-base text-gray-400 mb-2 md:mb-6">Unlimited accounts and features forever with a one-time payment</p>
                <div className="flex items-baseline">
                  <span className="text-lg md:text-4xl font-bold text-white">$2,999</span>
                  <span className="text-[10px] md:text-base text-gray-400 ml-1 md:ml-2">one-time</span>
                </div>
                <p className="text-[10px] md:text-sm text-red-400 mt-1 md:mt-2">COPY TRADING COMING SOON</p>
              </div>
              <div>
                <a
                  href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="premium-button bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-3 md:px-6 py-1.5 md:py-3 text-xs md:text-lg flex items-center whitespace-nowrap shadow-lg shadow-red-500/20"
                >
                  Get Lifetime Access
                  <ArrowRight className="ml-1 md:ml-2 h-3 w-3 md:h-5 md:w-5" />
                </a>
                <p className="text-[10px] md:text-sm text-gray-500 mt-1 md:mt-2 text-center">
                  Lock in this special rate before it's gone
                </p>
              </div>
            </div>
            
            <div className="mt-3 pt-3 md:mt-6 md:pt-6 border-t border-dark-300/30">
              <h4 className="text-sm md:text-lg font-medium text-white mb-2 md:mb-4">Lifetime Plan Includes:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-4">
                {[
                  "Unlimited Webhooks (Basic, Premium, Advanced)",
                  "Unlimited Hankox ActTrader Accounts",
                  "$4.99 per extra trading account",
                  "Access to all future features & automations",
                  "Best for power users, signal providers, or businesses",
                  "Priority support and feature requests"
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start space-x-1.5 md:space-x-3 transition-all duration-300 ${
                      animationIndex === index % 4 ? 'scale-105 text-white' : 'text-gray-300'
                    }`}
                  >
                    <div className="p-0.5 md:p-1 rounded-lg bg-red-500/10 mt-0.5">
                      <Check className="h-2.5 w-2.5 md:h-4 md:w-4 text-red-400" />
                    </div>
                    <span className="text-[10px] md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Supported Platforms */}
        <div className="mt-6 md:mt-16">
          <h3 className="text-base md:text-xl font-medium text-white text-center mb-3 md:mb-8">Supported Platforms</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mb-4 md:mb-8">
            {supportedPlatforms.map((platform, index) => (
              <div 
                key={index} 
                className="glass-panel rounded-xl p-2 md:p-4 text-center transform hover:scale-105 transition-all duration-300 border border-dark-300/30 hover:border-accent/30"
              >
                <div className="text-xl md:text-3xl mb-1 md:mb-2">{platform.icon}</div>
                <h4 className="text-xs md:text-base text-white font-medium mb-0.5 md:mb-1">{platform.name}</h4>
                <p className="text-[10px] md:text-sm text-gray-400">{platform.description}</p>
              </div>
            ))}
          </div>
          
          <div className="glass-panel rounded-xl p-2 md:p-6 backdrop-blur-xl border border-dark-300/30">
            <h4 className="text-sm md:text-lg font-medium text-white mb-2 md:mb-4">Upcoming Platform Integrations</h4>
            <div className="flex flex-wrap gap-1.5 md:gap-4">
              {upcomingPlatforms.map((platform, index) => (
                <div key={index} className="flex items-center space-x-1 md:space-x-2 px-1.5 py-1 md:px-3 md:py-2 bg-dark-200/30 rounded-lg border border-dark-300/30 hover:border-accent/30 transition-all duration-300">
                  <span className="text-sm md:text-xl">{platform.icon}</span>
                  <span className="text-[10px] md:text-sm text-gray-300">{platform.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Money-back Guarantee */}
        <div className="mt-6 md:mt-12 text-center">
          <div className="inline-flex items-center space-x-1 md:space-x-2 text-gray-400 bg-dark-200/30 px-2 py-1 md:px-4 md:py-2 rounded-full text-[10px] md:text-sm">
            <Shield className="h-3 w-3 md:h-5 md:w-5 text-accent" />
            <span>14-day money-back guarantee • Cancel anytime • No questions asked</span>
          </div>
        </div>
      </div>
    </div>
  );
}