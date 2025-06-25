import React, { useState } from 'react';
import { 
  X, AlertTriangle, Clock, DollarSign, 
  Percent, FileText, Info, ChevronDown 
} from 'lucide-react';

interface RiskManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  webhook: {
    id: string;
    name: string;
  };
  onSave: (settings: RiskSettings) => void;
}

interface RiskSettings {
  newsFilter: boolean;
  maxDailyLoss: number;
  maxLossPercent: number;
  maxDrawdown: number;
  tradingHours: boolean;
  tradingSchedule: {
    timezone: string;
    startTime: string;
    endTime: string;
    days: string[];
  };
}

const TIMEZONES = [
  'UTC',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Australia/Sydney'
];

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export default function RiskManagementModal({ 
  isOpen, 
  onClose, 
  webhook,
  onSave 
}: RiskManagementModalProps) {
  const [newsFilter, setNewsFilter] = useState(false);
  const [maxDailyLoss, setMaxDailyLoss] = useState(0);
  const [maxLossPercent, setMaxLossPercent] = useState(0);
  const [maxDrawdown, setMaxDrawdown] = useState(0);
  const [tradingHours, setTradingHours] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [timezone, setTimezone] = useState('UTC');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      newsFilter,
      maxDailyLoss,
      maxLossPercent,
      maxDrawdown,
      tradingHours,
      tradingSchedule: {
        timezone,
        startTime,
        endTime,
        days: selectedDays
      }
    });
    onClose();
  };

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

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
          
          <h3 className="text-xl font-medium text-white tracking-tight">Risk Management</h3>
          <p className="text-gray-400 mt-1">Configure risk parameters for {webhook.name}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* News Events Filter */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1 flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white">News Events Filter</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  Avoid trading during market-moving news
                </p>
              </div>
              <button
                onClick={() => setNewsFilter(!newsFilter)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  newsFilter ? 'bg-accent' : 'bg-dark-300'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  newsFilter ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>

          {/* Max Daily Loss */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <DollarSign className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white">Max Daily Loss</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-accent">${maxDailyLoss}</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={maxDailyLoss}
                  onChange={(e) => setMaxDailyLoss(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$0</span>
                  <span>$10,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* Max Loss Percent */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Percent className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white">Max Loss Percent</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-accent">{maxLossPercent}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={maxLossPercent}
                  onChange={(e) => setMaxLossPercent(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Max Drawdown */}
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-accent/10 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-white">Max Drawdown</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-accent">{maxDrawdown}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={maxDrawdown}
                  onChange={(e) => setMaxDrawdown(Number(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trading Hours */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white">Trading Hours</span>
                    <Info className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Only trade during active market hours
                  </p>
                </div>
                <button
                  onClick={() => {
                    setTradingHours(!tradingHours);
                    setShowSchedule(!tradingHours);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                    tradingHours ? 'bg-accent' : 'bg-dark-300'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    tradingHours ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>

            {showSchedule && (
              <div className="glass-panel rounded-xl p-4 space-y-4">
                {/* Timezone */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                             border border-dark-300/50 focus:outline-none focus:ring-1 
                             focus:ring-accent/50"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                {/* Trading Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                               border border-dark-300/50 focus:outline-none focus:ring-1 
                               focus:ring-accent/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">End Time</label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full bg-dark-200/50 text-white rounded-lg px-4 py-2.5
                               border border-dark-300/50 focus:outline-none focus:ring-1 
                               focus:ring-accent/50"
                    />
                  </div>
                </div>

                {/* Trading Days */}
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Trading Days</label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                          selectedDays.includes(day)
                            ? 'bg-accent text-white'
                            : 'bg-dark-200/50 text-gray-400 hover:text-white'
                        }`}
                      >
                        {day.slice(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="flex items-start space-x-3 p-4 bg-dark-200/30 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                These filters will automatically prevent trading when conditions are not met.
              </p>
              <p className="text-gray-400">
                Make sure to test your settings thoroughly before enabling them in live trading.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              className="premium-button flex-1 py-2.5"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-gray-400 hover:text-gray-300 
                       transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}