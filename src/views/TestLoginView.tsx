import React, { useEffect, useState } from 'react';
import { useCreateMetaAccount } from '../hooks/useMetaAccount';
import { Loader, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function TestLoginView() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<any>(null);
  const createAccount = useCreateMetaAccount();

  useEffect(() => {
    const testLogin = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const result = await createAccount.mutateAsync({
          name: 'Fyntura Demo',
          login: '313902',
          password: 'dKbqXqU835Sz5Zb',
          server: 'Fyntura-Demo',
          platform: 'mt5',
          broker: 'Fyntura'
        });

        setAccountData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to connect to broker');
      } finally {
        setIsLoading(false);
      }
    };

    testLogin();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium text-white tracking-tight">MetaTrader Connection Test</h2>
        <button 
          onClick={() => window.location.reload()}
          className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
        >
          <RefreshCw className="h-5 w-5" />
        </button>
      </div>

      <div className="glass-panel rounded-xl p-6">
        {isLoading ? (
          <div className="flex items-center justify-center space-x-3 text-accent">
            <Loader className="h-5 w-5 animate-spin" />
            <span>Connecting to MetaTrader...</span>
          </div>
        ) : error ? (
          <div className="flex items-start space-x-3 text-red-400">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Connection Failed</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        ) : accountData ? (
          <div className="space-y-6">
            <div className="flex items-start space-x-3 text-emerald-400">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Successfully Connected!</p>
                <p className="text-sm text-gray-400 mt-1">Account details retrieved successfully</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Account Name</div>
                <div className="text-lg font-medium text-white">{accountData.name}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Login</div>
                <div className="text-lg font-medium text-white">{accountData.login}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Server</div>
                <div className="text-lg font-medium text-white">{accountData.server}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Platform</div>
                <div className="text-lg font-medium text-white">{accountData.platform.toUpperCase()}</div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Balance</div>
                <div className="text-lg font-medium text-emerald-400">
                  ${accountData.balance.toLocaleString()}
                </div>
              </div>

              <div className="glass-panel rounded-lg p-4">
                <div className="text-sm text-gray-400 mb-1">Status</div>
                <div className="text-lg font-medium text-emerald-400">
                  {accountData.connectionStatus}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}