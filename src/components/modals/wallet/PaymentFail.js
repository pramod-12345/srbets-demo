import React from "react";
import Modal from "../../../components/common/Modal";
import paymentFailIcon from "../../../assets/svg/payment-fail.svg";
import Typography from "../../../components/common/typography";

const PaymentFail = () => {
  return (
    // <Modal>
    <div className="flex items-center justify-center bg-blackRussian p-4">
      <div className="w-full">
        <div className="flex bg-richBlack rounded-2xl pt-7 pb-5 flex-col items-center justify-center">
          <img src={paymentFailIcon} alt="Payment Successful"  />
          <div className="flex flex-col justify-center items-center mt-4">
            <Typography
              variant={"size20Semibold"}
              color={"white"}
              content={"Payment failed"}
            />
            <div className="mt-1.5">
              <Typography
                variant={"size14Medium"}
                color={"white"}
                content={"Payment of $500 failed due to technical reasons"}
              />
            </div>
            <div className="mt-3">
              <button className="bg-primary w-[186px] whitespace-nowrap rounded-lg py-4 px-9 text-base leading-4 font-semibold ">
                Retry Payment
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
          </div>
        </div>

        <div className="bg-blackRussian mt-11">
          <Typography
            variant={"size12Normal"}
            color={"vintageRibbon"}
            content={"PAYMENT DETAILS"}
          />
          <div className="flex justify-between mt-4">
            <Typography
              variant={"size14Semibold"}
              color={"white"}
              content={"Reference no."}
            />
            <Typography
              variant={"size14Medium"}
              color={"white"}
              content={"#35576786566"}
            />
          </div>
          <div className="flex justify-between mt-3">
            <Typography
              variant={"size14Semibold"}
              color={"white"}
              content={"Payment date and time"}
            />
            <Typography
              variant={"size14Medium"}
              color={"white"}
              content={"25 Oct 2024, 06:20 PM"}
            />
          </div>
          <div className="flex justify-between mt-3">
            <Typography
              variant={"size14Semibold"}
              color={"white"}
              content={"Deposit Amount"}
            />
            <Typography
              variant={"size14Medium"}
              color={"white"}
              content={"$500"}
            />
          </div>
          <div className="flex justify-between mt-3">
            <Typography
              variant={"size14Semibold"}
              color={"white"}
              content={"Status"}
            />
            <Typography
              variant={"size14Medium"}
              color={"white"}
              content={"Completed"}
            />
          </div>
        </div>
        <div className="md:static absolute bottom-7 w-full left-0 px-4 md:px-0">
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
    // </Modal>
  );
};

export default PaymentFail;
