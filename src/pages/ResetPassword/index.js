import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, CommonButton, Input } from "components";
import { useDispatch } from "react-redux";
import { setModalType, toggleModal } from "../../redux/reducers/authSlice";
import { resetPassword } from "services/auth.service";
import { useAxios } from "hooks";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const { makeRequest } = useAxios();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token")

     const openModal = (type) => {
        dispatch(setModalType(type));
        dispatch(toggleModal(true));
        navigate("/")
      };

    // Formik setup
    const formik = useFormik({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("New password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Confirm password is required"),
        }),
        onSubmit: (values) => {
            const payload = {
                newPassword: values.newPassword,
                confirmPassword: values.confirmPassword,
            }
            resetPassword(makeRequest, payload, openModal, token)
        },
    });

    return (
        <div className="container mx-auto md:w-1/2">
            {/* Mobile Header */}
            <div className="">
                <div className="flex items-center justify-center text-center px-4 gap-2 py-5">
                    <div className="text-center w-full">
                    <Typography
                        color={"white"}
                        variant={"h2"}
                        content={"Reset Password"}
                    />
                    </div>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={formik.handleSubmit} className="p-4">
                <div className="pt-4">
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
                        label={"Reset Password"}
                    />
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
