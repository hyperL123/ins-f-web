import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="BottomBox m-5 flex">
      <div>
        Don't have an account?
        <Link to="/sign-up" className="font-medium text-blue-400">
          {" "}
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
