import React from "react";
import BannerPage from "./components/pages/home/Banner";
import PopularCar from "./popular-car/page";
import UserReviewpage from "./user-review/page";

const homePage = () => {
  return (
    <div>
      <BannerPage></BannerPage>
      <PopularCar></PopularCar>
      <UserReviewpage></UserReviewpage>
    </div>
  );
};

export default homePage;
