import React, { useEffect, useState } from "react";
import axios from "axios";
import BigSlide from "../Components/Main/BigSlide";
import MiniSlide from "../Components/Main/MiniSlide";

const Main = ({ user, token }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [topLikesPost, setTopLikePost] = useState(null);

  const fetchUser = async () => {
    try {
<<<<<<< HEAD
      // 특정 유저 정보 조회
      const response = await axios.get(`http://3.37.184.148:8080/users/${token}`);
      setUserData(response.data);

      // 인기 게시물 5개 조회
      const topResponse = await axios.get(
        `http://3.37.184.148:8080/like/top_post`
=======
      if (user == true) {
        // 특정 유저 정보 조회
        const response = await axios.get(`http://localhost:8080/users/${token}`);
        setUserData(response.data);
      }

      // 인기 게시물 5개 조회 (뭔가 로직 변경이 필요할 것 같음, 게시물이 없는 경우)
      const topResponse = await axios.get(
        `http://localhost:8080/like/top_post`
>>>>>>> 087c92dabae4a904777361971ac6dedeff1ba5d6
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

<<<<<<< HEAD
  if (error) return <div>에러가 발생했습니다</div>;
  if (!userData) return null;
=======
  console.log(topLikesPost);

  if (error) return <div>에러가 발생했습니다</div>;
  // if (!userData) return null;
>>>>>>> 087c92dabae4a904777361971ac6dedeff1ba5d6
  if (!topLikesPost) return null;

  return (
    <div>
      <BigSlide
        user={user}
        token={token}
        userData={userData}
        topLikesPost={topLikesPost}
      />
      <MiniSlide user={user} token={token} userData={userData} />
    </div>
  );
};

export default Main;
