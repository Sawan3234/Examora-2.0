import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Header } from '../../components/Layout/Header';
import Button from '../../components/UI/Button';
import SearchView from '../../components/UI/SearchView';
import ProgressBar from '../../components/UI/ProgressBar';

const COLUMNS = [
  { key: 'candidate', label: 'Candidate' },
  { key: 'status', label: 'Status' },
  { key: 'progress', label: 'Progress' },
  { key: 'violations', label: 'Violations' },
  { key: 'time', label: 'Time' },
  { key: 'actions', label: 'Actions' },
];

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleColumns, setVisibleColumns] = useState({
    candidate: true,
    status: true,
    progress: true,
    violations: true,
    time: true,
    actions: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const columnMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (columnMenuRef?.current && !columnMenuRef?.current?.contains(e?.target)) {
        setShowColumnMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleColumn = (key) => {
    const visibleCount = Object.values(visibleColumns)?.filter(Boolean)?.length;
    if (visibleColumns?.[key] && visibleCount <= 1) return; // keep at least 1 column
    setVisibleColumns((prev) => ({ ...prev, [key]: !prev?.[key] }));
  };

  // Mock data for exam sessions
  const examData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      status: "In Progress",
      progress: 60,
      progressText: "6/10",
      violations: 3,
      time: "20m 45s",
      statusColor: "bg-background-blue-light",
      statusTextColor: "text-accent-blue",
      borderColor: "border-l-4 border-l-warning border-b border-b-warning",
      bgColor: "bg-warning-light"
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah.smith@example.com",
      status: "Completed",
      progress: 100,
      progressText: "10/10",
      violations: 1,
      time: "30m 0s",
      statusColor: "bg-success-light",
      statusTextColor: "text-success",
      borderColor: "border-l-4 border-l-success border-b border-b-success",
      bgColor: "bg-success-pale"
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      status: "Flagged",
      progress: 80,
      progressText: "8/10",
      violations: 12,
      violationsNote: "(5 high)",
      time: "27m 0s",
      statusColor: "bg-error-pale",
      statusTextColor: "text-error",
      borderColor: "border-l-4 border-l-error border-b border-b-error",
      bgColor: "bg-error-light"
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@example.com",
      status: "In Progress",
      progress: 40,
      progressText: "4/10",
      violations: 0,
      time: "13m 0s",
      statusColor: "bg-background-blue-light",
      statusTextColor: "text-accent-blue",
      borderColor: "border-l-4 border-l-success border-b border-b-success",
      bgColor: "bg-success-pale"
    },
    {
      id: 5,
      name: "David Williams",
      email: "david.w@example.com",
      status: "Completed",
      progress: 100,
      progressText: "10/10",
      violations: 2,
      time: "32m 30s",
      statusColor: "bg-success-light",
      statusTextColor: "text-success",
      borderColor: "border-l-4 border-l-warning",
      bgColor: "bg-warning-light"
    }
  ];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e?.target?.value);
  };

  const visibleCols = COLUMNS?.filter((c) => visibleColumns?.[c?.key]);

  return (
    <>
      <Helmet>
        <title>Real-Time Exam Monitoring Dashboard | EXAMORA Admin Panel</title>
        <meta name="description" content="Monitor ongoing examinations in real-time with comprehensive proctoring oversight. Track candidate progress, violations, and exam statistics efficiently." />
        <meta property="og:title" content="Real-Time Exam Monitoring Dashboard | EXAMORA Admin Panel" />
        <meta property="og:description" content="Monitor ongoing examinations in real-time with comprehensive proctoring oversight. Track candidate progress, violations, and exam statistics efficiently." />
      </Helmet>
      <main className="w-full bg-background-base">
        <Header />
        
        <div className="w-full py-8 lg:py-9xl">
          <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
            
            {/* Page Header Section */}
            <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6xl mb-6 lg:mb-6xl">
              <div className="flex flex-col gap-1 w-full lg:w-[28%]">
                <h1 className="text-xl sm:text-2xl font-bold leading-xl text-text-primary">
                  Exam Sessions
                </h1>
                <p className="text-sm font-normal leading-snug text-text-muted">
                  Monitor ongoing and completed examinations
                </p>
              </div>
              
              <Button
                text="Manage Exams"
                className="w-full lg:w-auto"
                fill_background_color="primary"
                layout_gap="md"
                layout_width="auto"
                padding="md"
                position="relative"
                margin="none"
                variant="primary"
                size="md"
                onClick={() => {}}
              />
            </section>

            {/* Statistics Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6xl mb-8 lg:mb-9xl">
              {/* Active Sessions Card */}
              <div className="bg-white border border-gray-light rounded-xl p-4 lg:p-5xl shadow-[0px_1px_2px_#00000019]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 lg:gap-4xl">
                    <p className="text-sm font-normal leading-snug text-text-muted">
                      Active Sessions
                    </p>
                    <span className="text-2xl lg:text-3xl font-bold leading-2xl text-text-primary">
                      2
                    </span>
                  </div>
                  <img 
                    src="/images/img_icon_deep_purple_a400.svg" 
                    alt="Active Sessions Icon" 
                    className="w-12 h-12"
                  />
                </div>
              </div>

              {/* In Progress Card */}
              <div className="bg-white border border-gray-light rounded-xl p-4 lg:p-5xl shadow-[0px_1px_2px_#00000019]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 lg:gap-4xl">
                    <p className="text-sm font-normal leading-snug text-text-muted">
                      In Progress
                    </p>
                    <span className="text-2xl lg:text-3xl font-bold leading-2xl text-link">
                      2
                    </span>
                  </div>
                  <img 
                    src="/images/img_icon_blue_a700.svg" 
                    alt="In Progress Icon" 
                    className="w-12 h-12"
                  />
                </div>
              </div>

              {/* Completed Card */}
              <div className="bg-white border border-gray-light rounded-xl p-4 lg:p-5xl shadow-[0px_1px_2px_#00000019]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 lg:gap-4xl">
                    <p className="text-sm font-normal leading-snug text-text-muted">
                      Completed
                    </p>
                    <span className="text-2xl lg:text-3xl font-bold leading-2xl text-success-light">
                      2
                    </span>
                  </div>
                  <img 
                    src="/images/img_icon_green_a700.svg" 
                    alt="Completed Icon" 
                    className="w-12 h-12"
                  />
                </div>
              </div>

              {/* Total Violations Card */}
              <div className="bg-white border border-gray-light rounded-xl p-4 lg:p-5xl shadow-[0px_1px_2px_#00000019]">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2 lg:gap-4xl">
                    <p className="text-sm font-normal leading-snug text-text-muted">
                      Total Violations
                    </p>
                    <span className="text-2xl lg:text-3xl font-bold leading-2xl text-error-bright">
                      18
                    </span>
                  </div>
                  <img 
                    src="/images/img_icon_red_a700.svg" 
                    alt="Violations Icon" 
                    className="w-12 h-12"
                  />
                </div>
              </div>
            </section>

            {/* Search and Filter Section */}
            <section className="bg-white rounded-xl p-4 lg:p-6xl shadow-[0px_1px_2px_#00000019] mb-6 lg:mb-6xl">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-md w-full">
                <div className="w-full lg:flex-1">
                  <SearchView
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 lg:gap-md w-full lg:w-auto">
                  {['All', 'In Progress', 'Completed', 'Flagged']?.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      className={`px-3 lg:px-4xl py-2 lg:py-lg text-base font-semibold leading-base rounded-md transition-colors ${
                        activeFilter === filter
                          ? 'bg-background-primary text-white' :'bg-neutral text-secondary'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Exam Sessions Table */}
            <section className="bg-white rounded-xl shadow-[0px_1px_2px_#00000019] overflow-hidden">

              {/* Table toolbar: column visibility toggle */}
              <div className="flex items-center justify-end px-4 py-3 border-b border-table-border bg-white">
                <div className="relative" ref={columnMenuRef}>
                  <button
                    onClick={() => setShowColumnMenu((v) => !v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-text-muted border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    Columns
                    <svg xmlns="http://www.w3.org/2000/svg" className={`w-3 h-3 transition-transform ${showColumnMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showColumnMenu && (
                    <div className="absolute right-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-[160px]">
                      <p className="px-3 pb-1.5 pt-0.5 text-xs font-semibold text-text-muted uppercase tracking-wide border-b border-gray-100 mb-1">
                        Toggle Columns
                      </p>
                      {COLUMNS?.map((col) => (
                        <label
                          key={col?.key}
                          className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={visibleColumns?.[col?.key]}
                            onChange={() => toggleColumn(col?.key)}
                            className="w-3.5 h-3.5 accent-background-primary rounded"
                          />
                          <span className="text-sm font-medium text-text-primary">{col?.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Horizontally scrollable table wrapper */}
              <div className="overflow-x-auto w-full">
                <div style={{ minWidth: `${visibleCols?.length * 140}px` }}>

                  {/* Table Header */}
                  <div className="bg-table-header-bg border-b border-table-border">
                    <div className="flex">
                      {visibleColumns?.candidate && (
                        <div className="flex-[2] min-w-[160px] p-4 pl-6">
                          <h3 className="text-xs font-semibold leading-tight uppercase text-text-muted">Candidate</h3>
                        </div>
                      )}
                      {visibleColumns?.status && (
                        <div className="flex-1 min-w-[110px] p-4">
                          <h3 className="text-xs font-semibold leading-tight uppercase text-text-muted">Status</h3>
                        </div>
                      )}
                      {visibleColumns?.progress && (
                        <div className="flex-[1.5] min-w-[140px] p-4">
                          <h3 className="text-xs font-semibold leading-tight uppercase text-text-muted">Progress</h3>
                        </div>
                      )}
                      {visibleColumns?.violations && (
                        <div className="flex-1 min-w-[100px] p-4">
                          <h3 className="text-xs font-semibold leading-tight uppercase text-text-muted">Violations</h3>
                        </div>
                      )}
                      {visibleColumns?.time && (
                        <div className="flex-1 min-w-[100px] p-4">
                          <h3 className="text-xs font-semibold leading-tight uppercase text-text-muted">Time</h3>
                        </div>
                      )}
                      {visibleColumns?.actions && (
                        <div className="flex-1 min-w-[100px] p-4">
                          <h3 className="text-xs font-semibold leading-tight uppercase text-text-muted">Actions</h3>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Table Body */}
                  <div className="divide-y divide-table-border">
                    {examData?.map((candidate) => (
                      <div
                        key={candidate?.id}
                        className={`${candidate?.borderColor} ${candidate?.bgColor}`}
                      >
                        <div className="flex">
                          {/* Candidate Info */}
                          {visibleColumns?.candidate && (
                            <div className="flex-[2] min-w-[160px] p-4 pl-6 flex items-center">
                              <div className="flex flex-col gap-0.5">
                                <h4 className="text-base font-semibold leading-base text-text-primary">
                                  {candidate?.name}
                                </h4>
                                <p className="text-sm font-normal leading-snug text-text-light">
                                  {candidate?.email}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Status */}
                          {visibleColumns?.status && (
                            <div className="flex-1 min-w-[110px] p-4 flex items-center">
                              <div className={`inline-flex items-center gap-sm px-3 py-1 rounded-lg ${candidate?.statusColor}`}>
                                {candidate?.status === "In Progress" && (
                                  <div className="w-1.5 h-1.5 bg-accent-transparent rounded-full"></div>
                                )}
                                <span className={`text-xs font-semibold leading-tight ${candidate?.statusTextColor}`}>
                                  {candidate?.status}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Progress */}
                          {visibleColumns?.progress && (
                            <div className="flex-[1.5] min-w-[140px] p-4 flex items-center gap-3">
                              <ProgressBar
                                value={candidate?.progress}
                                max={100}
                                className="flex-1"
                                animated={true}
                                layout_width="full"
                                position="relative"
                                size="md"
                              />
                              <span className="text-sm font-medium leading-snug text-text-muted whitespace-nowrap">
                                {candidate?.progressText}
                              </span>
                            </div>
                          )}

                          {/* Violations */}
                          {visibleColumns?.violations && (
                            <div className="flex-1 min-w-[100px] p-4 flex items-center">
                              <div className="flex items-center gap-1.5">
                                <span className={`text-sm font-bold leading-snug ${
                                  candidate?.violations === 0 ? 'text-success-light' :
                                  candidate?.violations >= 10 ? 'text-error-bright' : 'text-warning'
                                }`}>
                                  {candidate?.violations}
                                </span>
                                {candidate?.violationsNote && (
                                  <span className="text-xs font-semibold leading-tight text-error-bright">
                                    {candidate?.violationsNote}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Time */}
                          {visibleColumns?.time && (
                            <div className="flex-1 min-w-[100px] p-4 flex items-center">
                              <span className="text-sm font-normal leading-snug text-text-muted">
                                {candidate?.time}
                              </span>
                            </div>
                          )}

                          {/* Actions */}
                          {visibleColumns?.actions && (
                            <div className="flex-1 min-w-[100px] p-4 flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <img
                                  src="/images/img_button.svg"
                                  alt="View Details"
                                  className="w-8 h-8"
                                />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <img
                                  src="/images/img_button_blue_gray_700.svg"
                                  alt="More Actions"
                                  className="w-8 h-8"
                                />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;