import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LayoutShell } from './components/LayoutShell';
import { AuthPage } from './pages/AuthPage';

// Pages import
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentProfile } from './pages/StudentProfile';
import { ProjectsPage } from './pages/ProjectsPage';
import { TasksPage } from './pages/TasksPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { DocRequestsPage } from './pages/DocRequestsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { StudentManagement } from './pages/StudentManagement';
import { SettingsPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const { isAuthenticated, userRole } = useApp();

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <LayoutShell>
      <Routes>
        {/* STUDENT SPECIFIC ROUTES */}
        {userRole === 'student' && (
          <>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            {/* Fallback redirects for admin urls */}
            <Route path="/admin/*" element={<Navigate to="/" replace />} />
          </>
        )}

        {/* ADMIN SPECIFIC ROUTES */}
        {userRole === 'admin' && (
          <>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<StudentManagement />} />
            {/* Fallback redirects for student urls */}
            <Route path="/profile" element={<Navigate to="/admin" replace />} />
            <Route path="/tasks" element={<Navigate to="/admin" replace />} />
            <Route path="/roadmap" element={<Navigate to="/admin" replace />} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </>
        )}

        {/* SHARED PORTAL ROUTES */}
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/requests" element={<DocRequestsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* CATCH-ALL REDIRECT */}
        <Route path="*" element={<Navigate to={userRole === 'admin' ? '/admin' : '/'} replace />} />
      </Routes>
    </LayoutShell>
  );
};

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
