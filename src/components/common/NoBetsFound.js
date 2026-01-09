import React, { useContext } from 'react'
import { noBetFound } from 'assets'
import Typography from './typography'
import { useLocation } from 'react-router-dom'
import { ThemeContext } from 'context/ThemeProvider'

const NoBetsFound = ({title, isBetSlip}) => { 
  const location = useLocation();
  const {theme} = useContext(ThemeContext)
  const isCricket = location.pathname.includes("sports-landing");
  const isLightMode = theme === "light" && isCricket ; 
  return (
    <div className='flex items-center justify-center'>
      <div className='max-w-[167px] whitespace-nowrap flex flex-col items-center justify-center'>
      <img src={noBetFound} alt='No Bets Found' />
      <div className='mt-2'>
        {title && <Typography content={title} variant={"h3"} color={isLightMode ? "themeBlack" : "vintageRibbon"}/>}
        <div className='text-center mt-2'>
        {isBetSlip && <Typography content={"Start Betting Now!"} variant={"size14Semibold"} color={"white"}/>}
        </div>
      </div>
      </div>
    </div>
  )
}

export default NoBetsFound