import React, { useEffect, useState, useRef } from "react";
import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import axios from "axios";
import "./BigSlide.css";

const BigSlide = (props) => {

  const [topPostLike, setTopPostLike] = useState([]);

  const fetchPost = async () => {
    // 인기 게시물 5개 조회 (뭔가 로직 변경이 필요할 것 같음, 게시물이 없는 경우)
    const topResponse = await axios.get(
      `http://localhost:8080/like/top_post`
    );
    setTopPostLike(topResponse.data);
    console.log(topPostLike);
  }
 
 
  useEffect(() => {
    fetchPost();
  }, []);


  // 추천수 많은 5개 게시물 조회 및 리스트에 추가
  const topLikes = []
  if (Object.keys(topPostLike).length != null) {
    try {
      console.log(props.user);
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
    <div>
      {props.user ? (
        <Carousel>{topLikes}</Carousel>
      ) : (
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
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
