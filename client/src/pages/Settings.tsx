import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleExport = async () => {
    try {
      const res = await fetch("/api/export");
      const data = await res.blob();
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "brainly-bookmarks.json";
      a.click();
    } catch (err) {
      console.error("Failed to export:", err);
    }
  };

  const handleClearAll = async () => {
    if (confirm("Are you sure you want to delete all saved links?")) {
      try {
        await fetch("/api/clear", { method: "DELETE" });
        alert("All saved links deleted.");
      } catch (err) {
        console.error("Failed to clear data:", err);
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="mb-4">
        <button
          onClick={handleExport}
          className="px-4 py-2 bg-blue-200 text-gray-900 rounded hover:bg-blue-300/30 hover:text-gray-300 cursor-pointer"
        >
          Export Favorites as JSON
        </button>
      </div>

      <div className="mb-4">
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-red-400 text-gray-900 rounded hover:bg-red-600 hover:text-gray-300 cursor-pointer"
        >
          Clear All Saved Links
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-500">
        More settings coming soon...
      </div>
    </div>
  );
};

export default Settings;
