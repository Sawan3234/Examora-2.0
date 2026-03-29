import { useState, useMemo } from "react";
import { Plus, Users, Eye, AlertCircle, CheckCircle } from "lucide-react";
import { Header } from "../components/Layout/Header";
import { Card, StatCard } from "../components/UI/Card";
import { Button, IconButton } from "../components/UI/Button";
import { SearchInput } from "../components/UI/SearchInput";
import { ExamSessionsTable } from "../components/UI/ExamSessionsTable";
import {
  mockExamSessions,
  mockStats,
  mockAdminUser,
} from "../utils/mockData";

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter sessions based on search and status
  const filteredSessions = useMemo(() => {
    let filtered = mockExamSessions;

    // Filter by status
    if (filterStatus !== "All") {
      filtered = filtered.filter((session) => session.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (session) =>
          session.candidateName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          session.candidateEmail
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, filterStatus]);

  const filters = ["All", "In Progress", "Completed", "Flagged"];

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Header */}
      <Header
        adminName={mockAdminUser.name}
        adminEmail={mockAdminUser.email}
      />

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Page Title Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Exam Sessions</h2>
              <p className="text-gray-600 mt-1">
                Monitor ongoing and completed examinations
              </p>
            </div>
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xl">📊</span>
              Manage Exams
            </Button>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Users}
              label="Active Sessions"
              value={mockStats.activeSessions}
              color="text-violet-600"
            />
            <StatCard
              icon={Eye}
              label="In Progress"
              value={mockStats.inProgress}
              color="text-blue-600"
            />
            <StatCard
              icon={CheckCircle}
              label="Completed"
              value={mockStats.completed}
              color="text-green-600"
            />
            <StatCard
              icon={AlertCircle}
              label="Total Violations"
              value={mockStats.totalViolations}
              color="text-red-600"
            />
          </div>

          {/* Search and Filter Section */}
          <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 w-full sm:w-auto min-w-0">
              <SearchInput
                placeholder="Search candidates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-1 bg-white rounded-lg p-1 border border-gray-200 flex-shrink-0">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={filterStatus === filter ? "tabActive" : "tab"}
                  size="sm"
                  onClick={() => setFilterStatus(filter)}
                  className="!border-0 !rounded-md text-xs"
                >
                  {filter}
                </Button>
              ))}
            </div>
          </div>

          {/* Exam Sessions Table */}
          {filteredSessions.length > 0 ? (
            <ExamSessionsTable sessions={filteredSessions} />
          ) : (
            <Card className="p-12 text-center">
              <div className="flex flex-col items-center justify-center">
                <Users size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium">
                  No exam sessions found
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Students will appear here when they join an exam
                </p>
              </div>
            </Card>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-110">
        <Plus size={24} />
      </button>
    </div>
  );
}
