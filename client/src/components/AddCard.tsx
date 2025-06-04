import { useState } from "react";

type AddCardProps = {
  onClose: () => void;
  onAdd: (newCard: any) => void; 
};

const AddCard = ({ onClose, onAdd }: AddCardProps) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [summary, setSummary] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5001/api/cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, link, summary, tags }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create card");
      }

      const data = await res.json();

      setMessage("Card added successfully!");
      setTitle("");
      setLink("");
      setSummary("");
      setTags([]);

      onAdd(data.card); 
      onClose(); 
    } catch (err: any) {
      console.error("Error adding card:", err);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg p-8 max-w-lg w-full relative z-10">
      <button
        className="absolute top-2 right-3 text-gray-400 hover:text-gray-800 text-xl"
        onClick={onClose}
      >
        &times;
      </button>

      <h2 className="text-2xl font-bold mb-4">Add New Card</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          placeholder="Link"
          value={link}
          onChange={e => setLink(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Summary (optional)"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter tag"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-200 text-gray-700 rounded hover:bg-blue-300 hover:text-gray-900 cursor-pointer"
          >
            Add Tag
          </button>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
              >
                #{tag}
                <button
                  type="button"
                  className="ml-2 text-red-600 cursor-pointer"
                  onClick={() => handleRemoveTag(tag)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-300 text-gray-900 py-2 rounded hover:bg-green-500 cursor-pointer transition"
        >
          {loading ? "Adding..." : "Add Card"}
        </button>

        {message && <div className="text-center mt-4 text-red-600">{message}</div>}
      </form>
    </div>
  );
};

export default AddCard;
