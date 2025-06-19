import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LogOut, LayoutDashboard, Star, Tags, Layers, Settings } from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
  }, [sidebarOpen]);

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard" },
    { label: "All Cards", icon: <Layers size={18} />, path: "/dashboard/cards" },
    { label: "Favorites", icon: <Star size={18} />, path: "/dashboard/favorites" },
    { label: "Tags", icon: <Tags size={18} />, path: "/dashboard/tags" },
    { label: "Settings", icon: <Settings size={18} />, path: "/dashboard/settings" },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-[#161b22] border-r border-[#30363d] z-50 flex flex-col justify-between p-6`}
      >
        <div>
          <div className="flex items-center gap-3 px-4 py-2 mb-8">
            <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-2 rounded-xl shadow-lg animate-pulse">
              🧠
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Second Brain
            </span>
          </div>


          <nav
            className="flex flex-col gap-2 text-sm"
            onClick={() => setSidebarOpen(false)}
          >
            {navItems.map((item) => (
              <Link
                to={item.path}
                key={item.label}
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[#21262d] text-gray-300 hover:text-white transition-all"
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
            toast.success("Logged out successfully");
          }}
          className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 rounded-full bg-[#f85149]/10 text-[#f85149] hover:bg-[#f85149]/20 transition-all border border-[#f85149]/30 text-sm font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
