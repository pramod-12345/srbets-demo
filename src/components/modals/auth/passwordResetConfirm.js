import React from "react";
import {  Seperator, Typography } from "components";
import { closeIcon, paymentDone } from "assets";
import { toggleModal } from "../../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(toggleModal(false));
  };
  return (
    <div>
      <div className="md:hidden bg-blackRussian ">
        <div className="flex items-center px-4 gap-2 py-5">
          <img
            src={closeIcon}
            alt="Back"
            onClick={closeModal}
            className="cursor-pointer"
            
          />
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Forgot Password"}
          />
        </div>
        <Seperator />
      </div>
      <div className="flex flex-col items-center justify-center text-center w-full h-full min-h-[80vh] md:min-h-80 px-auto">
        <img src={paymentDone} alt="Payment Success" className="mb-3.5"  />
        <div className="w-3/4 flex flex-col gap-2">
          <Typography
            content={"Passsword reset email sent"}
            variant={"size20Bold"}
            color={"white"}
          />
          <Typography
            content={
              "We have sent an account recovery email to vijaybisht1706@gmail.com"
            }
            color={"vintageRibbon"}
            variant={"size14Medium"}
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
