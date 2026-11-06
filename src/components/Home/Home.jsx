import React from "react";
import Video from "./Video.jsx";
import Homeherotext from "./Homeherotext.jsx";
import Testimonials from "./Testimonials.jsx";
import Bottomtext from "./Bottomtext.jsx";
import Homemain from "./Homemain.jsx";
import Aboutus from "./Aboutus.jsx";

const Home = () => {
  return (
    <div>
      <div className="relative h-screen w-screen overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <Video />
        </div>
        <div className="absolute inset-0 z-10 flex justify-center pt-[8vh] text-center">
          <Homeherotext />
        </div>
        <div className="absolute inset-x-0 bottom-[5vh] z-10 flex justify-center">
          <Bottomtext />
        </div>
      </div>
      <Homemain />
      <Testimonials />
      <Aboutus />
    </div>
  );
};

export default Home;
