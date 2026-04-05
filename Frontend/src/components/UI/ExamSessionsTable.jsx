import React, { useMemo, useState } from 'react';
import { Eye, MoreHorizontal, Columns } from 'lucide-react';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { Card } from './Card';

const statusColors = {
  'In Progress': 'warning',
  'Completed': 'success',
  'Flagged': 'danger',
};

const ALL_COLUMNS = [
  { id: 'candidate', label: 'Candidate', minWidth: 'min-w-[160px]', flex: 'flex-[2]' },
  { id: 'progress', label: 'Progress', minWidth: 'min-w-[140px]', flex: 'flex-[1.5]' },
  { id: 'violations', label: 'Violations', minWidth: 'min-w-[100px]', flex: 'flex-1' },
  { id: 'time', label: 'Time', minWidth: 'min-w-[100px]', flex: 'flex-1' },
  { id: 'status', label: 'Status', minWidth: 'min-w-[110px]', flex: 'flex-1' },
  { id: 'actions', label: 'Actions', minWidth: 'min-w-[100px]', flex: 'flex-1' },
];

const rowToneByStatus = {
  'In Progress': 'bg-[#fffbeb] border-l-[4px] border-l-[#fe9a00]',
  'Completed': 'bg-[#f0fdf4] border-l-[4px] border-l-[#00c950]',
  'Flagged': 'bg-[#fef2f2] border-l-[4px] border-l-[#fb2c36]',
};

const violationColor = (count) => {
  if (count === 0) return 'text-[#00a63e]';
  if (count < 10) return 'text-[#e17100]';
  return 'text-[#e7000b]';
};

export const ExamSessionsTable = ({ sessions = [] }) => {
  const [columnMenuOpen, setColumnMenuOpen] = useState(false);
  const [visibleCols, setVisibleCols] = useState(ALL_COLUMNS.map((col) => col.id));

  const visibleColumns = useMemo(
    () => ALL_COLUMNS.filter((col) => visibleCols.includes(col.id)),
    [visibleCols]
  );

  const toggleColumn = (columnId) => {
    if (visibleCols.length === 1 && visibleCols.includes(columnId)) return;

    setVisibleCols((prev) =>
      prev.includes(columnId)
        ? prev.filter((id) => id !== columnId)
        : [...prev, columnId]
    );
  };

  if (!sessions || sessions.length === 0) {
    return (
      <Card className="p-12 sm:p-16 text-center">
        <p className="text-gray-900">No exam sessions found</p>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6">
      <Card className="w-full overflow-hidden">
        <div className="relative flex items-center justify-end px-4 py-3 border-b border-[#e5e7eb] bg-[#ffffff]">
          <button
            type="button"
            onClick={() => setColumnMenuOpen((v) => !v)}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-[#4a5565] border border-[#e5e7eb] rounded-lg hover:bg-[#f3f4f6]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <Columns className="w-4 h-4" />
            Columns
          </button>

          {columnMenuOpen && (
            <div className="absolute right-4 top-12 z-10 min-w-[160px] py-2 rounded-[14px] border border-[#e5e7eb] bg-[#ffffff] shadow-lg">
              {ALL_COLUMNS.map((column) => (
                <label
                  key={column.id}
                  className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-[#f9fafb]"
                >
                  <input
                    type="checkbox"
                    checked={visibleCols.includes(column.id)}
                    onChange={() => toggleColumn(column.id)}
                    className="h-[14px] w-[14px]"
                  />
                  <span className="text-sm font-medium text-[#364153]">{column.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="overflow-x-auto">
          <div className="w-full" style={{ minWidth: `${visibleColumns.length * 140}px` }}>
            <div className="flex items-center bg-[#f9fafb] border-b border-[#e5e7eb]">
              {visibleColumns.map((column) => (
                <div
                  key={column.id}
                  className={`${column.minWidth} ${column.flex} p-4 ${column.id === 'candidate' ? 'pl-6' : ''} text-xs uppercase font-semibold text-[#4a5565]`}
                >
                  {column.label}
                </div>
              ))}
            </div>

            {sessions.map((session) => (
              <div
                key={session.id}
                className={`flex items-center border-b border-[#e5e7eb] last:border-b-0 ${rowToneByStatus[session.status] || ''}`}
              >
                {visibleCols.includes('candidate') && (
                  <div className="min-w-[160px] flex-[2] p-4 pl-6">
                    <div className="flex flex-col gap-0.5">
                      <p className="text-base font-semibold text-[#101828]">{session.candidateName}</p>
                      <p className="text-sm font-normal text-[#6a7282] truncate">{session.candidateEmail}</p>
                    </div>
                  </div>
                )}

                {visibleCols.includes('progress') && (
                  <div className="min-w-[140px] flex-[1.5] p-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 min-w-[70px]">
                        <ProgressBar value={session.progress} max={session.totalQuestions} />
                      </div>
                      <span className="text-sm font-medium text-[#4a5565] whitespace-nowrap">
                        {session.progress}/{session.totalQuestions}
                      </span>
                    </div>
                  </div>
                )}

                {visibleCols.includes('violations') && (
                  <div className="min-w-[100px] flex-1 p-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-sm font-bold ${violationColor(session.violations)}`}>
                        {session.violations}
                      </span>
                      {session.violationsHigh > 0 && (
                        <span className="text-xs text-[#e7000b] font-semibold">({session.violationsHigh} high)</span>
                      )}
                    </div>
                  </div>
                )}

                {visibleCols.includes('time') && (
                  <div className="min-w-[100px] flex-1 p-4">
                    <p className="text-sm font-normal text-[#4a5565]">{session.time}</p>
                  </div>
                )}

                {visibleCols.includes('status') && (
                  <div className="min-w-[110px] flex-1 p-4">
                    <Badge variant={statusColors[session.status] || 'default'} size="small">
                      {session.status}
                    </Badge>
                  </div>
                )}

                {visibleCols.includes('actions') && (
                  <div className="min-w-[100px] flex-1 p-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 p-1 rounded text-[#4a5565] hover:bg-[#f3f4f6] transition-colors"
                        aria-label={`View ${session.candidateName}`}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center justify-center w-8 h-8 p-1 rounded text-[#4a5565] hover:bg-[#f3f4f6] transition-colors"
                        aria-label={`More actions for ${session.candidateName}`}
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
