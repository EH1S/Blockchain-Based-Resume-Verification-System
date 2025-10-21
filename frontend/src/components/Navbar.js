import React from "react";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-20">
      <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
        BlockVerify
      </h1>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-purple-500 transition">Home</a>
        <a href="#" className="hover:text-purple-500 transition">Upload</a>
        <a href="#" className="hover:text-purple-500 transition">Verify</a>
        <a href="#" className="hover:text-purple-500 transition">Docs</a>
        <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
