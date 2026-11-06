import React from "react";

const ExpertiseSection = () => {
  const expertiseList = [
    "Strategy",
    "Advertisement",
    "Branding",
    "Design",
    "Content",
  ];

  return (
    <section className="w-full bg-white text-[#0a0a0a] py-24 md:py-32 px-6 md:px-12 lg:px-20 font-sans relative z-20">
      <div className="max-w-[90rem] mx-auto">
        {/* --- TOP PART: Mega Expertise List --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 mb-20 md:mb-32">
          {/* Left Column: The Label */}
          <div className="md:col-span-4 lg:col-span-3">
            <h3 className="inline-block bg-black text-white text-sm md:text-base font-bold tracking-widest uppercase px-4 py-2 -rotate-3 hover:rotate-0 transition-transform duration-300 cursor-default mt-2">
              Expertise
            </h3>
          </div>

          {/* Right Column: The Massive List */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col">
            {expertiseList.map((item, index) => (
              <div
                key={index}
                className="group flex items-center justify-between border-b border-gray-200 py-2 md:py-4 cursor-pointer overflow-hidden transition-all duration-300 hover:border-black"
              >
                <h2 className="text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter transition-transform duration-500 ease-out group-hover:translate-x-4">
                  {item}
                </h2>
                {/* A cool hover arrow that only appears when you mouse over */}
                <span className="text-3xl md:text-5xl opacity-0 -translate-x-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-600">
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* --- MIDDLE DIVIDER --- */}
        <div className="w-full h-px bg-gray-300 mb-16 md:mb-24"></div>

        {/* --- BOTTOM PART: Three Paragraphs --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {/* Paragraph 1 */}
          <div className="flex flex-col">
            <p className="text-xl md:text-2xl font-medium leading-[1.4] tracking-tight">
              Our projects are born in humility, grow in curiosity and live
              thanks to{" "}
              <span className="relative inline-block px-1 mx-1 z-10">
                {/* The highlight background */}
                <span className="absolute inset-0 top-1.5 bottom-0.5 bg-[#FFD166] -skew-x-6 -z-10 rounded-sm transform"></span>
                <span className="relative font-bold text-black">
                  creativity
                </span>
              </span>{" "}
              in all its forms.
            </p>
          </div>

          {/* Paragraph 2 */}
          <div className="flex flex-col">
            <p className="text-xl md:text-2xl font-medium leading-[1.4] tracking-tight">
              Our creative process thrives in an environment where talent is
              encouraged to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400 font-black text-2xl md:text-3xl inline-block -translate-y-1">
                explode.
              </span>{" "}
              Where we feel free to be the{" "}
              <span className=" font-extrabold font-serif text-gray-800 text-2xl md:text-3xl">
                best version
              </span>{" "}
              of ourselves.
            </p>
          </div>

          {/* Paragraph 3 */}
          <div className="flex flex-col">
            <p className="text-xl md:text-2xl font-medium leading-[1.4] tracking-tight">
              Our culture is openness to others.{" "}
              <span className="text-2xl md:text-3xl font-black text-blue-600 inline-block align-middle mx-1 tracking-tighter">
                Period.
              </span>{" "}
              The entire crew participates in building an agency we are{" "}
              <span className="inline-block bg-black text-white px-2 py-1 mt-2 -rotate-2 transform font-bold tracking-tight hover:rotate-0 transition-transform duration-300 cursor-default">
                proud of.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
