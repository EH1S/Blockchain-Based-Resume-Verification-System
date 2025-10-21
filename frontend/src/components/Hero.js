import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center py-16 px-4 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 text-white rounded-b-3xl">
      <motion.h2 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold mb-6"
      >
        Secure Your Resume on Blockchain
      </motion.h2>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="text-lg max-w-2xl mx-auto mb-6"
      >
        Upload, hash, and verify your documents securely. Share a proof link that can’t be tampered with.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-center gap-4">
        <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:scale-105 transition">
          Upload Now
        </button>
        <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:scale-105 transition">
          Verify Proof
        </button>
      </motion.div>
    </section>
  );
}
