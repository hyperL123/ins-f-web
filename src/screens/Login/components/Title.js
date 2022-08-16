import React from "react";

const Title = ({ size = "text-3xl" }) => {
  const TITLE_CSS = `${size} instagramTitle`;
  return <p className={TITLE_CSS}>Instagram-Clone</p>;
};

export default Title;
