import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navLinksRef = useRef([]);

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Agence", path: "/agence" },
    { name: "Settings", path: "/settings" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(menuRef.current, {
          clipPath: "circle(150% at 100% 0%)",
          duration: 0.8,
          ease: "power4.inOut",
        });

        gsap.fromTo(
          navLinksRef.current,
          { y: 100, opacity: 0, rotateX: -30 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: "power3.out",
          },
        );
      } else {
        gsap.to(menuRef.current, {
          clipPath: "circle(0% at 100% 0%)",
          duration: 0.6,
          ease: "power4.inOut",
        });
      }
    },
    { dependencies: [isOpen] },
  );

  return (
    <>
      <style>
        {`
          @keyframes nav-marquee-1 {
            0% { transform: translateX(0%) rotate(-15deg); }
            100% { transform: translateX(-50%) rotate(-15deg); }
          }
          @keyframes nav-marquee-2 {
            0% { transform: translateX(-50%) rotate(10deg); }
            100% { transform: translateX(0%) rotate(10deg); }
          }
        `}
      </style>

      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 flex justify-between items-center text-white mix-blend-difference">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold tracking-tighter uppercase z-[110]"
        >
          Sixty-Seventh.
        </Link>

        <button
          onClick={toggleMenu}
          className="group relative w-10 h-8 flex flex-col justify-center items-end gap-2 z-[110] cursor-pointer"
          aria-label="Toggle Menu"
        >
          <span
            className={`block h-[2px] bg-white transition-all duration-500 ease-in-out ${isOpen ? "w-8 rotate-45 translate-y-[5px]" : "w-10 group-hover:w-8"}`}
          ></span>
          <span
            className={`block h-[2px] bg-white transition-all duration-500 ease-in-out ${isOpen ? "w-8 -rotate-45 -translate-y-[5px]" : "w-8 group-hover:w-10"}`}
          ></span>
        </button>
      </nav>

      {/* OVERLAY: Changed to flex-col and removed justify-center to separate top/middle/bottom cleanly */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#050505] z-[105] flex flex-col overflow-hidden pt-24 pb-8"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
      >
        {/* --- BACKGROUND BANDS & GLOWS (z-0) --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[10%] left-[-20%] w-[150%] border-y border-white/10 py-4">
            <div className="flex whitespace-nowrap animate-[nav-marquee-1_30s_linear_infinite]">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-8 px-4 text-6xl md:text-8xl font-black uppercase text-white/10 tracking-tighter"
                >
                  <span>Creative</span>
                  <span>✦</span>
                  <span>Digital</span>
                  <span>✦</span>
                  <span>Design</span>
                  <span>✦</span>
                  <span>Agency</span>
                  <span>✦</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-[10%] left-[-20%] w-[150%] border-y border-white/10 py-4">
            <div className="flex whitespace-nowrap animate-[nav-marquee-2_25s_linear_infinite]">
              {[...Array(2)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-8 px-4 text-6xl md:text-8xl font-black uppercase text-white/10 tracking-tighter"
                >
                  <span>Sixty-Seventh</span>
                  <span>✦</span>
                  <span>Independent</span>
                  <span>✦</span>
                  <span>Est. 2024</span>
                  <span>✦</span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[150px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[150px]"></div>
        </div>

        {/* --- NAVIGATION LINKS (flex-1 centers them between top and bottom) --- */}
        <div className="flex-1 flex flex-col justify-center items-center gap-2 md:gap-4 perspective-[1000px] relative z-10 overflow-y-auto">
          {links.map((link, index) => (
            <div
              key={link.name}
              ref={(el) => (navLinksRef.current[index] = el)}
            >
              <Link
                to={link.path}
                onClick={toggleMenu}
                // Reduced text size slightly for smaller screens
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-all duration-300 block"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* --- BOTTOM SOCIALS (No longer absolute, sits cleanly at the bottom) --- */}
        <div className="shrink-0 relative z-20 flex justify-center w-full">
          <div className="flex gap-6 md:gap-8 px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-gray-300 text-xs md:text-sm tracking-widest uppercase shadow-2xl">
            <a href="#" className="hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-white transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
