import React, { useEffect, useState } from "react";
import axios from 'axios';
import Profile from '../Components/Profile/Profile'
import Senti from '../Components/Senti/Senti'
import Gallery from '../Components/Gallery/Gallery'

const MyPage = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchUser = async () => {
    try{
      const token = localStorage.getItem("token");
      console.log("token 값 : " + token);
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/users/${token}`
      );
      console.log(response.data);
      setUser(response.data);
    } catch (e) {
      console.log("error"+error);
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
    // const token = localStorage.getItem("token");
    // axios.get(`http://localhost:8080/post/user/${token}`)
    // .then(response => setUserPosts(response.data));    
  }, []);


  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

  return (
    <div>
      <Profile user={user}/>
      <Senti />
      <Gallery user={user}/>
    </div>
  );
}

export default MyPage