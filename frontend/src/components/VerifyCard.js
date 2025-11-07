import React, { useEffect, useState } from "react";
import { getSignerContract, ADMIN_ADDRESS } from "../eth";

export default function VerifyCard() {
  const [resumes, setResumes] = useState([]);
  const [account, setAccount] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [status, setStatus] = useState("");
  const [candidateAddress, setCandidateAddress] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []);

  // ✅ Connect MetaMask and check admin
  const connectWallet = async () => {
    try {
      const { contract, signer } = await getSignerContract();
      const addr = (await signer.getAddress()).toLowerCase();
      setAccount(addr);
      setConnected(true);

      const admin = (await contract.admin()).toLowerCase();
      if (admin === addr || addr === ADMIN_ADDRESS) {
        setIsAdmin(true);
        setStatus("Connected as Admin ✅");
      } else {
        setIsAdmin(false);
        setStatus("Connected as User (no verification rights)");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error connecting wallet");
    }
  };

  // ✅ Fetch resumes from blockchain
  const fetchResumes = async (address) => {
    try {
      setStatus("Fetching resumes...");
      const { contract } = await getSignerContract();
      const list = await contract.getAllResumes(address);
      const formatted = list.map((r) => ({
        name: r[0],
        ipfsCid: r[1],
        uploadedAt: Number(r[2]),
        isVerified: r[3],
      }));
      setResumes(formatted);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("Error fetching resumes. Check address or network.");
    }
  };

  // ✅ Verify resume (admin only)
  const verifyResume = async (index) => {
    try {
      setStatus("Verifying on blockchain...");
      const { contract } = await getSignerContract();
      const tx = await contract.verifyResume(candidateAddress, index);
      await tx.wait();
      setStatus(`✅ Resume #${index + 1} verified successfully!`);
      await fetchResumes(candidateAddress); // Auto-refresh list
    } catch (error) {
      console.error(error);
      setStatus("Verification failed. You must be admin.");
    }
  };

  // ✅ UI RENDERING
  if (!connected) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Resume Verification DApp</h1>
        <p className="mb-4">Login securely with MetaMask to continue</p>
        <button
          onClick={connectWallet}
          className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Connect MetaMask & Log In
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Access Denied 🚫</h2>
        <p className="text-gray-600">
          You are logged in as <span className="font-mono">{account}</span>.
        </p>
        <p className="text-gray-600">Only the admin can verify resumes.</p>
      </div>
    );
  }

  // ✅ MAIN ADMIN DASHBOARD
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Verify Resumes</h1>

      <div className="mb-4">
        <p>
          Connected Wallet:{" "}
          <span className="font-mono text-sm text-blue-600">{account}</span>
        </p>
        <p className="text-green-600 font-semibold">{status}</p>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter candidate wallet address"
          className="border p-2 rounded w-96 mr-3"
          value={candidateAddress}
          onChange={(e) => setCandidateAddress(e.target.value)}
        />
        <button
          onClick={() => fetchResumes(candidateAddress)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Resumes
        </button>
      </div>

      {resumes.length === 0 ? (
        <p>No resumes found for this candidate.</p>
      ) : (
        <div className="space-y-4">
          {resumes.map((r, i) => (
            <div
              key={i}
              className="border p-4 rounded flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-semibold">{r.name}</p>
                <a
                  href={`https://gateway.pinata.cloud/ipfs/${r.ipfsCid}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View Resume
                </a>
                <p className="text-sm text-gray-500">
                  Uploaded: {new Date(r.uploadedAt * 1000).toLocaleString()}
                </p>
              </div>

              {r.isVerified ? (
                <span className="text-green-600 font-semibold">✅ Verified</span>
              ) : (
                <button
                  onClick={() => verifyResume(i)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
