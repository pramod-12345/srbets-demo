import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Typography, Input, CommonButton, Seperator } from "components";
import { backIcon } from "assets";
import { setModalType } from "../../../redux/reducers/authSlice";
import { addBankAccount } from "services/wallet.service";
import { useAxios } from "hooks";

const validationSchema = Yup.object({
  bankName: Yup.string().required("Bank name is required"),
  accountNumber: Yup.string().required("Account number is required"),
  ifscCode: Yup.string().required("IFSC code is required"),
  accountHolderName: Yup.string().required("Account holder name is required"),
  accountType: Yup.string().required("Account type is required"),
});

const AddNewBankAccount = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();

  const formik = useFormik({
    initialValues: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
      accountHolderName: "",
      accountType: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
      const payload = {
        bankName: values?.bankName,
        accountNumber: values?.accountNumber,
        ifscCode: values?.ifscCode,
        accountHolderName: values?.accountHolderName,
        accountType: values?.accountType,
      };

      const cb =()=>{
        dispatch(setModalType("withdraw"))
      }

      addBankAccount(makeRequest, payload, cb);
    },
  });

  return (
    <div>
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img
            src={backIcon}
            alt="Back"
            className="cursor-pointer"
            onClick={() => dispatch(setModalType("withdraw"))}
          />
          <Typography
            variant="size20Bold"
            color={"white"}
            content={"Add new bank account"}
          />
        </div>
        <Seperator />
      </div>
      <div className="hidden md:flex items-center gap-3">
        <div
          className="cursor-pointer"
          onClick={() => dispatch(setModalType("withdraw"))}
        >
          <img src={backIcon} alt="Back" />
        </div>
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"Add new bank account"}
        />
      </div>
      <div className="flex flex-col gap-6 mt-8 px-4 md:px-0">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex gap-6 items-center flex-wrap mt-4 mb-4">
            <Input
              name="bankName"
              label={"Bank name"}
              placeholder={"Enter Bank name"}
              value={formik.values.bankName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.bankName && formik.touched.bankName
                  ? formik.errors.bankName
                  : ""
              }
            />
            <Input
              name="accountHolderName"
              label={"Account Holder Name"}
              placeholder={"Enter Account Holder Name"}
              value={formik.values.accountHolderName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.accountHolderName &&
                formik.touched.accountHolderName
                  ? formik.errors.accountHolderName
                  : ""
              }
            />
          </div>
          <div className="flex gap-6 items-center flex-wrap">
            <Input
              name="ifscCode"
              label={"IFSC code"}
              placeholder={"Enter IFSC code"}
              value={formik.values.ifscCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.ifscCode && formik.touched.ifscCode
                  ? formik.errors.ifscCode
                  : ""
              }
            />
            <Input
              name="accountNumber"
              label={"Account number"}
              placeholder={"Enter Account number"}
              value={formik.values.accountNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.accountNumber && formik.touched.accountNumber
                  ? formik.errors.accountNumber
                  : ""
              }
            />
          </div>
          <Input
            name="accountType"
            label={"Account Type"}
            placeholder={"Enter Account Type"}
            value={formik.values.accountType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.accountType && formik.touched.accountType
                ? formik.errors.accountType
                : ""
            }
          />
          <div className="w-full space-y-4 pt-8 text-center md:static bottom-7 left-0 md:px-0">
            <Typography
              color={"vintageRibbon"}
              variant={"size12Normal"}
              content={"Disclaimer text here"}
            />
            <CommonButton
              type="viewBetsBtn"
              label={"Add new bank account"}
              btnType="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBankAccount;
