import React from 'react'
import BigSlide from '../Components/Main/BigSlide'
import MiniSlide from '../Components/Main/MiniSlide'
import ImageList from '../Components/S3/ImageList';
import S3upload from '../Components/S3/S3upload';
//import S3Upload_Image from '../Components/S3/S3Upload_Image';

const Main = ({ user }) => {
  return (
    <div style={{ maxWidth: 1200, margin: "auto" }}>
        <BigSlide  user={user}/>
        <MiniSlide user={user} />
        <S3upload/>
        <ImageList/>
    </div>
  );
};

export default Main