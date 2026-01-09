import React, { useEffect, useState } from "react";
import Typography from "./typography";
import Seperator from "./seperator";
import { usdIcon, correctIcon } from "assets";
import CommonButton from "./button";
import { useDispatch, useSelector } from "react-redux";
import LazyImage from "./lazyImage";
import moment from "moment";
import { allIcons } from "helper/getIcons";
import { setModalType, toggleModal } from "../../redux/reducers/authSlice";
import { sidebarImg } from "assets/svg/sidebar";

export const BannerCard = ({
  bannerImg,
  containerStyle,
  imgStyle,
  onClick,
  link,
}) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const openModal = (type) => {
    dispatch(setModalType(type));
    dispatch(toggleModal(true));
  };
  return (
    <div
      onClick={isLoggedIn ? onClick : () => openModal('login')}
      className={`${containerStyle} max-h-[16.5rem] w-[560px] hover:cursor-pointer`}
    >
      <LazyImage src={bannerImg} alt="" divClassName={'min-w-[189px] md:min-w-[279px]'} link={link} className={`${imgStyle} rounded-[1.25rem] w-full`} />
    </div>
  );
};

export const CasinoCard = ({ icon }) => {
  return (
    <div className="min-w-max  max-w-[11rem] flex items-center justify-center gap-6">
      <img className="max-w-[11rem] " alt="" src={icon} loading="lazy" />
    </div>
  );
};

