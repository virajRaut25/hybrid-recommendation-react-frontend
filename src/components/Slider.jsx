import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import React, { useContext }  from "react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import HistoryContext from "../context/HistoryContext";
import noPoster from "../assets/no-poster.png"


export default function Slider({ heading, jsonObj }) {
  
  const {handleDetail} = useContext(HistoryContext)

  return (
    <SliderCss>
      <div className="head-title fs-3 fw-bolder mt-4">{heading}</div>
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
        {jsonObj.map((movie, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={movie.poster? movie.poster: noPoster}
                alt={movie.title}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleDetail(movie.id)}
              />
            </SwiperSlide>
          );
        })}
        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow"></div>
          <div className="swiper-button-next slider-arrow"></div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </SliderCss>
  );
}

const SliderCss = styled.div`
  margin-bottom: 3rem;
  .head-title {
    margin-left: 2rem;
  }

  img {
    display: block;
    width: 90%;
    height: auto;
    border-radius: 2rem;
  }

  .slider-arrow {
    color: #e50914;
  }

  .swiper-pagination-bullet {
    background: #e50914;
  }
`;
