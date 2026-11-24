import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const expertiseData = [
  {
    title: "Strategy",
    description:
      "We don't guess; we engineer growth. Our strategy phase dives deep into your market, analyzing competitors and user behavior to build a roadmap that guarantees market dominance. We turn ambiguity into actionable, revenue-driving blueprints.",
  },
  {
    title: "Advertisement",
    description:
      "Stop interrupting; start captivating. We craft high-converting ad campaigns that blend cinematic visuals with data-driven targeting. From social media blitzes to targeted search, we ensure your brand's message cuts through the noise and sticks.",
  },
  {
    title: "Branding",
    description:
      "A brand is not just a logo; it's a feeling. We build immersive brand identities that command attention and foster loyalty. From color psychology to voice and tone, we create a cohesive universe that makes your audience feel something profound.",
  },
  {
    title: "Design",
    description:
      "Beauty meets brutal efficiency. Our design philosophy merges avant-garde aesthetics with intuitive UX. We don't just make it look good; we architect interfaces that feel alive, guiding users effortlessly toward conversion.",
  },
  {
    title: "Content",
    description:
      "Words sell, but stories stick. We curate compelling narratives, striking visuals, and engaging copy that breathe life into your digital presence. Every piece of content is meticulously crafted to position you as the absolute authority in your space.",
  },
];

export default function ExpertiseSection() {
  const [activeItem, setActiveItem] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (activeItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeItem]);

  return (
    <section className="relative w-full bg-[#faf9f6] text-black py-20 md:py-32 overflow-hidden">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-12 px-6 md:grid-cols-12 md:px-12 lg:px-16">
        {/* Left Column: The Label */}
        <div className="md:col-span-4 lg:col-span-3">
          <div className="sticky top-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Continuous 3D Floating Animation */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* The Tag */}
                <div
                  className="
                  inline-flex items-center gap-3
                  bg-sky-500 text-white
                  border-2 border-black
                  px-5 py-2.5
                  shadow-[4px_4px_0px_#000]
                  -rotate-3
                  hover:rotate-0 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[6px_6px_0px_#000]
                  transition-all duration-300
                  cursor-pointer group
                "
                >
                  {/* Pulsing Live Dot */}
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gray-100"></span>
                  </span>

                  <h3 className="text-sm md:text-base font-black tracking-[0.25em] uppercase mt-0.5">
                    Expertise
                  </h3>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9 flex flex-col">
          {expertiseData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.19, 1, 0.22, 1],
              }}
              // ONLY TRIGGERS ON CLICK NOW
              onClick={() => setActiveItem(item)}
              className="group flex items-center justify-between border-b border-black/10 py-4 md:py-6 cursor-pointer transition-all duration-300 hover:border-black relative"
            >
              {/* Number + Text */}
              <div className="flex items-center gap-4 md:gap-8">
                <span className="text-sm md:text-lg font-mono text-black/30 group-hover:text-blue-600 transition-colors">
                  0{index + 1}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter transition-all duration-500 ease-out group-hover:translate-x-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-blue-500 group-hover:to-sky-400">
                  {item.title}
                </h2>
              </div>

              {/* Arrow */}
              <div className="opacity-100 md:opacity-0 -translate-x-4 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-500 flex items-center justify-center bg-black rounded-full p-2 md:p-4 text-white group-hover:bg-blue-600 group-hover:text-white">
                <ArrowUpRight size={24} className="md:w-8 md:h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================
          THE ULTIMATE GLASSMORPHISM MODAL
      ========================================================= */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 perspective-1000">
            {/* Blurred Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItem(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-[#111] border border-white/10 p-8 md:p-16 rounded-[2rem] shadow-[0_0_100px_rgba(251,191,36,0.1)] overflow-hidden"
            >
              {/* Animated Background Glow inside Modal */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-[50%] -right-[20%] w-[80%] h-[100%] bg-sky-500 rounded-full blur-[120px] pointer-events-none"
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 rounded-full bg-white/5 hover:bg-white/20 border border-white/10 transition-all duration-300 text-white z-20 group"
              >
                <X
                  size={24}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </button>

              {/* Text Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center gap-3 mb-6 md:mb-8"
                >
                  <span className="w-3 h-3 rounded-full bg-sky-500 animate-pulse"></span>
                  <span className="text-sky-700 font-mono text-xs md:text-sm tracking-[0.3em] uppercase">
                    Our Expertise
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  // Removed 'group-hover:' and made the gradient permanent
                  className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-400 mb-6"
                >
                  {activeItem.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-neutral-300 text-lg md:text-xl leading-relaxed md:leading-loose font-light"
                >
                  {activeItem.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent mt-10 mb-6"
                />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex justify-between items-center text-neutral-500 text-xs font-mono uppercase tracking-widest"
                >
                  <span>Quattro Agency © {new Date().getFullYear()}</span>
                  <span>Ready to dominate</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
