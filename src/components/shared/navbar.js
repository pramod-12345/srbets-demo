import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CommonButton,
  Search,
  Modal,
  Login,
  Register,
  ForgotPassword,
  Withdraw,
  Deposit,
  WalletModal,
  RegisterTerms,
  AuthoriseRegistration,
  TwoFactorAuthentication,
  ResetPassword,
  PaymentApproved,
  AddNewBankAccount,
  PaymentStatus,
  Typography,
} from "components";
import navImages, {
  MBBets,
  MBCasino,
  MBFootball,
  MBHome,
  MBTransaction,
} from "../../assets/svg/navbar";
import { MbNavTabs } from "../../data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  setModalType,
  toggleModal,
} from "../../redux/reducers/authSlice";
import { sidebarImg } from "../../assets/svg/sidebar";
import {
  closeIcon,
  odds777,
  wallet,
} from "assets";
import { checkBalance } from "services/dashboard.service";
import { useAxios, useToast } from "hooks";
import {
  setBets,
  setBetSlipToggle,
  setRecentSearches,
  // setIsSearchFocused,
  setSelectedCurrency,
  setUserBalance,
} from "../../redux/reducers/dashboard";
import OtpVerification from "components/modals/auth/otpVerification";
import { allIcons, getBalanceIcon, getIconForCasinoGame } from "helper/getIcons";
import ChangePassword from "components/modals/auth/changePassword";

