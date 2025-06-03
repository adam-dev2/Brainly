import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoStarOutline } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";


type Card = {
    title: string,
    link: string,
    summary: string,
    tags: string[]
}
const Cards = () => {

    const [clicked,setClicked] = useState<Boolean[]>([]);

    const cards: Card[] = [
  {
    title: "Learn TypeScript",
    link: "https://www.typescriptlang.org/docs/",
    summary: "Official TypeScript documentation to get you started.",
    tags: ["typescript", "docs", "learning"]
  },
  {
    title: "React Basics",
    link: "https://reactjs.org/docs/getting-started.html",
    summary: "Introduction to React.js and how to build user interfaces.",
    tags: ["react", "frontend", "javascript"]
  },
  {
    title: "Understanding Async/Await",
    link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await",
    summary: "MDN guide explaining async/await in JavaScript.",
    tags: ["javascript", "async", "programming"]
  },
  {
    title: "Tailwind CSS Guide",
    link: "https://tailwindcss.com/docs",
    summary: "Utility-first CSS framework documentation and examples.",
    tags: ["css", "tailwind", "design"]
  },
  {
    title: "Node.js Official Docs",
    link: "https://nodejs.org/en/docs/",
    summary: "Comprehensive documentation for Node.js runtime environment.",
    tags: ["nodejs", "backend", "javascript"]
  },
  {
    title: "Express.js Tutorial",
    link: "https://expressjs.com/en/starter/installing.html",
    summary: "Learn how to create web servers using Express.js.",
    tags: ["express", "nodejs", "backend"]
  },
  {
    title: "MongoDB Basics",
    link: "https://www.mongodb.com/docs/manual/tutorial/",
    summary: "Getting started with MongoDB database and its features.",
    tags: ["mongodb", "database", "nosql"]
  },
  {
    title: "JavaScript ES6 Features",
    link: "https://www.w3schools.com/js/js_es6.asp",
    summary: "Learn about the new features introduced in ES6.",
    tags: ["javascript", "es6", "programming"]
  },
  {
    title: "Introduction to GraphQL",
    link: "https://graphql.org/learn/",
    summary: "Learn how GraphQL works and how to build APIs with it.",
    tags: ["graphql", "api", "backend"]
  },
  {
    title: "Docker for Beginners",
    link: "https://docs.docker.com/get-started/",
    summary: "Official Docker guide for containerizing applications.",
    tags: ["docker", "devops", "containers"]
  },
  {
    title: "Git and GitHub Basics",
    link: "https://guides.github.com/introduction/git-handbook/",
    summary: "Learn how to use Git and GitHub for version control.",
    tags: ["git", "github", "version-control"]
  },
  {
    title: "Building REST APIs",
    link: "https://restfulapi.net/",
    summary: "Comprehensive guide to designing RESTful APIs.",
    tags: ["api", "rest", "backend"]
  },
  {
    title: "JavaScript Closures",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
    summary: "Detailed explanation of closures in JavaScript.",
    tags: ["javascript", "closures", "programming"]
  },
  {
    title: "Next.js Introduction",
    link: "https://nextjs.org/docs",
    summary: "Learn server-side rendering and static site generation with Next.js.",
    tags: ["nextjs", "react", "ssr"]
  },
  {
    title: "Python for Beginners",
    link: "https://www.python.org/about/gettingstarted/",
    summary: "Official Python getting started guide.",
    tags: ["python", "programming", "beginners"]
  },
  {
    title: "CSS Grid Layout",
    link: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    summary: "Comprehensive guide to CSS Grid Layout.",
    tags: ["css", "grid", "design"]
  },
  {
    title: "Understanding REST vs GraphQL",
    link: "https://www.howtographql.com/basics/1-graphql-is-the-better-rest/",
    summary: "Comparison between REST and GraphQL APIs.",
    tags: ["api", "rest", "graphql"]
  },
  {
    title: "Async JavaScript Patterns",
    link: "https://blog.logrocket.com/asynchronous-javascript-deep-dive/",
    summary: "Deep dive into async patterns in JavaScript.",
    tags: ["javascript", "async", "patterns"]
  },
  {
    title: "Webpack Guide",
    link: "https://webpack.js.org/concepts/",
    summary: "Learn about module bundling with Webpack.",
    tags: ["webpack", "javascript", "build-tools"]
  },
  {
    title: "Understanding JWT",
    link: "https://jwt.io/introduction/",
    summary: "Introduction to JSON Web Tokens for authentication.",
    tags: ["jwt", "auth", "security"]
  }
];
    const toggleFavorite = (index: number) => {
    setClicked(prev => {
        const updated = [...prev];
        updated[index] = !updated[index];
        return updated;
    });
};
  return (
   <>
    <div className="flex flex-col justify-around">
      <button className="bg-blue-200 text-gray-900 p-3 text-md cursor-pointer hover:bg-blue-200/80 rounded-2xl">Add Card</button>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer relative"
            // Prevent opening link when clicking icons
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

            {/* Icons container */}
              <div className="absolute top-2 right-2 flex gap-3">
              <button
                onClick={e => {
                  e.stopPropagation();
                  // handleEdit(index);
                }}
                className="text-blue-600 hover:text-blue-800"
                aria-label="Edit card"
              >
                <FaEdit size={18} />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation();
                  // handleDelete(index);
                }}
                className="text-red-600 hover:text-red-800"
                aria-label="Delete card"
              >
                <FaTrash size={18} />
              </button>
              {
                  clicked[index]?(
                      <button
                      onClick={e => {
                          e.stopPropagation();
                          toggleFavorite(index)
                          // handleDelete(index);
                      }}
                      className="text-amber-300 hover:text-amber-500 cursor-pointer"
                      aria-label="Delete card"
                      >
                      <IoStarSharp size={18} />
                      </button>):(
                      <button
                      onClick={e => {
                          e.stopPropagation();
                          toggleFavorite(index)
                          // handleDelete(index);
                      }}
                      className="text-amber-300 hover:text-amber-500 cursor-pointer"
                      aria-label="Delete card"
                      >
                      <IoStarOutline size={18} />
                      </button>
                  )
              }
              
            </div>
          </div>
        ))}
      </div>
    </div>
   </>
  )
}

export default Cards