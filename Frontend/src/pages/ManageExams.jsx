import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Clock3,
  Eye,
  FileText,
  Filter,
  LayoutDashboard,
  ListFilter,
  Pencil,
  Plus,
  Search,
  Settings2,
  Trash2,
  Users,
  Video,
  X,
} from "lucide-react";
import { CreateExamModal } from "../components/UI/CreateExamModal";
import logo from "../assets/logo.png";

const sidebarItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Exams", icon: BookOpen, path: "/exams" },
];

const stats = [
  { label: "Total Exams", value: 0, icon: FileText, iconClass: "text-[#c7b9ff]" },
  { label: "Scheduled", value: 0, icon: ListFilter, iconClass: "text-[#c7d2fe]" },
  { label: "Active", value: 0, icon: Video, iconClass: "text-[#c7f0d1]" },
  { label: "Completed", value: 0, icon: CheckSquare, iconClass: "text-[#d6d9df]" },
];

const initialExamCard = {
  id: 1,
  type: "Writing",
  examTypeKey: "writing",
  status: "Scheduled",
  title: "Data Structures & Algorithms",
  description: "Comprehensive assessment covering fundamental data structures and algorithmic problem solving.",
  duration: "60 mins",
  questions: 5,
  participants: 24,
  scheduled: "Mar 25",
  scheduledAt: "Wednesday, March 25, 2026 at 10:00",
  scheduledDateTime: "2026-03-25T10:00:00.000Z",
  totalPoints: 100,
  passingScore: 60,
  generalInstructions: "",
  proctoringRules: [],
  questionItems: [
    { id: 1, text: "Explain binary search algorithm", points: 20 },
    { id: 2, text: "What is a stack data structure?", points: 20 },
    { id: 3, text: "Define SQL and its purpose", points: 20 },
    { id: 4, text: "Explain encapsulation in OOP", points: 20 },
    { id: 5, text: "Describe indexing in databases", points: 20 },
  ],
};

