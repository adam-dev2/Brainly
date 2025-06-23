import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaEllipsisV } from "react-icons/fa";

interface CardProps {
  id: string;
  title: string;
  summary: string;
  link: string;
  tags: string[];
  isLiked: boolean;
  onToggleLike?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  readOnly?: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  summary,
  link = "#",
  tags = [],
  isLiked = false,
  onToggleLike,
  onEdit,
  onDelete,
  readOnly = false,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  // const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="relative max-w-sm w-full bg-[#161b22] border border-[#30363d] rounded-2xl shadow-md hover:shadow-lg transition-shadow p-6">
      {!readOnly && (
        <div className="absolute top-3 right-3 flex space-x-2 z-20">
          <button
            onClick={() => onToggleLike?.(id)}
            className="text-red-500 hover:scale-110 transition"
          >
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <div className="relative">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white"
            >
              <FaEllipsisV />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-28 bg-[#0d1117] border border-[#30363d] rounded-xl shadow z-10">
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-[#21262d]"
                  onClick={() => {
                    onEdit?.(id);
                    setShowMenu(false);
                  }}
                >
                  Edit
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-[#21262d]"
                  onClick={() => {
                    onDelete?.(id);
                    setShowMenu(false);
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <a href={link} target="_blank" rel="noopener noreferrer">
        <h3 className="text-xl font-bold text-white hover:underline mb-2">{title}</h3>
      </a>

      <p
        className={`text-gray-400 text-sm mb-3 ${!expanded ? "line-clamp-3" : ""}`}
      >
        {summary}
      </p>

      {/* {summary.split(" ").length > 25 && (
        <button
          onClick={toggleExpanded}
          className="text-xs font-medium text-blue-500 hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )} */}

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="bg-[#238636]/20 text-[#238636] text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#238636]/30"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;
