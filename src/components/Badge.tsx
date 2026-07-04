import React from 'react';

type BadgeType = 
  | 'pending' 
  | 'in_progress' 
  | 'under_review' 
  | 'completed'
  | 'high' 
  | 'medium' 
  | 'low'
  | 'active' 
  | 'suspended'
  | 'planning'
  | 'processing'
  | 'paid'
  | 'unpaid'
  | 'not_applicable'
  | 'general'
  | 'projects'
  | 'internship'
  | 'events'
  | 'deadlines'
  | 'task_assigned'
  | 'deadline_reminder'
  | 'task_reviewed'
  | 'announcement'
  | 'doc_update';

interface BadgeProps {
  type: BadgeType | string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  const getBadgeStyle = (t: string) => {
    switch (t.toLowerCase()) {
      // Task & Request Statuses
      case 'pending':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      case 'in_progress':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300 border-sky-100 dark:border-sky-900/50';
      case 'under_review':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 border-indigo-100 dark:border-indigo-900/50';
      case 'completed':
      case 'paid':
      case 'active':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/50';
      
      // Priorities
      case 'high':
      case 'suspended':
      case 'rejected':
      case 'unpaid':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 border-rose-100 dark:border-rose-900/50';
      case 'medium':
      case 'changes_requested':
      case 'processing':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border-amber-100 dark:border-amber-900/50';
      case 'low':
      case 'planning':
      case 'not_applicable':
        return 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300 border-violet-100 dark:border-violet-900/50';
      
      // Categories / Notifications
      case 'general':
      case 'doc_update':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700';
      case 'projects':
      case 'task_assigned':
        return 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-100 dark:border-blue-900/50';
      case 'internship':
        return 'bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300 border-teal-100 dark:border-teal-900/50';
      case 'events':
      case 'task_reviewed':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-300 border-purple-100 dark:border-purple-900/50';
      case 'deadlines':
      case 'deadline_reminder':
      case 'announcement':
        return 'bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950/40 dark:text-fuchsia-300 border-fuchsia-100 dark:border-fuchsia-900/50';
      
      default:
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800/60 dark:text-slate-300 border-slate-200 dark:border-slate-800';
    }
  };

  const getLabel = (t: string) => {
    return t.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(type)} ${className}`}>
      {getLabel(type)}
    </span>
  );
};
