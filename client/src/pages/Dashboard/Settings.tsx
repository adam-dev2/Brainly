import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { AlertCircle, Share2 } from "lucide-react";

const Settings = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleExport = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://localhost:5001/api/cards/export", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const url = URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = "brainly-bookmarks.json";
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Exported successfully!");
    } catch (err) {
      console.error("Failed to export:", err);
      toast.error("Export failed.");
    }
  };

  const handleClearAll = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete("http://localhost:5001/api/cards/clear", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("All saved links deleted.");
    } catch (err) {
      console.error("Failed to clear data:", err);
      toast.error("Failed to clear data.");
    } finally {
      setShowConfirm(false);
    }
  };

  const handleShare = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID not found. Please log in again.");
      return;
    }

    const link = `${window.location.origin}/shared/${userId}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="relative p-6 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-6 text-white">Settings</h1>

      <div className="flex flex-col gap-4">
        <button
          onClick={handleExport}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-700 transition"
        >
          Export Cards as JSON
        </button>

        <button
          onClick={() => setShowConfirm(true)}
          className="bg-[#f54949] hover:bg-[#ff8282] text-[#41090c] px-4 py-2 rounded-lg border border-[#4d4d4d] transition"
        >
          Clear All Saved Links
        </button>

        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg border border-blue-500 transition"
        >
          <Share2 size={18} />
          Share My Cards
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-400">More settings coming soon...</div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl w-[320px] animate-fade-in text-center">
            <div className="flex justify-center text-[#f85149] mb-4">
              <AlertCircle size={36} />
            </div>
            <p className="text-base text-gray-200 font-medium mb-4">
              Are you sure you want to delete all saved links?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={handleClearAll}
                className="bg-[#f32116] hover:bg-[#fa8886] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-semibold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
