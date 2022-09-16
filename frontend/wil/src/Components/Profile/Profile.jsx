import React, { useState, useEffect } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import profileImg from "../../static/img/profile_default.png";
import S3upload from "../S3/S3upload2";
import "./Profile.css";
import axios from 'axios';

const Profile = (props) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenPostUpload, setIsOpenPostUpload] = useState(false);
  const [likes, setLikes] = useState(0);
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/like/user/1`)
    .then(response => setLikes(response.data))
  })
  
  const openProfileModalHandler = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  const openPostUploadModalHandler = () => {
    setIsOpenPostUpload(!isOpenPostUpload);
  };
  

  const [inputs, setInputs] = useState({
    nickname: ""
  });

  const handleOnChange = (e) => {
    setInputs({
      ...inputs, 
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  const clickHandler = async (e) => {
    const token = localStorage.getItem("token");
    
    console.log("clickHandler안에서 event : " + e);
    console.log(e.target.value);

    const response = await axios.put(
      `http://localhost:8080/users/${token}`, {
        nickname : e.target.value
      }
    );
    console.log("put request의 response : " + response);
  }



  return (
    <div className="profile-header">
      <div className="profile">
        <div className="profile-image">
          <img src={profileImg} alt="" />
        </div>
        {/* <S3upload /> */}

        <div className="profile-user-settings">
          <h1 className="profile-user-name">{props.user.nickname /* nickname */}</h1>
          <button
            className="btn profile-edit-btn"
            onClick={openProfileModalHandler}
          >
            <HiOutlineCog /> Edit Profile
          </button>
          {isOpenProfile === true ? (
            <div className="backdrop" onClick={openProfileModalHandler}>
              <div className="modal-view" onClick={(e) => e.stopPropagation()}>
                <span onClick={openProfileModalHandler} className="close-btn">
                  <HiOutlineX />
                </span>
                <div className="desc">
                  <form className="modal-form">
                    <h1 className="header-profile">Edit Profile</h1>
                    <span className="span-profile">
                      Please modify your profile as you please.
                    </span>
                    <input className="profile-input" type="text" placeholder="Nickname" name="nickname" onChange={handleOnChange}/>
                    <button className="btn-save" onSubmit={clickHandler}>Save</button>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="profile-stats">
          <ul>
            <li>
              <HiOutlineViewGrid />
              <span className="profile-stat-count"> {props.user.postIdList.length}</span>
            </li>
            <li>
              <HiOutlineHeart />
              <span className="profile-stat-count"> {likes}</span>
            </li>
            <li>
              <button
                className="btn upload-post-btn"
                onClick={openPostUploadModalHandler}
              >
                <HiViewGridAdd /> Upload Post
              </button>
              {isOpenPostUpload === true ? (
                <div className="backdrop" onClick={openPostUploadModalHandler}>
                  <div
                    className="modal-view"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      onClick={openPostUploadModalHandler}
                      className="close-btn"
                    >
                      <HiOutlineX />
                    </span>
                    <div className="desc">
                      <form className="modal-form">
                        <h1 className="header-upload">Upload Post</h1>
                        <span>Post a picture or write down what you want.</span>
                        <S3upload />
                        {/* <button className="btn-save">Save</button> */}
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;