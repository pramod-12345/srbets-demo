import React from 'react'
import { useSelector } from 'react-redux';

const Container = ({children}) => {
  const { isLiveIframeFull } = useSelector((state) => state?.dashboard);
  return (
    <div className={`${isLiveIframeFull ? 'px-0 py-0' : 'px-4 py-6 sm:p-8'} container mx-auto max-w-[1120px]`}>
      {children}
    </div>
  )
}

export default Container
