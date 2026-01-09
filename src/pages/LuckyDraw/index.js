import { Typography } from 'components';
import { useAxios } from 'hooks';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { placeBets } from 'services/cricket.service';
import { checkBalance } from 'services/dashboard.service';
import { Ticket100, Ticket1000, Ticket10000, Ticket2000, Ticket500 } from "assets";

const LuckyDraw = () => {
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const { selectedCurrency } = useSelector((state) => state.dashboard)
  const { user } = useSelector((state) => state?.auth);
  // eslint-disable-next-line
  const [data, setData] = useState(null)

  const tickets = [
    { image: Ticket100, amount: 100 },
    { image: Ticket500, amount: 500 },
    { image: Ticket1000, amount: 1000 },
    { image: Ticket2000, amount: 2000 },
    { image: Ticket10000, amount: 10000 },
  ];

  const CheckBalance = useCallback(() => {
    const payload = {
      userId: user?.id,
      currency: selectedCurrency?.label,
    };
    checkBalance(makeRequest, payload, dispatch);
  }, [user?.id, dispatch, makeRequest, selectedCurrency?.label]);

  const handleBet = async (amount) => {
    const payload = [{
      amount: amount,
      currencyType: selectedCurrency?.label,
      marketId: "7.000000001",
      "matchId": "70000001",
      "odds": {
        "type": "Back",
        "value": 500
      },
      "runnerID": "70000015",
    }];
    placeBets(makeRequest, payload, dispatch, setData, CheckBalance);
  };

  return (
    <>
      <Typography color={"white"} variant={"h1"} content={"The Winning Ticket"} />
      <div className='mt-4'>
        <Typography color={"white"} variant={"size16Semibold"} content={"Weekly Lucky Draw closes at 3 PM every Friday, the winner will be announced at 8 PM every Friday."} />
      </div>

      <div className="mt-8">
        <div id="imagebackground" className="bg-lucky-draw p-4 rounded-lg">

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full'>
            {tickets.map((ticket, index) => (
              <div
                key={index}
                className={`relative cursor-pointer transform transition-all duration-300 hover:scale-105`}
                onClick={() => handleBet(ticket.amount)}
              >
                <img
                  src={ticket.image}
                  alt={`${ticket.amount} Ticket`}
                  className="w-full rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div className=" mb-6">
          <Typography
            color={"white"}
            content={"Rules and Regulation"}
            variant={"h3"}
          />
        </div>
        <section className="mb-6">
          <Typography
            color={"vintageRibbon"}
            content={"Get ready to win exciting rewards in our exclusive lucky draw event! When you grab a ticket, you’re not just hoping for the 1st prize — you’re entering a world of multiple chances to win BIG."}
            variant={"size14Medium"}
          />
        </section>

        <section className="mb-6">
          <ul className="list-disc">
            <li>
              <Typography color={"vintageRibbon"} content={"🏆 Grand Prize :"} variant={"size16Semibold"} />
              <br />
              <Typography className="pl-3" color={"vintageRibbon"} variant={"size14Medium"} content={"The prize shown on your ticket is for the 1st Prize Winner."} /><br/>
              <Typography className="pl-3" color={"vintageRibbon"} variant={"size14Medium"} content={"One lucky winner will walk away with the grand reward — the highest prize of all!"} />
            </li>
            <br />

            <li>
              <Typography color={"vintageRibbon"} content={"🎁 More Ways to Win :"} variant={"size16Semibold"} />
              <br />
              <Typography className="pl-3" color={"vintageRibbon"} variant={"size14Medium"} content={"We believe in rewarding more winners! That’s why we offer generous prizes to top participants beyond just the 1st place:"} />
              <ul className='pl-3 mt-2 list-disc space-y-2'>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"2nd Prize – 50% of the 1st prize amount"} />
                </li>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"3rd Prize – 25% of the 1st prize amount"} />
                </li>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"Lots of random prizes and cashbacks and much more"} />
                </li>
              </ul>
            </li>
            <br />
            <li>
              <Typography color={"vintageRibbon"} content={"🎟 How It Works :"} variant={"size16Semibold"} />
              <br />
              <ol className='pl-3 mt-2 list-decimal space-y-2'>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"1. Buy your lucky draw ticket."} />
                </li>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"2. Check your ticket — the prize displayed is for the 1st place."} />
                </li>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"3. Participate and stay tuned for the results."} />
                </li>
                <li>
                  <Typography color={"vintageRibbon"} variant={"size14Medium"} content={"4. Even if you're not 1st, you might still be a winner!"} />
                </li>
              </ol>
            </li>
          </ul>
        </section>
        <section className="mb-6">
          <Typography
            color={"vintageRibbon"}
            content={"Ready to try your luck?!"}
            variant={"size16Semibold"}
          /><br/>
          <Typography
            color={"vintageRibbon"}
            content={"The more tickets you hold, the higher your chances to win!"}
            variant={"size16Semibold"}
          />
        </section>
      </div>
    </>
  );
};

export default LuckyDraw;
