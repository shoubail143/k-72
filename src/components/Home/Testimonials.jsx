import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

const Testimonial = () => {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const reviews = [
    {
      name: "Sarah Miller",
      country: "United States",
      text: "The 3D configurator has been a game-changer for our furniture line. Customer engagement is up, and we've seen a noticeable decrease in product-related returns.",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Thomas Wright",
      country: "Australia",
      text: "Work was finished ahead of schedule and the quality is top-tier. Highly recommended for any brand looking to modernize their shopping experience.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Elena Rossi",
      country: "Italy",
      text: "Incredible execution! The interactive features are smooth and intuitive. It's exactly what we needed to showcase our custom leather goods.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "David Chen",
      country: "Singapore",
      text: "The attention to detail is unmatched. Our conversion rates have skyrocketed since integrating the new 3D UI. An absolute pleasure to work with.",
      img: "https://randomuser.me/api/portraits/men/85.jpg",
    },
    {
      name: "Amira Hassan",
      country: "UAE",
      text: "A seamless blend of art and technology. They understood our brand vision immediately and translated it into a stunning digital experience.",
      img: "https://randomuser.me/api/portraits/women/90.jpg",
    },
    {
      name: "Lucas Meyer",
      country: "Germany",
      text: "Fast, reliable, and incredibly creative. The team at Sixty-Seventh exceeded all our expectations. We will definitely be working together again.",
      img: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];

  // 1. AUTO-PLAY LOGIC
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 4000); // Changes every 4 seconds
    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  // 2. GSAP SLIDER ANIMATION
  useEffect(() => {
    // Width of card + gap (approx). Adjust if you change card sizes.
    const cardWidth = 420;
    gsap.to(trackRef.current, {
      x: -activeIndex * cardWidth,
      duration: 0.8,
      ease: "power3.inOut",
    });
  }, [activeIndex]);

  // 3. 3D BACKGROUND ANIMATIONS
  useEffect(() => {
    // Rotate the 3D shapes continuously
    gsap.to(".shape-1", {
      rotationY: 360,
      rotationX: 360,
      duration: 20,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(".shape-2", {
      rotationY: -360,
      rotationZ: 360,
      duration: 25,
      repeat: -1,
      ease: "linear",
    });
    gsap.to(".shape-3", {
      rotationX: -360,
      rotationY: 360,
      duration: 15,
      repeat: -1,
      ease: "linear",
    });

    // Mouse parallax for the shapes
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".bg-shapes-wrapper", {
        x: x,
        y: y,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDashClick = (index) => {
    setActiveIndex(index);
    setIsPaused(true); // Pause auto-play when user interacts
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };

  return (
    <section className="relative w-full bg-[#f9f9f9] py-24 md:py-32 overflow-hidden">
      {/* --- 3D BACKGROUND SHAPES --- */}
      <div className="bg-shapes-wrapper absolute inset-0 z-0 pointer-events-none flex justify-center items-center">
        {/* Shape 1 */}
        <div className="shape-1 absolute top-[20%] left-[10%] w-32 h-32 border border-black/5 rounded-xl"></div>
        {/* Shape 2 */}
        <div className="shape-2 absolute bottom-[20%] right-[15%] w-48 h-48 border border-black/5 rotate-45"></div>
        {/* Shape 3 */}
        <div className="shape-3 absolute top-[40%] right-[30%] w-24 h-24 border border-black/5 rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-[90rem] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24 px-6">
          <span className="text-xs md:text-sm font-bold tracking-[0.3em] uppercase text-gray-500 mb-4">
            Testimonials
          </span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-black flex items-center gap-3">
            Client{" "}
            <span className="font-serif italic font-light text-gray-400">
              Reviews
            </span>
          </h2>
        </div>

        {/* --- SLIDER CONTAINER --- */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradient Fades */}
          <div className="absolute top-0 left-0 w-24 md:w-64 h-full bg-gradient-to-r from-[#f9f9f9] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-24 md:w-64 h-full bg-gradient-to-l from-[#f9f9f9] to-transparent z-20 pointer-events-none"></div>

          {/* The Moving Track */}
          <div
            ref={trackRef}
            className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-24"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`group relative w-[85vw] sm:w-[380px] md:w-[400px] bg-white rounded-[2rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] flex-shrink-0 flex flex-col justify-between transition-all duration-500 ${
                  activeIndex === index
                    ? "scale-100 opacity-100 shadow-xl"
                    : "scale-95 opacity-60 grayscale-[30%]"
                }`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm">
                      <img
                        src={review.img}
                        alt={review.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-400 font-medium">
                        {review.country}
                      </p>
                    </div>
                  </div>

                  {/* 5 Gold Stars */}
                  <div className="flex gap-1 mb-6 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed italic mb-6">
                    "{review.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- FUNCTIONAL DASHES --- */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDashClick(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                activeIndex === index
                  ? "w-10 bg-black" // Active Dash (Long and Black)
                  : "w-4 bg-gray-300 hover:bg-gray-400" // Inactive Dash (Short and Gray)
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
