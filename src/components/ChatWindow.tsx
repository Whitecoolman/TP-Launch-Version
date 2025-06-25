import React, { useState } from 'react';
import { Send, MinimizeIcon } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatWindowProps {
  traderId: string;
  traderName: string;
  onMinimize: () => void;
}

export default function ChatWindow({ traderId, traderName, onMinimize }: ChatWindowProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: traderName, content: "Hey! Thanks for copying my trades.", timestamp: "10:30 AM" },
    { id: 2, sender: "You", content: "Happy to join! Your strategy looks promising.", timestamp: "10:31 AM" },
  ]);

  const avatarUrl = `https://images.unsplash.com/photo-${
    traderName === "Alex Trading" ? "1560250097-0b93528c311a" :
    traderName === "Pro Signals" ? "1573497019940-1c28c88b4f3e" :
    "1566492031773-4f4e44671857"
  }?auto=format&fit=crop&w=80&h=80`;

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: "You",
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setMessage('');
    }
  };

  return (
    <div className="glass-panel rounded-xl shadow-glass w-80 flex flex-col h-96">
      <div className="flex items-center justify-between bg-dark-200/50 p-3 rounded-t-xl border-b border-dark-300/50">
        <div className="flex items-center space-x-2">
          <img
            src={avatarUrl}
            alt={traderName}
            className="w-6 h-6 rounded-full border border-accent/20"
          />
          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
          <span className="font-medium text-white tracking-tight">{traderName}</span>
        </div>
        <button onClick={onMinimize} className="text-gray-400 hover:text-white transition-all duration-300">
          <MinimizeIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === "You" ? "items-end" : "items-start"}`}>
            <div className={`max-w-[80%] rounded-xl p-3 ${
              msg.sender === "You" 
                ? "bg-accent text-white" 
                : "bg-dark-200/50 text-gray-200 backdrop-blur-sm"
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-dark-300/50">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 bg-dark-200/50 text-gray-200 rounded-lg px-3 py-2 
                     border border-dark-300/50 backdrop-blur-sm
                     focus:outline-none focus:ring-1 focus:ring-accent/50
                     transition-all duration-300"
          />
          <button
            onClick={handleSend}
            className="premium-button p-2"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}