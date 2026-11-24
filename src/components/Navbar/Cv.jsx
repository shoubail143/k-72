import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Code2, Box, Database } from "lucide-react";
import Cvmain from "./Cvmain";
import Footer from "./Cvfooter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Cv() {
  const containerRef = useRef(null);

  // Parallax for scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // --- 3D TILT LOGIC (DESKTOP ONLY) ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return; // Only on Desktop
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#0a0406] overflow-hidden flex flex-col justify-start items-center font-sans selection:bg-[#D4AF37] selection:text-[#0a0406]"
    >
      {/* =========================================
          1. PREMIUM BACKGROUND (Optimized)
          ========================================= */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Static radial gradients to prevent lag */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#3A121A]/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent" />

        {/* Subtle animated pulse overlay */}
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[#3A121A]/20 mix-blend-overlay"
        />

        {/* Cinematic Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(#E8D8C8 1px, transparent 1px), linear-gradient(90deg, #E8D8C8 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* =========================================
          2. MAIN RESPONSIVE GRID LAYOUT
          ========================================= */}
      {/* Using CSS Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="relative z-10 w-full max-w-[1500px] px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-center min-h-screen py-24 lg:py-0">
        {/* --- LEFT COLUMN: TEXT & BIO --- */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
          className="flex flex-col items-start order-2 lg:order-1"
        >
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-7xl text-[#E8D8C8] leading-none mb-6"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            SHOUBAIL!
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-[#D4AF37] tracking-[0.2em] text-[10px] md:text-xs uppercase mb-6 font-semibold flex items-center gap-3"
          >
            <span className="w-8 h-[1px] bg-[#D4AF37]/50 inline-block"></span>A
            Designer & Developer
          </motion.p>

          {/* Mobile Interactive Text Blocks (Tap to expand/highlight) */}
          <div className="flex flex-col gap-4 text-[#E8D8C8]/70 text-xs md:text-sm leading-relaxed font-light">
            {[
              "My journey began in the world of design, obsessing over pixel-perfect layouts and the emotional impact of a beautiful interface. I loved making things look good, but static designs weren't enough.",
              "Driven by curiosity, I dove headfirst into full-stack development. I wanted to bring designs to life—not just functionally, but with buttery-smooth animations and interactive 3D experiences.",
              "Today, I operate at the intersection of art and code. I engineer immersive digital experiences that tell your story, backed by robust, scalable architecture.",
            ].map((text, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                // Mobile Tap Animation: Scales down slightly and glows
                whileTap={{
                  scale: 0.98,
                  backgroundColor: "rgba(212, 175, 55, 0.05)",
                }}
                className="p-3 -ml-3 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-[#D4AF37]/20"
              >
                {text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* --- CENTER COLUMN: THE 3D IMAGE FRAME --- */}
        <div
          className="flex justify-center items-center order-1 lg:order-2 perspective-[1500px] w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{
              y: yImage,
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            // Mobile Tap Animation: Taps the image and tilts it
            whileTap={{ scale: 0.95, rotate: -2 }}
            className="relative group cursor-pointer lg:cursor-default"
          >
            {/* The Premium Frame */}
            <div className="relative p-3 md:p-4 bg-[#14080B] border border-white/10 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] group-hover:shadow-[0_30px_80px_rgba(212,175,55,0.15)] transition-shadow duration-500">
              {/* Image (Lazy Loaded) */}
              <img
                src="/shoubail.webp"
                alt="Shoubail Akhtar"
                loading="lazy"
                className="w-[280px] md:w-[350px] lg:w-[400px] h-auto object-cover rounded-lg transition-all duration-700 group-hover:scale-[1.02]"
                style={{ transform: "translateZ(40px)" }} // Pops out in 3D
              />

              {/* Golden Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37] -translate-x-2 -translate-y-2 rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37] translate-x-2 -translate-y-2 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37] -translate-x-2 translate-y-2 rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37] translate-x-2 translate-y-2 rounded-br-sm" />

              {/* Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-[#0a0406] px-4 py-1 border border-white/10 rounded-full text-[9px] md:text-[10px] tracking-widest text-[#E8D8C8] whitespace-nowrap shadow-lg">
                EST. 2024
              </div>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: SKILLS & SCRIPT --- */}
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.1, delayChildren: 0.5 }}
          className="flex flex-col items-start md:items-center lg:items-end order-3 w-full"
        >
          {/* Script text (Hidden on mobile to save space, visible on tablet+) */}
          <motion.p
            variants={fadeUp}
            className="hidden md:block text-[#D4AF37] text-3xl lg:text-4xl mb-8 lg:mb-12 text-center lg:text-right"
            style={{
              fontFamily: "Great Vibes, cursive",
              transform: "rotate(-5deg)",
            }}
          >
            Code that <br /> Tells Your Story
          </motion.p>

          <ul className="flex flex-col gap-3 md:gap-4 w-full md:w-auto">
            {[
              { icon: Box, text: "3D WebGL / Three.js" },
              { icon: Code2, text: "React & Next.js" },
              { icon: Database, text: "Node.js & Databases" },
            ].map((skill, i) => (
              <motion.li
                key={i}
                variants={fadeUp}
                // Mobile Tap Animation for Skills
                whileTap={{ scale: 0.95, x: 5 }}
                className="flex items-center justify-between lg:justify-end gap-3 p-3 md:p-2 bg-white/5 lg:bg-transparent rounded-lg lg:rounded-none border border-white/5 lg:border-none cursor-pointer group hover:bg-white/10 lg:hover:bg-transparent transition-colors"
              >
                <span className="text-[#E8D8C8]/80 text-xs md:text-sm tracking-[0.15em] uppercase group-hover:text-[#D4AF37] transition-colors">
                  {skill.text}
                </span>
                <skill.icon
                  size={16}
                  className="text-[#D4AF37] group-hover:rotate-12 group-hover:scale-110 transition-transform"
                />
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      <Cvmain />
      <Footer />
    </div>
  );
}
