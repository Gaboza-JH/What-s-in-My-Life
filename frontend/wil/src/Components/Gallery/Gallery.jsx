import React, { useEffect, useState } from "react";
import { HiOutlineHeart } from "react-icons/hi";
import "./Gallery.css";
import axios from "axios";


// const galleryImageUrl = [
//   {
//     url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
//     content: "해삼1",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
//     content: "해삼2",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
//     content: "해삼3",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
//     content: "해삼4",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
//     content: "해삼5",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
//     content: "해삼6",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
//     content: "해삼7",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
//     content: "해삼8",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
//     content: "해삼9",
//   },
//   {
//     url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
//     content: "해삼10",
//   },
// ];

const Gallery = (props) => {
  // console.log(props.user.postIdList);

  const [postList, setPostList] = useState(null);
  const [imgList, setImgList] = useState(null);

  const fetchPost = async () => {
    try {
      const posts = [];
      const imgs =[];
      const token = localStorage.getItem("token");
      props.user.postIdList.map(async (postId) => {
        const postResponse = await axios.get(
          `http://localhost:8080/post/user/${token}`
        );
        console.log(postResponse.data);
        const imageResponse = await axios.get(
          `http://localhost:8080/images/${postId}`
        );
        console.log(imageResponse);
      // const token = localStorage.getItem("token");
      // const response = await axios.post(
      //   `http://localhost:8080/users/${token}`
      // );
      
      posts.push(postResponse.data);
      imgs.push(imageResponse.data);
      });
      setPostList(posts);
      console.log(postList);
      setImgList(imgs);
    } catch (e) {
      <div>에러가 발생했습니다</div>;
    }
  };


  console.log("postList -->");
  console.log(postList[0][0].content);
  console.log("imgList -->");
  console.log(imgList);



  useEffect(() => {
    fetchPost();
  }, []);


  // console.log("제발");

  // console.log(postList?.[0]?.[0]);
  
  // console.log(postList[0][0].content);
//   Array.prototype.forEach.call( postList, row => {
//     console.log( 'row', row );
//   } )


//   // 유사배열을 for문을통해 배열처럼 사용한 케이스
// for(var index=0; index<imgList.length; index++) {
// 	console.log( `imgList[ ${index} ] ` + imgList[ index ] )
// }


//   let arr = Array.from(postList);
//   postList.forEach((value, key) => {
//     console.log(`${value} : ${key}`);
//   })


  // let nestedObj = {
  //   type: {
  //     year: '2019',
  //     'comment-type': [{
  //       name: 'simple'
  //     }]
  //   }
  // }

  // console.log(nestedObj.type['comment-type'][0].name);
  // console.log(postList.type['imgList'][0].file_name);


//   console.log(Object.keys(String(imgList)));
//   console.log(Object.keys(imgList));

//   console.log(Object.keys(imgList)[0]);

//   Object.keys(imgList).forEach(function(v){
//     console.log(imgList[v]);
// })



  // imgList.map((imgs, index) => {
  //   return(
  //     <div key={index} tabindex="0">
  //       {imgs.map((img, index) => {
  //         {img.file_name}
  //       })}
  //     </div>
  //   );
  // })

  // useEffect(() => {
  //   fetchPost();
  //   // if (postList.length == 0 ) {
  //   //   console.log("if문 통과");
  //   //   console.log(postList[0][0].content);

  //   // } else {
  //   //   console.log("--------------------------------------");
  //   // }
  // });

  return (
    <>
    {/* post와 img 데이터 postList, imgList에서 확인가능
    화면단에 데이터를 뿌리는 과정에서 오류가 남.
    차라리 처음부터 image 테이블에 img_Url 추가해서 쓰는 것이 더 나을 듯. */}


    {/* <div>
      <img src={`https://wil-s3.s3.ap-northeast-2.amazonaws.com/${imgList[0]}`}>{postList}</h1>
    </div> */}

    { // 이미지를 실질적으로 뿌려주는 부분
      imgList.map((imgs, index) => {
        const imgsList = [];
        imgs.map((image, index) => {
          imgsList.push("https://wil-s3.s3.ap-northeast-2.amazonaws.com/"+image.file_name)
        })
        console.log(imgList);
        return(
          <div key={index} tabindex="0">
            {imgsList.map((imgSrc, index) => {
              <img src={imgSrc}/>
            })}
          </div>
        );
      })    
    }
    {/* <Photo imgList={imgList} /> */}

    {/* <div>
      {postList.map((post, index) => {
        return(
          <div key={index} tabindex="0">
            {post.content}
          </div>
        );
      })}
    </div> */}

    {/* <div>
      {imgList.map((img, index) => {
        return(
          <div key={index} tabindex="0">
          <img src = {img} />
          </div>
        );
      })}
    </div> */}

    </>
    // <>
    // {/* {postList.map((post, index) => {
    //   return(
    //     <div key={index} tabindex="0">
    //       {post.content}
    //     </div>
    //   );
    // })} */}
    // </>
      // <div className="gallery">
      //   {galleryImageUrl.map((galleryPost, index) => {
      //     return (
      //       <div className="gallery-item" key={index} tabindex="0">
      //          <div className="post-wrap">
      //             <div className="post-image"> 
      //               <img
      //                 src="https://cdn.pixabay.com/index/2022/08/24/06-50-51-598_1440x550.jpg"
      //                   className="gallery-image"
      //                    alt=""
      //                />
      //             </div>
      //               <div className="post-content">
      //                 {galleryPost.content}
      //             </div>
      //           </div>
      //          <div className="gallery-item-info">
      //            <ul>
      //              <li className="gallery-item-likes">
      //                <span className="visually-hidden">Likes:</span>
      //                <HiOutlineHeart aria-hidden="true" /> 56
      //              </li>
      //            </ul>
      //          </div>
      //       </div>
      //     );
      //   })}
      // </div>
  );
};

export default Gallery;