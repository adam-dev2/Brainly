import axios from "axios";
import { useState } from "react";
import { X, Pencil, Tag } from "lucide-react";

interface EditCardProps {
  card: {
    _id: string;
    title: string;
    summary: string;
    link: string;
    tags: string[];
  };
  onClose: () => void;
  onSuccess: (updatedCard: any) => void;
}

const EditCard: React.FC<EditCardProps> = ({ card, onClose, onSuccess }) => {
  const [title, setTitle] = useState(card.title);
  const [summary, setSummary] = useState(card.summary);
  const [link, setLink] = useState(card.link);
  const [tags, setTags] = useState<string[]>(card.tags || []);
  const [tagInput, setTagInput] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
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
      const response = await axios.put(
        `${backendURL}api/cards/${card._id}`,
        { title, summary, link, tags },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedCard = response.data.card;
      onSuccess(updatedCard);
      onClose();
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Error while updating card");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-[#161b22] border border-[#30363d] shadow-2xl rounded-2xl px-8 py-10 text-white animate-fade-in"
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-2">
          <Pencil className="text-green-400" />
          Edit Card
        </h2>

        {/* Fields */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-green-500 outline-none transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Summary"
            className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-green-500 outline-none transition resize-none"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />

          <input
            type="url"
            placeholder="http://..."
            className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-green-500 outline-none transition"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />

          {/* Tags */}
          <div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Edit tags"
                className="flex-1 px-4 py-2 rounded-lg bg-[#0d1117] border border-[#30363d] focus:ring-2 focus:ring-purple-500 outline-none transition"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-[#8957e5]/10 border border-[#8957e5]/30 hover:bg-[#8957e5]/20 text-[#d2a8ff] px-3 py-2 rounded-md flex items-center gap-1 text-sm transition"
              >
                <Tag size={16} /> Add
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

        {/* Save */}
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditCard;
