import React from 'react'
import BigSlide from '../Components/Main/BigSlide'
import MiniSlide from '../Components/Main/MiniSlide'

const Main = ({ user, token }) => {
  

  return (
    <div>
        <BigSlide  user={user} token={token} />
        <MiniSlide user={user} token={token} />
    </div>
  );
};

export default Main