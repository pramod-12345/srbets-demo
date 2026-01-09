import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, CommonButton, Input, Seperator } from "components";
import { backIcon } from "assets";
import { useDispatch } from "react-redux";
import { setModalType, toggleModal } from "../../../redux/reducers/authSlice";
import { useAxios } from "hooks";
import { changePassword } from "services/auth.service";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const closeModal = () => {
    dispatch(toggleModal(false));
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Old password is required"),
      newPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("New password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };
      changePassword(
        makeRequest,
        payload,
        closeModal
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
          content={"Change Password"}
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
            content={"Change Password"}
          />
        </div>
        <Seperator />
      </div>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} className="p-4">
        <div className="pt-8">
          <Input
            name="oldPassword"
            type={"text"}
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Old Password *"}
            placeholder={"Enter old password"}
            error={formik.errors.oldPassword}
            touched={formik.touched.oldPassword}
          />
        </div>
        <div className="pt-8">
          <Input
            name="newPassword"
            type={!showPassword ? "password" : "text"}
            isPassword={true}
            onShowPass={() => setShowPassword(!showPassword)}
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"New Password *"}
            placeholder={"Enter new password"}
            error={formik.errors.newPassword}
            touched={formik.touched.newPassword}
          />
        </div>
        <div className="pt-4">
          <Input
            name="confirmPassword"
            type={!showConfirmPassword ? "password" : "text"}
            onShowPass={() => setShowConfirmPassword(!showConfirmPassword)}
            value={formik.values.confirmPassword}
            isPassword={true}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label={"Confirm Password *"}
            placeholder={"Confirm new password"}
            error={formik.errors.confirmPassword}
            touched={formik.touched.confirmPassword}
          />
        </div>
        <div className="w-full flex justify-center items-center pt-8">
          <CommonButton
            type="viewBetsBtn"
            btnType={"submit"}
            label={"Save"}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
