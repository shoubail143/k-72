import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const testimonials = [
  {
    id: 1,
    name: "Lucas Meyer",
    location: "Germany",
    role: "CEO, TechFlow",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    quote:
      "Fast, reliable, and incredibly creative. The team at Sixty-Seventh exceeded all our expectations. We will definitely be working together again.",
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    location: "United States",
    role: "Marketing Director",
    image: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    quote:
      "An absolute pleasure to work with. They took our vague concept and turned it into a stunning, high-converting website. 10/10 would recommend.",
  },
  {
    id: 3,
    name: "Kenji Sato",
    location: "Japan",
    role: "Product Lead",
    image: "https://i.pravatar.cc/150?img=33",
    rating: 4.5,
    quote:
      "Their attention to detail is unmatched. The communication was seamless, and the final product was delivered ahead of schedule. Truly top-tier service.",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    location: "Spain",
    role: "Founder, StudioE",
    image: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    quote:
      "We've worked with many agencies, but Sixty-Seventh stands out. They are proactive, innovative, and genuinely care about the success of the project.",
  },
];

// --- STAR COMPONENT ---
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1.5 mb-6">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= Math.floor(rating);
        const isHalf = star === Math.ceil(rating) && rating % 1 !== 0;

        return (
          <svg
            key={star}
            className={`w-5 h-5 md:w-6 md:h-6 ${isFilled || isHalf ? "text-[#D4AF37]" : "text-[#E5D9D5]"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            {isHalf ? (
              <defs>
                <linearGradient id={`halfGrad${star}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#E5D9D5" stopOpacity="1" />
                </linearGradient>
              </defs>
            ) : null}
            <path
              fill={isHalf ? `url(#halfGrad${star})` : "currentColor"}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        );
      })}
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Testimonials3D() {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play logic
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // Increased to 6 seconds so people have time to read the bigger text
    return () => clearInterval(timer);
  }, [isHovered]);

  // Calculate positions for the 3D coverflow effect
  const getCardStyle = (cardIndex) => {
    let offset = cardIndex - index;
    if (offset < -1) offset += testimonials.length;
    if (offset > 1) offset -= testimonials.length;
    if (offset < -1 || offset > 1)
      return { opacity: 0, zIndex: 0, pointerEvents: "none" };

    if (offset === 0)
      return {
        x: 0,
        scale: 1.05,
        rotateY: 0,
        zIndex: 10,
        opacity: 1,
        z: 50,
        pointerEvents: "auto",
      }; // Increased active scale
    if (offset === -1)
      return {
        x: "-45%",
        scale: 0.85,
        rotateY: 35,
        zIndex: 5,
        opacity: 0.4,
        z: 0,
        pointerEvents: "auto",
      }; // Pushed back further
    if (offset === 1)
      return {
        x: "45%",
        scale: 0.85,
        rotateY: -35,
        zIndex: 5,
        opacity: 0.4,
        z: 0,
        pointerEvents: "auto",
      };
  };

  return (
    // BACKGROUND: Soft Cream (#F9F5F0)
    <div className="relative w-full py-24 bg-[#F9F5F0] overflow-hidden flex flex-col items-center justify-center min-h-screen font-sans selection:bg-[#7A202F]/20">
      {/* --- COOL BACKGROUND ANIMATIONS (Liquid Aurora) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%",
            ],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-gradient-to-br from-[#1D4B3E]/10 to-[#7A202F]/5 blur-[80px]"
        />

        <motion.div
          animate={{
            borderRadius: [
              "50% 50% 30% 70% / 50% 60% 40% 50%",
              "30% 70% 50% 50% / 40% 50% 50% 60%",
              "50% 50% 30% 70% / 50% 60% 40% 50%",
            ],
            rotate: [0, -90, 0],
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-gradient-to-tl from-[#7A202F]/10 to-[#D4AF37]/10 blur-[100px]"
        />
      </div>

      {/* --- HEADER & PREMIUM BADGE (Fixed Layout) --- */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center mb-16 px-4">
        {/* The Cool Social Proof Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative overflow-hidden inline-flex items-center gap-3 pl-1.5 pr-5 py-1.5 rounded-full bg-white/80 backdrop-blur-xl border border-[#1D4B3E]/15 shadow-[0_8px_30px_rgb(29,75,62,0.08)] mb-8 cursor-default group"
        >
          {/* Shimmer Effect */}
          <motion.div
            animate={{ x: ["-200%", "200%"] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
            className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-[-20deg]"
          />

          {/* Avatars */}
          <div className="flex -space-x-3 relative z-10">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="Client"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Client"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <img
              src="https://i.pravatar.cc/150?img=33"
              alt="Client"
              className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm"
            />
            <div className="w-8 h-8 rounded-full border-2 border-white bg-[#1D4B3E] text-white flex items-center justify-center text-[10px] font-bold z-10 group-hover:bg-[#0F2E24] transition-colors">
              50+
            </div>
          </div>

          {/* Text and Stars */}
          <div className="flex flex-col items-start relative z-10">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D4B3E] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D4B3E]"></span>
              </span>
              <div className="flex text-[#D4AF37] text-[10px] gap-0.5">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0F2E24] tracking-wide">
              Rated <span className="text-[#1D4B3E]">4.9/5</span> by 50+ Clients
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-[#3A1F24] tracking-tight mb-4"
        >
          What Our{" "}
          <span className="font-serif italic font-light text-[#7A202F]">
            Clients
          </span>{" "}
          Say
        </motion.h2>
      </div>

      {/* --- 3D CAROUSEL CONTAINER --- */}
      <div
        className="relative w-full max-w-6xl h-[550px] md:h-[600px] flex items-center justify-center perspective-[1500px] z-20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {testimonials.map((review, i) => {
          const style = getCardStyle(i);

          return (
            <motion.div
              key={review.id}
              animate={style}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(e, { offset }) => {
                if (offset.x < -50)
                  setIndex((prev) => (prev + 1) % testimonials.length);
                if (offset.x > 50)
                  setIndex(
                    (prev) =>
                      (prev - 1 + testimonials.length) % testimonials.length,
                  );
              }}
              // INCREASED SIZE: Much wider and taller
              className="absolute w-[90%] md:w-[650px] lg:w-[800px] min-h-[400px] md:min-h-[450px] bg-white backdrop-blur-xl border border-[#7A202F]/10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(58,31,36,0.15)] p-8 md:p-12 cursor-grab active:cursor-grabbing flex flex-col justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Header (Avatar + Name) */}
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#7A202F] to-[#D4AF37] rounded-full blur-md opacity-30" />
                  <img
                    src={review.image}
                    alt={review.name}
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-[#F9F5F0] shadow-sm"
                  />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#3A1F24]">
                    {review.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm md:text-base text-[#8E6B73] font-medium mt-1">
                    <span>{review.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A202F]/30" />
                    <span>{review.role}</span>
                  </div>
                </div>
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Quote (Larger Text) */}
              <p className="text-[#4A3A3D] leading-relaxed text-xl md:text-2xl font-medium italic">
                "{review.quote}"
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* --- NAVIGATION CONTROLS --- */}
      <div className="flex items-center gap-6 mt-12 z-20">
        {/* Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index
                  ? "bg-[#7A202F] w-8"
                  : "bg-[#E5D9D5] hover:bg-[#7A202F]/50 w-2.5"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
