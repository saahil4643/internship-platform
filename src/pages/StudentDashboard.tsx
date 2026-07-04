import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { WeeklyProgressChart, TaskStatusPieChart } from '../components/Charts';
import { useNavigate } from 'react-router-dom';
import {
  Folder,
  CheckCircle2,
  Clock,
  Award,
  Calendar,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentStudent, projects, tasks, announcements, notifications } = useApp();
  const navigate = useNavigate();

  // Get active project
  const activeProject = projects.find(p => p.id === currentStudent.currentProjectId);
  
  // Calculate task counts for logged-in student
  const studentTasks = tasks.filter(t => t.assigneeId === currentStudent.id);
  const pendingTasks = studentTasks.filter(t => t.status === 'pending');
  const inProgressTasks = studentTasks.filter(t => t.status === 'in_progress');
  const underReviewTasks = studentTasks.filter(t => t.status === 'under_review');
  const completedTasks = studentTasks.filter(t => t.status === 'completed');

  // Upcoming deadlines (tasks due in future, sorted by date)
  const upcomingDeadlines = studentTasks
    .filter(t => t.status !== 'completed' && new Date(t.deadline) >= new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  // Recent announcements (limit 2)
  const recentAnnouncements = announcements.slice(0, 2);

  // Recent activities (from notifications, limit 3)
  const recentActivities = notifications.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm relative overflow-hidden">
        <div className="space-y-1.5 relative z-10">
          <h1 className="text-xl md:text-2xl font-bold text-slate-850 dark:text-white">
            Welcome back, {currentStudent.name}! 👋
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Here's what's happening with your internship. You have <span className="font-semibold text-indigo-650 dark:text-indigo-400">{inProgressTasks.length} tasks in progress</span>.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3 relative z-10">
          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-indigo-650 hover:bg-indigo-500 rounded-xl transition-all cursor-pointer active:scale-95"
          >
            <span>View Tasks</span>
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI: Performance Score */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Award className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Performance</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{currentStudent.performanceScore}%</h3>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-450 font-semibold">Excellent grade</span>
          </div>
        </div>

        {/* KPI: In Progress Tasks */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-xl flex items-center justify-center text-sky-650 dark:text-sky-400 shrink-0">
            <Clock className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">In Progress Tasks</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{inProgressTasks.length} Tasks</h3>
            <span className="text-[9px] text-slate-400 font-semibold">{pendingTasks.length} pending start</span>
          </div>
        </div>

        {/* KPI: Completed Tasks */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <CheckCircle2 className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Completed Tasks</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{completedTasks.length} Tasks</h3>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-450 font-semibold">{underReviewTasks.length} under review</span>
          </div>
        </div>

        {/* KPI: Duration */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-purple-50 dark:bg-purple-950/40 rounded-xl flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
            <Calendar className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Internship Duration</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{currentStudent.durationWeeks} Weeks</h3>
            <span className="text-[9px] text-slate-400 font-semibold">Active enrollment</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Weekly Performance Growth</h3>
              <p className="text-[11px] text-slate-400">Weekly evaluation trends vs. batch standard average.</p>
            </div>
            <span className="text-xs font-semibold text-indigo-650 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-0.5 rounded-md">
              Score: {currentStudent.performanceScore}%
            </span>
          </div>
          <WeeklyProgressChart />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-855 dark:text-white mb-1">Task Completion Ratio</h3>
          <p className="text-[11px] text-slate-400 mb-3">Status breakdown of your assigned tasks.</p>
          <TaskStatusPieChart
            completed={completedTasks.length}
            inProgress={inProgressTasks.length}
            underReview={underReviewTasks.length}
            pending={pendingTasks.length}
          />
        </div>
      </div>

      {/* Project & Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Active Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
                  <Folder className="h-4.5 w-4.5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Current Assigned Project
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">Explore active repository and tasks.</p>
              </div>
              {activeProject && (
                <Badge type={activeProject.status} />
              )}
            </div>

            {activeProject ? (
              <div className="space-y-5">
                <div>
                  <h4 className="text-base font-bold text-slate-850 dark:text-white hover:text-indigo-600 transition-colors cursor-pointer" onClick={() => navigate('/projects')}>
                    {activeProject.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {activeProject.skillsRequired.map((s, idx) => (
                    <span key={idx} className="bg-slate-100 dark:bg-slate-800/85 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded-lg text-[10px] font-semibold border border-slate-150/40 dark:border-slate-750">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-500">Project Progress</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{activeProject.progress}% Completed</span>
                  </div>
                  <ProgressBar value={activeProject.progress} color="primary" size="md" />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] text-slate-400">Timeline:</span>
                    <span className="text-xs font-medium text-slate-650 dark:text-slate-300">
                      {new Date(activeProject.startDate).toLocaleDateString()} - {new Date(activeProject.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate('/projects')}
                    className="text-xs font-bold text-indigo-650 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-305 flex items-center cursor-pointer"
                  >
                    <span>Project Specs</span>
                    <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-850 rounded-xl bg-slate-50/40 dark:bg-slate-950/20">
                <AlertCircle className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500 mb-2" />
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">No project assigned</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-450 mt-1 max-w-xs mx-auto">
                  Your coordinator has not assigned you to an active project. Contact management.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Deadlines, Announcements, Activities */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
              Upcoming Deadlines
            </h3>
            {upcomingDeadlines.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No pending deadlines. Good job!</p>
            ) : (
              <div className="space-y-3">
                {upcomingDeadlines.map(t => (
                  <div
                    key={t.id}
                    onClick={() => navigate('/tasks')}
                    className="flex justify-between items-center p-3 rounded-xl border border-slate-150/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors cursor-pointer"
                  >
                    <div className="space-y-0.5 min-w-0 pr-2">
                      <h4 className="text-xs font-semibold text-slate-800 dark:text-white truncate">{t.title}</h4>
                      <p className="text-[10px] text-slate-400 truncate">{t.projectName}</p>
                    </div>
                    <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950/30 px-2 py-0.5 rounded shrink-0">
                      Due {new Date(t.deadline).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Announcements */}
          <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                Announcements
              </h3>
              <button
                onClick={() => navigate('/announcements')}
                className="text-[10px] text-indigo-650 hover:underline dark:text-indigo-400 font-semibold cursor-pointer"
              >
                View all
              </button>
            </div>
            <div className="space-y-3">
              {recentAnnouncements.map(ann => (
                <div key={ann.id} className="space-y-1.5 p-3 rounded-xl bg-slate-50/50 dark:bg-slate-950/10 border border-slate-100 dark:border-slate-800/40">
                  <div className="flex justify-between items-center">
                    <Badge type={ann.category} className="scale-90 origin-left" />
                    <span className="text-[9px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-800 dark:text-white">{ann.title}</h4>
                  <p className="text-[11px] text-slate-550 dark:text-slate-400 line-clamp-2">
                    {ann.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities timeline */}
          <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-3">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivities.map(act => (
                <div key={act.id} className="flex space-x-2.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  <div className="w-1 bg-indigo-500 rounded-full shrink-0 my-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-white">{act.title}:</span>{' '}
                    <span>{act.description}</span>
                    <span className="block text-[9px] text-slate-400 mt-0.5">
                      {new Date(act.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
