import React, { useState } from "react";
import axios from "axios";
import { getSignerContract } from "../eth";
import { BrowserProvider } from "ethers";

export default function UploadCard() {
  const [files, setFiles] = useState([]);
  const [status, setStatus] = useState("");
  const [uploaded, setUploaded] = useState([]); // [{name,cid,timestamp}]
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  // ✅ Connect wallet before upload
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask first!");
        return;
      }
      const provider = new BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setAccount(addr);
      setIsConnected(true);
      setStatus(`Wallet connected: ${addr.slice(0, 6)}...${addr.slice(-4)}`);
    } catch (error) {
      console.error(error);
      setStatus("Failed to connect wallet");
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // ✅ Upload to blockchain after IPFS upload
  async function uploadToBlockchain(uploadedResumes) {
    const { contract } = await getSignerContract();
    for (const r of uploadedResumes) {
      const tx = await contract.uploadResume(r.name, r.cid);
      await tx.wait();
      console.log(`On-chain: ${r.name} -> ${r.cid}`);
    }
  }

  // ✅ Upload to Pinata via backend
  const handleUpload = async () => {
    if (!isConnected) return alert("Connect your wallet first!");
    if (!files.length) return alert("Select one or more resumes to upload.");

    setStatus("Uploading to IPFS via backend...");
    const form = new FormData();
    files.forEach((f) => form.append("files", f));

    try {
      const res = await axios.post("http://localhost:5000/upload-multiple", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedResumes = res.data.uploadedResumes; // [{name,cid,timestamp}]
      setUploaded(uploadedResumes);

      setStatus("Writing resume data to blockchain...");
      await uploadToBlockchain(uploadedResumes);

      setStatus("✅ All resumes uploaded & recorded on blockchain!");
    } catch (err) {
      console.error(err);
      setStatus(
        err.response?.data?.details
          ? JSON.stringify(err.response.data.details)
          : err.message || "Upload failed"
      );
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Upload Resumes</h2>

      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
      ) : (
        <>
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="mb-3"
          />

          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Upload & Save On-Chain
          </button>
        </>
      )}

      <p className="mt-3">{status}</p>

      {uploaded.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Uploaded Files</h3>
          <ul className="space-y-2">
            {uploaded.map((r, i) => (
              <li key={i} className="border p-3 rounded shadow-sm">
                <div className="font-medium">{r.name}</div>
                <a
                  className="text-blue-600 underline"
                  href={`https://gateway.pinata.cloud/ipfs/${r.cid}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View on IPFS
                </a>
                <div className="text-sm text-gray-500 break-all">
                  CID: {r.cid}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
