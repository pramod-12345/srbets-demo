import React, { useEffect } from "react";
import { Typography, Search, LazyImage } from "components";
import CasinoGamesCard from "./casinoGames";
import { fetchLayout } from "services";
import { useSelector } from "react-redux";
import { useAxios } from "hooks";

const CasinoHome = () => {
  const { makeRequest } = useAxios();
  const { layoutData } = useSelector((state) => state?.dashboard);
  const casinoSection = layoutData?.layout?.casinoSection;

  useEffect(() => {
    fetchLayout(makeRequest, 'CASINO');
  }, [makeRequest]);

  return (
    <div>
      <Typography color={"white"} variant={"h1"} content={"Casino home"} />
      <div className="mt-5 w-full  overflow-hidden">
        <div className="flex items-center overflow-x-auto md:h-[200px] no-scrollbar gap-x-5">
          {layoutData?.layout?.promoBanners?.banners?.map((item, index) => (
            <LazyImage
              key={item.id + index}
              link={item?.link}
              src={item?.imageUrl}
              alt="Advertisemnent"
              className="md:h-full"
              divClassName="flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-7 hidden md:flex">
        <Search variant="full" bgColor="bg-blackRussian" />
      </div>
      <div className="mt-7 md:mt-10">
        <Typography
          color={"white"}
          variant={"h3"}
          content={casinoSection?.title}
        />
        <CasinoGamesCard data={casinoSection?.featuredCasinoGames} />
      </div>
    </div>
  );
};

export default CasinoHome;