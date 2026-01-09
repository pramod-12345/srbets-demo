import React, { useEffect, useState, useCallback } from "react";
import { Typography, Search, Table, LazyImage, Pagination } from "components";
import { columns } from "../../data";
import SportsGamesCard from "./sportsGames";
import { useAxios } from "hooks";
import { useSelector } from "react-redux";
import { fetchLayout } from "services";
import { fetchSportsRecentBets } from "services/cricket.service";

const SportsHome = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { makeRequest } = useAxios();
  const { layoutData } = useSelector((state) => state?.dashboard);
  const sportsSection = layoutData?.layout?.sportsSection;
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(0);

  const fetchSportsLayout = useCallback(() => {
    fetchLayout(makeRequest, "SPORTS");
  }, [makeRequest]);

  const FetchSportsRecentBets = useCallback((page = 0) => {
    fetchSportsRecentBets(makeRequest, setData, setLoading, page, pageSize);
  }, [makeRequest, pageSize]);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      FetchSportsRecentBets(newPage);
    };

  useEffect(() => {
    fetchSportsLayout();
    FetchSportsRecentBets();
  }, [fetchSportsLayout , FetchSportsRecentBets]);

  return (
    <div>
      <Typography color={"white"} variant={"h1"} content={"Sports home"} />
      <div className="mt-5 w-full  overflow-hidden">
        <div className="flex items-center overflow-x-auto md:h-[200px] no-scrollbar gap-x-5">
          {layoutData?.layout?.promoBanners?.banners?.map((item, index) => (
            <LazyImage
              key={item?.id + index}
              src={item?.imageUrl}
              link={item?.link}
              alt="Advertisement"
              className="md:h-full"
              divClassName="flex-shrink-0"
            />
          ))}
        </div>
      </div>
      <div className="w-full mt-7">
        <Search variant="full" bgColor="bg-blackRussian" />
      </div>
      <div className="mt-10">
        <Typography
          color={"white"}
          variant={"h3"}
          content={sportsSection?.title}
        />
        <SportsGamesCard data={sportsSection?.featuredSportsGames} />
      </div>

      <div className="mt-12 flex flex-col gap-1.5">
        <Typography color={"white"} variant={"h2"} content={"Recent Bets"} />
        <Table columns={columns} data={data?.content} loading={loading} />
        {data?.content?.length === 0 || data?.totalPages === 1 ? null :<Pagination
          currentPage={currentPage}
          totalPages={data?.totalPages}
          onPageChange={handlePageChange}
        />}
      </div>
    </div>
  );
};

export default SportsHome;
