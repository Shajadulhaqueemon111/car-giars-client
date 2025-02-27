"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import UsreRatingPage from "../components/pages/shared/UsreRatingPage";

export default function UserReviewpage() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center mt-4 mb-4">User Review</h1>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <UsreRatingPage></UsreRatingPage>
        </SwiperSlide>
        <SwiperSlide>
          <UsreRatingPage></UsreRatingPage>
        </SwiperSlide>
        <SwiperSlide>
          <UsreRatingPage></UsreRatingPage>
        </SwiperSlide>
        <SwiperSlide>
          <UsreRatingPage></UsreRatingPage>
        </SwiperSlide>
        <SwiperSlide>
          <UsreRatingPage></UsreRatingPage>
        </SwiperSlide>
        <SwiperSlide>
          <UsreRatingPage></UsreRatingPage>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
