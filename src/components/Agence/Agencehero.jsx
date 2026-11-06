import React from "react";

const AgenceHero = () => {
  return (
    <>
      {/* 
        THE ANIMATIONS 
        We created 4 different "blob" keyframes to make the movement feel random.
      */}
      <style>
        {`
          @keyframes fade-up {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes subtle-drift {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          
          /* Random paths for the glowing orbs */
          @keyframes blob-1 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            25% { transform: translate(40vw, 20vh) scale(1.2); }
            50% { transform: translate(10vw, -30vh) scale(0.8); }
            75% { transform: translate(-20vw, 10vh) scale(1.1); }
          }
          @keyframes blob-2 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(-30vw, -20vh) scale(1.3); }
            66% { transform: translate(20vw, 40vh) scale(0.9); }
          }
          @keyframes blob-3 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            50% { transform: translate(-40vw, 30vh) scale(1.4); }
            75% { transform: translate(30vw, -10vh) scale(0.7); }
          }
          @keyframes blob-4 {
            0%, 100% { transform: translate(0px, 0px) scale(1); }
            40% { transform: translate(30vw, -40vh) scale(1.1); }
            80% { transform: translate(-20vw, -20vh) scale(1.3); }
          }
        `}
      </style>

      {/* 1. The Main Section (Pure Black to make the colors glow) */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050505] p-8 overflow-hidden">
        {/* --- THE RANDOMLY MOVING YELLOW/ORANGE BACKGROUND --- */}
        {/* Removed the grid overlay to keep it clean as requested */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Orb 1: Deep Orange */}
          <div className="absolute top-[20%] left-[20%] w-[35vw] h-[35vw] bg-orange-600/40 rounded-full mix-blend-screen filter blur-[100px] animate-[blob-1_18s_ease-in-out_infinite]"></div>

          {/* Orb 2: Golden Yellow */}
          <div className="absolute bottom-[20%] right-[20%] w-[40vw] h-[40vw] bg-amber-400/30 rounded-full mix-blend-screen filter blur-[120px] animate-[blob-2_22s_ease-in-out_infinite]"></div>

          {/* Orb 3: Bright Yellow */}
          <div className="absolute top-[10%] right-[10%] w-[25vw] h-[25vw] bg-yellow-300/30 rounded-full mix-blend-screen filter blur-[90px] animate-[blob-3_15s_ease-in-out_infinite]"></div>

          {/* Orb 4: Deep Red/Orange for contrast */}
          <div className="absolute bottom-[10%] left-[10%] w-[30vw] h-[30vw] bg-red-500/20 rounded-full mix-blend-screen filter blur-[110px] animate-[blob-4_25s_ease-in-out_infinite]"></div>
        </div>

        {/* --- THE TEXT CONTENT --- */}
        <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 text-center mt-[-5vh]">
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-extralight tracking-tighter text-white animate-[fade-up_1.5s_ease-out_forwards] drop-shadow-2xl">
            Sixty-seventh
          </h1>

          <div className="flex items-center gap-4 animate-[fade-up_1.5s_ease-out_0.3s_forwards] opacity-0">
            <div className="h-[1px] w-12 bg-orange-200/50 hidden md:block"></div>
            <h2 className="text-2xl md:text-4xl font-light tracking-[0.2em] text-orange-50 uppercase animate-[subtle-drift_6s_ease-in-out_infinite]">
              Twelve
            </h2>
            <div className="h-[1px] w-12 bg-orange-200/50 hidden md:block"></div>
          </div>
        </div>

        {/* --- SUBTITLE --- */}
        <div className="absolute bottom-12 left-0 w-full text-center z-10 animate-[fade-up_1.5s_ease-out_0.6s_forwards] opacity-0">
          <p className="text-xs md:text-sm tracking-[0.3em] text-orange-200/60 uppercase">
            Independent Creative Agency
          </p>
        </div>
      </section>
    </>
  );
};

export default AgenceHero;
