import React, { useContext, useState } from "react";
import { arrowDown, accordionMinusIcon, accordionPlusIcon } from "assets";
import Typography from "./typography";
import Badge from "./badge";
import Seperator from "./seperator";
import { useSelector } from "react-redux";
import { ThemeContext } from "context/ThemeProvider";
import { useLocation } from "react-router-dom";

const Accordion = ({
  title,
  children,
  badgeContent,
  isMain,
  labelIcon,
  isSeperator,
  open = false,
}) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(open);
  const { isLiveIframeFull } = useSelector((state) => state?.dashboard);
  const {theme } = useContext(ThemeContext)
   
  const sportsLanding = location.pathname.includes("sports-landing")
  const sportsDetails = location.pathname.includes("sports-details")
  const isCricket = sportsDetails || sportsLanding
  return (
    <div
      className={`${
        isMain ? `${theme === "light" && isCricket ? "bg-slate-300" : "bg-darkBlueBlack"} py-5 px-5` : `${theme === "light" && isCricket ? `${sportsDetails ? "bg-slate-300" : "bg-white"}` : "bg-darkByzantineBlue"}`
      }  w-full rounded-lg ${isMain ? "mb-5" : ""}`}
    >
      <div
        className={`flex justify-between items-center ${isLiveIframeFull ? 'hidden' : ''}  ${!isMain ? "py-4 px-5" : ""}`}
      >
        <div className={`flex items-center gap-2`}>
          {labelIcon && <img src={labelIcon} style={{objectFit:'contain'}} className="w-4 h-4" alt="Icon" />}

          <Typography
            color={
              isMain 
                ? (theme === "light" && isCricket ? "black" : "white")
                : (theme === "light" && isCricket ? "black" : "vintageRibbon")
            }
            variant={"size14Semibold"}
            content={title}
          />
          {badgeContent && (
            <Badge color={"vintageRibbon"}>
              <Typography
                color={"white"}
                variant={"size14Semibold"}
                content={badgeContent}
              />
            </Badge>
          )}
        </div>

        {isMain ? (
          <img
            src={isOpen ? accordionMinusIcon : accordionPlusIcon}
            alt={isOpen ? "Collapse" : "Expand"}
            className="w-3 h-3 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
        ) : (
          <img
            src={arrowDown}
            alt="Down Arrow"
            className={`${isOpen ? "" : "transform rotate-[270deg]"}`}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      {isOpen && isSeperator && !isLiveIframeFull && <Seperator isTheme={theme === "light" && isCricket} />}
      {/* Accordion Content */}
      {isOpen && <div className={isLiveIframeFull ? '' : "mt-4"}>{children}</div>}
    </div>
  );
};

export default Accordion;
