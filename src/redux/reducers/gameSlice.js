import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  gameId: null,
  cricketData: null,
  myBetsData: null,
  casinoBetsData: null,
  cricketOddsDetails: null,
  cricketScoreDetails: null
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setCricketData: (state, action) => {
      state.cricketData = action.payload;
    },
    setMyBetsData: (state, action) => {
      state.myBetsData = action
    },
    setCasinoBetsData: (state, action) => {
      state.casinoBetsData = action
    },
    setCricketOddsDetails: (state, action) => {
      state.cricketOddsDetails = action?.payload
    },
    setCricketScoreDetails: (state, action) => {
      state.cricketScoreDetails = action?.payload
    },
  },
});

export const { setGameId , setCricketData , setMyBetsData , setCasinoBetsData, setCricketOddsDetails,setCricketScoreDetails } = gameSlice.actions;

export default gameSlice.reducer;
