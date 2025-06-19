import { useEffect, useState } from "react";
import Card from "../../components/Card";
import AddCard from "../../components/AddCard";
import EditCard from "../../components/EditCard";
import axios from "axios";

type CardType = {
  _id: string;
  title: string;
  summary: string;
  tags: string[];
  link: string;
  favorite: boolean;
};

const Cards = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editCard, setEditCard] = useState<CardType | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5001/api/cards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCards(response.data.cards);
    } catch (error: any) {
      console.error(error?.response?.data?.message || "Unknown error");
    }
  };

  const handleEdit = (id: string) => {
    const cardToEdit = cards.find((card) => card._id === id);
    if (cardToEdit) {
      setEditCard(cardToEdit);
    }
  };

  const handleEditSuccess = (updatedCard: CardType) => {
    setCards((prev) =>
      prev.map((card) => (card._id === updatedCard._id ? updatedCard : card))
    );
    setEditCard(null);
  };

  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/cards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCards((prev) => prev.filter((card) => card._id !== id));
    } catch (err) {
      alert("Failed to delete card");
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

  const handleAddCardSuccess = (newCard: CardType) => {
    setCards((prev) => [newCard, ...prev]);
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow-md cursor-pointer"
          onClick={() => setShowAddModal(true)}
        >
          + Add Card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <h2 className="text-2xl font-semibold mb-2">No cards yet!</h2>
          <p className="text-md">
            Start saving your favorite resources and ideas. Click the{" "}
            <span className="text-red-400 font-semibold">+ Add Card</span> button to get started !!!
          </p>
        </div>
      ) : (
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
              onToggleLike={toggleFavorite}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showAddModal && (
        <AddCard
          onClose={() => setShowAddModal(false)}
          onSuccess={handleAddCardSuccess}
        />
      )}

      {editCard && (
        <EditCard
          card={editCard}
          onClose={() => setEditCard(null)}
          onSuccess={handleEditSuccess}
        />
      )}
    </div>
  );
};

export default Cards;
