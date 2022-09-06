import React, { useEffect, useState } from "react";
import "./Gallery.css"
import { HiOutlineHeart } from "react-icons/hi";
import axios from 'axios';

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

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchUser = async () => {
    try{
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(
        'http://localhost:8080/users/1'
      );
      console.log(response.data);
      setUser(response.data); // 데이터는 response.data 안에 들어있습니다.
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>로딩중..</div>; 
  if (error) return <div>에러가 발생했습니다</div>;
  if (!user) return null;

    return (
        <div className = "gallery-container">
          <div className="gallery">
            {galleryImageUrl.map((imageUrl, index) => {
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