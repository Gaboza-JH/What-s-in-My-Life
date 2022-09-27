import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import { HiOutlineX } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import "react-multi-carousel/lib/styles.css";
import "./MiniSlide.css";
import "../Gallery/Gallery.css";
import HeartImg from "../../static/img/heart.png"
import EmptyHeartImg from "../../static/img/emptyheart.png"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
};

const MiniSlide = ({ user, token, userData, postLikeBoolean, postIdIndex }) => {
  const [allPost, setAllPost] = useState(null);
  const [topPost, setTopPost] = useState(null);
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);
  const [topPostLike, setTopPostLike] = useState([]);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [clickImg, setClickImg] = useState(null);
  const [clickImgPostId, setClickImgPostId] = useState(null);
  const [modalclickImgPostId, setModalClickImgPostId] = useState(null);
  const [modalClickContent, setModalClickContent] = useState("");
  const close = useRef();

  const [likeBoolean, setLikeBoolean] = useState(postLikeBoolean);
  const [postLikeId, setPostLikeId] = useState();


  // modal창 활성화 핸들러
  const openPostModalHandler = (e) => {
    setIsOpenPost(!isOpenPost);
    setClickImg(e.target);
    setClickImgPostId(e.target.id);
    setModalClickImgPostId(Number(e.target.id));
  };

  const likePostHandler = async (e) => {
    console.log("좋아요 등록 버튼");

    if (likeBoolean[e.target.id] != true) {
      const postId = Number(clickImgPostId);
      const likeDTO = {
        postId: postId,
      };
      try {
        const token = localStorage.getItem("token");
        // 좋아요 등록
        const response = await axios.post(
          `http://localhost:8080/like/${token}`,
          likeDTO
        );
        let tmplist = likeBoolean;
        tmplist[e.target.id] = true;
        setLikeBoolean(tmplist);
        fetchPost();
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    }
  };

  const likeDeleteHandler = async (e) => {
    if (likeBoolean[e.target.id] == true) {
      try {
        const token = localStorage.getItem("token");
        // 좋아요 취소
        const response = await axios.delete(
          `http://localhost:8080/like/${token}/${clickImgPostId}`,
        );
        let tmplist = likeBoolean;
        tmplist[e.target.id] = false;
        setLikeBoolean(tmplist);
        fetchPost();
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    }
  };

  const fetchPost = async () => {
    try {
      // 전체 게시물 조회
      const response = await axios.get(`http://localhost:8080/post/`);
      setAllPost(response.data);

      // 좋아요 수 Top5 게시물 조회
      const topResponse = await axios.get(
        `http://localhost:8080/like/top_post`
      );
      setTopPost(topResponse.data);

      // postIdIndexList 생성
      const postIdIndex = [];
      for (let index = 0; index < response.data.length; index++) {
        postIdIndex.push(response.data[index].postId);
      }

      // topPostIdIndexList 생성
      const topPostIdIndex = [];
      for (let index = 0; index < topResponse.data.length; index++) {
        topPostIdIndex.push(topResponse.data[index].postId);
      }

      // 포스트 당 좋아요 수 조회
      const likes = [];
      for (let index = 0; index < postIdIndex.length; index++) {
        const response = await axios.get(
          `http://localhost:8080/like/${postIdIndex[index]}`
        );
        likes.push(response.data);
      }
      setPostLike(likes);

      // 인기 포스트 당 좋아요 수 조회
      const topLikes = [];
      for (let index = 0; index < topPostIdIndex.length; index++) {
        const response = await axios.get(
          `http://localhost:8080/like/${topPostIdIndex[index]}`
        );
        topLikes.push(response.data);
      }
      setTopPostLike(topLikes);
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

  // 최신순으로 rendering
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
            onClick={(e) => {
              setIsOpenPost(!isOpenPost);
              setClickImg(e.target);
              setClickImgPostId(e.target.id);
              setModalClickImgPostId(Number(e.target.id))
              console.log(index);
              setModalClickContent(allPost[index].content)

              for (let i = 0; i < Object.keys(postLike).length; i++) {
                if (e.target.id == allPost[i].postId) {
                  console.log(i);
                  setPostLikeId(i); 
                }
              }
            }}

          />
          <div className="gallery-item-info">
            <ul>
              <li className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
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
          <div className="gallery-item-info">
            <ul>
              <li className="gallery-item-likes">
                <span className="visually-hidden">Likes:</span>
                <HiOutlineHeart aria-hidden="true" /> {topPostLike[index]}
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
        <>
          <div className="gallery-container">
            <h1 className="main-h1">전체 게시물</h1>
            <div className="gallery">{rendering()}</div>
          </div>
          {isOpenPost === true ? (
            <div
              className="backdrop"
              ref={close}
              onClick={(e) => {
                if (close.current === e.target) {
                  setIsOpenPost(false);
                }
              }}
            >
              <div className="modal-view" onClick={(e) => e.stopPropagation()}>
                <div className="btn-wrapper">
                  <span onClick={openPostModalHandler} className="close-btn">
                    <HiOutlineX />
                  </span>
                </div>
                <div className="desc">
                  <form className="modal-form">
                    <div className="modal-gallery-container">
                      <div className="gallery-item">
                        <div className="modal-container">
                          <div className="main-modal-image-box">
                            <img
                              src={clickImg.src}
                              className="modal-gallery-image"
                              alt=""
                            />
                          </div>
                          <div className="main-modal-heart-box">
                            <img
                              src={(likeBoolean[postLikeId]) ? HeartImg : EmptyHeartImg}
                              className="main-modal-heart-image"
                              alt=""
                            />
                          </div>
                          <div className="main-modal-like-num">
                            {postLike[postLikeId]}
                          </div>
                        </div>
                      </div>
                    </div>
                    <h3 className="modal-content">{modalClickContent}</h3>
                    <button
                      className="btn-save"
                      type="button"
                      id={postLikeId}
                      onClick={likeBoolean[postLikeId] ? likeDeleteHandler : likePostHandler}
                    >
                      ❤ 좋아요 ❤
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
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
