import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import axios from "axios";
import "./BigSlide.css";
const BigSlide = (props) => {
  console.log(props.topLikesPost);
  const [topPostLike, setTopPostLike] = useState([]);
  const fetchPost = async () => {
    // 인기 게시물 5개 조회
    const topResponse = await axios.get(
      `http://3.37.184.148:8080/like/top_post`
    );
    setTopPostLike(topResponse.data);
  }
  useEffect(() => {
    fetchPost();
  }, []);
  // 추천수 많은 5개 게시물 조회 및 리스트에 추가
  let topLikes = [];
  if (Object.keys(topPostLike).length != null && topLikes.length < 5) {
    try {
      for ( let index = 0; index < Object.keys(topPostLike).length; index++) {
        topLikes.push(
          <Carousel.Item>
            <img
              className="d-block"
              src={
                "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
                topPostLike[index].imgList[0].file_name
              }
              alt="First slide"
            />
          </Carousel.Item>
        );
      }
    } catch (e) {
      console.log("error " + e);
    }
  } else if (topLikes.length >= 5) {
    topLikes = [];
    fetchPost();
    try {
      for ( let index = 0; index < Object.keys(topPostLike).length; index++) {
        topLikes.push(
          <Carousel.Item>
            <img
              className="d-block"
              src={
                "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
                topPostLike[index].imgList[0].file_name
              }
              alt="First slide"
            />
          </Carousel.Item>
        );
      }
    } catch (e) {
      console.log("error " + e);
    }
  }

  return (
    <div className="d-block-wrapper">
      {props.user ? (
        <Carousel>{topLikes}</Carousel>
      ) : (
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block-w-100"
              src={introduction}
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
};
export default BigSlide;