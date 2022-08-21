import React from "react";

import ForgotPW from "./ForgotPW";
import GetTheApp from "./GetTheApp";
import RInPut from "./RInPut";
import LoginFacebook from "./LoginFacebook";
import ORBanner from "./OrBanner";
import SignUp from "./SignUp";
import Logo from "../../../shared-components/Logo";
const RBox = () => {
  const items = { item1: "Phone number, username, or email", item2: "Pasword" };
  return (
    <div className="m-4 flex w-30rem flex-col items-center justify-center bg-[white]">
      <Logo />
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
