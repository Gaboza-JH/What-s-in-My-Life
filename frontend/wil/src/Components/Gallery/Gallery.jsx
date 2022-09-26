import React, { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import axios from "axios";
import "./Gallery.css";
import HeartImg from "../../static/img/heart.png"
import EmptyHeartImg from "../../static/img/emptyheart.png"

// user={user} postIdIndex={postIdIndex} postLikeBoolean={postLikeBoolean}
// 게시물 유무 판별 로직 추가 해야 함
const Gallery = (props) => {
  const postIdIndex = props.user.postIdList; // 이건 순서대로 들어옴
  const postIdReverseIndex = props.postIdIndex; // 역순 완료
  const [postList, setPostList] = useState();
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);
  
  console.log(props.user);
  console.log(props.postIdIndex);
  console.log(props.postLikeBoolean);
  const list = [];
  for (let i = 0; i < props.postLikeBoolean.length; i++) {
    list.push(props.postLikeBoolean[i]);
  }
  const [postLikeBoolean, setPostLikeBoolean] = useState(list); // 역순 완료
  console.log(postLikeBoolean);
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [clickImg, setClickImg] = useState(null);
  const [clickImgPostId, setClickImgPostId] = useState(null);
  const [allPost, setAllPost] = useState(null);
  const [modalclickImgPostId, setModalClickImgPostId] = useState(null);
  // const [clickLike, setClickLike] = useState();
  const [modalClickContent, setModalClickContent] = useState('');
  const [userIdListDoLikesByPostId, setUserIdListDoLikesByPostId] = useState([]);
  const [postLikeId, setPostLikeId] = useState();
  const [userdoLikePostIdList, setUserdoLikePostIdList] = useState([]);

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
    // 클릭한 이미지에 관한 ImgPostId index 정보
    setModalClickImgPostId(Number(e.target.id) - 1);

    for (let i = 0; i < Object.keys(postLike).length; i++) {
      if (e.target.id == postIdReverseIndex[i]) {
        console.log(i);
        setPostLikeId(i); // postLikeId : 인덱스 정보
      }
    }

    // 실패한 로직
    // if (modalclickImgPostId != 0) {
    //   const id = e.target.id - postList[0].postId; // postList[0].postId -> 유저가 업로드한 첫 게시물 id
    //   setPostLikeId(id);
    // }

  };

  // 전체 게시물 조회 (역순)
  const allFetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/post/`);
      setAllPost(response.data);
      console.log(response.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 새로고침 하면 useState 때문에 무조건 false로 시작임 -> props 내려주면서 해결
  // id={postLikeId} : index 정보
  const likePostHandler = async (e) => {
    console.log("좋아요 등록 버튼");

    if (postLikeBoolean[e.target.id] != true) {
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
        let tmplist = postLikeBoolean;
        tmplist[e.target.id] = true;
        setPostLikeBoolean(tmplist);
        fetchPostLike();
        fetchUserdoLikePostId();
        // fetchUserIdListDoLikesByPostId();
        console.log("좋아요 등록 완료");
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    }
  };

  const likeDeleteHandler = async (e) => {
    console.log(e);
    console.log("좋아요 취소 버튼");

    if (postLikeBoolean[e.target.id] == true) {
      try {
        const token = localStorage.getItem("token");
        // 좋아요 취소
        const response = await axios.delete(
          `http://localhost:8080/like/${token}/${clickImgPostId}`,
        );
        let tmplist = postLikeBoolean;
        tmplist[e.target.id] = false;
        setPostLikeBoolean(tmplist);
        fetchPostLike();
        fetchUserdoLikePostId();
        // fetchUserIdListDoLikesByPostId();
        console.log("좋아요 취소 완료");
      } catch (e) {
        console.log("error : " + error);
        setError(e);
      }
    }
  };

  // 유저가 업로드한 게시물 조회 (역순)
  const fetchPost = async () => {
    try {
      const token = localStorage.getItem("token");
      const postResponse = await axios.get(
        `http://localhost:8080/post/user/${token}`
      );
      setPostList(postResponse.data);
      console.log(postResponse.data);
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  // 게시물 당 좋아요 수 조회 (순서대로 들어옴)
  const fetchPostLike = async () => {
    const likes = [];
    const likesBoolean = [];
    try {
      for (let index = 0; index < postIdIndex.length; index++) { // postIdIndex는 순서대로
        const response = await axios.get(
          `http://localhost:8080/like/${postIdIndex[index]}`
        );
        likes.push(response.data);
      }

      // 역순으로 집어넣기
      const tmpLikes = [];
      for (let index = (postIdIndex.length - 1); index >= 0; index--) {
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
      console.log(response);
      setUserIdListDoLikesByPostId(response.data);
    } catch (e) {
      console.log("error : " + error);
      // setError(e);
    }
  }

  // 유저가 좋아요 누른 게시물 id 리스트
  const fetchUserdoLikePostId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/like/user/post/${token}`);
      console.log(response.data); // [5]
      setUserdoLikePostIdList(response.data);
    } catch (e) {
      console.log("error" + error);
      // setError(e);
    }
  }

  // if (clickLike == true) {
  //   setTimeout(() => {
  //     window.location = "http://localhost:3000/mypage";
  //   }, 3000);
  // }

  useEffect(() => {
    allFetchPost();
    fetchPost();
    fetchPostLike();
    fetchUserdoLikePostId();
    // fetchUserIdListDoLikesByPostId();
  }, []);

  if (error) return <div>포스트 조회 에러가 발생했습니다</div>;
  if (!postList) return null;
  if (!postLike) return null;

  console.log(postList);
  // console.log(clickLike);
  console.log(props.user);
  console.log(props.user.postIdList);

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
            //onClick={openPostModalHandler}
            onClick={(e) => {
              console.log("게시물 modal 활성화 / 비활성");
              setIsOpenPost(!isOpenPost);

              // 클릭한 이미지 정보
              setClickImg(e.target);
              // 클릭한 게시물 아이디 정보
              setClickImgPostId(e.target.id);
              // 클릭한 이미지에 관한 ImgPostId index 정보
              // setModalClickImgPostId(Number(e.target.id) - 1);
              // setModalClickImgPostId(Number(e.target.id))
              console.log(index);
              setModalClickContent(postList[index].content)
              // setModalClickContent(allPost[index].content)

              
              for (let i = 0; i < Object.keys(postLike).length; i++) {
                if (e.target.id == postIdReverseIndex[i]) {
                  setPostLikeId(i); // postLikeId : 인덱스 정보
                }
              }
            }}
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


  console.log(postLike);
  console.log("--------------------------");

  // 여기 3개가 전부 null 값임.. -> 위에 핸들러 안써서 일어난 문제
  console.log(clickImg);
  console.log(clickImgPostId); // 3
  console.log(modalclickImgPostId); // 2, index 값

  console.log(userIdListDoLikesByPostId);
  console.log(props.user);
  console.log(postLikeBoolean);

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
                    <div className="modal-container">
                      <div className="modal-image-box">
                        <img
                          src={clickImg.src}
                          className="modal-gallery-image"
                          alt=""
                        />
                      </div>
                      <div className="modal-heart-box">
                        <img
                          // index 로직 처리 더 해야 함 (좋아요 클릭한 유저가 여러명일 수 있으니까)
                          // src={(clickLike || (userIdListDoLikesByPostId[0] === props.user.id)) ? HeartImg : EmptyHeartImg}
                          // src={(clickLike) ? HeartImg : EmptyHeartImg}
                          src={(postLikeBoolean[postLikeId]) ? HeartImg : EmptyHeartImg}
                          className="modal-heart-image"
                        />
                      </div>
                      <div className="modal-like-num">
                        {/* 모달 타겟에는 게시물 id 정보만 들어있음
                          근데 postLike는 게시물 id랑은 상관없이
                          0부터 시작
                        */}
                        {postLike[postLikeId]}
                      </div>
                    </div>
                    {/* <div className="gallery-item-info">
                      <ul>
                        <li className="gallery-item-likes">
                          <HiOutlineHeart /> {postLike[modalclickImgPostId]}
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
                <h3 className="modal-content">
                  {/* {allPost[modalclickImgPostId].content} */}
                  {modalClickContent}
                </h3>
                <button
                  className="btn-save"
                  type="button"
                  id={postLikeId}
                  onClick={postLikeBoolean[postLikeId] ? likeDeleteHandler : likePostHandler}
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