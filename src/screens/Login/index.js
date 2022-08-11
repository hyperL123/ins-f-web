
import LoginGit from "./assets/login-gif.gif"

import React from 'react'
import './index.css'
import L_Image from "./components/L_Image";
import R_Box from "./components/R_Box";
import PageTitle from "../Shared/PageTitle";


const Login = () => {
  const inputCss = `bg-[#FAFAFA] border border-gray-200 rounded py-3 px-4 my-3`;
  const submitCss = `flex w-full border border-gray-200 bg-[#b2dffc] font-bold  rounded py-3 px-4 my-3`;

  return (
    
    <div className="flex h-screen bg-[#ededed] justify-center items-center">
       <PageTitle  title="Log in"/>      
      <L_Image />
      <R_Box />
    </div>
    
  )
}

export default Login