import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function VerifyCard() {
  const [inputHash, setInputHash] = useState("");
  const [verified, setVerified] = useState(null);

  const verifyHash = () => {
    if (inputHash.trim() === "demo123hash") setVerified(true);
    else setVerified(false);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full md:w-1/3 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 hover:scale-105 transition"
    >
      <h3 className="text-xl font-semibold mb-4 text-purple-500">Verify Document</h3>
      <input
        type="text"
        placeholder="Enter or paste hash"
        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-sm mb-4 focus:outline-none"
        value={inputHash}
        onChange={(e) => setInputHash(e.target.value)}
      />
      <button onClick={verifyHash} className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg transition">
        Verify
      </button>
      {verified !== null && (
        <div className="mt-3 flex items-center justify-center gap-2">
          {verified ? (
            <>
              <CheckCircle className="text-green-500" />
              <p className="text-green-500 font-semibold">Document Verified</p>
            </>
          ) : (
            <>
              <XCircle className="text-red-500" />
              <p className="text-red-500 font-semibold">Not Found on Blockchain</p>
            </>
          )}
        </div>
      )}
    </motion.div>
  );
}
