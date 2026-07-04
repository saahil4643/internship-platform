import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProgressBar } from '../components/ProgressBar';
import { SkillsRadarChart } from '../components/Charts';
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Calendar,
  Globe,
  FileText,
  Save,
  CheckCircle,
  Plus,
  X
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

export const StudentProfile: React.FC = () => {
  const { currentStudent, updateStudentProfile } = useApp();

  const [name, setName] = useState(currentStudent.name);
  const [email, setEmail] = useState(currentStudent.email);
  const [phone, setPhone] = useState(currentStudent.phone || '');
  const [college, setCollege] = useState(currentStudent.college);
  const [degree, setDegree] = useState(currentStudent.degree);
  const [branch, setBranch] = useState(currentStudent.branch);
  const [gradYear, setGradYear] = useState(currentStudent.graduationYear);
  const [linkedin, setLinkedin] = useState(currentStudent.linkedin || '');
  const [github, setGithub] = useState(currentStudent.github || '');
  const [portfolio, setPortfolio] = useState(currentStudent.portfolio || '');
  
  // Skills list state
  const [skills, setSkills] = useState<string[]>(currentStudent.skills);
  const [newSkill, setNewSkill] = useState('');

  // Notification state
  const [showToast, setShowToast] = useState(false);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      name,
      email,
      phone,
      college,
      degree,
      branch,
      graduationYear: gradYear,
      linkedin,
      github,
      portfolio,
      skills
    });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 z-50 text-sm">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      {/* Profile Overview Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <img
            className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-900"
            src={currentStudent.avatar}
            alt="profile avatar"
          />
          <div className="space-y-1">
            <h2 className="text-lg md:text-xl font-bold text-slate-850 dark:text-white">{currentStudent.name}</h2>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">{currentStudent.college}</p>
            <div className="flex items-center space-x-2 text-[10px] md:text-xs text-slate-400">
              <span>CS Intern</span>
              <span>•</span>
              <span className="capitalize">{currentStudent.status} status</span>
            </div>
          </div>
        </div>

        {/* Completion tracker */}
        <div className="md:w-64 space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-500">Profile Completion</span>
            <span className="text-indigo-600 dark:text-indigo-400">{currentStudent.profileCompletion}%</span>
          </div>
          <ProgressBar value={currentStudent.profileCompletion} color="success" size="sm" />
          <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
            Fill in social profiles and skills to hit 100% and unlock certificate downloads.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Skills Assessment and Charts */}
        <div className="space-y-6">
          {/* Radar Chart */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
            <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2">
              Internship Skills Evaluation
            </h3>
            <p className="text-[10px] text-slate-405 dark:text-slate-500 mb-4">
              AI generated metrics based on task reviews and documentation commits.
            </p>
            <SkillsRadarChart />
          </div>

          {/* Reusable Skills editor card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                My Skills Tag List
              </h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Manage tags that showcase your expertise.</p>
            </div>

            <form onSubmit={handleAddSkill} className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="e.g. Docker, GraphQL"
                className="flex-1 bg-slate-100 dark:bg-slate-950 text-xs px-3 py-1.5 rounded-xl border border-transparent focus:border-indigo-500/20 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-xl transition-all cursor-pointer flex items-center justify-center shrink-0 active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((s, idx) => (
                <span
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-350 py-1 pl-2.5 pr-1.5 rounded-lg text-[10px] font-semibold flex items-center space-x-1"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-900 p-0.5 rounded transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Edit Forms */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm divide-y divide-slate-150 dark:divide-slate-800/60">
            {/* Personal Info Section */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center">
                <User className="h-4.5 w-4.5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">College / Institution</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 md:col-span-2">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Degree & Specialization</label>
                    <div className="relative">
                      <Award className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={`${degree} - ${branch}`}
                        onChange={(e) => {
                          const val = e.target.value;
                          const parts = val.split('-');
                          setDegree(parts[0]?.trim() || '');
                          setBranch(parts[1]?.trim() || '');
                        }}
                        required
                        placeholder="e.g. BS - Computer Science"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Graduation Year</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <select
                        value={gradYear}
                        onChange={(e) => setGradYear(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-2 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Info Section */}
            <div className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center">
                <FileText className="h-4.5 w-4.5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Professional Links
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">GitHub Profile URL</label>
                  <div className="relative">
                    <GithubIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder="https://github.com/yourusername"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">LinkedIn Profile URL</label>
                  <div className="relative">
                    <LinkedinIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder="https://linkedin.com/in/yourusername"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Portfolio Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      placeholder="https://yourwebsite.dev"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 rounded-xl pl-9.5 pr-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm shadow-indigo-600/10 cursor-pointer active:scale-95"
              >
                <Save className="h-4 w-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
