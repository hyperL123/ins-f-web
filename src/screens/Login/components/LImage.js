import React from "react";
import LoginGif from "../assets/login-gif.gif";
const LImage = () => {
  return (
    <div className="m-4 hidden w-[16rem] items-center justify-center lg:flex">
      <img className="object-cover" alt="Image2" src={LoginGif} />
    </div>
  );
};

export default LImage;
