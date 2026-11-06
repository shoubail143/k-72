import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Projecthero = () => {
  const heroRef = useRef(null);
  const jupiterRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // 1. Initial States
      gsap.set(".reveal-text", { yPercent: 110, opacity: 0 });
      gsap.set(".fade-in", { opacity: 0, y: 30 });
      gsap.set(".figma-element", { opacity: 0, scale: 0.8, y: 50 });

      // 2. Intro Animation
      tl.to(".reveal-text", {
        yPercent: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
      })
        .to(
          ".fade-in",
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8",
        )
        .to(
          ".figma-element",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: "elastic.out(1, 0.7)",
          },
          "-=1",
        );

      // 3. Infinite Idle Floating for Figma Elements
      gsap.utils.toArray(".figma-element").forEach((el, i) => {
        gsap.to(el, {
          y: "random(-10, 10)",
          x: "random(-10, 10)",
          rotation: "random(-2, 2)",
          duration: "random(3, 5)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });

      // 4. Mouse Parallax & 3D Tilt
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = clientX / window.innerWidth - 0.5;
        const yPos = clientY / window.innerHeight - 0.5;

        // Figma UI Parallax
        gsap.to(".figma-wrapper", {
          x: xPos * 40,
          y: yPos * 40,
          duration: 1.2,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Background Orbs Parallax (Moves opposite to create depth)
        gsap.to(".bg-glow-wrapper", {
          x: xPos * -60,
          y: yPos * -60,
          duration: 2,
          ease: "power2.out",
          overwrite: "auto",
        });

        // 3D Jupiter Tilt Effect
        gsap.to(jupiterRef.current, {
          rotationY: xPos * 30, // Max 15 degrees left/right
          rotationX: yPos * -30, // Max 15 degrees up/down
          duration: 1.5,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      heroRef.current.addEventListener("mousemove", handleMouseMove);

      return () => {
        heroRef.current?.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: heroRef },
  );

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col justify-center overflow-hidden pt-24 pb-20 md:pb-24 select-none"
    >
      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style>
        {`
          @keyframes pan-grid {
            0% { background-position: 0px 0px; }
            100% { background-position: 40px 40px; }
          }
          @keyframes float-orb {
            0%, 100% { transform: scale(1) translate(0px, 0px); opacity: 0.6; }
            50% { transform: scale(1.1) translate(20px, -20px); opacity: 0.8; }
          }
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          @keyframes spin-square {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
          }
          @keyframes orbit-reverse {
            0% { transform: rotate(360deg) translateX(280px) rotate(-360deg); }
            100% { transform: rotate(0deg) translateX(280px) rotate(0deg); }
          }
          /* New Idle Animations */
          @keyframes idle-float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes ring-spin {
            0% { transform: rotateX(75deg) rotateY(-15deg) rotateZ(0deg); }
            100% { transform: rotateX(75deg) rotateY(-15deg) rotateZ(360deg); }
          }
        `}
      </style>

      {/* --- BACKGROUND LAYER (z-0) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Moving Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] animate-[pan-grid_10s_linear_infinite]"></div>

        {/* "Squarey" Wireframe Designs */}
        <div className="absolute top-[20%] left-[10%] w-64 h-64 border border-white/5 animate-[spin-square_40s_linear_infinite]"></div>
        <div className="absolute bottom-[20%] left-[30%] w-32 h-32 border border-white/5 rotate-45 animate-[spin-square_30s_linear_infinite_reverse]"></div>
        <div className="absolute top-[10%] right-[40%] w-48 h-48 border border-white/5 rotate-12 animate-[spin-square_50s_linear_infinite]"></div>

        {/* Subtle Glows (Wrapped for parallax) */}
        <div className="bg-glow-wrapper absolute inset-0">
          <div className="absolute top-[10%] left-[0%] w-[50vw] h-[50vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[150px] animate-[float-orb_12s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-[0%] right-[0%] w-[60vw] h-[60vw] bg-orange-900/10 rounded-full mix-blend-screen filter blur-[150px] animate-[float-orb_15s_ease-in-out_infinite_reverse]"></div>
        </div>
      </div>

      {/* --- 3D JUPITER SYSTEM (z-10) --- */}
      <div
        className="absolute top-[45%] right-[-15%] md:right-[-5%] lg:right-[0%] -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] pointer-events-none z-10"
        style={{ perspective: "1200px" }}
      >
        {/* Idle Float Wrapper */}
        <div className="w-full h-full animate-[idle-float_6s_ease-in-out_infinite]">
          {/* jupiterRef is the 3D container that tilts with the mouse */}
          <div
            ref={jupiterRef}
            className="relative w-full h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Tilted Planetary Rings (Now spinning slowly in 3D space) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[700px] md:h-[900px] rounded-[100%] border-[2px] border-orange-200/20 animate-[ring-spin_60s_linear_infinite]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] md:w-[850px] h-[650px] md:h-[850px] rounded-[100%] border-[10px] border-orange-300/10 animate-[ring-spin_40s_linear_infinite_reverse]"></div>

            {/* The Gas Giant */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_80px_rgba(234,88,12,0.3)]"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#e8b495,#a44a3f)]"></div>

              {/* Atmospheric Bands */}
              <div className="absolute inset-0 bg-[repeating-linear-gradient(10deg,transparent,transparent_15px,rgba(80,40,20,0.4)_15px,rgba(80,40,20,0.4)_25px,rgba(255,255,255,0.1)_25px,rgba(255,255,255,0.1)_35px)] opacity-80"></div>
              <div className="absolute inset-0 bg-[repeating-linear-gradient(-5deg,transparent,transparent_40px,rgba(60,20,10,0.3)_40px,rgba(60,20,10,0.3)_60px)] opacity-80"></div>

              {/* Great Red Spot */}
              <div className="absolute top-[60%] left-[20%] w-16 h-10 bg-[#7a2e25] rounded-[100%] rotate-12 opacity-90 blur-[2px]"></div>

              {/* 3D Shadow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_-50px_-30px_100px_rgba(0,0,0,0.9),inset_20px_20px_60px_rgba(255,255,255,0.2)]"></div>
            </div>

            {/* Moons */}
            <div
              className="absolute top-1/2 left-1/2 -mt-3 -ml-3 w-6 h-6 bg-gray-300 rounded-full shadow-[0_0_15px_#fff] animate-[orbit_15s_linear_infinite]"
              style={{ transform: "translateZ(80px)" }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -mt-2 -ml-2 w-4 h-4 bg-orange-200 rounded-full shadow-[0_0_10px_#fbd38d] animate-[orbit-reverse_22s_linear_infinite]"
              style={{ transform: "translateZ(-30px)" }}
            ></div>
          </div>
        </div>
      </div>

      {/* --- FLOATING FIGMA UI (z-20) --- */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block z-20">
        <div className="figma-wrapper absolute inset-0">
          {/* Cursor */}
          <div className="figma-element absolute top-[30%] left-[8%] flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="drop-shadow-lg"
            >
              <path
                d="M5.5 3.5L18.5 11L12.5 12.5L9 18.5L5.5 3.5Z"
                fill="#FF4A4A"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Frame Box */}
          <div className="figma-element absolute bottom-[40%] right-[15%] w-28 h-36 border-2 border-blue-500/40 rounded-lg relative">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-sm shadow-sm"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-sm shadow-sm"></div>
            <div className="absolute -top-7 left-0 text-[10px] text-blue-400 font-mono tracking-wider">
              Frame 1
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN TEXT CONTENT (z-30) --- */}
      <div className="relative z-30 px-6 md:px-12 lg:px-24 max-w-[90rem] mx-auto w-full">
        <div className="overflow-hidden mb-4 md:mb-6 pb-1">
          <p className="reveal-text text-xs md:text-sm font-medium tracking-[0.3em] text-gray-400 uppercase">
            Selected Works — 2024
          </p>
        </div>

        {/* Added selection:bg-transparent and select-none to prevent the blue highlight box */}
        <h1 className="text-[15vw] md:text-[11vw] leading-[0.85] font-black tracking-tighter uppercase flex flex-col drop-shadow-2xl select-none selection:bg-transparent">
          <div className="overflow-hidden pb-2">
            <span className="reveal-text block origin-bottom">The</span>
          </div>
          <div className="overflow-hidden pb-2">
            <span className="reveal-text block origin-bottom text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400 selection:text-gray-400">
              Archive
            </span>
          </div>
        </h1>

        <div className="mt-6 md:mt-10 max-w-sm">
          <p className="fade-in text-base md:text-xl font-light text-gray-300 leading-relaxed drop-shadow-lg select-none">
            A curated collection of digital experiences, brand identities, and
            creative experiments.
          </p>
        </div>
      </div>

      {/* --- SLEEK SINGLE-LINE MARQUEE (z-40) --- */}
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 py-3 bg-[#050505]/90 backdrop-blur-xl z-40 overflow-hidden flex items-center select-none">
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-max animate-[marquee_25s_linear_infinite]">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-8 md:gap-12 px-4 text-sm md:text-base font-medium tracking-widest uppercase text-gray-500"
            >
              <span>Web Design</span>
              <span className="text-orange-500 text-xs">✦</span>
              <span>Branding</span>
              <span className="text-blue-500 text-xs">✦</span>
              <span>Development</span>
              <span className="text-orange-500 text-xs">✦</span>
              <span>Art Direction</span>
              <span className="text-blue-500 text-xs">✦</span>
              <span>Motion</span>
              <span className="text-orange-500 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projecthero;
