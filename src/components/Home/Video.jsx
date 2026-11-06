import React from "react";
import backro from "../../assets/backro.mp4";

const Video = () => {
  return (
    <div className="w-full h-full">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        src={backro}
      />
    </div>
  );
};
export default Video;
