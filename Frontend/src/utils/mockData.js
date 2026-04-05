/** Row backgrounds: subtle tints, full-width (no heavy side borders) */
const ROW = {
  cream: "bg-amber-50/50 hover:bg-amber-50/70 transition-colors",
  green: "bg-emerald-50/40 hover:bg-emerald-50/60 transition-colors",
  red: "bg-red-50/50 hover:bg-red-50/70 transition-colors",
};

export const mockExamSessions = [
  {
    id: 1,
    candidateName: "John Doe",
    candidateEmail: "john.doe@example.com",
    status: "In Progress",
    progress: 6,
    totalQuestions: 10,
    violations: 3,
    violationsHigh: 0,
    time: "20m 45s",
    rowClass: ROW.cream,
    progressVariant: "violet",
  },
  {
    id: 2,
    candidateName: "Sarah Smith",
    candidateEmail: "sarah.smith@example.com",
    status: "Completed",
    progress: 10,
    totalQuestions: 10,
    violations: 1,
    violationsHigh: 0,
    time: "30m 0s",
    rowClass: ROW.green,
    progressVariant: "violet",
  },
  {
    id: 3,
    candidateName: "Mike Johnson",
    candidateEmail: "mike.j@example.com",
    status: "Flagged",
    progress: 8,
    totalQuestions: 10,
    violations: 12,
    violationsHigh: 5,
    time: "27m 0s",
    rowClass: ROW.red,
    progressVariant: "danger",
  },
  {
    id: 4,
    candidateName: "Emily Chen",
    candidateEmail: "emily.chen@example.com",
    status: "In Progress",
    progress: 4,
    totalQuestions: 10,
    violations: 0,
    violationsHigh: 0,
    time: "13m 0s",
    rowClass: ROW.cream,
    progressVariant: "violet",
  },
  {
    id: 5,
    candidateName: "David Williams",
    candidateEmail: "david.w@example.com",
    status: "Completed",
    progress: 10,
    totalQuestions: 10,
    violations: 2,
    violationsHigh: 0,
    time: "32m 30s",
    rowClass: ROW.green,
    progressVariant: "violet",
  },
];

export const mockStats = {
  activeSessions: 2,
  inProgress: 2,
  completed: 2,
  totalViolations: 18,
};

export const mockAdminUser = {
  name: "Admin",
  email: "admin@examora.com",
  initials: "A",
};
