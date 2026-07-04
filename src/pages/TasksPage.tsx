import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { Drawer } from '../components/Drawer';
import { FileUpload } from '../components/FileUpload';
import { SearchBox } from '../components/SearchBox';
import {
  Calendar,
  Send,
  Globe,
  Paperclip,
  Clock,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export const TasksPage: React.FC = () => {
  const { currentStudent, tasks, submitTask, updateTask } = useApp();

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Submission form state
  const [githubUrl, setGithubUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Comment state
  const [commentText, setCommentText] = useState('');

  const selectedTask = tasks.find(t => t.id === selectedTaskId);

  // Filter tasks for the active student
  const studentTasks = tasks.filter(t => t.assigneeId === currentStudent.id);

  const filteredTasks = studentTasks.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    // Reset submission form
    setGithubUrl('');
    setDemoUrl('');
    setNotes('');
    setUploadedFile(null);
  };

  const handleStartTask = (taskId: string) => {
    updateTask(taskId, { status: 'in_progress' });
  };

  const handleSubmitAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUrl.trim()) return;

    submitTask(selectedTaskId!, {
      githubUrl,
      liveDemoUrl: demoUrl,
      notes,
      submittedAt: new Date().toLocaleString(),
      fileName: uploadedFile ? uploadedFile.name : undefined
    });

    // Reset fields
    setGithubUrl('');
    setDemoUrl('');
    setNotes('');
    setUploadedFile(null);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !selectedTask) return;

    const newComment = {
      id: `c_${Date.now()}`,
      authorName: currentStudent.name,
      authorAvatar: currentStudent.avatar,
      authorRole: 'student' as const,
      content: commentText.trim(),
      timestamp: new Date().toLocaleString()
    };

    // Update task comments in context
    const updatedComments = [...selectedTask.comments, newComment];
    updateTask(selectedTask.id, { comments: updatedComments });
    setCommentText('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-805 dark:text-white">Assigned Tasks Board</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Submit deliverables and view feedback.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search tasks..."
            className="w-48 md:w-56"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-650 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="under_review">Under Review</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Task List Table View */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-550">
                <th className="px-6 py-4.5">Task Title</th>
                <th className="px-6 py-4.5">Project</th>
                <th className="px-6 py-4.5">Priority</th>
                <th className="px-6 py-4.5">Deadline</th>
                <th className="px-6 py-4.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-xs">
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 dark:text-slate-500">
                    No tasks found matching current filters.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => handleTaskClick(task.id)}
                    className="hover:bg-slate-50/40 dark:hover:bg-slate-850/30 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 hover:text-indigo-650 transition-colors">
                        {task.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {task.projectName}
                    </td>
                    <td className="px-6 py-4">
                      <Badge type={task.priority} />
                    </td>
                    <td className="px-6 py-4 text-slate-500 dark:text-slate-400">
                      {new Date(task.deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Badge type={task.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Drawer: Task Details & Submission */}
      <Drawer
        isOpen={!!selectedTaskId}
        onClose={() => setSelectedTaskId(null)}
        title={selectedTask ? selectedTask.title : 'Task Details'}
        size="md"
      >
        {selectedTask && (
          <div className="space-y-6">
            {/* Project & Status Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/60 pb-4">
              <div className="space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Project</span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{selectedTask.projectName}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge type={selectedTask.priority} />
                <Badge type={selectedTask.status} />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                Description
              </h4>
              <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {selectedTask.description}
              </p>
            </div>

            {/* Deadline Notification */}
            <div className="flex items-center space-x-2.5 text-xs text-slate-500 dark:text-slate-400 bg-indigo-50/20 dark:bg-indigo-950/15 border border-indigo-100/50 dark:border-indigo-900/30 p-3 rounded-xl">
              <Calendar className="h-4.5 w-4.5 text-indigo-500 shrink-0" />
              <span>
                Task is due by <span className="font-semibold text-slate-800 dark:text-slate-250">{new Date(selectedTask.deadline).toLocaleDateString()}</span>
              </span>
            </div>

            {/* Start Task option if Pending */}
            {selectedTask.status === 'pending' && (
              <div className="p-4 bg-amber-50/20 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/40 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs">
                  <h5 className="font-bold text-amber-800 dark:text-amber-400">Ready to start?</h5>
                  <p className="text-slate-500 dark:text-slate-400 mt-0.5">Move this task to 'In Progress' to begin working.</p>
                </div>
                <button
                  onClick={() => handleStartTask(selectedTask.id)}
                  className="bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center whitespace-nowrap active:scale-95"
                >
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  Start Working
                </button>
              </div>
            )}

            {/* ASSIGNMENT SUBMISSION FORM (for in_progress / changes_requested) */}
            {(selectedTask.status === 'in_progress' || (selectedTask.status === 'under_review' && selectedTask.reviewStatus === 'changes_requested')) && (
              <form onSubmit={handleSubmitAssignment} className="space-y-4 border-t border-slate-150 dark:border-slate-800/80 pt-5">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-1">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <span>Submit Assignment</span>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-400" htmlFor="sub-git">GitHub Repository URL *</label>
                  <div className="relative">
                    <GithubIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      id="sub-git"
                      type="url"
                      required
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/platform-org/fintech-ledger-api/pull/1"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-400" htmlFor="sub-demo">Live Deployment Sandbox URL (Optional)</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      id="sub-demo"
                      type="url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://api-sandbox.finledger.dev"
                      className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-400" htmlFor="sub-notes">Submission Notes</label>
                  <textarea
                    id="sub-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe your implementation details, database schemas, API testing logs, etc."
                    rows={3}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                  />
                </div>

                {/* File Upload Area */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-400">Attachments / Code ZIP</label>
                  <FileUpload onFileSelect={setUploadedFile} />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-sm shadow-indigo-650/15 cursor-pointer active:scale-98"
                >
                  Submit Assignment for Review
                </button>
              </form>
            )}

            {/* REVIEW STATE PANEL (if under review / approved) */}
            {selectedTask.submission && (
              <div className="border-t border-slate-150 dark:border-slate-800/80 pt-5 space-y-4">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
                  Submission History
                </h4>
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl space-y-3.5 text-xs text-slate-650 dark:text-slate-350">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Submitted on: {selectedTask.submission.submittedAt}</span>
                    {selectedTask.reviewStatus && (
                      <Badge type={selectedTask.reviewStatus} className="scale-90" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <GithubIcon className="h-4 w-4 text-slate-400" />
                      <a href={selectedTask.submission.githubUrl} target="_blank" rel="noreferrer" className="text-indigo-655 hover:underline font-medium break-all">
                        {selectedTask.submission.githubUrl}
                      </a>
                    </div>
                    {selectedTask.submission.liveDemoUrl && (
                      <div className="flex items-center space-x-2">
                        <Globe className="h-4 w-4 text-slate-400" />
                        <a href={selectedTask.submission.liveDemoUrl} target="_blank" rel="noreferrer" className="text-indigo-655 hover:underline font-medium break-all">
                          {selectedTask.submission.liveDemoUrl}
                        </a>
                      </div>
                    )}
                    {selectedTask.submission.fileName && (
                      <div className="flex items-center space-x-2">
                        <Paperclip className="h-4 w-4 text-slate-400" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTask.submission.fileName}</span>
                      </div>
                    )}
                  </div>
                  {selectedTask.submission.notes && (
                    <div className="border-t border-slate-100 dark:border-slate-850 pt-2.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-250 block mb-1">Student Notes:</span>
                      <p className="leading-relaxed text-slate-500 dark:text-slate-400">{selectedTask.submission.notes}</p>
                    </div>
                  )}
                  {selectedTask.reviewFeedback && (
                    <div className="border-t border-slate-100 dark:border-slate-850 pt-2.5 bg-indigo-50/20 dark:bg-indigo-950/10 p-2.5 rounded-xl border border-dashed border-indigo-200/50 dark:border-indigo-900/30">
                      <span className="font-semibold text-indigo-700 dark:text-indigo-400 block mb-1">Admin Feedback:</span>
                      <p className="leading-relaxed text-slate-650 dark:text-slate-400 italic">"{selectedTask.reviewFeedback}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* COMMENTS SECTION */}
            <div className="border-t border-slate-150 dark:border-slate-800/80 pt-5 space-y-4">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 flex items-center">
                <MessageSquare className="h-4 w-4 mr-1.5" />
                Comments Thread ({selectedTask.comments.length})
              </h4>

              {/* Comment Input */}
              <form onSubmit={handlePostComment} className="flex space-x-2">
                <input
                  type="text"
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Post an update or question..."
                  className="flex-1 bg-slate-100 dark:bg-slate-950 text-xs px-3.5 py-2 rounded-xl border border-transparent focus:border-indigo-500/20 focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-indigo-650 hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-center active:scale-95"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              {/* Message List */}
              <div className="space-y-3">
                {selectedTask.comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3 p-3 rounded-xl bg-slate-50/40 dark:bg-slate-950/15 border border-slate-100/50 dark:border-slate-800/40 text-xs">
                    <img
                      className="h-8 w-8 rounded-full object-cover shrink-0"
                      src={comment.authorAvatar}
                      alt="avatar"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {comment.authorName}{' '}
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ml-1.5 ${
                            comment.authorRole === 'admin' 
                              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400' 
                              : 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/20 dark:text-indigo-400'
                          }`}>
                            {comment.authorRole}
                          </span>
                        </span>
                        <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
