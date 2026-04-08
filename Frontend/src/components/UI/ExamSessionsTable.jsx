import React from 'react';
import { Eye, MoreHorizontal } from 'lucide-react';
import { Badge } from './Badge';
import { ProgressBar } from './ProgressBar';
import { Card } from './Card';

const statusColors = {
  'In Progress': 'warning',
  'Completed': 'success',
  'Flagged': 'danger',
};

const ALL_COLUMNS = ['Candidate', 'Status', 'Progress', 'Violations', 'Time', 'Actions'];

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
  if (!sessions || sessions.length === 0) {
    return (
      <Card className="w-full overflow-hidden">
        <div className="grid grid-cols-6 border-b border-[#e5e7eb] bg-[#f9fafb]">
          {ALL_COLUMNS.map((column) => (
            <div
              key={column}
              className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#8590a2]"
            >
              {column}
            </div>
          ))}
        </div>
        <div className="flex h-[140px] items-center justify-center px-6 text-center">
          <p className="text-2xl text-[#a8b0bf]">No exams conducted yet</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-6 border-b border-[#e5e7eb] bg-[#f9fafb]">
              {ALL_COLUMNS.map((column) => (
                <div key={column} className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-[#8590a2]">
                  {column}
                </div>
              ))}
            </div>

            {sessions.map((session) => (
              <div
                key={session.id}
                className={`grid grid-cols-6 items-center border-b border-[#e5e7eb] px-2 last:border-b-0 ${rowToneByStatus[session.status] || ''}`}
              >
                <div className="px-4 py-4">
                  <div className="flex flex-col gap-0.5">
                    <p className="text-base font-semibold text-[#101828]">{session.candidateName}</p>
                    <p className="truncate text-sm font-normal text-[#6a7282]">{session.candidateEmail}</p>
                  </div>
                </div>

                <div className="px-4 py-4">
                  <Badge variant={statusColors[session.status] || 'default'} size="small">
                    {session.status}
                  </Badge>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <div className="min-w-[70px] flex-1">
                      <ProgressBar value={session.progress} max={session.totalQuestions} />
                    </div>
                    <span className="whitespace-nowrap text-sm font-medium text-[#4a5565]">
                      {session.progress}/{session.totalQuestions}
                    </span>
                  </div>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-sm font-bold ${violationColor(session.violations)}`}>
                      {session.violations}
                    </span>
                    {session.violationsHigh > 0 && (
                      <span className="text-xs font-semibold text-[#e7000b]">({session.violationsHigh} high)</span>
                    )}
                  </div>
                </div>

                <div className="px-4 py-4">
                  <p className="text-sm font-normal text-[#4a5565]">{session.time}</p>
                </div>

                <div className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded p-1 text-[#4a5565] transition-colors hover:bg-[#f3f4f6]"
                      aria-label={`View ${session.candidateName}`}
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-8 w-8 items-center justify-center rounded p-1 text-[#4a5565] transition-colors hover:bg-[#f3f4f6]"
                      aria-label={`More actions for ${session.candidateName}`}
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
