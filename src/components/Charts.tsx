import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart
} from 'recharts';

// Custom Tooltip component
const CustomTooltip = ({ active, payload, label, prefix = '' }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-3 rounded-xl shadow-lg backdrop-blur-md text-xs">
        <p className="font-semibold text-slate-850 dark:text-slate-200 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="font-medium" style={{ color: entry.color }}>
            {entry.name}: {prefix}{entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// 1. Weekly Progress Chart (Student Dashboard)
export const WeeklyProgressChart: React.FC = () => {
  const data = [
    { name: 'Week 1', score: 65, avg: 60 },
    { name: 'Week 2', score: 72, avg: 62 },
    { name: 'Week 3', score: 80, avg: 65 },
    { name: 'Week 4', score: 78, avg: 68 },
    { name: 'Week 5', score: 85, avg: 70 },
    { name: 'Week 6', score: 94, avg: 72 }
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Area type="monotone" dataKey="score" name="Your Score" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#scoreColor)" />
          <Line type="monotone" dataKey="avg" name="Batch Average" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Task Status Pie Chart (Student/Admin Dashboards)
interface TaskStatusPieChartProps {
  completed: number;
  inProgress: number;
  underReview: number;
  pending: number;
}

export const TaskStatusPieChart: React.FC<TaskStatusPieChartProps> = ({
  completed,
  inProgress,
  underReview,
  pending
}) => {
  const data = [
    { name: 'Completed', value: completed, color: '#10b981' },
    { name: 'In Progress', value: inProgress, color: '#0ea5e9' },
    { name: 'Under Review', value: underReview, color: '#6366f1' },
    { name: 'Pending', value: pending, color: '#64748b' }
  ].filter(item => item.value > 0);

  // If no tasks, show placeholder
  const displayData = data.length > 0 ? data : [{ name: 'No Tasks', value: 1, color: '#e2e8f0' }];

  return (
    <div className="h-[220px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={displayData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={4}
            dataKey="value"
          >
            {displayData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// 3. Student Growth Chart (Admin Dashboard)
export const StudentGrowthChart: React.FC = () => {
  const data = [
    { name: 'Jan', Active: 12, Total: 15 },
    { name: 'Feb', Active: 18, Total: 22 },
    { name: 'Mar', Active: 25, Total: 30 },
    { name: 'Apr', Active: 35, Total: 42 },
    { name: 'May', Active: 48, Total: 58 },
    { name: 'Jun', Active: 60, Total: 75 }
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="activeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
          <Area type="monotone" dataKey="Total" name="Total Applications" stroke="#4f46e5" strokeWidth={2} fillOpacity={1} fill="url(#totalGrad)" />
          <Area type="monotone" dataKey="Active" name="Active Interns" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#activeGrad)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// 4. Project Progress Bar Chart (Admin Dashboard / Project Management)
export const ProjectProgressBarChart: React.FC = () => {
  const data = [
    { name: 'Fintech Ledger API', progress: 65 },
    { name: 'AI Resume Scanner', progress: 40 },
    { name: 'SaaS Analytics', progress: 100 }
  ];

  return (
    <div className="h-[220px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 30, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(148, 163, 184, 0.08)" />
          <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={100} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="progress" name="Progress (%)" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={16}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.progress === 100 ? '#10b981' : '#4f46e5'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 5. Document Request Revenue (Analytics Page)
export const RevenueChart: React.FC = () => {
  const data = [
    { name: 'Week 1', revenue: 150 },
    { name: 'Week 2', revenue: 320 },
    { name: 'Week 3', revenue: 210 },
    { name: 'Week 4', revenue: 450 },
    { name: 'Week 5', revenue: 600 },
    { name: 'Week 6', revenue: 780 }
  ];

  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.08)" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} unit="$" />
          <Tooltip content={<CustomTooltip prefix="$" />} />
          <Bar dataKey="revenue" name="Revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={30}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={index === 5 ? '#10b981' : '#0ea5e9'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 6. Student Skills Radar Chart (Student Profile Page)
export const SkillsRadarChart: React.FC = () => {
  const data = [
    { subject: 'Coding', A: 90, fullMark: 100 },
    { subject: 'Documentation', A: 85, fullMark: 100 },
    { subject: 'Timeline', A: 95, fullMark: 100 },
    { subject: 'Teamwork', A: 80, fullMark: 100 },
    { subject: 'Communication', A: 88, fullMark: 100 }
  ];

  return (
    <div className="h-[250px] w-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(148, 163, 184, 0.15)" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={10} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#94a3b8" fontSize={8} />
          <Radar name="Alex Rivera" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
          <Tooltip content={<CustomTooltip />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
