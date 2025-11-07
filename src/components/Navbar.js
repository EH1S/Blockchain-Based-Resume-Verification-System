import React from "react";
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20">
      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
        BlockVerify
      </h1>
      <div className="flex items-center gap-4">
        <Link to="/" className="hover:text-purple-500 transition">Home</Link>
        <Link to="/login" className="hover:text-purple-500 transition">Log In</Link>
        <Link to="/signup" className="hover:text-purple-500 transition">Sign Up</Link>
        <Link to="/docs" className="hover:text-purple-500 transition">Docs</Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
