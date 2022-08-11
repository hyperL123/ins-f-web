import React from 'react'
import { Link } from 'react-router-dom'

const R_Box_SignUp = () => {
  return (
    <div className="BottomBox flex m-5">
      <div>Don't have an account?<Link to="/sign-up" className="text-blue-400 font-medium"> Sign up</Link></div>
      </div>
  )
}

export default R_Box_SignUp