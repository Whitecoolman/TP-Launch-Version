import React, { useState, useEffect } from 'react';
import { X, HelpCircle, AlertTriangle, Loader, Check, Globe, Briefcase, Shield, Lock } from 'lucide-react';
import { useCreateMetaAccount } from '../../hooks/useMetaAccount';
import Tooltip from '../ui/Tooltip';

interface AddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedBroker?: string | null;
  onSuccess?: () => void;
}

interface FormErrors {
  broker?: string;
  server?: string;
  login?: string;
  password?: string;
  name?: string;
  general?: string;
}

const commonServers = [
  { name: 'Fyntura MT5', server: 'Fyntura-Demo', broker: 'Fyntura' },
  { name: 'IC Markets MT4', server: 'ICMarkets-Live1', broker: 'IC Markets' },
  { name: 'IC Markets MT5', server: 'ICMarkets-Live5', broker: 'IC Markets' },
  { name: 'Pepperstone MT4', server: 'Pepperstone-Live1', broker: 'Pepperstone' },
  { name: 'Pepperstone MT5', server: 'Pepperstone-Live5', broker: 'Pepperstone' }
];

type AccountType = 'metatrader' | 'hankox' | 'tradelocker' | 'binance';

interface AccountTypeOption {
  id: AccountType;
  name: string;
  description: string;
  icon: React.ReactNode;
  platforms?: string[];
  color: string;
  comingSoon?: boolean;
}

