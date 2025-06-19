import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  return (
    <div className="bg-[#0d1117] text-gray-100 font-inter min-h-screen flex">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col md:ml-64 min-h-screen">
        <div className="md:hidden flex items-center justify-between bg-[#161b22] p-4 border-b border-[#30363d] z-40">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <main className="flex-1 px-4 py-6 sm:px-6 bg-[#0d1117]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
