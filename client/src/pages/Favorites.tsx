import { useEffect, useState } from "react";
import { IoStarSharp } from "react-icons/io5";

type Card = {
  title: string;
  summary: string;
  tags: string[];
  link: string;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/cards/favorites", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch favorites");
        }

        const data = await res.json();
        setFavorites(data.favorites); // depends on your backend response
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-600">Loading favorites...</div>;
  }

  if (favorites.length === 0) {
    return <div className="p-4 text-gray-600">No favorites yet!</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {favorites.map((card, index) => (
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
          <div className="absolute top-2 right-2 flex gap-3">
            <IoStarSharp className="text-amber-400" size={18} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
