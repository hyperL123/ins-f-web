import React from "react";
import "./index.css";
import LImage from "./components/LImage";
import RBox from "./components/RBox";
import PageTitle from "../Shared/PageTitle";

const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-[#ededed]">
      <PageTitle title="Log in" />
      <LImage />
      <RBox />
    </div>
  );
};

export default Login;
