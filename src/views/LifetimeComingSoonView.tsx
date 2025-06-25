import React, { useState } from 'react';
import { Crown, ArrowRight, Check, X, ChevronDown, ChevronUp, Shield, Clock, Zap, DollarSign, Users, Globe, MessageCircle, ExternalLink, AlertTriangle, CheckCircle2, Star, Gift, Rocket, CloudLightning as Lightning, Sparkles } from 'lucide-react';
import Footer from '../components/landing/Footer';

export default function LifetimeComingSoonView() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [email, setEmail] = useState('');

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const features = [
    {
      title: "Unlimited Webhooks",
      description: "Create as many webhooks as you need with no monthly limits",
      icon: <Zap className="h-6 w-6 text-red-400" />
    },
    {
      title: "Unlimited Hankox Accounts",
      description: "Connect unlimited Hankox ActTrader accounts with your lifetime subscription",
      icon: <Users className="h-6 w-6 text-red-400" />
    },
    {
      title: "Extra Trading Accounts",
      description: "Add additional trading accounts for just $4.99 each",
      icon: <DollarSign className="h-6 w-6 text-red-400" />
    },
    {
      title: "Future-Proof Access",
      description: "Get all future features and updates at no additional cost",
      icon: <Shield className="h-6 w-6 text-red-400" />
    }
  ];

  const supportedPlatforms = [
    { 
      name: "Hankox ActTrader", 
      icon: "💹", 
      description: "Premium multi-broker solution with unlimited accounts",
      link: "https://hankox.com",
      featured: true
    },
    { 
      name: "TradingView", 
      icon: "📊", 
      description: "Seamless TradingView webhook integration",
      link: "https://www.tradingview.com"
    },
    { 
      name: "MetaTrader 4 & 5", 
      icon: "📈", 
      description: "Industry standard MT4/MT5 platforms",
      link: "https://www.metatrader4.com"
    },
    { 
      name: "TradeLocker", 
      icon: "🔒", 
      description: "Professional trading platform integration",
      link: "https://tradelocker.com"
    }
  ];

  const faqs = [
    {
      question: "What's included in the Lifetime Access?",
      answer: "Lifetime Access includes unlimited webhooks, unlimited Hankox ActTrader accounts, all future features and updates, priority support, and extra trading accounts for just $4.99 each. You'll never pay a monthly fee again."
    },
    {
      question: "How do I set up Hankox ActTrader accounts?",
      answer: "After purchasing Lifetime Access, you'll receive instructions to create your Hankox ActTrader accounts through our affiliate link. The process takes just minutes, and you can create as many accounts as you need with no additional monthly fees."
    },
    {
      question: "Is there a limit to how many Hankox accounts I can connect?",
      answer: "No, with Lifetime Access you can connect unlimited Hankox ActTrader accounts at no additional cost. This is exclusive to our Lifetime members."
    },
    {
      question: "When will Copy Trading be available?",
      answer: "Copy Trading is currently in development and will be available soon. As a Lifetime Access member, you'll be among the first to get access when it launches, at no additional cost."
    },
    {
      question: "What platforms are supported?",
      answer: "We support Hankox ActTrader (unlimited accounts), TradingView, MetaTrader 4 & 5, TradeLocker, and more platforms are being added regularly. All future platform integrations will be included in your Lifetime Access."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "Yes, we offer a 14-day money-back guarantee. If you're not completely satisfied with your purchase, contact our support team within 14 days for a full refund."
    }
  ];

  const comparisonItems = [
    {
      feature: "Webhooks",
      monthly: "Limited (1-10)",
      lifetime: "Unlimited"
    },
    {
      feature: "Hankox ActTrader Accounts",
      monthly: "Limited (1-3)",
      lifetime: "Unlimited"
    },
    {
      feature: "Extra Trading Accounts",
      monthly: "$19/month each",
      lifetime: "$4.99 one-time each"
    },
    {
      feature: "Copy Trading (Coming Soon)",
      monthly: "Additional fee",
      lifetime: "Included"
    },
    {
      feature: "Future Updates",
      monthly: "May require plan upgrade",
      lifetime: "All included"
    },
    {
      feature: "Priority Support",
      monthly: "Basic & Premium only",
      lifetime: "Included"
    },
    {
      feature: "Total Cost (5 years)",
      monthly: "$3,540 - $5,940",
      lifetime: "$2,999 (one-time)"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-100">
      {/* Hero Section */}
      <div className="relative py-12 md:py-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark/95 via-dark/80 to-dark"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.15),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(239,68,68,0.15),transparent_50%)]"></div>
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[128px] animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-red-500/20 rounded-full blur-[128px] animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/10 text-red-400 mb-4 md:mb-6
                        border border-red-500/20 backdrop-blur-sm animate-fade-in-up">
            <Rocket className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
            <span className="text-xs md:text-base">Early Access Launch</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent animate-gradient-x">
              Lifetime Access
            </span>{" "}
            <span className="block mt-2">Available Now</span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            One-time payment. Unlimited webhooks. Unlimited Hankox ActTrader accounts.
            <span className="block mt-2 text-red-400 font-semibold">Copy trading coming soon!</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 md:mb-12 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <a 
              href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                       flex items-center justify-center space-x-2 transition-all duration-300
                       transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-500/20 text-base md:text-lg font-medium"
            >
              <span>Get Lifetime Access Now</span>
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 transform group-hover:translate-x-1 transition-transform" />
            </a>
            
            <div className="flex items-center space-x-2 text-gray-400 text-sm md:text-base">
              <Clock className="h-4 w-4 md:h-5 md:w-5" />
              <span>Limited time offer</span>
            </div>
          </div>

          {/* Price Tag */}
          <div className="inline-block bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-xl p-1 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
            <div className="bg-dark-100/80 rounded-lg px-6 py-4 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-3">
                <div className="text-3xl md:text-4xl font-bold text-white">$2,999</div>
                <div className="flex flex-col items-start">
                  <span className="text-sm md:text-base text-gray-400">one-time payment</span>
                  <div className="flex items-center">
                    <span className="text-sm md:text-base text-gray-400 line-through mr-2">$5,000</span>
                    <span className="text-sm md:text-base text-red-400">Save $2,001</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Early Access Banner */}
      <div className="relative py-6 bg-gradient-to-r from-red-600/20 to-red-500/10 border-y border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Lightning className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white">Early Access Launch Special</h3>
                <p className="text-sm md:text-base text-gray-300">
                  <span className="text-red-400 font-semibold">$2,001 discount</span> for early adopters - Regular price: $5,000
                </p>
              </div>
            </div>
            <a 
              href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                       flex items-center justify-center space-x-2 transition-all duration-300 text-base font-medium"
            >
              <span>Claim Early Access Discount</span>
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Hankox ActTrader Integration Section */}
      <div className="py-12 md:py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/10 text-red-400 mb-4 md:mb-6
                          border border-red-500/20 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
              <span className="text-xs md:text-base">Exclusive Partnership</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Unlimited <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">Hankox ActTrader</span> Accounts
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
              Connect as many Hankox ActTrader accounts as you want with no additional monthly fees
            </p>
          </div>

          <div className="glass-panel rounded-xl p-6 md:p-8 border-2 border-red-500/20 mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="p-4 bg-red-500/10 rounded-xl">
                <span className="text-4xl md:text-6xl">💹</span>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-4">
                  Hankox ActTrader Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Multi-broker support in one platform",
                    "Advanced charting and analysis tools",
                    "Ultra-fast execution speeds",
                    "Institutional-grade security",
                    "Seamless webhook integration",
                    "Professional risk management",
                    "Customizable trading interface",
                    "Mobile trading capabilities"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <span className="text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 md:mt-8">
                  <a 
                    href="https://hankox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                             transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg hover:shadow-red-500/20"
                  >
                    Create Hankox Account
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="glass-panel rounded-xl p-4 md:p-6 border-2 border-red-500/20 bg-gradient-to-r from-red-500/10 to-red-600/5 mb-8 md:mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">Ready to get unlimited Hankox accounts?</h3>
                <p className="text-sm md:text-base text-gray-300">
                  Get lifetime access now and connect as many accounts as you need
                </p>
              </div>
              <a 
                href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                         flex items-center justify-center space-x-2 transition-all duration-300 text-base font-medium"
              >
                <span>Get Lifetime Access</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              What's Included in <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">Lifetime Access</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need for automated trading success, forever
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-panel rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-red-500/5 border border-dark-300/30 hover:border-red-500/20"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile-Friendly CTA Button */}
          <div className="mt-8 md:mt-12 text-center">
            <a 
              href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                       transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-500/20 text-lg font-medium"
            >
              Get Lifetime Access Now
            </a>
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
                <span>One-time payment</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
                <span>Unlimited access</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <CheckCircle2 className="h-4 w-4 text-red-400" />
                <span>No monthly fees</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price Comparison Banner */}
      <div className="py-8 bg-gradient-to-r from-red-600/20 to-red-500/10 border-y border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Early Access Pricing</h3>
              <div className="flex flex-col md:flex-row items-center md:items-baseline gap-2 md:gap-4">
                <div className="flex items-center">
                  <span className="text-3xl md:text-4xl font-bold text-white">$2,999</span>
                  <span className="text-gray-400 ml-2">one-time</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xl text-gray-400 line-through">$5,000</span>
                  <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-400 rounded-full text-sm">Save $2,001</span>
                </div>
              </div>
            </div>
            <a 
              href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                       flex items-center justify-center space-x-2 transition-all duration-300 text-base font-medium"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              <span>Claim Early Access Price</span>
            </a>
          </div>
        </div>
      </div>

      {/* Supported Platforms Section */}
      <div className="py-12 md:py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/10 text-red-400 mb-4 md:mb-6
                          border border-red-500/20 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
              <span className="text-xs md:text-base">Multi-Platform Support</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Supported Trading Platforms
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
              Connect all your favorite trading platforms with one lifetime subscription
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {supportedPlatforms.map((platform, index) => (
              <a 
                key={index}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass-panel rounded-xl p-6 text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border ${
                  platform.featured 
                    ? 'border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent' 
                    : 'border-dark-300/30 hover:border-red-500/20'
                }`}
              >
                <div className="text-4xl mb-4">{platform.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {platform.name}
                  {platform.featured && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400">
                      Featured
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 text-sm mb-4">{platform.description}</p>
                <div className="flex items-center justify-center text-red-400 text-sm">
                  <span>Learn more</span>
                  <ExternalLink className="h-4 w-4 ml-1" />
                </div>
              </a>
            ))}
          </div>

          {/* Coming Soon Platforms */}
          <div className="mt-8 md:mt-12">
            <h3 className="text-lg font-medium text-white text-center mb-4">Coming Soon</h3>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
              {['TradeStation', 'NinjaTrader', 'cTrader', 'Coinbase', 'Binance', 'Interactive Brokers'].map((platform) => (
                <div key={platform} className="px-3 py-2 bg-dark-200/50 text-gray-300 rounded-lg border border-dark-300/30">
                  {platform}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="py-12 md:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Why Choose <span className="bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent">Lifetime Access</span>
            </h2>
            <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto">
              Compare lifetime access to monthly subscriptions
            </p>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-max">
              <div className="glass-panel rounded-xl p-4 md:p-6 border border-dark-300/30">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-300/30">
                      <th className="text-left py-4 px-4 text-gray-400">Feature</th>
                      <th className="text-center py-4 px-4 text-gray-400">Monthly Plans</th>
                      <th className="text-center py-4 px-4 text-red-400 bg-red-500/5 rounded-t-lg">Lifetime Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonItems.map((item, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-dark-300/30 ${
                          index === comparisonItems.length - 1 ? 'border-b-0' : ''
                        }`}
                      >
                        <td className="py-4 px-4 text-white">{item.feature}</td>
                        <td className="py-4 px-4 text-center text-gray-300">{item.monthly}</td>
                        <td className="py-4 px-4 text-center text-white bg-red-500/5">
                          <div className="flex items-center justify-center">
                            {item.lifetime}
                            {item.feature.includes("Unlimited") && (
                              <CheckCircle2 className="h-4 w-4 text-red-400 ml-2" />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Mobile-Friendly CTA Button */}
          <div className="mt-8 md:mt-12 text-center">
            <a 
              href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                       transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-500/20 text-lg font-medium"
            >
              Secure Your Lifetime Access
            </a>
            <div className="mt-3 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-gray-400">
                <Star className="h-4 w-4 text-red-400" />
                <span>Early access price: $2,999</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4 text-red-400" />
                <span>Regular price: $5,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-12 md:py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-red-500/10 text-red-400 mb-4 md:mb-6
                          border border-red-500/20 backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1.5 md:mr-2" />
              <span className="text-xs md:text-base">Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Got Questions?
            </h2>
            <p className="text-base md:text-xl text-gray-400">
              We've got answers to help you decide
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="glass-panel rounded-xl overflow-hidden transition-all duration-300 border border-dark-300/30 hover:border-red-500/20"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 md:p-6 text-left"
                  aria-expanded={expandedFaq === index}
                >
                  <span className="text-sm md:text-lg font-medium text-white">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-red-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    expandedFaq === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="p-4 md:p-6 pt-0 text-gray-400 border-t border-dark-300/30">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-8 md:mt-12 text-center">
            <p className="text-gray-400 mb-4">
              Still have questions? We're here to help!
            </p>
            <a 
              href="https://discord.gg/RU5t7ErGEE" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border-2 border-red-500/30 text-red-400 rounded-xl
                       hover:bg-red-500/10 transition-all duration-300 text-base font-medium"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-100/10 to-dark/80 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.15),transparent_50%)] z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(239,68,68,0.15),transparent_50%)] z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel rounded-xl p-6 md:p-8 border-2 border-red-500/20 bg-gradient-to-br from-red-500/10 to-transparent">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
              <div className="p-4 bg-red-500/10 rounded-xl">
                <Crown className="h-12 w-12 md:h-16 md:w-16 text-red-400" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4">
                  Ready to Upgrade Your Trading?
                </h3>
                <p className="text-gray-300 mb-6 md:mb-8 text-base md:text-lg">
                  Join thousands of traders who've already secured their lifetime access. 
                  Get unlimited webhooks, unlimited Hankox ActTrader accounts, and all future features with a one-time payment.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a 
                    href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                             flex items-center justify-center space-x-2 transition-all duration-300 text-lg font-medium"
                  >
                    <span>Get Lifetime Access - $2,999</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Shield className="h-5 w-5 text-red-400" />
                    <span>14-day money-back guarantee</span>
                  </div>
                </div>

                <div className="mt-4 text-sm text-gray-400">
                  <span className="text-red-400 font-medium">Early Access Price:</span> $2,999 (Regular price: $5,000)
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "Best investment I've made for my trading. The unlimited Hankox accounts alone are worth the price.",
                author: "Michael T.",
                role: "Forex Trader"
              },
              {
                quote: "I was paying $99/month before. Lifetime access paid for itself in less than 3 years.",
                author: "Sarah K.",
                role: "Crypto Trader"
              },
              {
                quote: "The webhook automation is incredible. I've connected 8 Hankox accounts with no extra fees.",
                author: "David L.",
                role: "Professional Trader"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="glass-panel rounded-xl p-6 border border-dark-300/30 hover:border-red-500/20 transition-all duration-300"
              >
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Mobile CTA */}
          <div className="mt-12 text-center">
            <div className="glass-panel rounded-xl p-6 border-2 border-red-500/20 bg-gradient-to-r from-red-500/10 to-transparent">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Limited Time Early Access Offer</h3>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="text-2xl md:text-3xl font-bold text-white">$2,999</div>
                <div className="flex flex-col items-start">
                  <span className="text-gray-400 line-through">$5,000</span>
                  <span className="text-red-400">Save $2,001</span>
                </div>
              </div>
              <a 
                href="https://whop.com/checkout/plan_XaBoejo6aoldz/?d2c=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl
                         transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl hover:shadow-red-500/20 text-lg font-medium"
              >
                Get Lifetime Access Now
              </a>
              <p className="text-gray-400 mt-3 text-sm">
                Limited time offer • One-time payment • Lifetime benefits
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Email Signup Section */}
      <div className="py-12 md:py-20 relative overflow-hidden bg-dark-100/30 border-y border-dark-300/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="glass-panel rounded-xl p-6 md:p-8 border border-dark-300/30">
            <div className="text-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                Not Ready Yet? Stay Updated
              </h3>
              <p className="text-gray-400">
                Join our newsletter to get notified about future offers and updates
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 bg-dark-200/50 text-white rounded-lg px-4 py-3
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-red-500/50"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg
                           transition-all duration-300 text-base font-medium"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>

            {showSuccessMessage && (
              <div className="mt-4 p-3 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                <span>Thank you! You've been added to our newsletter.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="py-8 bg-dark-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="text-gray-400 text-sm md:text-base">
              <span className="text-yellow-400 font-medium">Risk Warning:</span> Trading involves significant risk of loss and is not suitable for all investors. 
              Past performance is not indicative of future results.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}