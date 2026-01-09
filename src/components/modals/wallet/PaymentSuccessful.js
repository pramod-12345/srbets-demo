import React from 'react'
import Modal from '../components/common/Modal'
import paymentDoneIcon from "../assets/svg/payment-done.svg"
import Typography from '../components/common/typography'

const PaymentSuccessful = () => {
    return (
        <Modal>
            <div className="flex items-center justify-center bg-blackRussian">
                <div className="w-full">
                    <div className="flex bg-richBlack h-[290px] rounded-2xl pt-10 flex-col items-center justify-center">
                        <img src={paymentDoneIcon} alt='Payment Successful'  />
                        <div className='flex flex-col justify-center items-center mt-4'>
                            <Typography variant={"size20Semibold"} color={"white"} content={"Payment deposited successfully"}/>
                            <div className='mt-1.5'>
                            <Typography variant={"size14Medium"} color={"white"} content={"An amount $500 added to your wallet successfully"} />
                            </div>
                            <div className='mt-6'>
                            <Typography variant={"size14Semibold"} color={"white"} content={"Total available balance: $580"}/>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blackRussian mt-11">
                        <Typography variant={"size12Normal"} color={"vintageRibbon"} content={"PAYMENT DETAILS"}/>
                        <div className="flex justify-between mt-4">
                            <Typography variant={"size14Semibold"} color={"white"} content={"Reference no."}/>
                            <Typography variant={"size14Medium"} color={"white"} content={"#35576786566"}/>
                        </div>
                        <div className="flex justify-between mt-3">
                        <Typography variant={"size14Semibold"} color={"white"} content={"Payment date and time"}/>
                            <Typography variant={"size14Medium"} color={"white"} content={"25 Oct 2024, 06:20 PM"}/>
                        </div>
                        <div className="flex justify-between mt-3">
                        <Typography variant={"size14Semibold"} color={"white"} content={"Deposit Amount"}/>
                        <Typography variant={"size14Medium"} color={"white"} content={"$500"}/>
                        </div>
                        <div className="flex justify-between mt-3">
                        <Typography variant={"size14Semibold"} color={"white"} content={"Status"}/>
                        <Typography variant={"size14Medium"} color={"white"} content={"Completed"}/>
                        </div>
                    </div>
                    <div className="bg-darkByzantineBlue rounded-lg py-3.5  text-center mt-11">
                        <Typography variant={"size12Normal"} color={"vintageRibbon"} content={"Disclaimer: text goes here"}/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default PaymentSuccessful