import { useState } from "react";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      
      <div className={`fixed inset-y-0 left-0 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-800 p-5`}>
        <h1 className="text-2xl font-bold mb-10">🧠 Second Brain</h1>
        <nav className="flex flex-col gap-4">
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Dashboard</a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">All Cards</a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Favorites</a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Tags</a>
          <a href="#" className="hover:bg-gray-700 p-2 rounded">Settings</a>
        </nav>
      </div>

      <div className="flex-1 flex flex-col ml-0 md:ml-64">
        
        <div className="flex items-center justify-between bg-gray-800 p-4 md:hidden">
          <h1 className="text-xl font-semibold">Second Brain</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <h2 className="text-3xl font-bold mb-4">Welcome to your Second Brain 🧠</h2>
          <p>Start capturing and organizing your ideas, articles, and knowledge!</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
