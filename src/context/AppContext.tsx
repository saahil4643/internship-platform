import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Student, Project, Task, Announcement, Notification, DocRequest, TaskSubmission } from '../types';

interface AppContextType {
  userRole: 'student' | 'admin';
  setUserRole: (role: 'student' | 'admin') => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  authScreen: 'login' | 'register' | 'forgot' | 'reset' | 'verify';
  setAuthScreen: (screen: 'login' | 'register' | 'forgot' | 'reset' | 'verify') => void;
  students: Student[];
  projects: Project[];
  tasks: Task[];
  announcements: Announcement[];
  notifications: Notification[];
  docRequests: DocRequest[];
  currentStudent: Student;
  updateStudentProfile: (updates: Partial<Student>) => void;
  addProject: (project: Omit<Project, 'id' | 'progress' | 'teamMembers'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  assignStudentToProject: (projectId: string, studentId: string) => void;
  removeStudentFromProject: (projectId: string, studentId: string) => void;
  addTask: (task: Omit<Task, 'id' | 'projectName' | 'comments' | 'status'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  submitTask: (id: string, submission: TaskSubmission) => void;
  reviewTask: (id: string, status: 'approved' | 'rejected' | 'changes_requested', feedback: string) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  requestDoc: (type: DocRequest['type']) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toggleStudentStatus: (id: string) => void;
  deleteStudent: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {
    id: 'std_1',
    name: 'Alex Rivera',
    email: 'alex.rivera@university.edu',
    phone: '+1 (555) 234-5678',
    college: 'Massachusetts Institute of Technology',
    degree: 'Bachelor of Science',
    branch: 'Computer Science & Engineering',
    graduationYear: '2027',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Git'],
    status: 'active',
    currentProjectId: 'proj_1',
    performanceScore: 94,
    durationWeeks: 12,
    profileCompletion: 85,
    github: 'https://github.com/alexrivera',
    linkedin: 'https://linkedin.com/in/alexrivera',
    portfolio: 'https://alexrivera.dev'
  },
  {
    id: 'std_2',
    name: 'Sarah Chen',
    email: 'sarah.chen@stanford.edu',
    phone: '+1 (555) 876-5432',
    college: 'Stanford University',
    degree: 'Master of Science',
    branch: 'Artificial Intelligence',
    graduationYear: '2026',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
    skills: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker', 'AWS'],
    status: 'active',
    currentProjectId: 'proj_2',
    performanceScore: 98,
    durationWeeks: 16,
    profileCompletion: 90,
    github: 'https://github.com/schen-ai',
    linkedin: 'https://linkedin.com/in/sarah-chen-ai'
  },
  {
    id: 'std_3',
    name: 'Liam Johnson',
    email: 'liam.j@berkeley.edu',
    phone: '+1 (555) 345-6789',
    college: 'UC Berkeley',
    degree: 'Bachelor of Arts',
    branch: 'Data Science',
    graduationYear: '2027',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    skills: ['SQL', 'Pandas', 'Tableau', 'Python', 'Machine Learning'],
    status: 'active',
    currentProjectId: 'proj_2',
    performanceScore: 88,
    durationWeeks: 12,
    profileCompletion: 70,
    github: 'https://github.com/liamj-data'
  },
  {
    id: 'std_4',
    name: 'Emma Watson',
    email: 'emma.w@oxford.edu',
    phone: '+44 7700 900077',
    college: 'University of Oxford',
    degree: 'Bachelor of Engineering',
    branch: 'Software Engineering',
    graduationYear: '2026',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=120',
    skills: ['Vue.js', 'Express.js', 'MongoDB', 'JavaScript', 'C#'],
    status: 'active',
    currentProjectId: 'proj_3',
    performanceScore: 92,
    durationWeeks: 10,
    profileCompletion: 95,
    github: 'https://github.com/emma-codes',
    linkedin: 'https://linkedin.com/in/emma-watson-dev',
    portfolio: 'https://emmawatson.codes'
  },
  {
    id: 'std_5',
    name: 'Noah Garcia',
    email: 'noah.g@caltech.edu',
    phone: '+1 (555) 901-2345',
    college: 'California Institute of Technology',
    degree: 'PhD',
    branch: 'Computational Mathematics',
    graduationYear: '2028',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    skills: ['Rust', 'C++', 'WebAssembly', 'Go', 'Kubernetes'],
    status: 'suspended',
    performanceScore: 82,
    durationWeeks: 24,
    profileCompletion: 60
  }
];

const initialProjects: Project[] = [
  {
    id: 'proj_1',
    name: 'Fintech Ledger API',
    description: 'Build a secure, scalable, and audit-compliant ledger API for tracking real-time transactions with double-entry accounting constraints.',
    domain: 'Backend / Fintech',
    skillsRequired: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Jest'],
    teamMembers: ['std_1'],
    progress: 65,
    status: 'active',
    startDate: '2026-06-01',
    endDate: '2026-08-31',
    repositoryUrl: 'https://github.com/platform-org/fintech-ledger-api',
    deploymentUrl: 'https://api-sandbox.finledger.dev',
    overview: 'This project aims to implement a highly performant and secure banking ledger system. The ledger records financial transactions in a tamper-proof manner using cryptographic hashing, ensuring absolute auditing accuracy. The backend must handle high concurrency and support sub-millisecond transaction processing with ACID compliance.',
    resources: [
      { id: 'res_1', title: 'Double Entry Bookkeeping Basics', type: 'article', url: 'https://www.accountingcoach.com/double-entry-bookkeeping/explanation', durationOrSize: '15 min read' },
      { id: 'res_2', title: 'Database Design for Financial Systems', type: 'video', url: 'https://youtube.com/watch?v=financial-db-design', durationOrSize: '42 mins' },
      { id: 'res_3', title: 'Ledger API Spec & Swagger Docs', type: 'api', url: 'https://swagger.io/ledger-spec', durationOrSize: '1.2 MB' },
      { id: 'res_4', title: 'Dockerizing PostgreSQL for Local Dev', type: 'doc', url: 'https://docs.docker.com/samples/postgresql', durationOrSize: '5 pages' }
    ],
    milestones: [
      { id: 'ms_1', title: 'Database Schema & Migration Scripts', dueDate: '2026-06-15', status: 'completed' },
      { id: 'ms_2', title: 'Double-entry Transaction Routes', dueDate: '2026-07-10', status: 'pending' },
      { id: 'ms_3', title: 'Audit Trail and Lock Mechanisms', dueDate: '2026-08-01', status: 'pending' },
      { id: 'ms_4', title: 'Performance Testing & Load Balance', dueDate: '2026-08-20', status: 'pending' }
    ],
    timeline: [
      { date: '2026-06-01', event: 'Project Kickoff & Team Onboarding' },
      { date: '2026-06-12', event: 'DB Schema approved by Architect' },
      { date: '2026-06-25', event: 'Basic CRUD operations for accounts completed' }
    ]
  },
  {
    id: 'proj_2',
    name: 'AI Resume Scanner',
    description: 'An AI-powered application that parses resumes (PDF/Docx), extracts key skills, experience details, and matches them against job descriptions using LLMs.',
    domain: 'Artificial Intelligence / ML',
    skillsRequired: ['Python', 'FastAPI', 'PyTorch', 'React', 'Tailwind CSS'],
    teamMembers: ['std_2', 'std_3'],
    progress: 40,
    status: 'active',
    startDate: '2026-06-15',
    endDate: '2026-09-15',
    repositoryUrl: 'https://github.com/platform-org/ai-resume-scanner',
    overview: 'The AI Resume Scanner helps recruitment teams parse hundreds of resumes in seconds. Using advanced natural language processing (NLP) and Large Language Models, the scanner ranks applicants based on contextual relevance, skill overlap, and past project experience, outputting detailed visual matching reports.',
    resources: [
      { id: 'res_5', title: 'FastAPI Tutorial for Beginners', type: 'video', url: 'https://youtube.com/watch?v=fastapi', durationOrSize: '1 hr 15 mins' },
      { id: 'res_6', title: 'HuggingFace Named Entity Recognition', type: 'doc', url: 'https://huggingface.co/tasks/token-classification', durationOrSize: '8 pages' },
      { id: 'res_7', title: 'UI Dashboard Mockups in Figma', type: 'design', url: 'https://figma.com/file/resume-scanner-ui', durationOrSize: '12 frames' }
    ],
    milestones: [
      { id: 'ms_5', title: 'Resume Parser API (PDF Extraction)', dueDate: '2026-07-05', status: 'completed' },
      { id: 'ms_6', title: 'LLM Prompt Engineering & Score Logic', dueDate: '2026-07-30', status: 'pending' },
      { id: 'ms_7', title: 'React Frontend Dashboard UI', dueDate: '2026-08-20', status: 'pending' },
      { id: 'ms_8', title: 'Deployment on AWS ECS', dueDate: '2026-09-10', status: 'pending' }
    ],
    timeline: [
      { date: '2026-06-15', event: 'Project Kickoff' },
      { date: '2026-06-28', event: 'PDF parsing module successfully tests 95% accuracy' }
    ]
  },
  {
    id: 'proj_3',
    name: 'SaaS Analytics Dashboard',
    description: 'A high-performance analytics interface tracking user sessions, conversion rates, heatmaps, and financial metrics with modular widget configurations.',
    domain: 'Frontend Engineering',
    skillsRequired: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    teamMembers: ['std_4'],
    progress: 100,
    status: 'completed',
    startDate: '2026-05-01',
    endDate: '2026-06-30',
    repositoryUrl: 'https://github.com/platform-org/saas-analytics-dashboard',
    deploymentUrl: 'https://analytics-demo.saasplatform.com',
    overview: 'A premium client-facing dashboard showing business intelligence metrics. Includes real-time websocket integrations, drag-and-drop widget layouts, dark theme transitions, and highly optimized SVGs to load huge timelines of financial metrics without visual stutter.',
    resources: [
      { id: 'res_8', title: 'Recharts Performance Optimization', type: 'article', url: 'https://medium.com/recharts-performance', durationOrSize: '8 min read' }
    ],
    milestones: [
      { id: 'ms_9', title: 'Dashboard Widget Framework', dueDate: '2026-05-15', status: 'completed' },
      { id: 'ms_10', title: 'Websocket Integration & Cache State', dueDate: '2026-06-05', status: 'completed' },
      { id: 'ms_11', title: 'Final UX Polish & Core Audits', dueDate: '2026-06-25', status: 'completed' }
    ],
    timeline: [
      { date: '2026-05-01', event: 'Project Kickoff' },
      { date: '2026-05-20', event: 'Widget layouts completed' },
      { date: '2026-06-10', event: 'Websocket telemetry connected' },
      { date: '2026-06-28', event: 'Project completed and approved' }
    ]
  }
];

const initialTasks: Task[] = [
  {
    id: 'task_1',
    title: 'Design Database Schema',
    description: 'Create a PostgreSQL-compliant entity relationship diagram (ERD) and write SQL migration scripts for ledger accounts, transactions, entries, and audit logs. Make sure accounts support double-entry accounting (debit vs credit totals must match).',
    projectId: 'proj_1',
    projectName: 'Fintech Ledger API',
    priority: 'high',
    deadline: '2026-06-15',
    status: 'completed',
    comments: [
      { id: 'c_1', authorName: 'Jane Doe', authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120', authorRole: 'admin', content: 'Make sure you use UUIDs for transaction references to prevent sequence scanning vulnerabilities.', timestamp: '2026-06-11 10:15 AM' },
      { id: 'c_2', authorName: 'Alex Rivera', authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120', authorRole: 'student', content: 'Updated! Added UUIDv4 for ID fields and added indexing on account_id and timestamp.', timestamp: '2026-06-12 04:30 PM' }
    ],
    submission: {
      githubUrl: 'https://github.com/platform-org/fintech-ledger-api/pull/1',
      liveDemoUrl: '',
      notes: 'I have attached the SQL files and migration setup. The ERD is saved under docs/erd.png.',
      submittedAt: '2026-06-12 04:28 PM',
      fileName: 'schema.sql'
    },
    reviewStatus: 'approved',
    assigneeId: 'std_1'
  },
  {
    id: 'task_2',
    title: 'Implement JWT Authentication',
    description: 'Implement secure login, registration, token refresh, and blacklisting endpoints using JWT. Use bcryptjs for password hashing and store active sessions in Redis for invalidation upon logout.',
    projectId: 'proj_1',
    projectName: 'Fintech Ledger API',
    priority: 'medium',
    deadline: '2026-07-08',
    status: 'under_review',
    comments: [
      { id: 'c_3', authorName: 'Alex Rivera', authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=120', authorRole: 'student', content: 'Completed JWT authentication with refresh token rotation and Redis blacklist. Please review.', timestamp: '2026-07-01 02:40 PM' }
    ],
    submission: {
      githubUrl: 'https://github.com/platform-org/fintech-ledger-api/pull/3',
      liveDemoUrl: 'https://api-sandbox.finledger.dev/auth/login',
      notes: 'Tested using Postman. Added local integration tests for token expiry and token reuse detection.',
      submittedAt: '2026-07-02 01:15 AM',
      fileName: 'auth-jwt.zip'
    },
    reviewStatus: 'pending',
    assigneeId: 'std_1'
  },
  {
    id: 'task_3',
    title: 'Integrate Stripe Webhooks',
    description: 'Set up Stripe endpoint handlers to listen to payment_intent.succeeded and customer.subscription.created events. Update local database ledger accounts dynamically upon receipt.',
    projectId: 'proj_1',
    projectName: 'Fintech Ledger API',
    priority: 'high',
    deadline: '2026-07-20',
    status: 'in_progress',
    comments: [],
    assigneeId: 'std_1'
  },
  {
    id: 'task_4',
    title: 'Write Unit Tests for Ledger API',
    description: 'Achieve >85% code coverage for transaction validation, account transfers, and ledger locks. Use Jest and Supertest.',
    projectId: 'proj_1',
    projectName: 'Fintech Ledger API',
    priority: 'low',
    deadline: '2026-08-15',
    status: 'pending',
    comments: [],
    assigneeId: 'std_1'
  },
  {
    id: 'task_5',
    title: 'Develop PDF Resume Parser',
    description: 'Implement a Python service using PyPDF2 or pdfminer to extract text, formatting, and structural elements from uploaded resumes.',
    projectId: 'proj_2',
    projectName: 'AI Resume Scanner',
    priority: 'high',
    deadline: '2026-07-05',
    status: 'completed',
    comments: [],
    submission: {
      githubUrl: 'https://github.com/platform-org/ai-resume-scanner/pull/2',
      notes: 'Parser parses nested structures, single/double column resumes, and outputs clean JSON.',
      submittedAt: '2026-07-01 10:00 AM'
    },
    reviewStatus: 'approved',
    assigneeId: 'std_2'
  },
  {
    id: 'task_6',
    title: 'Build LLM Matching Engine',
    description: 'Develop the prompt layouts and run embedding searches using OpenAI API to match resume JSON outputs against job description criteria.',
    projectId: 'proj_2',
    projectName: 'AI Resume Scanner',
    priority: 'high',
    deadline: '2026-07-25',
    status: 'in_progress',
    comments: [],
    assigneeId: 'std_2'
  },
  {
    id: 'task_7',
    title: 'Create Dashboard Components',
    description: 'Build React components for file upload drag-and-drop, matching percentage ring, and detailed category comparison tables.',
    projectId: 'proj_2',
    projectName: 'AI Resume Scanner',
    priority: 'medium',
    deadline: '2026-08-10',
    status: 'pending',
    comments: [],
    assigneeId: 'std_3'
  }
];

const initialAnnouncements: Announcement[] = [
  {
    id: 'ann_1',
    title: 'Mid-Term Internship Evaluations',
    category: 'deadlines',
    date: '2026-07-02',
    description: 'The mid-term project evaluations will commence from July 10th to July 15th. All interns are required to submit their updated project repositories and ensure all tasks marked "in_progress" are pushed for review. Project managers will host 15-minute 1-on-1 feedback sessions.',
    attachments: [
      { name: 'Evaluation_Rubric.pdf', url: '#', size: '240 KB' },
      { name: 'Feedback_Schedule.xlsx', url: '#', size: '1.2 MB' }
    ]
  },
  {
    id: 'ann_2',
    title: 'Guest Lecture: Scaling Backend Architecture at Stripe',
    category: 'events',
    date: '2026-06-29',
    description: 'Join us this Friday at 4:00 PM EST for an exclusive workshop led by a Principal Engineer at Stripe. We will discuss event-driven architectures, processing 100k transactions per second, and designing APIs that developers love. Zoom link is attached.',
    attachments: [
      { name: 'Stripe_Workshop_Invite.ics', url: '#', size: '15 KB' }
    ]
  },
  {
    id: 'ann_3',
    title: 'Platform System Migration Scheduled',
    category: 'general',
    date: '2026-06-25',
    description: 'Our internal code sandbox environments will undergo maintenance on Sunday, July 5th, from 02:00 AM to 06:00 AM EST. During this window, sandbox databases will be offline. Please plan your testing runs accordingly.',
    attachments: []
  }
];

const initialNotifications: Notification[] = [
  {
    id: 'nt_1',
    title: 'Task Approved',
    category: 'task_reviewed',
    date: '2026-07-02T16:30:00Z',
    isRead: false,
    description: 'Your submission for "Design Database Schema" has been approved by Admin Jane Doe. Excellent work on indexing!',
    targetId: 'task_1'
  },
  {
    id: 'nt_2',
    title: 'New Announcement: Mid-Term Evaluations',
    category: 'announcement',
    date: '2026-07-02T10:00:00Z',
    isRead: false,
    description: 'Please review the schedule and rubrics for the mid-term evaluation. Deadline is July 10th.',
    targetId: 'ann_1'
  },
  {
    id: 'nt_3',
    title: 'Deadline Reminder',
    category: 'deadline_reminder',
    date: '2026-07-01T09:00:00Z',
    isRead: true,
    description: 'Task "Implement JWT Authentication" is due in 7 days.',
    targetId: 'task_2'
  },
  {
    id: 'nt_4',
    title: 'API Reference Docs Updated',
    category: 'doc_update',
    date: '2026-06-28T14:20:00Z',
    isRead: true,
    description: 'Documentation for Stripe ledger integrations has been updated with v4 payload webhook samples.'
  }
];

const initialDocRequests: DocRequest[] = [
  {
    id: 'req_1',
    studentId: 'std_1',
    studentName: 'Alex Rivera',
    type: 'verification_letter',
    requestDate: '2026-06-18',
    status: 'completed',
    paymentStatus: 'not_applicable',
    downloadUrl: '#',
    timeline: [
      { title: 'Request Submitted', description: 'Student requested a Verification Letter.', timestamp: '2026-06-18 09:30 AM', status: 'completed' },
      { title: 'Verified and Drafted', description: 'Admin verified enrollment details and generated draft.', timestamp: '2026-06-19 11:00 AM', status: 'completed' },
      { title: 'Signed and Uploaded', description: 'Letter signed by Operations and uploaded to portal.', timestamp: '2026-06-20 03:45 PM', status: 'completed' }
    ]
  },
  {
    id: 'req_2',
    studentId: 'std_1',
    studentName: 'Alex Rivera',
    type: 'experience_letter',
    requestDate: '2026-07-02',
    status: 'pending',
    paymentStatus: 'unpaid',
    timeline: [
      { title: 'Request Submitted', description: 'Student requested an Experience Letter.', timestamp: '2026-07-02 11:15 AM', status: 'completed' },
      { title: 'Payment Pending', description: 'A processing fee of $15 is required for print and postage.', timestamp: '2026-07-02 11:16 AM', status: 'current' },
      { title: 'Admin Review', description: 'Awaiting admin signature and verification of project completion.', timestamp: '--', status: 'upcoming' }
    ]
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<'student' | 'admin'>('student');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true); // default to logged in for ease of use
  const [authScreen, setAuthScreen] = useState<'login' | 'register' | 'forgot' | 'reset' | 'verify'>('login');
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [docRequests, setDocRequests] = useState<DocRequest[]>(initialDocRequests);

  // Alex Rivera is the logged-in student in our mock setup
  const [currentStudent, setCurrentStudent] = useState<Student>(initialStudents[0]);

  // Sync currentStudent state changes back to students array
  useEffect(() => {
    setStudents(prev => prev.map(s => s.id === currentStudent.id ? currentStudent : s));
  }, [currentStudent]);

  const updateStudentProfile = (updates: Partial<Student>) => {
    setCurrentStudent(prev => {
      const updated = { ...prev, ...updates };
      // Recalculate profile completion percentage based on filled fields
      const fields = [
        updated.name, updated.email, updated.phone, updated.college,
        updated.degree, updated.branch, updated.graduationYear,
        updated.github, updated.linkedin, updated.portfolio,
        updated.skills.length > 0 ? 'skills' : ''
      ];
      const filled = fields.filter(Boolean).length;
      updated.profileCompletion = Math.round((filled / fields.length) * 100);
      return updated;
    });
  };

  const addProject = (projectData: Omit<Project, 'id' | 'progress' | 'teamMembers'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj_${Date.now()}`,
      progress: 0,
      teamMembers: [],
    };
    setProjects(prev => [newProject, ...prev]);

    // Create an announcement about the new project
    addAnnouncement({
      title: `New Project Released: ${newProject.name}`,
      category: 'projects',
      description: `We are excited to launch "${newProject.name}" in the "${newProject.domain}" domain. Review requirements and express your interest to the Admin!`,
    });
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    // Also clear project association from students
    setStudents(prev => prev.map(s => s.currentProjectId === id ? { ...s, currentProjectId: undefined } : s));
    if (currentStudent.currentProjectId === id) {
      setCurrentStudent(prev => ({ ...prev, currentProjectId: undefined }));
    }
  };

  const assignStudentToProject = (projectId: string, studentId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId && !p.teamMembers.includes(studentId)) {
        return { ...p, teamMembers: [...p.teamMembers, studentId] };
      }
      return p;
    }));

    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return { ...s, currentProjectId: projectId };
      }
      return s;
    }));

    if (studentId === currentStudent.id) {
      setCurrentStudent(prev => ({ ...prev, currentProjectId: projectId }));
    }

    // Add notification
    const proj = projects.find(p => p.id === projectId);
    const notification: Notification = {
      id: `nt_${Date.now()}`,
      title: 'Project Assigned',
      category: 'task_assigned',
      date: new Date().toISOString(),
      isRead: false,
      description: `You have been assigned to project "${proj?.name || 'New Project'}".`,
      targetId: projectId
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const removeStudentFromProject = (projectId: string, studentId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { ...p, teamMembers: p.teamMembers.filter(id => id !== studentId) };
      }
      return p;
    }));

    setStudents(prev => prev.map(s => {
      if (s.id === studentId && s.currentProjectId === projectId) {
        return { ...s, currentProjectId: undefined };
      }
      return s;
    }));

    if (studentId === currentStudent.id) {
      setCurrentStudent(prev => ({ ...prev, currentProjectId: undefined }));
    }
  };

  const addTask = (taskData: Omit<Task, 'id' | 'projectName' | 'comments' | 'status'>) => {
    const project = projects.find(p => p.id === taskData.projectId);
    const newTask: Task = {
      ...taskData,
      id: `task_${Date.now()}`,
      projectName: project ? project.name : 'Unknown Project',
      status: 'pending',
      comments: []
    };
    setTasks(prev => [newTask, ...prev]);

    // Notification for assignee
    if (taskData.assigneeId === currentStudent.id) {
      const notification: Notification = {
        id: `nt_${Date.now()}`,
        title: 'New Task Assigned',
        category: 'task_assigned',
        date: new Date().toISOString(),
        isRead: false,
        description: `Task "${newTask.title}" has been assigned to you in project "${newTask.projectName}".`,
        targetId: newTask.id
      };
      setNotifications(prev => [notification, ...prev]);
    }
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const updated = { ...t, ...updates };
        // Recalculate project progress if status changes
        setTimeout(() => {
          recalculateProjectProgress(updated.projectId);
        }, 50);
        return updated;
      }
      return t;
    }));
  };

  const recalculateProjectProgress = (projectId: string) => {
    setTasks(currentTasks => {
      const projTasks = currentTasks.filter(t => t.projectId === projectId);
      if (projTasks.length === 0) return currentTasks;
      const completed = projTasks.filter(t => t.status === 'completed').length;
      const progress = Math.round((completed / projTasks.length) * 100);
      
      setProjects(prevProj => prevProj.map(p => p.id === projectId ? { ...p, progress } : p));
      return currentTasks;
    });
  };

  const submitTask = (id: string, submission: TaskSubmission) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newComments = [...t.comments, {
          id: `c_${Date.now()}`,
          authorName: currentStudent.name,
          authorAvatar: currentStudent.avatar,
          authorRole: 'student' as const,
          content: `Task submitted. Notes: ${submission.notes || 'None'}`,
          timestamp: new Date().toLocaleString()
        }];
        return {
          ...t,
          status: 'under_review',
          submission,
          reviewStatus: 'pending',
          comments: newComments
        };
      }
      return t;
    }));

    // Add alert notification for Admin in system (internally tracked)
    const task = tasks.find(t => t.id === id);
    const notification: Notification = {
      id: `nt_${Date.now()}`,
      title: 'Submission Received',
      category: 'task_reviewed',
      date: new Date().toISOString(),
      isRead: false,
      description: `${currentStudent.name} submitted assignment for "${task?.title}".`
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const reviewTask = (id: string, reviewStatus: 'approved' | 'rejected' | 'changes_requested', feedback: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const newComments = [...t.comments, {
          id: `c_${Date.now()}`,
          authorName: 'Admin Jane Doe',
          authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120',
          authorRole: 'admin' as const,
          content: `Review Feedback: ${feedback}`,
          timestamp: new Date().toLocaleString()
        }];

        const nextStatus = reviewStatus === 'approved' ? 'completed' as const : 
                            reviewStatus === 'changes_requested' ? 'in_progress' as const : t.status;

        const updated = {
          ...t,
          status: nextStatus,
          reviewStatus,
          reviewFeedback: feedback,
          comments: newComments
        };

        // Recalculate project progress
        setTimeout(() => {
          recalculateProjectProgress(updated.projectId);
        }, 50);

        // Add Notification for student
        if (t.assigneeId === currentStudent.id) {
          const statusText = reviewStatus === 'approved' ? 'Approved' : 
                             reviewStatus === 'rejected' ? 'Rejected' : 'Changes Requested';
          
          const notification: Notification = {
            id: `nt_${Date.now()}`,
            title: `Task ${statusText}`,
            category: 'task_reviewed',
            date: new Date().toISOString(),
            isRead: false,
            description: `Your submission for "${t.title}" was reviewed: "${feedback.substring(0, 40)}..."`,
            targetId: t.id
          };
          setNotifications(prev => [notification, ...prev]);
        }

        return updated;
      }
      return t;
    }));
  };

  const addAnnouncement = (announcementData: Omit<Announcement, 'id' | 'date'>) => {
    const newAnnouncement: Announcement = {
      ...announcementData,
      id: `ann_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);

    // Send a notification about the announcement to all users
    const notification: Notification = {
      id: `nt_${Date.now()}`,
      title: 'New Announcement',
      category: 'announcement',
      date: new Date().toISOString(),
      isRead: false,
      description: `Announcement: "${newAnnouncement.title}"`,
      targetId: newAnnouncement.id
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const requestDoc = (type: DocRequest['type']) => {
    const typeLabel = type === 'certificate' ? 'Internship Certificate' : 
                      type === 'experience_letter' ? 'Experience Letter' : 'Verification Letter';
    
    const newRequest: DocRequest = {
      id: `req_${Date.now()}`,
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      type,
      requestDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      paymentStatus: type === 'experience_letter' ? 'unpaid' : 'not_applicable',
      timeline: [
        { title: 'Request Submitted', description: `Student requested ${typeLabel}.`, timestamp: new Date().toLocaleString(), status: 'completed' },
        { title: 'Admin Review', description: 'Admin is verifying task submissions and attendance logs.', timestamp: '--', status: 'current' },
        { title: 'Issuance', description: `Signing and uploading the final document.`, timestamp: '--', status: 'upcoming' }
      ]
    };

    setDocRequests(prev => [newRequest, ...prev]);

    const notification: Notification = {
      id: `nt_${Date.now()}`,
      title: 'Document Requested',
      category: 'doc_update',
      date: new Date().toISOString(),
      isRead: false,
      description: `You have successfully requested a ${typeLabel}. Track status in requests.`
    };
    setNotifications(prev => [notification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleStudentStatus = (id: string) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'active' ? 'suspended' : 'active' } : s));
    if (currentStudent.id === id) {
      setCurrentStudent(prev => ({ ...prev, status: prev.status === 'active' ? 'suspended' : 'active' }));
    }
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    // Remove student from any assigned projects
    setProjects(prev => prev.map(p => ({
      ...p,
      teamMembers: p.teamMembers.filter(tid => tid !== id)
    })));
  };

  return (
    <AppContext.Provider value={{
      userRole,
      setUserRole,
      isAuthenticated,
      setIsAuthenticated,
      authScreen,
      setAuthScreen,
      students,
      projects,
      tasks,
      announcements,
      notifications,
      docRequests,
      currentStudent,
      updateStudentProfile,
      addProject,
      updateProject,
      deleteProject,
      assignStudentToProject,
      removeStudentFromProject,
      addTask,
      updateTask,
      submitTask,
      reviewTask,
      addAnnouncement,
      requestDoc,
      markNotificationRead,
      markAllNotificationsRead,
      toggleStudentStatus,
      deleteStudent
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
