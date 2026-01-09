import { useCallback } from "react";
import axiosInstance from "../services/axios";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setLoader, toggleModal } from "../redux/reducers/authSlice";
import { useToast } from "./toasterProvider";

const jsonHeader = { "content-type": "application/json" };

const useAxios = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  const { modalType } = useSelector((state) => state?.auth)

  const makeRequest = useCallback(
    async ({
      url,
      method = "GET",
      data = null,
      headers = jsonHeader,
      reduxAction = null,
      onSuccessCallback = null,
      route = null,
      isToastVisible = true,
      toggleLoader = true,
      duration,
      isBetPlaced = false,
      isPayout = false
    }) => {
      if (toggleLoader) {
        dispatch(setLoader(true));
      }

      try {
        const response = await axiosInstance({
          url,
          method,
          data,
          headers,
        });
        if (response?.status === 200 || response?.status === 201) {
          if (isToastVisible) {
            const hasFailed = isBetPlaced
              ? response?.data?.body?.some((item) => item?.status === "FAILED")
              : false;

            if (hasFailed) {
              showToast("error", response?.data?.responseMessage, duration);
            } else {
              showToast("success", isPayout ? response?.data?.body : response?.data?.responseMessage, duration);
            }
          }
        }

        // Dispatch Redux action
        if (reduxAction) {
          dispatch(reduxAction(response.data));
        }

        // Call the success callback if provided
        if (onSuccessCallback) {
          onSuccessCallback(response.data || response);
        }

        if (route) {
          navigate(route);
        }
      } catch (error) {
        // Handle errors
        if (onSuccessCallback) {
          onSuccessCallback(error?.response?.data);
        }
        if (isToastVisible && !isBetPlaced) {
          showToast("error", error?.response?.data?.responseMessage, duration);
        }
        if (isToastVisible && isBetPlaced) {
          showToast("error", error?.response?.data?.body?.[0]?.errorMessage, duration);
        }

        let status = error?.response?.status

        if (status === 404) {
          if (modalType === "withdraw") {
            showToast("error", error?.response?.data?.detail, duration);
          } else {
          showToast("error", error?.response?.data?.detail || error?.response?.data?.responseMessage || error?.message || "Something Went Wrong")
            navigate("*");
            dispatch(toggleModal(false))
          }
        }
        if (status === 500 || status === 400) {
          if(location.pathname.includes("my-bets")){
              showToast("error" , error?.response?.data?.responseMessage)
          } else {
            showToast("error", error?.response?.data?.detail || error?.response?.data?.responseMessage ||  error?.response?.data?.body?.responseMessage || error?.message || "Something Went Wrong")
            navigate("/server-error")
          }
        }
        console.error("Request failed:", error); // Log the error for debugging
      } finally {
        if (toggleLoader) {
          dispatch(setLoader(false)); // Hide the loader after the request completes
        }
      }
    },
    [dispatch, navigate, showToast, modalType, location.pathname]
  );

  return { makeRequest };
};

export default useAxios;
