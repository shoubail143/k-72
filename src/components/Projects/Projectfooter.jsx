import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// --- MAGNETIC BUTTON COMPONENT ---
const MagneticButton = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 30);
    y.set(yPct * 30);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="relative z-20 w-full sm:w-auto"
    >
      <a
        ref={ref}
        href="/contact"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-6 md:px-8 py-4 md:py-5 bg-white text-black rounded-full overflow-hidden transition-all duration-300 ease-out active:scale-95 hover:shadow-[0_0_40px_rgba(251,191,36,0.3)]"
      >
        <span className="text-xs sm:text-sm md:text-base font-bold tracking-tight whitespace-nowrap z-10 transition-colors duration-300 group-hover:text-black">
          shoubaillakhtar143@gmail.com
        </span>
        <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <ArrowUpRight size={18} strokeWidth={2.5} className="md:w-5 md:h-5" />
        </span>

        {/* Hover Fill */}
        <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"></div>
      </a>
    </motion.div>
  );
};

// --- MAIN FOOTER COMPONENT ---
export default function Projectfooter() {
  const slideUp = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    /* 
      CHANGED: Added 'flex flex-col justify-between' and 'min-h-screen'
      This pushes the copyright to the absolute bottom and prevents overlap.
    */
    <footer className="relative w-full bg-[#050505] pt-24 pb-6 overflow-hidden flex flex-col justify-between min-h-screen">
      {/* =========================================
          SUPERCHARGED BACKGROUND ANIMATIONS
      ========================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Giant Amber Orb floating around */}
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
            opacity: [0.15, 0.25, 0.15, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-amber-500 rounded-full blur-[120px]"
        />

        {/* Smaller Orange Orb floating opposite */}
        <motion.div
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 80, -40, 0],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.1, 0.2, 0.1, 0.1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-10 right-10 w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-orange-600 rounded-full blur-[100px]"
        />

        {/* Fading Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      {/* =========================================
          MAIN CONTENT (Centered)
      ========================================= */}
      <div className="relative z-10 w-full px-4 md:px-8 flex flex-col items-center justify-center text-center my-auto pt-10">
        <div className="flex flex-col items-center justify-center mb-8 md:mb-12 w-full">
          {/* Line 1: LET'S */}
          <div className="overflow-hidden pb-1 md:pb-2 w-full flex justify-center pr-4 md:pr-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideUp}
              className="text-[18vw] sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] text-white whitespace-nowrap"
            >
              LET'S
            </motion.h2>
          </div>

          {/* Line 2: TALK! (Outline) */}
          <div className="overflow-hidden pb-2 md:pb-4 w-full flex justify-center pr-4 md:pr-8">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={slideUp}
              transition={{
                delay: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              }}
              className="text-[18vw] sm:text-8xl md:text-9xl lg:text-[11rem] font-black uppercase tracking-tighter leading-[0.8] italic text-transparent [-webkit-text-stroke:1.5px_#f59e0b] md:[-webkit-text-stroke:3px_#f59e0b] whitespace-nowrap"
            >
              TALK!
            </motion.h2>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-xl text-neutral-400 text-sm md:text-lg leading-relaxed mb-10 md:mb-14 px-2"
        >
          Have a project in mind? We're ready to bring your vision to life. Drop
          us a line and let's build something extraordinary together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-full max-w-md flex justify-center"
        >
          <MagneticButton />
        </motion.div>
      </div>

      {/* =========================================
          BOTTOM COPYRIGHT (Now in normal flow, pushed to bottom)
      ========================================= */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12 pt-12 pb-4 text-neutral-500 text-[10px] md:text-xs font-mono uppercase tracking-widest gap-4 md:gap-0"
      >
        <p>© {new Date().getFullYear()} Ahence Agency.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-amber-400 transition-colors">
            Twitter
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">
            LinkedIn
          </a>
          <a href="#" className="hover:text-amber-400 transition-colors">
            Instagram
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
