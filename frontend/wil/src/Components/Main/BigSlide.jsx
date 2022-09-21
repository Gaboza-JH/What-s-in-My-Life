import { Carousel } from "react-bootstrap";
import introduction from "../../static/gif/wil.gif";
import "./BigSlide.css";


const BigSlide = (props) => {

  // 추천수 많은 5개 게시물 조회 및 리스트에 추가
  const topLikes = []
  if (Object.keys(props.topLikesPost).length != null) {
    try {
      console.log(props.user);
      for ( let index = 0; index < Object.keys(props.topLikesPost).length; index++) {
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