function StatCard({ label, value, icon: Icon, iconClass }) {
  return (
    <div className="min-h-[112px] rounded-[16px] border border-[#e5e7eb] bg-white px-6 py-5 shadow-[0px_1px_3px_rgba(16,24,40,0.08)]">
      <div className="flex h-full items-start justify-between gap-5">
        <div>
          <p className="text-[18px] text-[#667085]">{label}</p>
          <p className="mt-3 text-[24px] font-semibold leading-none text-[#101828]">{value}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center ${iconClass}`}>
          <Icon className="h-6 w-6" strokeWidth={2} />
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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewExam, setViewExam] = useState(initialExamCard);
  const [exams, setExams] = useState([initialExamCard]);
  const [editingExam, setEditingExam] = useState(null);
  const [createExamInitialStep, setCreateExamInitialStep] = useState(1);
  const [cardMenuExamId, setCardMenuExamId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getDurationMinutes = (durationValue) => {
    const matched = String(durationValue || "").match(/\d+/);
    return matched ? Number(matched[0]) : 0;
  };

  const getExamLifecycleStatus = (exam) => {
    if (!exam?.scheduledDateTime) return "Scheduled";

    const start = new Date(exam.scheduledDateTime);
    if (Number.isNaN(start.getTime())) return "Scheduled";

    const now = new Date();
    const durationMs = getDurationMinutes(exam.duration) * 60 * 1000;
    const end = new Date(start.getTime() + Math.max(durationMs, 0));

    if (now < start) return "Scheduled";
    if (now >= start && now < end) return "Active";
    return "Completed";
  };

  const dynamicStats = [
    { ...stats[0], value: exams.length },
    { ...stats[1], value: exams.filter((exam) => getExamLifecycleStatus(exam) === "Scheduled").length },
    { ...stats[2], value: exams.filter((exam) => getExamLifecycleStatus(exam) === "Active").length },
    { ...stats[3], value: exams.filter((exam) => getExamLifecycleStatus(exam) === "Completed").length },
  ];

  const openCreateExamModal = (step = 1, examToEdit = null) => {
    setCreateExamInitialStep(step);
    setEditingExam(examToEdit);
    setIsCreateModalOpen(true);
  };

  const closeCreateExamModal = () => {
    setIsCreateModalOpen(false);
    setEditingExam(null);
    setCreateExamInitialStep(1);
  };

  const openViewModal = (exam) => {
    setViewExam(exam);
    setIsViewModalOpen(true);
  };

  const handleCreateExam = (examData) => {
    const nextExam = {
      id: Date.now(),
      ...examData,
      questionItems: examData.questionItems || [],
    };

    setExams((prev) => [nextExam, ...prev]);
  };

  const handleDeleteExam = (id) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
    setCardMenuExamId(null);
    if (viewExam?.id === id) {
      setIsViewModalOpen(false);
    }
  };

  const handleUpdateExam = (id, updatedExamData) => {
    setExams((prev) =>
      prev.map((exam) => (exam.id === id ? { ...exam, ...updatedExamData, id } : exam))
    );

    if (viewExam?.id === id) {
      setViewExam((prev) => ({ ...prev, ...updatedExamData, id }));
    }
  };

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
          <header className="flex items-center justify-between gap-4 bg-white px-4 py-4 sm:px-6 lg:hidden">
            <div className="flex min-w-0 items-center gap-3">
              <img src={logo} alt="Examora" className="h-10 w-10 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-base font-extrabold text-[#111827]">EXAMORA</p>
                <p className="text-xs text-[#6b7280]">Admin Panel</p>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-[1280px] space-y-5">
              <section className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#101828] sm:text-[40px]">Exam Library</h1>
                <p className="text-sm text-[#667085] sm:text-base">Create, manage, and organize all your examinations</p>
              </section>

              <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dynamicStats.map((stat) => (
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
                      className="h-12 w-full rounded-[10px] border border-[#d0d5dd] bg-white pl-12 pr-4 text-sm text-[#101828] outline-none transition-colors placeholder:text-[#98a2b3] focus:border-[#7c3aed]"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => openCreateExamModal(1)}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] bg-[linear-gradient(90deg,#4f39f6_0%,#9810fa_100%)] px-5 text-sm font-semibold text-white shadow-[0px_10px_24px_rgba(79,70,229,0.22)] transition-opacity hover:opacity-95"
                  >
                    <Plus className="h-4 w-4" />
                    Create Exam
                  </button>
                </div>
              </section>

              <section className="rounded-[18px] border border-[#eaecf0] bg-white p-4 shadow-[0px_1px_3px_rgba(16,24,40,0.08)] sm:p-5">
                {exams.length === 0 ? (
                  <div className="flex min-h-[220px] items-center justify-center rounded-[14px] border border-dashed border-[#d0d5dd] bg-[#fcfcfd] text-sm font-semibold text-[#667085]">
                    No exams available.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {exams.map((exam) => (
                      <div key={exam.id} className="max-w-[420px] overflow-hidden rounded-[18px] border border-[#e5e7eb] bg-white shadow-[0px_1px_2px_rgba(16,24,40,0.06)]">
                        <div className="flex items-start justify-between gap-3 p-3.5 pb-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-semibold text-[#2f5bff]">{exam.type}</span>
                            <span className="rounded-full bg-[#e0f2fe] px-3 py-1 text-xs font-semibold text-[#2563eb]">{getExamLifecycleStatus(exam)}</span>
                          </div>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() =>
                                setCardMenuExamId((prev) => (prev === exam.id ? null : exam.id))
                              }
                              className="rounded-full p-1 text-[#667085] transition-colors hover:bg-[#f2f4f7]"
                            >
                              <ListFilter className="h-5 w-5" />
                            </button>
                            {cardMenuExamId === exam.id && (
                              <div className="absolute right-0 top-9 z-20 w-[150px] rounded-[10px] border border-[#eaecf0] bg-white p-1 shadow-[0px_10px_24px_rgba(16,24,40,0.12)]">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteExam(exam.id)}
                                  className="inline-flex w-full items-center gap-2 rounded-[10px] px-3 py-2 text-sm font-semibold text-[#b42318] transition-colors hover:bg-[#fef3f2]"
                                >
                                  <Trash2 className="h-4 w-4" strokeWidth={2.2} />
                                  Delete Exam
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="px-3 pb-3.5">
                          <h2 className="text-[18px] font-extrabold text-[#101828]">{exam.title}</h2>
                          <p className="mt-1.5 text-[15px] leading-5 text-[#667085]">{exam.description}</p>
                        </div>

                        <div className="border-t border-[#eaecf0] px-3 py-3.5">
                          <MetricRow icon={Clock3} label="Duration" value={exam.duration} />
                          <MetricRow icon={FileText} label="Questions" value={exam.questions} />
                          <MetricRow icon={Users} label="Participants" value={exam.participants} />
                          <MetricRow icon={Filter} label="Scheduled" value={exam.scheduled} />
                        </div>

                        <div className="border-t border-[#eaecf0] px-3 py-3.5">
                          <div className="flex items-center justify-between py-1">
                            <span className="text-sm text-[#667085]">Total Points</span>
                            <span className="text-sm font-extrabold text-[#5b4bff]">{exam.totalPoints}</span>
                          </div>
                          <div className="flex items-center justify-between py-1">
                            <span className="text-sm text-[#667085]">Passing Score</span>
                            <span className="text-sm font-extrabold text-[#101828]">{exam.passingScore}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 border-t border-[#eaecf0] p-3.5">
                          <button
                            type="button"
                            onClick={() => openViewModal(exam)}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-[#f2f4f7] text-sm font-semibold text-[#344054] transition-colors hover:bg-[#e4e7ec]"
                          >
                            <Eye className="h-4 w-4" strokeWidth={2.2} />
                            View
                          </button>
                          <button
                            type="button"
                            onClick={() => openCreateExamModal(2, exam)}
                            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] bg-[#5b4bff] text-sm font-semibold text-white transition-colors hover:bg-[#4f39f6]"
                          >
                            <Pencil className="h-4 w-4" strokeWidth={2.2} />
                            Edit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </main>
        </div>
      </div>

      <CreateExamModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateExamModal}
        initialStep={createExamInitialStep}
        onCreate={handleCreateExam}
        editExam={editingExam}
        onUpdate={handleUpdateExam}
      />

      {isViewModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6 backdrop-blur-[2px]"
          onClick={() => setIsViewModalOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[860px] overflow-hidden rounded-[10px] bg-[#f8fafc] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Exam preview"
          >
            <div className="bg-[linear-gradient(120deg,#4f46e5_0%,#7c3aed_55%,#a21caf_100%)] px-6 py-5 sm:px-7 sm:py-6">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#2563eb]">{viewExam?.type}</span>
                  <span className="rounded-full bg-white/30 px-3 py-1 text-xs font-bold text-white">{getExamLifecycleStatus(viewExam)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsViewModalOpen(false)}
                  className="rounded-full p-1 text-white/90 transition-colors hover:bg-white/15"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white">{viewExam?.title}</h2>
              <p className="mt-2 max-w-[760px] text-lg leading-8 text-white/80">{viewExam?.description}</p>
            </div>

            <div className="max-h-[62vh] overflow-y-auto px-6 py-6 sm:px-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-[10px] bg-white p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.07)]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6b7280]">
                    <Clock3 className="h-4 w-4" />
                    Duration
                  </div>
                  <p className="mt-2 text-3xl font-extrabold text-[#111827]">{viewExam?.duration}</p>
                </div>
                <div className="rounded-[10px] bg-white p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.07)]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6b7280]">
                    <FileText className="h-4 w-4" />
                    Questions
                  </div>
                  <p className="mt-2 text-3xl font-extrabold text-[#111827]">{viewExam?.questions}</p>
                </div>
                <div className="rounded-[10px] bg-white p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.07)]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6b7280]">
                    <Users className="h-4 w-4" />
                    Participants
                  </div>
                  <p className="mt-2 text-3xl font-extrabold text-[#111827]">{viewExam?.participants}</p>
                </div>
                <div className="rounded-xl bg-white p-4 shadow-[0px_1px_2px_rgba(16,24,40,0.07)]">
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#6b7280]">
                    <CalendarDays className="h-4 w-4" />
                    Total Points
                  </div>
                  <p className="mt-2 text-3xl font-extrabold text-[#4f46e5]">{viewExam?.totalPoints}</p>
                </div>
              </div>

              <h3 className="mt-7 text-[16px] font-extrabold text-[#111827]">Questions ({viewExam?.questions})</h3>

              <div className="mt-4 space-y-2">
                {(viewExam?.questionItems || []).map((question) => (
                  <div key={question.id} className="rounded-[10px] bg-white p-5 shadow-[0px_1px_2px_rgba(16,24,40,0.07)]">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-3xl font-extrabold text-[#111827]">Q{question.id}.</p>
                        <p className="mt-2 text-2xl text-[#4b5563]">{question.text}</p>
                      </div>
                      <span className="text-2xl font-extrabold text-[#4f46e5]">{question.points} pts</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[10px] border border-[#bfdbfe] bg-[#eff6ff] px-6 py-5">
                <div className="flex items-center gap-3 text-[#1e40af]">
                  <CalendarDays className="h-6 w-6" strokeWidth={2.2} />
                  <h4 className="text-[16px] font-extrabold leading-none">Scheduled For</h4>
                </div>
                <p className="mt-4 text-[14px] font-medium leading-none text-[#2563eb]">{viewExam?.scheduledAt || "Not scheduled"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
