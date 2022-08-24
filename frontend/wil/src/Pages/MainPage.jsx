import React from 'react'
import BigSlide from '../Components/Main/BigSlide'
import MiniSlide from '../Components/Main/MiniSlide'

const Main = ({ user }) => {
  return (
    <div>
        <BigSlide  user={user}/>
        <MiniSlide user={user} />
    </div>
  );
};

export default Main