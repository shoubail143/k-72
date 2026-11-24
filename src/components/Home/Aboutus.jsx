import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Import your image (Make sure to save it in src/assets as shoubail.jpg)
import myPhoto from "../../assets/Shoubail.jpg";

gsap.registerPlugin(ScrollTrigger);

const Aboutus = () => {
  const sectionRef = useRef(null);
  const [isColored, setIsColored] = useState(false);
  const text23Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animation for Image and Text
      gsap.from(".about-reveal", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
      });

      // 2. Continuous 3D Rotation for the "23"
      gsap.to(text23Ref.current, {
        rotationY: 360,
        rotationX: 15,
        duration: 20,
        repeat: -1,
        ease: "linear",
      });

      // 3. Floating animation for the "23"
      gsap.to(text23Ref.current, {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 4. Parallax effect on scroll for the "23"
      gsap.to(text23Ref.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        yPercent: 30,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505] text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 overflow-hidden flex items-center"
    >
      {/* --- 3D BACKGROUND NUMBER "19" --- */}
      <motion.div
        ref={text23Ref}
        // 1. MADE IT MORE APPARENT: Increased stroke opacity and added a very faint gradient fill
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[45vw] md:text-[38vw] font-black leading-none pointer-events-none select-none z-0"
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
          // 2. THE STYLING: A gorgeous gold/cream wireframe
          WebkitTextStroke: "2px rgba(232, 216, 200, 0.15)", // Cream stroke, 15% opacity (much more visible)
          color: "transparent",
          background:
            "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(10,4,6,0) 80%)",
          WebkitBackgroundClip: "text",
        }}
        // 3. THE UNIQUE ANIMATION: 3D Cinematic Breathing & Tilt
        animate={{
          rotateX: [0, 15, 0, -15, 0], // Slowly tilts up and down
          rotateY: [0, -15, 0, 15, 0], // Slowly tilts left and right
          scale: [1, 1.05, 1], // Breathes in and out
          y: [0, -20, 0], // Floats up and down slightly
          opacity: [0.6, 1, 0.6], // Fades in and out to feel alive
        }}
        transition={{
          duration: 15, // Very slow, luxurious pace
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        19
      </motion.div>
      {/* Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[150px] pointer-events-none z-0"></div>
      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* --- LEFT SIDE: THE IMAGE --- */}
          <div className="about-reveal relative group w-full max-w-md mx-auto lg:mx-0">
            {/* Animated Border Frame */}
            <div className="absolute inset-0 border-2 border-white/10 rounded-3xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 z-0"></div>
            {/* Image Container (Grayscale to Color on Hover) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl z-10 cursor-pointer group transition-all duration-500 hover:shadow-[0_20px_50px_rgba(197,149,148,0.4)]">
              {/* Colorful Glow Border (Theme Colors) */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#C59594] via-[#75708C] to-[#C7DBF7] rounded-3xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none"></div>
              {/* Image Container (Grayscale to Color on Click & Hover) */}
              <div
                className={`relative rounded-3xl overflow-hidden shadow-2xl z-10 cursor-pointer group transition-all duration-700
    ${isColored ? "shadow-[0_20px_50px_rgba(197,149,148,0.4)]" : ""}`}
              >
                {/* The Clicked State Glow Effect */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-tr from-[#C59594] via-[#75708C] to-[#C7DBF7] rounded-[2rem] blur-md transition-opacity duration-700 pointer-events-none
      ${isColored ? "opacity-70" : "opacity-0 group-hover:opacity-40"}`}
                ></div>

                {/* Clickable Wrapper */}
                <div
                  className="relative overflow-hidden rounded-3xl z-10 bg-[#010101]"
                  onClick={() => setIsColored(!isColored)} // Toggles color on click/tap
                >
                  <img
                    src={myPhoto}
                    alt="Shoubail"
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-auto object-cover transition-all duration-700 ease-in-out
      ${isColored ? "grayscale-0 scale-105" : "grayscale"}
      group-hover:grayscale-0 group-hover:scale-105`}
                  />

                  {/* Subtle Overlay Gradient (Fades out on hover or click) */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-[#010101]/80 via-[#010101]/20 to-transparent transition-opacity duration-500 pointer-events-none
      ${isColored ? "opacity-0" : "opacity-80 group-hover:opacity-20"}`}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: TEXT CONTENT --- */}
          <div className="flex flex-col justify-center">
            {/* Greeting */}
            <div className="about-reveal">
              <span className="text-blue-500 font-bold tracking-[0.2em] uppercase text-sm mb-2 block">
                Hello, I am
              </span>
            </div>

            {/* Name */}
            <div className="about-reveal">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6">
                Shoubail<span className="text-blue-500">.</span>
              </h1>
            </div>

            {/* Paragraph */}
            <div className="about-reveal">
              <p className="text-lg md:text-xl text-gray-400 font-light leading-relaxed mb-8 max-w-xl">
                I am a passionate{" "}
                <span className="text-white font-medium">
                  Software Developer
                </span>{" "}
                and{" "}
                <span className="text-white font-medium">3D Web Creator</span>.
                I specialize in building immersive digital experiences, blending
                robust backend architecture with cutting-edge frontend
                animations. Whether it's crafting interactive 3D interfaces,
                mastering GSAP for buttery-smooth motion, or developing scalable
                applications, I bring ideas to life with code and creativity.
              </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="about-reveal flex flex-wrap gap-3">
              {[
                "React.js",
                "Next.js",
                "Three.js",
                "GSAP",
                "Tailwind CSS",
                "Node.js",
                "TypeScript",
                "Git Hub",
                "Databases",
              ].map((tech, index) => (
                <span
                  key={index}
                  className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Button */}
            <div className="about-reveal mt-12">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:bg-gray-200 transition-all duration-300"
              >
                Let's Work Together
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
