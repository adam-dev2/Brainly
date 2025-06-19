import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaEllipsisV } from "react-icons/fa";

interface CardProps {
  id: string;
  title: string;
  summary: string;
  link: string;
  tags: string[];
  isLiked: boolean;
  onToggleLike: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
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
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleMenu = () => setShowMenu((prev) => !prev);
  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <div className="relative max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className="absolute top-2 right-2 flex space-x-2 z-20">
        <button
          onClick={() => onToggleLike(id)}
          className="text-red-500 hover:scale-110 transition"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-gray-800 hover:text-gray-900 dark:text-white"
          >
            <FaEllipsisV />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-700 rounded-xl shadow z-10">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  onEdit(id);
                  setShowMenu(false);
                }}
              >
                Edit
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={() => {
                  onDelete(id);
                  setShowMenu(false);
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:underline">
            {title}
          </h5>
        </a>

        <p
          className={`mb-3 font-normal text-gray-700 dark:text-gray-400 ${
            !expanded ? "line-clamp-3" : ""
          }`}
        >
          {summary}
        </p>

        {summary.split(" ").length > 25 && (
          <button
            onClick={toggleExpanded}
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            {expanded ? "Show less" : "Read more"}
          </button>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
