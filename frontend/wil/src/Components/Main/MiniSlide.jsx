import React, { useEffect, useState } from "react";
import axios from "axios";
// import ReactCardSlider from "react-card-slider-component";
// import { Carousel } from "@trendyol-js/react-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./MiniSlide.css";

import { HiOutlineX } from "react-icons/hi";
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

const MiniSlide = ({ user, token, userData }) => {
  const [allPost, setAllPost] = useState(null);
  const [topPost, setTopPost] = useState(null);
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);
  const [topPostLike, setTopPostLike] = useState(null);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [clickImg, setClickImg] = useState(null);
  const [clickImgPostId, setClickImgPostId] = useState(null);
  const [modalclickImgPostId, setModalClickImgPostId] = useState(null);

  const openPostModalHandler = (e) => {
    console.log("게시물 modal 활성화 / 비활성");
    setIsOpenPost(!isOpenPost);
    console.log(e);
    console.log(e.target);
    console.log(Number(e.target.id)-1);
    setClickImg(e.target);
    setClickImgPostId(e.target.id);
    setModalClickImgPostId(Number(e.target.id)-1)
  };

  // postId DTO로 같이 보내줘야 함
  const clickHandler = async (e) => {
    console.log("좋아요 버튼 클릭");

    const postId = Number(clickImgPostId);
    const likeDTO = {
      "postId": postId
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8080/like/${token}`, likeDTO
      );
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  const fetchPost = async () => {
    try {
      // 전체 게시물 조회
      const response = await axios.get(`http://localhost:8080/post/`);
      console.log(response.data);
      setAllPost(response.data);

      // 좋아요 수 Top5 게시물 조회 
      const topResponse = await axios.get(`http://localhost:8080/like/top_post/`);
      console.log(topResponse.data);
      setTopPost(topResponse.data);


      // postIdIndexList 생성
      const postIdIndex = [];
      for (let index = 0; index < response.data.length; index++) {
        postIdIndex.push(response.data[index].postId);
      }
      console.log(postIdIndex);

      // topPostIdIndexList 생성
      const topPostIdIndex = []
      for (let index = 0; index < topResponse.data.length; index++) {
        topPostIdIndex.push(topResponse.data[index].postId)
      }
      console.log(topPostIdIndex);

      // 포스트 당 좋아요 수 조회
      const likes = []
      try {
        for (let index = 0; index < postIdIndex.length; index++) {
          const response = await axios.get(`http://localhost:8080/like/${postIdIndex[index]}`);
          likes.push(response.data)
        }
        setPostLike(likes);
        // console.log(likes);
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }

      // 인기 포스트 당 좋아요 수 조회
      const topLikes = []
      try {
        for (let index = 0; index < topPostIdIndex.length; index++) {
          const response = await axios.get(`http://localhost:8080/like/${topPostIdIndex[index]}`);
          topLikes.push(response.data)
        }
        setTopPostLike(topLikes);
        console.log(topLikes);
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

  const contentsDef = () => {
    const contents = [];
    for (let index = 0; index < Object.keys(allPost).length; index++) {
      contents.push(
        allPost[index].content
      );
    }
    console.log(contents);
    return contents;
  };

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
            id={allPost[index].postId}
            alt=""
            onClick={openPostModalHandler}
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

  const renderingTop = () => {
    const result = [];
    for (let index = 0; index < Object.keys(topPost).length; index++) {
      result.push(
        <div className="gallery-item" key={index} tabindex="0">
          <img
            src={
              "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
              topPost[index].imgList[0].file_name
            }
            className="gallery-image"
            id={topPost[index].postId}
            alt=""
            onClick={openPostModalHandler}
          />
          {/* 좋아요 수 표시*/}
          <div className="gallery-item-info">
            <ul>
              <li className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
                {/* 게시물 마다 좋아요 눌러진 수 만큼 출력되야된다  */}
                {/* <HiOutlineHeart aria-hidden="true" /> {topPostLike[index]} */}
              </li>
            </ul>
          </div>
        </div>
      );
    }
    return result;
  }

  return (
    <div>
      {user ? (
        <>
          <div className="gallery-container">
            <h1 className="main-h1">전체 게시물</h1>
            <div className="gallery">{rendering()}</div>
          </div>
          {/* modal 기능 */}
          {isOpenPost === true ? (
            <div className="backdrop">
              <div className="modal-view" onClick={(e) => e.stopPropagation()}>
                <span onClick={openPostModalHandler} className="close-btn">
                  <HiOutlineX />
                </span>
                <div className="desc">
                  <form className="modal-form">
                    <h1 className="header-profile">게시물</h1>
                    <div className="modal-gallery-container">
                        <div className="gallery-item">
                          <img src={clickImg.src} className="modal-gallery-image" alt="" />
                        </div>
                    </div>
                    <h3 className="modal-content">{allPost[modalclickImgPostId].content}</h3>
                    <button
                      className="btn-save"
                      type="button"
                      onClick={clickHandler}
                    >
                      ❤좋아요❤
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        // 비로그인 일 때 추천수 많은 게시물 뿌려줘야한다 아직 더미 데이터 이다
        <div className="parent">
          <h1 className="main-h1">🎉게시물 순위🎉</h1>
          <Carousel
            responsive={responsive}
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            infinite={true}
            partialVisible={false}
          >
            {renderingTop().map((imageUrl, index) => {
              return (
                <div className="slider" key={index} tabindex="0">
                  <img src={imageUrl.props.children[0].props.src} alt="error" />
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
