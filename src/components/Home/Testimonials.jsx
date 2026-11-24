"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, X } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Eleanor Pena",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    quote:
      "A masterclass in front-end development. The attention to detail and the seamless animations brought our brand vision to life perfectly.",
  },
  {
    id: 2,
    name: "Guy Hawkins",
    role: "Founder, Aura Studios",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    quote:
      "Working with him was effortless. He understands not just the code, but the design philosophy behind it. The final product exceeded all expectations.",
  },
  {
    id: 3,
    name: "Jane Cooper",
    role: "Product Lead",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    quote:
      "Our conversion rates skyrocketed after the redesign. The micro-interactions and smooth transitions make the user experience feel incredibly premium.",
  },
  {
    id: 4,
    name: "Cody Fisher",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    quote:
      "He delivered ahead of schedule and the quality was impeccable. The portfolio section he built is now the most visited page on our site.",
  },
  {
    id: 5,
    name: "Esther Howard",
    role: "CEO, Lume",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    quote:
      "Incredible technical skills paired with a brilliant eye for aesthetics. He doesn't just write code; he crafts digital experiences.",
  },
  {
    id: 6,
    name: "Wade Warren",
    role: "Art Director",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80",
    quote:
      "The 3D elements and scroll animations are flawless. It's rare to find a developer who can execute complex designs so perfectly.",
  },
];

export default function Testimonials3d() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    // Clicking the section background closes the selected card
    <section
      onClick={() => setSelectedId(null)}
      className="relative w-full py-32 bg-[#2c060e] overflow-hidden selection:bg-[#d4af37] selection:text-[#2c060e] min-h-screen flex flex-col justify-center"
    >
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5c1427] blur-[150px] rounded-full pointer-events-none opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Elegant Heading */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-[#d4af37] font-semibold tracking-[0.3em] uppercase text-sm mb-6">
              What Clients Say
            </p>
            <h2 className="text-5xl md:text-7xl font-serif text-[#fdfbf7] mb-8 tracking-tighter">
              Trusted by{" "}
              <span className="italic text-[#d4af37]">visionaries.</span>
            </h2>
            <p className="text-[#fdfbf7]/70 text-lg md:text-xl max-w-2xl mx-auto font-light">
              A collection of thoughts from the brilliant minds I've had the
              privilege to build alongside.
            </p>
          </motion.div>
        </div>

        {/* Floating Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => {
            const isSelected = selectedId === testimonial.id;
            const isAnySelected = selectedId !== null;

            // Random float configurations
            const floatDuration = 4 + (index % 3);
            const floatDelay = index * 0.5;
            const floatY = index % 2 === 0 ? [-15, 15] : [15, -15];

            return (
              <motion.div
                key={testimonial.id}
                // Prevent click from bubbling up and closing immediately
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedId(isSelected ? null : testimonial.id);
                }}
                // ANIMATION LOGIC
                animate={{
                  // 1. If any card is selected, blur and dim the unselected ones
                  opacity: isAnySelected && !isSelected ? 0.3 : 1,
                  filter:
                    isAnySelected && !isSelected ? "blur(4px)" : "blur(0px)",
                  // 2. The selected card pops out
                  scale: isSelected ? 1.05 : isAnySelected ? 0.95 : 1,
                  zIndex: isSelected ? 50 : 10,

                  // 3. Floating logic (stops if selected)
                  y: isSelected ? 0 : floatY,
                  rotate: isSelected
                    ? 0
                    : index % 2 === 0
                      ? [0, 1, 0]
                      : [0, -1, 0],
                }}
                transition={
                  isSelected
                    ? { duration: 0.3 }
                    : {
                        y: {
                          duration: floatDuration,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: floatDelay,
                        },
                        rotate: {
                          duration: floatDuration + 1,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut",
                        },
                        default: { duration: 0.4 },
                      }
                }
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={
                  !isSelected && !isAnySelected
                    ? { scale: 1.02, cursor: "pointer" }
                    : {}
                }
                className={`relative bg-[#fdfbf7] p-8 md:p-10 rounded-2xl touch-pan-y  shadow-2xl flex flex-col justify-between overflow-hidden transition-colors ${
                  isSelected
                    ? "ring-4 ring-[#d4af37] shadow-[0_30px_80px_rgba(0,0,0,0.8)] cursor-default"
                    : "cursor-pointer"
                }`}
              >
                {/* Decorative Gold Line */}
                <div
                  className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#d4af37] to-[#fdfbf7] transition-transform duration-500 origin-left ${isSelected ? "scale-x-100" : "scale-x-0"}`}
                />
                {/* Close Button (Only shows when selected) */}
                {isSelected && (
                  <button
                    type="button"
                    className="absolute top-3 right-3 z-[100] flex items-center justify-center w-8 h-8 rounded-full bg-white/60 backdrop-blur-md border border-white/80 text-[#2c060e] shadow-sm transition-all duration-300 ease-in-out cursor-pointer pointer-events-auto hover:bg-[#2c060e] hover:text-white hover:rotate-90 hover:scale-110 active:scale-95"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedId(null);
                    }}
                    aria-label="Close testimonial"
                  >
                    {/* Slightly smaller icon to fit the tighter circle perfectly */}
                    <X className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                )}
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-[#2c060e] fill-[#2c060e]"
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-[#2c060e] opacity-20" />
                  </div>

                  <p className="text-[#2c060e] text-base md:text-lg leading-relaxed font-medium mb-8">
                    "{testimonial.quote}"
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 mt-auto relative z-10">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-[#2c060e] relative z-10 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#2c060e] font-bold text-sm tracking-wide">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#2c060e]/60 text-xs font-semibold uppercase tracking-wider mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
