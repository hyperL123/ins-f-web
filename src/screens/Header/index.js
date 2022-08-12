import React from "react";
import { AiFillInstagram, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { RiNavigationLine } from "react-icons/ri";
import { isLoggedInVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Avatar from "../../uilities/Avatar";
const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("inside the Header islogin", isLoggedIn);
  const { data } = useUser();
  const buttonCss = `rounded-md px-4 py-15 text-white font-semibold`;
  return (
    <div className="flex h-20 w-full max-w-4xl items-center justify-between">
      <div className="items-center justify-between">
        <AiFillInstagram />
      </div>
      <div className="flex flex-row items-center justify-between">
        {isLoggedIn ? (
          <>
            <AiOutlineHome />
            <RiNavigationLine />
            <Avatar url={data?.me?.avatar} />
          </>
        ) : (
          <Link to="/login">
            <button className={buttonCss}>Log in</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
