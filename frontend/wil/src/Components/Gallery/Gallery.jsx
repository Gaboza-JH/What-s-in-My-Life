import React, { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import axios from "axios";
import "./Gallery.css";

// 게시물 유무 판별 로직 추가 해야 함
const Gallery = (props) => {
  const postIdIndex = props.user.postIdList;
  const [postList, setPostList] = useState();
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [clickImg, setClickImg] = useState(null);
  const [clickImgPostId, setClickImgPostId] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const [modalclickImgPostId, setModalClickImgPostId] = useState(null);

  // modal 활성화 되었을 때 이벤트핸들러
  const openPostModalHandler = (e) => {
    console.log("게시물 modal 활성화 / 비활성");
    setIsOpenPost(!isOpenPost);
    console.log(e);
    console.log(e.target);
    console.log(Number(e.target.id) - 1);
    // 이미지 클릭
    setClickImg(e.target);
    // ImgPostId 정보
    setClickImgPostId(e.target.id);
    // 클릭한 이미지에 관한 ImgPostId 정보
    setModalClickImgPostId(Number(e.target.id) - 1);
  };

  // 전체 게시물 조회
  const allFetchPost = async () => {
    try {
      const response = await axios.get(`http://3.37.184.148:8080/post/`);
      setAllPost(response.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 좋아요 버튼
  const clickHandler = async (e) => {
    console.log("좋아요 버튼 클릭");
    const postId = Number(clickImgPostId);
    const likeDTO = {
      postId: postId,
    };

    try {
      const token = localStorage.getItem("token");
      // 좋아요 등록
      const response = await axios.post(
        `http://3.37.184.148:8080/like/${token}`,
        likeDTO
      );
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 유저가 업로드한 게시물 조회
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const postResponse = await axios.get(
        `http://3.37.184.148:8080/post/user/${token}`
      );
      setPostList(postResponse.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 게시물 당 좋아요 수 조회
  const fetchPostLike = async () => {
    const likes = [];
    try {
      for (let index = 0; index < postIdIndex.length; index++) {
        const response = await axios.get(
          `http://3.37.184.148:8080/like/${postIdIndex[index]}`
        );
        likes.push(response.data);
      }
      setPostLike(likes);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  useEffect(() => {
    allFetchPost();
    fetchPost();
    fetchPostLike();
  }, []);

  if (error) return <div>포스트 조회 에러가 발생했습니다</div>;
  if (!postList) return null;
  if (!postLike) return null;

  // 전체 게시물 rendering 함수
  const rendering = () => {
    const result = [];
    for (let index = 0; index < Object.keys(postList).length; index++) {
      result.push(
        <div className="gallery-item" key={index} tabindex="0">
          <img
            src={
              "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
              postList[index].imgList[0].file_name
            }
            className="gallery-image"
            id={postList[index].postId}
            alt=""
            onClick={openPostModalHandler}
          />
          {/* 좋아요 수 표시*/}
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

  return (
    <>
      <div className="gallery-container">
        <h1 className="main-h1">내 게시물</h1>
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
                    <img
                      src={clickImg.src}
                      className="modal-gallery-image"
                      alt=""
                    />
                  </div>
                </div>
                <h3 className="modal-content">
                  {allPost[modalclickImgPostId].content}
                </h3>
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
  );
};
export default Gallery;
