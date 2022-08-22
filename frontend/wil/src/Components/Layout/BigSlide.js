import React from 'react'
import { Carousel } from "react-bootstrap";
import introduction from "../../src_assets/wil.gif"
import {BsBoxArrowInRight} from "react-icons/bs";
import "../../BigSlide.css"

const BigSlide = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={introduction}
          alt="First slide"
        />
      </Carousel.Item>

      {/* <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2022/08/08/19/36/landscape-7373484_1280.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2022/08/06/19/20/woman-7369219_1280.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    
    </Carousel>
  );
}

export default BigSlide
