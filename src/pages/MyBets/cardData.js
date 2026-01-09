import React, { useCallback, useEffect, useState } from "react";
import { BetCards, NoBetsFound } from "components";
import { infoIcon } from "assets";
import { useAxios } from "hooks";
import { cashoutAmount, fetchActiveBets } from "services/cricket.service";

const CardData = ({ setIsOpen, setSelectedBet, data, FetchBetsData, sportsBetsType }) => {
  const [confirmingBetId, setConfirmingBetId] = useState(null);
  // const settledBets = data?.filter((card) => card?.settled === false);
  const [cashoutMap, setCashoutMap] = useState({});
  const { makeRequest } = useAxios();

  const handleGetCashoutAmount = useCallback(() => {
    if (!data?.length) return;

    data.forEach((bet) => {
      fetchActiveBets(makeRequest, bet?.id, setCashoutMap);
    });
  }, [data, makeRequest]);

  useEffect(() => {
    if (data?.length > 0 && sportsBetsType === "Active Bet") {
      handleGetCashoutAmount();

      const interval = setInterval(() => {
        handleGetCashoutAmount();
      }, 3000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [data, handleGetCashoutAmount])

  const handleCashoutClick = (betId) => {
    if (confirmingBetId === betId) {
      const amount = cashoutMap[betId];
      if (amount) {
        const data = {
          betId,
          amount,
        };
        cashoutAmount(makeRequest, data, FetchBetsData);
        setCashoutMap({});
        setConfirmingBetId(null);
      }
    } else {
      setConfirmingBetId(betId); 
    }
  };

  const formatTicket = (createdAt, id) => {
    const date = new Date(createdAt);
    const formattedDate = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
    return `#${id}${formattedDate}`;
  };



  return (
    <div
      className={`grid grid-cols-1 place-self-center md:grid-cols-1 ${data?.length === 0 ? "place-self-center lg:grid-cols-1" : "lg:grid-cols-2"} gap-5 pt-6 w-full`}
    >
      {data?.length === 0 ? (
        <NoBetsFound title={"No Bets Found"} />
      ) : (
        data?.map((card, index) => {
          const isLuckyDraw = card?.eventTypeName?.toLowerCase()?.includes("lucky draw");
          const ticket = isLuckyDraw ? formatTicket(card?.createdAt, card?.id) : null;
          return (
            <BetCards
              key={index}
              date={card?.createdAt}
              status={card?.betStatus}
              match={card?.eventTypeName}
              result={card?.runnerName}
              odds={card?.odd}
              betAmount={card?.amount}
              betType={card?.betType}
              payout={card?.payOut}
              infoIcon={infoIcon}
              isButton={card?.isFancy === false && card?.settled === false}
              cashoutAmount={cashoutMap[card?.id]}
              isConfirming={confirmingBetId === card?.id}
              onCashoutClick={() => handleCashoutClick(card?.id)}
              isFancy={card?.isFancy}
              marketName={card?.marketName}
              gameName={card?.gameName}
              setIsOpen={() => {
                setSelectedBet(card);
                setIsOpen(true);
              }}
              ticket={ticket}
            />
          )
        })
      )}
    </div>
  );
};

export default CardData;
