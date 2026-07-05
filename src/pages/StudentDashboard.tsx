import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { ProgressBar } from '../components/ProgressBar';
import { WeeklyProgressChart, TaskStatusPieChart } from '../components/Charts';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Folder,
  CheckCircle2,
  Clock,
  Award,
  Calendar,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Zap
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 22 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Welcome Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden p-6 md:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-3xl border border-white/5 shadow-xl text-white flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        {/* Floating background decorative blobs */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[90px] animate-pulse-soft pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-purple-500/10 rounded-full blur-[80px] animate-float-slower pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/5 text-[10px] uppercase font-bold tracking-wider text-indigo-300">
            <Sparkles className="h-3 w-3" />
            <span>Active Student Portal</span>
          </div>
          <h1 className="text-xl md:text-3xl font-extrabold font-heading tracking-tight bg-gradient-to-r from-white via-indigo-100 to-slate-200 bg-clip-text text-transparent">
            Welcome back, {currentStudent.name}! 👋
          </h1>
          <p className="text-xs md:text-sm text-indigo-200/90 max-w-2xl font-light leading-relaxed">
            Ready to deploy some code? You currently have <span className="font-semibold text-white underline decoration-indigo-400 decoration-2 underline-offset-2">{inProgressTasks.length} tasks in progress</span> and are working on your key milestones.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <button
            onClick={() => navigate('/tasks')}
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-indigo-950 bg-white hover:bg-indigo-50 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          >
            <span>View Tasks</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </motion.div>

      {/* KPI Stats Cards Grid */}
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* KPI: Performance Score */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 p-5 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium shadow-glow-indigo flex items-center space-x-4 transition-all duration-300"
        >
          <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Award className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Performance</p>
            <h3 className="text-lg md:text-xl font-black text-slate-850 dark:text-white mt-0.5">{currentStudent.performanceScore}%</h3>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-450 font-bold flex items-center">
              <Zap className="h-2.5 w-2.5 mr-0.5" /> Excellent grade
            </span>
          </div>
        </motion.div>

        {/* KPI: In Progress Tasks */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 p-5 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium shadow-glow-sky flex items-center space-x-4 transition-all duration-300"
        >
          <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-xl flex items-center justify-center text-sky-600 dark:text-sky-400 shrink-0">
            <Clock className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">In Progress</p>
            <h3 className="text-lg md:text-xl font-black text-slate-850 dark:text-white mt-0.5">{inProgressTasks.length} Tasks</h3>
            <span className="text-[9px] text-slate-450 dark:text-slate-500 font-semibold">{pendingTasks.length} pending start</span>
          </div>
        </motion.div>

        {/* KPI: Completed Tasks */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 p-5 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium shadow-glow-emerald flex items-center space-x-4 transition-all duration-300"
        >
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-450 shrink-0">
            <CheckCircle2 className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Completed</p>
            <h3 className="text-lg md:text-xl font-black text-slate-855 dark:text-white mt-0.5">{completedTasks.length} Tasks</h3>
            <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">{underReviewTasks.length} under review</span>
          </div>
        </motion.div>

        {/* KPI: Duration */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -4 }}
          className="bg-white dark:bg-slate-900 p-5 border border-slate-200/50 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium shadow-glow-purple flex items-center space-x-4 transition-all duration-300"
        >
          <div className="h-10 w-10 bg-purple-50 dark:bg-purple-950/40 rounded-xl flex items-center justify-center text-purple-650 dark:text-purple-400 shrink-0">
            <Calendar className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Duration</p>
            <h3 className="text-lg md:text-xl font-black text-slate-850 dark:text-white mt-0.5">{currentStudent.durationWeeks} Weeks</h3>
            <span className="text-[9px] text-slate-450 dark:text-slate-550 font-semibold font-sans">Active enrollment</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Analytics Charts Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium lg:col-span-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">Weekly Performance Growth</h3>
              <p className="text-[11px] text-slate-400">Weekly evaluation trends vs. batch standard average.</p>
            </div>
            <span className="text-xs font-semibold text-indigo-650 bg-indigo-50/80 dark:bg-indigo-950/40 dark:text-indigo-400 px-2 py-0.5 rounded-md">
              Score: {currentStudent.performanceScore}%
            </span>
          </div>
          <WeeklyProgressChart />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium">
          <h3 className="text-sm font-bold text-slate-855 dark:text-white mb-1">Task Completion Ratio</h3>
          <p className="text-[11px] text-slate-400 mb-3">Status breakdown of your assigned tasks.</p>
          <TaskStatusPieChart
            completed={completedTasks.length}
            inProgress={inProgressTasks.length}
            underReview={underReviewTasks.length}
            pending={pendingTasks.length}
          />
        </div>
      </motion.div>

      {/* Project & Main Details Section */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Left Column: Active Project Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
                  <Folder className="h-4.5 w-4.5 mr-2 text-indigo-600 dark:text-indigo-450" />
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
                    <span className="text-indigo-600 dark:text-indigo-455">{activeProject.progress}% Completed</span>
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
          <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium">
            <h3 className="text-xs font-bold text-slate-805 dark:text-white uppercase tracking-wider mb-3">
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
          <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold text-slate-805 dark:text-white uppercase tracking-wider">
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
          <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-sm shadow-premium">
            <h3 className="text-xs font-bold text-slate-805 dark:text-white uppercase tracking-wider mb-3">
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
      </motion.div>
    </motion.div>
  );
};
