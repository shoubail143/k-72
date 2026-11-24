import Video from "./Video.jsx";
import Homeherotext from "./Homeherotext.jsx";
import Testimonials from "./Testimonials.jsx";
import Bottomtext from "./Bottomtext.jsx";
import Homemain from "./Homemain.jsx";
import Aboutus from "./Aboutus.jsx";

const Home = () => {
  return (
    <div>
      {/* Changed h-screen w-screen to h-[100dvh] w-full. dvh prevents mobile address bar glitches */}
      <div className="relative h-[100dvh] w-full overflow-hidden bg-black">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {/* Added object-cover to the video wrapper if your Video component doesn't have it */}
          <div className="w-full h-full object-cover">
            <Video />
          </div>
        </div>

        {/* Mobile Gradient Overlay: Makes text pop on mobile */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 md:from-transparent md:to-transparent pointer-events-none" />

        {/* Hero Text Container */}
        {/* Changed pt-[8vh] to pt-[15vh] md:pt-[8vh] so it centers better on mobile */}
        <div className="absolute inset-0 z-10 flex justify-center pt-[15vh] md:pt-[8vh] text-center px-4">
          <Homeherotext />
        </div>

        {/* Bottom Text */}
        <div className="absolute inset-x-0 bottom-[5vh] z-10 flex justify-center px-4">
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
