import React from "react";

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm m-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default FeatureCard;
