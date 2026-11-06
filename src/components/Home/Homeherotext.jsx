import React from "react";
import Video from "./Video";

const Homeherotext = () => {
  return (
    <div className="font-[font1] text-white mt-0 text-center flex flex-col gap-2">
      <div className="text-[9.5vh] flex item-center justify-center uppercase leading-none">
        L'étincelle
      </div>
      <div className="text-[8.5vh] uppercase flex items-center justify-center leading-none">
        qui
        <div className="h-[10vh] rounded-full overflow-hidden">
          <Video />
        </div>
        génère
      </div>
      <div className="relative inline-flex items-center justify-center px-10 py-4 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] hover:scale-105 hover:bg-white/10 transition-all duration-500 cursor-default group mt-4">
        {/* Animated background glow that appears on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>

        <div className="relative z-10 text-[8.5vh] uppercase leading-none font-bold text-white tracking-wide">
          la créativité!
        </div>
      </div>
    </div>
  );
};

export default Homeherotext;
