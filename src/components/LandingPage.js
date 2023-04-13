import React from "react";
import backgroundImage from "./../assets/home.png";

const LandingPage = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        ></div>
      </div>
      <h1 className="text-black font-normal font-fell-french-canon absolute text-4xl md:text-6xl lg:text-9xl">
        CLEOPATRA
      </h1>
    </div>
  );
};

export default LandingPage;
