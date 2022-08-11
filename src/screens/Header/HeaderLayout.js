import React from 'react'
import Header from '.'

const HeaderLayout = ({children}) => {
  return (
    <div className='flex flex-col items-center'>
    <Header />
    {children}
    </div>
  )
}

export default HeaderLayout