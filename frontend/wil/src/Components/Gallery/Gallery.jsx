import React, { useEffect, useState } from "react";
import "./Gallery.css"
import axios from 'axios';
import Photos from "./Photos"
import Postss from "./Postss"

// const galleryImageUrl = [
//     {
//         url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
//         content : "해삼1",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
//         content : "해삼2",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
//         content : "해삼3",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
//         content : "해삼4",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
//         content : "해삼5",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
//         content : "해삼6",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
//         content : "해삼7",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
//         content : "해삼8",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
//         content : "해삼9",
//       },
//       {
//         url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
//         content : "해삼10",
//       },
// ]



const Gallery = (props) => {

  console.log(props.user.postIdList);

  const[postList, setPostList] = useState([]);

  const fetchPost = async () => {
    try{
      const postList = [];
      props.user.postIdList.map(async (postId, index) => {
        const postResponse = await axios.get(
          `http://localhost:8080/post/${postId}`
        );
        postList.push(postResponse.data);
      });
      console.log(postList);
      setPostList(postList);
    }catch(e){
      <div>에러가 발생했습니다</div>
    }}

    useEffect(() => {
      fetchPost();    
    }, []);
    
    return (
      <>
  
        {/* <Photos postList={postList} /> */}
      </>
    );
  };
  
  export default Gallery;