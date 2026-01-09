import React, { useEffect, useState } from "react";
import {
  Typography,
  RadioButton,
  CommonButton,
  ModalDetailItem,
  ModalDropdown,
  Input,
  LazyImage,
} from "components";
import { modalIcon, socialIcons } from "../../../assets/svg/modal";
import { mbDepositSocialImg } from "assets";
import { setModalType } from "../../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "hooks";
import { paymentPayIn } from "services/wallet.service";
import { setUpiAmount } from "../../../redux/reducers/walletSlice";

const DepositeViaUpi = () => {
  const dispatch = useDispatch();
  const { userBalance } = useSelector(
    (state) => state?.dashboard
  );
  const [amount, setAmount] = useState("");
  const [amountUpi, setAmountUpi] = useState("");
  const isPhonePay = process.env.REACT_APP_IS_PHONE_PAY
  const [paymentIntentData, setPaymentIntentData] = useState(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState("UPI");
  const { makeRequest } = useAxios();
  const [timeLeft, setTimeLeft] = useState(3 * 60);
  const [initialBalance, setInitialBalance] = useState(
    userBalance?.body?.balance
  );
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentStart, setPaymentStart] = useState(false);
  const { selectedCurrency } = useSelector((state) => state?.dashboard);

  const getQrImg = () => {
    switch (selectedCurrency?.label) {
      case "INR":
        return "https://layout-odds.s3.ap-south-1.amazonaws.com/inr-scanner.png";
      case "PKR":
        return "https://layout-odds.s3.ap-south-1.amazonaws.com/pkr-scanner.png";
      default:
        return null;
    }
  };


  useEffect(() => {
    if (step === 1) {
      setInitialBalance(userBalance?.body?.balance);

      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);

            if (userBalance?.body?.balance === initialBalance && paymentStart) {
              dispatch(setModalType("paymentFailed"));
            }

            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, paymentStart, dispatch, userBalance, initialBalance, userBalance?.body?.balance]);

  useEffect(() => {
    if (
      step === 1 &&
      paymentStart &&
      userBalance?.body?.balance > initialBalance
    ) {
      setPaymentCompleted(true);
      setTimeout(() => {
        dispatch(setModalType("paymentStatus"));
      }, 10000);
    }
  }, [dispatch, userBalance, initialBalance, userBalance?.body?.balance, paymentStart, step]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}M : ${secs < 10 ? "0" : ""}${secs}S`;
  };
  const banks = [
    { id: "hdfc", label: "HDFC" },
    { id: "icici", label: "ICICI" },
  ];
  const amounts = [500, 1000, 2000, 5000];
  const amountsUpi = [500, 1000, 2000, 5000];
  const paymentMethodType = [
    { icon: socialIcons.whatsapp },
    { icon: socialIcons?.gpay },
    { icon: socialIcons.phonepay },
    { icon: socialIcons.paytm },
    { icon: socialIcons.mobiwiki },
    { icon: socialIcons.amazonpay },
    { icon: socialIcons.freecharge },
  ];

  const handleSelect = (item) => {
  };

  const sendUpiPayment = async (amount) => {
    const payload = {
      amount: Number(amount),
    };
    paymentPayIn(makeRequest, payload, setPaymentIntentData, setStep);
  };

  const handleStepOne = () => {
    setStep(1);
    dispatch(setUpiAmount(amountUpi));
    sendUpiPayment(amountUpi);
  };

  const handleAmount = (e) => {
    setAmount(e);
  };
  const handleAmountUpi = (e) => {
    setAmountUpi(e);
  };

  const paymentRedirect = (paymenRedirectUrl) => {
    setPaymentStart(true);
    window.location.href = paymenRedirectUrl;
  }

  return (
    <div className="mt-9">
      {step === 0 && (
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex space-x-16 ">
              <RadioButton
                label="Scan N Pay"
                selected={selected === "UPI"}
                onChange={() => setSelected("UPI")}
              />
              <RadioButton
                label="Netbanking"
                selected={selected === "Netbanking"}
                onChange={() => setSelected("Netbanking")}
              />
            </div>

            <div className="pt-8 w-full">
              {selected === "UPI" ? (
                !isPhonePay ? <div className="p-6 lg:mt-4 mt-6 flex flex-col gap-4 text-center bg-darkByzantineBlue rounded-xl justify-center items-center">
                  <LazyImage
                    src={getQrImg()}
                    alt={`${selectedCurrency?.label} QR Code`}
                    className="w-[120px] !h-[120px] rounded-md"
                  />
                  <Typography
                    color={"vintageRibbon"}
                    variant={"size16Semibold"}
                    content={"Send payment screenshot to whatsapp chat support for deposit process completion."}
                  />
                </div> :
                  <div className="w-full">
                    <Input
                      setValue={handleAmountUpi}
                      isAmount={true}
                      value={amountUpi}
                      onChange={(e) => handleAmountUpi(e.target.value)}
                      placeholder={"Enter amount"}
                    />
                    <div className="flex flex-wrap gap-3 gap items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-3 items-center">
                        {amountsUpi.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleAmountUpi(item)}
                            className={`px-4 py-2 rounded-lg border text-sm cursor-pointer border-vintageRibbon`}
                          >
                            <Typography
                              content={`₹${item.toLocaleString()}`}
                              color={"vintageRibbon"}
                              variant={"size14Semibold"}
                            />
                          </div>
                        ))}
                      </div>
                      <Typography
                        content={`Min. 100`}
                        color={"vintageRibbon"}
                        variant={"size12Normal"}
                      />
                    </div>
                  </div>
              ) : (
                <>
                  <div className="w-full">
                    <Input
                      setValue={handleAmount}
                      isAmount={true}
                      value={amount}
                      onChange={(e) => handleAmount(e.target.value)}
                      placeholder={"Enter amount"}
                    />
                    <div className="flex flex-wrap gap-3 gap items-center justify-between mt-3">
                      <div className="flex flex-wrap space-x-3 space-y-3 items-center">
                        {amounts.map((item) => (
                          <div
                            key={item}
                            onClick={() => handleAmount(item)}
                            className={`px-4 py-2 rounded-lg border text-sm cursor-pointer border-vintageRibbon`}
                          >
                            <Typography
                              content={`₹${item.toLocaleString()}`}
                              color={"vintageRibbon"}
                              variant={"size14Semibold"}
                            />
                          </div>
                        ))}
                      </div>
                      <Typography
                        content={`Min. 100`}
                        color={"vintageRibbon"}
                        variant={"size12Normal"}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <ModalDropdown
                      items={banks}
                      onSelect={handleSelect}
                      placeholder="Select bank"
                    />
                  </div>
                </>
              )}
            </div>
            <div className="w-full flex justify-center items-center lg:pt-7 pt-9 flex-col gap-6">
              <CommonButton
                type="viewBetsBtn"
                label={
                  amount
                    ? `${selected === "UPI" ? "Pay" : "Proceed to deposit"
                    } ₹ ${amount}`
                    : `${selected === "UPI" ? "Pay" : "Proceed to deposit"}`
                }
                onClick={() =>
                  selected === "UPI"
                    ? handleStepOne()
                    : dispatch(setModalType("paymentApproved"))
                }
              />
            </div>
          </div>
          <div className="md:static  bottom-7 w-full left-0">
            <div className="w-full mt-6 text-center">
              <Typography
                content={`We support all UPI handles`}
                color={"vintageRibbon"}
                variant={"size14Normal"}
              />
            </div>
            <div className="mt-4 hidden md:flex items-center gap-3">
              {paymentMethodType?.map((i, index) => (
                <img
                  key={index}
                  src={i?.icon}
                  alt=""
                  className="mix-blend-luminosity object-contain"
                />
              ))}
            </div>
            <div className="mt-4 flex md:hidden items-center justify-center gap-3">
              <img
                src={mbDepositSocialImg}
                alt=""
                className="mix-blend-luminosity object-contain"
              />
            </div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="">
          <div className="flex items-center justify-center flex-col">
            <Typography
              color={"white"}
              variant={"size16Semibold"}
              content={"Confirm payment"}
            />
            <div className="w-[7.5rem] h-[7.5rem] mt-6 bg-darkByzantineBlue rounded-[20px] flex items-center justify-center">
              <img
                src={modalIcon.confirmPaymentIcon}
                alt="Payment Confirm"
                className="max-h-[70px] mr-[-15px]"
              />
            </div>
            <div className="bg-patriotBlue rounded-full p-3.5 mt-[-10px]">
              <Typography
                color={"white"}
                variant={"size16Semibold"}
                content={`Session expiry: ${formatTime(timeLeft)}`}
              />
            </div>
          </div>
          <div className="md:static bottom-7 w-full left-0 px-4 md:px-0">
            <div className="mt-10">
              <Typography
                variant={"size12Medium"}
                color={"vintageRibbon"}
                content={"Order summary"}
              />
              <div className="flex flex-col gap-3 mt-4">
                <ModalDetailItem label={"Amount"} value={amountUpi} />
                <ModalDetailItem
                  label={"Transaction ID"}
                  value={paymentIntentData?.tid}
                />
              </div>
            </div>
            <div className="bg-coffee rounded-lg py-3 px-4 mt-5 mb-4">
              <Typography
                color={"pecanVeneer"}
                variant={"size14Medium"}
                content={
                  "Do not refresh this page while you are complteinng the payment"
                }
              />
            </div>
            {!paymentCompleted && (

              <CommonButton
                type="viewBetsBtn"
                label={"Continue"}
                onClick={() => {
                  paymentRedirect(paymentIntentData?.deeplink);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositeViaUpi;
