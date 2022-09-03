import React from "react";
// import ReactCardSlider from "react-card-slider-component";
// import { Carousel } from "@trendyol-js/react-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MiniSlide.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
};

const sliderImageUrl1 = [
  //First image url
  {
    url: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg",
  },
  //Second image url
  {
    url: "https://cdn.pixabay.com/photo/2017/05/12/08/29/coffee-2306471_960_720.jpg",
  },
  //Third image url
  {
    url: "https://cdn.pixabay.com/photo/2018/04/02/18/29/food-3284704_960_720.jpg",
  },
  //Fourth image url
  {
    url: "https://cdn.pixabay.com/photo/2019/08/19/07/45/corgi-4415649_960_720.jpg",
  },
  //fifth image url
  {
    url: "https://cdn.pixabay.com/photo/2017/07/25/01/22/cat-2536662_960_720.jpg",
  },
  // sixth image url
  {
    url: "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_960_720.jpg",
  },
];

const sliderImageUrl2 = [
  //First image url
  {
    url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
  },
  //Second image url
  {
    url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
  },
  //Third image url
  {
    url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
  },
  //Fourth image url
  {
    url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
  },
  // sixth image url
  {
    url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
  },
];

const MiniSlide = ({ user }) => {
  return (
    <div>
      {user ? (
        <div className="parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
          >
            {sliderImageUrl1.map((imageUrl, index) => {
              return (
                <div className="slider" key={index}>
                  <img src={imageUrl.url} alt="movie" />
                </div>
              );
            })}
          </Carousel>
        </div>
      ) : (
        <div className="parent">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
            ssr={true}
            renderDotsOutside={true}
            arrows={false}
          >
            {sliderImageUrl2.map((imageUrl, index) => {
              return (
                <div className="slider" key={index}>
                  <img src={imageUrl.url} alt="movie" />
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default MiniSlide;
