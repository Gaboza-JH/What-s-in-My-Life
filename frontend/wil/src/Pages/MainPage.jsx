import React from 'react'
import BigSlide from '../Components/Main/BigSlide'
import MiniSlide from '../Components/Main/MiniSlide'
//import S3Upload_Image from '../Components/S3/S3Upload_Image';


const Main = ({ user }) => {
  return (
    <div>
        <BigSlide  user={user}/>
        <MiniSlide user={user} />
        {/* <ImageList /> */}
    </div>
  );
};

export default Main