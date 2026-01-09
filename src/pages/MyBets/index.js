import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Table, BetDetails, Pagination } from "components";
import CardData from "./cardData";
import { fetchCasinoBets, fetchMyBets } from "services/cricket.service";
import { useAxios } from "hooks";
import { useSelector } from "react-redux";
import moment from "moment";

const MyBets = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState(null);
  const { makeRequest } = useAxios();
  const { myBetsData, casinoBetsData } = useSelector((state) => state.game);
  const data = myBetsData?.payload?.body?.content;
  const [currentPage, setCurrentPage] = useState(0);
  const [sportsBetsType, setSportsBetsType] = useState("Active Bet");
  const [currentSportPage, setCurrentSportPage] = useState(0);
  const pageSize = 10;

  const columns = [
    { header: "GAME", key: "gameName", showOnMobile: true },
    {
      header: "BET ID",
      key: "id",
      render: (value) => {
        return <span className="text-primary">{value}</span>;
      },
    },
    {
      header: "TIME",
      key: "time",
      render: (value) => {
        return <span> {moment(value).format("hh:mm A")}</span>;
      },
    },
    {
      header: "BET AMOUNT",
      key: "betAmount",
      alignItems: "text-end",
      render: (value, row = {}) => {
        return (
          <div className="flex items-center justify-end space-x-2 ">
            <span>{value}</span>
          </div>
        );
      },
      showOnMobile: true,
    },
    {
      header: "MULTIPLIER",
      key: "multiplier",
      alignItems: "text-end",
      render: (value, row = {}) => {
        return (
          <div className="flex items-center justify-end space-x-2">
            <span>{value}</span>
          </div>
        );
      },
    },
    {
      header: "PAYOUT",
      key: "payOut",
      alignItems: "text-end",
      showOnMobile: true,
      render: (value, row = {}) => {
        const textColor =
          row?.multiplier > 0 ? "text-green-500" : "text-Amaranth";
        return (
          <div className="flex items-center justify-end space-x-2">
            <span className={textColor}>{value}</span>
          </div>
        );
      },
    },
  ];

  const tabs = [
    { id: "sports", label: "Sports" },
    { id: "casino", label: "Casino" },
  ];

  const handleClose = () => {
    setIsOpen(false);
    setSelectedBet(null);
  };

  const FetchBetsData = useCallback(
  (page = 0) => {
    const isSettled = sportsBetsType === "Settled Bet";
    fetchMyBets(makeRequest, page, pageSize, isSettled);
  },
  [makeRequest, pageSize, sportsBetsType]
);

  const FetchCasinoBetsData = useCallback(
    (page = 0) => {
      fetchCasinoBets(makeRequest, page, pageSize);
    },
    [makeRequest, pageSize]
  );

  useEffect(() => {
    FetchBetsData();
    FetchCasinoBetsData();
  }, [FetchBetsData, FetchCasinoBetsData]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    FetchCasinoBetsData(newPage);
  };

  const handleSportPageChange = (newPage) => {
    setCurrentSportPage(newPage);
    FetchBetsData(newPage);
  };

  return (
    <>
      <div className="mt-5 flex flex-col items-center justify-between ">
        <Tabs
          tabs={tabs}
          isOptions={true}
          setSportsBetsType={setSportsBetsType}
        >
          <div id="sports" className="space-y-8">
            <CardData
              setIsOpen={setIsOpen}
              data={data}
              sportsBetsType={sportsBetsType}
              FetchBetsData={FetchBetsData}
              setSelectedBet={setSelectedBet}
            />
            {data?.length === 0 || myBetsData?.payload?.body?.totalPages === 1 ? null : <Pagination
              currentPage={currentSportPage}
              totalPages={myBetsData?.payload?.body?.totalPages || 1}
              onPageChange={handleSportPageChange}
            />}
          </div>
          <div id="casino" className="mt-5">
            <Table
              columns={columns}
              data={casinoBetsData?.payload?.content}
              id={"top-bets"}
            />
            {casinoBetsData?.payload?.content?.length === 0 || casinoBetsData?.payload?.totalPages === 1 ? null :<Pagination
              currentPage={currentPage}
              totalPages={casinoBetsData?.payload?.totalPages || 1}
              onPageChange={handlePageChange}
            />}
          </div>
        </Tabs>
      </div>
      {isOpen && <BetDetails handleClose={handleClose} bet={selectedBet} />}
    </>
  );
};

export default MyBets;
