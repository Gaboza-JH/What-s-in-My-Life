import React from 'react'
import { HiOutlineHeart } from "react-icons/hi";

const Photos = (props) => {
  return (
    <div>Photos {props.postList[0].content}
         <div className = "gallery-container">
          <div className="gallery">
             {props.postList.map((post, index) => {
                return (
                  <div className="gallery-post">
                    <div className="gallery-item" key={index} tabindex="0">
                      <div className="post-wrap">
                        <div className="post-image"> 
                          <img
                              src="https://cdn.pixabay.com/index/2022/08/24/06-50-51-598_1440x550.jpg"
                              className="gallery-image"
                              alt=""
                          />
                        </div>
                        <div className="post-content">
                          {post.content}
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
    </div>
  )
}

export default Photos