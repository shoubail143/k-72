import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

/* =========================================
   THE INFINITE + MAGNETIC 3D STAMP HEADER
========================================= */
function MagneticHeader() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct * 40);
    y.set(yPct * 40);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="flex flex-col justify-center items-center py-20 md:py-32 perspective-1000">
      {/* INFINITE FLOATING WRAPPER */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* MAGNETIC 3D STAMP */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            x: mouseXSpring,
            y: mouseYSpring,
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative group cursor-pointer"
        >
          {/* 3D Shadow Layer */}
          <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-2" />

          {/* Main Content Box */}
          <div className="relative bg-[#faf9f6] border-4 border-black px-8 py-6 md:px-16 md:py-12 -rotate-2 transition-transform duration-300 group-hover:rotate-0">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-black uppercase flex flex-col items-center">
              <span className="text-sm md:text-xl text-amber-600 tracking-[0.5em] mb-2 font-mono font-normal">
                The Manifesto
              </span>
              Why Us?
            </h2>
          </div>
        </motion.div>
      </motion.div>

      {/* SUB-PARAGRAPH */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-16 text-center max-w-2xl text-neutral-500 text-lg md:text-xl leading-relaxed px-4"
      >
        We don't just build websites. We engineer digital weapons.{" "}
        <br className="hidden md:block" />
        Meet the trio that merges{" "}
        <span className="text-black font-bold">art</span>,{" "}
        <span className="text-black font-bold">code</span>, and{" "}
        <span className="text-black font-bold">strategy</span> to dominate the
        web.
      </motion.p>
    </div>
  );
}

/* =========================================
   THE TEAM DATA
========================================= */
const teamData = [
  {
    name: "Shoubail",
    role: "Web Designer & Fullstack",
    image: "/Shoubaill.webp",
    manifesto: (
      <>
        We believe the most beautiful digital experiences are born at the
        intersection of art and logic.{" "}
        <span className="font-serif italic text-[#7A202F] text-xl md:text-2xl font-bold">
          Shoubail
        </span>{" "}
        bridges this gap flawlessly. As a visionary{" "}
        <span className="bg-black text-white px-2 py-1 text-sm font-mono uppercase tracking-wider">
          Web Designer
        </span>{" "}
        and{" "}
        <span className="bg-[#7A202F] text-white border-2 border-black px-2 py-0.5 font-black uppercase text-sm tracking-wider inline-block shadow-[3px_3px_0px_#000] -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default">
          Fullstack Dev
        </span>
        , he doesn't just paint the pixels; he engineers the entire
        architecture. From the very first wireframe to the final line of
        scalable backend code, his work ensures that your brand's digital
        presence is not{" "}
        <span className="bg-black text-white px-2 py-1 text-sm font-mono tracking-wider">
          {" "}
          only breathtakingly aesthetic but also fiercely robust and
          lightning-fast.
        </span>
      </>
    ),
  },
  {
    name: "Abdullah",
    role: "Creative Backend",
    image: "/Abdullah.webp",
    manifesto: (
      <>
        The invisible engine of a masterpiece must be as powerful as its
        exterior.{" "}
        <span className="font-[font1] italic text-[#7A202F] text-xl md:text-2xl font-bold">
          Abdullah
        </span>{" "}
        is our{" "}
        <span className="bg-[#7A202F] text-white px-2 py-1 font-bold shadow-[2px_2px_0px_#000]">
          Creative Backend
        </span>{" "}
        mastermind. He doesn't just build databases and APIs; he architects the
        digital nervous system of your application. By merging rigorous security
        protocols with innovative data structures, Abdullah ensures that your
        web application handles thousands of users without breaking a sweat,
        <span className="bg-[#7A202F] text-white px-2 py-1 text-sm font-mono tracking-wider">
          turning complex logic into a seamless, invisible experience for your
          clients.
        </span>
      </>
    ),
  },
  {
    name: "Sabeel",
    role: "Master of Figma & 3D",
    image: "/Sabeel.webp",
    manifesto: (
      <>
        In a crowded digital space, standing out is everything.{" "}
        <span className="font-serif italic text-amber-700 text-xl md:text-2xl font-bold">
          Sabeel
        </span>{" "}
        is the visual sorcerer of our trio, operating as a{" "}
        <span className="bg-[#7A202F] text-white px-2.5 py-1 font-mono text-xs uppercase tracking-widest inline-flex items-center gap-2 rounded-sm border border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.15)] hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-shadow">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          Master of FIGMA
        </span>{" "}
        and immersive{" "}
        <span className="border-b-4 border-black font-bold uppercase text-sm tracking-widest">
          3D Design
        </span>
        . He crafts interfaces that don't just look good—they feel alive. By
        pushing the boundaries of UI/UX prototyping and integrating mesmerizing
        3D elements, Sabeel creates those jaw-dropping{" "}
        <span className="bg-[#38d8e4] text-black border-2 border-black px-2 py-0.5 font-black uppercase text-sm tracking-wider inline-block shadow-[3px_3px_0px_#000] -rotate-2 hover:rotate-0 transition-transform duration-300 cursor-default">
          "WOW!"
        </span>{" "}
        moments that hook international clients from the very first click.
      </>
    ),
  },
];

