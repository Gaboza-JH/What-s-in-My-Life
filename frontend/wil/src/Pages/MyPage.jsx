import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "../Components/Profile/Profile";
import Senti from "../Components/Senti/Senti";
import Gallery from "../Components/Gallery/Gallery";

const MyPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postLikeBoolean, setPostLikeBoolean] = useState();
  const [userdoLikePostIdList, setUserdoLikePostIdList] = useState([]);
  const [postIdIndex, setPostIdIndex] = useState([]);

  // 유저 정보 조회
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(`http://3.37.184.148:8080/users/${token}`);
      setUser(response.data);

      const tmpPostIdList = [];
      for (let index = response.data.postIdList.length - 1; index >= 0; index--) {
        tmpPostIdList.push(response.data.postIdList[index]);
      }
      setPostIdIndex(tmpPostIdList);

      // 유저가 좋아요 누른 게시물 id 리스트
      const userLikesList = await axios.get(
        `http://3.37.184.148:8080/like/user/post/${token}`
      );
      setUserdoLikePostIdList(userLikesList.data);

      const likesBoolean = [];
      for (let i = 0; i < tmpPostIdList.length; i++) {
        let flag = false;

        const res = await axios.get(
          `http://3.37.184.148:8080/like/${tmpPostIdList[i]}`
        );

        if (res.data == 0) {
          // 좋아요 수가 0이면 무조건 false
          likesBoolean.push(false);
        } else {
          for (let j = 0; j < userLikesList.data.length; j++) {
            if (tmpPostIdList[i] == userLikesList.data[j]) {
              likesBoolean.push(true);

              flag = true;
              break;
            } else if (
              j == userLikesList.data.length - 1 &&
              tmpPostIdList[i] != userLikesList.data[j]
            ) {
              likesBoolean.push(false);
            }
          }
          if (flag === true && i == tmpPostIdList.length - 1) {
            break;
          }
        }
      }
      setPostLikeBoolean(likesBoolean);
    } catch (e) {
      console.log("error" + error);
      setError(e);
    }
    setLoading(false);
  };

  // 유저가 좋아요 누른 게시물 id 리스트
  const fetchUserdoLikePostId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://3.37.184.148:8080/like/user/post/${token}`
      );
      setUserdoLikePostIdList(response.data);
    } catch (e) {
      console.log("error" + error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchUserdoLikePostId();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <Profile user={user} />
      <Senti user={user} Chart={user} />
      <Gallery
        user={user}
        postIdIndex={postIdIndex}
        postLikeBoolean={postLikeBoolean}
      />
    </div>
  );
};

export default MyPage;