export const SportsCard = ({
  bgImg,
  title,
  number,
  onClick,
  width,
  style,
  isHome,
}) => {
  return (
    <div
      className={`${width === "176px"
        ? isHome
          ? "min-w-[128px] max-w-[128px] md:max-w-[176px] md:min-w-[176px]"
          : "min-w-[109px] md:max-w-[176px] md:min-w-[176px]"
        : "md:min-w-[176px]"
        } w-full min-h-[178px] md:min-h-[280px] h-auto transform transition duration-300 hover:-translate-y-2 ${style}`}
    >
      <div
        className="rounded-xl md:rounded-[20px] w-full h-full overflow-hidden bg-cover md:bg-contain relative"
        onClick={onClick}
      >
        <LazyImage
          src={bgImg}
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl rounded-[20px]"
        />

        <div className="flex flex-col h-[inherit] justify-end relative z-10 p-2">
          {/* Title */}
          {title && (
            <div className="flex pt-1.5 pl-1 items-center">
              <h1 className="text-white text-[20px] md:text-[28px] font-bold md:font-black tracking-wider drop-shadow-lg">
                {title}
              </h1>
            </div>
          )}
          {/* Playing Count */}
          {number && (
            <div className="flex items-center bg-black/50 gap-px md:gap-[7px] text-white text-xs py-1 md:py-2 px-2 rounded-full w-fit">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              <div className="flex items-center gap-1">
                <Typography
                  color={"text-white"}
                  variant={"size12Bold"}
                  content={number}
                />
                <Typography
                  color={"text-white"}
                  variant={"size12Normal"}
                  content={"Playing"}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const BetCards = ({
  date,
  status,
  match,
  result,
  odds,
  betAmount,
  betType,
  payout,
  infoIcon,
  marketName,
  isButton = false,
  cashoutAmount = 0,
  setIsOpen,
  currencyIcon,
  onCashoutClick,
  isConfirming,
  isFancy,
  ticket,
  gameName
}) => {

  const iconSrc = allIcons[currencyIcon];
  const getIconsForSportsGame = (game) => {
    const iconMapping = {
      "Cricket": sidebarImg.cricket,
      "Tennis": sidebarImg.tennis,
      "Football": sidebarImg.football,
      "Soccer": sidebarImg.football,
      "Basketball": sidebarImg.basketball,
      "Horse Racing": sidebarImg.horseRacing,
      "Politics": sidebarImg.politics
    }
    return iconMapping[game] || null;
  };
  const gameIcon = getIconsForSportsGame(gameName)
  
  return (
    <div className="bg-ebonyClay w-full rounded-lg shadow-lg flex flex-col">
      <div className="flex justify-between items-center px-4 py-3">
        <Typography
          color={"vintageRibbon"}
          variant={"size14Bold"}
          content={moment(date).format("DD MMM YYYY [at] hh:mm A")}
        />
        <div className="flex items-center gap-2">
          <div
            className={`flex justify-center text-[10px] py-0.5 px-1 items-center w-fit h-[16px] rounded ${status === "WIN" ? "bg-mountainMeadow" : "bg-carminePink"
              }`}
          >
            <Typography
              color={"white"}
              variant={"size10SemiBold"}
              content={status}
            />
          </div>
          <span className="cursor-pointer" onClick={setIsOpen}>
            <img src={infoIcon} alt="Info" loading="lazy" />
          </span>
        </div>
      </div>

      <div className="bg-darkByzantineBlue rounded-b-lg p-4 flex-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <img className="w-5 h-5" alt="" src={gameIcon}/>
            <Typography
              color={"vintageRibbon"}
              variant={"size14Bold"}
              content={gameName}
            />
          </div>
          <Typography
            color={"vintageRibbon"}
            variant={"size14Bold"}
            content={match}
          />
          <Typography
            color={"vintageRibbon"}
            variant={"size14Normal"}
            content={marketName}
          />
          <div className="flex justify-between items-center">
            <Typography
              color={"white"}
              variant={"size14Semibold"}
              content={result}
            />
            <div className="text-right">
              <Typography
                color={"primary"}
                variant={"size14Semibold"}
                content={`${odds} ${isFancy ? (betType === 'Back' ? '( Yes )' : '( No )') : ''}`}
              />
            </div>
          </div>
          {
            ticket && (
              <div className="flex justify-between items-center">
                <Typography
                  color={"white"}
                  variant={"size14Semibold"}
                  content={"Ticket"}
                />
                <div className="text-right">
                  <Typography
                    color={"primary"}
                    variant={"size14Semibold"}
                    content={ticket}
                  />
                </div>
              </div>
            )
          }
        </div>
        <div className="py-6">
          <Seperator color={"ebonyClay"} />
        </div>
        <div className="space-y-2 text-white mt-2">
          <div className="flex justify-between text-[14px] leading-4">
            <span className="text-vintageRibbon">Odds</span>
            <Typography
              color={"vintageRibbon"}
              variant={"size14Normal"}
              content={`${odds}`}
            />
          </div>
          <div className="flex justify-between text-[14px] leading-4">
            <span className="text-vintageRibbon">Total bet amount</span>
            <div className="flex gap-1 items-center">
              <Typography
                color={"white"}
                variant={"size14Normal"}
                content={`${betAmount}`}
              />{" "}
              {iconSrc && (
                <img
                  src={iconSrc}
                  alt="Dollar Icon"
                  loading="lazy"
                  className="w-4 h-4"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between text-[14px] leading-4">
            <Typography
              color={"vintageRibbon"}
              variant={"size14Semibold"}
              content={"Payout"}
            />
            <div className="flex gap-1 items-center">
              <Typography
                color={"white"}
                variant={"size14Semibold"}
                content={`${payout}`}
              />{" "}
              {iconSrc && (
                <img
                  src={iconSrc}
                  alt="Dollar Icon"
                  loading="lazy"
                  className="w-4 h-4"
                />
              )}
            </div>
          </div>
        </div>
        {isButton &&
          <CommonButton
            disabled={cashoutAmount === 0}
            onClick={() => onCashoutClick && onCashoutClick()}
            label={
              cashoutAmount === 0
                ? "Cashout Not Available"
                : isConfirming
                  ? `Confirm Cashout ${cashoutAmount}`
                  : `Cashout ${cashoutAmount}`
            }
            type={isConfirming ? "confirmCashoutBtn" : "cashoutBtn"}
          />
        }
      </div>
    </div>
  );
};

export const BetSlipCards = ({
  isInput = false,
  data,
  onBetChange,
  betAmount,
  currencySymbol,
  userBalance,
  setLowBalanceMessage,
  handleFocus
}) => {
  const [animate, setAnimate] = useState(false);
  const isBalanceLow = betAmount > userBalance; // Check if balance is low

  // Helper function for rounding
  const roundToNiceAmount = (amount) => {
    if (amount < 1000) {
      return Math.round(amount / 100) * 100;
    } else {
      return Math.round(amount / 1000) * 1000;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    onBetChange(data?.unique_id, parseFloat(value) || 0);
  };

  const estimatedPayout = betAmount
    ? (betAmount * (data?.sportsDetails ? 2 : parseFloat(data?.odds?.value))).toFixed(2)
    : "0.00";

  useEffect(() => {
    const timeoutId = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setLowBalanceMessage(isBalanceLow ? true : false);
  }, [isBalanceLow, setLowBalanceMessage]);

  return (
    <>
      <div
        className={`bg-darkByzantineBlue grow rounded-lg betslip-card ${animate ? "betslip-animate" : ""}`}
      >
        <div className="flex bg-ebonyClay px-4 py-3 items-center gap-2 rounded-t-lg">
          <Typography
            variant={"size14Medium"}
            color={"vintageRibbon"}
            content={data?.matchName}
          />
          <img src={correctIcon} alt="Correct" loading="lazy" />
        </div>

        <div className="px-4 pt-4">
          <Typography
            variant={"size14Medium"}
            color={"vintageRibbon"}
            content={data?.betTitle ? data?.betTitle : "Winner"}
          />
          <div className="flex justify-between items-center mt-2">
            <Typography
              variant={"size14Medium"}
              color={"white"}
              content={data?.name ? data?.name : data?.odds?.type === 'Lay' ? 'No' : 'Yes'}
            />
            <Typography
              variant={"size14Medium"}
              color={"primary"}
              content={data?.odds?.value}
            />
          </div>
        </div>

        <div className="flex justify-between items-center mt-2 px-4 pb-6">
          <div>
            {/* Conditional Rendering */}
            {isInput ? (
              <div className="flex flex-col items-center gap-2">
                <div className="relative flex items-center bg-themeBlack text-white rounded-lg px-4 py-2 border border-ebonyClay w-[140px]">
                  {/* Input Box */}
                  <input
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    placeholder="0.00"
                    value={betAmount}
                    onFocus={handleFocus}
                    onChange={handleInputChange}
                    className="bg-transparent text-sm flex-1 outline-none placeholder-white max-w-[90px]"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex gap-2 mt-1">
                  {[
                    { label: roundToNiceAmount(userBalance * 0.10), value: roundToNiceAmount(userBalance * 0.10) },
                    { label: roundToNiceAmount(userBalance * 0.25), value: roundToNiceAmount(userBalance * 0.25) },
                    { label: roundToNiceAmount(userBalance * 0.50), value: roundToNiceAmount(userBalance * 0.50) },
                    { label: Math.floor(userBalance), value: Math.floor(userBalance) },
                  ].map((btn, i) => (
                    <button
                      key={btn.label + i}
                      type="button"
                      className="bg-ebonyClay text-white rounded px-3 py-1 text-xs hover:bg-primary transition"
                      onClick={() => onBetChange(data?.unique_id, btn.value)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {/* Display Total Bet Amount */}
                <Typography
                  variant="size12Normal"
                  color="vintageRibbon"
                  content="Total Bet Amount"
                />
                <div className="flex items-center gap-1 mt-1">
                  <Typography
                    variant="size14Semibold"
                    color="vintageRibbon"
                    content="$1.00"
                  />
                  <img
                    src={usdIcon}
                    alt="Dollar Icon"
                    loading="lazy"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="text-right">
            {/* <div className="text-vintageRibbon text-[12px] leading-3 fon">
              Est. payout
            </div> */}
            <Typography
              variant={"size12Normal"}
              color={"vintageRibbon"}
              content={"Est. payout"}
            />
            <div className="gap-1 mt-1">
              <Typography
                variant={"size14Semibold"}
                color={"vintageRibbon"}
                content={`${currencySymbol}${estimatedPayout}`}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const CasinoGamesCards = () => {
  return (
    <div className="bg-blackRussian p-6 rounded-[20px] rounded-lg w-[360px] h-[200px] flex flex-col justify-between relative">
      {/* Title */}
      <div className="flex flex-col justify-center">
        <Typography
          color={"primary"}
          variant={"size12Semibold"}
          content={"TEEN PATTI"}
        />
        <div className="mt-1.5">
          <Typography
            color={"white"}
            variant={"size16Semibold"}
            content={"Offer name goes here"}
          />
        </div>
        <div className="mt-2">
          <Typography
            variant={"size14Medium"}
            color={"vintageRibbon"}
            content={"3 Sixes payout"}
          />
        </div>
      </div>

      {/* Button */}
      <div className="mt-auto">
        <CommonButton label={"Play now"} type="playNowBtn" />
      </div>

      {/* Placeholder for image */}
      <div className="absolute top-6 right-4 w-[104px] h-[104px] bg-themeBlack rounded-2xl"></div>
    </div>
  );
};
