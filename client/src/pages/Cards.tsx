import { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import axios from "axios";
import AddCard from "../components/AddCard";

type Card = {
  _id: string;
  title: string;
  link: string;
  summary: string;
  tags: string[];
  favorite: boolean;
};

const Cards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const fetchCards = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5001/api/cards/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCards(res.data.cards);
      setLoading(false);
    } catch (err: any) {
      setError(`Failed to fetch cards ${err}`);
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5001/api/cards/${id}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCards((prev) =>
        prev.map((card) =>
          card._id === id ? { ...card, favorite: !card.favorite } : card
        )
      );
    } catch (err) {
      alert("Failed to toggle favorite");
    }
  };

  const handleAddCard = (newCard: Card) => {
    setCards((prev) => [newCard, ...prev]);
    setShowModal(false);
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white p-3 text-md cursor-pointer hover:bg-blue-700 rounded-2xl mb-4 ml-4"
      >
        + Add Card
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <AddCard onClose={() => setShowModal(false)} onAdd={handleAddCard} />
        </div>
      )}

      {loading && <p className="text-center">Loading cards...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && cards.length === 0 && (
        <p className="text-center text-gray-500">No cards found.</p>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {cards.map((card) => (
          <div
            key={card._id}
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
              <button onClick={(e) => e.stopPropagation()} className="text-blue-600 hover:text-blue-800">
                <FaEdit size={18} />
              </button>
              <button onClick={(e) => e.stopPropagation()} className="text-red-600 hover:text-red-800">
                <FaTrash size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(card._id);
                }}
                className="text-amber-300 hover:text-amber-500"
              >
                {card.favorite ? <IoStarSharp size={18} /> : <IoStarOutline size={18} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