const Navbar = ({
  setSidebarToggle,
  sidebarToggle,
  betSlipToggle,
  showNavbar,
  isLandscape
}) => {
  const showToast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation()
  const { isLiveIframeFull } = useSelector(
    (state) => state?.dashboard
  );
  const { user } = useSelector((state) => state?.auth);
  const { makeRequest } = useAxios();
  const [isOpen, setIsOpen] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { sideBarData, isMbIframeFull } = useSelector(
    (state) => state?.dashboard
  );
  const casinoSection = sideBarData?.casinoSection?.featuredCasinoGames || [];
  const sportsSection = sideBarData?.sportsSection?.featuredSportsGames || [];
  const data = [...casinoSection, ...sportsSection];
  // let selectedLocalCurrency = ""
  const { isLoggedIn } = useSelector((state) => state.auth);
  const profileMenuRef = useRef(null);
  const currencyRef = useRef(null);
  // Get modal type and visibility from Redux state
  const { modalType, isModalOpen } = useSelector((state) => state?.auth);
  const { userBalance, selectedCurrency, recentSearches } = useSelector(
    (state) => state?.dashboard
  );

  // Convert walletCurrency into the desired format
  const formattedCurrencies = user?.body?.walletCurrencies.map((currency, index) => ({
    id: index + 1,
    label: currency,
    icon: allIcons[currency] || "defaultIcon", // Use a default icon if not found
    value: 0,
  }));

  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (label) => {
    setInputValue(label);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout({}));
    dispatch(setUserBalance(null));
    dispatch(setBets([]));
    showToast("success", "Logout Successfully");
    navigate("/");
    setOpenProfileMenu(false);
    dispatch(setBetSlipToggle(false));
  };

  const getActiveIconMBNav = (link, isActive) => {
    switch (link) {
      case "/":
        return <MBHome color={isActive ? "#fff" : "#9298B4"} />;
      case "/my-bets":
        return <MBBets color={isActive ? "#fff" : "#9298B4"} />;
      case "/casino-home":
        return <MBCasino color={isActive ? "#fff" : "#9298B4"} />;
      case "/sports-home":
        return <MBFootball color={isActive ? "#fff" : "#9298B4"} />;
      case "/transaction-history":
        return <MBTransaction color={isActive ? "#fff" : "#9298B4"} />;
      default:
        return null;
    }
  };

  const NavItem = ({ icon, label, link }) => {
    const location = useLocation();
    const isActive = location.pathname === link;

    return (
      <Link
        to={link}
        className="flex flex-col items-center text-vintageRibbon hover:text-white"
      >
        {/* <img src={icon} alt={`${label} icon`} className="h-8 w-8" /> */}
        {getActiveIconMBNav(link, isActive)}
        <span
          className={`text-xs font-semibold ${isActive ? "text-white" : ""
            } mt-1`}
        >
          {label}
        </span>
        {isActive ? (
          <span className="w-7 h-1 bg-primary rounded-t-md mt-2"></span>
        ) : (
          <span className="w-7 h-1 bg-transparent rounded-t-md mt-2"></span>
        )}
      </Link>
    );
  };

  const openModal = (type) => {
    dispatch(setModalType(type));
    dispatch(toggleModal(true));
  };

  const filteredData =
    inputValue.length >= 3
      ? data.filter((game) =>
        game.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      : [];

  const closeModal = () => {
    dispatch(toggleModal(false));
  };

  const CheckBalance = useCallback(
    (item) => {
      const payload = {
        userId: user?.id,
        currency: item?.label,
      };
      checkBalance(makeRequest, payload, dispatch);
    },
    [user?.id, dispatch, makeRequest]
  );

  const handleSelect = (item) => {
    dispatch(setSelectedCurrency(item));
    setIsOpen(false);
    CheckBalance(item);
    dispatch(setUserBalance(null));
  };

  const handleSportEntry = () => {
    navigate("/sports-landing");
    setIsSearchOpen(false);
    setInputValue("");
  };

  const handleGameEntry = (id, imageUrl, game) => {
    const isSportGame = sportsSection.some((sport) => sport.id === game.id);
    if (isSportGame) {
      handleSportEntry();
    } else {
      navigate(`/game-entry/${id}`, {
        state: { imageUrl: imageUrl, gameData: game },
      });
    }

    setIsSearchOpen(false);
    setInputValue("");

    const exists = data.some((g) => g.id === game.id);
    if (exists) {
      const recent = (recentSearches?.length ? recentSearches : []).filter(
        (item) => item.id !== game.id
      );
      const updatedSearches = [game, ...recent];
      dispatch(setRecentSearches(updatedSearches));
    }
  };

  useEffect(() => {
    if (user?.id) {
      const interval = setInterval(() => {
        CheckBalance(selectedCurrency);
      }, [10000]);
      return () => {
        clearInterval(interval);
      };
    }
  }, [user, selectedCurrency, CheckBalance]);

  useEffect(() => {
    if (user?.id) {
      CheckBalance(selectedCurrency);
    }
  }, [user, CheckBalance, selectedCurrency]);

  const balanceIcon = getBalanceIcon(selectedCurrency?.label)

  const handleChangePassword = () => {
    openModal("changePassword");
  }

  const handleProtectedSearchClick = () => {
    openModal("login");
    setIsSearchOpen(false);
    setInputValue("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setOpenProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatedCasinoSection = recentSearches?.map((game) => ({
    ...game,
    icon: getIconForCasinoGame(game.name),
  }));

  return (
    <>
      <header
        className={`${isMbIframeFull || isLiveIframeFull || (window.innerWidth < 1024 && isLandscape && location?.pathname.includes("game-entry")) ? "hidden" : ""
          } flex w-full items-center bg-blackRussian sm:px-6 sm:py-3.5 p-4 fixed z-30 border-b border-[lightgrey] border-opacity-10`}
      >
        <div className="w-full">
          <div className="relative flex items-center gap-3 justify-between">
            <div className="max-w-full flex items-center gap-1 sm:gap-5">
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setSidebarToggle(!sidebarToggle)}
                className="hidden lg:block"
              >
                <img
                  src={navImages.menuIcon}
                  alt="logo"
                  className="w-4 h-4"
                  loading="lazy"
                />
              </div>
              <div
                className="flex items-center gap-3 font-monasans cursor-pointer"
                onClick={() => navigate("/")}
              >
                <img
                  src={odds777}
                  alt="logo"
                  className="sm:h-12 h-7"
                  loading="lazy"
                />
              </div>
            </div>
            <Search />
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="bg-themeBlack h-11 rounded-lg flex items-center gap-2 pr-2">
                  <div className="flex items-center gap-2 relative">
                    <div className="flex items-center gap-2 pl-3">
                      <img
                        src={balanceIcon}
                        alt="logo"
                        className="w-5 h-5"
                        loading="lazy"
                      />
                      <span className="text-sm text-white max-w-full">
                        {userBalance?.body?.balance ?? 0}
                      </span>

                      <img
                        onClick={() => setIsOpen(!isOpen)}
                        src={navImages.arrowDown}
                        alt="logo"
                        className="sm:w-9 sm:h-9 h-5 w-5"
                        loading="lazy"
                      />
                    </div>
                    {isOpen && (
                      <div
                        ref={currencyRef}
                        className="w-full bg-white shadow-lg rounded-lg z-50 absolute left-0 top-full"
                      >
                        <ul className="divide-y divide-[#E5E5E5]">
                          {formattedCurrencies.map((item, index) => (
                            <li
                              key={index}
                              onClick={() => handleSelect(item)}
                              className="p-2 cursor-pointer flex items-center gap-4"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={item.icon}
                                  alt="logo"
                                  className="w-5 h-5"
                                  loading="lazy"
                                />
                                <span className="text-blackRussian text-[14px] leading-10  font-semibold">
                                  {item?.label}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <CommonButton
                    label={
                      window.innerWidth > 1024 ? (
                        <span>Wallet</span>
                      ) : (
                        <img
                          src={wallet}
                          alt="logo"
                          className="w-4 h-4 block lg:hidden object-contain"
                          loading="lazy"
                        />
                      )
                    }
                    type="nav"
                    onClick={() => openModal("wallet")}
                  />
                </div>
              ) : null}
              {!isLoggedIn && (
                <CommonButton
                  label={"Login"}
                  type="nav"
                  onClick={() => openModal("login")}
                />
              )}
              {!isLoggedIn && (
                <CommonButton
                  label={"Register"}
                  type="nav"
                  onClick={() => openModal("register")}
                />
              )}
              <img
                src={navImages.mbSearchIcon}
                alt="logo"
                className="w-5 h-5 block lg:hidden"
                loading="lazy"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              />
              {isLoggedIn && (
                <div ref={profileMenuRef} className="relative inline-block">
                  <img
                    onClick={() => setOpenProfileMenu(!openProfileMenu)}
                    src={navImages.profileIcon}
                    loading="lazy"
                    alt="logo"
                    className="sm:w-7 sm:h-7 w-5 h-5 cursor-pointer"
                  />
                  {openProfileMenu && user?.id ? (
                    <ul className="absolute mt-2 w-48 px-3 py-2 rounded-lg bg-yankeesBlue shadow-lg focus:outline-none right-0 transform opacity-100 scale-100">
                      <div className="text-center mb-2 flex">
                        <Typography className={'break-words w-full'} color={"white"} variant={"size14Normal"} content={`Welcome ! ${user?.userName || ""}`} />
                      </div>
                      <li className="flex flex-col gap-3">
                        <CommonButton onClick={handleChangePassword} label={"Change Password"} type="navBtn" />
                        <CommonButton onClick={handleLogout} label={"Logout"} type="navBtn" />
                      </li>
                    </ul>
                  ) : null}
                </div>
              )}
              {isLoggedIn ? (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(setBetSlipToggle(!betSlipToggle))}
                  className="hidden lg:block"
                >
                  <img
                    src={sidebarImg.bets}
                    alt="logo"
                    className="w-7 h-7"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {!showNavbar || isLiveIframeFull || (window.innerWidth < 1024 && isLandscape && location?.pathname.includes("game-entry")) ? null : (
        <div
          id="mobile-nav"
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-darkGunmetal rounded-full px-8 pt-2.5 pb-px w-[352px] z-20 flex justify-between items-center lg:hidden shadow-lg"
        >
          {MbNavTabs?.map((i, index) => (
            <NavItem
              key={index}
              icon={i?.icon}
              label={i?.label}
              link={i?.link}
            />
          ))}
        </div>
      )}

      {/* Modal Section */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === "login" && <Login setModalType={setModalType} />}
          {modalType === "register" && <Register setModalType={setModalType} />}
          {modalType === "otpVerify" && (
            <OtpVerification setModalType={setModalType} />
          )}
          {modalType === "registerTerms" && (
            <RegisterTerms setModalType={setModalType} />
          )}
          {modalType === "authoriseRegistration" && (
            <AuthoriseRegistration setModalType={setModalType} />
          )}
          {modalType === "twoFactorAuthentication" && (
            <TwoFactorAuthentication />
          )}
          {modalType === "forgotPassword" && <ForgotPassword />}
          {modalType === "resetPassword" && <ResetPassword />}
          {modalType === "changePassword" && <ChangePassword />}
          {modalType === "wallet" && <WalletModal />}
          {modalType === "withdraw" && <Withdraw />}
          {modalType === "deposit" && <Deposit />}
          {modalType === "paymentApproved" && <PaymentApproved />}
          {modalType === "paymentStatus" && <PaymentStatus />}
          {modalType === "paymentFailed" && <PaymentStatus onRetry={() => { dispatch(setModalType("deposit")); console.log('323'); }} isError={true} />}
          {modalType === "addBank" && <AddNewBankAccount />}
        </Modal>
      )}

      {isSearchOpen && (
        <div className="fixed inset-0 flex z-40 items-center justify-center bg-black bg-opacity-50">
          <div className="min-h-screen bg-[#0B0D1C] w-full mt-4 flex flex-col  p-4 pt-8">
            {/* Search Bar */}
            <div className="w-full flex items-center bg-themeBlack rounded-lg p-3">
              <img
                src={navImages.mbSearchIcon}
                alt="Search"
                className="mr-2"
                loading="lazy"
              />
              <input
                type="text"
                placeholder="Search game or sport"
                value={inputValue}
                className="flex-grow bg-themeBlack text-white focus:outline-none"
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button onClick={() => setIsSearchOpen(false)}>
                <img src={closeIcon} alt="Close" loading="lazy" />
              </button>
            </div>
            <div className="mt-5 bg-yankeesBlue p-3 rounded-xl">
              <div className="flex justify-between items-center mb-4">
                <Typography
                  variant={"size14Semibold"}
                  content={
                    inputValue.length >= 3
                      ? null
                      : "Search requires at least 3 characters"
                  }
                  color={"vintageRibbon"}
                />
                <button
                  onClick={() => {
                    setInputValue("");
                    dispatch(setRecentSearches([]));
                  }}
                  className="text-primary text-base font-semibold leading-[20px]"
                >
                  Reset
                </button>
              </div>
              {filteredData.length > 0 ? (
                <div className="flex items-center gap-3.5">
                  {filteredData.map((game) => (
                    <div
                      className={`w-[104px] h-[167px] transform transition duration-300 hover:-translate-y-2`}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${game.imageUrl})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          aspectRatio: 1 / 1.3,
                        }}
                        className="rounded-xl md:rounded-[20px] w-full h-full p-2.5 overflow-hidden bg-cover md:bg-contain"
                        onClick={() =>
                          isLoggedIn
                            ? handleGameEntry(game?.id, game?.imageUrl, game)
                            : handleProtectedSearchClick()
                        }
                      ></div>
                    </div>
                  ))}
                </div>
              ) : (
                inputValue.length >= 3 && (
                  <Typography
                    variant={"size16Semibold"}
                    content={"No results found"}
                    color={"white"}
                  />
                )
              )}
            </div>
            {/* Recent Searches */}
            {inputValue.length === 0 && (
              <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-between">
                  <Typography
                    color={"vintageRibbon"}
                    content={"Recent Searches"}
                    variant={"size16SemiBold"}
                  />
                  <Typography
                    color={"primary"}
                    content={"Reset"}
                    variant={"size12SemiBold"}
                  />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {updatedCasinoSection?.map((item, index) => (
                    <CommonButton
                      key={index}
                      icon={item?.icon}
                      imageStyle={"w-7 h-7"}
                      label={item?.name}
                      type="outline"
                      onClick={() => handleButtonClick(item.name)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
