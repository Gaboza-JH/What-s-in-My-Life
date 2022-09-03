import React from "react";
import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import catPunch from "../../static/gif/cat_punch.gif";
import "./BigSlide.css";

const BigSlide = ({ user }) => {
  return (
    <div>
      {user ? (
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={catPunch} alt="First slide" />
          </Carousel.Item>
        </Carousel>
      ) : (
        <Carousel>
          <Carousel.Item>
            <img className="d-block w-100" src={introduction} alt="First slide" />
          </Carousel.Item>
        </Carousel>
      )}
    </div>
  );
};

export default BigSlide;
