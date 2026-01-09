import React, { useState } from "react";
import {btcIcon , ethIcon , dropdownArrow } from "assets"
import Typography from "./typography";

const CryptoDropdown = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option); // Trigger callback when an option is selected
    }
  };

  return (
    <div className="relative w-full">
      {/* Dropdown Header */}
      <div
        className="flex items-center justify-between bg-darkByzantineBlue px-4 py-3.5 rounded-xl cursor-pointer"
        onClick={() =>
          document.getElementById("dropdown-menu").classList.toggle("hidden")
        }
      >
        <div className="flex items-center gap-3">
          <div className={``}>
            <img
              src={selectedOption.icon === "btc" ? btcIcon : ethIcon}
              alt="BTC"
              className="w-7 h-7"
              
            />
          </div>
          <div className="flex flex-col gap-px justify-center">
            <Typography
              variant={"size12Semibold"}
              color={"white"}
              content={selectedOption.label}
            />
            <Typography
              variant={"size12Normal"}
              color={"vintageRibbon"}
              content={selectedOption.label === "BTC" ? "Bitcoin" : "Ethereum"}
            />
          </div>
        </div>
        <img src={dropdownArrow} alt="Dropdown Menu"  />
      </div>

      {/* Dropdown Menu */}
      <ul
        id="dropdown-menu"
        className="absolute bg-darkByzantineBlue z-50 p-4 space-y-2 text-white rounded-lg mt-2 w-full hidden shadow-lg"
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => {
              handleSelect(option);
              document.getElementById("dropdown-menu").classList.add("hidden");
            }}
            className={`flex items-center gap-3 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-700 ${
              selectedOption.label === option.label ? "bg-gray-700" : ""
            } `}
          >
            <div className={``}>
              <img
                src={option.icon === "btc" ? btcIcon : ethIcon}
                alt="BTC"
                className="w-5 h-5"
                
              />
            </div>
            <Typography
              variant={"size12Semibold"}
              color={"white"}
              content={option.label === "BTC" ? "Bitcoin" : "Ethereum"}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoDropdown;
