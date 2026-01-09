import axios from "axios";
import store from "../store";

// Create a new Axios instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_PLATFORM_BASEURL, //Base URL
  timeout: 50000, // Adjust timeout as needed
});

// Add an interceptor to include token and extra headers
instance.interceptors.request.use(
  function (config) {
    // Add token to headers if it exists
    const { user } = store.getState().auth;
    const token = user?.body?.userContextToken; // Retrieving token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add extra headers if provided
    if (config.extraHeaders) {
      config.headers = { ...config.headers, ...config.extraHeaders };
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

export default instance;
