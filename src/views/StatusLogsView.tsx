import React, { useState, useEffect } from 'react';
import { 
  Activity, CheckCircle2, AlertTriangle, 
  RefreshCw, Clock, Calendar,
  Server, Database, Webhook, 
  MessageCircle, Shield, Zap, 
  Globe, Cloud, Cpu, HardDrive,
  BarChart2, ArrowDown, ArrowUp,
  Info, ExternalLink, Download,
  Plus, X, Send
} from 'lucide-react';

interface ServiceStatus {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'outage' | 'maintenance';
  uptime: number;
  lastIncident?: string;
  category: 'core' | 'api' | 'infrastructure' | 'external';
  description: string;
  icon: React.ReactNode;
}

interface Incident {
  id: string;
  title: string;
  status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  severity: 'critical' | 'major' | 'minor';
  startTime: string;
  endTime?: string;
  updates: {
    time: string;
    message: string;
    status: 'investigating' | 'identified' | 'monitoring' | 'resolved';
  }[];
  affectedServices: string[];
}

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  status: 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
}

export default function StatusLogsView() {
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportForm, setReportForm] = useState({
    title: '',
    description: '',
    severity: 'minor' as 'critical' | 'major' | 'minor',
    affectedServices: [] as string[]
  });

  // Generate mock data
  useEffect(() => {
    const generateMockData = () => {
      // Services
      const mockServices: ServiceStatus[] = [
        {
          id: 'api-server',
          name: 'API Server',
          status: 'operational',
          uptime: 99.98,
          category: 'core',
          description: 'Main API server handling all client requests',
          icon: <Server className="h-5 w-5" />
        },
        {
          id: 'database',
          name: 'Database',
          status: 'operational',
          uptime: 99.99,
          category: 'infrastructure',
          description: 'Primary database cluster',
          icon: <Database className="h-5 w-5" />
        },
        {
          id: 'webhook-service',
          name: 'Webhook Service',
          status: 'operational',
          uptime: 99.95,
          lastIncident: '2023-12-15T08:30:00Z',
          category: 'core',
          description: 'Processes incoming webhooks from TradingView',
          icon: <Webhook className="h-5 w-5" />
        },
        {
          id: 'notification-service',
          name: 'Notification Service',
          status: 'operational',
          uptime: 99.97,
          category: 'core',
          description: 'Handles all user notifications',
          icon: <MessageCircle className="h-5 w-5" />
        },
        {
          id: 'auth-service',
          name: 'Authentication',
          status: 'operational',
          uptime: 99.99,
          category: 'core',
          description: 'User authentication and authorization',
          icon: <Shield className="h-5 w-5" />
        },
        {
          id: 'trading-engine',
          name: 'Trading Engine',
          status: 'operational',
          uptime: 99.93,
          lastIncident: '2023-12-10T14:15:00Z',
          category: 'core',
          description: 'Core trading execution engine',
          icon: <Zap className="h-5 w-5" />
        },
        {
          id: 'cdn',
          name: 'Content Delivery',
          status: 'operational',
          uptime: 100.00,
          category: 'infrastructure',
          description: 'Static content delivery network',
          icon: <Globe className="h-5 w-5" />
        },
        {
          id: 'storage',
          name: 'Cloud Storage',
          status: 'operational',
          uptime: 99.99,
          category: 'infrastructure',
          description: 'File and object storage',
          icon: <Cloud className="h-5 w-5" />
        },
        {
          id: 'compute',
          name: 'Compute Resources',
          status: 'degraded',
          uptime: 99.85,
          lastIncident: '2024-01-24T10:30:00Z',
          category: 'infrastructure',
          description: 'Server compute resources',
          icon: <Cpu className="h-5 w-5" />
        },
        {
          id: 'backup',
          name: 'Backup Service',
          status: 'operational',
          uptime: 99.95,
          category: 'infrastructure',
          description: 'Automated backup system',
          icon: <HardDrive className="h-5 w-5" />
        },
        {
          id: 'mt-connector',
          name: 'MetaTrader Connector',
          status: 'operational',
          uptime: 99.90,
          category: 'api',
          description: 'Connection to MetaTrader platforms',
          icon: <Activity className="h-5 w-5" />
        },
        {
          id: 'binance-connector',
          name: 'Binance Connector',
          status: 'operational',
          uptime: 99.92,
          category: 'api',
          description: 'Connection to Binance API',
          icon: <Activity className="h-5 w-5" />
        }
      ];

      // Incidents
      const mockIncidents: Incident[] = [
        {
          id: 'incident-1',
          title: 'Degraded Performance in Compute Resources',
          status: 'monitoring',
          severity: 'minor',
          startTime: '2024-01-24T10:30:00Z',
          updates: [
            {
              time: '2024-01-24T10:30:00Z',
              message: 'We are investigating reports of degraded performance in our compute resources.',
              status: 'investigating'
            },
            {
              time: '2024-01-24T10:45:00Z',
              message: 'We have identified the issue as increased load on our compute resources due to a spike in trading activity.',
              status: 'identified'
            },
            {
              time: '2024-01-24T11:15:00Z',
              message: 'We have scaled up our compute resources to handle the increased load. We are monitoring the situation.',
              status: 'monitoring'
            }
          ],
          affectedServices: ['compute']
        },
        {
          id: 'incident-2',
          title: 'Webhook Service Outage',
          status: 'resolved',
          severity: 'major',
          startTime: '2023-12-15T08:30:00Z',
          endTime: '2023-12-15T10:15:00Z',
          updates: [
            {
              time: '2023-12-15T08:30:00Z',
              message: 'We are investigating reports of webhook failures.',
              status: 'investigating'
            },
            {
              time: '2023-12-15T08:45:00Z',
              message: 'We have identified an issue with our webhook processing service.',
              status: 'identified'
            },
            {
              time: '2023-12-15T09:30:00Z',
              message: 'We are deploying a fix to resolve the issue.',
              status: 'monitoring'
            },
            {
              time: '2023-12-15T10:15:00Z',
              message: 'The issue has been resolved and all webhooks are processing normally.',
              status: 'resolved'
            }
          ],
          affectedServices: ['webhook-service']
        },
        {
          id: 'incident-3',
          title: 'Trading Engine Latency',
          status: 'resolved',
          severity: 'minor',
          startTime: '2023-12-10T14:15:00Z',
          endTime: '2023-12-10T15:30:00Z',
          updates: [
            {
              time: '2023-12-10T14:15:00Z',
              message: 'We are investigating reports of increased latency in the trading engine.',
              status: 'investigating'
            },
            {
              time: '2023-12-10T14:30:00Z',
              message: 'We have identified the issue as a database query optimization problem.',
              status: 'identified'
            },
            {
              time: '2023-12-10T15:00:00Z',
              message: 'We have deployed a fix to optimize the database queries.',
              status: 'monitoring'
            },
            {
              time: '2023-12-10T15:30:00Z',
              message: 'The issue has been resolved and trading engine latency has returned to normal levels.',
              status: 'resolved'
            }
          ],
          affectedServices: ['trading-engine', 'database']
        }
      ];

      // Metrics
      const mockMetrics: Metric[] = [
        {
          id: 'api-latency',
          name: 'API Latency',
          value: 42,
          unit: 'ms',
          change: -5,
          status: 'good',
          icon: <Server className="h-4 w-4" />
        },
        {
          id: 'webhook-execution',
          name: 'Webhook Execution',
          value: 78,
          unit: 'ms',
          change: 3,
          status: 'good',
          icon: <Webhook className="h-4 w-4" />
        },
        {
          id: 'database-queries',
          name: 'Database Queries',
          value: 1250,
          unit: 'qps',
          change: 15,
          status: 'warning',
          icon: <Database className="h-4 w-4" />
        },
        {
          id: 'error-rate',
          name: 'Error Rate',
          value: 0.05,
          unit: '%',
          change: -0.02,
          status: 'good',
          icon: <AlertTriangle className="h-4 w-4" />
        },
        {
          id: 'cpu-usage',
          name: 'CPU Usage',
          value: 68,
          unit: '%',
          change: 12,
          status: 'warning',
          icon: <Cpu className="h-4 w-4" />
        },
        {
          id: 'memory-usage',
          name: 'Memory Usage',
          value: 72,
          unit: '%',
          change: 8,
          status: 'warning',
          icon: <HardDrive className="h-4 w-4" />
        },
        {
          id: 'active-users',
          name: 'Active Users',
          value: 15234,
          unit: '',
          change: 1250,
          status: 'good',
          icon: <Activity className="h-4 w-4" />
        },
        {
          id: 'trade-volume',
          name: 'Trade Volume',
          value: 2.8,
          unit: 'M',
          change: 0.3,
          status: 'good',
          icon: <BarChart2 className="h-4 w-4" />
        }
      ];

      return { services: mockServices, incidents: mockIncidents, metrics: mockMetrics };
    };

    const data = generateMockData();
    setServices(data.services);
    setIncidents(data.incidents);
    setMetrics(data.metrics);
    setIsLoading(false);
  }, []);

  // Auto refresh effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoRefresh) {
      interval = setInterval(() => {
        // Update last updated time
        setLastUpdated(new Date());
        
        // Randomly update a service status
        setServices(prev => {
          const newServices = [...prev];
          const randomIndex = Math.floor(Math.random() * newServices.length);
          const randomService = newServices[randomIndex];
          
          // Small chance to change status
          if (Math.random() < 0.1) {
            if (randomService.status === 'operational') {
              randomService.status = Math.random() < 0.7 ? 'degraded' : 'maintenance';
            } else {
              randomService.status = 'operational';
            }
          }
          
          // Update uptime slightly
          randomService.uptime = Math.min(100, randomService.uptime + (Math.random() * 0.02 - 0.01));
          
          return newServices;
        });
        
        // Randomly update metrics
        setMetrics(prev => {
          return prev.map(metric => {
            // Random fluctuation in value
            const fluctuation = metric.value * (Math.random() * 0.1 - 0.05);
            const newValue = Math.max(0, metric.value + fluctuation);
            
            // Update change
            const newChange = metric.change + (Math.random() * 2 - 1);
            
            // Update status based on thresholds
            let newStatus = metric.status;
            if (metric.name === 'Error Rate') {
              newStatus = newValue < 0.1 ? 'good' : newValue < 0.5 ? 'warning' : 'critical';
            } else if (metric.name === 'CPU Usage' || metric.name === 'Memory Usage') {
              newStatus = newValue < 60 ? 'good' : newValue < 80 ? 'warning' : 'critical';
            }
            
            return {
              ...metric,
              value: newValue,
              change: newChange,
              status: newStatus as 'good' | 'warning' | 'critical'
            };
          });
        });
      }, 30000); // Update every 30 seconds
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  // Format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'degraded':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'outage':
        return 'text-red-400 bg-red-500/10';
      case 'maintenance':
        return 'text-blue-400 bg-blue-500/10';
      case 'investigating':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'identified':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'monitoring':
        return 'text-blue-400 bg-blue-500/10';
      case 'resolved':
        return 'text-emerald-400 bg-emerald-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  // Get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-500/10';
      case 'major':
        return 'text-orange-400 bg-orange-500/10';
      case 'minor':
        return 'text-yellow-400 bg-yellow-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  // Get metric status color
  const getMetricStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-400';
      case 'warning':
        return 'text-yellow-400';
      case 'critical':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  // Filter incidents based on timeframe
  const getFilteredIncidents = () => {
    const now = new Date();
    let cutoff: Date;
    
    switch (timeframe) {
      case '24h':
        cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        cutoff = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    }
    
    return incidents.filter(incident => new Date(incident.startTime) >= cutoff);
  };

  // Calculate overall system status
  const calculateOverallStatus = () => {
    if (services.some(service => service.status === 'outage')) {
      return 'major outage';
    } else if (services.some(service => service.status === 'degraded')) {
      return 'degraded performance';
    } else if (services.some(service => service.status === 'maintenance')) {
      return 'under maintenance';
    } else {
      return 'all systems operational';
    }
  };

  // Get overall status color
  const getOverallStatusColor = () => {
    const status = calculateOverallStatus();
    switch (status) {
      case 'all systems operational':
        return 'text-emerald-400 bg-emerald-500/10';
      case 'degraded performance':
        return 'text-yellow-400 bg-yellow-500/10';
      case 'major outage':
        return 'text-red-400 bg-red-500/10';
      case 'under maintenance':
        return 'text-blue-400 bg-blue-500/10';
      default:
        return 'text-gray-400 bg-gray-500/10';
    }
  };

  // Handle refresh
  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1000);
  };

  // Export status report
  const handleExportStatusReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      overallStatus: calculateOverallStatus(),
      services: services.map(service => ({
        name: service.name,
        status: service.status,
        uptime: service.uptime,
        category: service.category
      })),
      activeIncidents: incidents.filter(incident => !incident.endTime),
      metrics: metrics.map(metric => ({
        name: metric.name,
        value: metric.value,
        unit: metric.unit,
        status: metric.status
      }))
    };
    
    const reportJson = JSON.stringify(report, null, 2);
    const blob = new Blob([reportJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `automated-trader-status-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle report incident submission
  const handleReportIncident = () => {
    if (!reportForm.title || !reportForm.description || reportForm.affectedServices.length === 0) {
      return;
    }

    const newIncident: Incident = {
      id: `incident-${Date.now()}`,
      title: reportForm.title,
      status: 'investigating',
      severity: reportForm.severity,
      startTime: new Date().toISOString(),
      updates: [
        {
          time: new Date().toISOString(),
          message: reportForm.description,
          status: 'investigating'
        }
      ],
      affectedServices: reportForm.affectedServices
    };

    setIncidents(prev => [newIncident, ...prev]);
    setShowReportModal(false);
    setReportForm({
      title: '',
      description: '',
      severity: 'minor',
      affectedServices: []
    });
  };

  // Toggle service selection in report form
  const toggleServiceSelection = (serviceId: string) => {
    setReportForm(prev => {
      if (prev.affectedServices.includes(serviceId)) {
        return {
          ...prev,
          affectedServices: prev.affectedServices.filter(id => id !== serviceId)
        };
      } else {
        return {
          ...prev,
          affectedServices: [...prev.affectedServices, serviceId]
        };
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent/20 to-purple-500/5 rounded-lg">
            <Activity className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h1 className="text-3xl font-medium text-white tracking-tight">Service Status</h1>
            <p className="text-gray-400 mt-1">Monitor platform health and service availability</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowReportModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-lg 
                     border border-accent/30 hover:bg-accent/20 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Report Incident</span>
          </button>
          <div className="text-sm text-gray-400">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
          <button 
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`relative inline-flex items-center px-3 py-1.5 rounded-lg border ${
              autoRefresh 
                ? 'bg-accent/10 text-accent border-accent/30' 
                : 'text-gray-400 border-dark-300/50 hover:text-white hover:border-dark-300'
            } transition-colors`}
          >
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">Auto Refresh</span>
            <div className={`ml-2 relative inline-flex h-4 w-8 items-center rounded-full ${
              autoRefresh ? 'bg-accent' : 'bg-dark-300'
            }`}>
              <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition ${
                autoRefresh ? 'translate-x-4' : 'translate-x-1'
              }`} />
            </div>
          </button>
          <button 
            onClick={handleRefresh}
            className="p-2 text-gray-400 hover:text-white hover:bg-dark-200/50 rounded-lg transition-all"
            disabled={isLoading}
          >
            <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Overall Status */}
      <div className="glass-panel rounded-xl p-6 border-2 border-dark-300/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-full ${getOverallStatusColor()}`}>
              {calculateOverallStatus() === 'all systems operational' ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : calculateOverallStatus() === 'major outage' ? (
                <AlertTriangle className="h-6 w-6" />
              ) : (
                <Info className="h-6 w-6" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white capitalize">
                {calculateOverallStatus()}
              </h2>
              <p className="text-gray-400 mt-1">
                {services.filter(s => s.status === 'operational').length} of {services.length} services operational
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={handleExportStatusReport}
              className="flex items-center space-x-2 px-4 py-2 bg-dark-200/30 text-gray-300 rounded-lg 
                       border border-dark-300/30 hover:bg-dark-200/50 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <a 
              href="https://status.automatedtrader.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 bg-accent/10 text-accent rounded-lg 
                       border border-accent/30 hover:bg-accent/20 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Status Page</span>
            </a>
          </div>
        </div>
      </div>

      {/* Service Status Grid */}
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Service Status</h2>
        
        {/* Core Services */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Core Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter(service => service.category === 'core')
              .map(service => (
                <div key={service.id} className="glass-panel rounded-lg p-4 border border-dark-300/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-200/50 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-white font-medium">{service.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{service.description}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Uptime: {service.uptime.toFixed(2)}%</span>
                    {service.lastIncident && (
                      <span className="text-gray-400">
                        Last incident: {new Date(service.lastIncident).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* Infrastructure */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Infrastructure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter(service => service.category === 'infrastructure')
              .map(service => (
                <div key={service.id} className="glass-panel rounded-lg p-4 border border-dark-300/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-200/50 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-white font-medium">{service.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{service.description}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Uptime: {service.uptime.toFixed(2)}%</span>
                    {service.lastIncident && (
                      <span className="text-gray-400">
                        Last incident: {new Date(service.lastIncident).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* API Connectors */}
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-3">API Connectors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter(service => service.category === 'api')
              .map(service => (
                <div key={service.id} className="glass-panel rounded-lg p-4 border border-dark-300/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-dark-200/50 rounded-lg">
                        {service.icon}
                      </div>
                      <div>
                        <div className="text-white font-medium">{service.name}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{service.description}</div>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                      <span className="capitalize">{service.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Uptime: {service.uptime.toFixed(2)}%</span>
                    {service.lastIncident && (
                      <span className="text-gray-400">
                        Last incident: {new Date(service.lastIncident).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Performance Metrics</h2>
          <div className="flex rounded-lg bg-dark-200/30 p-1 border border-dark-300/30">
            {['24h', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period as '24h' | '7d' | '30d')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  timeframe === period 
                    ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(metric => (
            <div key={metric.id} className="glass-panel rounded-lg p-4 border border-dark-300/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-gray-400">
                  {metric.icon}
                  <span className="text-sm">{metric.name}</span>
                </div>
                <div className={`flex items-center space-x-1 ${
                  metric.change > 0 ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {metric.change > 0 ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  <span className="text-xs">{Math.abs(metric.change).toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex items-baseline space-x-1">
                <span className={`text-xl font-bold ${getMetricStatusColor(metric.status)}`}>
                  {metric.value.toLocaleString(undefined, { 
                    maximumFractionDigits: 2,
                    minimumFractionDigits: metric.value < 1 ? 2 : 0
                  })}
                </span>
                {metric.unit && <span className="text-gray-400">{metric.unit}</span>}
              </div>
              <div className="mt-2 h-1 bg-dark-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    metric.status === 'good' ? 'bg-emerald-400' :
                    metric.status === 'warning' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}
                  style={{ width: `${Math.min(100, metric.name.includes('Usage') ? metric.value : 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incidents */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-white">Recent Incidents</h2>
          <div className="flex rounded-lg bg-dark-200/30 p-1 border border-dark-300/30">
            {['24h', '7d', '30d'].map((period) => (
              <button
                key={period}
                onClick={() => setTimeframe(period as '24h' | '7d' | '30d')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                  timeframe === period 
                    ? 'bg-gradient-to-r from-accent to-purple-500 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        
        {getFilteredIncidents().length > 0 ? (
          <div className="space-y-4">
            {getFilteredIncidents().map(incident => (
              <div 
                key={incident.id}
                className="glass-panel rounded-lg p-4 border border-dark-300/30 hover:border-accent/20 transition-all cursor-pointer"
                onClick={() => setSelectedIncident(incident)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getStatusColor(incident.status)}`}>
                      {incident.status === 'resolved' ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium">{incident.title}</div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(incident.status)}`}>
                          <span className="capitalize">{incident.status}</span>
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs ${getSeverityColor(incident.severity)}`}>
                          <span className="capitalize">{incident.severity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">
                      {new Date(incident.startTime).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {incident.endTime ? 'Resolved' : 'Ongoing'}
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="text-xs text-gray-400">Affected services:</div>
                  {incident.affectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="px-2 py-0.5 bg-dark-200/50 rounded-full text-xs text-gray-300">
                        {service.name}
                      </div>
                    ) : null;
                  })}
                </div>
                
                <div className="mt-3 text-xs text-gray-400">
                  Latest update: {formatTimestamp(incident.updates[incident.updates.length - 1].time)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 bg-dark-200/20 rounded-xl border border-dark-300/30">
            <CheckCircle2 className="h-12 w-12 text-emerald-400 mb-3" />
            <p className="text-white font-medium">No incidents reported</p>
            <p className="text-gray-400 text-sm mt-1">All systems have been operational for the selected timeframe</p>
          </div>
        )}
      </div>

      {/* Scheduled Maintenance */}
      <div className="glass-panel rounded-xl p-6">
        <h2 className="text-lg font-medium text-white mb-4">Scheduled Maintenance</h2>
        
        <div className="flex flex-col items-center justify-center py-10 bg-dark-200/20 rounded-xl border border-dark-300/30">
          <Calendar className="h-12 w-12 text-blue-400 mb-3" />
          <p className="text-white font-medium">No scheduled maintenance</p>
          <p className="text-gray-400 text-sm mt-1">There are no upcoming maintenance windows scheduled</p>
        </div>
      </div>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedIncident(null)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-3xl z-10 p-0 overflow-hidden">
            <div className="relative p-6 border-b border-dark-300/50">
              <button
                onClick={() => setSelectedIncident(null)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(selectedIncident.status)}`}>
                  {selectedIncident.status === 'resolved' ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">{selectedIncident.title}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(selectedIncident.status)}`}>
                      <span className="capitalize">{selectedIncident.status}</span>
                    </div>
                    <div className={`px-2 py-0.5 rounded-full text-xs ${getSeverityColor(selectedIncident.severity)}`}>
                      <span className="capitalize">{selectedIncident.severity}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400 text-sm">
                      {new Date(selectedIncident.startTime).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Affected Services */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Affected Services</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedIncident.affectedServices.map(serviceId => {
                    const service = services.find(s => s.id === serviceId);
                    return service ? (
                      <div key={serviceId} className="flex items-center space-x-2 px-3 py-1.5 bg-dark-200/50 rounded-lg text-sm text-white">
                        {service.icon}
                        <span>{service.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>

              {/* Timeline */}
              <div className="glass-panel rounded-xl p-4">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Incident Timeline</h4>
                <div className="space-y-4">
                  {selectedIncident.updates.map((update, index) => (
                    <div key={index} className="relative pl-6 pb-4">
                      {/* Timeline connector */}
                      {index < selectedIncident.updates.length - 1 && (
                        <div className="absolute left-[0.9375rem] top-6 bottom-0 w-0.5 bg-dark-300/50"></div>
                      )}
                      
                      {/* Status dot */}
                      <div className={`absolute left-0 top-1 w-5 h-5 rounded-full ${getStatusColor(update.status)} flex items-center justify-center`}>
                        {update.status === 'resolved' ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : update.status === 'monitoring' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                      </div>
                      
                      {/* Update content */}
                      <div className="glass-panel rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(update.status)}`}>
                            <span className="capitalize">{update.status}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {formatTimestamp(update.time)}
                          </span>
                        </div>
                        <p className="text-white text-sm">{update.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resolution */}
              {selectedIncident.status === 'resolved' && selectedIncident.endTime && (
                <div className="glass-panel rounded-xl p-4 bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center space-x-3 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <h4 className="text-white font-medium">Incident Resolved</h4>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">
                      {Math.round((new Date(selectedIncident.endTime).getTime() - new Date(selectedIncident.startTime).getTime()) / (1000 * 60))} minutes
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="px-4 py-2 border border-dark-300/50 text-gray-400 
                           rounded-lg hover:bg-dark-200/50 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Incident Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowReportModal(false)} />
          
          <div className="glass-panel rounded-2xl w-full max-w-2xl z-10 p-0 overflow-hidden">
            <div className="relative p-6 border-b border-dark-300/50">
              <button
                onClick={() => setShowReportModal(false)}
                className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white 
                         hover:bg-dark-200/50 rounded-lg transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white">Report an Incident</h3>
                  <p className="text-gray-400 mt-1">Let us know about any issues you're experiencing</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Incident Details */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Incident Title
                  </label>
                  <input
                    type="text"
                    value={reportForm.title}
                    onChange={(e) => setReportForm({...reportForm, title: e.target.value})}
                    placeholder="Brief description of the issue"
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Detailed Description
                  </label>
                  <textarea
                    value={reportForm.description}
                    onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                    placeholder="Provide details about what you're experiencing"
                    rows={4}
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Severity
                  </label>
                  <select
                    value={reportForm.severity}
                    onChange={(e) => setReportForm({...reportForm, severity: e.target.value as 'critical' | 'major' | 'minor'})}
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                  >
                    <option value="minor">Minor - Minimal impact on functionality</option>
                    <option value="major">Major - Significant functionality affected</option>
                    <option value="critical">Critical - Service completely unavailable</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Affected Services
                  </label>
                  <div className="glass-panel rounded-lg p-4 border border-dark-300/30 max-h-48 overflow-y-auto">
                    <div className="space-y-2">
                      {services.map(service => (
                        <div 
                          key={service.id}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            id={`service-${service.id}`}
                            checked={reportForm.affectedServices.includes(service.id)}
                            onChange={() => toggleServiceSelection(service.id)}
                            className="h-4 w-4 rounded border-dark-300 bg-dark-200 text-accent focus:ring-accent focus:ring-offset-dark-100"
                          />
                          <label 
                            htmlFor={`service-${service.id}`}
                            className="flex items-center space-x-2 text-white cursor-pointer"
                          >
                            {service.icon}
                            <span>{service.name}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleReportIncident}
                  disabled={!reportForm.title || !reportForm.description || reportForm.affectedServices.length === 0}
                  className="premium-button flex-1 py-2.5 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Submit Report
                </button>
                <button
                  onClick={() => setShowReportModal(false)}
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
    </div>
  );
}