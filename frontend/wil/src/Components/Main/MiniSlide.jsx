import React, { useEffect, useState } from "react";
import axios from "axios";
// import ReactCardSlider from "react-card-slider-component";
// import { Carousel } from "@trendyol-js/react-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MiniSlide.css";

import { HiOutlineHeart } from "react-icons/hi";
import "../Gallery/Gallery.css";

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

const logoutPost = [
  {
    url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
  },
];

const MiniSlide = ({ user, token, userData}) => {
  const [allPost, setAllPost] = useState(null);
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);

  const fetchPost = async () => {
    try {
      // 전체 게시물 조회
      const response = await axios.get(`http://localhost:8080/post/`);
      console.log(response.data);
      setAllPost(response.data);

      // postIdIndexList 생성
      const postIdIndex =[]
      for (let index = 0; index < response.data.length; index++){
        postIdIndex.push(response.data[index].postId)
        }
      console.log(postIdIndex);

      // 포스트 당 좋아요 수 조회
      const likes =[]
      try {
        for (let index = 0; index < postIdIndex.length; index++){
          const response = await axios.get(`http://localhost:8080/like/${postIdIndex[index]}`);
          likes.push(response.data)
        }
        setPostLike(likes);
        console.log(likes);
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  if (error) return <div>전체 게시물 에러가 발생했습니다</div>;
  if (!allPost) return null;
  if (!postLike) return null;

  const rendering = () => {
    const result = [];
    for (let index = 0; index < Object.keys(allPost).length; index++) {
      result.push(
        <div className="gallery-item" key={index} tabindex="0">
          <img
            src={
              "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
              allPost[index].imgList[0].file_name
            }
            className="gallery-image"
            alt=""
          />
          {/* 좋아요 수 표시*/}
          <div className="gallery-item-info">
            <ul>
              <li className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
                {/* 게시물 마다 좋아요 눌러진 수 만큼 출력되야된다  */}
                <HiOutlineHeart aria-hidden="true" /> {postLike[index]}
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return result;
  };

  return (
    <div>
      {user ? (
        <div className="gallery-container">
          <h1 className="main-h1">전체 게시물</h1>
          <div className="gallery">{rendering()}</div>
        </div>
      ) : (
        // 비로그인 일 때 추천수 많은 게시물 뿌려줘야한다 아직 더미 데이터 이다
        <div className="parent">
          <h1 className="main-h1">추천 게시물 또는 금주의 게시물</h1>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
          >
            {logoutPost.map((imageUrl, index) => {
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
