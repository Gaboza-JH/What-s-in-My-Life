import React, { useEffect, useState } from 'react';
import axios from "axios";

const ImageList = () => {
    const [images, setImages] = useState([]);
    useEffect(()=>{
        axios.get("/images").then((result) => setImages(result.data))
        .catch((err) => console.error(err));
    }, []);
    console.log({ images });
    const imgList = images.map((image) =>
     <img style={{width:"100%"}} src={`http://localhost:8080/images/${image.key}`}/>)
  return (
    <div>
        <h3>ImageList</h3>
        {imgList}
    </div>
  )
}

export default ImageList