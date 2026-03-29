import { Eye, Download } from "lucide-react";
import { ProgressBar } from "../UI/ProgressBar";
import { StatusBadge } from "../UI/Badge";
import { IconButton } from "../UI/Button";
import { Card } from "../UI/Card";

export function ExamSessionsTable({ sessions }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Candidate
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Progress
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Violations
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <tr
                key={session.id}
                className={`hover:bg-gray-50 transition-colors border-l-4 ${session.borderColor}`}
              >
                {/* Candidate Info */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center font-semibold text-gray-700">
                      {session.candidateName
                        .split(" ")
                        .map((n) => n.charAt(0))
                        .join("")}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {session.candidateName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.candidateEmail}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <StatusBadge status={session.status} />
                </td>

                {/* Progress */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ProgressBar
                      current={session.progress}
                      total={session.totalQuestions}
                      className="w-48"
                    />
                  </div>
                </td>

                {/* Violations */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-sm font-semibold ${
                        session.violations > 5
                          ? "text-red-600"
                          : session.violations > 0
                            ? "text-yellow-600"
                            : "text-gray-600"
                      }`}
                    >
                      {session.violations}
                    </span>
                    {session.violations > 5 && (
                      <span className="text-xs text-gray-500">(5 high)</span>
                    )}
                  </div>
                </td>

                {/* Time */}
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900">
                    {session.time}
                  </p>
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <IconButton
                      icon={Eye}
                      title="View Details"
                      className="text-gray-600 hover:text-violet-600 p-1"
                    />
                    <IconButton
                      icon={Download}
                      title="Download Report"
                      className="text-gray-600 hover:text-violet-600 p-1"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
