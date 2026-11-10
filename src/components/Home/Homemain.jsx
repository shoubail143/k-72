import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

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
  {
    id: 4,
    title: "The Onyx Loft",
    type: "Architecture",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Oasis Spa",
    type: "Commercial",
    img: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "The Glass House",
    type: "Residential",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Zen Workspace",
    type: "Office",
    img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Aura Lounge",
    type: "Hospitality",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function HomeMain() {
  const [activeIndex, setActiveIndex] = useState(3);
  const wheelTimeout = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), {
    stiffness: 60,
    damping: 20,
  });
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), {
    stiffness: 60,
    damping: 20,
  });

  const handleNext = () =>
    setActiveIndex((prev) => (prev + 1) % clients.length);
  const handlePrev = () =>
    setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);

  const handleWheel = (e) => {
    if (wheelTimeout.current) return;
    if (e.deltaY > 0) handleNext();
    if (e.deltaY < 0) handlePrev();
    wheelTimeout.current = setTimeout(() => {
      wheelTimeout.current = null;
    }, 150);
  };

  const smoothTransition = {
    type: "tween",
    ease: [0.25, 1, 0.5, 1],
    duration: 0.8,
  };

  return (
    <div
      className="min-h-screen bg-[#F9F5F0] text-[#3A1F24] overflow-hidden relative font-sans selection:bg-[#7A202F]/20 pt-16 pb-10 flex flex-col justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* BACKGROUND SHAPES */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#7A202F]/10 to-[#A42E41]/5 rounded-full blur-[80px] pointer-events-none will-change-transform"
      />
      <motion.div
        style={{ x: bgX, y: bgY }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-tl from-[#D4AF37]/10 to-[#7A202F]/5 rounded-full blur-[80px] pointer-events-none will-change-transform"
      />

      {/* HEADER (Reduced bottom padding to pull cards up) */}
      <div className="relative z-40 text-center pb-4 px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#7A202F]/10 text-[#7A202F] text-xs font-bold tracking-widest uppercase mb-4 border border-[#7A202F]/20 shadow-sm">
            Portfolio Showcase
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl tracking-tight flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
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

      {/* --- CURVED 3D SCROLL GALLERY --- */}
      <div
        className="relative z-40 w-full h-[500px] md:h-[600px] flex items-center justify-center perspective-[1500px] cursor-grab active:cursor-grabbing mt-0"
        onWheel={handleWheel}
      >
        <motion.div
          className="relative flex items-center justify-center w-full max-w-[1400px] h-full"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, { offset }) => {
            if (offset.x < -40) handleNext();
            if (offset.x > 40) handlePrev();
          }}
        >
          {clients.map((client, index) => {
            let offset = index - activeIndex;
            if (offset < -clients.length / 2) offset += clients.length;
            if (offset > clients.length / 2) offset -= clients.length;

            const absOffset = Math.abs(offset);

            // Adjusted X offset for wider cards
            const xOffset = offset * 210;
            // Keep the deep curve
            const yOffset = Math.pow(absOffset, 2) * 26;
            const rotateZ = offset * 5;
            const rotateY = offset * -20;
            const scale = 1 - absOffset * 0.1;
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.3;
            const zIndex = 50 - absOffset;

            return (
              <motion.div
                key={client.id}
                onClick={() => setActiveIndex(index)}
                animate={{
                  x: xOffset,
                  y: yOffset,
                  rotateZ,
                  rotateY,
                  scale,
                  zIndex,
                  opacity,
                }}
                transition={smoothTransition}
                // INCREASED CARD DIMENSIONS
                className="absolute w-[260px] md:w-[340px] h-[380px] md:h-[480px] cursor-pointer rounded-[2.5rem] overflow-hidden shadow-xl border border-white/40 bg-white will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <img
                  src={client.img}
                  alt={client.title}
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  loading="lazy"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t ${offset === 0 ? "from-[#2A0B10]/95 via-[#2A0B10]/30" : "from-[#2A0B10]/80 via-[#2A0B10]/60"} to-transparent opacity-90 transition-opacity duration-500`}
                />

                {/* Adjusted padding and text sizes to match bigger cards */}
                <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-[#F9F5F0] pointer-events-none">
                  <motion.div
                    animate={{
                      y: offset === 0 ? 0 : 10,
                      opacity: offset === 0 ? 1 : 0.5,
                    }}
                    transition={smoothTransition}
                  >
                    <span className="text-xs font-bold tracking-widest uppercase text-[#D4AF37] mb-2 block">
                      {client.type}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-bold mb-2">
                      {client.title}
                    </h3>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* --- SCROLL / NAVIGATION CONTROLS --- */}
      {/* --- PREMIUM INTERACTIVE CTA --- */}
      <div className="relative z-50 flex flex-col items-center gap-6 mt-8">
        <motion.div
          // REMOVED onClick FROM HERE
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          whileHover="hover"
          // REMOVED whileTap FROM HERE
          className="group relative cursor-default" // Changed to cursor-default
        >
          {/* Main Pill Container with rich shadow */}
          <motion.div
            variants={{
              hover: {
                scale: 1.03,
                boxShadow: "0 20px 40px -10px rgba(122,32,47,0.2)",
              },
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl rounded-full border border-white shadow-[0_10px_30px_-10px_rgba(122,32,47,0.15)] overflow-hidden"
          >
            {/* Shimmering Light Effect passing through on hover */}
            <motion.div
              variants={{
                hover: { x: ["-150%", "150%"] },
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-20deg] pointer-events-none"
            />

            <span className="text-sm font-bold tracking-[0.15em] uppercase text-[#8E6B73] relative z-10">
              Scroll, Drag or
            </span>

            {/* The Highlighted Next Button inside */}
            <motion.div
              onClick={handleNext} // ADDED onClick HERE
              whileTap={{ scale: 0.92 }} // ADDED Tap effect specifically for the button
              variants={{
                hover: { scale: 1.05, backgroundColor: "#5E1914" },
              }}
              className="relative z-10 flex items-center gap-2 bg-[#7A202F] text-[#F9F5F0] px-5 py-2 rounded-full shadow-lg shadow-[#7A202F]/30 transition-colors duration-300 cursor-pointer" // ADDED cursor-pointer HERE
            >
              <span className="text-xs font-black tracking-widest uppercase mt-[1px]">
                Next
              </span>

              {/* Bouncing Chevron */}
              <motion.svg
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </motion.div>

            <span className="text-sm font-bold tracking-[0.15em] uppercase text-[#8E6B73] relative z-10">
              to explore
            </span>
          </motion.div>

          {/* Subtle Glow behind the whole button */}
          <div className="absolute inset-0 bg-[#7A202F]/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>
    </div>
  );
}
