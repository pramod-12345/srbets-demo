import React, { useState } from "react";
import { useFormik } from "formik";
import { Typography, Input, CommonButton } from "components";
import { closeIcon } from "assets";
import { toggleModal } from "../../../redux/reducers/authSlice";
import { loginFunc } from "services";
import { useAxios } from "hooks";
import { loginValidation } from "helper/helper.validator";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { allIcons } from "helper/getIcons";

const Login = ({ setModalType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const [showPassword, setShowPassword] = useState(false);

  // Close modal function
  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  // Formik logic
  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      const payload = {
        identifier: values.userName,
        password: values.password,
      };
      loginFunc(makeRequest, payload, closeModal, dispatch, allIcons, navigate);
    },
  });

  return (
    <div>
      <div className="relative md:hidden bg-blackRussian">
        <div className=" flex items-center px-4 pt-3 gap-4 ">
          <img
            src={closeIcon}
            alt="Back"
            onClick={closeModal}
            className="cursor-pointer z-10 top-4 left-4"
          />
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Login to ODDS777"}
          />
        </div>
      </div>
      <div className="hidden md:block">
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"Login to ODDS777"}
        />
      </div>
      <div className="p-4 md:p-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="md:pt-6">
            <Input
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Email/Username *"
              placeholder="Enter email/username"
              error={formik.errors.userName}
              touched={formik.touched.userName}
            />
          </div>
          <div className="pt-6">
            <Input
              name="password"
              type={!showPassword ? "password" : "text"}
              onShowPass={() => setShowPassword(!showPassword)}
              isPassword={true}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Password *"
              isForgot={true}
              placeholder="Enter password"
              error={formik.errors.password}
              touched={formik.touched.password}
            />
          </div>
          <div className="w-full flex justify-center items-center mt-9">
            <CommonButton
              type="viewBetsBtn"
              label={"Login"}
              onClick={formik.handleSubmit}
              btnType={"submit"}
            />
          </div>
        </form>
        <div className="mt-5 flex items-center justify-center gap-2 text-center">
          <Typography color={"white"} content={"Don’t have an account?"} />
          <div
            className="cursor-pointer"
            onClick={() => dispatch(setModalType("register"))}
          >
            <Typography color={"primary"} content={"Create New"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
