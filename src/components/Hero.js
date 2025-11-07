import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Replace with your real auth logic
  const [account, setAccount] = useState(null);

  // Connect MetaMask
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (err) {
        console.error("MetaMask connection rejected");
      }
    } else {
      alert("MetaMask not found! Please install it.");
    }
  };

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) setAccount(accounts[0]);
        else setAccount(null);
      });
    }
  }, []);

  const handleUpload = () => {
    if (!isLoggedIn) navigate("/login");
    else navigate("/upload");
  };

  const handleVerify = () => {
    if (!isLoggedIn) navigate("/login");
    else navigate("/verify");
  };

  return (
    <section className="relative text-center py-24 px-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white rounded-b-3xl overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6 relative z-10"
      >
        Secure Your Resume on Blockchain
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg max-w-2xl mx-auto mb-8 relative z-10"
      >
        Upload, hash, and verify your documents securely. Share a proof link that can’t be tampered with.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-4 relative z-10 flex-wrap"
      >
        <button
          onClick={handleUpload}
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:scale-105 transition"
        >
          Upload Now
        </button>
        <button
          onClick={handleVerify}
          className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:scale-105 transition"
        >
          Verify Proof
        </button>
        <button
          onClick={connectMetaMask}
          className={`px-6 py-3 ${account ? "bg-green-500" : "bg-yellow-400"} text-white font-semibold rounded-lg hover:scale-105 transition`}
        >
          {account ? `Connected: ${account.slice(0,6)}...${account.slice(-4)}` : "Connect MetaMask"}
        </button>
      </motion.div>
    </section>
  );
}
