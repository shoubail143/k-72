import React, { useState, useEffect } from "react";

const ManifestoSection = () => {
  // Remember to put real image paths here!
  const images = ["/Uncle1.jpg", "/photo5.jpg", "/photo6.png"];

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("manifesto-section");
      if (!section) return;

      const rect = section.getBoundingClientRect();

      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        const scrollProgress = Math.abs(rect.top);
        const scrollThreshold = window.innerHeight / images.length;

        const newImageIndex = Math.min(
          Math.floor(scrollProgress / scrollThreshold),
          images.length - 1,
        );
        setActiveImage(newImageIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [images.length]);

  return (
    <section
      id="manifesto-section"
      className="relative bg-white w-full h-[300vh] text-black"
    >
      {/* 
        THE STICKY CONTAINER 
        We changed this to a two-column grid on desktop (md:grid-cols-2).
        On mobile, it stacks vertically.
      */}
      <div className="sticky top-0 h-screen w-full grid grid-cols-1 md:grid-cols-2 z-20 pointer-events-none">
        {/* LEFT COLUMN: The Image */}
        <div className="flex items-center justify-center p-4 md:p-8 pointer-events-auto h-full">
          <div className="relative w-full max-w-[400px] h-[55vh] md:h-[65vh] rounded-2xl overflow-hidden shadow-2xl">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Manifesto ${index}`}
                // CHANGED: object-center to object-top
                className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ease-in-out ${
                  index === activeImage ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Empty space for the sticky container, so the image stays on the left */}
        <div className="hidden md:block"></div>
      </div>
      {/* SCROLLING TEXT */}
      {/* 1. Removed h-full and justify-center so it flows naturally from the top */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        {/* 2. Added pt-[18vh] to perfectly align the top of the text with the top of your centered image */}
        <div className="w-full md:w-1/2 md:ml-auto px-6 md:px-16 lg:px-24 pt-[18vh] pb-[20vh]">
          {/* --- FIRST PARAGRAPH --- */}
          {/* Reduced the massive gap from 60vh to 40vh so it doesn't feel empty */}
          <p className="font-sans font-extralight text-[9vw] md:text-[3.5vw] leading-[1.1] tracking-tighter text-[#0a0a0a] mix-blend-multiply opacity-90 text-left mb-[40vh]">
            Our curiosity fuels our creativity. We remain humble and say no to
            big egos, even yours. A brand is alive. It has values, a
            personality, a history. That's why we're committed to providing
            perspective, to building influential brands.
          </p>

          {/* --- SECOND PARAGRAPH --- */}
          <div className="relative">
            <span className="absolute -top-12 -left-6 text-[10vw] text-gray-200 font-serif leading-none -z-10 opacity-50">
              "
            </span>

            <p className="font-sans font-extralight text-[9vw] md:text-[3.5vw] leading-[1.1] tracking-tighter text-[#0a0a0a] mix-blend-multiply opacity-90 text-left">
              We believe in the power of{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                collaboration.
              </span>{" "}
              Great ideas don't happen in a vacuum; they are born from{" "}
              <span className="relative inline-block px-1 mx-1 z-10">
                <span className="absolute inset-0 top-1 bottom-0.5 bg-[#FFD166] -skew-x-6 -z-10 rounded-sm"></span>
                <span className="relative font-medium text-black">
                  diverse perspectives
                </span>
              </span>{" "}
              clashing and combining to create something entirely new.
              <br />
              <br />
              <span className=" font-serif font-bold text-2xl md:text-4xl  text-gray-700">
                We don't just build websites.
              </span>{" "}
              We build digital ecosystems that challenge the status quo.{" "}
              <span className="inline-block bg-[#0a0a0a] text-white px-3 py-1 mt-4 mb-2 transform -rotate-3 font-bold tracking-tight hover:rotate-0 transition-transform duration-300">
                Let's make it iconic.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
