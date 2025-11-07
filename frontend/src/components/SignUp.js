import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrowserProvider } from "ethers";

//MetaMask wallet address
const ADMIN_ADDRESS = "0xab5a7c4fb9a1997d10b50731165061cd3f48d135".toLowerCase();

export default function SignUp() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("");

  // ✅ Handle MetaMask sign-up and redirect
  const handleSignUp = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask first!");
        return;
      }

      setStatus("Connecting to MetaMask...");

      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = (await signer.getAddress()).toLowerCase();

      // ✅ Role-based navigation
      if (userAddress === ADMIN_ADDRESS) {
        setStatus("Welcome Admin! Redirecting to Verify Page...");
        navigate("/verify");
      } else {
        setStatus("Welcome! Redirecting to Upload Page...");
        navigate("/upload");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setStatus("Error connecting to MetaMask. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Create Your Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Sign up with your MetaMask wallet
        </p>

        <button
          onClick={handleSignUp}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          Connect MetaMask & Sign Up
        </button>

        {status && (
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            {status}
          </p>
        )}
      </div>
    </div>
  );
}
