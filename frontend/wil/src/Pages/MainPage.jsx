import React, { useEffect, useState } from "react";
import axios from "axios";
import BigSlide from '../Components/Main/BigSlide'
import MiniSlide from '../Components/Main/MiniSlide'

const Main = ({ user, token }) => {

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [topLike, setTopLike] = useState([]);

 
  const fetchUser = async () => {
    try{
      setError(null);
      setUserData(null);
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/users/${token}`
      );
      setUserData(response.data);

      const topResponse = await axios.get(`http://localhost:8080/like/top_post/`);
      console.log(topResponse.data);
      setTopLike(topResponse.data);


    } catch (e) {
      console.log("error"+error);
      setError(e);
    }
    setLoading(false);
  };
  console.log("userdata : "+ userData);
  

  // const topLikesPost = async () => {
  //   try{
  //     const topResponse = await axios.get(`http://localhost:8080/like/top_post/`);
  //     console.log(topResponse.data);
  //     setTopLike(topResponse.data);
      
  //   } catch (e) {
  //     console.log("error"+error);
  //     setError(e);
  //   }
  // }
 
  useEffect(() => {
    fetchUser();  
    
  }, []);

  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;
  if (!userData) return null;
  if (!topLike) return null;
  
  return (
    <div>
        <BigSlide  user={user} token={token} userData={userData} topLikesPost={topLike ? topLike : null}/>
        <MiniSlide user={user} token={token} userData={userData} />
    </div>
  );
};

export default Main