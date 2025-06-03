import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ children }:any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-800 p-5 z-50`}
      >
        <h1 className="text-2xl font-bold mb-10">Second Brain</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/dashboard" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/dashboard/cards" className="hover:bg-gray-700 p-2 rounded">
            All Cards
          </Link>
          <Link to="/dashboard/favorites" className="hover:bg-gray-700 p-2 rounded">
            Favorites
          </Link>
          <Link to="/dashboard/tags" className="hover:bg-gray-700 p-2 rounded">
            Tags
          </Link>
          <Link to="/dashboard/settings" className="hover:bg-gray-700 p-2 rounded">
            Settings
          </Link>
        </nav>
      </div>

      {/* Content area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Mobile header */}
        <div className="flex items-center justify-between bg-gray-800 p-4 md:hidden">
          <h1 className="text-xl font-semibold">Second Brain</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Actual Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
