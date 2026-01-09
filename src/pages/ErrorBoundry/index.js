import { odds777 } from 'assets'
import { CommonButton, Typography } from 'components'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorHandler = ({resetErrorBoundary}) => {
  const navigate = useNavigate()

  const handleNavigate = () => {
    resetErrorBoundary(); 
    navigate('/');
  }

  return (
    <div className="flex items-center bg-themeBlack justify-center  h-screen text-center">
    <div className="flex flex-col justify-center items-center gap-6">
        <img src={odds777} alt='Loader' className='h-12' />
        <div>
            <Typography
            color={"vintageRibbon"}
            content={"Something went wrong. Please try again!!"}
            variant={"size20Semibold"}
            />
        </div>
        <CommonButton
            label={"Return to Home Page"}
            btnType={"outline"}
            bgColor="bg-secondary"
            onClick={handleNavigate} />
    </div>
</div>
  )
}

export default ErrorHandler