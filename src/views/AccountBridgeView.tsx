import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, RefreshCw, Settings, Trash2, ExternalLink, 
  AlertTriangle, CheckCircle2, Eye, EyeOff, MoreVertical, 
  Clock, Shield, Zap, DollarSign, ArrowRightLeft, Wallet, 
  Plus, X, Filter, Search, ChevronDown, Info, HelpCircle,
  Users, Globe, Lock, Coins, Target, Activity, BarChart2
} from 'lucide-react';
import { useMetaAccounts } from '../hooks/useMetaAccount';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';

interface BridgeAccount {
  id: string;
  name: string;
  platform: 'mt4' | 'mt5' | 'hankox' | 'tradelocker' | 'binance';
  broker: string;
  accountId: string;
  balance: number;
  equity?: number;
  type: 'demo' | 'live';
  status: 'connected' | 'disconnected' | 'connecting';
  lastSync?: string;
}

interface BridgeMapping {
  id: string;
  sourceId: string;
  targetId: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  syncMode: 'one-way' | 'two-way';
  positionSizing: 'fixed' | 'percentage' | 'risk-based';
  positionValue: number;
  createdAt: string;
  lastSync?: string;
  error?: string;
}

export default function AccountBridgeView() {
  const [user] = useAtom(userAtom);
  const { data: metaAccounts = [] } = useMetaAccounts();
  const [accounts, setAccounts] = useState<BridgeAccount[]>([]);
  const [mappings, setMappings] = useState<BridgeMapping[]>([]);
  const [showAddMapping, setShowAddMapping] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState<BridgeMapping | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState<{id: string, name: string} | null>(null);

  // Form state for adding new mapping
  const [newMapping, setNewMapping] = useState({
    sourceId: '',
    targetId: '',
    name: '',
    syncMode: 'one-way' as 'one-way' | 'two-way',
    positionSizing: 'percentage' as 'fixed' | 'percentage' | 'risk-based',
    positionValue: 100
  });

  // Load accounts from different platforms
  useEffect(() => {
    // Convert MetaTrader accounts to BridgeAccount format
    const metaTraderAccounts: BridgeAccount[] = metaAccounts.map(account => ({
      id: account.id,
      name: account.name,
      platform: account.platform,
      broker: account.server,
      accountId: account.login,
      balance: account.balance,
      equity: account.equity,
      type: account.type,
      status: account.connectionStatus,
      lastSync: new Date().toLocaleString()
    }));

    // Mock Hankox accounts
    const hankoxAccounts: BridgeAccount[] = [
      {
        id: 'hankox-1',
        name: 'Hankox Demo',
        platform: 'hankox',
        broker: 'Fyntura',
        accountId: '517244-1',
        balance: 10000.00,
        equity: 10235.50,
        type: 'demo',
        status: 'connected',
        lastSync: new Date().toLocaleString()
      }
    ];

    // Mock TradeLocker accounts
    const tradeLockerAccounts: BridgeAccount[] = [
      {
        id: 'tradelocker-1',
        name: 'TradeLocker Demo',
        platform: 'tradelocker',
        broker: 'HEROFX',
        accountId: '517244-1',
        balance: 17.71,
        type: 'demo',
        status: 'connected',
        lastSync: new Date().toLocaleString()
      }
    ];

    // Combine all accounts
    setAccounts([...metaTraderAccounts, ...hankoxAccounts, ...tradeLockerAccounts]);

    // Mock mappings
    if (mappings.length === 0) {
      setMappings([
        {
          id: 'mapping-1',
          sourceId: 'hankox-1',
          targetId: 'tradelocker-1',
          name: 'Hankox to TradeLocker',
          status: 'active',
          syncMode: 'one-way',
          positionSizing: 'percentage',
          positionValue: 100,
          createdAt: '2023-12-01T12:00:00Z',
          lastSync: new Date().toLocaleString()
        }
      ]);
    }
  }, [metaAccounts]);

  const handleAddMapping = () => {
    setIsLoading(true);
    
    // Validate form
    if (!newMapping.sourceId || !newMapping.targetId) {
      setIsLoading(false);
      return;
    }

    // Create mapping name if not provided
    const mappingName = newMapping.name || `${
      accounts.find(a => a.id === newMapping.sourceId)?.name || 'Source'
    } to ${
      accounts.find(a => a.id === newMapping.targetId)?.name || 'Target'
    }`;

    // Create new mapping
    const mapping: BridgeMapping = {
      id: `mapping-${Date.now()}`,
      sourceId: newMapping.sourceId,
      targetId: newMapping.targetId,
      name: mappingName,
      status: 'active',
      syncMode: newMapping.syncMode,
      positionSizing: newMapping.positionSizing,
      positionValue: newMapping.positionValue,
      createdAt: new Date().toISOString(),
      lastSync: new Date().toLocaleString()
    };

    // Simulate API call
    setTimeout(() => {
      setMappings([...mappings, mapping]);
      setShowAddMapping(false);
      setNewMapping({
        sourceId: '',
        targetId: '',
        name: '',
        syncMode: 'one-way',
        positionSizing: 'percentage',
        positionValue: 100
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleDeleteMapping = (mappingId: string) => {
    setMappings(mappings.filter(m => m.id !== mappingId));
    setSelectedMapping(null);
    setDeleteConfirmation(null);
  };

  const handleToggleMappingStatus = (mappingId: string) => {
    setMappings(mappings.map(m => 
      m.id === mappingId 
        ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } 
        : m
    ));
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'mt4':
      case 'mt5':
        return <img src="/mt5-logo.svg\" alt="MetaTrader\" className="h-5 w-5 filter invert opacity-80" />;
      case 'hankox':
        return <Zap className="h-5 w-5 text-accent" />;
      case 'tradelocker':
        return <Lock className="h-5 w-5 text-purple-400" />;
      case 'binance':
        return <Coins className="h-5 w-5 text-yellow-400" />;
      default:
        return null;
    }
  };

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'mt4':
        return 'MetaTrader 4';
      case 'mt5':
        return 'MetaTrader 5';
      case 'hankox':
        return 'Hankox ActTrader';
      case 'tradelocker':
        return 'TradeLocker';
      case 'binance':
        return 'Binance';
      default:
        return platform;
    }
  };

  const filteredAccounts = accounts.filter(account => {
    const matchesFilter = filterPlatform === 'all' || account.platform === filterPlatform;
    const matchesSearch = 
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.broker.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.accountId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
            <ArrowRightLeft className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Account Bridge</h1>
            <p className="text-gray-400 mt-1">Copy trades between different platforms and accounts</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddMapping(true)}
          className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 flex items-center shadow-lg shadow-accent/10"
          id="add-account-button"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Bridge
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Total Accounts</div>
          <div className="text-2xl font-semibold text-white">{accounts.length}</div>
          <div className="text-xs text-gray-400 mt-1">Across all platforms</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Active Bridges</div>
          <div className="text-2xl font-semibold text-white">
            {mappings.filter(m => m.status === 'active').length}
          </div>
          <div className="text-xs text-emerald-400 mt-1">All syncing correctly</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Last Sync</div>
          <div className="text-2xl font-semibold text-white">2 min ago</div>
          <div className="text-xs text-emerald-400 mt-1">All systems operational</div>
        </div>
        <div className="glass-panel rounded-xl p-4">
          <div className="text-gray-400 text-sm mb-1">Sync Success Rate</div>
          <div className="text-2xl font-semibold text-emerald-400">99.8%</div>
          <div className="text-xs text-emerald-400 mt-1">Last 24 hours</div>
        </div>
      </div>

      {/* Active Bridges */}
      <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:border-accent/20 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <ArrowRightLeft className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-lg font-medium text-white">Active Bridges</h2>
          </div>
          <div className="text-sm text-gray-400">
            {mappings.filter(m => m.status === 'active').length} active
          </div>
        </div>

        {mappings.length > 0 ? (
          <div className="space-y-4">
            {mappings.map(mapping => {
              const sourceAccount = accounts.find(a => a.id === mapping.sourceId);
              const targetAccount = accounts.find(a => a.id === mapping.targetId);
              
              return (
                <div 
                  key={mapping.id}
                  className="glass-panel rounded-lg p-4 hover:bg-dark-200/30 transition-colors cursor-pointer border border-dark-300/30 hover:border-accent/20"
                  onClick={() => setSelectedMapping(mapping)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-200/50 rounded-lg">
                        <ArrowRightLeft className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{mapping.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            mapping.status === 'active' 
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : mapping.status === 'error'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {mapping.status.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-400">
                            {mapping.syncMode === 'one-way' ? 'One-way sync' : 'Two-way sync'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleMappingStatus(mapping.id);
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          mapping.status === 'active' ? 'bg-accent' : 'bg-dark-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          mapping.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-center">
                        <div className="p-1.5 bg-dark-200/50 rounded-lg mb-1">
                          {sourceAccount && getPlatformIcon(sourceAccount.platform)}
                        </div>
                        <span className="text-xs text-gray-400">Source</span>
                      </div>
                      <div>
                        <div className="text-sm text-white">{sourceAccount?.name || 'Unknown Account'}</div>
                        <div className="text-xs text-gray-400">{sourceAccount?.broker} • {sourceAccount?.accountId}</div>
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-accent mx-4" />

                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-center">
                        <div className="p-1.5 bg-dark-200/50 rounded-lg mb-1">
                          {targetAccount && getPlatformIcon(targetAccount.platform)}
                        </div>
                        <span className="text-xs text-gray-400">Target</span>
                      </div>
                      <div>
                        <div className="text-sm text-white">{targetAccount?.name || 'Unknown Account'}</div>
                        <div className="text-xs text-gray-400">{targetAccount?.broker} • {targetAccount?.accountId}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-dark-300/30 flex justify-between items-center">
                    <div className="text-xs text-gray-400">
                      Last sync: {mapping.lastSync || 'Never'}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          // Refresh mapping
                          setMappings(prev => prev.map(m => 
                            m.id === mapping.id 
                              ? { ...m, lastSync: new Date().toLocaleString() } 
                              : m
                          ));
                        }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedMapping(mapping);
                        }}
                        className="p-1.5 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="p-3 bg-dark-200/50 rounded-full inline-flex mb-4">
              <ArrowRightLeft className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Bridges Yet</h3>
            <p className="text-gray-400 max-w-md mx-auto mb-4">
              Create your first bridge to start copying trades between different platforms and accounts
            </p>
            <button 
              onClick={() => setShowAddMapping(true)}
              className="premium-button px-4 py-2 inline-flex items-center"
            >
              Create Bridge
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Connected Accounts */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
              <Wallet className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-lg font-medium text-white">Connected Accounts</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={filterPlatform}
                onChange={(e) => setFilterPlatform(e.target.value)}
                className="pl-10 pr-8 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                         border border-dark-300/30 appearance-none cursor-pointer
                         focus:outline-none focus:ring-1 focus:ring-accent/50"
              >
                <option value="all">All Platforms</option>
                <option value="mt4">MetaTrader 4</option>
                <option value="mt5">MetaTrader 5</option>
                <option value="hankox">Hankox ActTrader</option>
                <option value="tradelocker">TradeLocker</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                         border border-dark-300/30 focus:outline-none focus:ring-1 
                         focus:ring-accent/50 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-200/50">
                <th className="text-left text-xs font-medium text-gray-400 p-4">Platform</th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Account Name</th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Broker</th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Account ID</th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Type</th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Balance</th>
                <th className="text-left text-xs font-medium text-gray-400 p-4">Status</th>
                <th className="text-right text-xs font-medium text-gray-400 p-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-300/30">
              {filteredAccounts.map((account) => (
                <tr 
                  key={account.id}
                  className="hover:bg-dark-200/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-dark-200/50 rounded-lg">
                        {getPlatformIcon(account.platform)}
                      </div>
                      <span className="text-white">{getPlatformName(account.platform)}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white">{account.name}</td>
                  <td className="p-4 text-gray-300">{account.broker}</td>
                  <td className="p-4 text-gray-300">{account.accountId}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      account.type === 'live' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {account.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-white">${account.balance.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        account.status === 'connected' ? 'bg-emerald-400' : 
                        account.status === 'connecting' ? 'bg-yellow-400' : 
                        'bg-red-400'
                      }`}></div>
                      <span className={
                        account.status === 'connected' ? 'text-emerald-400' : 
                        account.status === 'connecting' ? 'text-yellow-400' : 
                        'text-red-400'
                      }>
                        {account.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button 
                      onClick={() => {
                        // Open add mapping modal with this account as source
                        setNewMapping({
                          ...newMapping,
                          sourceId: account.id
                        });
                        setShowAddMapping(true);
                      }}
                      className="px-3 py-1.5 text-sm bg-accent/10 text-accent rounded-lg
                               hover:bg-accent/20 transition-colors"
                    >
                      Bridge
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:from-dark-200/30 hover:to-dark-200/10 transition-all duration-300 transform hover:scale-[1.02]">
          <div className="p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg w-fit mb-4">
            <ArrowRightLeft className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Cross-Platform Copying</h3>
          <p className="text-gray-400 text-sm">
            Copy trades seamlessly between different platforms like MetaTrader, Hankox, and TradeLocker with perfect synchronization.
          </p>
        </div>

        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:from-dark-200/30 hover:to-dark-200/10 transition-all duration-300 transform hover:scale-[1.02]">
          <div className="p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg w-fit mb-4">
            <Shield className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Smart Risk Management</h3>
          <p className="text-gray-400 text-sm">
            Customize position sizing with percentage-based, fixed lot, or risk-based approaches to protect your capital.
          </p>
        </div>

        <div className="glass-panel rounded-xl p-6 border border-dark-300/30 bg-gradient-to-br from-dark-200/20 to-dark-200/5 hover:from-dark-200/30 hover:to-dark-200/10 transition-all duration-300 transform hover:scale-[1.02]">
          <div className="p-3 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg w-fit mb-4">
            <Zap className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Ultra-Fast Execution</h3>
          <p className="text-gray-400 text-sm">
            Trades are copied with ultra-low latency (under 0.1s) to ensure you never miss a trading opportunity across accounts.
          </p>
        </div>
      </div>

      {/* Add Mapping Modal */}
      {showAddMapping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddMapping(false)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-lg z-10 p-0 overflow-hidden">
            <div className="relative p-6 border-b border-dark-300/50">
              <button
                onClick={() => setShowAddMapping(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                  <ArrowRightLeft className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">Create New Bridge</h3>
                  <p className="text-gray-400 mt-1">Connect two accounts to copy trades between them</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Bridge Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Bridge Name (Optional)
                </label>
                <input
                  type="text"
                  value={newMapping.name}
                  onChange={(e) => setNewMapping({...newMapping, name: e.target.value})}
                  placeholder="e.g., MT5 to Hankox Bridge"
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                />
              </div>

              {/* Source Account */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Source Account
                </label>
                <select
                  value={newMapping.sourceId}
                  onChange={(e) => setNewMapping({...newMapping, sourceId: e.target.value})}
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                  required
                >
                  <option value="">Select source account</option>
                  {accounts.map(account => (
                    <option key={`source-${account.id}`} value={account.id}>
                      {account.name} ({getPlatformName(account.platform)})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Account */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Target Account
                </label>
                <select
                  value={newMapping.targetId}
                  onChange={(e) => setNewMapping({...newMapping, targetId: e.target.value})}
                  className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                           border border-dark-300/50 focus:outline-none focus:ring-1 
                           focus:ring-accent/50"
                  required
                >
                  <option value="">Select target account</option>
                  {accounts
                    .filter(account => account.id !== newMapping.sourceId)
                    .map(account => (
                      <option key={`target-${account.id}`} value={account.id}>
                        {account.name} ({getPlatformName(account.platform)})
                      </option>
                    ))
                  }
                </select>
              </div>

              {/* Sync Mode */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Sync Mode
                </label>
                <div className="flex rounded-lg bg-dark-200/30 p-1">
                  <button
                    type="button"
                    onClick={() => setNewMapping({...newMapping, syncMode: 'one-way'})}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newMapping.syncMode === 'one-way' 
                        ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    One-Way Sync
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMapping({...newMapping, syncMode: 'two-way'})}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newMapping.syncMode === 'two-way' 
                        ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Two-Way Sync
                  </button>
                </div>
                <div className="mt-2 text-xs text-gray-400 flex items-start space-x-2">
                  <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>
                    {newMapping.syncMode === 'one-way' 
                      ? 'Trades will only be copied from source to target account' 
                      : 'Trades will be synchronized between both accounts'}
                  </span>
                </div>
              </div>

              {/* Position Sizing */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Position Sizing
                </label>
                <div className="flex rounded-lg bg-dark-200/30 p-1 mb-4">
                  <button
                    type="button"
                    onClick={() => setNewMapping({...newMapping, positionSizing: 'percentage'})}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newMapping.positionSizing === 'percentage' 
                        ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Percentage
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMapping({...newMapping, positionSizing: 'fixed'})}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newMapping.positionSizing === 'fixed' 
                        ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Fixed Lots
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewMapping({...newMapping, positionSizing: 'risk-based'})}
                    className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newMapping.positionSizing === 'risk-based' 
                        ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Risk-Based
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {newMapping.positionSizing === 'percentage' 
                        ? 'Percentage of source position' 
                        : newMapping.positionSizing === 'fixed'
                        ? 'Fixed lot size for all trades'
                        : 'Risk percentage per trade'}
                    </span>
                    <span className="text-sm text-white">
                      {newMapping.positionValue}{newMapping.positionSizing === 'percentage' || newMapping.positionSizing === 'risk-based' ? '%' : ' lots'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={newMapping.positionSizing === 'fixed' ? 0.01 : 1}
                    max={newMapping.positionSizing === 'fixed' ? 10 : 100}
                    step={newMapping.positionSizing === 'fixed' ? 0.01 : 1}
                    value={newMapping.positionValue}
                    onChange={(e) => setNewMapping({...newMapping, positionValue: parseFloat(e.target.value)})}
                    className="w-full accent-accent"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{newMapping.positionSizing === 'fixed' ? '0.01 lots' : '1%'}</span>
                    <span>{newMapping.positionSizing === 'fixed' ? '10 lots' : '100%'}</span>
                  </div>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-300">
                    Make sure both accounts have sufficient balance and margin for the copied trades.
                  </p>
                  <p className="text-sm text-gray-400">
                    Position sizing will be adjusted based on your settings, but market conditions may affect execution.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleAddMapping}
                  disabled={isLoading || !newMapping.sourceId || !newMapping.targetId}
                  className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 flex-1 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-accent/10"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Bridge'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMapping(false)}
                  className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                           rounded-lg hover:bg-dark-200/50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mapping Details Modal */}
      {selectedMapping && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedMapping(null)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden">
            <div className="relative p-6 border-b border-dark-300/50">
              <button
                onClick={() => setSelectedMapping(null)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
                  <ArrowRightLeft className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white tracking-tight">{selectedMapping.name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedMapping.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : selectedMapping.status === 'error'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {selectedMapping.status.toUpperCase()}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-xs text-gray-400">Created {new Date(selectedMapping.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Accounts */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-medium text-white mb-4">Connected Accounts</h4>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-dark-200/50 rounded-lg mb-1">
                        {getPlatformIcon(accounts.find(a => a.id === selectedMapping.sourceId)?.platform || '')}
                      </div>
                      <span className="text-xs text-gray-400">Source</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {accounts.find(a => a.id === selectedMapping.sourceId)?.name || 'Unknown Account'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {accounts.find(a => a.id === selectedMapping.sourceId)?.broker} • 
                        {accounts.find(a => a.id === selectedMapping.sourceId)?.accountId}
                      </div>
                    </div>
                  </div>

                  <ArrowRight className={`h-5 w-5 ${selectedMapping.syncMode === 'two-way' ? 'text-accent' : 'text-gray-400'}`} />

                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <div className="p-2 bg-dark-200/50 rounded-lg mb-1">
                        {getPlatformIcon(accounts.find(a => a.id === selectedMapping.targetId)?.platform || '')}
                      </div>
                      <span className="text-xs text-gray-400">Target</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">
                        {accounts.find(a => a.id === selectedMapping.targetId)?.name || 'Unknown Account'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {accounts.find(a => a.id === selectedMapping.targetId)?.broker} • 
                        {accounts.find(a => a.id === selectedMapping.targetId)?.accountId}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-medium text-white mb-4">Bridge Settings</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Sync Mode</span>
                    <span className="text-white">
                      {selectedMapping.syncMode === 'one-way' ? 'One-way sync' : 'Two-way sync'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Position Sizing</span>
                    <span className="text-white">
                      {selectedMapping.positionSizing === 'percentage' 
                        ? `${selectedMapping.positionValue}% of source position` 
                        : selectedMapping.positionSizing === 'fixed'
                        ? `${selectedMapping.positionValue} lots (fixed)`
                        : `${selectedMapping.positionValue}% risk per trade`}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status</span>
                    <div className="flex items-center space-x-2">
                      <span className={
                        selectedMapping.status === 'active' ? 'text-emerald-400' : 
                        selectedMapping.status === 'error' ? 'text-red-400' : 
                        'text-gray-400'
                      }>
                        {selectedMapping.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => handleToggleMappingStatus(selectedMapping.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          selectedMapping.status === 'active' ? 'bg-accent' : 'bg-dark-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          selectedMapping.status === 'active' ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Last Sync</span>
                    <span className="text-white">{selectedMapping.lastSync || 'Never'}</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-lg font-medium text-white mb-4">Performance Metrics</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Activity className="h-4 w-4" />
                      <span>Copied Trades</span>
                    </div>
                    <div className="text-lg font-semibold text-white">24</div>
                    <div className="text-xs text-emerald-400 mt-1">Last 30 days</div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Target className="h-4 w-4" />
                      <span>Success Rate</span>
                    </div>
                    <div className="text-lg font-semibold text-emerald-400">99.8%</div>
                    <div className="text-xs text-emerald-400 mt-1">Copy accuracy</div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <Clock className="h-4 w-4" />
                      <span>Avg. Latency</span>
                    </div>
                    <div className="text-lg font-semibold text-white">0.08s</div>
                    <div className="text-xs text-emerald-400 mt-1">Ultra-fast execution</div>
                  </div>
                  
                  <div className="glass-panel rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-gray-400 text-sm mb-1">
                      <BarChart2 className="h-4 w-4" />
                      <span>Volume Copied</span>
                    </div>
                    <div className="text-lg font-semibold text-white">48.5 lots</div>
                    <div className="text-xs text-emerald-400 mt-1">Total volume</div>
                  </div>
                </div>
              </div>

              {/* Error Message (if any) */}
              {selectedMapping.error && (
                <div className="bg-red-500/10 text-red-400 rounded-lg p-4 flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Sync Error</p>
                    <p className="text-sm mt-1">{selectedMapping.error}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    // Refresh mapping
                    setMappings(prev => prev.map(m => 
                      m.id === selectedMapping.id 
                        ? { ...m, lastSync: new Date().toLocaleString() } 
                        : m
                    ));
                  }}
                  className="premium-button bg-gradient-to-r from-accent to-purple-500 hover:from-accent-dark hover:to-purple-600 flex-1 py-2.5 shadow-md shadow-accent/10"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Sync Now
                </button>
                <button
                  onClick={() => setDeleteConfirmation({
                    id: selectedMapping.id,
                    name: selectedMapping.name
                  })}
                  className="flex-1 px-4 py-2.5 border border-red-500/30 text-red-400 
                           rounded-lg hover:bg-red-500/10 transition-all duration-300"
                >
                  Delete Bridge
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirmation(null)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-md z-10 p-0 overflow-hidden">
            <div className="relative p-6 border-b border-dark-300/50">
              <button
                onClick={() => setDeleteConfirmation(null)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">Confirm Deletion</h3>
                  <p className="text-gray-400 mt-1">This action cannot be undone</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-white">
                Are you sure you want to delete the bridge <span className="font-medium">{deleteConfirmation.name}</span>?
              </p>
              
              <div className="bg-dark-200/30 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm text-gray-300">
                    Deleting this bridge will stop all trade copying between the connected accounts.
                  </p>
                  <p className="text-sm text-gray-400">
                    Existing trades will not be affected, but no new trades will be copied.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleDeleteMapping(deleteConfirmation.id)}
                  className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white 
                           rounded-lg transition-all duration-300"
                >
                  Delete Bridge
                </button>
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="flex-1 px-4 py-2.5 border border-dark-300/50 text-gray-400 
                           rounded-lg hover:bg-dark-200/50 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {accounts.length === 0 && (
        <div className="glass-panel rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-xl flex items-center justify-center">
            <ArrowRightLeft className="h-8 w-8 text-accent" />
          </div>
          <h2 className="text-2xl font-medium text-white mb-3">Connect Your First Account</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-6">
            Link your trading accounts to start automated trading. We support multiple platforms including MetaTrader, Hankox ActTrader, 
            TradeLocker, and Binance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/trading-accounts"
              className="premium-button px-6 py-3 flex items-center justify-center"
            >
              Add Trading Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}