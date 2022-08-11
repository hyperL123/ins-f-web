import React from 'react'

import R_Box_ForgotPW from './R_Box_ForgotPW';
import R_Box_GetTheApp from './R_Box_GetTheApp';
import R_Box_InPut from './R_Box_InPut';
import R_Box_LogFaceBook from './R_Box_LogFaceBook';
import R_Box_OR from './R_Box_OR';
import R_Box_SignUp from './R_Box_SignUp';
import R_Box_Title from './R_Box_Title';
const R_Box = () => {
    const items = {item1:"Phone number, username, or email", item2:"Pasword"}
  return (
    <div className="flex flex-col items-center justify-center bg-[white] w-128 m-4">
    <R_Box_Title />
    <R_Box_InPut items={items}/>
    <R_Box_OR/>
    <R_Box_LogFaceBook/>
    <R_Box_ForgotPW />
    <R_Box_SignUp />
    <R_Box_GetTheApp />
   </div>
  )
}

export default R_Box