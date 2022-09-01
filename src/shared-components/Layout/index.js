import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { showVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";

const Layout = ({ children }) => {
  let show = useReactiveVar(showVar);
  return (
    <div className="flex w-full flex-col items-center bg-[#FAFAFA]">
      <Header />
      {show && (
        <div className="m-4 w-full items-center bg-black  py-1 pl-6  font-semibold text-white">
          Post deleted
        </div>
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
