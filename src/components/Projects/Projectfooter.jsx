import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Projectfooter = () => {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      // 1. Reveal Animations for Footer Columns
      gsap.from(".footer-col", {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%", // Start animation when footer is 85% down the screen
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });

      // 2. Reveal Animation for the Massive CTA Text
      gsap.from(".cta-text", {
        scrollTrigger: {
          trigger: ".cta-text",
          start: "top 90%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });
    },
    { scope: footerRef },
  );

  // Smooth scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050505] text-white pt-24 pb-8 overflow-hidden border-t border-white/10"
    >
      {/* --- CUSTOM CSS FOR MARQUEE --- */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Ambient Background Glows */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vw] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-orange-900/5 rounded-full mix-blend-screen filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        {/* --- TOP SECTION: GIANT CTA --- */}
        <div className="flex flex-col items-center justify-center text-center mb-24 md:mb-32">
          <p className="text-gray-400 tracking-[0.2em] uppercase text-xs md:text-sm mb-6 font-medium">
            Have a project in mind?
          </p>

          <a
            href="mailto:hello@sixtyseventh.com"
            className="cta-text group relative inline-block text-5xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase cursor-pointer"
          >
            Let's Talk
            {/* Animated Underline on Hover */}
            <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
            {/* Floating Glow behind text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </a>
        </div>

        {/* --- MIDDLE SECTION: LINKS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          {/* Column 1: Brand Info */}
          <div className="footer-col flex flex-col gap-6">
            <h3 className="text-2xl font-bold tracking-tighter">
              Sixty-Seventh.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              A digital design agency crafting immersive experiences, iconic
              brands, and cutting-edge websites.
            </p>
          </div>

          {/* Column 2: Sitemap */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-2">
              Sitemap
            </h4>
            <a
              href="/"
              className="text-gray-300 hover:text-white transition-colors text-base w-max"
            >
              Home
            </a>
            <a
              href="/projects"
              className="text-gray-300 hover:text-white transition-colors text-base w-max"
            >
              Projects
            </a>
            <a
              href="/agence"
              className="text-gray-300 hover:text-white transition-colors text-base w-max"
            >
              Agence
            </a>
            <a
              href="/contact"
              className="text-gray-300 hover:text-white transition-colors text-base w-max"
            >
              Contact
            </a>
          </div>

          {/* Column 3: Socials */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-2">
              Socials
            </h4>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition-colors text-base w-max flex items-center gap-2"
            >
              Instagram <span className="text-xs">↗</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition-colors text-base w-max flex items-center gap-2"
            >
              Dribbble <span className="text-xs">↗</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition-colors text-base w-max flex items-center gap-2"
            >
              LinkedIn <span className="text-xs">↗</span>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition-colors text-base w-max flex items-center gap-2"
            >
              Twitter <span className="text-xs">↗</span>
            </a>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col flex flex-col gap-4">
            <h4 className="text-sm font-bold tracking-widest uppercase text-gray-500 mb-2">
              Get in touch
            </h4>
            <a
              href="mailto:hello@sixtyseventh.com"
              className="text-gray-300 hover:text-white transition-colors text-base"
            >
              shoubailakhtar143@gmail.com
            </a>
            <p className="text-gray-400 text-sm mt-2">
              123 Design Street
              <br />
              Creative District, PK 26
            </p>
          </div>
        </div>

        {/* --- BOTTOM SECTION: INFINITE MARQUEE --- */}
        <div className="w-full overflow-hidden border-y border-white/10 py-6 mb-8 relative">
          {/* Gradient Fades for smooth edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max animate-[marquee_20s_linear_infinite]">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-8 px-4 text-4xl md:text-6xl font-black uppercase text-white/10 tracking-tighter"
              >
                <span>Let's create</span>
                <span className="text-blue-500/20 text-2xl md:text-4xl">✦</span>
                <span>Let's build</span>
                <span className="text-orange-500/20 text-2xl md:text-4xl">
                  ✦
                </span>
                <span>Let's inspire</span>
                <span className="text-blue-500/20 text-2xl md:text-4xl">✦</span>
              </div>
            ))}
          </div>
        </div>

        {/* --- FINAL BAR: COPYRIGHT & BACK TO TOP --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Sixty-Seventh Agency. All rights
            reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-white group-hover:-translate-y-1 transition-all duration-300">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Projectfooter;
