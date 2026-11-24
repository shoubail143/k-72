"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Compass,
  Target,
  PenTool,
  Code2,
  CheckCircle2,
  Mail,
  MapPin,
  ArrowRight,
  Star,
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    title: "DISCOVER",
    desc: "Understanding your vision, goals, and audience.",
    icon: Compass,
  },
  {
    id: 2,
    title: "STRATEGIZE",
    desc: "Research and strategy to build a strong creative foundation.",
    icon: Target,
  },
  {
    id: 3,
    title: "DESIGN",
    desc: "Crafting elegant, purposeful visuals that communicate.",
    icon: PenTool,
  },
  {
    id: 4,
    title: "DEVELOP",
    desc: "Bringing designs to life with precision and attention to detail.",
    icon: Code2,
  },
  {
    id: 5,
    title: "DELIVER",
    desc: "Refining and delivering work that exceeds expectations.",
    icon: CheckCircle2,
  },
];

export default function Footer() {
  const processRef = useRef(null);

  // Track scroll progress specifically for the timeline
  const { scrollYProgress } = useScroll({
    target: processRef,
    offset: ["start center", "end center"],
  });

  // Transform scroll progress into a line width (for desktop) or height (for mobile)
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <footer className="relative w-full bg-[#140406] text-[#fdfbf7] overflow-hidden font-sans selection:bg-[#d4af37] selection:text-[#140406]">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("https://www.transparenttextures.com/patterns/stardust.png")',
        }}
      ></div>

      {/* ======================================================== */}
      {/* 1. MY PROCESS SECTION */}
      {/* ======================================================== */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-16 relative z-10"
        ref={processRef}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-md mb-16"
        >
          <div className="w-12 h-[1px] bg-[#d4af37] mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif tracking-tight leading-none mb-4">
            MY PROCESS
          </h2>
          <p className="text-[#fdfbf7]/60 text-sm font-[font1] tracking-widest uppercase">
            A thoughtful approach from concept to completion.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative flex flex-col md:flex-row gap-10 md:gap-4">
          {/* DESKTOP: Horizontal Line */}
          <div className="hidden md:block absolute top-[24px] left-[5%] right-[5%] h-[1px] bg-[#fdfbf7]/10 z-0" />
          {/* DESKTOP: Animated Golden Line */}
          <motion.div
            style={{ width: lineWidth }}
            className="hidden md:block absolute top-[24px] left-[5%] h-[1px] bg-[#d4af37] z-0 shadow-[0_0_10px_#d4af37]"
          />

          {/* MOBILE: Vertical Line */}
          <div className="md:hidden absolute top-0 bottom-0 left-[23px] w-[1px] bg-[#fdfbf7]/10 z-0" />
          {/* MOBILE: Animated Golden Line */}
          <motion.div
            style={{ height: lineWidth }}
            className="md:hidden absolute top-0 left-[23px] w-[1px] bg-[#d4af37] z-0 shadow-[0_0_10px_#d4af37]"
          />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative z-10 flex flex-row md:flex-col md:items-center md:text-center group gap-6 md:gap-0"
            >
              {/* Icon Circle (Lights up on scroll via whileInView) */}
              <motion.div
                whileInView={{
                  borderColor: "#d4af37",
                  backgroundColor: "#3b0814",
                }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-12 h-12 shrink-0 rounded-full border border-[#fdfbf7]/20 bg-[#140406] flex items-center justify-center md:mb-6 relative"
              >
                <step.icon className="w-5 h-5 text-[#fdfbf7]/50 group-hover:text-[#d4af37] transition-colors duration-500" />
              </motion.div>

              <div className="flex flex-col md:items-center pt-1 md:pt-0">
                <span className="text-[#d4af37] font-mono text-xs md:text-sm mb-1 md:mb-2">
                  0{step.id}
                </span>
                <h3 className="text-base md:text-lg font-serif tracking-wide mb-1 md:mb-2 group-hover:text-[#d4af37] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-[#fdfbf7]/50 leading-relaxed max-w-[250px] md:px-2">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CTA CARD SECTION (Mobile Optimized) */}
      {/* ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          // CHANGED to flex-col lg:flex-row so it stacks perfectly on tablets and phones
          className="relative w-full bg-[#3b0814] rounded-3xl overflow-hidden border border-[#fdfbf7]/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between p-6 md:p-12 lg:p-16 gap-10 lg:gap-6"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#5c1427]/50 to-transparent pointer-events-none" />

          {/* Left: Text */}
          <div className="relative z-10 lg:w-1/3 text-center lg:text-left w-full">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-[font2] leading-[1.1] mb-2 tracking-tight">
              LET'S CREATE
              <br />
              SOMETHING
            </h2>
            <span
              className="text-4xl md:text-5xl lg:text-6xl text-[#d4af37] block transform -rotate-6 mt-1"
              style={{ fontFamily: "'Brush Script MT', cursive" }}
            >
              PURE ALCHEMY!
            </span>
          </div>

          {/* Center: Image with Vintage Filter */}
          <div className="relative z-10 lg:w-1/3 flex flex-col items-center justify-center gap-4 text-center w-full border-y lg:border-y-0 lg:border-x border-[#fdfbf7]/10 py-8 lg:py-0">
            <p className="text-xs font-[font2]-bold tracking-[0.2em] uppercase text-[#d4af37]">
              Available for new projects
            </p>
            <p className="text-sm text-[#fdfbf7]/70 max-w-[250px]">
              Let's bring your vision to life with design that makes an impact.
            </p>
            <div className="relative group mt-2 inline-block">
              {/* Outer gold square border */}
              <div className="absolute inset-0 border border-[#d4af37] rounded-xl scale-105 opacity-50 group-hover:scale-110 transition-transform duration-500" />

              {/* Black & White Square Image */}
              <img
                src="/Shoubaill.webp"
                alt="Shoubail Akhtar"
                loading="lazy"
                decoding="async"
                className="w-28 h-28 md:w-36 md:h-36 rounded-xl object-cover object-top border-2 border-[#3b0814] relative z-10 shadow-xl"
                style={{ filter: "grayscale(1) contrast(1.15)" }}
              />
            </div>
          </div>

          {/* Right: Contact & Button */}
          <div className="relative z-10 lg:w-1/3 flex flex-col items-center lg:items-start gap-5 w-full">
            <div className="flex flex-col gap-3 text-sm text-[#fdfbf7]/80 w-full items-center lg:items-start">
              <a
                href="/contact"
                className="flex items-center gap-3 hover:text-[#d4af37] transition-colors break-all"
              >
                <Mail className="w-4 h-4 font-[font2] shrink-0" />{" "}
                shoubailakhtar143@gmail.com
              </a>
              <span className="flex items-center gap-3">
                <MapPin className="w-4 h-4 font-[font2] shrink-0" /> SWAT.
              </span>
            </div>

            <a
              href="contact"
              className="mt-2 w-full flex items-center justify-between px-6 py-4 border border-[#fdfbf7]/30 rounded-full hover:bg-[#d4af37] hover:text-[#140406] hover:border-[#d4af37] transition-all duration-300 group"
            >
              <span className="text-xs md:text-sm font-bold tracking-widest uppercase">
                Let's Work Together
              </span>
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform shrink-0" />
            </a>
          </div>

          {/* Circular Rotating Stamp (Desktop Only) */}
          <div className="absolute -bottom-8 -right-8 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:-right-6 lg:right-8 w-32 h-32 hidden lg:flex items-center justify-center pointer-events-none opacity-80 mix-blend-screen">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full animate-[spin_10s_linear_infinite]"
            >
              <path
                id="curve"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="transparent"
              />
              <text className="text-[10px] uppercase tracking-widest font-bold fill-[#d4af37]">
                <textPath href="#curve">
                  STRATEGY MEETS CREATIVITY • STRATEGY MEETS CREATIVITY •
                </textPath>
              </text>
            </svg>
            <Star className="absolute w-6 h-6 text-[#d4af37] fill-[#d4af37]" />
          </div>
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* 3. BOTTOM FOOTER */}
      {/* ======================================================== */}
      <div className="border-t border-[#fdfbf7]/10 py-6 relative z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs font-bold tracking-widest text-[#fdfbf7]/40 uppercase text-center md:text-left">
          <p>© 2026 Shoubail Akhtar Studio</p>
          <p className="hidden md:block text-[#d4af37]">
            Designing Brands. Creating Impact.
          </p>
          <div className="flex gap-6 font-[font2] justify-center">
            <a href="#" className="hover:text-[#d4af37] transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">
              Github
            </a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
