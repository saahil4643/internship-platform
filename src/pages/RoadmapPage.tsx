import React, { useState } from 'react';
import { ProgressBar } from '../components/ProgressBar';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2,
  Video,
  FileText,
  ExternalLink,
  TrendingUp,
  Award,
  Sparkles,
  BookOpen,
  Check
} from 'lucide-react';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface ResourceItem {
  id: string;
  title: string;
  type: 'video' | 'doc' | 'github' | 'article';
  url: string;
  durationOrSize: string;
  completed: boolean;
}

interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  resources: ResourceItem[];
}

const initialRoadmapData: { [key: string]: RoadmapTopic[] } = {
  beginner: [
    {
      id: 'bg_1',
      title: 'Vite + React 19 Core Architecture',
      description: 'Understand modern React 19 abstractions, component rendering cycles, state controls, and compiler fundamentals.',
      resources: [
        { id: 'res_b1', title: 'React 19 Hooks and Compile Optimizations', type: 'video', url: 'https://youtube.com', durationOrSize: '35 mins', completed: true },
        { id: 'res_b2', title: 'Vite Configuration Guidelines', type: 'doc', url: 'https://vite.dev', durationOrSize: '12 pages', completed: true },
        { id: 'res_b3', title: 'React State Management Patterns', type: 'article', url: 'https://react.dev', durationOrSize: '8 min read', completed: true },
        { id: 'res_b4', title: 'Vite React Boilerplate Codebase', type: 'github', url: 'https://github.com', durationOrSize: '15 files', completed: false }
      ]
    },
    {
      id: 'bg_2',
      title: 'TypeScript Type-Safety & Interfaces',
      description: 'Learn strict typing, generic bounds, utility types, and union-type mappings for robust applications.',
      resources: [
        { id: 'res_b5', title: 'TypeScript Generic Abstractions', type: 'video', url: 'https://youtube.com', durationOrSize: '45 mins', completed: true },
        { id: 'res_b6', title: 'TypeScript Cheat Sheet for React devs', type: 'article', url: 'https://typescriptlang.org', durationOrSize: '5 min read', completed: false }
      ]
    }
  ],
  intermediate: [
    {
      id: 'im_1',
      title: 'REST API & Scalable Database Models',
      description: 'Learn double-entry accounting models, indexing in PostgreSQL, transaction lock protocols, and JWT refreshes.',
      resources: [
        { id: 'res_i1', title: 'Database Design for Fintech APIs', type: 'video', url: 'https://youtube.com', durationOrSize: '1 hr 10 mins', completed: false },
        { id: 'res_i2', title: 'JWT Refresh Rotation Protocols', type: 'doc', url: 'https://jwt.io', durationOrSize: '8 pages', completed: true },
        { id: 'res_i3', title: 'Scalable PostgreSQL Indexing Specs', type: 'article', url: 'https://postgresql.org', durationOrSize: '15 min read', completed: false }
      ]
    },
    {
      id: 'im_2',
      title: 'State Orchestration & Side Effects',
      description: 'Manage complex business requirements using React Context, Redux slices, custom hooks, and memoization rules.',
      resources: [
        { id: 'res_i4', title: 'React Custom Hooks & Render Audits', type: 'video', url: 'https://youtube.com', durationOrSize: '50 mins', completed: false },
        { id: 'res_i5', title: 'Handling Concurrency with TanStack Query', type: 'article', url: 'https://tanstack.com', durationOrSize: '10 min read', completed: false }
      ]
    }
  ],
  advanced: [
    {
      id: 'ad_1',
      title: 'Dockerizing & AWS ECS Deployment Pipelines',
      description: 'Write multi-stage Dockerfiles, set up load balancers, orchestrate ECS tasks, and secure API gateways.',
      resources: [
        { id: 'res_a1', title: 'Multi-stage Docker Builds for Vite/React', type: 'video', url: 'https://youtube.com', durationOrSize: '25 mins', completed: false },
        { id: 'res_a2', title: 'Deploying Node APIs to AWS ECS clusters', type: 'doc', url: 'https://aws.amazon.com', durationOrSize: '24 pages', completed: false },
        { id: 'res_a3', title: 'Secure CI/CD using GitHub Actions', type: 'github', url: 'https://github.com', durationOrSize: 'yaml spec', completed: false }
      ]
    },
    {
      id: 'ad_2',
      title: 'WebSockets & Real-time Telemetry Data',
      description: 'Implement secure websocket handshakes, Redis stream Pub/Sub caching, and client event-reconnect logic.',
      resources: [
        { id: 'res_a4', title: 'Event-driven Architectures with Socket.io', type: 'video', url: 'https://youtube.com', durationOrSize: '1 hr 5 mins', completed: false },
        { id: 'res_a5', title: 'Websocket connection pool optimization', type: 'article', url: 'https://socket.io', durationOrSize: '12 min read', completed: false }
      ]
    }
  ]
};

