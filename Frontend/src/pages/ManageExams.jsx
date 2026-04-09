import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CheckSquare,
  ChevronDown,
  Clock3,
  FileText,
  Filter,
  LayoutDashboard,
  ListFilter,
  Plus,
  Search,
  Settings2,
  Users,
  Video,
} from "lucide-react";
import { CreateExamModal } from "../components/UI/CreateExamModal";
import logo from "../assets/logo.png";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Exams", icon: BookOpen, path: "/exams" },
];

const stats = [
  { label: "Total Exams", value: 5, icon: FileText, iconClass: "text-[#c7b9ff]" },
  { label: "Draft", value: 1, icon: FileText, iconClass: "text-[#d1d5db]" },
  { label: "Scheduled", value: 2, icon: ListFilter, iconClass: "text-[#c7d2fe]" },
  { label: "Active", value: 1, icon: Video, iconClass: "text-[#c7f0d1]" },
  { label: "Completed", value: 1, icon: CheckSquare, iconClass: "text-[#d6d9df]" },
];

const filters = ["All Types", "MCQ", "Coding"];

const mockExam = {
  type: "Writing",
  status: "Scheduled",
  title: "Data Structures & Algorithms",
  description: "Comprehensive assessment covering fundamental data structures and algorithmic problem solving.",
  duration: "60 mins",
  questions: 5,
  participants: 24,
  scheduled: "Mar 25",
  totalPoints: 100,
  passingScore: 60,
};

function StatCard({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="rounded-[16px] border border-[#e5e7eb] bg-white px-5 py-4 shadow-[0px_1px_3px_rgba(16,24,40,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-[#667085]">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-[#101828]">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-[#f9fafb] ${iconClass}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

function MetricRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div className="flex items-center gap-2 text-[#667085]">
        <Icon className="h-4 w-4" strokeWidth={2} />
        <span className="text-sm">{label}</span>
      </div>
      <span className="text-sm font-semibold text-[#101828]">{value}</span>
    </div>
  );
}

export function ManageExams() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#101828]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[260px] shrink-0 border-r border-[#e5e7eb] bg-white lg:flex lg:flex-col">
          <div className="flex h-24 items-center gap-3 border-b border-[#e5e7eb] px-6">
            <img src={logo} alt="Examora" className="h-11 w-11 rounded-xl object-cover shadow-sm" />
            <div>
              <p className="text-lg font-extrabold tracking-[0.02em] text-[#111827]">EXAMORA</p>
              <p className="text-sm text-[#6b7280]">Admin Panel</p>
            </div>
          </div>

          <nav className="flex-1 px-4 py-6">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isDashboard = item.label === "Dashboard";
                const isActive = isDashboard
                  ? location.pathname === "/" || location.pathname === "/dashboard"
                  : location.pathname === item.path;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      navigate(item.path);
                    }}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-base font-semibold transition-colors ${
                      isActive
                        ? "bg-[#eef2ff] text-[#4f46e5]"
                        : "text-[#475467] hover:bg-[#f8fafc]"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-4 border-b border-[#e5e7eb] bg-white px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3 lg:hidden">
              <img src={logo} alt="Examora" className="h-10 w-10 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-base font-extrabold text-[#111827]">EXAMORA</p>
                <p className="text-xs text-[#6b7280]">Admin Panel</p>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1280px] space-y-6">
              <section className="flex flex-col gap-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#101828] sm:text-[40px]">Exam Library</h1>
                <p className="text-sm text-[#667085] sm:text-base">Create, manage, and organize all your examinations</p>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </section>

              <section className="rounded-[18px] border border-[#eaecf0] bg-white p-4 shadow-[0px_1px_3px_rgba(16,24,40,0.08)] sm:p-5">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                  <label className="relative flex-1">
                    <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#98a2b3]">
                      <Search className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search exams..."
                      className="h-12 w-full rounded-2xl border border-[#d0d5dd] bg-white pl-12 pr-4 text-sm text-[#101828] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[#7c3aed]"
                    />
                  </label>

                  <button
                    type="button"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#5b4bff] px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4f39f6]"
                  >
                    <Filter className="h-4 w-4" />
                    All Types
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(90deg,#4f39f6_0%,#9810fa_100%)] px-5 text-sm font-semibold text-white shadow-[0px_10px_24px_rgba(79,70,229,0.22)] transition-opacity hover:opacity-95"
                  >
                    <Plus className="h-4 w-4" />
                    Create Exam
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {filters.map((filter, index) => {
                    const active = index === 0;
                    return (
                      <button
                        key={filter}
                        type="button"
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                          active
                            ? "bg-[#eef4ff] text-[#3559e9]"
                            : "bg-[#f2f4f7] text-[#667085] hover:bg-[#e4e7ec]"
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-[18px] border border-[#eaecf0] bg-white p-4 shadow-[0px_1px_3px_rgba(16,24,40,0.08)] sm:p-5">
                <div className="mx-auto max-w-[360px] overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.06)]">
                  <div className="flex items-start justify-between gap-3 p-4 pb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#2f5bff]">{mockExam.type}</span>
                      <span className="rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-semibold text-[#2563eb]">{mockExam.status}</span>
                    </div>
                    <button type="button" className="rounded-full p-1 text-[#667085] transition-colors hover:bg-[#f2f4f7]">
                      <ListFilter className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="px-4 pb-4">
                    <h2 className="text-lg font-bold text-[#101828]">{mockExam.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[#667085]">{mockExam.description}</p>
                  </div>

                  <div className="border-t border-[#eaecf0] px-4 py-4">
                    <MetricRow icon={Clock3} label="Duration" value={mockExam.duration} />
                    <MetricRow icon={FileText} label="Questions" value={mockExam.questions} />
                    <MetricRow icon={Users} label="Participants" value={mockExam.participants} />
                    <MetricRow icon={Filter} label="Scheduled" value={mockExam.scheduled} />
                  </div>

                  <div className="border-t border-[#eaecf0] px-4 py-4">
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm text-[#667085]">Total Points</span>
                      <span className="text-sm font-semibold text-[#5b4bff]">{mockExam.totalPoints}</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-sm text-[#667085]">Passing Score</span>
                      <span className="text-sm font-semibold text-[#101828]">{mockExam.passingScore}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 border-t border-[#eaecf0] p-4">
                    <button type="button" className="h-11 rounded-xl bg-[#f2f4f7] text-sm font-semibold text-[#344054] transition-colors hover:bg-[#e4e7ec]">
                      View
                    </button>
                    <button type="button" className="h-11 rounded-xl bg-[#5b4bff] text-sm font-semibold text-white transition-colors hover:bg-[#4f39f6]">
                      Edit
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>

      <CreateExamModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
    </div>
  );
}
