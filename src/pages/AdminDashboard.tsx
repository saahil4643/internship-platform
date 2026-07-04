import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { StudentGrowthChart, TaskStatusPieChart } from '../components/Charts';
import {
  Users,
  FolderKanban,
  CheckSquare,
  FileText,
  PlusCircle,
  Megaphone,
  Check,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    students,
    projects,
    tasks,
    docRequests,
    addProject,
    addTask,
    addAnnouncement,
    reviewTask
  } = useApp();

  // Modal Open states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

  // Review Feedback states
  const [feedbackTaskId, setFeedbackTaskId] = useState<string | null>(null);
  const [reviewAction, setReviewAction] = useState<'approved' | 'changes_requested' | 'rejected' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  // Creation Form States
  // 1. Project
  const [projName, setProjName] = useState('');
  const [projDomain, setProjDomain] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projOverview, setProjOverview] = useState('');
  const [projStart, setProjStart] = useState('');
  const [projEnd, setProjEnd] = useState('');
  const [projSkills, setProjSkills] = useState('');

  // 2. Task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskPriority, setTaskPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [taskProjId, setTaskProjId] = useState('');
  const [taskAssigneeId, setTaskAssigneeId] = useState('');

  // 3. Announcement
  const [annTitle, setAnnTitle] = useState('');
  const [annDesc, setAnnDesc] = useState('');
  const [annCategory, setAnnCategory] = useState<'general' | 'projects' | 'events'>('general');

  // KPI Calculations
  const totalStudents = students.length;
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const pendingReviews = tasks.filter(t => t.status === 'under_review').length;
  const pendingDocs = docRequests.filter(d => d.status === 'pending').length;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName || !projDomain) return;

    addProject({
      name: projName,
      domain: projDomain,
      description: projDesc,
      overview: projOverview,
      startDate: projStart || new Date().toISOString().split('T')[0],
      endDate: projEnd || new Date().toISOString().split('T')[0],
      status: 'active',
      skillsRequired: projSkills.split(',').map(s => s.trim()).filter(Boolean),
      milestones: [],
      resources: [],
      timeline: []
    });

    // Reset Form
    setProjName('');
    setProjDomain('');
    setProjDesc('');
    setProjOverview('');
    setProjStart('');
    setProjEnd('');
    setProjSkills('');
    setIsProjectModalOpen(false);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskProjId || !taskAssigneeId) return;

    addTask({
      title: taskTitle,
      description: taskDesc,
      deadline: taskDeadline || new Date().toISOString().split('T')[0],
      priority: taskPriority,
      projectId: taskProjId,
      assigneeId: taskAssigneeId
    });

    // Reset Form
    setTaskTitle('');
    setTaskDesc('');
    setTaskDeadline('');
    setTaskPriority('medium');
    setTaskProjId('');
    setTaskAssigneeId('');
    setIsTaskModalOpen(false);
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annDesc) return;

    addAnnouncement({
      title: annTitle,
      description: annDesc,
      category: annCategory
    });

    setAnnTitle('');
    setAnnDesc('');
    setAnnCategory('general');
    setIsAnnouncementModalOpen(false);
  };

  const openReviewDialog = (taskId: string, action: 'approved' | 'changes_requested' | 'rejected') => {
    setFeedbackTaskId(taskId);
    setReviewAction(action);
    setFeedbackText('');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackTaskId || !reviewAction) return;

    reviewTask(feedbackTaskId, reviewAction, feedbackText.trim() || 'Review complete.');
    
    setFeedbackTaskId(null);
    setReviewAction(null);
    setFeedbackText('');
  };

  // Get tasks currently needing review
  const tasksForReview = tasks.filter(t => t.status === 'under_review');

  return (
    <div className="space-y-6">
      {/* Header and Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-805 dark:text-white">Admin Analytics Dashboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Oversee intern progress, evaluate submissions, and manage materials.</p>
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsProjectModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-3.5 rounded-xl text-xs transition-all shadow-sm shadow-indigo-650/15 cursor-pointer active:scale-95"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Create Project</span>
          </button>
          <button
            onClick={() => setIsTaskModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-slate-350 border border-slate-205 dark:border-slate-800 font-semibold py-2 px-3.5 rounded-xl text-xs transition-all cursor-pointer active:scale-95"
          >
            <PlusCircle className="h-4 w-4 text-slate-450" />
            <span>Create Task</span>
          </button>
          <button
            onClick={() => setIsAnnouncementModalOpen(true)}
            className="inline-flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-slate-350 border border-slate-205 dark:border-slate-800 font-semibold py-2 px-3.5 rounded-xl text-xs transition-all cursor-pointer active:scale-95"
          >
            <Megaphone className="h-4 w-4 text-slate-450" />
            <span>Publish Notice</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Users className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Total Interns</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{totalStudents}</h3>
            <span className="text-[9px] text-emerald-600 font-semibold">Active enrollment</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-sky-50 dark:bg-sky-950/40 rounded-xl flex items-center justify-center text-sky-650 dark:text-sky-400 shrink-0">
            <FolderKanban className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Active Projects</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{activeProjects}</h3>
            <span className="text-[9px] text-slate-400 font-semibold">{projects.length} overall repositories</span>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-amber-50 dark:bg-amber-950/40 rounded-xl flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
            <CheckSquare className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Submissions to Review</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{pendingReviews} Tasks</h3>
            <span className={`text-[9px] font-semibold ${pendingReviews > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400'}`}>
              {pendingReviews > 0 ? 'Action required' : 'Queue cleared'}
            </span>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-202 dark:border-slate-800 rounded-2xl shadow-sm flex items-center space-x-4">
          <div className="h-10 w-10 bg-purple-50 dark:bg-purple-950/40 rounded-xl flex items-center justify-center text-purple-650 dark:text-purple-400 shrink-0">
            <FileText className="h-5.5 w-5.5" />
          </div>
          <div>
            <p className="text-[10px] md:text-xs font-medium text-slate-400 dark:text-slate-500">Document Requests</p>
            <h3 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white mt-0.5">{pendingDocs}</h3>
            <span className={`text-[9px] font-semibold ${pendingDocs > 0 ? 'text-purple-650 dark:text-purple-400' : 'text-slate-400'}`}>
              {pendingDocs > 0 ? 'Awaiting signature' : 'Fully processed'}
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm lg:col-span-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1">Batch Performance Growth</h3>
          <p className="text-[11px] text-slate-400 mb-4">Tracking overall student grades and milestones completions.</p>
          <StudentGrowthChart />
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-855 dark:text-white mb-1">Task Submissions Overview</h3>
          <p className="text-[11px] text-slate-400 mb-3">Status ratio of all assigned tasks.</p>
          <TaskStatusPieChart
            completed={tasks.filter(t => t.status === 'completed').length}
            inProgress={tasks.filter(t => t.status === 'in_progress').length}
            underReview={tasks.filter(t => t.status === 'under_review').length}
            pending={tasks.filter(t => t.status === 'pending').length}
          />
        </div>
      </div>

      {/* Task Submission Review List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
        <div className="p-5 border-b border-slate-100 dark:border-slate-850/50">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
            <CheckSquare className="h-4.5 w-4.5 mr-2 text-indigo-650" />
            Task Deliverables Awaiting Coordinator Review
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Evaluate pull requests, code notes, and click Approve or Request Changes.</p>
        </div>

        <div className="p-4 space-y-4">
          {tasksForReview.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-950/20">
              <Check className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
              <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-bold">All caught up!</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-450 mt-1 max-w-xs mx-auto">
                No intern deliverables are currently awaiting approval.
              </p>
            </div>
          ) : (
            tasksForReview.map(task => {
              const assignee = students.find(s => s.id === task.assigneeId);
              return (
                <div key={task.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/40 dark:bg-slate-950/15 space-y-3.5 text-xs text-slate-655 dark:text-slate-350">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-white text-xs">{task.title}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Project: {task.projectName} • Intern: <span className="font-semibold text-slate-700 dark:text-slate-300">{assignee ? assignee.name : 'Unknown'}</span></p>
                    </div>
                    <Badge type={task.priority} />
                  </div>

                  {task.submission && (
                    <div className="p-3 bg-white dark:bg-slate-900 border border-slate-150/60 dark:border-slate-800 rounded-lg space-y-2 text-[11px]">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Submitted on: {task.submission.submittedAt}</span>
                        {task.submission.fileName && <span className="font-medium text-slate-600 dark:text-slate-350">File: {task.submission.fileName}</span>}
                      </div>
                      <div className="flex items-center space-x-3.5">
                        <span className="font-semibold text-slate-500">Repository PR:</span>
                        <a href={task.submission.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-650 hover:underline break-all font-semibold">
                          {task.submission.githubUrl}
                        </a>
                      </div>
                      {task.submission.notes && (
                        <p className="text-slate-500 dark:text-slate-400 mt-1 bg-slate-50 dark:bg-slate-950 p-2 rounded leading-relaxed">
                          <span className="font-semibold text-slate-750 dark:text-slate-250 block mb-0.5">Deliverable description:</span>
                          "{task.submission.notes}"
                        </p>
                      )}
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex justify-end space-x-2.5 pt-2 border-t border-slate-100 dark:border-slate-850/60">
                    <button
                      onClick={() => openReviewDialog(task.id, 'changes_requested')}
                      className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-205 dark:border-slate-800 hover:bg-slate-100 text-slate-650 dark:text-slate-350 cursor-pointer active:scale-95 transition-all text-[11px] font-semibold"
                    >
                      <X className="h-3.5 w-3.5 text-rose-500" />
                      <span>Request Changes</span>
                    </button>
                    <button
                      onClick={() => openReviewDialog(task.id, 'approved')}
                      className="inline-flex items-center justify-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-95 transition-all text-[11px] font-semibold"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Approve Submission</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* DIALOG: SUBMISSION FEEDBACK MODAL */}
      <Modal
        isOpen={!!feedbackTaskId}
        onClose={() => {
          setFeedbackTaskId(null);
          setReviewAction(null);
        }}
        title="Submit Deliverable Review"
      >
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div className="p-3.5 rounded-xl border border-dashed border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/10 dark:bg-indigo-950/10 text-xs text-indigo-755 dark:text-indigo-400">
            <span>You are changing task review status to: </span>
            <span className="font-bold capitalize">{reviewAction}</span>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-650 dark:text-slate-350">Review Feedback / Guidelines *</label>
            <textarea
              required
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="e.g. Code standards approved. PR merged into main branch. OR: Please split the controller into separate handlers and add validation tests."
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-950 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setFeedbackTaskId(null);
                setReviewAction(null);
              }}
              className="px-4 py-2 border border-slate-205 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
            >
              Submit Review
            </button>
          </div>
        </form>
      </Modal>

      {/* CREATE PROJECT MODAL */}
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="Create Internship Project">
        <form onSubmit={handleCreateProject} className="space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Project Name *</label>
              <input
                type="text"
                required
                value={projName}
                onChange={(e) => setProjName(e.target.value)}
                placeholder="Fintech Transaction Ledger API"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Domain *</label>
              <input
                type="text"
                required
                value={projDomain}
                onChange={(e) => setProjDomain(e.target.value)}
                placeholder="Backend Engineering"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Short Description</label>
            <input
              type="text"
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
              placeholder="Design and construct a high-throughput API ledger supporting locks."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Project Scope Specs</label>
            <textarea
              value={projOverview}
              onChange={(e) => setProjOverview(e.target.value)}
              placeholder="Detailed guidelines, constraints, and instructions for team members."
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Start Date</label>
              <input
                type="date"
                value={projStart}
                onChange={(e) => setProjStart(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">End Date</label>
              <input
                type="date"
                value={projEnd}
                onChange={(e) => setProjEnd(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Required Skills (Comma separated)</label>
            <input
              type="text"
              value={projSkills}
              onChange={(e) => setProjSkills(e.target.value)}
              placeholder="e.g. Node.js, Express, PostgreSQL, Redis"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsProjectModalOpen(false)}
              className="px-4 py-2 border border-slate-205 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
            >
              Save Project
            </button>
          </div>
        </form>
      </Modal>

      {/* CREATE TASK MODAL */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} title="Assign New Task">
        <form onSubmit={handleCreateTask} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Task Title *</label>
            <input
              type="text"
              required
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="e.g. Integrate Redis Cache for Transactions Feed"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Task Description</label>
            <textarea
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              placeholder="Outline specific deliverables, endpoints, or designs required."
              rows={2}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Project Selection *</label>
              <select
                required
                value={taskProjId}
                onChange={(e) => setTaskProjId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-2 text-xs text-slate-905 dark:text-white"
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Assign Student *</label>
              <select
                required
                value={taskAssigneeId}
                onChange={(e) => setTaskAssigneeId(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-2 text-xs text-slate-905 dark:text-white"
              >
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Deadline Date</label>
              <input
                type="date"
                value={taskDeadline}
                onChange={(e) => setTaskDeadline(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Priority Level</label>
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value as any)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-2 text-xs text-slate-905 dark:text-white"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsTaskModalOpen(false)}
              className="px-4 py-2 border border-slate-205 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
            >
              Assign Task
            </button>
          </div>
        </form>
      </Modal>

      {/* CREATE ANNOUNCEMENT MODAL */}
      <Modal isOpen={isAnnouncementModalOpen} onClose={() => setIsAnnouncementModalOpen(false)} title="Publish Announcement Notice">
        <form onSubmit={handleCreateAnnouncement} className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Notice Title *</label>
            <input
              type="text"
              required
              value={annTitle}
              onChange={(e) => setAnnTitle(e.target.value)}
              placeholder="e.g. Schedule for Mid-Term Project evaluations"
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Notice Category</label>
            <select
              value={annCategory}
              onChange={(e) => setAnnCategory(e.target.value as any)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl p-2 text-xs text-slate-905 dark:text-white"
            >
              <option value="general">General Broadcast</option>
              <option value="projects">Project Update</option>
              <option value="events">Event Alert</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Notice Description *</label>
            <textarea
              required
              value={annDesc}
              onChange={(e) => setAnnDesc(e.target.value)}
              placeholder="Draft announcement details, links, or instructions."
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAnnouncementModalOpen(false)}
              className="px-4 py-2 border border-slate-205 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-350 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm cursor-pointer"
            >
              Publish Broadcast
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
