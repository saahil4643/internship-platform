import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { SearchBox } from '../components/SearchBox';
import {
  Calendar,
  FileText,
  Download,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Pin
} from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const { announcements } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Notices' },
    { id: 'general', label: 'General' },
    { id: 'project', label: 'Projects' },
    { id: 'event', label: 'Events' }
  ];

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ann.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ann.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-805 dark:text-white">Announcements & Notices</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Stay updated with program schedules and guidelines.</p>
        </div>

        <SearchBox
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search announcements..."
          className="w-full sm:w-64 shrink-0"
        />
      </div>

      {/* Categories Tabs & Layout */}
      <div className="space-y-4">
        <div className="flex overflow-x-auto pb-1 gap-2 border-b border-slate-100 dark:border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`pb-2.5 px-3 text-xs font-semibold whitespace-nowrap border-b-2 cursor-pointer outline-none transition-all ${
                categoryFilter === cat.id
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-805 dark:text-slate-450 dark:hover:text-slate-205'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Notices Cards */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <AlertCircle className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500 mb-2" />
              <h4 className="text-xs font-semibold text-slate-850 dark:text-slate-200">No announcements found</h4>
              <p className="text-[11px] text-slate-550 dark:text-slate-450 mt-1 max-w-xs mx-auto">
                No active announcements match your search parameters. Try resetting filters.
              </p>
            </div>
          ) : (
            filteredAnnouncements.map((ann) => {
              const isExpanded = expandedId === ann.id;
              return (
                <div
                  key={ann.id}
                  className={`bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all overflow-hidden ${
                    isExpanded 
                      ? 'border-indigo-500/20 dark:border-indigo-500/15 ring-2 ring-indigo-500/5' 
                      : 'border-slate-202 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700/80'
                  }`}
                >
                  {/* Card Header clickable to expand */}
                  <div
                    onClick={() => toggleExpand(ann.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center space-x-2">
                        <Badge type={ann.category} className="scale-90 origin-left" />
                        <span className="text-[10px] text-slate-400 flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" /> {ann.date}
                        </span>
                        {ann.id === 'ann_1' && (
                          <span className="text-[9px] font-bold text-indigo-650 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 px-1.5 py-0.2 rounded flex items-center">
                            <Pin className="h-2.5 w-2.5 mr-0.5 rotate-[30deg]" /> Pinned
                          </span>
                        )}
                      </div>
                      <h3 className="text-xs md:text-sm font-bold text-slate-800 dark:text-white truncate">
                        {ann.title}
                      </h3>
                      <p className={`text-xs text-slate-500 dark:text-slate-400 leading-relaxed ${
                        isExpanded ? '' : 'line-clamp-2'
                      }`}>
                        {ann.description}
                      </p>
                    </div>

                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded transition-colors mt-1 shrink-0">
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Expanded attachments & details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 dark:border-slate-850/60 bg-slate-50/30 dark:bg-slate-950/10 space-y-4">
                      {ann.attachments ? (
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-550 block">
                            Attachments ({ann.attachments.length})
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {ann.attachments.map((file, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 text-xs"
                              >
                                <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                                  <FileText className="h-4.5 w-4.5 text-slate-450 shrink-0" />
                                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                                    {file.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400 shrink-0">({file.size})</span>
                                </div>
                                <a
                                  href={file.url}
                                  className="text-indigo-650 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-305 p-1 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shrink-0"
                                  title="Download File"
                                  download
                                >
                                  <Download className="h-4.5 w-4.5" />
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-400 italic">No files attached to this announcement.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
