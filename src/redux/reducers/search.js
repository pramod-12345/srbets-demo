// src/redux/slices/recentSearchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const search = createSlice({
  name: "search",
  initialState: {
    recentSearches: [],
  },
  reducers: {
    setRecentSearches: (state, action) => {
      const newSearch = action.payload;
      // Prevent duplicates and limit to 5 items
      state.recentSearches = [newSearch, ...state.searches?.filter((item) => item.id !== newSearch.id)].slice(0, 5);
    },
    resetSearches: (state) => {
      state.searches = [];
    },
  },
});

export const { setRecentSearches, resetSearches } = search.actions;
export default search.reducer;