export const RoadmapPage: React.FC = () => {
  const [levelTab, setLevelTab] = useState('beginner');
  const [roadmapData, setRoadmapData] = useState(initialRoadmapData);

  const levelTabs = [
    { id: 'beginner', label: 'Beginner Foundations' },
    { id: 'intermediate', label: 'Intermediate Engineering' },
    { id: 'advanced', label: 'Advanced Cloud & DevOps' }
  ];

  // Calculate percentage of level completion
  const calculateLevelProgress = (level: string) => {
    const topics = roadmapData[level];
    if (!topics || topics.length === 0) return 0;
    
    let totalResources = 0;
    let completedResources = 0;

    topics.forEach(t => {
      t.resources.forEach(r => {
        totalResources++;
        if (r.completed) completedResources++;
      });
    });

    return totalResources === 0 ? 0 : Math.round((completedResources / totalResources) * 100);
  };

  // Calculate overall program completion (all levels)
  const calculateOverallProgress = () => {
    let total = 0;
    let completed = 0;

    Object.keys(roadmapData).forEach(level => {
      roadmapData[level].forEach(t => {
        t.resources.forEach(r => {
          total++;
          if (r.completed) completed++;
        });
      });
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  const handleToggleResource = (level: string, topicId: string, resourceId: string) => {
    setRoadmapData(prev => {
      const updatedLevelTopics = prev[level].map(topic => {
        if (topic.id === topicId) {
          const updatedResources = topic.resources.map(res => {
            if (res.id === resourceId) {
              return { ...res, completed: !res.completed };
            }
            return res;
          });
          return { ...topic, resources: updatedResources };
        }
        return topic;
      });
      return { ...prev, [level]: updatedLevelTopics };
    });
  };

  const overallProgress = calculateOverallProgress();

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between p-6 md:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl border border-white/5 shadow-xl relative overflow-hidden">
        {/* Floating background decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[90px] animate-pulse-soft pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] animate-float-slower pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] uppercase font-bold tracking-wider text-indigo-300">
            <Sparkles className="h-3 w-3" />
            <span>Curriculum Board</span>
          </span>
          <h1 className="text-xl md:text-3xl font-extrabold font-heading tracking-tight">Interactive Engineering Syllabus</h1>
          <p className="text-xs md:text-sm text-indigo-200/90 max-w-xl font-light leading-relaxed">
            Follow our structured curriculum to master industry-grade frontend, backend, and cloud architectures.
          </p>
        </div>

        {/* Progress summary widget */}
        <div className="mt-6 lg:mt-0 w-full lg:w-64 bg-white/5 border border-white/10 rounded-2xl p-4.5 relative z-10 space-y-2.5 backdrop-blur-md">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-indigo-250">Overall Syllabus Progress</span>
            <span className="text-white font-bold">{overallProgress}%</span>
          </div>
          <ProgressBar value={overallProgress} color="success" size="sm" />
          <span className="text-[9px] text-indigo-300 font-bold block pt-0.5 flex items-center">
            <Award className="h-3.5 w-3.5 mr-1 text-yellow-400" /> Finish all modules to claim certification
          </span>
        </div>
      </div>

      {/* Tabs list */}
      <div className="space-y-4">
        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800 rounded-2xl max-w-max space-x-1 relative">
          {levelTabs.map((tab) => {
            const isActive = tab.id === levelTab;
            const progress = calculateLevelProgress(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setLevelTab(tab.id)}
                className={`py-2.5 px-4 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer outline-none flex items-center space-x-2 relative z-10 ${
                  isActive
                    ? 'text-indigo-650 dark:text-indigo-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-450 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeRoadmapTabHighlight"
                    className="absolute inset-0 bg-white dark:bg-slate-800 rounded-xl shadow-sm -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                  isActive 
                    ? 'bg-indigo-50 text-indigo-650 dark:bg-indigo-950/60 dark:text-indigo-400' 
                    : 'bg-slate-250/50 dark:bg-slate-850 text-slate-500'
                }`}>
                  {progress}%
                </span>
              </button>
            );
          })}
        </div>

        {/* Level Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Syllabus Flow */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={levelTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {roadmapData[levelTab].map((topic) => {
                  const completedCount = topic.resources.filter(r => r.completed).length;
                  return (
                    <div key={topic.id} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 shadow-premium">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="text-sm md:text-base font-extrabold text-slate-800 dark:text-white flex items-center">
                            <BookOpen className="h-4.5 w-4.5 mr-2 text-indigo-500" />
                            {topic.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                            {topic.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 dark:bg-slate-950 px-2 py-1 rounded-xl border border-slate-100 dark:border-slate-850 shrink-0">
                          {completedCount} / {topic.resources.length} Done
                        </span>
                      </div>

                      {/* Resources checklist */}
                      <div className="divide-y divide-slate-100 dark:divide-slate-850 pt-2 border-t border-slate-50 dark:border-slate-850">
                        {topic.resources.map((res) => {
                          const getIcon = (type: string) => {
                            switch (type) {
                              case 'video': return Video;
                              case 'github': return GithubIcon;
                              default: return FileText;
                            }
                          };
                          const Icon = getIcon(res.type);

                          return (
                            <div
                              key={res.id}
                              onClick={() => handleToggleResource(levelTab, topic.id, res.id)}
                              className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/40 dark:hover:bg-slate-850/20 px-2.5 rounded-xl transition-colors first:mt-1 group"
                            >
                              <div className="flex items-center space-x-3.5 min-w-0">
                                {/* Checkbox with animation */}
                                <div className={`h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:scale-105 ${
                                  res.completed
                                    ? 'bg-emerald-500 border-emerald-500 text-white'
                                    : 'border-slate-300 dark:border-slate-700 hover:border-slate-450 dark:hover:border-slate-550'
                                }`}>
                                  {res.completed && <Check className="h-3 w-3 stroke-[3]" />}
                                </div>

                                {/* Resource label */}
                                <div className="min-w-0">
                                  <p className={`text-xs font-semibold truncate transition-colors ${
                                    res.completed
                                      ? 'text-slate-400 line-through dark:text-slate-500'
                                      : 'text-slate-850 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
                                  }`}>
                                    {res.title}
                                  </p>
                                  <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 capitalize mt-0.5 font-medium">
                                    <Icon className="h-3 w-3" />
                                    <span>{res.type}</span>
                                    <span>•</span>
                                    <span>{res.durationOrSize}</span>
                                  </div>
                                </div>
                              </div>

                              <a
                                href={res.url}
                                target="_blank"
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-slate-400 hover:text-indigo-650 dark:hover:text-indigo-400 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar level information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm space-y-4 shadow-premium">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Level Competencies
              </h3>
              <div className="space-y-3.5 text-xs text-slate-650 dark:text-slate-350">
                {levelTab === 'beginner' && (
                  <>
                    <p className="leading-relaxed font-light">Beginner Foundations establishes baseline programming discipline:</p>
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Functional React Hooks & Lifecycle</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Strict TypeScript Types & Schemas</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Responsive layouts using Tailwind CSS</span>
                      </div>
                    </div>
                  </>
                )}
                {levelTab === 'intermediate' && (
                  <>
                    <p className="leading-relaxed font-light">Intermediate Engineering addresses database schemas and backend concurrency APIs:</p>
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>PostgreSQL double-entry schema design</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Active Session store caching in Redis</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>JWT Authentication & Refresh rotation</span>
                      </div>
                    </div>
                  </>
                )}
                {levelTab === 'advanced' && (
                  <>
                    <p className="leading-relaxed font-light">Advanced DevOps ensures applications are deployment-ready and monitored:</p>
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Multi-stage secure Docker configs</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>GitHub Actions CI/CD orchestration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Websocket telemetry feeds and graphs</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm text-xs text-slate-500 dark:text-slate-400 flex items-start space-x-2.5 shadow-premium">
              <TrendingUp className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5 animate-pulse" />
              <p className="leading-normal font-light">
                Roadmap completion rates contribute <span className="font-semibold text-slate-800 dark:text-slate-200">20%</span> towards your weekly evaluation score. Keep learning!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
