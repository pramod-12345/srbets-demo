import React from "react";
import { Typography } from "components";
import {  closeIcon, paymentDone , paymentFail } from "assets";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal } from "../../../redux/reducers/authSlice";

const PaymentStatus = ({ isError, onRetry }) => {
  const { upiAmount } = useSelector((state) => state?.wallet);
   const { userBalance } = useSelector(
      (state) => state?.dashboard
    );
  
  const dispatch = useDispatch();
  const icon = isError ? paymentFail : paymentDone;
  const title = isError ? "Payment failed" : "Payment deposited successfully";
  const message = isError
    ? `Payment of ${upiAmount} failed due to technical reasons`
    : `An amount ${upiAmount} added to your wallet successfully`;
  const buttonText = isError ? "Retry Payment" : null;

  const details = [
    { label: "Transaction ID", value: "#35576786566" },
    { label: "Payment date and time", value: "25 Oct 2024, 06:20 PM" },
    { label: "Deposit Amount", value: upiAmount },
    { label: "Status", value: isError ? "Failed" : "Completed" },
  ];

  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  return (
    <div className="flex items-center justify-center bg-blackRussian md:p-0 p-4">
      <div
          className="cursor-pointer absolute md:static block md:hidden right-4 top-4"
          onClick={closeModal}
        >
          <img src={closeIcon} alt="close"  />
        </div>
      <div className="w-full">
        {/* Icon and Title Section */}
        <div className="flex bg-richBlack p-3 rounded-2xl pt-10 flex-col items-center justify-center pb-4">
          <img src={icon} alt={title}  />
          <div className="flex flex-col text-center justify-center items-center mt-4">
            <Typography
              variant="size20Semibold"
              color="white"
              content={title}
            />
            <div className="mt-1.5 text-center">
              <Typography
                variant="size14Medium"
                color="white"
                content={message}
              />
            </div>
            {!isError && (
              <div className="mt-6">
                <Typography
                  variant="size14Semibold"
                  color="white"
                  content={`Total available balance: $${userBalance?.body?.balance ?? '0'}`}
                />
              </div>
            )}
            {isError && (
              <>
                <div className="mt-3">
                  <button
                    onClick={onRetry}
                    className="bg-primary w-[186px] whitespace-nowrap rounded-lg py-4 px-9 text-base leading-4 font-semibold"
                  >
                    {buttonText}
                  </button>
                </div>
                <div className="text-center mt-5">
                  <Typography
                    variant={"size12Normal"}
                    color={"white"}
                    content={
                      "Please note: If the transaction fails but the money is deducted, your account should be automatically credited within 3–5 working days."
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Payment Details Section */}
        <div className="bg-blackRussian mt-11">
          <Typography
            variant="size12Normal"
            color="vintageRibbon"
            content="PAYMENT DETAILS"
          />
          {details?.map(({ label, value }, index) => (
            <div className="flex justify-between mt-3" key={index}>
              <Typography
                variant="size14Semibold"
                color="white"
                content={label}
              />
              <Typography
                variant="size14Medium"
                color="white"
                content={value}
              />
            </div>
          ))}
        </div>

        {/* Disclaimer Section */}
        <div className="md:static  bottom-7 w-full left-0 px-4 md:px-0">
          <div className="bg-darkByzantineBlue rounded-lg py-3.5  text-center mt-11">
            <Typography
              variant={"size12Normal"}
              color={"vintageRibbon"}
              content={"Disclaimer: text goes here"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentStatus;
