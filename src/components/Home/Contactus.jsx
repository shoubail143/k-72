import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

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
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Sixty-Seventh Team",
        },
        EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // BACKGROUND: Soft Cream
    <div className="min-h-screen bg-[#F7F5EE] text-[#0F2E24] overflow-x-hidden relative font-sans flex items-center justify-center py-20 px-6 selection:bg-[#1D4B3E]/20">
      {/* --- COOLER & APPARENT BACKGROUND ANIMATIONS (Liquid Aurora) --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Shape 1: Large Top-Left Morphing Blob */}
        <motion.div
          animate={{
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "40% 60% 70% 30% / 40% 50% 60% 50%",
            ],
            rotate: [0, 90, 0],
            scale: [1, 1.1, 1],
            x: [0, 30, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#1D4B3E]/15 to-[#7C9A8E]/10 blur-[60px]"
        />

        {/* Shape 2: Bottom-Right Morphing Blob */}
        <motion.div
          animate={{
            borderRadius: [
              "50% 50% 30% 70% / 50% 60% 40% 50%",
              "30% 70% 50% 50% / 40% 50% 50% 60%",
              "50% 50% 30% 70% / 50% 60% 40% 50%",
            ],
            rotate: [0, -90, 0],
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, -60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-gradient-to-tl from-[#0F2E24]/10 to-[#A3B8B0]/20 blur-[80px]"
        />

        {/* Shape 3: Center Floating Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-[#1D4B3E]/5 rounded-full blur-[100px]"
        />

        {/* Tech/Architectural Grid Overlay for the "Cool" Factor */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#0F2E24 1px, transparent 1px), linear-gradient(90deg, #0F2E24 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* --- LEFT SIDE: Text & Contact Info --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-10"
        >
          <div>
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#1D4B3E]/10 text-[#1D4B3E] text-xs font-bold tracking-widest uppercase mb-6 border border-[#1D4B3E]/20">
              Get In Touch
            </span>
            <h1 className="text-6xl md:text-7xl font-black text-[#0F2E24] leading-[1.1] mb-6">
              Let's talk<span className="text-[#1D4B3E]">.</span>
            </h1>
            <p className="text-[#4A5E56] text-lg max-w-md leading-relaxed">
              Have a project in mind, or just want to say hi? Fill out the form
              and our team will get back to you within 24 hours.
            </p>
          </div>

          {/* Contact Cards Container */}
          <div className="flex flex-col gap-4">
            {/* Email Card */}
            <motion.a
              href="mailto:shoubailakhtar143@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-5 group cursor-pointer w-fit p-4 pr-8 rounded-2xl bg-white shadow-[0_8px_30px_rgb(15,46,36,0.04)] border border-[#1D4B3E]/10 hover:shadow-[0_8px_30px_rgb(15,46,36,0.1)] hover:border-[#1D4B3E]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F5EE] border border-[#1D4B3E]/10 flex items-center justify-center text-[#1D4B3E] group-hover:scale-110 group-hover:bg-[#1D4B3E] group-hover:text-white transition-all duration-300 shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#7C9A8E] font-bold tracking-widest uppercase mb-1">
                  Email me at
                </p>
                <p className="text-lg font-bold text-[#0F2E24] group-hover:text-[#1D4B3E] transition-colors">
                  shoubailakhtar143@gmail.com
                </p>
              </div>
            </motion.a>

            {/* Phone Card */}
            <motion.a
              href="tel:03408868220"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-5 group cursor-pointer w-fit p-4 pr-8 rounded-2xl bg-white shadow-[0_8px_30px_rgb(15,46,36,0.04)] border border-[#1D4B3E]/10 hover:shadow-[0_8px_30px_rgb(15,46,36,0.1)] hover:border-[#1D4B3E]/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#F7F5EE] border border-[#1D4B3E]/10 flex items-center justify-center text-[#1D4B3E] group-hover:scale-110 group-hover:bg-[#1D4B3E] group-hover:text-white transition-all duration-300 shadow-sm">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#7C9A8E] font-bold tracking-widest uppercase mb-1">
                  Call me at
                </p>
                <p className="text-lg font-bold text-[#0F2E24] group-hover:text-[#1D4B3E] transition-colors">
                  0340 8868220
                </p>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* --- RIGHT SIDE: THE FORM (Premium Cream Glass) --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(15,46,36,0.1)] border border-white relative overflow-hidden"
        >
          {/* Subtle inner top highlight */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#1D4B3E]/20 to-transparent" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 relative z-10"
          >
            <h2 className="text-2xl font-bold text-[#0F2E24] mb-2">
              Send a Message
            </h2>

            {/* Name Field */}
            <div className="relative group">
              <label className="text-sm font-bold text-[#7C9A8E] mb-2 block group-focus-within:text-[#1D4B3E] transition-colors">
                Your Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#F7F5EE] border-2 border-transparent focus:border-[#1D4B3E]/40 focus:bg-white rounded-2xl px-5 py-4 text-[#0F2E24] outline-none transition-all placeholder:text-[#7C9A8E]/50 shadow-inner"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="relative group">
              <label className="text-sm font-bold text-[#7C9A8E] mb-2 block group-focus-within:text-[#1D4B3E] transition-colors">
                Email Address
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#F7F5EE] border-2 border-transparent focus:border-[#1D4B3E]/40 focus:bg-white rounded-2xl px-5 py-4 text-[#0F2E24] outline-none transition-all placeholder:text-[#7C9A8E]/50 shadow-inner"
                placeholder="john@example.com"
              />
            </div>

            {/* Message Field */}
            <div className="relative group">
              <label className="text-sm font-bold text-[#7C9A8E] mb-2 block group-focus-within:text-[#1D4B3E] transition-colors">
                Project Details
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.01 }}
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-[#F7F5EE] border-2 border-transparent focus:border-[#1D4B3E]/40 focus:bg-white rounded-2xl px-5 py-4 text-[#0F2E24] outline-none transition-all resize-none placeholder:text-[#7C9A8E]/50 shadow-inner"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0F2E24] text-[#F7F5EE] font-bold py-4 rounded-2xl hover:bg-[#1D4B3E] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2 shadow-[0_10px_20px_-10px_rgba(15,46,36,0.4)]"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#F7F5EE]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
            </motion.button>
          </form>

          {/* Success/Error Message Overlay */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                className="absolute inset-0 z-20 flex items-center justify-center bg-[#F7F5EE]/90 p-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  {status === "success" ? (
                    <>
                      <div className="w-20 h-20 bg-[#1D4B3E]/10 text-[#1D4B3E] rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(29,75,62,0.1)]">
                        <svg
                          className="w-10 h-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0F2E24]">
                        Message Sent!
                      </h3>
                      <p className="text-[#4A5E56]">
                        We've received your email and will get back to you
                        shortly.
                      </p>
                      <button
                        onClick={() => setStatus(null)}
                        className="mt-4 text-[#1D4B3E] font-bold hover:underline"
                      >
                        Send another
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                        <svg
                          className="w-10 h-10"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0F2E24]">
                        Oops!
                      </h3>
                      <p className="text-[#4A5E56]">
                        Something went wrong. Please try again or email us
                        directly.
                      </p>
                      <button
                        onClick={() => setStatus(null)}
                        className="mt-4 text-[#1D4B3E] font-bold hover:underline"
                      >
                        Try again
                      </button>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
