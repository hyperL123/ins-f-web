import React from "react";
import { AiFillInstagram, AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { RiNavigationLine } from "react-icons/ri";
import { isLoggedInVar } from "../../apollo";
import { useReactiveVar } from "@apollo/client";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Title from "../../screens/Login/components/Title";
import Avatar from "../Avatar"
const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log("inside the Header islogin", isLoggedIn);
  const { data } = useUser();
  const buttonCss = `rounded-md px-4 py-15 text-white font-semibold`;
  return (
    <div className="flex w-full justify-between border-b bg-[#FFFFFF] p-5">
      <div>
        <Title size={"text-3xl"} />
      </div>

      {isLoggedIn ? (
        <div className=" flex flex-row">
          <AiOutlineHome className="ml-4" size={"2rem"} />
          <RiNavigationLine className="ml-4" size={"2rem"} />
          <Link className="ml-4" to={`/users/${data?.me?.userName}`}>
            <Avatar url={data?.me?.avatar} />
          </Link>
        </div>
      ) : (
        <div className="m-x-3 flex">
          <Link to="/login">
            <button className={buttonCss}>Log in</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
