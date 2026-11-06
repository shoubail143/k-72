import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Homemain = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // High-quality, reliable 4K Unsplash images matching the categories
  const clients = [
    {
      name: "Badeloft",
      category: "Luxury Sinks & Bathtubs",
      img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop",
    },
    {
      name: "By Royale",
      category: "Mid-Century Clocks & Lamps",
      img: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?q=80&w=2000&auto=format&fit=crop",
    },
    {
      name: "ErgoHide",
      category: "Ergonomic Desks",
      img: "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=2000&auto=format&fit=crop",
    },
    {
      name: "Laatulakki",
      category: "Graduation Caps",
      img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop",
    },
  ];

  // 3D Magnetic Tilt & Parallax (Desktop Only)
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cards = cardsRef.current;

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle 5 degree tilt
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      gsap.to(card, {
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });

      // Parallax the inner image
      const img = card.querySelector(".client-img");
      gsap.to(img, {
        x: (centerX - x) * 0.05,
        y: (centerY - y) * 0.05,
        scale: 1.05, // slight zoom on hover
        duration: 0.5,
      });
    };

    const handleMouseLeave = (e) => {
      const card = e.currentTarget;
      const img = card.querySelector(".client-img");

      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        duration: 0.8,
        ease: "power3.out",
      });
      gsap.to(img, { x: 0, y: 0, scale: 1, duration: 0.8, ease: "power3.out" });
    };

    cards.forEach((card) => {
      if (!card) return;
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach((card) => {
        if (!card) return;
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-24 md:py-32 overflow-hidden"
    >
      {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>

        {/* Glowing Ambient Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[150px] animate-[float_10s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[150px] animate-[float_12s_ease-in-out_infinite_reverse]"></div>
      </div>

      {/* --- CUSTOM CSS FOR INFINITE MARQUEE --- */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-30px); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: scroll-left 40s linear infinite;
          }
          /* Pause on hover */
          .marquee-container:hover .marquee-track {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Header */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 mb-16 md:mb-24">
        <div className="flex flex-col items-center text-center">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-500 mb-4">
            Portfolio
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
            Featured{" "}
            <span className="font-serif italic font-light text-gray-500">
              Clients
            </span>
          </h2>
        </div>
      </div>

      {/* --- INFINITE MARQUEE CONTAINER --- */}
      <div className="relative z-10 marquee-container w-full overflow-hidden">
        {/* Gradient Fades for smooth entry/exit (Now blending into the dark background) */}
        <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

        {/* The Moving Track */}
        <div className="marquee-track gap-6 md:gap-8 px-4 py-8">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={index}
              ref={(el) => {
                if (index < 4) cardsRef.current[index] = el;
              }}
              // Card sizing: taller, slightly wider, full dark glass background
              className="group relative w-[75vw] sm:w-[45vw] md:w-[350px] lg:w-[420px] aspect-[3/4] bg-[#111] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl cursor-pointer flex-shrink-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Full-Card Image */}
              <img
                src={client.img}
                alt={client.name}
                // object-cover makes the image fill the whole card. scale up for hover effect.
                className="client-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
              />

              {/* Subtle Dark Overlay for Readability (Only at the bottom) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent opacity-90 transition-opacity duration-500 z-10"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {client.name}
                </h3>
                <p className="text-gray-400 text-sm md:text-base font-medium">
                  {client.category}
                </p>
              </div>

              {/* Thin Border Glow on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-[2rem] transition-colors duration-500 z-30 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Homemain;