export default function AddAccountModal({ isOpen, onClose, selectedBroker, onSuccess }: AddAccountModalProps) {
  const [accountType, setAccountType] = useState<AccountType>('metatrader');
  const [platform, setPlatform] = useState<'mt4' | 'mt5'>('mt5');
  const [broker, setBroker] = useState('Fyntura');
  const [server, setServer] = useState('Fyntura-Demo');
  const [login, setLogin] = useState('313902');
  const [password, setPassword] = useState('dKbqXqU835Sz5Zb');
  const [name, setName] = useState('Fyntura Demo');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);
  const [showCommonServers, setShowCommonServers] = useState(false);

  const createAccount = useCreateMetaAccount();

  useEffect(() => {
    if (selectedBroker) {
      const brokerServer = commonServers.find(s => s.broker.toLowerCase() === selectedBroker.toLowerCase());
      if (brokerServer) {
        setBroker(brokerServer.broker);
        setServer(brokerServer.server);
        setPlatform(brokerServer.server.includes('MT5') ? 'mt5' : 'mt4');
        setName(`${brokerServer.broker} ${platform.toUpperCase()}`);
      }
    }
  }, [selectedBroker]);

  if (!isOpen) return null;

  const accountTypeOptions: AccountTypeOption[] = [
    {
      id: 'metatrader',
      name: 'MetaTrader',
      description: 'Connect MT4 or MT5 accounts',
      icon: <Globe className="h-6 w-6" />,
      platforms: ['MT4', 'MT5'],
      color: 'from-blue-500/20 to-blue-600/5'
    },
    {
      id: 'hankox',
      name: 'Hankox ActTrader',
      description: 'Multi-broker trading platform',
      icon: <Briefcase className="h-6 w-6" />,
      color: 'from-yellow-500/20 to-yellow-600/5'
    },
    {
      id: 'tradelocker',
      name: 'TradeLocker',
      description: 'Professional trading platform',
      icon: <Shield className="h-6 w-6" />,
      color: 'from-emerald-500/20 to-emerald-600/5',
      comingSoon: true
    },
    {
      id: 'binance',
      name: 'Binance',
      description: 'Crypto exchange platform',
      icon: <Lock className="h-6 w-6" />,
      color: 'from-orange-500/20 to-orange-600/5',
      comingSoon: true
    }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!broker.trim()) {
      newErrors.broker = 'Broker name is required';
    }

    if (!server.trim()) {
      newErrors.server = 'Server address is required';
    }

    if (!login.trim()) {
      newErrors.login = 'Login number is required';
    } else if (!/^\d+$/.test(login)) {
      newErrors.login = 'Login must be a number';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!name.trim()) {
      newErrors.name = 'Account name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsConnecting(true);
    setErrors({});

    try {
      await createAccount.mutateAsync({
        name,
        login,
        password,
        server: server.trim(),
        platform,
        broker: broker.trim()
      });
      
      setConnectionSuccess(true);
      setTimeout(() => {
        onClose();
        onSuccess?.();
        // Reset form
        setBroker('');
        setServer('');
        setLogin('');
        setPassword('');
        setName('');
        setConnectionSuccess(false);
      }, 1500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to broker';
      setErrors({
        general: errorMessage
      });
      setIsConnecting(false);
    }
  };

  const selectCommonServer = (serverInfo: { name: string; server: string; broker: string }) => {
    setBroker(serverInfo.broker);
    setServer(serverInfo.server);
    setPlatform(serverInfo.name.includes('MT5') ? 'mt5' : 'mt4');
    setShowCommonServers(false);
  };

  const isFormValid = broker && server && login && password && name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
        <div className="relative p-6 border-b border-dark-300/50">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                     hover:bg-dark-200/50 rounded-lg transition-all duration-300"
          >
            <X className="h-5 w-5" />
          </button>
          
          <h3 className="text-xl font-medium text-white tracking-tight">Add Trading Account</h3>
          <p className="text-gray-400 mt-1">Connect your trading account to start automated trading</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Account Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              Account Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {accountTypeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => !option.comingSoon && setAccountType(option.id)}
                  disabled={option.comingSoon}
                  className={`relative flex items-start p-3 rounded-xl border transition-all ${
                    accountType === option.id 
                      ? 'border-accent bg-accent/10' 
                      : 'border-dark-300/30 bg-dark-200/30 hover:bg-dark-200/50'
                  } ${option.comingSoon ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${option.color} mr-3 mt-0.5`}>
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h4 className="text-white font-medium">{option.name}</h4>
                      {option.comingSoon && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-dark-300/50 text-gray-400 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{option.description}</p>
                    {option.platforms && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {option.platforms.map(platform => (
                          <span key={platform} className="px-2 py-0.5 text-xs bg-dark-300/50 text-gray-300 rounded-full">
                            {platform}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {accountType === 'metatrader' && (
            <>
              {/* Platform Selection */}
              <div className="flex rounded-lg bg-dark-200/30 p-1">
                <button
                  onClick={() => setPlatform('mt4')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    platform === 'mt4' 
                      ? 'bg-accent text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  MetaTrader 4
                </button>
                <button
                  onClick={() => setPlatform('mt5')}
                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    platform === 'mt5' 
                      ? 'bg-accent text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  MetaTrader 5
                </button>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Broker Name</span>
                    <Tooltip content="Enter your broker's name (e.g., IC Markets, Pepperstone)">
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={broker}
                    onChange={(e) => setBroker(e.target.value)}
                    placeholder="e.g., IC Markets"
                    className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border focus:outline-none focus:ring-1 transition-colors
                             ${errors.broker 
                               ? 'border-red-500 focus:ring-red-500/50' 
                               : 'border-dark-300/50 focus:ring-accent/50'
                             }`}
                  />
                  {errors.broker && (
                    <p className="text-red-400 text-sm mt-1">{errors.broker}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="flex items-center space-x-2 text-sm text-gray-400">
                      <span>Server</span>
                      <Tooltip content="Enter your broker's server address (found in MT4/MT5 login window)">
                        <HelpCircle className="h-4 w-4" />
                      </Tooltip>
                    </label>
                    <button
                      onClick={() => setShowCommonServers(!showCommonServers)}
                      className="text-sm text-accent hover:text-accent-dark"
                    >
                      Common Servers
                    </button>
                  </div>
                  <input
                    type="text"
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    placeholder="e.g., ICMarkets-Live01"
                    className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border focus:outline-none focus:ring-1 transition-colors
                             ${errors.server 
                               ? 'border-red-500 focus:ring-red-500/50' 
                               : 'border-dark-300/50 focus:ring-accent/50'
                             }`}
                  />
                  {errors.server && (
                    <p className="text-red-400 text-sm mt-1">{errors.server}</p>
                  )}
                  
                  {showCommonServers && (
                    <div className="mt-2 glass-panel rounded-lg p-2 border border-dark-300/30">
                      <div className="text-sm text-gray-400 mb-2">Common Servers:</div>
                      <div className="space-y-1">
                        {commonServers.map((serverInfo) => (
                          <button
                            key={serverInfo.server}
                            onClick={() => selectCommonServer(serverInfo)}
                            className="w-full text-left px-3 py-2 text-sm text-gray-300 
                                     hover:bg-dark-200/50 rounded-lg transition-colors"
                          >
                            {serverInfo.name} - {serverInfo.server}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Login</span>
                    <Tooltip content="Your MT4/MT5 account login number">
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="12345678"
                    className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border focus:outline-none focus:ring-1 transition-colors
                             ${errors.login 
                               ? 'border-red-500 focus:ring-red-500/50' 
                               : 'border-dark-300/50 focus:ring-accent/50'
                             }`}
                  />
                  {errors.login && (
                    <p className="text-red-400 text-sm mt-1">{errors.login}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Password</span>
                    <Tooltip content="Your MT4/MT5 account password">
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border focus:outline-none focus:ring-1 transition-colors
                             ${errors.password 
                               ? 'border-red-500 focus:ring-red-500/50' 
                               : 'border-dark-300/50 focus:ring-accent/50'
                             }`}
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-sm text-gray-400 mb-2">
                    <span>Account Name</span>
                    <Tooltip content="A friendly name to identify this account">
                      <HelpCircle className="h-4 w-4" />
                    </Tooltip>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., IC Markets Main"
                    className={`w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border focus:outline-none focus:ring-1 transition-colors
                             ${errors.name 
                               ? 'border-red-500 focus:ring-red-500/50' 
                               : 'border-dark-300/50 focus:ring-accent/50'
                             }`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
              </div>
            </>
          )}

          {accountType === 'hankox' && (
            <div className="glass-panel rounded-xl p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Briefcase className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Hankox ActTrader</h3>
                  <p className="text-sm text-gray-300">Professional multi-broker trading solution</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                Hankox ActTrader provides a professional trading environment with access to multiple brokers through a single platform.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Multi-broker support in one platform</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Advanced charting and analysis tools</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Seamless webhook integration</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">Institutional-grade security</span>
                </div>
              </div>
              
              <a 
                href="https://hankox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg py-3 text-center flex items-center justify-center"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Create Hankox Account
              </a>
            </div>
          )}

          {(accountType === 'tradelocker' || accountType === 'binance') && (
            <div className="glass-panel rounded-xl p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                  {accountType === 'tradelocker' ? (
                    <Shield className="h-6 w-6 text-emerald-400" />
                  ) : (
                    <Lock className="h-6 w-6 text-orange-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {accountType === 'tradelocker' ? 'TradeLocker' : 'Binance'} Integration
                  </h3>
                  <div className="flex items-center mt-1">
                    <span className="px-2 py-0.5 text-xs bg-accent/20 text-accent rounded-full">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                {accountType === 'tradelocker'
                  ? 'TradeLocker integration is coming soon! You\'ll be able to connect your TradeLocker account for automated trading with our platform.'
                  : 'Binance integration is coming soon! You\'ll be able to connect your Binance account for automated crypto trading with our platform.'
                }
              </p>
              
              <div className="flex justify-center">
                <button className="px-4 py-2 border border-accent/30 text-accent rounded-lg hover:bg-accent/10 transition-all">
                  Get Notified When Available
                </button>
              </div>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="bg-red-500/10 text-red-400 rounded-lg p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Connection Failed</p>
                <p className="text-sm mt-1">{errors.general}</p>
              </div>
            </div>
          )}

          {/* Warning */}
          {accountType === 'metatrader' && (
            <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm text-gray-300">
                  Make sure you're using an Investor Password if you only want to monitor the account.
                </p>
                <p className="text-sm text-gray-400">
                  Using the Master Password will allow full trading access.
                </p>
              </div>
            </div>
          )}

          {/* Hankox Banner */}
          {accountType === 'metatrader' && (
            <div className="glass-panel rounded-xl p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Briefcase className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Try Hankox ActTrader</h3>
                    <p className="text-sm text-gray-300">
                      Professional multi-broker solution with unlimited accounts
                    </p>
                  </div>
                </div>
                <a 
                  href="https://hankox.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white rounded-lg text-sm flex items-center whitespace-nowrap"
                >
                  Learn More
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSubmit}
              disabled={isConnecting || !isFormValid || connectionSuccess || accountType !== 'metatrader'}
              className={`premium-button flex-1 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed
                       ${connectionSuccess ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
            >
              {isConnecting ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : connectionSuccess ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Connected!
                </>
              ) : (
                'Connect Account'
              )}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                       rounded-lg hover:bg-dark-200/50 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}