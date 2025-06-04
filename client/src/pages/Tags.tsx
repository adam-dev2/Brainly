import { useEffect, useState } from "react";

type Card = {
  title: string;
  summary: string;
  tags: string[];
  link: string;
};

const Tags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/cards/tags", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tags");

        const data = await res.json();
        setTags(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setTags([]);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    if (!selectedTag) return;

    const fetchCardsByTag = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `http://localhost:5001/api/cards/tag/${selectedTag}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch cards");

        const data = await res.json();
        setCards(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cards for tag:", err);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCardsByTag();
  }, [selectedTag]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Browse by Tags</h1>

      {tags.length === 0 ? (
        <div className="text-gray-500">No tags available yet. Start by adding cards with tags.</div>
      ) : (
        <div className="flex flex-wrap gap-3 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-3 py-1 rounded-full text-sm ${
                tag === selectedTag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-100"
              }`}
              onClick={() => setSelectedTag(tag)}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {loading && <div className="text-gray-500">Loading cards...</div>}

      {!loading && selectedTag && cards.length === 0 && (
        <div className="text-gray-500">No cards found for #{selectedTag}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer relative"
            onClick={() => window.open(card.link, "_blank")}
          >
            <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
            <p className="mb-3 text-gray-700">{card.summary}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {card.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
