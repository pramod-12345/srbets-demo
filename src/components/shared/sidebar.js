import React, { useEffect, useRef, useState } from "react";
import MenuItems from "./menuItems";
import { menuData } from "../../data";
import { CommonButton } from "components";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { sidebarImg } from "assets/svg/sidebar";

const SidebarContent = ({ sidebarToggle }) => {
  const navigate = useNavigate();
  const { sideBarData } = useSelector((state) => state?.dashboard);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const casinoSection = sideBarData?.casinoSection?.featuredCasinoGames;
  const sportsSection = sideBarData?.sportsSection?.featuredSportsGames;

  const getIconForCasinoGame = (gameName) => {
    const iconMapping = {
      "Blackjack": sidebarImg.blackJack,
      "Roulette": sidebarImg.roulette,
      "Poker": sidebarImg.poker,
      "Baccarat": sidebarImg.bacarat,
      "Deal or No Deal": sidebarImg.dealNoDeal,
      "Teen Patti": sidebarImg.teenPatti,
      "Texas Hold": sidebarImg.texasHold,
      "Speed Baccarat": sidebarImg.speedBacarate,
      "Stock Market": sidebarImg.stockMarket,
      "Casino Hold": sidebarImg.casinoHold,
      "Triple Card Poker": sidebarImg.tripleCard,
      "101 Candles": sidebarImg.candles,
    };
    // Find and return the appropriate icon
    return iconMapping[gameName] || sidebarImg.blackJack;
  };

  const getIconsForSportsGame = (gameName) => {
    const iconMapping = {
      "Cricket": sidebarImg.cricket,
      "Tennis": sidebarImg.tennis,
      "Football": sidebarImg.football,
      "Basketball": sidebarImg.basketball,
      "Horse Racing": sidebarImg.horseRacing,
      "Politics": sidebarImg.politics
    }
    return iconMapping[gameName] || null;
  };

  const updatedCasinoSection = casinoSection?.map((game) => ({
    ...game,
    icon: getIconForCasinoGame(game.name),
  }));

  const updatedSportsSection = sportsSection?.map((game) => ({...game, icon: getIconsForSportsGame(game.name)}));

  const filteredMenu = !isLoggedIn 
    ? menuData.accountButtons.buttons.filter(item => item.label !== "Logout") 
    : menuData.accountButtons.buttons;
  
  
  return (
    <div className="animate-bottomToTop">
      <div className="p-[18px] pb-0 pt-[1.812rem] flex flex-col gap-4 transition-all ease-in-out duration-500">
        {menuData.mainButtons.buttons.map((button, index) => (
          <CommonButton
            key={index}
            label={sidebarToggle ? null : button?.label}
            icon={button.icon}
            type={button?.type}
            onClick={() => navigate(button?.path)}
          />
        ))}
      </div>
      {isLoggedIn && <>
      <MenuItems
        sidebarToggle={sidebarToggle}
        buttons={filteredMenu}
        title={menuData.accountButtons.title}
      />
      <hr className="bg-lightgrey w-full h-[.2px] opacity-10" />
      </>}
      <MenuItems
        sidebarToggle={sidebarToggle}
        buttons={updatedSportsSection}
        title={menuData.sportsButtons.title}
      />
      <hr className="bg-lightgrey w-full h-[.2px] opacity-10" />
      <MenuItems
        sidebarToggle={sidebarToggle}
        buttons={updatedCasinoSection}
        title={menuData.allCasinos.title}
        isCasino={true}
      />
    </div>
  );
};

const Sidebar = ({ sidebarToggle, setSidebarToggle, isSmallScreen }) => {
  const [isCollapsed, setIsCollapsed] = useState(sidebarToggle);
  const [isCalculating, setIsCalculating] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    let animationTimeout;

    const handleSidebarChange = () => {
      if (sidebarRef.current) {
        setIsCalculating(true);

        clearTimeout(animationTimeout);
        animationTimeout = setTimeout(() => {
          const width = sidebarRef.current.offsetWidth;
          setIsCollapsed(width <= 120);
          setIsCalculating(false);
        }, 500);
      }
    };

    const observer = new MutationObserver(handleSidebarChange);
    if (sidebarRef.current) {
      observer.observe(sidebarRef.current, {
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    // Cleanup
    return () => {
      clearTimeout(animationTimeout);
      if (observer) observer.disconnect();
    };
  }, []);

  return (<div>
    {!sidebarToggle && isSmallScreen ? <div style={{
        maxHeight: "calc(100vh - 72px)",
        minHeight: "calc(100vh - 72px)",
      }} className="absolute bg-black bg-opacity-50 w-screen z-20" onClick={()=>setSidebarToggle(true)}/>: null}
    <aside
      ref={sidebarRef}
      style={{
        maxHeight: "calc(100vh - 72px)",
        minHeight: "calc(100vh - 72px)",
      }}
      className={`hidden ${isSmallScreen ? 'absolute left-0' : ''} z-20 sidebar-main no-scrollbar bg-blackRussian text-white h-full lg:flex flex-col overflow-auto ${
        sidebarToggle ? "min-w-[72px] w-[72px]" : "min-w-[260px] w-[260px]"
      } transition-all ease-in-out duration-300`}
    >
      
      {isCalculating ? null : isCollapsed ? (
        <SidebarContent sidebarToggle={true} />
      ) : (
        <SidebarContent />
      )}
    </aside>
    </div>
  );
};

export default Sidebar;
