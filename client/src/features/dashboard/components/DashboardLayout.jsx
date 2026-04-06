import { useState } from "react";
import Sidebar from "../../dashboard/components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({ children, active, setActive }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#020617] text-white overflow-hidden">
      {/* OVERLAY (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <Sidebar
        active={active}
        setActive={setActive}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* TOPBAR (sticky improved) */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-black/30 border-b border-white/10">
          <Topbar setSidebarOpen={setSidebarOpen} />
        </div>

        {/* CONTENT */}
        <div
          className="
          flex-1 overflow-y-auto p-4 md:p-6 space-y-6
          bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]
          scrollbar-thin scrollbar-thumb-white/10
        "
        >
          {children}
        </div>
      </div>
    </div>
  );
}
