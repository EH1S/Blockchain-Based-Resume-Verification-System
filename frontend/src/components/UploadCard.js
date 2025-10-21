import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function UploadCard() {
  const [file, setFile] = useState(null);
  const [hash, setHash] = useState("");

  const calculateHash = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  const handleFileUpload = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      setFile(uploaded);
      calculateHash(uploaded);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="w-full md:w-1/3 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 hover:scale-105 transition"
    >
      <h3 className="text-xl font-semibold mb-4 text-indigo-500">Upload Document</h3>
      <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
        <Upload className="w-10 h-10 text-gray-500 mb-2" />
        <span className="text-gray-500 text-sm">Click or Drag to upload</span>
        <input type="file" onChange={handleFileUpload} className="hidden" />
      </label>
      {file && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">File: {file.name}</p>}
      {hash && (
        <div className="mt-4 text-center">
          <p className="text-xs font-mono break-all text-gray-500">Hash: {hash}</p>
          <div className="mt-3 flex justify-center">
            <QRCodeSVG value={hash} size={120} />
          </div>
        </div>
      )}
    </motion.div>
  );
}
