import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setModalType, toggleModal } from "../../redux/reducers/authSlice";
import { SportsCard } from "components";


const CasinoGamesCard = ({ data }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGameEntry = (id, imageUrl, data) => {
    navigate(`/game-entry/${id}`, {
      state: { imageUrl: imageUrl, gameData: data },
    });
  };

  const openModal = (type) => {
    dispatch(setModalType(type));
    dispatch(toggleModal(true));
  };


  return (
    <div className="grid gap-2 md:gap-3 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap mt-5 lg:mt-7">
      {data?.map((item, index) => (
        <SportsCard
          key={item.id + index}
          bgImg={item?.imageUrl}
          onClick={() =>
            isLoggedIn ? handleGameEntry(item?.id, item?.imageUrl, item) : openModal("login")
          }
        />
      ))}
    </div>
  );
};

export default CasinoGamesCard;