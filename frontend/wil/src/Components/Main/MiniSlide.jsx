import React, { useEffect, useState} from 'react'
import axios from 'axios';
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

const loginPost = [
  {
    url: "https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_960_720.jpg",
  }
];

const logoutPost = [
  {
    url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
  }
];

const MiniSlide = ({ user, token }) => {

  const [allPost, setAllPost] = useState(null);
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState(null);

  const fetchPost = async () => {
    try{
      setError(null);
      setAllPost(null);
      setLoding(true);
      const response = await axios.get(
        `http://localhost:8080/post/`
      );
      console.log(response.data);
      setAllPost(response.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
    setLoding(false);
  }

  useEffect(() => {
    fetchPost();
  }, []);

  if (loading) return <div>로딩 중....</div>; 
  if (error) return <div>전체 게시물 에러가 발생했습니다</div>;
  if (!allPost) return null;


  return (
    <div>
      {user ? (
        <div className="gallery-container">
          <h1 className="main-h1">전체 게시물</h1>

          {/* for문이나 map으로 돌려서리스트 크기만큼 뿌려주면 된다 */}
          {/* content 출력 */}
          <h1 className="profile-user-name">{allPost[0].content}</h1>
          {/* post 출력 */}
          <img src={"https://wil-s3.s3.ap-northeast-2.amazonaws.com/" + allPost[0].imgList[0].file_name} alt="" />

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
