import React from 'react'
import {Helmet} from 'react-helmet-async'
const HeaderTitle = ({title}) => {
  return (
    <div>
        <Helmet>
            <title>Instrgram | {title}</title>
        </Helmet>
        
    </div>
  )
}

export default HeaderTitle