import React, { useState } from "react";
import { useFormik } from "formik";
import { Typography, Input, CommonButton, Seperator } from "components";
import { backIcon } from "assets";
import { useDispatch } from "react-redux";
import { useAxios } from "hooks";
import { registerFunc } from "services";
import { registerValidation } from "helper/helper.validator";
import { useSearchParams } from "react-router-dom";

const Register = ({ setModalType }) => {
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get("refCode");

  const closeModal = () => {
    dispatch(setModalType("otpVerify"));
  };

  console.log('refCode',refCode);
  

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      userName: "",
      password: "",
      phone: "",
    },
    validationSchema: registerValidation,
    onSubmit: (values) => {
      // Handle registration logic here
      const payload = {
        email: values.email,
        password: values.password,
        phoneNumber: values.phone,
        userName: values.userName,
        twoFactorEnabled: false,
        ...(refCode && { refCode: refCode }) 
      };

      console.log('payload',payload);
      
      registerFunc(makeRequest, payload, closeModal, dispatch);
    },
  });

  return (
    <div>
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center justify-between px-4 gap-2 py-5">
          <div className="flex items-center gap-2">
            <img
              src={backIcon}
              alt="Back"
              onClick={() => dispatch(setModalType("login"))}
              className="cursor-pointer"
            />
            <Typography
              color={"white"}
              variant={"size20Bold"}
              content={"Register new account"}
            />
          </div>
        </div>
        <Seperator />
      </div>
      <div className="hidden md:block">
        <div className="flex items-center gap-2 py-5">
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Register new account"}
          />
        </div>
      </div>
      <div className="space-x-4"></div>
      <form onSubmit={formik.handleSubmit}>
        <div className="pt-7 md:px-0 px-4 flex flex-col gap-6">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Email *"}
            placeholder={"Enter email"}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
          <Input
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Username *"}
            placeholder={"Enter username"}
          />
          <Input
            name="password"
            type={!showPassword ? "password" : "text"}
            onShowPass={() => setShowPassword(!showPassword)}
            isPassword={true}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Password *"}
            placeholder={"Enter password"}
            error={formik.errors.password}
            touched={formik.touched.password}
          />
          <Input
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Phone number (optional)"}
            placeholder={"Enter phone number"}
            error={formik.errors.phone}
            touched={formik.touched.phone}
            maxLength={10}
          />
        </div>

        <div className="w-full px-4 md:px-0 flex justify-center items-center mt-9">
          <CommonButton
            btnType={"submit"}
            type="viewBetsBtn"
            label={"Continue"}
            onClick={formik.handleSubmit}
          />
        </div>
      </form>
      <div className="mt-5 flex items-center justify-center gap-2 text-center">
        <Typography color={"white"} content={"Already have an account?"} />
        <div
          className="cursor-pointer"
          onClick={() => dispatch(setModalType("login"))}
        >
          <Typography color={"primary"} content={"Login here"} />
        </div>
      </div>
    </div>
  );
};

export default Register;
