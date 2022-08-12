import React from "react";
import { AiFillFacebook } from "react-icons/ai";
const LoginFaceBook = () => {
  return (
    <div className="m-4 flex items-center justify-center font-medium text-blue-900">
      <AiFillFacebook className="inline-flex" size={28} fill="#4267B2" />{" "}
      &nbsp;Log in with Facebook&nbsp;
    </div>
  );
};

export default LoginFaceBook;
