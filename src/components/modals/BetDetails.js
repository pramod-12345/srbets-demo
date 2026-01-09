import React from 'react'
import {
    Modal,
    Typography,
    BetCards,
    Seperator
} from "components"
import {
    infoIcon,
    copy,
    closeIcon
} from "assets"
import moment from 'moment'


const BetDetails = ({handleClose , bet}) => {
    return (
        <Modal onClose={handleClose}>
            <div className='md:hidden p-0 py-5 px-4 bg-blackRussian'>
           <div className='flex items-center gap-2 mb-4'>
           <img src={closeIcon} alt='Back' onClick={handleClose}/>
            <Typography
                color={"white"}
                variant={"size20Bold"}
                content={"Bet Details"}
            />
           </div>
           <Seperator/>
            </div>
            <div className='hidden md:block'>
             <Typography
                color={"white"}
                variant={"size20Bold"}
                content={"Bet Details"}
            /> 
            </div>
            <div className="mt-6">
                <div className="space-y-4 mt-6 px-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className='flex flex-col gap-1'>
                                <Typography variant={"size12Semibold"} color={"vintageRibbon"} content={"Sports Type"} />
                                <Typography variant={"size14Normal"} color={"white"} content={bet?.gameName} />
                            </div>
                        </div>
                        <div className="text-right">
                            <div className='flex flex-col gap-1'>
                                <Typography variant={"size12Semibold"} color={"vintageRibbon"} content={"ID"} />
                                <div className='flex items-center gap-1'>
                                <Typography variant={"size14Normal"} color={"white"} content={`#${bet?.id}`} />
                                <img src={copy}  alt='Copy icon'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                            <div className='flex flex-col gap-1'>
                                <Typography variant={"size12Semibold"} color={"vintageRibbon"} content={"Placed By"} />
                                <Typography variant={"size14Normal"} color={"white"} content={bet?.userName} />
                            </div>
                        </div>
                        <div className="text-right">
                            <div className='flex flex-col gap-1'>
                                <Typography variant={"size12Semibold"} color={"vintageRibbon"} content={"Placed On"} />
                                <Typography variant={"size14Normal"} color={"white"} content={moment(bet.createdAt).format("DD MMM YYYY [at] hh:mm A")} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-9 px-2">
                    <BetCards 
                        betType={bet.betType}
                        date={bet.createdAt}
                        status={bet.betStatus}
                        infoIcon={infoIcon}
                        match={bet.eventTypeName}
                        result={bet.runnerName}
                        odds={bet.odd}
                        currencyIcon={bet?.currencyType}
                        marketName={bet?.marketName}
                        betAmount={bet.amount}
                        payout={bet.payOut}
                        isFancy={bet.isFancy}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default BetDetails