import React from "react";
import PageTitle from "../Shared/PageTitle";
import Box from "./componments/Box";

const SignUp = () => {
  return (
    <div className="h-full bg-gray-100 p-3">
      <div className="flex items-center justify-center">
        <PageTitle title="Sign Up" />
        <Box />
      </div>
    </div>
  );
};

export default SignUp;
