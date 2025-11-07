import React from "react";
import UploadCard from "./UploadCard";
import VerifyCard from "./VerifyCard";

export default function Dashboard() {
  return (
    <section className="min-h-[80vh] bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row gap-10 justify-center items-start px-6 py-16">
      <UploadCard />
      <VerifyCard />
    </section>
  );
}
