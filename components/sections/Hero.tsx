// "use client";

// import React from "react";

// const HeroSection = () => {
//   // Custom Cursor

//   return (
//     <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white">
//       {/* Video Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <video
//           autoPlay
//           playsInline
//           loop
//           muted
//           className="absolute w-full h-full object-cover rotate-180"
//         >
//           <source
//             src="https://assets.codepen.io/319606/tactus-waves-hero-sm.mp4"
//             type="video/mp4"
//           />
//         </video>
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
//         <h1 className="text-[8vw] font-extrabold mix-blend-difference leading-tight">
//           Innovating <br /> Software Solutions
//         </h1>
//         <p className="mt-6 text-lg max-w-xl">
//           We craft cutting-edge software tailored to your business needs. From
//           scalable web applications to intelligent automation, we turn complex
//           challenges into seamless digital experiences.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;
"use client";

import React from "react";

const HeroSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Video that fills the text */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover rotate-180  [mask-image:linear-gradient(black,black)] [mask-composite:intersect] [-webkit-mask-image:linear-gradient(black,black)] [-webkit-mask-composite:destination-in] video-mask"
      >
        <source
          src="https://assets.codepen.io/319606/tactus-waves-hero-sm.mp4"
          type="video/mp4"
        />
      </video>

      {/* The big text which acts as the mask */}
      <h1 className="text-[10vw] font-extrabold leading-tight text-white relative z-10 mix-blend-difference text-center">
        Where Creativity <br /> & Strategy Meet
      </h1>

      <style jsx>{`
        .video-mask {
          -webkit-mask-image: text;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-position: center;
          -webkit-mask-size: cover;
          -webkit-mask-composite: destination-in;
          mask-image: text;
          mask-repeat: no-repeat;
          mask-position: center;
          mask-size: cover;
          mask-composite: intersect;
        }
      `}</style>
    </div>
  );
};

export default HeroSection;
