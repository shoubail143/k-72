import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// --- DATA ---
const clients = [
  {
    id: 1,
    title: "Laatulakki",
    type: "Commercial",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern Bath",
    type: "Residential",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Solace Haven",
    type: "Interior",
    img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function HomeMain() {
  const [activeIndex, setActiveIndex] = useState(1);

  // --- BACKGROUND PARALLAX ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-50, 50]), {
    stiffness: 100,
    damping: 30,
  });
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-50, 50]), {
    stiffness: 100,
    damping: 30,
  });
  const bgXReverse = useSpring(useTransform(mouseX, [-0.5, 0.5], [50, -50]), {
    stiffness: 100,
    damping: 30,
  });

  return (
    // BACKGROUND: Soft Cream (#F9F5F0)
    <div
      className="min-h-screen bg-[#F9F5F0] text-[#3A1F24] overflow-hidden relative font-sans selection:bg-[#7A202F]/20"
      onMouseMove={handleMouseMove}
    >
      {/* --- BACKGROUND SHAPES (Burgundy & Gold Parallax) --- */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-br from-[#7A202F]/15 to-[#A42E41]/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ x: bgXReverse, y: bgY }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-tl from-[#D4AF37]/10 to-[#7A202F]/10 rounded-full blur-[100px] pointer-events-none"
      />

      {/* --- HEADER --- */}
      {/* Adjusted top padding since Navbar is removed */}
      <div className="relative z-40 text-center pt-24 pb-12 px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge: Soft burgundy tint */}
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#7A202F]/10 text-[#7A202F] text-xs font-bold tracking-widest uppercase mb-6 border border-[#7A202F]/20">
            Portfolio Showcase
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-tight flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            {/* Typography: Muted Burgundy for italic, Deep Espresso for bold */}
            <span className="font-serif italic text-[#8E6B73] font-light">
              Our
            </span>
            <span className="font-black text-[#3A1F24]">Featured</span>
            <span className="font-serif italic text-[#8E6B73] font-light">
              Clients
            </span>
          </h1>
        </motion.div>
      </div>

      {/* --- 3D FANNING GALLERY --- */}
      <div className="relative z-40 flex items-center justify-center h-[550px] md:h-[650px] mt-10 perspective-[1500px]">
        <div className="flex items-center justify-center w-full max-w-[1200px]">
          {clients.map((client, index) => {
            const isActive = index === activeIndex;
            const isLeft = index < activeIndex;
            const isRight = index > activeIndex;

            // 3D Positioning Logic (Unchanged)
            let xOffset = 0;
            let rotateY = 0;
            let scale = 1;
            let zIndex = 10;
            let opacity = 1;

            if (isActive) {
              xOffset = 0;
              rotateY = 0;
              scale = 1.05;
              zIndex = 30;
            } else if (isLeft) {
              xOffset = -250;
              rotateY = 25;
              scale = 0.85;
              zIndex = 20 - index;
              opacity = 0.7;
            } else if (isRight) {
              xOffset = 250;
              rotateY = -25;
              scale = 0.85;
              zIndex = 20 - index;
              opacity = 0.7;
            }

            return (
              <motion.div
                key={client.id}
                onHoverStart={() => setActiveIndex(index)}
                animate={{ x: xOffset, rotateY, scale, zIndex, opacity }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute w-[300px] md:w-[400px] h-[450px] md:h-[550px] cursor-pointer rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(58,31,36,0.3)] border border-white/40 bg-white"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.img
                  src={client.img}
                  alt={client.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.7 }}
                />

                {/* Overlay: Using a rich burgundy/plum gradient instead of harsh black */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${isActive ? "from-[#2A0B10]/95 via-[#2A0B10]/30" : "from-[#2A0B10]/80 via-[#2A0B10]/50"} to-transparent opacity-90 transition-opacity duration-500`}
                />

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-[#F9F5F0]">
                  <motion.div
                    animate={{
                      y: isActive ? 0 : 20,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Accent Text: Muted Gold/Burgundy */}
                    <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-2 block">
                      {client.type}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                      {client.title}
                    </h3>

                    <div
                      className={`flex items-center gap-3 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                    >
                      {/* Button: Burgundy background, cream text */}
                      <div className="w-10 h-10 rounded-full bg-[#7A202F] text-[#F9F5F0] flex items-center justify-center hover:bg-[#5E1914] hover:scale-110 transition-all shadow-lg">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium tracking-wide text-[#F9F5F0]/90">
                        Explore Project
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- BOTTOM HINT --- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-0 w-full flex justify-center z-50 pointer-events-none"
      ></motion.div>
    </div>
  );
}
