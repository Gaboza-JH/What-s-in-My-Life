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
          `http://localhost:8080/users/${token}`,
          // {
          //   withCredentials: true // 쿠키 cors 통신 설정
          // },
          {
            headers: { "Authorization": "Bearer " + token, },
          },
        );
        setUserData(userResponse.data);
        // 역순으로 집어넣기
        const tmpPostIdList = [];
        for (let index = (userResponse.data.postIdList.length - 1); index >= 0; index--) {
          tmpPostIdList.push(userResponse.data.postIdList[index]);
        }
        console.log(tmpPostIdList); // [4, 2, 1]
        setPostIdIndex(tmpPostIdList);


        // 전체 게시물 조회 (이미 역순)
        const response = await axios.get(`http://localhost:8080/post/`);
        console.log(response.data);
        setAllPost(response.data);


        // 유저가 좋아요 누른 게시물 id 리스트
        const userLikesList = await axios.get(`http://localhost:8080/like/user/post/${token}`);
        console.log(userLikesList.data); // [1]
        setUserdoLikePostIdList(userLikesList.data);


        const likesBoolean = [];
        console.log(response.data.length); // 7
        console.log(userLikesList.data.length); // 4
        for (let i = 0; i < response.data.length; i++) {
          let flag = false;
          const res = await axios.get(
            `http://localhost:8080/like/${response.data[i].postId}`
          );
          if (res.data == 0) { // 좋아요 수가 0이면 무조건 false
            likesBoolean.push(false);
            console.log("[" + i + "] : " + likesBoolean[i]);
          } else { // 좋아요 수가 1 이상인 경우
            // 좋아요 수가 1개 이상이더라도 현재 유저가 좋아요 누른게 아니면 false 취급
            for (let j = 0; j < userLikesList.data.length; j++) {
              if (response.data[i].postId == userLikesList.data[j]) {
                likesBoolean.push(true);
                console.log("[" + i + "]" + "[" + j + "] : " + likesBoolean[i]);
                flag = true;
                break;
              } else if ((j == userLikesList.data.length - 1) && (response.data[i].postId != userLikesList.data[j])) {
                likesBoolean.push(false);
                console.log("[" + i + "]" + "[" + j + "] : " + likesBoolean[i]);
              }
            }
            if ((flag === true) && (i == response.data.length - 1)) { break; }
          }
        }
        console.log(likesBoolean);
        setPostLikeBoolean(likesBoolean);
      }

      // 인기 게시물 5개 조회 (뭔가 로직 변경이 필요할 것 같음, 게시물이 없는 경우)
      const topResponse = await axios.get(
        `http://localhost:8080/like/top_post`
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

  console.log(topLikesPost);

  if (error) return <div>에러가 발생했습니다</div>;
  // if (!userData) return null;
  if (!topLikesPost) return null;

  return (
    <div>
      <BigSlide
        user={user}
        token={token}
        userData={userData}
        topLikesPost={topLikesPost}
      />
      <MiniSlide user={user} token={token} userData={userData} postIdIndex={postIdIndex} postLikeBoolean={postLikeBoolean} />
    </div>
  );
};

export default Main;
