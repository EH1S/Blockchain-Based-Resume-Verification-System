import React from "react";
import { BrowserProvider } from "ethers";
import { useNavigate } from "react-router-dom";
import { ADMIN_ADDRESS } from "../eth";

export default function Hero() {
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install MetaMask first!");
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    alert(`✅ Wallet connected: ${addr.slice(0, 6)}...${addr.slice(-4)}`);
  };

  const handleVerifyProof = async () => {
    if (!window.ethereum) return alert("Please install MetaMask first!");
    const provider = new BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const addr = (await signer.getAddress()).toLowerCase();

    // ✅ Redirect based on role
    if (addr === ADMIN_ADDRESS) {
      navigate("/verify");
    } else {
      navigate("/upload");
    }
  };

  return (
    <section className="text-center py-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Secure Your Resume on Blockchain</h1>
      <p className="mb-8 text-lg">
        Upload, hash, and verify your documents securely. Share a proof link that can’t be tampered with.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => navigate("/upload")}
          className="bg-white text-indigo-700 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Upload Now
        </button>
        <button
          onClick={handleVerifyProof}
          className="bg-white text-indigo-700 px-5 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Verify Proof
        </button>
        <button
          onClick={connectWallet}
          className="bg-yellow-400 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-500 transition"
        >
          Connect MetaMask
        </button>
      </div>
    </section>
  );
}
