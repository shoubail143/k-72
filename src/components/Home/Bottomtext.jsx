import React from "react";
import { Link } from "react-router-dom";

const Bottomtext = () => {
  return (
    <div className="flex items-center gap-6 text-white">
      <Link
        to="/projects"
        className="min-w-32 rounded-full border-2 border-white/80 px-7 py-3 text-center text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Projects
      </Link>
      <Link
        to="/agence"
        className="min-w-32 rounded-full border-2 border-white/80 px-7 py-3 text-center text-sm font-medium uppercase tracking-[0.18em] transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        Agence
      </Link>
    </div>
  );
};

export default Bottomtext;
