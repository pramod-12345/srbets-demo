import { globalLoader } from "assets";
import React from "react";

const GlobalLoader = () => {
  return (
    <div
      style={{
        height: "100%",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        top: "50%",
        opacity: 0.85,
        alignItems: "center",
        left: "50%",
        width: "100%",
        background: "#000",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        textAlign: "center",
      }}
      className=""
    >
      <img src={globalLoader} alt="logo-gif" className="h-[80px] sm:h-[150px]"/>
    </div>
  );
};

export default GlobalLoader;
