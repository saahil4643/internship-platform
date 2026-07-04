import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { Drawer } from '../components/Drawer';
import { SearchBox } from '../components/SearchBox';
import { ProgressBar } from '../components/ProgressBar';
import {
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Globe,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const StudentManagement: React.FC = () => {
  const { students, projects, tasks, toggleStudentStatus, deleteStudent } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter]);

  const inspectorStudent = students.find(s => s.id === selectedStudentId);
  const inspectorProject = inspectorStudent ? projects.find(p => p.id === inspectorStudent.currentProjectId) : null;
  const inspectorTasks = inspectorStudent ? tasks.filter(t => t.assigneeId === inspectorStudent.id) : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-slate-805 dark:text-white">Student Directory</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage student enrollments, suspend accounts, and review profiles.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <SearchBox
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search name, college..."
            className="w-48 md:w-56"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-650 dark:text-slate-350 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-550">
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Assigned Project</th>
                <th className="px-5 py-4">Grade</th>
                <th className="px-5 py-4">Profile Done</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850/40 text-xs">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    No interns found matching details.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => {
                  const assignedProj = projects.find(p => p.id === s.currentProjectId);
                  return (
                    <tr key={s.id} className="hover:bg-slate-55/30 dark:hover:bg-slate-850/20 transition-colors">
                      <td className="px-5 py-3.5 flex items-center space-x-3">
                        <img className="h-8 w-8 rounded-full object-cover shrink-0" src={s.avatar} alt="avatar" />
                        <div>
                          <h4 className="font-bold text-slate-805 dark:text-white">{s.name}</h4>
                          <span className="text-[10px] text-slate-400">{s.college}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
                        {assignedProj ? assignedProj.name : <span className="italic text-slate-400">Unassigned</span>}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-850 dark:text-white">
                        {s.performanceScore}%
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="w-20 space-y-1">
                          <span className="text-[9px] font-semibold text-slate-400">{s.profileCompletion}%</span>
                          <ProgressBar value={s.profileCompletion} size="sm" color="success" />
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge type={s.status} />
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedStudentId(s.id)}
                          className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-550 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors inline-flex"
                          title="View Profile Details"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => toggleStudentStatus(s.id)}
                          className={`p-1.5 rounded-lg border cursor-pointer transition-colors inline-flex ${
                            s.status === 'suspended'
                              ? 'border-emerald-200 dark:border-emerald-900/40 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/20'
                              : 'border-amber-200 dark:border-amber-900/40 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20'
                          }`}
                          title={s.status === 'suspended' ? 'Activate Student' : 'Suspend Student'}
                        >
                          {s.status === 'suspended' ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteStudent(s.id)}
                          className="p-1.5 rounded-lg border border-rose-200 dark:border-rose-900/40 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 cursor-pointer transition-colors inline-flex"
                          title="Delete Intern Record"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-850/60 bg-slate-50/50 dark:bg-slate-900/40 flex justify-between items-center text-xs">
            <span className="text-slate-400">
              Showing page <span className="font-semibold text-slate-700 dark:text-slate-305">{currentPage}</span> of <span className="font-semibold text-slate-700 dark:text-slate-305">{totalPages}</span>
            </span>
            <div className="flex space-x-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  currentPage === 1
                    ? 'border-slate-100 text-slate-300 dark:border-slate-850 dark:text-slate-700 cursor-not-allowed'
                    : 'border-slate-205 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-350'
                }`}
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  currentPage === totalPages
                    ? 'border-slate-100 text-slate-300 dark:border-slate-850 dark:text-slate-700 cursor-not-allowed'
                    : 'border-slate-205 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-355'
                }`}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Drawer: Intern Details Inspector */}
      <Drawer
        isOpen={!!selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
        title={inspectorStudent ? `${inspectorStudent.name}'s Profile` : 'Student Details'}
        size="md"
      >
        {inspectorStudent && (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex items-center space-x-4 border-b border-slate-100 dark:border-slate-800/60 pb-5">
              <img
                className="h-14 w-14 rounded-full object-cover border border-slate-200"
                src={inspectorStudent.avatar}
                alt="profile avatar"
              />
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-850 dark:text-white">{inspectorStudent.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{inspectorStudent.college}</p>
                <div className="flex items-center space-x-2 pt-0.5">
                  <Badge type={inspectorStudent.status} />
                  <span className="text-[10px] font-bold text-indigo-650 bg-indigo-50 dark:bg-indigo-950/40 dark:text-indigo-400 px-1.5 py-0.2 rounded">
                    Score: {inspectorStudent.performanceScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* General contact */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850/60 rounded-2xl p-4.5 space-y-2.5 text-xs text-slate-655 dark:text-slate-350">
              <div className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-slate-400" />
                <span>{inspectorStudent.email}</span>
              </div>
              {inspectorStudent.phone && (
                <div className="flex items-center space-x-2.5">
                  <Phone className="h-4 w-4 text-slate-400" />
                  <span>{inspectorStudent.phone}</span>
                </div>
              )}
              <div className="flex items-center space-x-2.5">
                <BookOpen className="h-4 w-4 text-slate-400" />
                <span>{inspectorStudent.degree} • {inspectorStudent.branch} (Grad Year: {inspectorStudent.graduationYear})</span>
              </div>
            </div>

            {/* Social links */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Professional Handles</h4>
              <div className="flex flex-wrap gap-2.5">
                {inspectorStudent.github && (
                  <a
                    href={inspectorStudent.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs text-slate-600 hover:text-slate-900 dark:text-slate-450 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5"
                  >
                    <GithubIcon className="h-4 w-4 text-slate-450" />
                    <span>GitHub</span>
                  </a>
                )}
                {inspectorStudent.linkedin && (
                  <a
                    href={inspectorStudent.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs text-slate-650 hover:text-slate-905 dark:text-slate-455 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5"
                  >
                    <LinkedinIcon className="h-4 w-4 text-slate-450" />
                    <span>LinkedIn</span>
                  </a>
                )}
                {inspectorStudent.portfolio && (
                  <a
                    href={inspectorStudent.portfolio}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1.5 text-xs text-slate-650 hover:text-slate-905 dark:text-slate-455 dark:hover:text-white border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5"
                  >
                    <Globe className="h-4 w-4 text-slate-455" />
                    <span>Portfolio</span>
                  </a>
                )}
              </div>
            </div>

            {/* Skills tag cloud */}
            <div className="space-y-2">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Skills Profile</h4>
              <div className="flex flex-wrap gap-1.5">
                {inspectorStudent.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded text-[10px] font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Assigned project details */}
            <div className="space-y-3 border-t border-slate-100 dark:border-slate-850/60 pt-5">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">Assigned Project Work</h4>
              {inspectorProject ? (
                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/20 dark:bg-slate-950/10 space-y-2.5">
                  <div className="flex justify-between items-start">
                    <h5 className="font-bold text-xs text-slate-800 dark:text-white leading-normal">{inspectorProject.name}</h5>
                    <Badge type={inspectorProject.status} className="scale-90" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                      <span>Project Progress</span>
                      <span>{inspectorProject.progress}%</span>
                    </div>
                    <ProgressBar value={inspectorProject.progress} size="sm" />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No project currently assigned.</p>
              )}
            </div>

            {/* Assigned tasks */}
            <div className="space-y-3.5 border-t border-slate-100 dark:border-slate-850/60 pt-5">
              <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-550 flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-slate-450" />
                Intern Deliverable Tasks ({inspectorTasks.length})
              </h4>
              <div className="space-y-2">
                {inspectorTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No tasks assigned yet.</p>
                ) : (
                  inspectorTasks.map(task => (
                    <div key={task.id} className="flex justify-between items-center p-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50/20 dark:bg-slate-950/10">
                      <div className="space-y-0.5 min-w-0 pr-2">
                        <p className="font-semibold text-slate-800 dark:text-slate-200 truncate">{task.title}</p>
                        <p className="text-[10px] text-slate-400">Due: {new Date(task.deadline).toLocaleDateString()}</p>
                      </div>
                      <Badge type={task.status} className="scale-90" />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
