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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300 relative overflow-hidden">
      {/* Decorative ambient background mesh blobs for overall screen */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl dark:bg-indigo-500/5 pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl dark:bg-purple-500/5 pointer-events-none" />

      {/* Left Pane - Marketing / Branding */}
      <div className="md:w-1/2 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-8 md:p-16 flex flex-col justify-between relative overflow-hidden shrink-0 border-r border-white/5 shadow-2xl z-10">
        {/* Animated dynamic vector blob circles */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-indigo-500/15 rounded-full blur-[100px] animate-float-slower pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] animate-float-faster pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-[90px] animate-pulse-soft pointer-events-none" />

        <div className="relative z-10 flex items-center space-x-3">
          <div className="h-11 w-11 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10 shadow-inner shadow-white/5">
            <GraduationCap className="h-6 w-6 text-indigo-300" />
          </div>
          <span className="text-2xl font-bold tracking-tight font-heading bg-gradient-to-r from-white via-indigo-100 to-slate-300 bg-clip-text text-transparent">
            InternFlow
          </span>
        </div>

        <div className="relative z-10 my-16 md:my-0 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: 'spring', damping: 20 }}
            className="space-y-4"
          >
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/10 text-indigo-200 tracking-wide uppercase">
              🚀 Platform Launch
            </span>
            <h1 className="text-3xl md:text-5xl font-black leading-tight font-heading tracking-tight">
              Empowering the Next Generation of <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Tech Talent</span>.
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, type: 'spring', damping: 20 }}
            className="text-indigo-200/90 text-sm md:text-base max-w-md leading-relaxed font-light"
          >
            Manage milestones, collaborate on production-grade projects, track tasks, and accelerate your engineering career with our structured roadmap.
          </motion.p>
        </div>

        <div className="relative z-10 flex items-center space-x-4 border-t border-white/10 pt-8">
          <div className="flex -space-x-2">
            <img className="h-8.5 w-8.5 rounded-full border-2 border-indigo-950 object-cover hover:scale-105 transition-transform" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120" alt="avatar" />
            <img className="h-8.5 w-8.5 rounded-full border-2 border-indigo-950 object-cover hover:scale-105 transition-transform" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120" alt="avatar" />
            <img className="h-8.5 w-8.5 rounded-full border-2 border-indigo-950 object-cover hover:scale-105 transition-transform" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120" alt="avatar" />
          </div>
          <span className="text-xs text-indigo-200/80 font-medium">
            Joined by over <span className="text-white font-bold">500+</span> active university developers.
          </span>
        </div>
      </div>

      {/* Right Pane - Form Card */}
      <div className="flex-1 p-6 md:p-16 flex flex-col justify-center items-center z-10 relative">
        <div className="w-full max-w-md space-y-6">
          
          {/* Simulation Header */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => handleSimulateLogin('student')}
              className="text-[11px] font-bold bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:hover:bg-indigo-950/65 dark:text-indigo-400 px-3 py-1.5 rounded-xl border border-indigo-100/50 dark:border-indigo-900/30 cursor-pointer active:scale-95 transition-all shadow-sm"
            >
              Simulate Student
            </button>
            <button
              onClick={() => handleSimulateLogin('admin')}
              className="text-[11px] font-bold bg-emerald-50/80 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:hover:bg-emerald-950/65 dark:text-emerald-400 px-3 py-1.5 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30 cursor-pointer active:scale-95 transition-all shadow-sm"
            >
              Simulate Admin
            </button>
          </div>

          <AnimatePresence mode="wait">
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.95 }}
                className="bg-indigo-50/80 border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/40 p-4 rounded-2xl flex items-start space-x-3 text-xs text-indigo-750 dark:text-indigo-305 shadow-sm backdrop-blur-md"
              >
                <ShieldCheck className="h-5 w-5 text-indigo-500 shrink-0" />
                <span>{notification}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Card wrapper with premium styling */}
          <div className="p-6 md:p-8 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 dark:border-slate-800/60 rounded-3xl shadow-xl shadow-slate-200/30 dark:shadow-none animate-border-glow">
            <AnimatePresence mode="wait">
              {/* LOGIN SCREEN */}
              {authScreen === 'login' && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">Welcome back</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Sign in to your internship portal to continue.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-350 tracking-wide uppercase" htmlFor="login-email">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400/80" />
                        <input
                          id="login-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex.rivera@university.edu"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-350 tracking-wide uppercase" htmlFor="login-password">Password</label>
                        <button
                          type="button"
                          onClick={() => setAuthScreen('forgot')}
                          className="text-[11px] text-indigo-650 hover:underline dark:text-indigo-400 font-semibold cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400/80" />
                        <input
                          id="login-password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 cursor-pointer active:scale-[0.98] flex items-center justify-center space-x-2 mt-2"
                    >
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthScreen('register')}
                        className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline cursor-pointer"
                      >
                        Register as Student
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* REGISTER SCREEN */}
              {authScreen === 'register' && (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">Create account</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Register your details to apply for an internship.</p>
                  </div>

                  <form onSubmit={(e) => handleFormSubmit(e, 'verify')} className="space-y-3.5">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-350 tracking-wide uppercase" htmlFor="reg-name">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400/80" />
                        <input
                          id="reg-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Rivera"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-355 tracking-wide uppercase" htmlFor="reg-email">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400/80" />
                        <input
                          id="reg-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex.rivera@university.edu"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-355 tracking-wide uppercase" htmlFor="reg-college">College</label>
                        <div className="relative">
                          <BookOpen className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400/80" />
                          <input
                            id="reg-college"
                            type="text"
                            required
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            placeholder="MIT"
                            className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-355 tracking-wide uppercase" htmlFor="reg-degree">Degree / Branch</label>
                        <input
                          id="reg-degree"
                          type="text"
                          required
                          value={degree}
                          onChange={(e) => setDegree(e.target.value)}
                          placeholder="B.Tech CS"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 px-3.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-355 tracking-wide uppercase" htmlFor="reg-year">Graduation</label>
                        <div className="relative">
                          <Calendar className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400/80" />
                          <select
                            id="reg-year"
                            value={gradYear}
                            onChange={(e) => setGradYear(e.target.value)}
                            className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-9 pr-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                          >
                            <option value="2026">2026</option>
                            <option value="2027">2027</option>
                            <option value="2028">2028</option>
                            <option value="2029">2029</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-600 dark:text-slate-355 tracking-wide uppercase" htmlFor="reg-pass">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400/80" />
                          <input
                            id="reg-pass"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2 pl-9 pr-3 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-600/10 cursor-pointer active:scale-[0.98] flex items-center justify-center space-x-2 mt-2"
                    >
                      <span>Register Account</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Already have an account?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthScreen('login')}
                        className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline cursor-pointer"
                      >
                        Sign In
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* FORGOT PASSWORD SCREEN */}
              {authScreen === 'forgot' && (
                <motion.div
                  key="forgot"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">Reset password</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Enter your email and we'll send verification details to restore access.</p>
                  </div>

                  <form onSubmit={(e) => handleFormSubmit(e, 'reset')} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-350 tracking-wide uppercase" htmlFor="forgot-email">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400/80" />
                        <input
                          id="forgot-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex.rivera@university.edu"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-600/10 cursor-pointer active:scale-[0.98] flex items-center justify-center space-x-2 mt-2"
                    >
                      <span>Send Reset Link</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>

                  <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Remember password?{' '}
                      <button
                        type="button"
                        onClick={() => setAuthScreen('login')}
                        className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline cursor-pointer"
                      >
                        Back to Sign In
                      </button>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* RESET PASSWORD SCREEN */}
              {authScreen === 'reset' && (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-1.5">
                    <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">Create new password</h2>
                    <p className="text-xs text-emerald-650 dark:text-emerald-400 font-semibold flex items-center bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/25">
                      <Key className="h-4 w-4 mr-1.5 shrink-0" /> Code verified. Set your new security credentials.
                    </p>
                  </div>

                  <form onSubmit={(e) => handleFormSubmit(e, 'login')} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-650 dark:text-slate-350 tracking-wide uppercase" htmlFor="reset-pass">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400/80" />
                        <input
                          id="reset-pass"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-650 dark:text-slate-350 tracking-wide uppercase" htmlFor="reset-pass-confirm">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400/80" />
                        <input
                          id="reset-pass-confirm"
                          type="password"
                          required
                          placeholder="••••••••"
                          className="w-full bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-10 pr-4 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-600/10 cursor-pointer active:scale-[0.98] mt-2"
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
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <h2 className="text-2xl font-extrabold font-heading text-slate-900 dark:text-white tracking-tight">Verify your email</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">We've sent a 6-digit confirmation code to your email. Enter it below to unlock the portal.</p>
                  </div>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-slate-600 dark:text-slate-350 tracking-wide uppercase" htmlFor="verify-code">Verification Code</label>
                      <div className="flex space-x-2.5 justify-between">
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
                            className="w-12 h-12 text-center text-lg font-bold bg-white/50 dark:bg-slate-905/60 border border-slate-200 dark:border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-inner"
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-2xl text-xs tracking-wider uppercase transition-all shadow-md shadow-indigo-600/10 cursor-pointer active:scale-[0.98]"
                    >
                      Verify & Access Dashboard
                    </button>
                  </form>

                  <div className="flex flex-col items-center space-y-2 text-xs pt-2 border-t border-slate-100 dark:border-slate-800/60">
                    <span className="text-slate-500 dark:text-slate-455">Didn't receive code?</span>
                    <button
                      onClick={() => {
                        setNotification('Verification email has been resent to your inbox.');
                        setTimeout(() => setNotification(null), 3000);
                      }}
                      className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline cursor-pointer"
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
    </div>
  );
};
