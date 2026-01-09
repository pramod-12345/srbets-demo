import React, { useEffect } from "react";
import { closeIcon } from "assets";
import { useDispatch } from "react-redux";
import { setIsSearchFocused } from "../../redux/reducers/dashboard";

const Modal = ({ onClose, children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsSearchFocused(false));
  }, [dispatch]);

  return (
    <div className="fixed inset-0 flex z-50 items-center justify-center bg-black bg-opacity-80">
      <div className="max-w-[600px] w-full mx-5 lg:mx-auto my-auto h-auto rounded-[20px] overflow-auto no-scrollbar">
        <div className="max-w-[600px] w-full mx-auto max-h-[90vh] bg-blackRussian rounded-[20px] md:p-8 pb-4 text-white relative h-auto overflow-auto no-scrollbar">
          <div className="hidden md:block justify-between items-center absolute top-5 right-5">
            <button onClick={onClose}>
              <img src={closeIcon}  alt="Close" />
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
