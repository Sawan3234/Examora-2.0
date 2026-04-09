import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import logo from "../../assets/logo.png";

const PAGE_GUTTER = "w-full px-6";

export function Header({
  adminName = "Admin",
}) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm shrink-0">
      <div className={`${PAGE_GUTTER} py-1`} style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between gap-4">

          {/* Logo + Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-24 w-24 shrink-0">
              <img
                src={logo}
                alt="Examora Logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex flex-col gap-0 -ml-1">
           <div style={{ fontSize: "22px", fontWeight: "800", color: "#111827" }}>
  EXAMORA Admin Dashboard
</div>
              <p className="text-[16px] font-medium text-gray-500 leading-tight">
                Real-time Proctoring Monitoring
              </p>
            </div>
          </div>

          {/* Right: Clock + Admin */}
          <div className="flex items-center gap-4 shrink-0 ml-auto">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold text-gray-900 tabular-nums">
                {now.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="text-xs font-normal text-gray-500 mt-0.5 tabular-nums">
                {now.toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <button
              type="button"
             className="inline-flex items-center gap-3 px-3 py-2 bg-white border border-gray-300 rounded-[20px] shadow-sm hover:shadow-md hover:bg-gray-50 transition-all"
>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-bold text-white">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-sm font-semibold text-gray-900">{adminName}</p>
                <p className="text-xs font-normal text-gray-500">admin</p>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-600 shrink-0" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}