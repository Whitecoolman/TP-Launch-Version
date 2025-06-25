import React from 'react';
import { Check } from 'lucide-react';

interface WebhookColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

const gradientOptions = [
  { 
    id: 'blue', 
    name: 'Blue Ocean', 
    value: 'from-blue-500/20 via-blue-600/10 to-blue-500/5',
    previewClass: 'bg-gradient-to-br from-blue-500/60 via-blue-600/40 to-blue-500/20'
  },
  { 
    id: 'purple', 
    name: 'Purple Haze', 
    value: 'from-purple-500/20 via-purple-600/10 to-purple-500/5',
    previewClass: 'bg-gradient-to-br from-purple-500/60 via-purple-600/40 to-purple-500/20'
  },
  { 
    id: 'emerald', 
    name: 'Emerald Forest', 
    value: 'from-emerald-500/20 via-emerald-600/10 to-emerald-500/5',
    previewClass: 'bg-gradient-to-br from-emerald-500/60 via-emerald-600/40 to-emerald-500/20'
  },
  { 
    id: 'amber', 
    name: 'Amber Glow', 
    value: 'from-amber-500/20 via-amber-600/10 to-amber-500/5',
    previewClass: 'bg-gradient-to-br from-amber-500/60 via-amber-600/40 to-amber-500/20'
  },
  { 
    id: 'rose', 
    name: 'Rose Garden', 
    value: 'from-rose-500/20 via-rose-600/10 to-rose-500/5',
    previewClass: 'bg-gradient-to-br from-rose-500/60 via-rose-600/40 to-rose-500/20'
  },
  { 
    id: 'accent', 
    name: 'Accent Default', 
    value: 'from-accent/20 via-purple-500/10 to-accent/5',
    previewClass: 'bg-gradient-to-br from-accent/60 via-purple-500/40 to-accent/20'
  },
  { 
    id: 'red', 
    name: 'Ruby Red', 
    value: 'from-red-500/20 via-red-600/10 to-red-500/5',
    previewClass: 'bg-gradient-to-br from-red-500/60 via-red-600/40 to-red-500/20'
  },
  { 
    id: 'teal', 
    name: 'Teal Waves', 
    value: 'from-teal-500/20 via-teal-600/10 to-teal-500/5',
    previewClass: 'bg-gradient-to-br from-teal-500/60 via-teal-600/40 to-teal-500/20'
  }
];

export default function WebhookColorPicker({ selectedColor, onColorSelect }: WebhookColorPickerProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {gradientOptions.map((gradient) => (
        <button
          key={gradient.id}
          onClick={() => onColorSelect(gradient.value)}
          className="relative w-10 h-10 rounded-lg transition-transform hover:scale-110 
                   focus:outline-none focus:ring-2 focus:ring-white/20"
          title={gradient.name}
        >
          <div className={`absolute inset-0 rounded-lg ${gradient.previewClass}`}></div>
          {selectedColor === gradient.value && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Check className="h-5 w-5 text-white drop-shadow-lg" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}