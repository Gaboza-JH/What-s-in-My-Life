import React, { useState } from "react";
import "./Gallery.css"
import { HiOutlineHeart } from "react-icons/hi";

const galleryImageUrl = [
    {
        url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
        content : "해삼1",
      },
      {
        url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
        content : "해삼2",
      },
      {
        url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
        content : "해삼3",
      },
      {
        url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
        content : "해삼4",
      },
      {
        url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
        content : "해삼5",
      },
      {
        url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
        content : "해삼6",
      },
      {
        url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
        content : "해삼7",
      },
      {
        url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
        content : "해삼8",
      },
      {
        url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
        content : "해삼9",
      },
      {
        url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
        content : "해삼10",
      },
]


const Gallery = () => {

  const [isOpenPost, setIsOpenPost] = useState(false);
  const openPostModalHandler = () => {
    setIsOpenPost(!isOpenPost);
  };

    return (
        <div className = "gallery-container">
          <div className="gallery">
            {galleryImageUrl.map((imageUrl, content, index) => {
                return (
                  <div className="gallery-post" onClick={openPostModalHandler}>
                    {isOpenPost === true ? (
                      <div className="backdrop" onClick={openPostModalHandler}>
                        <div className="modal-view" onClick={(e) => e.stopPropagation()}>
                          <div className="desc">
                            <form className="modal-form">
                              이얏
                            </form>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    <div className="gallery-item" key={index} tabindex="0">
                      <div className="post-wrap">
                        <div className="post-image"> 
                          <img
                              src={imageUrl.url}
                              className="gallery-image"
                              alt=""
                          />
                        </div>
                        <div className="post-content">
                          {imageUrl.content}
                        </div>
                      </div>
                    <div className="gallery-item-info">
                        <ul>
                            <li className="gallery-item-likes">
                                <span className="visually-hidden">Likes:</span>
                                <HiOutlineHeart aria-hidden="true"/> 56
                            </li>
                        </ul>
                    </div>
                  </div>
                </div>
                );
            })}
        </div>
    </div>    
    );
  };
  
  export default Gallery;