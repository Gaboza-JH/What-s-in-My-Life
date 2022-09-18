import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import "./BigSlide.css";
import axios from "axios";

//const BigSlide = ({ user }) => {
const BigSlide = (props) => {
  console.log(props.user);
  const [topLikes, setTopLikes] = useState([]);

  console.log("toplike1 ? " + props.topLikesPost);
  console.log("toplike2 ? " + Object.keys(props.topLikesPost).length);
  //console.log("toplike==== ? "+props.topLikesPost[0]);
  if (Object.keys(props.topLikesPost).length != null) {
    try {
      for (
        let index = 0;
        index < Object.keys(props.topLikesPost).length;
        index++
      ) {
        topLikes.push(
          <Carousel.Item>
            <img
              className="d-block"
              src={
                "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
                props.topLikesPost[index].imgList[0].file_name
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
