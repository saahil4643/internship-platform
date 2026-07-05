import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Badge } from './Badge';
import {
  GraduationCap,
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Map,
  Megaphone,
  FileText,
  User,
  Settings,
  Bell,
  Sun,
  Moon,
  Menu,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  BarChart3,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LayoutShellProps {
  children: React.ReactNode;
}

export const LayoutShell: React.FC<LayoutShellProps> = ({ children }) => {
  const {
    userRole,
    setUserRole,
    setIsAuthenticated,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    currentStudent
  } = useApp();

  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [globalSearch, setGlobalSearch] = useState('');

  // Sync theme with HTML document element
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  const studentNavigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Projects', icon: FolderKanban, path: '/projects' },
    { name: 'Tasks', icon: CheckSquare, path: '/tasks' },
    { name: 'Learning Roadmap', icon: Map, path: '/roadmap' },
    { name: 'Announcements', icon: Megaphone, path: '/announcements' },
    { name: 'Document Requests', icon: FileText, path: '/requests' },
    { name: 'My Profile', icon: User, path: '/profile' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  const adminNavigation = [
    { name: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Student Management', icon: Users, path: '/admin/students' },
    { name: 'Project Management', icon: FolderKanban, path: '/admin/projects' },
    { name: 'Task Management', icon: CheckSquare, path: '/admin/tasks' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'Announcements', icon: Megaphone, path: '/announcements' },
    { name: 'Document Requests', icon: FileText, path: '/requests' },
    { name: 'Settings', icon: Settings, path: '/settings' }
  ];

  const navigation = userRole === 'admin' ? adminNavigation : studentNavigation;

  // Breadcrumbs generator
  const getBreadcrumbs = (): { label: string; onClick?: () => void }[] => {
    const path = location.pathname;
    if (path === '/') return [{ label: 'Dashboard' }];
    if (path === '/admin') return [{ label: 'Admin Dashboard' }];

    const segments = path.split('/').filter(Boolean);
    return segments.map((seg, idx) => {
      const label = seg
        .replace('-', ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const pathUrl = '/' + segments.slice(0, idx + 1).join('/');
      return {
        label,
        onClick: () => navigate(pathUrl)
      };
    });
  };

  const breadcrumbs = getBreadcrumbs();
  const unreadNotifications = notifications.filter(n => !n.isRead);

  // Close dropdowns on route changes
  useEffect(() => {
    setIsNotificationOpen(false);
    setIsProfileOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-250">
      {/* MOBILE SIDEBAR DRAWERS */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 bg-indigo-650 rounded-lg flex items-center justify-center text-white">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span className="font-bold text-lg dark:text-white">InternFlow</span>
                </div>
                <nav className="space-y-1.5 relative">
                  {navigation.map((item) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        onClick={() => navigate(item.path)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer outline-none relative z-10 ${
                          isActive
                            ? 'text-indigo-650 dark:text-indigo-400 font-semibold'
                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="activeNavHighlightMobile"
                            className="absolute inset-0 bg-indigo-50 dark:bg-indigo-950/30 border-l-2 border-indigo-600 dark:border-indigo-400 rounded-xl -z-10"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom user profile in mobile drawer */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-9 w-9 rounded-full object-cover"
                    src={userRole === 'admin' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' : currentStudent.avatar}
                    alt="profile"
                  />
                  <div>
                    <h4 className="text-xs font-semibold dark:text-white">
                      {userRole === 'admin' ? 'Jane Doe' : currentStudent.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 capitalize">{userRole} Portal</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950/30 p-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer text-slate-600 dark:text-slate-350"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP COLLAPSIBLE SIDEBAR */}
      <aside
        className={`hidden md:flex flex-col justify-between border-r border-slate-205 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 shrink-0 ${
          isSidebarCollapsed ? 'w-[72px] px-3' : 'w-64 px-5'
        } py-6`}
      >
        <div className="space-y-8">
          {/* Logo / Brand header */}
          <div className="flex items-center justify-between">
            {!isSidebarCollapsed && (
              <div className="flex items-center space-x-2.5">
                <div className="h-8.5 w-8.5 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-sm shadow-indigo-650/10">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-bold text-base tracking-tight text-slate-850 dark:text-white">
                  InternFlow
                </span>
              </div>
            )}
            {isSidebarCollapsed && (
              <div className="mx-auto h-8.5 w-8.5 bg-indigo-600 dark:bg-indigo-500 rounded-xl flex items-center justify-center text-white">
                <GraduationCap className="h-5 w-5" />
              </div>
            )}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 cursor-pointer hidden md:block ${
                isSidebarCollapsed ? 'mx-auto mt-2' : ''
              }`}
            >
              {isSidebarCollapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 relative">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path || 
                              (item.path !== '/' && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center py-2 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer outline-none relative group z-10 ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-slate-500 hover:text-slate-900 dark:text-slate-450 dark:hover:text-white'
                  } ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 bg-indigo-50/70 dark:bg-indigo-950/20 border-l-2 border-indigo-600 dark:border-indigo-400 rounded-xl -z-10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className={`h-4.5 w-4.5 transition-colors ${
                    isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-450 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white'
                  }`} />
                  {!isSidebarCollapsed && <span>{item.name}</span>}
                  
                  {isSidebarCollapsed && (
                    <div className="absolute left-16 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 shadow-md">
                      {item.name}
                    </div>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card at bottom of sidebar */}
        <div className="border-t border-slate-100 dark:border-slate-800/80 pt-4 flex flex-col space-y-3">
          <div className={`flex items-center ${isSidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <img
              className="h-8.5 w-8.5 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700"
              src={userRole === 'admin' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' : currentStudent.avatar}
              alt="profile"
            />
            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-slate-805 dark:text-white truncate">
                  {userRole === 'admin' ? 'Jane Doe' : currentStudent.name}
                </h4>
                <p className="text-[10px] text-slate-400 capitalize truncate">{userRole} Portal</p>
              </div>
            )}
          </div>
          {!isSidebarCollapsed ? (
            <button
              onClick={handleLogout}
              className="flex items-center justify-center space-x-2 text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 p-2 rounded-xl text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="mx-auto p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer relative group"
            >
              <LogOut className="h-4 w-4" />
              <div className="absolute left-16 px-2.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-50 shadow-md">
                Sign Out
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* TOP NAVBAR */}
        <header className="h-[64px] border-b border-slate-205 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 z-30 px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer md:hidden"
            >
              <Menu className="h-4.5 w-4.5" />
            </button>

            {/* Breadcrumb Navigation */}
            <nav className="flex items-center space-x-1.5 text-xs font-medium text-slate-500 dark:text-slate-450">
              <span className="text-slate-400 dark:text-slate-500">Workspace</span>
              {breadcrumbs.map((item, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="h-3 w-3 text-slate-400 dark:text-slate-650 shrink-0" />
                  {idx === breadcrumbs.length - 1 ? (
                    <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[120px] md:max-w-xs">
                      {item.label}
                    </span>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer outline-none"
                    >
                      {item.label}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Global Search Bar */}
            <div className="relative hidden lg:block w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search resources, tasks..."
                className="w-full bg-slate-100 hover:bg-slate-150/70 focus:bg-white dark:bg-slate-950 dark:hover:bg-slate-900 dark:focus:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-550 border border-transparent focus:border-indigo-500/20 rounded-xl py-1.5 pl-9 pr-4 text-xs transition-all focus:outline-none"
              />
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50 relative overflow-hidden"
              title="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -12, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 12, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'light' ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsProfileOpen(false);
                }}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50"
              >
                <Bell className="h-4.5 w-4.5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
                )}
              </button>

              {/* Notification Center Dropdown */}
              <AnimatePresence>
                {isNotificationOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsNotificationOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl z-40 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-800 dark:text-white">Notifications</span>
                        {unreadNotifications.length > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-[10px] text-indigo-600 hover:underline dark:text-indigo-400 font-semibold cursor-pointer"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                      <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/40">
                        {notifications.length === 0 ? (
                          <div className="p-6 text-center text-xs text-slate-400">
                            No notifications yet
                          </div>
                        ) : (
                          notifications.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => markNotificationRead(n.id)}
                              className={`p-3.5 text-xs transition-colors cursor-pointer ${
                                n.isRead 
                                  ? 'bg-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40' 
                                  : 'bg-slate-50/50 dark:bg-slate-800/20 text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/40 font-medium'
                              }`}
                            >
                              <div className="flex justify-between items-start mb-0.5">
                                <Badge type={n.category} className="scale-90 origin-left" />
                                <span className="text-[10px] text-slate-400">
                                  {new Date(n.date).toLocaleDateString()}
                                </span>
                              </div>
                              <h5 className="font-semibold text-[11px] mb-0.5">{n.title}</h5>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                {n.description}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center space-x-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700/50"
              >
                <img
                  className="h-7 w-7 rounded-full object-cover border border-slate-200 dark:border-slate-750"
                  src={userRole === 'admin' ? 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120' : currentStudent.avatar}
                  alt="profile"
                />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-40 p-1.5"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/50 mb-1">
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                          {userRole === 'admin' ? 'Jane Doe' : currentStudent.name}
                        </p>
                        <p className="text-[10px] text-slate-400 capitalize truncate">{userRole} Portal</p>
                      </div>
                      
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/profile');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer outline-none transition-colors"
                      >
                        <User className="h-3.5 w-3.5" />
                        <span>View Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          navigate('/settings');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer outline-none transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" />
                        <span>Settings</span>
                      </button>

                      {/* Quick Switch Role button */}
                      <button
                        onClick={() => {
                          setUserRole(userRole === 'student' ? 'admin' : 'student');
                          setIsProfileOpen(false);
                          navigate(userRole === 'student' ? '/admin' : '/');
                        }}
                        className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 rounded-lg cursor-pointer outline-none font-semibold transition-colors border border-dashed border-indigo-200/50 dark:border-indigo-900/40 my-1"
                      >
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>Switch to {userRole === 'student' ? 'Admin' : 'Student'}</span>
                      </button>

                      <div className="border-t border-slate-100 dark:border-slate-800/50 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center space-x-2 px-3 py-2 text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg cursor-pointer outline-none transition-colors font-medium"
                        >
                          <LogOut className="h-3.5 w-3.5" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT CONTAINER */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
