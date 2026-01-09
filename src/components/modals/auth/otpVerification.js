import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, CommonButton, Input, Seperator } from "components";
import { backIcon } from "assets";
import { useDispatch, useSelector } from "react-redux";
import { setModalType, toggleModal } from "../../../redux/reducers/authSlice";
import { loginFunc, otpVerify } from "services/auth.service";
import { useAxios } from "hooks";
import { useNavigate } from "react-router-dom";
import { allIcons } from "helper/getIcons";

const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const { registerPayload } = useSelector((state) => state.auth);

  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  const handleLogin=()=>{
    const payload = {
      identifier: registerPayload.email,
      password: registerPayload.password
    }
    loginFunc(makeRequest, payload, closeModal, dispatch, allIcons , navigate)
  }

  // Formik setup
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be a 6-digit number")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      otpVerify(
        makeRequest,
        registerPayload?.email,
        values.otp,
        handleLogin,
        dispatch
      );
    },
  });

  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"OTP Verification"}
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img
            src={backIcon}
            alt="Back"
            onClick={() => dispatch(setModalType("register"))}
            className="cursor-pointer"
          />
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"OTP Verification"}
          />
        </div>
        <Seperator />
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="p-4">
        <div className="pt-8">
          <Input
            name="otp"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"OTP *"}
            placeholder={"Enter OTP"}
            error={formik.errors.otp}
            touched={formik.touched.otp}
            type="text"
            maxLength={6}
          />
        </div>
        <div className="w-full flex justify-center items-center pt-8">
          <CommonButton
            type="viewBetsBtn"
            btnType={"submit"}
            label={"Verify OTP"}
          />
        </div>
      </form>
    </div>
  );
};

export default OtpVerification;
