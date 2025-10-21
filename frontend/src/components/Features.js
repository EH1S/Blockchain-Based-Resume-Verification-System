import React from "react";
import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="flex flex-wrap justify-center py-20 bg-gray-100">
      <FeatureCard
        title="Secure Verification"
        description="Blockchain ensures your credentials are tamper-proof."
      />
      <FeatureCard
        title="Instant Results"
        description="Employers can instantly verify your credentials anytime."
      />
      <FeatureCard
        title="Direct & Transparent"
        description="No middleman, your data is fully under your control."
      />
    </section>
  );
}

export default Features;
