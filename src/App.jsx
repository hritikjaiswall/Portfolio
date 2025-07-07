import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import React, { useState } from "react";
import "./index.css";
import Home from "./Pages/Home";
import About from "./Pages/About";
import AnimatedBackground from "./components/Background";
import Navbar from "./components/Navbar";
import Portofolio from "./Pages/Portofolio";
import ContactPage from "./Pages/Contact";
import ProjectDetails from "./components/ProjectDetail";
import WelcomeScreen from "./Pages/WelcomeScreen";
import { AnimatePresence } from "framer-motion";

const Footer = () => (
  <footer className="mt-10">
    <center>
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
      <span className="block text-sm pb-4 text-gray-500 dark:text-gray-400">
        © 2025{" "}
        <Link to="/" className="hover:underline font-medium">
          Hritik Jaiswal™
        </Link>{" "}
        |{" "}
        <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" className="hover:underline">
          GitHub
        </a>{" "}
        | All Rights Reserved.
      </span>
    </center>
  </footer>
);

const LandingPage = ({ showWelcome, setShowWelcome }) => (
  <>
    <AnimatePresence mode="wait">
      {showWelcome && <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />}
    </AnimatePresence>

    {!showWelcome && (
      <>
        <Navbar />
        <AnimatedBackground />
        <Home />
        <About />
        <Portofolio />
        <ContactPage />
        <Footer />
      </>
    )}
  </>
);

const ProjectPageLayout = () => (
  <>
    <ProjectDetails />
    <Footer />
  </>
);

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage showWelcome={showWelcome} setShowWelcome={setShowWelcome} />} />
        <Route path="/project/:id" element={<ProjectPageLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
