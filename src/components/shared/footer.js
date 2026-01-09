import React from "react";
import { Typography, Seperator } from "components";
import { footer } from "../../assets/svg/footer";
import { footerData } from "../../data";
import { odds777, odds777Light } from "assets";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setBets,
  setBetSlipToggle,
  setUserBalance,
} from "../../redux/reducers/dashboard";
import {
  logout,
  setModalType,
  toggleModal,
} from "../../redux/reducers/authSlice";
import { useToast } from "hooks";
import { useContext } from "react";
import { ThemeContext } from "context/ThemeProvider";

const Footer = () => {
  const location = useLocation()
  const {theme} = useContext(ThemeContext)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showToast = useToast();
  const { sideBarData } = useSelector((state) => state?.dashboard);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const casinoSection = sideBarData?.casinoSection?.featuredCasinoGames;
  const sportsSection = sideBarData?.sportsSection?.featuredSportsGames;

  const coins = [
    { icon: footer?.betblocker },
    { icon: footer?.bitcoin },
    { icon: footer?.bitcoincash },
    { icon: footer?.dogecoin },
    { icon: footer?.ethereum },
    { icon: footer?.hub88 },
    { icon: footer?.litecoin },
    { icon: footer?.responsiveGaming },
    { icon: footer?.tether },
    { icon: footer?.tron },
  ];

  const handleGameEntry = (id, imageUrl, game) => {
    navigate(`/game-entry/${id}`, {
      state: { imageUrl: imageUrl, gameData: game },
    });
  };

  const openModal = (type) => {
    dispatch(setModalType(type));
    dispatch(toggleModal(true));
  };

  const handleSportEntry = () => {
    navigate("/sports-landing");
  };

  const handleLogout = () => {
    dispatch(logout({}));
    dispatch(setUserBalance(null));
    dispatch(setBets([]));
    showToast("success", "Logout Successfully");
    navigate("/");
    dispatch(setBetSlipToggle(false));
  };

  const sportslanding = location.pathname.includes("sports-landing")
  const sportsDetails = location.pathname.includes("sports-details")
  const isCricket = sportslanding || sportsDetails
  const isLightMode = theme === "light" && isCricket

  return (
    <footer className="my-12">
      <div className="flex items-center justify-between py-7">
        <div className="flex flex-col gap-7 sm:gap-3">
          <div className="flex items-center gap-3 font-monasans">
            <img
              src={isLightMode ? odds777Light : odds777}
              alt="logo"
              className="sm:h-14 h-10"
              loading="lazy"
            />
          </div>
          <Typography
            color={"purpleFog"}
            variant={"size14Medium"}
            content={"© 2025 ODDS777 | All Rights Reserved."}
          />
        </div>
      </div>
      <Seperator color={"yankeesBlue"} />
      <div className=" sm:py-8 py-5 sm:px-4 px-0">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
          <div key="casino">
            <Typography
              color={"purpleFog"}
              variant={"size12Medium"}
              content={"CASINO"}
            />
            <ul className="mt-4 gap-2 flex flex-col">
              {casinoSection?.map((game , index) => (
                <li
                  onClick={() =>
                    isLoggedIn
                      ? handleGameEntry(game.id, game?.imageUrl, game)
                      : openModal("login")
                  }
                  key={index}
                  className="transition duration-200 cursor-pointer"
                >
                  <Typography
                   color = {isLightMode ? "themeBlack" : "white"}
                    variant={"size12Normal"}
                    content={game.name}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div key="sports">
            <Typography
              color={"purpleFog"}
              variant={"size12Medium"}
              content={"SPORTS"}
            />
            <ul className="mt-4 gap-2 flex flex-col">
              {sportsSection?.map((game) => (
                <li
                  onClick={() =>
                    isLoggedIn ? handleSportEntry() : openModal("login")
                  }
                  key={game.id}
                  className="transition duration-200 cursor-pointer"
                >
                  <Typography
                    color = {isLightMode ? "themeBlack" : "white"}
                    variant={"size12Normal"}
                    content={game.name}
                  />
                </li>
              ))}
            </ul>
          </div>
          {footerData.map((section, index) => (
            <div key={index} className="">
              <Typography
                color={"purpleFog"}
                variant={"size12Medium"}
                content={section.section?.toUpperCase()}
              />
              <ul className="mt-4 gap-2 flex flex-col">
                {section.links
                  .filter(
                    (link) =>
                      isLoggedIn || link?.label?.toLowerCase() !== "logout"
                  )
                  .map((link, linkIndex) => (
                    <li
                      key={linkIndex}
                      className="transition duration-200 cursor-pointer"
                      onClick={() => {
                        if (link?.label?.toLowerCase() === "logout") {
                          handleLogout();
                        } else {
                          navigate(link?.path);
                        }
                      }}
                    >
                      <Typography
                         color = {isLightMode ? "themeBlack" : "white"}
                        variant={"size12Normal"}
                        content={link.label || link}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Seperator color={"yankeesBlue"} />
      <div className="sm:py-8 py-5 sm:px-4 px-0 flex items-center gap-x-[75px] gap-y-[34px] flex-wrap">
        {coins?.map((i, index) => (
          <img
            key={index}
            src={i?.icon}
            alt=""
            loading="lazy"
            className=" h-[36px]"
          />
        ))}
        <div>
          <Typography
            variant={"size12Medium"}
            color={"purpleFog"}
            content="ODDS777 is committed to responsible gambling, for more information
            visit Gamblingtherapy.org"
          />
          <div className="mt-3">
            <Typography
              variant={"size12Medium"}
              color={"purpleFog"}
              content="ODDS777 is owned and operated by Prime Gaming N.V., registration number: 152489, registered address: Schottegatweg Oost 12, Willemstad, Curaçao. Contact us at alerts@odds777.com. Payment agent company is Prime Payments Ltd. with address 12 Vasilissis Street, OMEGA TOWER, Office 402, Agios Nikolaos, 1095 Nicosia, Cyprus and Registration number: HE 502341."
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
