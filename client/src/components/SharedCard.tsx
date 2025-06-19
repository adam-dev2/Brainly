import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card";

interface CardType {
  _id: string;
  title: string;
  summary: string;
  link: string;
  tags: string[];
}

const SharedCards = () => {
  const { userId } = useParams();
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchSharedCards = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/cards/shared/${userId}`);
        if (res.data.cards.length === 0) {
          setNotFound(true);
        } else {
          setCards(res.data.cards);
        }
      } catch (err) {
        console.error("Error fetching shared cards", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedCards();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-inter px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📂 Shared Cards
        </h1>

        {loading ? (
          <div className="text-center mt-20 text-gray-400">Loading shared cards...</div>
        ) : notFound ? (
          <div className="text-center mt-20 text-red-400">
            No cards found or user does not exist.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <Card
                key={card._id}
                id={card._id}
                title={card.title}
                summary={card.summary}
                link={card.link}
                tags={card.tags}
                isLiked={false}
                readOnly
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SharedCards;
