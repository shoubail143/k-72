import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Projectmain = () => {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  // 8 High-quality dummy projects
  const projects = [
    {
      title: "Shelton",
      category: "Bièrerie Shelton",
      year: "2024",
      img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
    },
    {
      title: "Aether UI",
      category: "Web Design",
      year: "2023",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Vortex Studio",
      category: "Brand Identity",
      year: "2024",
      img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Lumina",
      category: "Art Direction",
      year: "2023",
      img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2664&auto=format&fit=crop",
    },
    {
      title: "Chronos",
      category: "Motion Design",
      year: "2024",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Echo",
      category: "Sound Design",
      year: "2022",
      img: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2574&auto=format&fit=crop",
    },
    {
      title: "Prism",
      category: "3D Rendering",
      year: "2024",
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2670&auto=format&fit=crop",
    },
    {
      title: "Solstice",
      category: "Campaign",
      year: "2023",
      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2670&auto=format&fit=crop",
    },
  ];

  // 1. THE CUSTOM CURSOR FOLLOWER LOGIC
  useEffect(() => {
    // Disable on mobile/touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;

    // GSAP quickTo for buttery smooth mouse tracking
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  const handleMouseEnter = () => {
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  // 2. SCROLL REVEAL ANIMATIONS
  useGSAP(
    () => {
      gsap.utils.toArray(".project-item").forEach((item) => {
        // Card Reveal (Starts higher up, so less black space)
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: "top 90%", // Triggers earlier
          },
          y: 80, // Reduced from 150 to make it snappier
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: "power3.out",
        });

        // Image Parallax
        const img = item.querySelector(".parallax-img");
        gsap.fromTo(
          img,
          { scale: 1.15, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-20 md:py-32 px-5 md:px-12 lg:px-24 overflow-hidden cursor-none"
    >
      {/* --- THE X-RAY CAMERA VIEWFINDER CURSOR --- */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 opacity-0 scale-0 hidden md:flex items-center justify-center mix-blend-difference"
      >
        <style>
          {`
    /* Shifts the background color inside the lens */
    @keyframes xray-shift {
      0%, 100% { background-color: rgba(34, 211, 238, 0.2); } /* Cyan */
      33% { background-color: rgba(168, 85, 247, 0.2); } /* Purple */
      66% { background-color: rgba(239, 68, 68, 0.2); } /* Red */
    }

    /* The horizontal scanner beam moving up and down */
    @keyframes scan-line {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
  `}
        </style>
        {/* 1. The Inner X-Ray Lens (Color Shifting) */}
        <div className="absolute inset-1 bg-cyan-500/30 backdrop-invert backdrop-brightness-125 backdrop-contrast-150 animate-[xray-shift_4s_ease-in-out_infinite] rounded-sm"></div>

        {/* 2. The Scanner Line (Moving up and down) */}
        <div className="absolute left-0 w-full h-[2px] bg-cyan-300 shadow-[0_0_10px_#22d3ee] animate-[scan-line_2s_linear_infinite]"></div>

        {/* 3. The Camera Corner Brackets */}
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white z-10"></div>
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white z-10"></div>
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white z-10"></div>
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white z-10"></div>

        {/* 4. Center Text & Icon (Z-index above the x-ray) */}
        <span className="relative z-20 text-white flex items-center gap-2 mix-blend-normal">
          <span className="font-serif italic text-2xl tracking-tight drop-shadow-md">
            View
          </span>
          <svg
            className="w-5 h-5 animate-[spin_4s_linear_infinite] drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </span>
      </div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 border-b border-white/10 pb-8">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">
            The <br className="md:hidden" /> Archive
          </h2>
          <p className="text-gray-400 font-light mt-4 md:mt-0 max-w-sm text-base md:text-lg">
            Explore our complete portfolio of digital experiences and brand
            identities.
          </p>
        </div>

        {/* --- MASSIVE EDITORIAL LIST --- */}
        {/* Reduced the gap from gap-40 to gap-24 so it feels more connected */}
        <div className="flex flex-col gap-20 md:gap-32">
          {projects.map((project, index) => (
            <div
              key={index}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="project-item group cursor-none flex flex-col"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden bg-[#111] mb-6">
                <img
                  src={project.img}
                  alt={project.title}
                  className="parallax-img absolute inset-0 w-full h-[120%] -top-[10%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />

                {/* Dark overlay on hover to make text pop */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Text Details */}
              <div className="flex justify-between items-start border-t border-white/20 pt-4">
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base mt-1 uppercase tracking-wider">
                    {project.category}
                  </p>
                </div>
                <span className="text-gray-500 font-mono text-sm md:text-base">
                  {project.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projectmain;
