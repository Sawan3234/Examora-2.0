import { useState } from "react";
import { Plus, Users, Eye, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";
import { Header } from "../components/Layout/Header";
import { Card, StatCard } from "../components/UI/Card";
import { SearchInput } from "../components/UI/SearchInput";
import { ExamSessionsTable } from "../components/UI/ExamSessionsTable";
import { CreateExamModal } from "../components/UI/CreateExamModal";
import { mockAdminUser } from "../utils/mockData";

const PAGE_SHELL = "w-full px-3 sm:px-4 lg:px-6";

export function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const previewStats = {
    activeSessions: 0,
    inProgress: 0,
    completed: 0,
    totalViolations: 0,
  };

  const previewSessions = [];
  const filters = ["All", "In Progress", "Completed", "Flagged"];

  return (
    <div className="flex min-h-full w-full min-w-0 flex-col bg-[#f9fafb] text-[#101828]">
      <Header adminName={mockAdminUser.name} adminEmail={mockAdminUser.email} />

      <main className="flex-1 w-full min-w-0 overflow-y-auto overflow-x-hidden">
        <div className={`${PAGE_SHELL} space-y-7 py-6 sm:space-y-8 sm:py-8`}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div className="min-w-0 space-y-1">
                      <h2 className="text-[36px] font-extrabold tracking-wider text-gray-900 sm:text-4xl">Exam Sessions</h2>
              <p className="text-sm text-gray-800 sm:text-base">Monitor ongoing and completed examinations</p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(90deg,#4f39f6_0%,#9810fa_100%)] px-4 py-2 text-base font-semibold leading-5 text-[#ffffff] shadow-[0px_4px_6px_#00000019] transition-opacity hover:opacity-95 shrink-0 lg:w-auto"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <BookOpen className="h-5 w-5 shrink-0" strokeWidth={2} />
              Manage Exams
            </button>
          </div>

          <div className="grid w-full grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-[24px]">
            <StatCard icon={Users} label="Active Sessions" value={previewStats.activeSessions} valueClassName="text-[#101828]" iconClassName="text-violet-600" />
            <StatCard icon={Eye} label="In Progress" value={previewStats.inProgress} valueClassName="text-[#155dfc]" iconClassName="text-[#155dfc]" />
            <StatCard icon={CheckCircle} label="Completed" value={previewStats.completed} valueClassName="text-[#00a63e]" iconClassName="text-[#00a63e]" />
            <StatCard icon={AlertTriangle} label="Total Violations" value={previewStats.totalViolations} valueClassName="text-[#e7000b]" iconClassName="text-[#e7000b]" />
          </div>

          <Card className="w-full p-4 lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2">
              <div className="w-full min-w-0 flex-1">
                <SearchInput
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 xl:shrink-0 xl:justify-end" role="tablist" aria-label="Filter sessions">
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

          <div className="w-full min-w-0">
            <ExamSessionsTable sessions={previewSessions} />
          </div>
        </div>
      </main>

      <button
        type="button"
        onClick={() => setIsCreateModalOpen(true)}
        aria-label="Add session"
        className="floating-glow fixed bottom-8 right-8 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-violet-600 text-white shadow-lg shadow-gray-900/15 transition-colors hover:bg-violet-700 sm:h-16 sm:w-16"
      >
        <Plus className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2.5} />
      </button>

      <CreateExamModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
