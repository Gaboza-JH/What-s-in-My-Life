import React, { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import axios from "axios";
import "./Gallery.css";
import HeartImg from "../../static/img/heart.png";
import EmptyHeartImg from "../../static/img/emptyheart.png";

const Gallery = (props) => {
  const postIdIndex = props.user.postIdList;
  const postIdReverseIndex = props.postIdIndex;
  const [postList, setPostList] = useState();
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);
  const list = [];
  for (let i = 0; i < props.postLikeBoolean.length; i++) {
    list.push(props.postLikeBoolean[i]);
  }
  const [postLikeBoolean, setPostLikeBoolean] = useState(list);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [clickImg, setClickImg] = useState(null);
  const [clickImgPostId, setClickImgPostId] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const [modalclickImgPostId, setModalClickImgPostId] = useState(null);
  const [modalClickContent, setModalClickContent] = useState("");
  const [userIdListDoLikesByPostId, setUserIdListDoLikesByPostId] = useState([]);
  const [postLikeId, setPostLikeId] = useState();
  const [userdoLikePostIdList, setUserdoLikePostIdList] = useState([]);

  // modal 활성화 되었을 때
  const openPostModalHandler = (e) => {
    setIsOpenPost(!isOpenPost);
    setClickImg(e.target);
    setClickImgPostId(e.target.id);
    setModalClickImgPostId(Number(e.target.id) - 1);

    for (let i = 0; i < Object.keys(postLike).length; i++) {
      if (e.target.id == postIdReverseIndex[i]) {
        setPostLikeId(i);
      }
    }
  };

  // 전체 게시물 조회 (최신순)
  const allFetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/post/`);
      setAllPost(response.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 좋아요 등록
  const likePostHandler = async (e) => {
    if (postLikeBoolean[e.target.id] != true) {
      const postId = Number(clickImgPostId);
      const likeDTO = {
        postId: postId,
      };
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:8080/like/${token}`,
          likeDTO
        );
        let tmplist = postLikeBoolean;
        tmplist[e.target.id] = true;
        setPostLikeBoolean(tmplist);
        fetchPostLike();
        fetchUserdoLikePostId();
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    }
  };

  // 좋아요 취소
  const likeDeleteHandler = async (e) => {
    if (postLikeBoolean[e.target.id] == true) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(
          `http://localhost:8080/like/${token}/${clickImgPostId}`
        );
        let tmplist = postLikeBoolean;
        tmplist[e.target.id] = false;
        setPostLikeBoolean(tmplist);
        fetchPostLike();
        fetchUserdoLikePostId();
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    }
  };

  // 유저가 업로드한 게시물 조회 (최신순)
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const postResponse = await axios.get(
        `http://localhost:8080/post/user/${token}`
      );
      setPostList(postResponse.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 게시물 당 좋아요 수 순서대로 조회
  const fetchPostLike = async () => {
    const likes = [];
    try {
      for (let index = 0; index < postIdIndex.length; index++) {
        const response = await axios.get(
          `http://localhost:8080/like/${postIdIndex[index]}`
        );
        likes.push(response.data);
      }
      const tmpLikes = [];
      for (let index = postIdIndex.length - 1; index >= 0; index--) {
        tmpLikes.push(likes[index]);
      }
      setPostLike(tmpLikes);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 게시물 당 좋아요를 누른 유저 id 리스트 조회
  const fetchUserIdListDoLikesByPostId = async () => {
    const userIdListDoLikesByPostId = [];
    try {
      const response = await axios.get(
        `http://localhost:8080/like/users/${clickImgPostId}`
      );
      setUserIdListDoLikesByPostId(response.data);
    } catch (e) {
      console.log("error : " + error);
    }
  };

  // 유저가 좋아요 누른 게시물 id 리스트
  const fetchUserdoLikePostId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/like/user/post/${token}`
      );
      setUserdoLikePostIdList(response.data);
    } catch (e) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    allFetchPost();
    fetchPost();
    fetchPostLike();
    fetchUserdoLikePostId();
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
            onClick={(e) => {
              setIsOpenPost(!isOpenPost);
              setClickImg(e.target);
              setClickImgPostId(e.target.id);
              setModalClickContent(postList[index].content);

              for (let i = 0; i < Object.keys(postLike).length; i++) {
                if (e.target.id == postIdReverseIndex[i]) {
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

  return (
    <>
      <div className="gallery-container">
        <h1 className="main-h1">My Post</h1>
        <div className="gallery">{rendering()}</div>
      </div>
      {isOpenPost === true ? (
        <div className="backdrop">
          <div className="modal-view" onClick={(e) => e.stopPropagation()}>
            <span onClick={openPostModalHandler} className="close-btn">
              <HiOutlineX />
            </span>
            <div className="desc">
              <form className="modal-form">
                <div className="modal-gallery-container">
                  <div className="gallery-item">
                    <div className="modal-container">
                      <div className="modal-image-box">
                        <img
                          src={clickImg.src}
                          className="mypage-modal-gallery-image"
                          alt=""
                        />
                      </div>
                      <div className="modal-heart-box">
                        <img
                          src={
                            postLikeBoolean[postLikeId]
                              ? HeartImg
                              : EmptyHeartImg
                          }
                          className="modal-heart-image"
                          alt=""
                        />
                      </div>
                      <div className="modal-like-num">
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
                  onClick={
                    postLikeBoolean[postLikeId]
                      ? likeDeleteHandler
                      : likePostHandler
                  }
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
