import React, { useState } from "react";
import {
  Typography,
  Input,
  CommonButton,
  Seperator
} from "components"
import { backIcon, reload, copy } from "assets";
import { useDispatch } from "react-redux";
import { setModalType } from "../../../redux/reducers/authSlice";

const TwoFactorAuthentication = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  return (
    <div>
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img src={backIcon} alt="Back"  onClick={() => dispatch(setModalType("login"))} />
        </div>
        <Seperator />
      </div>
      <div className="hidden md:block">
        <Typography
          color={"white"}
          variant={"size20Bold"}
          content={"Two Factor Authentication"}
        />
      </div>
      <div className="px-4 md:px-0">
      <div className="pt-1.5">
      <Typography
            variant="size20Bold"
            color={"white"}
            content={"Two factor authentication"}
          />
          <div className="mt-1.5">
        <Typography
          color={"vintageRibbon"}
          variant={"size14Normal"}
          content={
            "To keep your account extra secure leave a two factor authentication enabled"
          }
        />
          </div>
      </div>
      <div className="pt-8 flex flex-col gap-6">
        <div className="">
            <Typography
              variant={"size12Normal"}
              color={"vintageRibbon"}
              content={"Copy this code to your authentication app"}
            />
            <div className="bg-darkByzantineBlue px-4 py-5 rounded-xl flex items-center justify-between mt-3">
              <span className="truncate text-white">
                vcbd34245243sfdETGBV46457557755ddghfhfhf
              </span>
              <div className="flex gap-x-7 min-w-14">
                <button className="text-vintageRibbon">
                  <img src={reload} alt="Reload"  />
                </button>
                <button className="text-vintageRibbon">
                  <img src={copy} alt="Copy"  />
                </button>
              </div>
            </div>
          </div>
        <div className="p-6 flex flex-col gap-4 bg-darkByzantineBlue rounded-xl justify-center items-center text-center">
          <img src={'https://layout-odds.s3.ap-south-1.amazonaws.com/crypto-scanner.png'} alt="" className="w-[120px] h-[120px]"  />
          <Typography
            color={"vintageRibbon"}
            variant={"size14Medium"}
            content={"Send only BTC to this address, 1 confirmation required"}
          />
        </div>

        <Input setValue={setEmail} value={email} label={"Password *"} />
        <Input setValue={setEmail} value={email} label={"2FA code *"} />

        <div className="w-full flex justify-center items-center">
          <CommonButton type="viewBetsBtn" label={"Submit"} />
        </div>
      </div>
      </div>
    </div>
  );
};

export default TwoFactorAuthentication;
