import React from 'react'

const Seperator = ({hidden='block', isTheme}) => {
  return (
    <hr className={`${isTheme ? "bg-black" : "bg-oxfordBlue"} w-full h-px opacity-30 ${hidden}`} />
  )
}

export default Seperator
