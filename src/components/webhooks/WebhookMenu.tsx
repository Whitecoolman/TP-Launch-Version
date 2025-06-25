import React from 'react';
import { 
  Edit2, Palette, Trash2, DollarSign, 
  Shield, LayoutGrid, AlertTriangle, TrendingUp
} from 'lucide-react';

interface WebhookMenuProps {
  onEdit: () => void;
  onChangeColor: () => void;
  onDelete: () => void;
  onSetPrice: () => void;
  onManageRisk: () => void;
  onManageApps: () => void;
  onOpenTrade?: () => void;
  isPublic: boolean;
}

export default function WebhookMenu({ 
  onEdit, 
  onChangeColor, 
  onDelete, 
  onSetPrice,
  onManageRisk,
  onManageApps,
  onOpenTrade,
  isPublic 
}: WebhookMenuProps) {
  return (
    <div className="absolute right-2 top-2 bg-dark-200/95 rounded-lg border border-dark-300/50 
                    shadow-xl backdrop-blur-xl p-1 z-10">
      <button
        onClick={onEdit}
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Edit2 className="h-4 w-4" />
        <span>Edit webhook</span>
      </button>
      
      <button
        onClick={onChangeColor}
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Palette className="h-4 w-4" />
        <span>Change color</span>
      </button>

      <button
        onClick={onManageRisk}
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Shield className="h-4 w-4" />
        <span>Risk Management</span>
      </button>

      <button
        onClick={onManageApps}
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-300
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <LayoutGrid className="h-4 w-4" />
        <span>Connected Apps</span>
      </button>

      {onOpenTrade && (
        <button
          onClick={onOpenTrade}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-emerald-400
                   hover:bg-dark-300/50 rounded-lg transition-colors"
        >
          <TrendingUp className="h-4 w-4" />
          <span>Open Trade</span>
        </button>
      )}

      {isPublic && (
        <button
          onClick={onSetPrice}
          className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-emerald-400
                   hover:bg-dark-300/50 rounded-lg transition-colors"
        >
          <DollarSign className="h-4 w-4" />
          <span>Set Price</span>
        </button>
      )}
      
      <button
        onClick={onDelete}
        className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-red-400
                 hover:bg-dark-300/50 rounded-lg transition-colors"
      >
        <Trash2 className="h-4 w-4" />
        <span>Delete</span>
      </button>
    </div>
  );
}