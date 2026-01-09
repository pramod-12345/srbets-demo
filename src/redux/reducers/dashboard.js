import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  layoutData: null,
  bets: [],
  betSlipToggle: false,
  userBalance : null,
  isSearchFocused: false,
  selectedCurrency: null,
  isMbIframeFull: false,
  isLiveIframeFull : false,
  recentSearches: [],
  sideBarData: null
};

const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLayoutData: (state, action) => {
      state.layoutData = action.payload; // true for open, false for close
    },
    setSidebarData: (state, action) => {
      state.sideBarData = action.payload; // true for open, false for close
    },
    setBets: (state, action) => {
      state.bets = action.payload; // true for open, false for close
    },
    setBetSlipToggle: (state, action)=>{
      state.betSlipToggle = action.payload;
    },
    setUserBalance: (state, action)=>{
      state.userBalance = action.payload;
    },
    setIsSearchFocused: (state, action)=>{
      state.isSearchFocused = action.payload;
    },
    setSelectedCurrency: (state, action)=>{
      state.selectedCurrency = action.payload;
    },
    setMbIframeFull: (state, action)=>{
      state.isMbIframeFull = action.payload;
    },
    setRecentSearches: (state, action)=>{
      state.recentSearches = action.payload;
    },
    setIsLiveIframeFull: (state, action)=>{
      state.isLiveIframeFull = action.payload;
    },
    
  },
});

export const { setRecentSearches, setIsLiveIframeFull, setSidebarData, setLayoutData, setBets, setBetSlipToggle, setUserBalance, setIsSearchFocused, setSelectedCurrency, setMbIframeFull } = dashboard.actions;
export default dashboard.reducer;