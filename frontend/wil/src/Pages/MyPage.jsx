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
      console.log("token 값 : " + token);
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/users/${token}`);
      setUser(response.data);

      console.log(response.data.postIdList); // [1, 2, 4]
      // 역순으로 집어넣기
      const tmpPostIdList = [];
      for (let index = (response.data.postIdList.length - 1); index >= 0; index--) {
        tmpPostIdList.push(response.data.postIdList[index]);
      }
      console.log(tmpPostIdList); // [4, 2, 1]
      setPostIdIndex(tmpPostIdList);


       // 유저가 좋아요 누른 게시물 id 리스트
      const userLikesList = await axios.get(`http://localhost:8080/like/user/post/${token}`);
      console.log(userLikesList.data); // [1]
      setUserdoLikePostIdList(userLikesList.data);


      const likesBoolean = [];
      console.log(tmpPostIdList.length); // 3
      console.log(userLikesList.data.length); // 2
      for (let i = 0; i < tmpPostIdList.length; i++) { // [4, 2, 1] & ["1", 1, "1"] & [t, f, t]
        let flag = false;
        // console.log("i=======**"+i+"**"+"번째 for문=======");
        const res = await axios.get(
          `http://localhost:8080/like/${tmpPostIdList[i]}`
        );
        // console.log("tmpPostIdList["+i+"] : " + tmpPostIdList[i]);
        // console.log(res.data);
        if (res.data == 0) { // 좋아요 수가 0이면 무조건 false
          likesBoolean.push(false);
          console.log("["+i+"] : " + likesBoolean[i]);
        } else { // 좋아요 수가 1 이상인 경우
          // console.log("좋아요 수가 1 이상인 경우");
          // console.log("좋아요 개수: " + res.data);
          // 좋아요 수가 1개 이상이더라도 현재 유저가 좋아요 누른게 아니면 false 취급
          for (let j = 0; j < userLikesList.data.length; j++) { // [1, 4]
            // console.log("j=======**"+j+"**"+"번째 for문=======");
            // console.log("비교 시작");
            if (tmpPostIdList[i] == userLikesList.data[j]) {
              likesBoolean.push(true);
              console.log("["+i+"]"+"["+j+"] : " + likesBoolean[i]);
              flag = true;
              break;
            } else if ((j == userLikesList.data.length-1)&&(tmpPostIdList[i] != userLikesList.data[j])) {
              likesBoolean.push(false);
              console.log("["+i+"]"+"["+j+"] : " + likesBoolean[i]);
            }
          }
          if((flag === true)&&(i == tmpPostIdList.length-1)) { break; }
        }
      }
      console.log(likesBoolean);
      setPostLikeBoolean(likesBoolean);
    } catch (e) {
      console.log("error" + error);
      setError(e);
    }
    setLoading(false);
  };

  
  // console.log(user.postIdList);
  // 게시물 당 좋아요 수 조회
  // const fetchPostLike = async () => {
  //   const likesBoolean = [];
  //   console.log("fetchPostLike");
  //   console.log(postIdIndex);
  //   for (let i = 0; i < Object.keys(postIdIndex).length; i++) { // [4, 2, 1]
  //     console.log("????????");
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/like/${postIdIndex[i]}`
  //       );
  //       console.log(response.data);
  //       if (response.data == 0) { // 좋아요 수가 0이면 무조건 false
  //         likesBoolean.push(false);
  //       } else { // 좋아요 수가 1 이상인 경우
  //         console.log("좋아요 수가 1 이상인 경우");
  //         console.log("좋아요 개수: " + response.data);
  //         // 좋아요 수가 1개 이상이더라도 현재 유저가 좋아요 누른게 아니면 false 취급
  //         for (let j = 0; j < Object.keys(userdoLikePostIdList).length; j++) {
  //           console.log("비교 시작");
  //           console.log("user.postIdList[i] : " + user.postIdList[i]);
  //           console.log("userdoLikePostIdList[j] : " + userdoLikePostIdList[j]);
  //           if (user.postIdList[i] == userdoLikePostIdList[j]) {
  //             likesBoolean.push(true);
  //             console.log("likesBoolean[i] : " + likesBoolean[i]);
  //             break;
  //           }
  //         }
  //         likesBoolean.push(false);
  //       }
  //     } catch (e) {
  //       console.log("error : " + error);
  //       setError(e);
  //     }

  //     // // 역순으로 집어넣기
  //     // const tmpLikesBoolean = [];
  //     // for (let index = (user.postIdList.length - 1); index >= 0; index--) {
  //     //   tmpLikesBoolean.push(likesBoolean[index]);
  //     // }
  //     // console.log(tmpLikesBoolean);
  //     // setPostLikeBoolean(tmpLikesBoolean);
  //   };
  // }


  // 유저가 좋아요 누른 게시물 id 리스트
  const fetchUserdoLikePostId = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/like/user/post/${token}`);
      console.log(response.data); // [1]
      setUserdoLikePostIdList(response.data);
    } catch (e) {
      console.log("error" + error);
      // setError(e);
    }
  }

  useEffect(() => {
    fetchUser();
    // fetchPostLike();
    fetchUserdoLikePostId();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <Profile user={user} />
      <Senti user={user} Chart={user} />
      <Gallery user={user} postIdIndex={postIdIndex} postLikeBoolean={postLikeBoolean} />
      {/* <Gallery user={user} likedPostList={userdoLikePostIdList}/> */}
    </div>
  );
};

export default MyPage;
