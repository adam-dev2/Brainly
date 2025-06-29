import axios from "axios";
import { useState } from "react";
import { Sparkles, X, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface AddCardProps {
  onClose: () => void;
  onSuccess: (card: any) => void;
}

const AddCard: React.FC<AddCardProps> = ({ onClose, onSuccess }) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loadingTags, setLoadingTags] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleGenerateTags = async () => {
    console.log("summary")
    if (!summary.trim()) {
      toast.error("please give us a summary");
      return;
    };
    try {
      setLoadingTags(true);
      const response = await axios.post(`${backendURL}api/ai/generate-tags`, {
        content: summary,
      });

      const generated = response.data.tags || [];
      toast.success("successfully generated tags")
      setTags(generated);
    } catch (error) {
      toast.error(`${error}`)
      console.error("Error generating tags", error);
    } finally {
      setLoadingTags(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput)) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${backendURL}api/cards/`,
        { title, summary, link, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newCard = response.data.card;
      onSuccess(newCard);
      onClose();
    } catch (error: any) {
      console.error(error?.response?.data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl px-8 py-10 text-white animate-fade-in"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
          <Sparkles className="text-yellow-400" /> Add New Card
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

            <textarea
              placeholder="Summary"
              className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
            

        <div className="relative">
          <input
            type="url"
            placeholder="http://..."
            className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            />
          <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={handleGenerateTags}
                disabled={loadingTags}
                className={`relative group bg-[#0d1117] border border-[#30363d] text-white px-3 py-1.5 rounded-md flex items-center gap-2 text-xs font-medium hover:border-blue-500 hover:text-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                {loadingTags ? "Generating..." : "AI Tags"}
              </button>
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add tag"
                className="flex-1 px-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-pink-500 outline-none transition"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />

              <button
                type="button"
                onClick={handleAddTag}
                className="bg-[#f85149]/10 border border-[#f85149]/30 hover:bg-[#f85149]/20 text-[#f85149] px-3 py-2 rounded-md flex items-center gap-1 transition text-sm"
              >
                <Plus size={13} /> Tag
              </button>
            </div>


            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#21262d] text-sm px-3 py-1 rounded-full flex items-center gap-2 border border-[#30363d]"
                >
                  #{tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-400 text-gray-400 transition"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Card
        </button>
      </form>
    </div>
  );
};

export default AddCard;
