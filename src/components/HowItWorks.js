import React from "react";
import { CheckCircle, Upload, Shield } from "lucide-react";

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          How It Works
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Simple steps to securely anchor your documents on blockchain.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <Upload className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Upload Document</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Select your resume or portfolio file and upload it securely.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <Shield className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Hash & Store</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Your document is hashed and the proof is stored immutably on blockchain.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <CheckCircle className="w-12 h-12 text-purple-600 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold mb-2">Verify Proof</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Anyone can verify the document using the proof link — tamper-proof and secure.
          </p>
        </div>
      </div>
    </section>
  );
}
