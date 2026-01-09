import React from "react";
import { SportsCard } from "components";
import { useNavigate } from "react-router-dom";
import { setModalType, toggleModal } from "../../redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SportsGamesCard = ({ data }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const openModal = (type) => {
      dispatch(setModalType(type));
      dispatch(toggleModal(true));
    };
  return (
    <div className="grid gap-2 md:gap-3 grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-wrap mt-5 lg:mt-7">
      {data?.map((item) => (
        <SportsCard
          key={item?.id}
          bgImg={item?.imageUrl}
          onClick={() => (isLoggedIn ? navigate(`/sports-landing/${item?.id}`) : openModal('login'))}
        />
      ))}
    </div>
  );
};

export default SportsGamesCard;
