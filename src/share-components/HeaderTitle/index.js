import React from "react";
import { Helmet } from "react-helmet-async";
const HeaderTitle = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>Instagram | {title}</title>
      </Helmet>
    </div>
  );
};

export default HeaderTitle;
