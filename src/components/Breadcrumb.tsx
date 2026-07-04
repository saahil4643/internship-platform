import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center space-x-1.5 text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 ${className}`}>
      <span className="flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
        <Home className="h-3.5 w-3.5" />
      </span>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="h-3 w-3 text-slate-400 shrink-0" />
          {idx === items.length - 1 ? (
            <span className="text-slate-900 dark:text-slate-100 font-semibold truncate max-w-[120px] md:max-w-xs">
              {item.label}
            </span>
          ) : (
            <button
              onClick={item.onClick}
              className="hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer outline-none focus:text-slate-800"
            >
              {item.label}
            </button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
