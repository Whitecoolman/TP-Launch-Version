import React, { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 
                    text-sm text-white bg-dark-100/95 rounded-lg shadow-xl 
                    border border-dark-300/50 backdrop-blur-xl
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300
                    pointer-events-none whitespace-nowrap z-50">
        {content}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 
                      border-4 border-transparent border-t-dark-100/95"></div>
      </div>
    </div>
  );
}