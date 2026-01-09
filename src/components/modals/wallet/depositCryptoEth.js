import React from "react";
import {
  Typography,
  Tabs,
  Seperator,
  CryptoDropdown,
  Dropdown
} from "components"
import { reload , copy , backIcon } from "assets";


const DepositCryptoEth = () => {
  
  const tabs = [
    { id: "crypto", label: "Crypto" },
    { id: "local-currency", label: "Local Currency" },
  ];

  const cryptos = [
    { icon: "btc", label: "BTC" },
    { icon: "eth", label: "ETH" },
  ];

  const handleNumberSelect = (item) => {
    console.log("Selected Number Option:", item.label);
  };

  const handleCryptoSelect = (crypto) => {
    console.log("Selected cryptocurrency:", crypto);
  };
  return (
    <div>
      <div className="md:hidden bg-blackRussian">
        <div className="flex items-center px-4 gap-2 py-5">
          <img src={backIcon} alt="Back"  />
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
          <Tabs tabs={tabs} />
        </div>
        <div className="">
          <div className="mt-6">
            <CryptoDropdown options={cryptos} onSelect={handleCryptoSelect} />
          </div>
          <div className="mt-6">
            <Typography
              variant={"size12Medium"}
              color={"vintageRibbon"}
              content={"Network"}
            />
            {/* <Input value={"ETH"} /> */}
            <Dropdown
              items={cryptos}
              onSelect={handleNumberSelect}
              placeholder=""
            />
          </div>

          <div className="mt-7">
            <Typography
              variant={"size12Normal"}
              color={"vintageRibbon"}
              content={"Your Bitcoin deposit address"}
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
          <div className="p-6 mt-7 flex flex-col gap-4 bg-darkByzantineBlue rounded-xl justify-center items-center text-center">
            <img src={'https://layout-odds.s3.ap-south-1.amazonaws.com/crypto-scanner.png'} alt="QR Code" className="w-[120px] h-[120px]"  />
            <Typography
              color={"vintageRibbon"}
              variant={"size14Medium"}
              content={"Send only BTC to this address, 1 confirmation required"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositCryptoEth;
