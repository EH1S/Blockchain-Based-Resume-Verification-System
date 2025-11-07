import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // Redirect to Dashboard after signup
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h2 className="text-4xl font-bold mb-6">Sign Up</h2>
      <form className="flex flex-col gap-4 w-full max-w-sm" onSubmit={handleSignUp}>
        <input type="text" placeholder="Full Name" className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
        <input type="email" placeholder="Email" className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
        <input type="password" placeholder="Password" className="p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800" />
        <button className="py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">Sign Up</button>
      </form>
    </div>
  );
}

