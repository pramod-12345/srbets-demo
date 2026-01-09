import React, { useEffect, useState } from "react";
import {
  Modal,
  Typography,
  Tabs,
  Input,
  CommonButton,
  Seperator,
  CryptoDropdown,
  ModalDropdown,
} from "components";
import { backIcon } from "assets";
import { setModalType, toggleModal } from "../../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { walletDebit } from "services";
import useAxios from "../../../hooks/useAxios";
import { fetchBackAccounts, paymentPayOut } from "services/wallet.service";
import { getBalanceDetails, getBalanceIcon } from "helper/getIcons";

const Withdraw = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const [dropdownData, setDropdownData] = useState(null)
  const { bankAccounts } = useSelector((state) => state.wallet);
  const { user } = useSelector((state) => state?.auth);
  const { userBalance, selectedCurrency } = useSelector((state) => state?.dashboard);

  const closeModal = () => {
    dispatch(toggleModal(false));
  };
  const tabs = [
    { id: "local-currency", label: "Local Currency" },
    { id: "crypto", label: "Crypto" },
  ];

  const cryptoFormik = useFormik({
    initialValues: {
      amount: "",
      address: "",
    },
    validationSchema: Yup.object().shape({
      amount: Yup.number()
        .required("Amount is required")
        .min(0.00072641, "Minimum withdrawal is 0.00072641"),
      address: Yup.string().required("Withdrawal address is required"),
    }),
    onSubmit: (values) => {
      const payload = {
        userId: 2,
        currency: "INR",
        order: {
          type: "shopping",
          id: "order12345",
          details: {
            id: "item123",
            description: "Payment for shopping",
          },
          timestamp: "2024-11-03T12:00:00Z",
          description: "Payment for order #12345",
        },
        transaction: {
          id: "txn12345",
          referenceId: "Zzad12212",
          amount: 100.5,
        },
      };
      walletDebit(makeRequest, payload);
    },
  });

  const localCurrencyFormik = useFormik({
    initialValues: {
      bankAccount: "",
      amount: "",
      currency: selectedCurrency?.label || ""
    },
    validationSchema: Yup.object().shape({
      bankAccount: Yup.string()
        .test(
          'bank-required',
          'Please select a bank account',
          function(value) {
            return selectedCurrency?.label !== "INR" || !!value;
          }
        ),
      amount: Yup.number()
        .required("Amount is required")
        .test(
          "max-balance",
          "You cannot enter amount more than your current balance",
          (value) => value <= (userBalance?.body?.balance ?? 0)
        ).min(100, "Minimum withdrawal is 100 INR")
    }),
    onSubmit: (values) => {
      let payload = {
        amount: Number(values.amount),
      };
    
      if (selectedCurrency?.label === "INR") {
        payload = {
          ...payload,
          name: dropdownData?.accountHolderName,
          accountNumber: dropdownData?.accountNumber,
          ifscCode: dropdownData?.ifscCode,
          mode: "IMPS",
          bank: dropdownData?.bankName,
        };
      }
    
      console.log("Final payload:", payload);
      paymentPayOut(makeRequest, payload, closeModal);
    },
  });

  const banks = bankAccounts?.map((item) => ({
    bankName: item?.bankName,
    accountNumber: item?.accountNumber,
    ifscCode: item?.ifscCode,
    accountHolderName: item?.accountHolderName,
    accountType: item?.accountType,
    label: item?.bankName,
    value: item?.accountNumber
  }));

  const cryptos = [
    { icon: "btc", label: "BTC" },
    { icon: "eth", label: "ETH" },
  ];

  const handleCryptoSelect = (crypto) => {
    console.log("Selected cryptocurrency:", crypto);
  };

  const handleSelect = (item) => {
    setDropdownData(item);
  };

  useEffect(() => {
  if(selectedCurrency?.label === "INR"){
    fetchBackAccounts(makeRequest, dispatch);
  }
  }, [dispatch, makeRequest , selectedCurrency?.label]);

  return (
    <Modal onClose={closeModal}>
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img
            src={backIcon}
            alt="Back"
            onClick={() => dispatch(setModalType("wallet"))}
            className="cursor-pointer"
          />
          <Typography
            variant="size20Bold"
            color={"white"}
            content={"Withdraw"}
          />
        </div>
        <Seperator />
      </div>
      <div className="hidden md:block">
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"Withdraw"}
        />
      </div>
      <div className="mt-5 p-4">
        <Tabs tabs={tabs} isLight={true}>
          <div id="crypto">
            <form onSubmit={cryptoFormik.handleSubmit}>
              <div className="mt-6">
                <div className="mt-6">
                  <CryptoDropdown
                    options={cryptos}
                    onSelect={handleCryptoSelect}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Input
                  name="amount"
                  value={cryptoFormik.values.amount}
                  onChange={cryptoFormik.handleChange}
                  onBlur={cryptoFormik.handleBlur}
                  label="Amount to withdraw"
                  placeholder="Amount to withdraw"
                  error={cryptoFormik.errors.amount}
                  touched={cryptoFormik.touched.amount}
                  isAmountMax={true}
                />
              </div>
              <div className="lg:mt-6 mt-4">
                <Input
                  name="address"
                  value={cryptoFormik.values.address}
                  onChange={cryptoFormik.handleChange}
                  onBlur={cryptoFormik.handleBlur}
                  label="Withdraw to"
                  placeholder="Enter withdrawal address"
                  error={cryptoFormik.errors.address}
                  touched={cryptoFormik.touched.address}
                />
              </div>
              <div className="mt-3">
                <Typography
                  color={"vintageRibbon"}
                  content={
                    "Minimum withdrawal is�0.00072641. Your withdrawal will have�0.00067447 subtracted from your remaining balance to cover the fee required to process the transaction."
                  }
                  variant={"size12Normal"}
                />
              </div>
              <div className="lg:mt-10 mt-9">
                <CommonButton
                  btnType={"submit"}
                  type="viewBetsBtn"
                  label={"Withdraw"}
                />
              </div>
            </form>
          </div>
          <div id="local-currency">
            <form onSubmit={localCurrencyFormik.handleSubmit}>
              <div className="mt-6">
                {user?.body?.walletCurrencies?.map((item, index) => (<div key={index} className="flex items-center justify-between space-x-3 bg-darkByzantineBlue px-4 py-3.5 rounded-xl mt-6">
                  <div className="flex items-center gap-3">
                    <img src={getBalanceIcon(item)} alt={selectedCurrency?.label} className="w-9 h-9" />
                    <div className="flex flex-col justify-center">
                      <Typography
                        variant={"size12Semibold"}
                        color={"white"}
                        content={item}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end">
                    <Typography
                      variant={"size12Semibold"}
                      color={"white"}
                      content={`${getBalanceDetails(item)?.symbol} ${userBalance?.body?.balance ?? 0}`}
                    />
                  </div>
                </div>))}
              </div>
              <div className="mt-6 space-y-3">
                {
                  selectedCurrency?.label === "INR" && (
                    <>
                      <div className=" flex items-center justify-between">
                        <Typography
                          variant={"size14Medium"}
                          color={"vintageRibbon"}
                          content={"Select Bank Acccount"}
                        />
                        <div
                          className="cursor-pointer"
                          onClick={() => dispatch(setModalType("addBank"))}
                        >
                          <Typography
                            color={"primary"}
                            variant={"size14Medium"}
                            content={"Add Bank"}
                          />
                        </div>
                      </div>
                      <ModalDropdown
                        items={banks}
                        onSelect={(data) => {
                          handleSelect(data)
                           localCurrencyFormik.setFieldValue('bankAccount', data.bankName)
                        }}
                        placeholder="Select bank"
                      />
                    </>
                  )
                }

              </div>
              <div className="mt-6">
                <Input
                  name="amount"
                  type={"number"}
                  value={localCurrencyFormik.values.amount}
                  onChange={localCurrencyFormik.handleChange}
                  onBlur={localCurrencyFormik.handleBlur}
                  label="Enter Amount to Withdraw"
                  placeholder="Amount to withdraw"
                  error={localCurrencyFormik.errors.amount}
                  touched={localCurrencyFormik.touched.amount}
                />
              </div>
              <div className="mt-3">
                <Typography
                  color={"vintageRibbon"}
                  content={
                    ""
                  }
                  variant={"size12Normal"}
                />
              </div>
              <div className="mt-10">
                <CommonButton
                  btnType={"submit"}
                  type="viewBetsBtn"
                  label={"Withdraw"}
                  disabled={
                    (selectedCurrency?.label === "INR" && !localCurrencyFormik.values.bankAccount) ||
                    !localCurrencyFormik.values.amount ||
                    localCurrencyFormik.values.amount > (userBalance?.body?.balance ?? 0)
                  }
                />
                <div className="text-center">
                <Typography variant={"size12Normal"} color={"vintageRibbon"} content={"Withdrawal charges are applicable."} />
                </div>
              </div>
            </form>
          </div>
        </Tabs>
      </div>
    </Modal>
  );
};

export default Withdraw;
