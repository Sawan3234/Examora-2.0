import { Bold, ChevronDown, Globe } from "lucide-react"; // ✅ CHANGED: added Globe icon

export function Header({ adminName = "Admin", adminEmail = "admin@examora.com" }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center gap-2 w-fit">
          {/* ✅ CHANGED: replaced gradient "E" box with Globe icon */}
          <Globe className="w-8 h-8 text-violet-500" />
          <div className="flex flex-col">
            <h1 className="!text-3xl font-bold !text-gray-900 leading-tight" style={{fontSize: '30px', fontStyle:'Bold'}}>EXAMORA Admin Dashboard</h1>
            <p className="!text-xl !text-gray-900 leading-tight">Real-time Proctoring Monitoring</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Time */}
          <div className="text-right">
            {/* ✅ CHANGED: added seconds to time display */}
            <p className="text-xs font-medium text-gray-900">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit", // ✅ CHANGED: added second
              })}
            </p>
            {/* ✅ CHANGED: switched to numeric date format M/D/YYYY */}
            <p className="text-xs text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                month: "numeric",   // ✅ CHANGED: was "short" (e.g. "Mar"), now numeric (e.g. "3")
                day: "numeric",     // ✅ CHANGED: was "numeric" but weekday was included before
                year: "numeric",    // ✅ CHANGED: added year
                // removed: weekday: "short"
              })}
            </p>
          </div>

          {/* Admin Profile */}
          {/* ✅ CHANGED: added border and shadow to match card style in screenshot */}
          <div className="flex items-center gap-2 cursor-pointer border border-gray-200 shadow-sm px-3 py-1.5 rounded-xl transition-colors hover:bg-gray-50">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              {/* ✅ CHANGED: text alignment from right to left to match screenshot */}
              <p className="text-xs font-semibold text-gray-900">{adminName}</p>
              {/* ✅ CHANGED: show full segment before @ instead of splitting — matches "admin" label */}
              <p className="text-xs text-gray-500">{adminEmail.split("@")[0]}</p>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}