import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import {
  Mail,
  Phone,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  User,
  MessageSquare,
  Sparkles,
} from "lucide-react";

// --- EMAILJS CONFIGURATION ---
const EMAILJS_SERVICE_ID = "service_kdksb3g";
const EMAILJS_TEMPLATE_ID = "template_cc97qsd";
const EMAILJS_PUBLIC_KEY = "RVhaYYrRwEHafLfn-";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  // GSAP Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftColRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(rightColRef.current, {
        x: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      to_name: "Shoubail Akhtar",
    };

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          setIsSubmitting(false);
          setTimeout(() => setStatus(null), 5000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setStatus("error");
          setIsSubmitting(false);
          setTimeout(() => setStatus(null), 5000);
        },
      );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#C7DBF7] flex items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8 font-sans"
    >
      {/* CREATIVE ANIMATED BACKGROUND BLOBS */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#BFC7DE] rounded-full blur-[100px] opacity-60 pointer-events-none z-0"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#C59594] rounded-full blur-[100px] opacity-40 pointer-events-none z-0"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 40, 0], scale: [1, 1.05, 1] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-[#75708C] rounded-full blur-[120px] opacity-20 pointer-events-none z-0"
      />

      {/* MAIN WRAPPER (The "Card" look) - Responsive Sizing */}
      <div className="max-w-[1100px] w-full bg-white/20 backdrop-blur-3xl border border-white/50 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_32px_0_rgba(1,1,1,0.08)] overflow-hidden flex flex-col lg:flex-row relative z-10 min-h-[600px]">
        {/* LEFT COLUMN: Brand & Info */}
        <div
          ref={leftColRef}
          className="w-full lg:w-5/12 bg-gradient-to-br from-[#BFC7DE]/90 to-[#C7DBF7]/90 p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle abstract shape */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-bl-full blur-2xl pointer-events-none" />
          <div>
            {/* Fancy "Reach Out" Badge */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.5)",
                boxShadow: "0px 8px 24px rgba(197, 149, 148, 0.3)",
              }}
              className="flex items-center gap-3 text-[#75708C] mb-8 lg:mb-12 bg-white/30 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/60 w-fit shadow-sm cursor-default group relative overflow-hidden"
            >
              {/* Unique Animated Gem/Node */}
              <div className="relative flex items-center justify-center w-6 h-6">
                {/* Pulsing outer ring */}
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 rounded-full border-[1.5px] border-[#C59594]"
                />
                {/* Morphing Gradient Core */}
                <motion.div
                  animate={{
                    rotate: [0, 90, 180, 270, 360],
                    borderRadius: ["40%", "60%", "40%", "60%", "40%"],
                    scale: [1, 1.15, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-3.5 h-3.5 bg-gradient-to-tr from-[#C59594] to-[#75708C] shadow-[0_0_12px_rgba(197,149,148,0.6)] z-10"
                />
              </div>

              {/* Text with interactive hover state */}
              <motion.span className="font-bold tracking-[0.2em] uppercase text-xs text-[#010101] group-hover:text-[#75708C] transition-colors duration-300">
                Reach Out
              </motion.span>

              {/* Subtle light reflection sweep on hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
            </motion.div>
            {/* Fluid Typography with Interactive Gradient "Together." */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-serif font-bold text-[#010101] leading-[1.15] mb-6">
              Let's <br className="hidden lg:block" /> Grow{" "}
              <br className="hidden lg:block" />{" "}
              <motion.span
                className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#C59594] via-[#75708C] to-[#C59594] bg-[length:200%_auto] cursor-default"
                animate={{
                  backgroundPosition: ["0% center", "200% center"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: [0, -1.5, 1.5, 0],
                  filter: "drop-shadow(0px 8px 16px rgba(197, 149, 148, 0.4))",
                }}
              >
                Together.
              </motion.span>
            </h1>

            <p className="text-[#75708C] text-base sm:text-lg max-w-sm mb-10 leading-relaxed">
              Whether you have a sprawling idea or just a tiny seed of a
              thought, we'd love to hear it. Drop us a line and let's make
              something PURE ALCHEMY!
            </p>
          </div>

          <div className="space-y-4 z-10 relative mt-auto">
            {/* Email Card */}
            <motion.a
              href="mailto:shoubailakhtar143@gmail.com"
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.5)" }}
              className="flex items-center gap-4 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-sm transition-colors group"
            >
              <div className="bg-white/60 p-2.5 rounded-full text-[#C59594] shrink-0">
                <Mail size={20} />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-[font2]-bold text-[#75708C] uppercase tracking-wider mb-0.5">
                  Email
                </h4>
                <p className="text-[#010101] font-[font1]-medium text-sm sm:text-base truncate">
                  shoubailakhtar143@gmail.com
                </p>
              </div>
            </motion.a>

            {/* Phone Card */}
            <motion.a
              href="tel:03408868220"
              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.5)" }}
              className="flex items-center gap-4 bg-white/40 backdrop-blur-md border border-white/60 p-4 rounded-2xl shadow-sm transition-colors group"
            >
              <div className="bg-white/60 p-2.5 rounded-full text-[#C59594] shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-[font2]-bold text-[#75708C] uppercase tracking-wider mb-0.5">
                  Phone
                </p>
                <p className="text-[#010101] font-medium-[font1] text-sm sm:text-base">
                  0340 8868220
                </p>
              </div>
            </motion.a>
          </div>
        </div>

        {/* RIGHT COLUMN: The Transparent Form */}
        <div
          ref={rightColRef}
          className="w-full lg:w-7/12 p-8 sm:p-10 lg:p-12 relative flex flex-col justify-center bg-white/10"
        >
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#010101] mb-2">
              Send a message
            </h2>
            <p className="text-[#75708C] text-sm">
              We usually reply within 12 hours.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 relative z-10 w-full max-w-md mx-auto"
          >
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-[font2]-medium text-[#010101] ml-2">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#75708C] group-focus-within:text-[#C59594] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/40 border border-white/60 rounded-full pl-11 pr-5 py-3.5 text-[#010101] placeholder-[#75708C]/50 focus:outline-none focus:ring-2 focus:ring-[#C59594]/50 focus:bg-white/60 transition-all duration-300 shadow-sm text-base"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-[font2]-medium text-[#010101] ml-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#75708C] group-focus-within:text-[#C59594] transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@gmail.com"
                  className="w-full bg-white/40 border border-white/60 rounded-full pl-11 pr-5 py-3.5 text-[#010101] placeholder-[#75708C]/50 focus:outline-none focus:ring-2 focus:ring-[#C59594]/50 focus:bg-white/60 transition-all duration-300 shadow-sm text-base"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-[font1]-medium text-[#010101] ml-2">
                Your Message
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-[#75708C] group-focus-within:text-[#C59594] transition-colors">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell us about your project..."
                  rows="4"
                  className="w-full bg-white/40 border border-white/60 rounded-3xl pl-11 pr-5 py-3.5 text-[#010101] placeholder-[#75708C]/50 focus:outline-none focus:ring-2 focus:ring-[#C59594]/50 focus:bg-white/60 transition-all duration-300 shadow-sm resize-none text-base"
                />
              </div>
            </div>
            {/* Fancy Custom Checkbox */}
            <label className="flex items-center gap-3 ml-2 py-1 cursor-pointer group w-fit">
              {/* Hidden native input for form validation */}
              <input type="checkbox" required className="peer sr-only" />

              {/* Custom Visual Checkbox */}
              <div className="w-4 h-4 rounded-full border border-white/60 bg-white/40 flex items-center justify-center transition-all duration-300 peer-checked:bg-[#010101] peer-checked:border-[#010101] group-hover:border-[#C59594] shadow-sm">
                {/* The Checkmark SVG */}
                <svg
                  className="w-3.5 h-3.5 text-white opacity-0 scale-50 transition-all duration-300 peer-checked:opacity-100 peer-checked:scale-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              {/* Text */}
              <span className="text-xs text-[#75708C] select-none group-hover:text-black transition-colors">
                I agree to the Terms of Service and Privacy Policy
              </span>
            </label>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: "#75708C" }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-[#010101] text-white font-semibold text-lg rounded-full py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#010101]/20 disabled:opacity-70 mt-4 group"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </span>
              ) : (
                <>
                  Send Message{" "}
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </motion.button>

            {/* Status Messages */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center justify-center gap-2 text-[#75708C] bg-white/60 border border-white/80 p-3 rounded-full mt-4 overflow-hidden"
                >
                  <CheckCircle size={18} className="shrink-0 text-green-600" />
                  <p className="font-medium text-sm">
                    Message sent successfully!
                  </p>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="flex items-center justify-center gap-2 text-[#C59594] bg-white/60 border border-white/80 p-3 rounded-full mt-4 overflow-hidden"
                >
                  <AlertCircle size={18} className="shrink-0 text-red-500" />
                  <p className="font-medium text-sm">
                    Oops! Something went wrong.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
