import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'list' | 'text' | 'chart';
  count?: number;
  className?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  type = 'text',
  count = 1,
  className = ''
}) => {
  const items = Array.from({ length: count });

  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl animate-shimmer" />
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 animate-shimmer" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/4 animate-shimmer" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-150 dark:bg-slate-800/80 rounded w-full animate-shimmer" />
              <div className="h-3 bg-slate-150 dark:bg-slate-800/80 rounded w-5/6 animate-shimmer" />
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-100 dark:border-slate-800/50">
              <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-1/4 animate-shimmer" />
              <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/6 animate-shimmer" />
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex justify-between">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-shimmer" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12 animate-shimmer" />
            </div>
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3 w-1/3">
                    <div className="h-8 w-8 bg-slate-200 dark:bg-slate-800 rounded-full animate-shimmer shrink-0" />
                    <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-2/3 animate-shimmer" />
                  </div>
                  <div className="h-3 bg-slate-150 dark:bg-slate-800/80 rounded w-1/6 animate-shimmer" />
                  <div className="h-3 bg-slate-150 dark:bg-slate-800/80 rounded w-1/6 animate-shimmer" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16 animate-shimmer" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="flex items-center space-x-3 py-3 border-b border-slate-100 dark:border-slate-800/50 last:border-none">
            <div className="h-9 w-9 bg-slate-200 dark:bg-slate-800 rounded-lg animate-shimmer shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-2/5 animate-shimmer" />
              <div className="h-2.5 bg-slate-100 dark:bg-slate-850 rounded w-3/5 animate-shimmer" />
            </div>
            <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-12 animate-shimmer shrink-0" />
          </div>
        );

      case 'chart':
        return (
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between h-[300px]">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 flex-1">
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4 animate-shimmer" />
                <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/6 animate-shimmer" />
              </div>
              <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-16 animate-shimmer" />
            </div>
            <div className="flex items-end justify-between h-44 pt-4 border-b border-slate-100 dark:border-slate-850">
              <div className="h-1/3 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
              <div className="h-2/3 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
              <div className="h-1/2 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
              <div className="h-3/4 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
              <div className="h-5/6 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
              <div className="h-2/5 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
              <div className="h-4/5 bg-slate-150 dark:bg-slate-800 rounded-t w-[8%] animate-shimmer" />
            </div>
            <div className="flex justify-between pt-2">
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-8 animate-shimmer" />
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-8 animate-shimmer" />
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-8 animate-shimmer" />
              <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded w-8 animate-shimmer" />
            </div>
          </div>
        );

      case 'text':
      default:
        return (
          <div className="space-y-2 py-1">
            <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-full animate-shimmer" />
            <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-11/12 animate-shimmer" />
            <div className="h-3.5 bg-slate-150 dark:bg-slate-800/80 rounded w-3/4 animate-shimmer" />
          </div>
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {items.map((_, i) => (
        <div key={i} className={i > 0 ? 'mt-4' : ''}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};
