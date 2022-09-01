import React from "react";
import "./index.css";
import LImage from "./components/LImage";
import RBox from "./components/RBox";
import PageTitle from "../Shared/PageTitle";
import Footer from "../../shared-components/Layout/Footer";

const Login = () => {
  return (
    <div className="h-full w-full bg-gray-100 pt-20 pb-3">
      <div className="flex items-center justify-center pb-3">
        <PageTitle title="Log in" />
        <LImage />
        <RBox />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
