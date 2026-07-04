import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, ArrowRight, ShieldCheck, Mail, Lock, User, BookOpen, Calendar, Key } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const {
    setUserRole,
    setIsAuthenticated,
    authScreen,
    setAuthScreen
  } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [degree, setDegree] = useState('');
  const [gradYear, setGradYear] = useState('2027');
  const [verificationCode, setVerificationCode] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const handleSimulateLogin = (role: 'student' | 'admin') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleFormSubmit = (e: React.FormEvent, nextScreen?: typeof authScreen) => {
    e.preventDefault();
    if (authScreen === 'login') {
      // Default to student on regular login
      setUserRole('student');
      setIsAuthenticated(true);
    } else if (nextScreen) {
      setAuthScreen(nextScreen);
      setNotification(`Action successful! Proceeding to ${nextScreen}.`);
      setTimeout(() => setNotification(null), 4000);
    } else {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-200">
      {/* Left Pane - Marketing / Branding */}
      <div className="md:w-1/2 bg-indigo-900 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center space-x-2">
          <div className="h-10 w-10 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20">
            <GraduationCap className="h-6 w-6 text-indigo-300" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-350 bg-clip-text text-transparent">
            InternFlow
          </span>
        </div>

        <div className="relative z-10 my-16 md:my-0 space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Empowering the Next Generation of Tech Talent.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-indigo-200 text-sm md:text-base max-w-md leading-relaxed"
          >
            Manage milestones, collaborate on production-grade projects, track tasks, and accelerate your engineering career with our structured roadmap.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center space-x-4 border-t border-white/10 pt-8">
          <div className="flex -space-x-2">
            <img className="h-8 w-8 rounded-full border-2 border-indigo-900" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120" alt="avatar" />
            <img className="h-8 w-8 rounded-full border-2 border-indigo-900" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" alt="avatar" />
            <img className="h-8 w-8 rounded-full border-2 border-indigo-900" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="avatar" />
          </div>
          <span className="text-xs text-indigo-250 font-medium">
            Joined by over 500+ active university developers.
          </span>
        </div>
      </div>

      {/* Right Pane - Form Card */}
      <div className="flex-1 p-6 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleSimulateLogin('student')}
              className="text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-150 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300 px-3 py-1.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40 cursor-pointer active:scale-95 transition-all"
            >
              Simulate Student
            </button>
            <button
              onClick={() => handleSimulateLogin('admin')}
              className="text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-150 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40 cursor-pointer active:scale-95 transition-all"
            >
              Simulate Admin
            </button>
          </div>

          <AnimatePresence mode="wait">
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-indigo-50 border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/40 p-3.5 rounded-xl flex items-start space-x-2 text-xs text-indigo-750 dark:text-indigo-350"
              >
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-500 shrink-0 mt-0.5" />
                <span>{notification}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* LOGIN SCREEN */}
            {authScreen === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">Sign in to your internship portal to continue.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-650 dark:text-slate-300" htmlFor="login-email">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        id="login-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.rivera@university.edu"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-slate-650 dark:text-slate-300" htmlFor="login-password">Password</label>
                      <button
                        type="button"
                        onClick={() => setAuthScreen('forgot')}
                        className="text-xs text-indigo-650 hover:underline dark:text-indigo-400 font-medium cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        id="login-password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-sm transition-all shadow-sm shadow-indigo-600/15 cursor-pointer active:scale-98 flex items-center justify-center space-x-1"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthScreen('register')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    Register as Student
                  </button>
                </p>
              </motion.div>
            )}

            {/* REGISTER SCREEN */}
            {authScreen === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create account</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Register your details to apply for an internship.</p>
                </div>

                <form onSubmit={(e) => handleFormSubmit(e, 'verify')} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-350" htmlFor="reg-name">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        id="reg-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-1.5 pl-9.5 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-350" htmlFor="reg-email">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                      <input
                        id="reg-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.rivera@university.edu"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-1.5 pl-9.5 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-355" htmlFor="reg-college">College</label>
                      <div className="relative">
                        <BookOpen className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                          id="reg-college"
                          type="text"
                          required
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          placeholder="MIT"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-1.5 pl-8.5 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-355" htmlFor="reg-degree">Degree & Branch</label>
                      <input
                        id="reg-degree"
                        type="text"
                        required
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="B.Tech CS"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-1.5 px-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-355" htmlFor="reg-year">Graduation Year</label>
                      <div className="relative">
                        <Calendar className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <select
                          id="reg-year"
                          value={gradYear}
                          onChange={(e) => setGradYear(e.target.value)}
                          className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-1.5 pl-8.5 pr-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        >
                          <option value="2026">2026</option>
                          <option value="2027">2027</option>
                          <option value="2028">2028</option>
                          <option value="2029">2029</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-650 dark:text-slate-355" htmlFor="reg-pass">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                          id="reg-pass"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-1.5 pl-8.5 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-xs transition-all shadow-sm cursor-pointer active:scale-98 flex items-center justify-center space-x-1"
                  >
                    <span>Register Account</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthScreen('login')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </motion.div>
            )}

            {/* FORGOT PASSWORD SCREEN */}
            {authScreen === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Reset password</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">Enter your email and we'll send verification details to restore access.</p>
                </div>

                <form onSubmit={(e) => handleFormSubmit(e, 'reset')} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-650 dark:text-slate-350" htmlFor="forgot-email">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        id="forgot-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex.rivera@university.edu"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-sm transition-all shadow-sm cursor-pointer active:scale-98 flex items-center justify-center space-x-1"
                  >
                    <span>Send Reset Instructions</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 dark:text-slate-400">
                  Remember password?{' '}
                  <button
                    type="button"
                    onClick={() => setAuthScreen('login')}
                    className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </p>
              </motion.div>
            )}

            {/* RESET PASSWORD SCREEN */}
            {authScreen === 'reset' && (
              <motion.div
                key="reset"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create new password</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 font-medium text-emerald-600 dark:text-emerald-450 flex items-center">
                    <Key className="h-4 w-4 mr-1 shrink-0" /> Code verified. Set your new security credentials.
                  </p>
                </div>

                <form onSubmit={(e) => handleFormSubmit(e, 'login')} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-650 dark:text-slate-350" htmlFor="reset-pass">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        id="reset-pass"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-650 dark:text-slate-350" htmlFor="reset-pass-confirm">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input
                        id="reset-pass-confirm"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl py-2 pl-9.5 pr-4 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-sm transition-all shadow-sm cursor-pointer active:scale-98"
                  >
                    Update Password & Login
                  </button>
                </form>
              </motion.div>
            )}

            {/* EMAIL VERIFICATION SCREEN */}
            {authScreen === 'verify' && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Verify your email</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">We've sent a 6-digit confirmation code to your email. Enter it below to unlock the portal.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-650 dark:text-slate-350" htmlFor="verify-code">Verification Code</label>
                    <div className="flex space-x-2 justify-between">
                      {Array.from({ length: 6 }).map((_, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          pattern="[0-9]"
                          required
                          value={verificationCode[idx] || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            if (val) {
                              setVerificationCode(prev => (prev + val).substring(0, 6));
                              // Move focus to next input
                              const nextSibling = e.target.nextElementSibling as HTMLInputElement;
                              if (nextSibling) nextSibling.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Backspace') {
                              setVerificationCode(prev => prev.substring(0, prev.length - 1));
                              const prevSibling = (e.target as HTMLInputElement).previousElementSibling as HTMLInputElement;
                              if (prevSibling) prevSibling.focus();
                            }
                          }}
                          className="w-12 h-12 text-center text-lg font-bold bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500"
                        />
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 rounded-xl text-sm transition-all shadow-sm cursor-pointer active:scale-98"
                  >
                    Verify & Access Dashboard
                  </button>
                </form>

                <div className="flex flex-col items-center space-y-2 text-xs">
                  <span className="text-slate-500 dark:text-slate-450">Didn't receive code?</span>
                  <button
                    onClick={() => {
                      setNotification('Verification email has been resent to your inbox.');
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="text-indigo-650 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                  >
                    Resend Code
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
