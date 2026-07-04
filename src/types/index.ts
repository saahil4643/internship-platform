export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  degree: string;
  branch: string;
  graduationYear: string;
  avatar: string;
  skills: string[];
  status: 'active' | 'suspended';
  currentProjectId?: string;
  performanceScore: number;
  durationWeeks: number;
  profileCompletion: number;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface Milestone {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'completed';
}

export interface ProjectResource {
  id: string;
  title: string;
  type: 'video' | 'doc' | 'github' | 'article' | 'api' | 'design';
  url: string;
  durationOrSize?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  domain: string;
  skillsRequired: string[];
  teamMembers: string[]; // student IDs
  progress: number;
  status: 'planning' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  repositoryUrl?: string;
  deploymentUrl?: string;
  overview: string;
  resources: ProjectResource[];
  milestones: Milestone[];
  timeline: { date: string; event: string }[];
}

export interface TaskComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'student' | 'admin';
  content: string;
  timestamp: string;
}

export interface TaskSubmission {
  githubUrl: string;
  liveDemoUrl?: string;
  notes?: string;
  submittedAt: string;
  fileName?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  projectName: string;
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  status: 'pending' | 'in_progress' | 'under_review' | 'completed';
  attachments?: string[];
  comments: TaskComment[];
  submission?: TaskSubmission;
  reviewStatus?: 'pending' | 'approved' | 'rejected' | 'changes_requested';
  reviewFeedback?: string;
  assigneeId: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'general' | 'projects' | 'internship' | 'events' | 'deadlines';
  date: string;
  description: string;
  attachments?: { name: string; url: string; size: string }[];
}

export interface Notification {
  id: string;
  title: string;
  category: 'task_assigned' | 'deadline_reminder' | 'task_reviewed' | 'announcement' | 'doc_update';
  date: string;
  isRead: boolean;
  description: string;
  targetId?: string;
}

export interface RequestTimelineStep {
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface DocRequest {
  id: string;
  studentId: string;
  studentName: string;
  type: 'certificate' | 'experience_letter' | 'verification_letter';
  requestDate: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  paymentStatus: 'unpaid' | 'paid' | 'not_applicable';
  downloadUrl?: string;
  timeline: RequestTimelineStep[];
}
