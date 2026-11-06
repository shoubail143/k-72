import React from "react";
import Agencehero from "./Agencehero.jsx";
import Manifesto from "./Manifesto.jsx";
import Afterfesto from "./Afterfesto.jsx";
import AgenceTeam from "./AgenceTeam.jsx";

const Agence = () => {
  return (
    <main className="bg-[#0a0a0a] min-h-screen">
      <Agencehero />
      <Manifesto />
      <Afterfesto />
      <AgenceTeam />
    </main>
  );
};
export default Agence;
