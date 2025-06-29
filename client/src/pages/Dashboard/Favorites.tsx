import { useState, useEffect } from "react";
import Card from "../../components/Card";
import axios from "axios";
import toast from "react-hot-toast";

type C = {
  _id: string;
  title: string;
  summary: string;
  tags: string[];
  link: string;
  favorite: boolean;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<C[]>([]);
  const [loading, setLoading] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL;


  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${backendURL}api/cards/favorites`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setFavorites(res.data.favorites);
        console.log(res.data.favorites);
      } catch (err) {
        toast.error(`${err}`)
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `${backendURL}api/cards/${id}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavorites((prev) => prev.filter((card) => card._id !== id));
    } catch (err) {
      console.error("Failed to unfavorite", err);
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-white text-center py-10">Loading…</div>
      ) : favorites.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <h2 className="text-2xl font-semibold mb-2">No favorites yet!</h2>
          <p className="text-md">
            Like a card to save it here. Keep your favorite links just a click away ❤️
          </p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
          {favorites.map((card) => (
            <Card
              key={card._id}
              id={card._id}
              title={card.title}
              summary={card.summary}
              tags={card.tags}
              link={card.link}
              isLiked={true}
              onEdit={() => console.log("Edit", card.title)}
              onDelete={() => console.log("Delete", card.title)}
              onToggleLike={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Favorites;
