import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AgenceTeam = () => {
  const sectionRef = useRef(null);

  const team = [
    {
      name: "Elias Vance",
      role: "Creative Director",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2564&auto=format&fit=crop",
    },
    {
      name: "Sarah Jenkins",
      role: "Lead Designer",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2564&auto=format&fit=crop",
    },
    {
      name: "Marcus Chen",
      role: "Head of Development",
      img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2564&auto=format&fit=crop",
    },
    {
      name: "Chloe Laurent",
      role: "Art Director",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop",
    },
  ];

  useGSAP(
    () => {
      // Staggered Scroll Reveal for Team Cards
      gsap.from(".team-card", {
        scrollTrigger: {
          trigger: ".team-grid",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        rotationX: 10,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-32 overflow-hidden"
    >
      {/* --- CUSTOM CSS FOR MARQUEES --- */}
      <style>
        {`
          @keyframes marquee-left {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0%); }
          }
        `}
      </style>

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>

      {/* 
        --- THE SURROUNDING INFO BANDS ---
        Band 1: Behind the cards (z-0), angled, moving left.
      */}
      <div className="absolute top-[20%] left-[-10%] w-[120%] -rotate-6 bg-blue-600/10 border-y border-blue-500/20 py-4 backdrop-blur-sm z-0 pointer-events-none">
        <div className="flex whitespace-nowrap animate-[marquee-left_30s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-4 text-4xl md:text-6xl font-black uppercase text-blue-500/20 tracking-tighter"
            >
              <span>Creative Minds</span>
              <span className="text-blue-400/40 text-2xl">✦</span>
              <span>Digital Pioneers</span>
              <span className="text-blue-400/40 text-2xl">✦</span>
              <span>Design Experts</span>
              <span className="text-blue-400/40 text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col items-center text-center mb-24 relative z-20">
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Crew
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl text-lg font-light">
            We are a collective of designers, developers, and strategists
            obsessed with crafting digital perfection.
          </p>
        </div>

        {/* --- TEAM GRID --- */}
        <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10">
          {team.map((member, index) => (
            <div
              key={index}
              // Add a slight vertical offset to alternating cards for an editorial look
              className={`team-card group relative rounded-2xl overflow-hidden aspect-[3/4] bg-[#111] cursor-pointer shadow-2xl ${
                index % 2 !== 0 ? "lg:mt-16" : ""
              }`}
            >
              {/* Image */}
              <img
                src={member.img}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

              {/* Text Info */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-400 text-sm font-medium uppercase tracking-widest">
                  {member.role}
                </p>

                {/* Social Reveal (Hidden by default, slides up on hover) */}
                <div className="flex gap-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    Twitter
                  </a>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    Dribbble
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 
        --- THE SURROUNDING INFO BANDS ---
        Band 2: In front of the cards (z-20), angled the opposite way, moving right.
      */}
      <div className="absolute bottom-0 md:bottom-8 left-[-10%] w-[120%] rotate-3 bg-[#050505]/80 border-y border-white/10 py-4 backdrop-blur-xl z-20 pointer-events-none shadow-2xl">
        <div className="flex whitespace-nowrap animate-[marquee-right_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 px-4 text-4xl md:text-6xl font-black uppercase text-white/80 tracking-tighter"
            >
              <span>Sixty-Seventh</span>
              <span className="text-white/20 text-2xl">✦</span>
              <span>Independent Agency</span>
              <span className="text-white/20 text-2xl">✦</span>
              <span>Est. 2024</span>
              <span className="text-white/20 text-2xl">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgenceTeam;
