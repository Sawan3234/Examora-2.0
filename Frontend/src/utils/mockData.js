// Mock data for exam sessions
export const mockExamSessions = [
  {
    id: 1,
    candidateName: "John Doe",
    candidateEmail: "john.doe@example.com",
    status: "In Progress",
    progress: 6,
    totalQuestions: 10,
    violations: 3,
    time: "20m 45s",
    borderColor: "border-yellow-400",
  },
  {
    id: 2,
    candidateName: "Sarah Smith",
    candidateEmail: "sarah.smith@example.com",
    status: "Completed",
    progress: 10,
    totalQuestions: 10,
    violations: 1,
    time: "30m 0s",
    borderColor: "border-green-400",
  },
  {
    id: 3,
    candidateName: "Mike Johnson",
    candidateEmail: "mike.j@example.com",
    status: "Flagged",
    progress: 8,
    totalQuestions: 10,
    violations: 12,
    time: "27m 0s",
    borderColor: "border-red-400",
  },
  {
    id: 4,
    candidateName: "Emily Chen",
    candidateEmail: "emily.chen@example.com",
    status: "In Progress",
    progress: 4,
    totalQuestions: 10,
    violations: 0,
    time: "13m 0s",
    borderColor: "border-green-400",
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
