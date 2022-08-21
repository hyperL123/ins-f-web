import React from "react";

const Logo = ({ size = "text-3xl" }) => {
  const LOGO_CSS = `${size} instagramTitle`;
  return <p className={LOGO_CSS}>Instagram-Clone</p>;
};

export default Logo;
