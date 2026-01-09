import { setBets, setBetSlipToggle } from "../redux/reducers/dashboard";
import {
  setCasinoBetsData,
  setCricketData,
  setCricketOddsDetails,
  setCricketScoreDetails,
  setMyBetsData,
} from "../redux/reducers/gameSlice";

export const fetchCricketLayout = (makeRequest, bool, id) => {
  makeRequest({
    url: `api/getSportsDetails?sports_id=${id}`,
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    reduxAction: setCricketData,
    isToastVisible: false,
    toggleLoader: bool,
  });
};
export const fetchCricketOddsDetails = (makeRequest, id, bool, dispatch) => {
  makeRequest({
    url: `api/getOddsDetails?event_id=${id}`,
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200") {
        dispatch(setCricketOddsDetails(res?.body));
      }
    },
    isToastVisible: false,
    toggleLoader: bool,
  });
};
export const fetchSportsRecentBets = (
  makeRequest,
  setData,
  setLoading,
  page,
  pageSize,
) => {
  makeRequest({
    url: `api/sports/recent?page=${page}&size=${pageSize}`,
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    onSuccessCallback: (res) => {
      setData(res);
      setLoading(false);
    },
    isToastVisible: false,
    toggleLoader: false,
  });
};
export const fetchSportsRecentBetsById = (
  makeRequest,
  setData,
  setLoading,
  page,
  pageSize,
  id
) => {
  makeRequest({
    url: `api/sports/recent?sports_id=${id}&page=${page}&size=${pageSize}`,
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    onSuccessCallback: (res) => {
      setData(res);
      setLoading(false);
    },
    isToastVisible: false,
    toggleLoader: false,
  });
};

export const fetchMyBets = (makeRequest, page, pageSize, isSettled = false) => {
  makeRequest({
    url: `api/sports/my-bets?page=${page}&size=${pageSize}&isSettled=${isSettled}`,
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    reduxAction: setMyBetsData,
    isToastVisible: false,
  });
};

export const fetchCasinoBets = (makeRequest, page, pageSize) => {
  makeRequest({
    url: `api/casino/my-bets?page=${page}&size=${pageSize}`,
    headers: {
      "Content-Type": "application/json",
      clientKey: "QXNoaXNo",
      clientId: "QXNoaXNo",
    },
    reduxAction: setCasinoBetsData,
    isToastVisible: false,
  });
};

export const placeBets = async (
  makeRequest,
  payload,
  dispatch,
  setBetAmounts,
  cb,
) => {
  makeRequest({
    url: `api/sports/debit`,
    method: "POST",
    data: payload,
    isBetPlaced: true,
    onSuccessCallback: (res) => {
      if (res?.responseCode === "200" || res?.responseCode === "201") {
        dispatch(setBets([]));
        dispatch(setBetSlipToggle(false));
        setBetAmounts({});
        cb();
      }
    },
    isToastVisible: true,
    toggleLoader: true,
    duration: 3000,
  });
};


export const fetchCricketScore = (makeRequest, matchId, dispatch) => {
  makeRequest({
    url: `api/score?matchId=${matchId}`,
    headers: {
      "Content-Type": "application/json",
    },
    onSuccessCallback: (res) => {
      if (res?.data) {
        dispatch(setCricketScoreDetails(res));
      }else{
        dispatch(setCricketScoreDetails({}));
      }
    },
    isToastVisible: false,
    toggleLoader: false,
  });
};

export const fetchCricketScoreLanding = (makeRequest, matchId, setScoreData, dispatch) => {
  makeRequest({
    url: `api/score?matchId=${matchId}`,
    headers: {
      "Content-Type": "application/json",
    },
    onSuccessCallback: (res) => {
      if (res?.data) {
        setScoreData(res);
      }else{
        dispatch(setCricketScoreDetails({}));
      }
    },
    isToastVisible: false,
    toggleLoader: false,
  });
};

export const fetchActiveBets = (makeRequest, betid, setActiveData) => {
  makeRequest({
    url: `api/sports/cashout/preview?originalBetId=${betid}`,
    headers: {
      "Content-Type": "application/json",
    },
    onSuccessCallback: (res) => {
      if (res?.body?.balance !== undefined) {
        setActiveData((prev) => ({
          ...prev,
          [betid]: res.body.balance,
        }));
      }
    },
    isToastVisible: false,
    toggleLoader: false,
  });
};

export const cashoutAmount = (makeRequest, data, FetchBetsData) => {
  makeRequest({
    url: `api/sports/cashout`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    onSuccessCallback: (res) => {
      if (res) {
        FetchBetsData()
      }
    },
    isToastVisible: true,
    toggleLoader: false,
  });
};

