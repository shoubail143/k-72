import Video from "./Video";

const Homeherotext = () => {
  return (
    <div className="font-[font1] text-white mt-0 text-center flex flex-col items-center gap-2 md:gap-4 w-full max-w-5xl mx-auto">
      {/* 
        Responsive Font Sizing using clamp()
        clamp(minimum, preferred, maximum)
        On mobile it's ~10vw, on desktop it stops at ~10rem
      */}
      <div className="text-[clamp(2.5rem,10vw,9.5rem)] flex items-center justify-center uppercase leading-none w-full">
        L'étincelle
      </div>

      <div className="text-[clamp(2rem,8vw,8.5rem)] uppercase flex flex-wrap items-center justify-center leading-none gap-2 md:gap-4 w-full">
        <span>qui</span>

        {/* The Inline Video Pill */}
        {/* Used clamp to scale the height and width smoothly */}
        <div className="h-[clamp(3rem,10vw,10rem)] w-[clamp(5rem,20vw,18rem)] rounded-full overflow-hidden border border-white/20 shadow-2xl relative shrink-0">
          <Video />
        </div>

        <span>génère</span>
      </div>

      {/* The Button/Pill at the bottom */}
      <div className="relative inline-flex items-center justify-center px-6 md:px-10 py-3 md:py-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:scale-105 hover:bg-white/10 transition-all duration-500 cursor-default group mt-4 md:mt-8 w-[95%] md:w-auto overflow-hidden">
        {/* Animated background glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none"></div>

        <div className="relative z-10 text-[clamp(1.5rem,6vw,4.5rem)] uppercase leading-none font-bold text-white tracking-wide whitespace-nowrap">
          la créativité!
        </div>
      </div>
    </div>
  );
};

export default Homeherotext;
