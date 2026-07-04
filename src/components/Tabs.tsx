import React from 'react';
import type { LucideIcon } from 'lucide-react';

export interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
  variant?: 'underline' | 'pill';
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
  variant = 'underline'
}) => {
  return (
    <div className={`w-full ${className}`}>
      {variant === 'underline' ? (
        <div className="border-b border-slate-200 dark:border-slate-800">
          <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTab;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChange(tab.id)}
                  className={`group relative py-3 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 shrink-0 cursor-pointer transition-all outline-none ${
                    isActive
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400 font-semibold'
                      : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-350 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {Icon && (
                    <Icon className={`h-4.5 w-4.5 ${
                      isActive 
                        ? 'text-indigo-600 dark:text-indigo-450' 
                        : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400'
                    }`} />
                  )}
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-650 dark:bg-slate-800 dark:text-slate-400 group-hover:bg-slate-150'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      ) : (
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-xl space-x-1 max-w-max">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className={`py-1.5 px-3 rounded-lg text-xs md:text-sm font-medium flex items-center space-x-1.5 transition-all cursor-pointer outline-none ${
                  isActive
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-sm font-semibold'
                    : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/65 dark:text-indigo-400'
                      : 'bg-slate-200/50 dark:bg-slate-800/80 text-slate-505 dark:text-slate-450'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
