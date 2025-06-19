import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const fullName = localStorage.getItem("fullname");
    setName(fullName || "");
  }, []);

  return (
    <div className="p-6 md:p-10 text-white">
      <div className="mb-10">
        <h2 className="text-3xl font-bold mb-2">
          Welcome{name ? `, ${name}` : ""} 👋
        </h2>
        <p className="text-gray-300">
          Start capturing and organizing your ideas, articles, and bookmarks. Build your second brain 🧠.
        </p>
        <p className="text-sm text-gray-500 italic mt-2">
          “Your brain is for having ideas, not storing them.” — David Allen
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/dashboard/cards"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-1">📥 Add New Card</h3>
          <p className="text-gray-400 text-sm">
            Save a new article, idea, or resource to your second brain.
          </p>
        </Link>

        <Link
          to="/dashboard/cards"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-1">🗂️ View All Cards</h3>
          <p className="text-gray-400 text-sm">
            Explore and organize everything you’ve saved.
          </p>
        </Link>

        <Link
          to="/dashboard/favorites"
          className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-2xl p-6 shadow-lg transition-all duration-200 hover:shadow-2xl"
        >
          <h3 className="text-xl font-semibold mb-1">❤️ Favorites</h3>
          <p className="text-gray-400 text-sm">
            Quickly access your most loved content.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
