import React, { useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Import your pages
import Home from "./components/Home/Home.jsx";
import Projects from "./components/Projects/Project.jsx";
import Settings from "./components/Navbar/Settings.jsx";
import Agence from "./components/Agence/Agence.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";

gsap.registerPlugin(useGSAP);

const App = () => {
  const currentPath = useLocation().pathname;
  const location = useLocation();
  const transitionRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Force starting position (Hides them above the screen instantly)
      gsap.set(".stair", { yPercent: -100 });

      // 2. Slide down into view
      tl.to(".stair", {
        yPercent: 0,
        duration: 0.4,
        stagger: 0.04, // Slightly tighter stagger for more lines
        ease: "power3.out",
      });

      // 3. Slide down and out of view
      tl.to(".stair", {
        yPercent: 100,
        duration: 0.6,
        stagger: 0.04,
        ease: "power4.inOut",
      });

      // 4. Reset for the next click
      tl.set(".stair", { yPercent: -100 });

      return () => tl.kill();
    },
    { dependencies: [location.pathname], scope: transitionRef },
    [currentPath],
  );

  return (
    <div>
      <Navbar />
      <div className="relative bg-[#0a0a0a] min-h-screen">
        {/* --- THE UNIVERSAL TRANSITION CURTAIN --- */}
        <div
          ref={transitionRef}
          className="fixed top-0 left-0 h-screen w-full flex z-[999] pointer-events-none overflow-hidden"
        >
          {/* 6 sleek columns using flex-1 to divide perfectly */}
          <div className="stair h-full flex-1 bg-[#0a0a0a]"></div>
          <div className="stair h-full flex-1 bg-[#141414]"></div>
          <div className="stair h-full flex-1 bg-[#1f1f1f]"></div>
          <div className="stair h-full flex-1 bg-[#141414]"></div>
          <div className="stair h-full flex-1 bg-[#0a0a0a]"></div>
          <div className="stair h-full flex-1 bg-[#141414]"></div>
        </div>

        {/* --- YOUR ROUTES --- */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/agence" element={<Agence />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
