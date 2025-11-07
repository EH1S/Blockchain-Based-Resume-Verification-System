import React, { useEffect, useState } from "react";
import { getSignerContract } from "../eth";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [account, setAccount] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchVerifiedResumes();
  }, []);

  // ✅ Connect wallet and fetch verified resumes
  const fetchVerifiedResumes = async () => {
    try {
      setStatus("Connecting to MetaMask...");
      const { contract, signer } = await getSignerContract();
      const addr = await signer.getAddress();
      setAccount(addr);

      setStatus("Fetching resumes from blockchain...");
      const allResumes = await contract.getAllResumes(addr);

      // Convert and filter only verified resumes
      const verified = allResumes
        .map((r) => ({
          name: r[0],
          cid: r[1],
          uploadedAt: Number(r[2]),
          isVerified: r[3],
        }))
        .filter((r) => r.isVerified);

      setResumes(verified);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("Failed to load verified resumes.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Verified Resumes</h1>

      <div className="mb-4 text-sm text-gray-700">
        Connected Wallet:{" "}
        <span className="font-mono text-blue-600">
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Not connected"}
        </span>
      </div>

      {status && <p className="mb-3 text-gray-600">{status}</p>}

      {resumes.length === 0 ? (
        <p className="text-gray-600">No verified resumes yet.</p>
      ) : (
        <div className="space-y-4">
          {resumes.map((r, i) => (
            <div key={i} className="border p-4 rounded shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{r.name}</p>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${r.cid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume on IPFS
                </a>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(r.uploadedAt * 1000).toLocaleString()}
                </p>
              </div>

              <span className="text-green-600 font-semibold text-lg">✅ Verified</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
