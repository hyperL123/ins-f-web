import React from 'react'
import { isLoggedInVar, logUserOut } from '../apollo'

const Home = () => {
  return (
    <>
    <div>Home</div>
    <button onClick={()=>logUserOut()}>Log Out Now!</button>
   </>
  )
}
export default Home