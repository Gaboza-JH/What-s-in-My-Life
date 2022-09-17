import React, { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import "./Gallery.css";
import axios from "axios";

// 게시물 유무 판별 로직 추가
const Gallery = (props) => {
  const postIdIndex = props.user.postIdList;
  const [postList, setPostList] = useState();
  const [error, setError] = useState(null);
  const [postLike, setPostLike] = useState(null);

  // 유저가 업로드한 포스트 조회
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

  // 포스트 당 좋아요 수 조회
  const fetchPostLike = async () => {
    const likes =[]
    try {
      for (let index = 0; index < postIdIndex.length; index++){
        const response = await axios.get(`http://localhost:8080/like/${postIdIndex[index]}`);
        likes.push(response.data)
      }
      setPostLike(likes)
    } catch (e) {
      console.log("error : " + error);
      setError(e);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchPostLike();
  }, []);

  if (error) return <div>포스트 조회 에러가 발생했습니다</div>;
  if (!postList) return null;
  if (!postLike) return null;

  console.log("postList -->");
  console.log(postList);
  console.log("postLikes -->");
  console.log(postLike);

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
      <div className="gallery-container">
        <div className="gallery">{rendering()}</div>
      </div>
    </div>
  );
};
export default Gallery;
