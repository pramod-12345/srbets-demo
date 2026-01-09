import React from 'react'

const Badge = ({children, color}) => {
  return (
    <div className={`bg-${color} px-3 rounded-[10px]`}>
        {children}
    </div>
  )
}

export default Badge
