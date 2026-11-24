import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, useMotionValue, useSpring } from "framer-motion";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navLinksRef = useRef([]);
  const menuTimelineRef = useRef(null);
  const menuButtonLinesRef = useRef([]);
  const cvX = useMotionValue(0);
  const cvY = useMotionValue(0);
  const cvXSpring = useSpring(cvX, { stiffness: 180, damping: 18 });
  const cvYSpring = useSpring(cvY, { stiffness: 180, damping: 18 });

  const links = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Agence", path: "/agence" },
    { name: "Cv", path: "/cv" },
  ];

  const handleCvMouseMove = (event) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    cvX.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
    cvY.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  const resetCvPosition = () => {
    cvX.set(0);
    cvY.set(0);
  };

  const toggleMenu = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);

    if (nextOpen) {
      menuTimelineRef.current?.play();
    } else {
      menuTimelineRef.current?.reverse();
    }
  };

  useGSAP(() => {
    const menuTimeline = gsap.timeline({
      paused: true,
      onStart: () => gsap.set(menuRef.current, { visibility: "visible" }),
      onReverseComplete: () =>
        gsap.set(menuRef.current, { visibility: "hidden" }),
    });

    menuTimeline
      .to(menuRef.current, {
        clipPath: "circle(150vmax at 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      })
      .fromTo(
        navLinksRef.current,
        { y: 60, opacity: 0, rotateX: -30 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        },
        0.2,
      )
      .to(
        menuButtonLinesRef.current,
        { width: 32, duration: 0.25, ease: "power2.out" },
        0,
      )
      .to(
        menuButtonLinesRef.current[0],
        { rotation: 45, y: 5, duration: 0.25 },
        0,
      )
      .to(
        menuButtonLinesRef.current[1],
        { rotation: -45, y: -5, duration: 0.25 },
        0,
      );

    menuTimelineRef.current = menuTimeline;
    gsap.set(menuRef.current, { visibility: "hidden" });

    return () => {
      menuTimelineRef.current = null;
    };
  }, []);

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

      <nav className="fixed top-0 left-0 w-full z-[110] px-6 py-6 md:px-12 flex justify-between items-center text-white mix-blend-difference">
        {/* The Parent Wrapper */}
        <div className="relative group inline-block">
          {/* The "19." Text (h2) */}
          <h2 className="relative cursor-pointer font-[font1] text-3xl md:text-4xl font-bold tracking-tighter text-white drop-shadow-lg active:scale-95 transition-transform duration-200">
            19.
            {/* The Animated Orange Underline (Scales from right to left on hover) */}
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-500 via-orange-600 to-zinc-800 origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
          </h2>

          {/* The Tooltip */}
          <div
            className="absolute top-full left-0 mt-3 w-[220px] p-4 bg-[#0a0a0a]/95 backdrop-blur-sm text-left rounded-xl 
               border border-zinc-700/50 shadow-2xl transition-all duration-300 ease-out pointer-events-none z-50
               opacity-0 invisible -translate-x-4 translate-y-4
               group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 group-hover:translate-y-0"
          >
            {/* Lighter, aesthetic text */}
            <div className="text-[12px] leading-relaxed text-white font-light">
              A 19 y/o{" "}
              <span className="font-medium bg-gradient-to-r from-orange-400 to-amber-200 bg-clip-text text-transparent">
                Web Developer & Designer
              </span>
              .
              <br />
              <span className="text-white text-[11px] italic">
                Turning wild ideas into interactive experiences!
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          {/* THE ARTISTIC CV BUTTON */}
          <motion.div
            style={{ x: cvXSpring, y: cvYSpring }}
            onMouseMove={handleCvMouseMove}
            onMouseLeave={resetCvPosition}
            className={`relative ${isOpen ? "invisible pointer-events-none" : ""}`}
          >
            <Link
              to="/cv"
              className="relative flex items-center justify-center min-w-[80px] md:min-w-[100px] h-12 group active:scale-95 transition-transform duration-200"
            >
              {/* Custom Keyframes for the continuous sketchy drawing */}
              <style>
                {`
              @keyframes sketch-draw {
                0% { stroke-dashoffset: 200; }
                50% { stroke-dashoffset: 0; }
                100% { stroke-dashoffset: -200; }
              }
              .animate-sketch {
                animation: sketch-draw 4s linear infinite;
              }
            `}
              </style>

              {/* THE ARTISTIC OVAL SVG */}
              <svg
                viewBox="0 0 120 50"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible -rotate-3 group-hover:rotate-0 transition-transform duration-500"
              >
                {/* 1. The faint underlying sketch (gives the messy hand-drawn look) */}
                <path
                  d="M 10,25 C 10,5 110,5 110,25 C 110,45 10,45 10,25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  className="text-white/20"
                />
                <path
                  d="M 12,28 C 15,10 105,8 108,22 C 112,40 15,48 12,28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-white/10"
                />

                {/* 2. The continuous moving sketch (Amber) */}
                <path
                  d="M 8,26 C 8,8 112,8 112,26 C 112,42 8,42 8,26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="100 200"
                  className="text-amber-500 animate-sketch group-hover:stroke-[3.5] group-hover:text-amber-400 transition-all duration-300"
                />

                {/* 3. Hover Glow Effect */}
                <path
                  d="M 8,26 C 8,8 112,8 112,26 C 112,42 8,42 8,26"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-amber-500/0 blur-md group-hover:text-amber-500/40 transition-all duration-500"
                />
              </svg>

              {/* The Text */}
              <span className="relative z-10 text-xs md:text-sm font-[font2]-black uppercase tracking-[0.2em] text-white group-hover:text-amber-400 group-active:text-amber-300 transition-colors duration-300">
                CV
              </span>
            </Link>
          </motion.div>

          <button
            onClick={toggleMenu}
            className="group relative w-10 h-8 z-[110] cursor-pointer"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span
              ref={(el) => (menuButtonLinesRef.current[0] = el)}
              className="absolute right-0 top-[calc(50%-5px)] block h-[2px] w-10 bg-white"
            ></span>
            <span
              ref={(el) => (menuButtonLinesRef.current[1] = el)}
              className="absolute right-0 top-[calc(50%+5px)] block h-[2px] w-8 bg-white"
            ></span>
          </button>
        </div>
      </nav>

      {/* OVERLAY: Changed to flex-col and removed justify-center to separate top/middle/bottom cleanly */}
      <div
        ref={menuRef}
        className="fixed inset-0 bg-[#050505] z-[105] flex flex-col overflow-hidden pt-24 pb-8"
        style={{ clipPath: "circle(0% at 100% 0%)" }}
        aria-hidden={!isOpen}
        inert={!isOpen}
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
                  <span>AKH</span>
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
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-300 hover:to-sky-900 transition-all duration-300 block"
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
