import { setSelectedCurrency } from "../redux/reducers/dashboard";
import {
  CHANGE_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
  OTP_VERIFY,
  REGISTER,
  RESET_PASSWORD,
} from "../constants/auth.api";
import { login, setRegisterPayload } from "../redux/reducers/authSlice";

export const loginFunc = async (
  makeRequest,
  payload,
  closeModal,
  dispatch,
  icons,
  navigate
) => {
  makeRequest({
    url: LOGIN,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    data: payload,
    reduxAction: login,
    onSuccessCallback: (res) => {
      const formattedCurrencies = res?.body?.walletCurrencies.map(
        (currency, index) => ({
          id: index + 1,
          label: currency,
          icon: icons[currency] || "defaultIcon", // Use a default icon if not found
          value: 0,
        })
      );
      dispatch(setSelectedCurrency(formattedCurrencies?.[0]));
      closeModal();
      navigate("/");
    },
  });
};

export const registerFunc = async (
  makeRequest,
  payload,
  closeModal,
  dispatch
) => {
  makeRequest({
    url: REGISTER,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    data: payload,
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200" || res?.responseCode === "201") {
        dispatch(setRegisterPayload(payload));
        closeModal();
      }
    },
  });
};

export const changePassword = async (makeRequest, payload, closeModal) => {
  makeRequest({
    url: `${CHANGE_PASSWORD}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    data: payload,
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200" || res?.responseCode === "201") {
        closeModal();
      }
    },
  });
};

export const resetPassword = async (makeRequest, payload, openModal, token) => {
  makeRequest({
    url: `${RESET_PASSWORD}?token=${token}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    data: payload,
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200" || res?.responseCode === "201") {
        openModal("login");
      }
    },
  });
};

export const forgotPassword = async (makeRequest, payload, closeModal) => {
  makeRequest({
    url: `${FORGOT_PASSWORD}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    data: payload,
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200" || res?.responseCode === "201") {
        closeModal();
      }
    },
  });
};

export const otpVerify = async (
  makeRequest,
  email,
  otp,
  closeModal,
  dispatch
) => {
  makeRequest({
    url: `${OTP_VERIFY}?email=${email}&token=${otp}`,
    method: "GET",
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200" || res?.responseCode === "201") {
        dispatch(setRegisterPayload(null));
        closeModal();
      }
    },
  });
};
