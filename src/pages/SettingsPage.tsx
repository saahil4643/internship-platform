import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Lock,
  Sliders,
  CheckCircle2,
  Save
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { userRole } = useApp();
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications'>('general');
  const [showToast, setShowToast] = useState(false);

  // Form states
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [browserAlerts, setBrowserAlerts] = useState(true);
  const [weeklyDigests, setWeeklyDigests] = useState(false);

  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3050);

    // Reset password fields if on security tab
    if (activeTab === 'security') {
      setCurrentPass('');
      setNewPass('');
      setConfirmPass('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Toast Alert */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center space-x-2.5 z-50 text-sm">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Settings saved successfully!</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h1 className="text-lg md:text-xl font-bold text-slate-805 dark:text-white">Account Settings</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage credentials, alert options, and user experience.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Column Tabs */}
        <div className="md:col-span-1 flex flex-row md:flex-col overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('general')}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap md:w-full outline-none ${
              activeTab === 'general'
                ? 'bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-400 font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Sliders className="h-4 w-4 shrink-0" />
            <span>Preferences</span>
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap md:w-full outline-none ${
              activeTab === 'security'
                ? 'bg-indigo-50 text-indigo-655 dark:bg-indigo-950/40 dark:text-indigo-400 font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Lock className="h-4 w-4 shrink-0" />
            <span>Security</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex items-center space-x-2 px-3 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap md:w-full outline-none ${
              activeTab === 'notifications'
                ? 'bg-indigo-50 text-indigo-655 dark:bg-indigo-950/40 dark:text-indigo-400 font-bold'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Bell className="h-4 w-4 shrink-0" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Right Column Form Details */}
        <div className="md:col-span-3">
          <form onSubmit={handleSaveSettings} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            {/* 1. GENERAL PREFERENCES */}
            {activeTab === 'general' && (
              <div className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
                  <Sliders className="h-4.5 w-4.5 mr-2 text-indigo-600" />
                  Preferences Settings
                </h3>

                <div className="space-y-4 text-xs text-slate-655 dark:text-slate-350">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Default Sandbox Environment</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white">
                      <option>US East (Virginia) - AWS ECS</option>
                      <option>EU West (Ireland) - Dev clusters</option>
                      <option>Github Codespaces Docker Sandbox</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">Preferred Language</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2.5 text-xs text-slate-905 dark:text-white">
                      <option>English (United States)</option>
                      <option>Spanish (Español)</option>
                      <option>Hindi (हिन्दी)</option>
                    </select>
                  </div>

                  {userRole === 'admin' && (
                    <div className="p-4 bg-indigo-50/15 dark:bg-indigo-950/10 border border-indigo-150/60 dark:border-indigo-900/30 rounded-xl space-y-2">
                      <span className="font-bold text-indigo-755 dark:text-indigo-400 block">Coordinator Settings</span>
                      <p className="text-[11px] text-slate-500 dark:text-slate-455">Establish double-factor reviewer approval on document issuances.</p>
                      <div className="flex items-center space-x-2 pt-1">
                        <input type="checkbox" id="double-review" className="rounded border-slate-300 dark:border-slate-700 text-indigo-650" />
                        <label htmlFor="double-review" className="text-[11px] text-slate-650 dark:text-slate-400">Require supervisor approval hash signature</label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. SECURITY SETTINGS */}
            {activeTab === 'security' && (
              <div className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center">
                  <Lock className="h-4.5 w-4.5 mr-2 text-indigo-600" />
                  Credentials Security
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400" htmlFor="cur-pass">Current Password</label>
                    <input
                      id="cur-pass"
                      type="password"
                      required
                      value={currentPass}
                      onChange={(e) => setCurrentPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-202 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400" htmlFor="new-pass">New Password</label>
                      <input
                        id="new-pass"
                        type="password"
                        required
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-202 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400" htmlFor="conf-pass">Confirm New Password</label>
                      <input
                        id="conf-pass"
                        type="password"
                        required
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-202 dark:border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. NOTIFICATION SETTINGS */}
            {activeTab === 'notifications' && (
              <div className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-slate-805 dark:text-white flex items-center">
                  <Bell className="h-4.5 w-4.5 mr-2 text-indigo-650" />
                  Alert Channels
                </h3>

                <div className="divide-y divide-slate-100 dark:divide-slate-850/60 text-xs">
                  {/* Option 1 */}
                  <div className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Email Alerts</h4>
                      <p className="text-slate-405 dark:text-slate-500 text-[10px]">Receive notifications for task assignments and review feedback.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailAlerts}
                        onChange={() => setEmailAlerts(!emailAlerts)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {/* Option 2 */}
                  <div className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Browser Alerts</h4>
                      <p className="text-slate-405 dark:text-slate-500 text-[10px]">Receive real-time banners inside the application for coordinator updates.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={browserAlerts}
                        onChange={() => setBrowserAlerts(!browserAlerts)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>

                  {/* Option 3 */}
                  <div className="py-3 flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Weekly Activity Digest</h4>
                      <p className="text-slate-405 dark:text-slate-500 text-[10px]">Receive an email summarizing task approvals, files uploaded, and batch standings.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={weeklyDigests}
                        onChange={() => setWeeklyDigests(!weeklyDigests)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Save Buttons footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-850/60 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center space-x-1.5 px-4.5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-sm shadow-indigo-650/10 cursor-pointer active:scale-95"
              >
                <Save className="h-4 w-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
