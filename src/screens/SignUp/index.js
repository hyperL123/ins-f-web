import React from "react";
import PageTitle from "../Shared/PageTitle";
import Box from "./componments/Box";

const SignUp = () => {
  return (
    <div className=" bg-gray-100">
      <div className="flex h-screen items-center justify-center">
        <PageTitle title="Sign Up" />
        <Box />
      </div>
    </div>
  );
};

export default SignUp;
