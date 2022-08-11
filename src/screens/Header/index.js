import React from 'react'
import { AiFillInstagram,AiOutlineHome,AiOutlineUser } from "react-icons/ai";
import { RiNavigationLine } from "react-icons/ri";
const Header = () => {
  return (
    <div className='flex max-w-4xl w-full justify-between items-center'>
        <div><AiFillInstagram/></div>
        <div className='flex flex-row'>
            <AiOutlineHome />
            <RiNavigationLine />
            <AiOutlineUser />
        </div>
    </div>
  )
}

export default Header