import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Typography,
  CommonButton,
  Input,
  Seperator
} from "components"
import { backIcon } from "assets";
import { useDispatch } from "react-redux";
import { setModalType, toggleModal } from "../../../redux/reducers/authSlice";
import { forgotPassword } from "services/auth.service";
import { useAxios } from "hooks";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const {makeRequest} = useAxios();

  const closeModal = () => {
      dispatch(toggleModal(false));
    };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      const payload ={
        email: values.email
      }
      forgotPassword(makeRequest, payload, closeModal)
    },
  });

  return (
    <div>
      {/* Desktop Header */}
      <div className="hidden md:block">
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"Forgot Password"}
        />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img
            src={backIcon}
            alt="Back"
            onClick={() => dispatch(setModalType("login"))}
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

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="p-4">
        <div className="pt-8">
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Email *"}
            placeholder={"Enter your email"}
            error={formik.errors.email}
            touched={formik.touched.email}
          />
        </div>
        <div className="w-full flex justify-center items-center pt-8">
          <CommonButton
            type="viewBetsBtn"
            btnType={"submit"}
            label={"Recover account"}
          />
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
