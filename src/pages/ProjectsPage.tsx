import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { Tabs } from '../components/Tabs';
import {
  ArrowLeft,
  Calendar,
  Code2,
  ExternalLink,
  Compass,
  CheckCircle,
  FileText,
  Video,
  Layout,
  Clock
} from 'lucide-react';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const ProjectsPage: React.FC = () => {
  const { projects, students } = useApp();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const selectedProject = projects.find(p => p.id === selectedProjectId);

  const handleBackToList = () => {
    setSelectedProjectId(null);
    setActiveTab('overview');
  };

  const getTeammates = (memberIds: string[]) => {
    return students.filter(s => memberIds.includes(s.id));
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Compass },
    { id: 'milestones', label: 'Milestones & Tasks', icon: CheckCircle },
    { id: 'resources', label: 'Resources & Reference', icon: FileText }
  ];

  // RENDER PROJECT DETAILS PAGE
  if (selectedProject) {
    const teammates = getTeammates(selectedProject.teamMembers);
    return (
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Back navigation & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <button
            onClick={handleBackToList}
            className="flex items-center space-x-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Projects List</span>
          </button>
          <div className="flex items-center space-x-2">
            <Badge type={selectedProject.status} />
            <span className="text-xs text-slate-400">
              Start: {new Date(selectedProject.startDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Project Header Card */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
              {selectedProject.domain}
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-850 dark:text-white mt-1">
              {selectedProject.name}
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl">
              {selectedProject.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {selectedProject.repositoryUrl && (
              <a
                href={selectedProject.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-450 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Repository</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {selectedProject.deploymentUrl && (
              <a
                href={selectedProject.deploymentUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-xs text-indigo-650 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-305 transition-colors border border-indigo-100 dark:border-indigo-900/40 px-3.5 py-1.5 rounded-xl bg-indigo-50/20 dark:bg-indigo-950/10"
              >
                <Code2 className="h-4 w-4" />
                <span>Live Demo Sandbox</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-slate-500">Overall Completion progress</span>
              <span className="text-indigo-600 dark:text-indigo-400">{selectedProject.progress}%</span>
            </div>
            <ProgressBar value={selectedProject.progress} size="md" />
          </div>
        </div>

        {/* Tab section */}
        <div className="space-y-4">
          <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} variant="underline" />

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Detailed specs */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">Project Scope & Guidelines</h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-3 leading-relaxed">
                    <p>{selectedProject.overview}</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200 mt-4">Key Constraints:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>All REST endpoints must adhere to proper HTTP methods and status codes.</li>
                      <li>Write automated unit tests to achieve above 85% test coverage.</li>
                      <li>Deploy components using secure environment variables. No secrets committed to git.</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Audit History / Timeline</h3>
                  <div className="relative border-l border-slate-100 dark:border-slate-800 pl-4 ml-1 space-y-6">
                    {selectedProject.timeline.map((evt, idx) => (
                      <div key={idx} className="relative text-xs">
                        {/* Dot marker */}
                        <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-slate-900" />
                        <span className="font-semibold text-slate-400 block mb-0.5">{evt.date}</span>
                        <p className="text-slate-800 dark:text-slate-200 font-medium">{evt.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Team details */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                    Team Members ({teammates.length})
                  </h3>
                  {teammates.length === 0 ? (
                    <p className="text-xs text-slate-400">No students assigned to this project yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {teammates.map(student => (
                        <div key={student.id} className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-850/60 transition-colors">
                          <img
                            className="h-8.5 w-8.5 rounded-full object-cover border border-slate-150"
                            src={student.avatar}
                            alt="avatar"
                          />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-semibold text-slate-805 dark:text-white truncate">{student.name}</h4>
                            <p className="text-[10px] text-slate-400 truncate">{student.college}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3.5">
                  <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                    Expected Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.skillsRequired.map((s, idx) => (
                      <span key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-150/60 dark:border-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded text-[10px] font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-sm font-bold text-slate-805 dark:text-white">Project Milestones</h3>
                <span className="text-xs text-slate-400">Checkbox shows coordinator approval.</span>
              </div>

              <div className="divide-y divide-slate-150 dark:divide-slate-800/60">
                {selectedProject.milestones.map((ms) => (
                  <div key={ms.id} className="py-4.5 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
                    <div className="flex space-x-3">
                      <div className={`mt-0.5 h-4.5 w-4.5 rounded-full flex items-center justify-center shrink-0 border ${
                        ms.status === 'completed' 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {ms.status === 'completed' && <CheckCircle className="h-4 w-4 stroke-[3]" />}
                      </div>
                      <div className="space-y-0.5">
                        <p className={`text-xs font-semibold ${
                          ms.status === 'completed' 
                            ? 'text-slate-500 line-through dark:text-slate-450' 
                            : 'text-slate-800 dark:text-slate-100'
                        }`}>
                          {ms.title}
                        </p>
                        <p className="text-[10px] text-slate-400 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" /> Due by {new Date(ms.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge type={ms.status} className="scale-90" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RESOURCES */}
          {activeTab === 'resources' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Resource Center</h3>
              <p className="text-xs text-slate-400">Curated materials, documentations, and design references.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {selectedProject.resources.map((res) => {
                  const getIcon = (type: string) => {
                    switch (type) {
                      case 'video': return Video;
                      case 'design': return Layout;
                      case 'api': return Code2;
                      default: return FileText;
                    }
                  };
                  const Icon = getIcon(res.type);

                  return (
                    <a
                      key={res.id}
                      href={res.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-800/80 rounded-xl hover:border-indigo-500/20 hover:bg-slate-50/40 dark:hover:bg-slate-850/30 transition-all group"
                    >
                      <div className="flex items-center space-x-3.5 min-w-0">
                        <div className="h-9 w-9 bg-slate-50 dark:bg-slate-850 text-slate-500 dark:text-slate-400 rounded-lg flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-750">
                          <Icon className="h-4.5 w-4.5 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-slate-800 dark:text-white truncate group-hover:text-indigo-600 transition-colors">
                            {res.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 capitalize">{res.type} {res.durationOrSize ? `• ${res.durationOrSize}` : ''}</span>
                        </div>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // RENDER PROJECT LIST PAGE
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">Active Internship Projects</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Explore tasks, documentations, and team resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const teammates = getTeammates(project.teamMembers);
          return (
            <div
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className="bg-white dark:bg-slate-900 border border-slate-202 hover:border-indigo-500/25 dark:border-slate-800 dark:hover:border-indigo-500/15 rounded-2xl p-5.5 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between h-[280px] group active:scale-[0.99]"
            >
              <div className="space-y-3.5">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                    {project.domain}
                  </span>
                  <Badge type={project.status} />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <ProgressBar value={project.progress} size="sm" />
                </div>

                {/* Footer details: Team + Timeline */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/50 pt-3">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span className="text-[10px] text-slate-400 font-medium">
                      Ends {new Date(project.endDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Teammates avatars */}
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {teammates.map(student => (
                      <img
                        key={student.id}
                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-slate-900 object-cover"
                        src={student.avatar}
                        alt="avatar"
                        title={student.name}
                      />
                    ))}
                    {teammates.length === 0 && (
                      <span className="text-[9px] text-slate-400 italic">Unassigned</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
