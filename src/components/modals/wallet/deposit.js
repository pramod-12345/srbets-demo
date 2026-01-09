import React from "react";
import { Typography, Tabs, Seperator, DepositeViaUpi, Input } from "components";
import { useDispatch } from "react-redux";
import { setModalType } from "../../../redux/reducers/authSlice";
import { backIcon, copy, reload } from "assets";
import { useToast } from "hooks";

const Deposit = () => {
  const dispatch = useDispatch();
  const showToast = useToast();
  const tabs = [
    { id: "local-currency", label: "Local Currency" }
  ];

  const handleCopy = () => {
    const address = "";
    navigator.clipboard.writeText(address)
      .then(() => {
        console.log("Copied to clipboard:", address);
        showToast("success", 'Copied');
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  return (
    <div className="">
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img
            src={backIcon}
            alt="Back"
            onClick={() => dispatch(setModalType("wallet"))}
            className="cursor-pointer"
          />
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Deposit Money"}
          />
        </div>
        <Seperator />
      </div>
      <div className="p-4 pt-0 md:p-0">
        <div className="hidden md:block">
          <Typography
            color={"white"}
            variant={"size20Bold"}
            content={"Deposit Money"}
          />
        </div>
        <div className="mt-5">
          <Tabs tabs={tabs}>
            <div className="" id="crypto">
              {<div className="mt-6 space-y-3">
                <Typography
                  variant={"size12Normal"}
                  color={"vintageRibbon"}
                  content={"Network"}
                />
              <Input value={'TRC20'} disabled={true}/>
              </div>}
              <div className="mt-6">
                <Typography
                  variant={"size12Normal"}
                  color={"vintageRibbon"}
                  content={`Your deposit address`}
                />
                <div className="bg-darkByzantineBlue px-4 py-5 rounded-xl flex items-center justify-between mt-3">
                  <span className="truncate text-white">
                    
                  </span>
                  <div className="flex gap-x-7 min-w-14">
                    <button className="text-vintageRibbon">
                      <img src={reload} alt="Reload" />
                    </button>
                    <button onClick={handleCopy} className="text-vintageRibbon">
                      <img src={copy} alt="Copy" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 lg:mt-4 mt-6 flex flex-col gap-4 text-center bg-darkByzantineBlue rounded-xl justify-center items-center">
                <img
                  src={
                    "https://layout-odds.s3.ap-south-1.amazonaws.com/crypto-scanner.png"
                  }
                  alt="QR Code"
                  className="w-[120px] h-[120px]"
                />
              </div>
            </div>
            <div id="local-currency">
              <DepositeViaUpi />
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
