import { ChevronDown } from "lucide-react";

const EXAMORA_LOGO_URL =
  "https://www.figma.com/api/mcp/asset/a5d821b4-177b-4b18-b63d-58ea456f549b";

/** Same horizontal padding as main content — keeps header aligned with the page grid */
const PAGE_GUTTER =
  "w-full px-4 sm:px-6 lg:px-[22px]";

export function Header({
  adminName = "Admin",
  adminEmail = "admin@examora.com",
}) {
  return (
    <header className="w-full bg-[#ffffff] border-b border-[#e5e7eb] shadow-[0px_1px_2px_#00000019] shrink-0">
      <div className={`${PAGE_GUTTER} py-4`} style={{ fontFamily: "Inter, sans-serif" }}>
        <div className="flex items-center justify-between gap-4 h-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-10 w-10 shrink-0">
              <img
                src={EXAMORA_LOGO_URL}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0 flex flex-col gap-0.5">
              <h1 className="text-lg lg:text-xl font-bold text-[#101828] leading-[22px] lg:leading-[25px]" style={{ fontFamily: "Inter, sans-serif" }}>
                EXAMORA Admin Dashboard
              </h1>
              <p className="text-sm font-normal text-[#4a5565] leading-[17px]" style={{ fontFamily: "Inter, sans-serif" }}>
                Real-time Proctoring Monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 ml-auto">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#101828] tabular-nums leading-[17px]">
                {new Date().toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
              <p className="text-xs font-normal text-[#6a7282] mt-0.5 tabular-nums leading-[15px]">
                {new Date().toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-3 rounded-[10px] border border-[#c6d2ff] bg-gradient-to-r from-[#eef2ff] to-[#faf5ff] p-2 transition-colors"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] bg-gradient-to-br from-[#4f39f6] to-[#9810fa] text-lg font-bold text-[#ffffff] shadow-sm">
                {adminName.charAt(0).toUpperCase()}
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-[#101828] leading-[17px]">{adminName}</p>
                <p className="text-xs font-normal text-[#4a5565] leading-[15px]">{adminEmail.split("@")[0]}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-[#6a7282] shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
