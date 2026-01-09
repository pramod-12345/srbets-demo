import React, { useState } from "react";
import { backIcon } from "assets";
import { 
  Typography,
  Input,
  CommonButton,
  Seperator
} from "components"
import { setModalType } from "../../../redux/reducers/authSlice";
import { useDispatch } from "react-redux";

const AuthoriseRegistration = () => {
  const [displayName, setdisplayName] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <div className="hidden md:block">
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"Authorise registration"}
        />
      </div>
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img src={backIcon}  alt="Back" />
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Authorise registration"}
          />
        </div>
        <Seperator />
      </div>
      <div className="pt-8 px-4 lg:px-0">
        <Input
          setValue={setdisplayName}
          value={displayName}
          label={"Pleas choose display name *"}
          placeholder={'Enter Display Name'}
        />
      </div>
      <div className="w-full flex justify-center items-center pt-8 px-4 lg:px-0">
        <CommonButton type="viewBetsBtn" label={"Continue"}  onClick={()=>dispatch(setModalType("twoFactorAuthentication"))} />
      </div>
    </div>
  );
};

export default AuthoriseRegistration;
