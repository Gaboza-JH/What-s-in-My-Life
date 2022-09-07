import "./Gallery.css";
import { HiOutlineHeart } from "react-icons/hi";

const galleryImageUrl = [
  {
    url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2022/06/12/11/57/street-7257864_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2015/03/04/15/03/sky-658888_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2018/05/18/12/43/rose-3411110_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2021/11/05/07/49/women-6770533_1280.jpg",
  },
  {
    url: "https://cdn.pixabay.com/photo/2022/08/08/06/04/chrysanthemums-7371966_1280.jpg",
  },
];

const Gallery = () => {
  return (
    <div className="gallery-container">
      <div className="gallery">
        {galleryImageUrl.map((imageUrl, index) => {
          return (
            <div className="gallery-item" key={index} tabindex="0">
              <img src={imageUrl.url} className="gallery-image" alt="" />
              <div className="gallery-item-info">
                <ul>
                  <li className="gallery-item-likes">
                    <span className="visually-hidden">Likes:</span>
                    <HiOutlineHeart aria-hidden="true" /> 56
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
