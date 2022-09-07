import React from "react";
import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import catPunch from "../../static/gif/cat_punch.gif";
import cuteDog from "../../static/gif/dog_cute.gif";
import kimchiPancake from "../../static/gif/Kimchi_pancake.gif";
import "./BigSlide.css";

const BigSlide = ({ user }) => {
  return (
    <div>
      {user ? (
        <Carousel>
          {/* <Carousel.Item>
            <img className="d-block w-100" src={catPunch} alt="First slide" />
            <img className="d-block w-100" src={catPunch} alt="Second slide" />
            <img className="d-block w-100" src={catPunch} alt="Third slide" />
          </Carousel.Item> */}

          <Carousel.Item>
            <img className="d-block w-100" src={catPunch} alt="First slide" />
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
          </Carousel.Item>

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
