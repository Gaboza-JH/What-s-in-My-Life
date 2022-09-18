import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import catPunch from "../../static/gif/cat_punch.gif";
import cuteDog from "../../static/gif/dog_cute.gif";
import kimchiPancake from "../../static/gif/Kimchi_pancake.gif";
import "./BigSlide.css";
import axios from "axios";


//const BigSlide = ({ user }) => {
const BigSlide = (props) => {
  console.log(props.user);
  const [topLikes, setTopLikes] = useState([]);

  console.log("toplike1 ? "+ props.topLikesPost);
  console.log("toplike2 ? "+Object.keys(props.topLikesPost).length);
  //console.log("toplike==== ? "+props.topLikesPost[0]);
  if(Object.keys(props.topLikesPost).length != null){
    try {
      for (let index = 0; index < Object.keys(props.topLikesPost).length; index++) {
        topLikes.push(
          <Carousel.Item>
            <img className="d-block w-100" src={"https://wil-s3.s3.ap-northeast-2.amazonaws.com/" +
                props.topLikesPost[index].imgList[0].file_name} alt="First slide" />
            <Carousel.Caption>
              <h3>catPunch</h3>
            </Carousel.Caption>
          </Carousel.Item>
        )
      }
      
    } catch (e) {
      console.log("error "+ e);
    }
  }

  
  // for (let index = 0; index < props.topLikesPost.length; index++) {
  //   const element = props.topLikesPost[index];
  //   console.log(element);
  // }

  return (
    <div>
      {props.user ? (
        <Carousel>
          {topLikes}
          {/* <Carousel.Item>
            <img className="d-block w-100" src={catPunch} alt="First slide" />
            <img className="d-block w-100" src={catPunch} alt="Second slide" />
            <img className="d-block w-100" src={catPunch} alt="Third slide" />
          </Carousel.Item> */}

          {/* <Carousel.Item>
            <img className="d-block w-100" src={catPunch} alt="First slide" />
            <Carousel.Caption>
              <h3>catPunch</h3>
            </Carousel.Caption>
          </Carousel.Item> */}


            {/* <img className="d-block w-100" src={catPunch} alt="First slide" />
            <Carousel.Caption>
              <h3>catPunch</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <img className="d-block w-100" src={kimchiPancake} alt="Second slide" />
            <Carousel.Caption>
              <h3>kimchiPancake</h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <img className="d-block w-100" src={cuteDog} alt="Third slide" />
            <Carousel.Caption>
              <h3>cuteDog</h3>
            </Carousel.Caption> 
        </Carousel.Item> */}

        </Carousel>
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
