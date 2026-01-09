import React, { useCallback, useEffect } from "react";
import {
  Slider,
  SportsCard,
  CommonButton,
  Advertisement,
} from "components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLayout } from "services";
import { useAxios } from "hooks";
import { setModalType, toggleModal } from "../../redux/reducers/authSlice";
import { checkBalance } from "services/dashboard.service";
import { getIconForCasinoGame } from "helper/getIcons";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { makeRequest } = useAxios();
  const { layoutData, selectedCurrency, recentSearches } = useSelector(
    (state) => state?.dashboard
  );
  const casinoSection = layoutData?.layout?.casinoSection;
  const sportsSection = layoutData?.layout?.sportsSection;
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const handleSportEntry = (id)=>{
    navigate(`/sports-landing/${id}`)
  }

  const handleGameEntry = (id, imageUrl, data) => {
    navigate(`/game-entry/${id}`, {
      state: { imageUrl: imageUrl, gameData: data },
    });
  };

  const handleButtonClick = (item) => {
    const isSportGame = sportsSection?.featuredSportsGames?.some((sport) => sport.id === item.id);
    if (isSportGame) {
      handleSportEntry(item?.id);
    } else {
      handleGameEntry(item?.id, item?.imageUrl, item);
    }
  };

  const CheckBalance = useCallback((item) => {
    const payload = {
      userId: user?.id,
      currency: item?.label,
    };
    checkBalance(makeRequest, payload, dispatch);
  }, [user, makeRequest, dispatch]);

  useEffect(() => {
    fetchLayout(makeRequest, "HOME", dispatch);
  }, [dispatch,makeRequest]);

  useEffect(() => {
    if (selectedCurrency?.label === "INR") {
      setTimeout(() => {
        CheckBalance(selectedCurrency);
      }, 0);
    }
  }, [CheckBalance,selectedCurrency]);

  const openModal = (type) => {
    dispatch(setModalType(type));
    dispatch(toggleModal(true));
  };

  const updatedCasinoSection = recentSearches?.map((game) => ({
    ...game,
    icon: getIconForCasinoGame(game.name),
  }));

  return (
    <>
      <Advertisement promoBanner={layoutData?.layout?.promoBanners?.banners} />
      <div className="flex flex-col sm:gap-12 gap-6 sm:pt-7 pt-6">
        {updatedCasinoSection?.length ? <Slider title={"Recently played"}>
          {updatedCasinoSection?.map((item, index) => (
            <CommonButton
              key={index}
              icon={item?.icon}
              imageStyle={"w-7 h-7"}
              label={item?.name}
              type="outline"
              onClick={() => handleButtonClick(item)}
            />
          ))}
        </Slider> : null}
        <Slider title={casinoSection?.title}>
          {casinoSection?.featuredCasinoGames?.map((item, index) => (
            <SportsCard
              key={item?.id + index}
              bgImg={item?.imageUrl}
              width={"176px"}
              isHome={true}
              onClick={() =>
                isLoggedIn
                  ? handleGameEntry(item?.id, item?.imageUrl, item)
                  : openModal("login")
              }
            />
          ))}
        </Slider>
        <Slider title={sportsSection?.title}>
          {sportsSection?.featuredSportsGames?.map((item, index) => (
            <SportsCard
              key={item?.id + index}
              width={"176px"}
              bgImg={item?.imageUrl}
              isHome={true}
              // title={item?.name}
              number={"3224"}
              onClick={() => isLoggedIn ? navigate(`/sports-landing/${item?.id}`) : openModal("login")}
            />
          ))}
        </Slider>
      </div>
    </>
  );
};

export default HomePage;
