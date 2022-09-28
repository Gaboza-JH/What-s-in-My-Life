import React, { useEffect, useState } from "react";
import axios from "axios";
import BigSlide from "../Components/Main/BigSlide";
import MiniSlide from "../Components/Main/MiniSlide";
const Main = ({ user, token }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [topLikesPost, setTopLikePost] = useState(null);
  const [postLikeBoolean, setPostLikeBoolean] = useState();
  const [userdoLikePostIdList, setUserdoLikePostIdList] = useState([]);
  const [postIdIndex, setPostIdIndex] = useState([]);
  const [allPost, setAllPost] = useState([]);

  const fetchUser = async () => {
    try {
      if (user == true) {
        // 특정 유저 정보 조회
        const userResponse = await axios.get(
          `http://3.37.184.148:8080/users/${token}`,
        );
        setUserData(userResponse.data);
        const tmpPostIdList = [];
        for (let index = (userResponse.data.postIdList.length - 1); index >= 0; index--) {
          tmpPostIdList.push(userResponse.data.postIdList[index]);
        }
        setPostIdIndex(tmpPostIdList);

        const response = await axios.get(`http://3.37.184.148:8080/post/`);
        setAllPost(response.data);

        // 유저가 좋아요 누른 게시물 id 리스트
        const userLikesList = await axios.get(`http://3.37.184.148:8080/like/user/post/${token}`);
        setUserdoLikePostIdList(userLikesList.data);

        const likesBoolean = [];
        for (let i = 0; i < response.data.length; i++) {
          let flag = false;
          const res = await axios.get(
            `http://3.37.184.148:8080/like/${response.data[i].postId}`
          );
          if (res.data == 0) {
            likesBoolean.push(false);
          } else {
            for (let j = 0; j < userLikesList.data.length; j++) {
              if (response.data[i].postId == userLikesList.data[j]) {
                likesBoolean.push(true);
                flag = true;
                break;
              } else if ((j == userLikesList.data.length - 1) && (response.data[i].postId != userLikesList.data[j])) {
                likesBoolean.push(false);
              }
            }
            if ((flag === true) && (i == response.data.length - 1)) { break; }
          }
        }
        setPostLikeBoolean(likesBoolean);
      }

      // 인기 게시물 5개 조회
      const topResponse = await axios.get(
        `http://3.37.184.148:8080/like/top_post`
      );
      setTopLikePost(topResponse.data);
      
    } catch (e) {
      console.log("error" + error);
      setError(e);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (error) return <div>에러가 발생했습니다</div>;
  if (!topLikesPost) return null;

  return (
    <div>
      <BigSlide user={user} token={token} userData={userData} topLikesPost={topLikesPost} />
      <MiniSlide user={user} token={token} userData={userData} postIdIndex={postIdIndex} postLikeBoolean={postLikeBoolean} />
    </div>
  );
};
export default Main;