import React from 'react';
import { Check, Dot } from 'lucide-react';

export interface TimelineStep {
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, className = '' }) => {
  return (
    <div className={`flow-root ${className}`}>
      <ul className="-mb-8">
        {steps.map((step, idx) => (
          <li key={idx}>
            <div className="relative pb-8">
              {/* Connector line */}
              {idx !== steps.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-800"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3.5">
                {/* Node icon */}
                <div>
                  {step.status === 'completed' ? (
                    <span className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900">
                      <Check className="h-4 w-4 stroke-[3]" />
                    </span>
                  ) : step.status === 'current' ? (
                    <span className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center ring-4 ring-white dark:ring-slate-900 animate-pulse">
                      <Dot className="h-6 w-6 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center justify-center ring-4 ring-white dark:ring-slate-900">
                      <span className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600" />
                    </span>
                  )}
                </div>
                {/* Node description */}
                <div className="flex-1 min-w-0 pt-1.5">
                  <div className="flex justify-between items-baseline space-x-2">
                    <p className={`text-sm font-semibold ${
                      step.status === 'upcoming' 
                        ? 'text-slate-400 dark:text-slate-500' 
                        : 'text-slate-900 dark:text-slate-100'
                    }`}>
                      {step.title}
                    </p>
                    <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                      {step.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
