import { useEffect, useState } from "react";
import Card from "../../components/Card";
import toast from "react-hot-toast";

type CardType = {
  _id: string;
  title: string;
  summary: string;
  tags: string[];
  link: string;
  favorite: boolean;
};

const Tags = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchTags = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendURL}api/cards/tags`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch tags");

        const data = await res.json();
        console.log(data);
        setTags(Array.isArray(data) ? data : []);
      } catch (err) {
        toast.error(`${err}`)
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
          `${backendURL}api/cards/tag/${selectedTag}`,
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
        <div className="text-center text-gray-400 py-20">
          <h2 className="text-2xl font-semibold mb-2">No tags yet!</h2>
          <p className="text-md">
            Tag your thoughts. Save what matters. Retrieve with a single click ✨
          </p>
        </div>
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

      <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
        {cards.map((card) => (
          <Card
            key={card._id}
            id={card._id}
            title={card.title}
            summary={card.summary}
            tags={card.tags}
            link={card.link}
            isLiked={card.favorite}
            onToggleLike={() => {}}
            onEdit={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Tags;
