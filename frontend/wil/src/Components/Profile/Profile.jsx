import React, { useState } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import profileImg from "../../static/img/profile_default.png";
import S3upload from "../S3/S3upload";
import "./Profile.css";

const Profile = (props) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenPostUpload, setIsOpenPostUpload] = useState(false);

  const openProfileModalHandler = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  const openPostUploadModalHandler = () => {
    setIsOpenPostUpload(!isOpenPostUpload);
  };

  return (
    <div className="profile-header">
      <div className="profile">
        <div className="profile-image">
          <img src={profileImg} alt="" />
        </div>
        {/* <S3upload /> */}

        <div className="profile-user-settings">
          <h1 className="profile-user-name">{props.user.nickname}</h1>
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
                    <input className="profile-input" type="text" placeholder="Nickname"/>
                    <button className="btn-save">Save</button>
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
              <span className="profile-stat-count"> 188</span>
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
                        <button className="btn-save">Save</button>
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
