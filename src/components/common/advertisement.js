import React from "react";
import { BannerCard } from "./cards";

const Advertisement = ({ promoBanner }) => {

  return (
    <div className="mt-5 w-full  overflow-hidden">
      <div className="flex items-center overflow-x-auto no-scrollbar gap-x-5">
        {promoBanner?.map((item, index) => (
          <BannerCard
            key={item?.id + index}
            containerStyle={"block"}
            link={item.link}
            bannerImg={item?.imageUrl}
            imgStyle={"object-cover"}
          />))}
      </div>
    </div>
  );
};

export default Advertisement;
