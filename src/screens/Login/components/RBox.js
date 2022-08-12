import React from "react";

import ForgotPW from "./ForgotPW";
import GetTheApp from "./GetTheApp";
import RInPut from "./RInPut";
import LoginFacebook from "./LoginFacebook";
import ORBanner from "./OrBanner";
import SignUp from "./SignUp";
import Title from "./Title";
const RBox = () => {
  const items = { item1: "Phone number, username, or email", item2: "Pasword" };
  return (
    <div className="m-4 flex w-128 flex-col items-center justify-center bg-[white]">
      <Title />
      <RInPut items={items} />
      <ORBanner />
      <LoginFacebook />
      <ForgotPW />
      <SignUp />
      <GetTheApp />
    </div>
  );
};

export default RBox;
