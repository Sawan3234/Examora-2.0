import { useState, useMemo } from "react";
import {
  Plus,
  Users,
  Eye,
  AlertTriangle,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Header } from "../components/Layout/Header";
import { Card, StatCard } from "../components/UI/Card";
import { SearchInput } from "../components/UI/SearchInput";
import { ExamSessionsTable } from "../components/UI/ExamSessionsTable";
import {
  mockExamSessions,
  mockStats,
  mockAdminUser,
} from "../utils/mockData";

const PAGE_SHELL = "w-full px-3 sm:px-4 lg:px-6";

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filteredSessions = useMemo(() => {
    let filtered = mockExamSessions;

    if (filterStatus !== "All") {
      filtered = filtered.filter((session) => session.status === filterStatus);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (session) =>
          session.candidateName.toLowerCase().includes(q) ||
          session.candidateEmail.toLowerCase().includes(q)
      );
    }

    return filtered;
  }, [searchQuery, filterStatus]);

  const filters = ["All", "In Progress", "Completed", "Flagged"];

  return (
    <div className="flex flex-col min-h-full w-full min-w-0 bg-[#f9fafb] text-[#101828]">
      <Header
        adminName={mockAdminUser.name}
        adminEmail={mockAdminUser.email}
      />

      <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden">
        <div className={`${PAGE_SHELL} py-8 sm:py-10 space-y-7 sm:space-y-8`}>
          {/* Title + primary action */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0 space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Exam Sessions
              </h2>
              <p className="text-sm sm:text-base text-gray-800">
                Monitor ongoing and completed examinations
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(90deg,#4f39f6_0%,#9810fa_100%)] text-[#ffffff] text-base font-semibold leading-5 px-4 py-2 shadow-[0px_4px_6px_#00000019] transition-opacity hover:opacity-95 shrink-0 w-full lg:w-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <BookOpen className="w-5 h-5 shrink-0" strokeWidth={2} />
              Manage Exams
            </button>
          </div>

          {/* Stats — full width of container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[24px] w-full items-stretch">
            <StatCard
              icon={Users}
              label="Active Sessions"
              value={mockStats.activeSessions}
              valueClassName="text-[#101828]"
              iconClassName="text-violet-600"
            />
            <StatCard
              icon={Eye}
              label="In Progress"
              value={mockStats.inProgress}
              valueClassName="text-[#155dfc]"
              iconClassName="text-[#155dfc]"
            />
            <StatCard
              icon={CheckCircle}
              label="Completed"
              value={mockStats.completed}
              valueClassName="text-[#00a63e]"
              iconClassName="text-[#00a63e]"
            />
            <StatCard
              icon={AlertTriangle}
              label="Total Violations"
              value={mockStats.totalViolations}
              valueClassName="text-[#e7000b]"
              iconClassName="text-[#e7000b]"
            />
          </div>

          {/* Search + filters */}
          <Card className="w-full p-4 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
              <div className="w-full flex-1 min-w-0">
                <SearchInput
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div
                className="flex flex-wrap items-center gap-2 sm:gap-2.5 xl:shrink-0 xl:justify-end"
                role="tablist"
                aria-label="Filter sessions"
              >
                {filters.map((filter) => {
                  const active = filterStatus === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setFilterStatus(filter)}
                      className={`px-3 py-2 lg:px-5 lg:py-[10px] rounded-[10px] text-base font-semibold transition-colors ${
                        active
                          ? "bg-[#4f39f6] text-[#ffffff]"
                          : "bg-[#f3f4f6] text-[#364153] hover:bg-[#e5e7eb]"
                      }`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Table */}
          <div className="w-full min-w-0">
            {filteredSessions.length > 0 ? (
              <ExamSessionsTable sessions={filteredSessions} />
            ) : (
              <Card className="p-12 sm:p-16 text-center w-full">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-900 font-medium">
                  No exam sessions found
                </p>
                <p className="text-sm text-gray-800 mt-1">
                  Try adjusting search or filters
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <button
        type="button"
        aria-label="Add session"
        className="fixed bottom-8 right-8 z-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-gray-900/15 hover:bg-violet-700 transition-colors"
      >
        <Plus className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
      </button>
    </div>
  );
}
