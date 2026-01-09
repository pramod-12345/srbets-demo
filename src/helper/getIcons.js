import { btcIcon, euro, rupees, usdIcon } from "assets";
import { sidebarImg } from "assets/svg/sidebar";

export const getIconForCasinoGame = (gameName) => {
  const iconMapping = {
    Blackjack: sidebarImg.blackJack,
    Roulette: sidebarImg.roulette,
    Poker: sidebarImg.poker,
    Baccarat: sidebarImg.bacarat,
    "Deal or No Deal": sidebarImg.dealNoDeal,
    "Teen Patti": sidebarImg.teenPatti,
    "Texas Hold": sidebarImg.texasHold,
    "Speed Baccarat": sidebarImg.speedBacarate,
    "Stock Market": sidebarImg.stockMarket,
    "Casino Hold": sidebarImg.casinoHold,
    "Triple Card Poker": sidebarImg.tripleCard,
    "101 Candles": sidebarImg.candles,
    Cricket: sidebarImg.cricket,
    Tennis: sidebarImg.tennis,
    Football: sidebarImg.football,
    Basketball: sidebarImg.basketball,
    "Horse Racing": sidebarImg.horseRacing,
    Politics: sidebarImg.politics,
  };
  // Find and return the appropriate icon
  return iconMapping[gameName] || sidebarImg.blackJack;
};

export const getBalanceIcon = (currencyLabel) => {
  const currencyIcons = {
    USD: usdIcon,
    INR: rupees,
    BTC: btcIcon,
    EUR: euro,
    // AED : aedIcon,
    // PKR: rupees
  };

  return currencyIcons[currencyLabel] || null;
};

export const getBalanceDetails = (currencyLabel) => {
  const currencyDetails = {
    USD: { icon: usdIcon, symbol: "$" },
    INR: { icon: rupees, symbol: "₹" },
    BTC: { icon: btcIcon, symbol: "₿" },
    EUR: { icon: euro, symbol: "€" },
    // AED : {icon : aedIcon, symbol :"د.إ"},
    PKR: { icon: null, symbol: "₨" },
  };

  return currencyDetails[currencyLabel] || { icon: null, symbol: null };
};

export const allIcons = {
  INR: rupees,
  USD: usdIcon,
  EUR: euro,
  BTC: btcIcon,
  // PKR: rupees
};
