import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import React from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function SkeletonSlider() {
  let arr = [...Array(10).keys()];
  return (
    <SkeletonSliderCss>
      <div className="head-title fs-3 fw-bolder mt-4"></div>
      <Swiper
        effect={"coverflow"}
        modules={[EffectCoverflow, Navigation, Pagination]}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        className="swiper_container"
      >
        {arr.map((index) => {
          return (
            <SwiperSlide key={index}>
              <div className="image"></div>
            </SwiperSlide>
          );
        })}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </SkeletonSliderCss>
  );
}

const SkeletonSliderCss = styled.div`
  margin-bottom: 3rem;
  .head-title {
    height: 3rem;
    width: 15rem;
    margin-left: 2rem;
  }

  .image,
  .head-title {
    background: #eee;;
    background: linear-gradient(110deg, #333 34%, #1e1e1e 60%, #333 60%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1s shine linear infinite;
  }

  .image {
    display: block;
    width: 400px;
    height: 550px;
    border-radius: 2rem;
  }

  .slider-arrow {
    color: #e50914;
  }

  .swiper-pagination-bullet {
    background: #e50914;
  }

  @keyframes shine {
    to {
      background-position-x: -200%;
    }
  }
`;
