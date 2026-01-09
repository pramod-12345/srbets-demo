import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "hooks";
import {
  logout,
  setModalType,
  toggleModal,
} from "../../redux/reducers/authSlice";
import { setBets, setBetSlipToggle, setUserBalance } from "../../redux/reducers/dashboard";

const MenuItems = ({ sidebarToggle, buttons, title, data, isCasino }) => {
  const location = useLocation();
  const pathName = location.pathname.split("/").pop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const showToast = useToast();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout({}));
    dispatch(setUserBalance(null));
    dispatch(setBets([]));
    showToast("success", "Logout Successfully");
    navigate("/");
    dispatch(setBetSlipToggle(false))
  };

  const openModal = (type) => {
    dispatch(setModalType(type));
    dispatch(toggleModal(true));
  };

  // Reusable function for button actions
  const handleButtonClick = ({
    isLogout,
    path,
    id,
    modalType,
    data,
    imageUrl,
  }) => {
    if (isLogout) {
      handleLogout();
    } else if (!isLoggedIn) {
      openModal(modalType || "login");
    } else if (id) {
      if (isCasino) {
        navigate(`/game-entry/${id}`, {
          state: { imageUrl: imageUrl, gameData: data },
        });
      } else navigate(`/sports-landing/${id}`);
    } else if (path) {
      navigate(path);
    }
  };

  return (
    <div
      className={`${sidebarToggle ? "p-[18px]" : "p-6"} ${
        title === "" ? "pt-4" : ""
      } flex flex-col gap-3.5`}
    >
      {!sidebarToggle && title !== "" && (
        <h3 className="text-vintageRibbon text-xs font-bold mb-0.5 transition-all ease-in-out duration-1000">
          {sidebarToggle ? "" : title}
        </h3>
      )}
      {buttons?.map((button, index) => {
        return (
          <div key={index}>
            <button
              style={{ color: button.color }}
              className={`text-start text-sm font-semibold bg-transparent transition-all ease-in-out duration-1000 ${
                location.pathname === button.path || pathName === button.id
                  ? "text-white"
                  : "text-vintageRibbon"
              } hover:text-[#664FFF] rounded flex items-center gap-3`}
              onClick={() =>
                handleButtonClick({
                  isLogout: button.label === "Logout",
                  path: button.path,
                  id: button.id,
                  modalType: "login",
                  data: button,
                  imageUrl: button?.imageUrl,
                })
              }
            >
              <img src={button.icon} alt="" className="w-7 h-7" />
              {sidebarToggle ? "" : button.name || button.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MenuItems;
