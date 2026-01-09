import { odds777 } from 'assets';
import { CommonButton, Typography } from 'components';
import { ToastProvider } from 'hooks';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ServerError = () => {
    const navigate = useNavigate();
    return (
        <ToastProvider>
        <div className="flex items-center bg-themeBlack justify-center  h-screen text-center">
            <div className="flex flex-col justify-center items-center gap-6">
                <img src={odds777} alt='Loader' className='h-12' />
                <div>
                    <Typography
                        color="vintageRibbon"
                        content="Oops! Something went wrong on our end. Please try again shortly."
                        variant="size16Regular"
                    />
                </div>
                <CommonButton
                    label={"Return to Home Page"}
                    btnType={"outline"}
                    bgColor="bg-secondary"
                    onClick={() => navigate("/")} />
            </div>
        </div>
     </ToastProvider>
    )
}

export default ServerError