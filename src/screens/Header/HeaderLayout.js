import React from "react";
import Header from ".";

const HeaderLayout = ({ children }) => {
  return (
    <div className="flex h-screen   flex-col items-center ">
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
