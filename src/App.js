import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Docs from "./components/Docs";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import UploadCard from "./components/UploadCard";
import VerifyCard from "./components/VerifyCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div
        className={`transition-colors duration-300 ${
          darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <HowItWorks />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/upload" element={<UploadCard />} />
          <Route path="/verify" element={<VerifyCard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
