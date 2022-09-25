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

  // 유저 정보 조회
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token 값 : " + token);
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/users/${token}`);
      setUser(response.data);
    } catch (e) {
      console.log("error" + error);
      setError(e);
    }
    setLoading(false);
  };

  // 게시물 당 좋아요 수 조회
  const fetchPostLike = async () => {
    const likesBoolean = [];
    try {
      for (let index = 0; index < user.postIdList.length; index++) {
        const response = await axios.get(
          `http://localhost:8080/like/${user.postIdList[index]}`
        );
        if (response.data == 0) {
          likesBoolean.push(false);
        } else {
          likesBoolean.push(true);
        }
      }
      setPostLikeBoolean(likesBoolean);
    } catch (e) {
      console.log("error : " + error);
      // setError(e);
    }
  };


  // // 유저가 좋아요 누른 게시물 id 리스트
  // const fetchUserdoLikePostId = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`http://localhost:8080/like/user/post/${token}`);
  //     setUserdoLikePostIdList(response.data);
  //   } catch (e) {
  //     console.log("error" + error);
  //     // setError(e);
  //   }
  // }

  useEffect(() => {
    fetchUser();
    // fetchUserdoLikePostId();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <Profile user={user} />
      <Senti user={user} Chart={user}/>
      <Gallery user={user} postLikeBoolean={postLikeBoolean}/>
      {/* <Gallery user={user} likedPostList={userdoLikePostIdList}/> */}
    </div>
  );
};

export default MyPage;
