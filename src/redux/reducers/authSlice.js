// authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isLoggedIn: false, // Default is logged out
  user: null,
  loading: false,
  modalType: null,
  isModalOpen: false,
  registerPayload: null
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      const decodedToken = jwtDecode(action?.payload?.body?.userContextToken);
      const userData = {...action.payload, ...decodedToken }
      state.user = userData; // Can store user info here
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      sessionStorage.clear();
      localStorage.clear();
    },
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
    setModalType: (state, action)=>{
      state.modalType = action.payload;
    },
    setRegisterPayload: (state, action)=>{
      state.registerPayload = action.payload;
    },
    toggleModal: (state, action) => {
      state.isModalOpen = action.payload; // true for open, false for close
    },
  },
});

export const { setModalType ,toggleModal, setLoader , login , logout, setRegisterPayload } = authSlice.actions;
export default authSlice.reducer;
