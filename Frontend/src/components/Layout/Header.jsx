import { useState, useEffect, useRef } from "react";
import { ChevronDown, LogOut, Mail, Settings, Shield, User } from "lucide-react";
import logo from "../../assets/logo.png";

const PAGE_GUTTER = "w-full px-6";

export function Header({
  adminName = "Admin",
  adminEmail = "admin@gmail.com",
}) {
  const [now, setNow] = useState(new Date());
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const adminMenuRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setIsAdminMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
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

            <div className="relative" ref={adminMenuRef}>
              <button
                type="button"
                onClick={() => setIsAdminMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-3 border border-[#b4c9ff] bg-gradient-to-r from-[#eef2ff] to-[#f5f3ff] px-3 py-2 rounded-[20px] shadow-sm transition-all hover:shadow-md"
                aria-expanded={isAdminMenuOpen}
                aria-haspopup="menu"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-base font-bold text-white">
                  {adminName.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900">{adminName}</p>
                  <p className="text-xs font-normal text-gray-500">admin</p>
                </div>
                <ChevronDown className={`h- w-4 shrink-0 text-gray-600 transition-transform ${isAdminMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {isAdminMenuOpen && (
                <div
                  className="absolute right-0 top-[calc(100%+12px)] z-50 w-[280px] overflow-hidden rounded-[10px] border border-[#e5e7eb] bg-white shadow-[0px_30px_80px_rgba(17,24,39,0.25)]"
                  role="menu"
                >
                  <div className="bg-[linear-gradient(120deg,#4338ca_0%,#6d28d9_55%,#a21caf_100%)] p-5 text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[8px] border-2 border-white/30 text-[14px] font-extrabold text-white/95">
                        {adminName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[14px] font-extrabold leading-tight">Administrator</p>
                        <p className="text-[13px] text-white/80">Full Access</p>
                      </div>
                    </div>

                    <div className="mt-4 rounded-[10px] border border-white/20 bg-white/15 p-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-[12px] text-white/80">
                        <Mail className="h-4 w-4" />
                        <span>Email</span>
                      </div>
                      <p className="mt-1 text-[13px] font-extrabold leading-none">{adminEmail}</p>
                    </div>
                  </div>

                  <div className="space-y-1 bg-white p-4">
                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
                      role="menuitem"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-indigo-100 text-indigo-600">
                        <User className="h-5 w-5" />
                      </span>
                      <span>
                        <p className="text-[13px] font-semibold text-[#344054]">User Details</p>
                        <p className="text-[12px] text-[#667085]">View profile information</p>
                      </span>
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
                      role="menuitem"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-purple-100 text-purple-600">
                        <Settings className="h-5 w-5" />
                      </span>
                      <span>
                        <p className="text-[13px] font-semibold text-[#344054]">Settings</p>
                        <p className="text-[12px] text-[#667085]">Access preferences</p>
                      </span>
                    </button>

                    <div className="my-2 border-t border-[#eaecf0]" />

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left transition-colors hover:bg-red-50"
                      role="menuitem"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-red-100 text-red-600">
                        <LogOut className="h-5 w-5" />
                      </span>
                      <span>
                        <p className="text-[13px] font-semibold text-red-600">Logout</p>
                        <p className="text-[12px] text-red-400">Sign out of your account</p>
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2 border-t border-[#eaecf0] bg-[#f9fafb] px-4 py-2.5 text-[#667085]">
                    <Shield className="h-4 w-4" />
                    <p className="text-[12px] font-semibold">Secure Admin Access</p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}