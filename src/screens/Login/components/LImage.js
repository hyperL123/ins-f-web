import React from "react";
import LoginGit from "../assets/login-gif.gif";
const LImage = () => {
  return (
    <div className="m-4 hidden w-80 items-center justify-center lg:flex">
      <img className="h-5/6 object-cover" alt="Image2" src={LoginGit} />
    </div>
  );
};

export default LImage;
