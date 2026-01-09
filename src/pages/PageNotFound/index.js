import { odds777 } from 'assets'
import { CommonButton, Typography } from 'components'
import { ToastProvider } from 'hooks'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate();
    return (
        <ToastProvider>
        <div className="flex items-center bg-themeBlack justify-center  h-screen text-center">
            <div className="flex flex-col justify-center items-center gap-6">
                <img src={odds777} alt='Loader' className='h-12' />
                <div>
                    <div>
                        <Typography
                            color="vintageRibbon"
                            content="Oops! Page Not Found"
                            variant="size20Semibold"
                        />
                    </div>
                    <div>
                        <Typography
                            color="vintageRibbon"
                            content="The page you're looking for doesn't exist or has been moved."
                            variant="size16Regular"
                        />
                    </div>
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

export default PageNotFound