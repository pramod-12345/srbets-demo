import React from "react";
import { Typography,  CommonButton } from "components";
import {  waiting, failed, paymentDone, closeIcon } from "assets";
import { toggleModal } from "../../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const PaymentApproved = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModal(false));
  };
  return (
    <div className="relative">
      <div
        className="cursor-pointer block md:hidden absolute md:static right-4 top-4"
        onClick={closeModal}
      >
        <img src={closeIcon} alt="close"  />
      </div>
      {/* <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img src={backIcon} alt="Back" className="cursor-pointer" />
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Deposit Money"}
          />
        </div>
        <Seperator />
      </div> */}
      <div className="p-4 pt-5 md:p-0 h-[80vh] md:h-auto">
        <div className="">
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Deposit Money"}
          />
        </div>
        <div className=" px-0 md:px-0 py-3 md:py-0 pt-10 md:pt-10  md:h-auto">
          {/* <!-- Status List --> */}
          <div className="space-y-6">
            {/* <!-- Initiated --> */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img
                  src={paymentDone}
                  alt="Payment Success"
                  className="w-6 h-6"
                  
                />
              </div>
              <div className="flex flex-col items-start">
                <Typography
                  variant={"size16Medium"}
                  color={"white"}
                  content={"Initiated"}
                />
                <Typography
                  variant={"size12Normal"}
                  color={"vintageRibbon"}
                  content={
                    "Short description goes here regarding the main title here. or deposit money initiation."
                  }
                />
              </div>
            </div>

            {/* <!-- In-progress --> */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img src={waiting} alt="Payment Loading"  className="w-6 h-6 " />
              </div>
              <div>
                <div className="flex flex-col items-start">
                  <Typography
                    variant={"size16Medium"}
                    color={"white"}
                    content={"In-progress"}
                  />
                  <Typography
                    variant={"size12Normal"}
                    color={"vintageRibbon"}
                    content={
                      "Short description goes here regarding the main title here. or deposit money initiation."
                    }
                  />
                </div>
              </div>
            </div>

            {/* <!-- Failed --> */}
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <img src={failed} alt="Payment Failed" className="w-6 h-6"  />
              </div>
              <div>
                <div className="flex flex-col items-start">
                  <Typography
                    variant={"size16Medium"}
                    color={"white"}
                    content={"Failed"}
                  />
                  <Typography
                    variant={"size12Normal"}
                    color={"vintageRibbon"}
                    content={
                      "Short description goes here regarding the main title here. or deposit money initiation."
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Action Buttons --> */}
          <div className="absolute md:static bottom-6 left-0 right-0 space-y-6 w-full px-4 md:px-0 md:mt-24">
            <CommonButton
              label={"Close"}
              type="viewBetsBtn"
              onClick={closeModal}
            />
            <button className="w-full py-3.5 bg-darkByzantineBlue font-semibold text-white rounded-lg">
              Check my transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentApproved;