/* =========================================
   MAIN MANIFESTO COMPONENT
========================================= */
export default function Manifesto() {
  const containerRef = useRef(null);
  const textRef = useRef([]);

  // NEW: State to track which image is active
  const [activeImage, setActiveImage] = useState(0);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (window.innerWidth >= 768) {
        // DESKTOP LOGIC: Update State on Scroll
        textRef.current.forEach((textEl, index) => {
          if (!textEl) return;
          ScrollTrigger.create({
            trigger: textEl,
            start: "top 50%", // Fires when text hits middle of screen
            end: "bottom 50%",
            onEnter: () => setActiveImage(index), // Changes React state
            onEnterBack: () => setActiveImage(index), // Changes React state
          });
        });
      } else {
        // MOBILE LOGIC: Standard fade up
        const allSections = gsap.utils.toArray(".mobile-section");
        allSections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      }
    }, containerRef);

    // Refresh ScrollTrigger after a tiny delay to ensure everything is calculated right
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    // 1. REMOVED `overflow-hidden` from here.
    // Sticky elements CANNOT work if a parent has overflow-hidden.
    <section
      ref={containerRef}
      className="relative w-full bg-[#faf9f6] text-neutral-900 pb-20"
    >
      <MagneticHeader />

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* 2. The Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 relative items-start">
          {/* LEFT: Sticky Image Column */}
          {/* 
            3. We added `h-full` to the left column so it stretches to match 
            the exact height of the 3 text paragraphs on the right. 
          */}
          <div className="hidden md:block relative h-full">
            {/* 4. The Sticky Frame */}
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <div className="relative w-full max-w-[450px] h-[70vh] max-h-[600px] rounded-sm overflow-hidden shadow-2xl bg-neutral-200 border-4 border-black">
                <AnimatePresence>
                  {teamData.map(
                    (member, index) =>
                      activeImage === index && (
                        <motion.img
                          key={index}
                          src={member.image}
                          alt={member.name}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          // `object-cover object-top` ensures the images fill the frame perfectly without stretching
                          className="absolute inset-0 w-full h-full object-cover object-top grayscale-[10%]"
                        />
                      ),
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Paragraphs */}
          <div className="flex flex-col pt-10 md:pt-0">
            {teamData.map((member, index) => (
              <div
                key={index}
                ref={(el) => (textRef.current[index] = el)}
                /* 
                  5. Using `h-screen` (not min-h-screen) makes the math perfectly 
                  predictable. Each paragraph takes exactly 1 screen height.
                */
                className="mobile-section h-auto md:h-screen flex flex-col justify-center mb-16 md:mb-0"
              >
                {/* Mobile Image */}
                <div className="md:hidden w-full max-w-[350px] aspect-[4/5] rounded-sm overflow-hidden shadow-xl mb-8 mx-auto border-4 border-black">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="max-w-xl">
                  <div className="flex items-end gap-4 mb-6 border-b-2 border-black pb-4">
                    <span className="text-6xl md:text-8xl font-black text-neutral-200 leading-none">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tighter">
                        {member.name}
                      </h3>
                      <p className="text-black font-mono text-xs md:text-sm tracking-[0.2em] uppercase mt-1 bg-amber-300 w-fit px-2 py-0.5 border border-black shadow-[2px_2px_0px_#000]">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  <p className="text-neutral-800 text-base md:text-lg leading-relaxed md:leading-loose">
                    {member.manifesto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
