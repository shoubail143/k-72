import { useMemo, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Layout, Terminal, Sparkles } from "lucide-react";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// --- INTERACTIVE CARD COMPONENT (Desktop Hover & Mobile Tap) ---
const InteractiveCard = ({ icon: Icon, title, subtitle, desc, color }) => {
  const cardRef = useRef(null);

  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return; // Disable tilt on mobile
    const rect = cardRef.current.getBoundingClientRect();
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
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      // Hover Animation (Desktop) & Tap Animation (Mobile)
      whileHover={{ y: -10, scale: 1.02 }}
      whileTap={{ scale: 0.95, backgroundColor: "rgba(255,255,255,0.08)" }}
      className="relative group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md cursor-pointer transition-colors duration-300 hover:border-[#D4AF37]/40 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
    >
      <div
        className="mb-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300"
        style={{ transform: "translateZ(30px)" }}
      >
        <Icon size={24} className={color} />
      </div>

      <h3
        className="text-[#E8D8C8] text-xl font-semibold mb-2 font-serif"
        style={{ transform: "translateZ(20px)" }}
      >
        {title}
      </h3>
      <p
        className="text-[#D4AF37] text-xs uppercase tracking-widest mb-4"
        style={{ transform: "translateZ(15px)" }}
      >
        {subtitle}
      </p>
      <p
        className="text-[#E8D8C8]/60 text-sm leading-relaxed font-light"
        style={{ transform: "translateZ(10px)" }}
      >
        {desc}
      </p>
    </motion.div>
  );
};

export default function Cvmain() {
  const sectionRef = useRef(null);
  const particles = useMemo(() => {
    const seededRandom = (seed) => {
      const value = Math.sin(seed * 999) * 10000;
      return value - Math.floor(value);
    };

    return Array.from({ length: 20 }, (_, i) => {
      return {
        x: seededRandom(i + 1) * (typeof window === "undefined" ? 1200 : window.innerWidth),
        y: seededRandom(i + 101) * (typeof window === "undefined" ? 800 : window.innerHeight),
        opacity: seededRandom(i + 201) * 0.5 + 0.1,
        drift: seededRandom(i + 301) * -200 - 100,
        duration: seededRandom(i + 401) * 10 + 10,
      };
    });
  }, []);

  // Parallax effect for the background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0a0406] overflow-hidden py-24 md:py-32 flex flex-col items-center"
    >
      {/* =========================================
          1. HYPER-REALISTIC ANIMATED BACKGROUND
          ========================================= */}
      <motion.div
        style={{ y: yBg }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Deep Red Core Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#3A121A] rounded-full blur-[150px] opacity-40 mix-blend-screen" />

        {/* Floating Gold Dust Particles (CSS/SVG based for performance) */}
        <div className="absolute inset-0 opacity-30">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full"
              initial={{
                x: particle.x,
                y: particle.y,
                opacity: particle.opacity,
              }}
              animate={{
                y: [null, particle.drift],
                opacity: [null, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Subtle Tech Grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#E8D8C8 1px, transparent 1px), linear-gradient(90deg, #E8D8C8 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>

      {/* =========================================
          2. MAIN CONTENT (Responsive Layout)
          ========================================= */}
      <div className="relative z-10 w-full max-w-[1200px] px-6 md:px-12 flex flex-col items-center text-center">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-3xl mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-12 h-[1px] bg-[#D4AF37]/50"></span>
            <span className="text-[#D4AF37] tracking-[0.3em] uppercase text-xs font-semibold">
              The Philosophy
            </span>
            <span className="w-12 h-[1px] bg-[#D4AF37]/50"></span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-6xl text-[#E8D8C8] leading-tight mb-6 font-serif"
          >
            Where <span className="text-[#D4AF37] italic">Art</span> Meets{" "}
            <br className="hidden md:block" />{" "}
            <span className="text-[#D4AF37] italic">Architecture.</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-[#E8D8C8]/60 text-base md:text-lg leading-relaxed font-light"
          >
            I don't just build websites; I engineer digital ecosystems. By
            blending the visual elegance of a designer with the structural logic
            of a full-stack developer, I create experiences that are as robust
            as they are beautiful.
          </motion.p>
        </motion.div>

        {/* Interactive Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          <InteractiveCard
            icon={Layout}
            title="The Design"
            subtitle="UI/UX & Motion"
            desc="Starting with pixel-perfect layouts and emotional interfaces, I map out user journeys that feel intuitive, luxurious, and visually stunning across all devices."
            color="text-[#D4AF37]"
          />
          <InteractiveCard
            icon={Terminal}
            title="The Code"
            subtitle="Full-Stack Dev"
            desc="Backed by clean, scalable architecture. From React frontends to Node.js backends, I ensure lightning-fast performance and seamless database integration."
            color="text-[#E8D8C8]"
          />
          <InteractiveCard
            icon={Sparkles}
            title="The 3D"
            subtitle="Immersive Tech"
            desc="Pushing the boundaries of the web using Three.js and WebGL. I integrate buttery-smooth 3D animations that captivate users and elevate your brand."
            color="text-[#3A121A] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
          />
        </motion.div>

        {/* Bottom Paragraph / Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mt-24 max-w-2xl text-left md:text-center"
        >
          <motion.p
            variants={itemVariants}
            className="text-[#E8D8C8]/70 text-sm md:text-base leading-relaxed italic border-l-2 border-[#D4AF37] pl-6 md:pl-0 md:border-none"
          >
            "Whether you are a startup looking to disrupt the market or an
            established brand needing a digital facelift, my goal remains the
            same: to turn your vision into reality, ahead of schedule."
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
