import React, { useEffect, useState } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import profileImg from "../../static/img/profile_default.png";
import S3upload from "../S3/S3upload";
import "./Profile.css";
import axios from 'axios';

const Profile = (props) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenPostUpload, setIsOpenPostUpload] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const openProfileModalHandler = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  const openPostUploadModalHandler = () => {
    setIsOpenPostUpload(!isOpenPostUpload);
  };

  const fetchUser = async () => {
    try{
      setError(null);
      setUser(null);
      setLoading(true);
      const response = await axios.get(
        'http://localhost:8080/users/1'
      );
      setUser(response.data);
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
    <div className="profile-header">
      <div className="profile">
        <div className="profile-image">
          <img src={profileImg} alt="" />
        </div>
        {/* <S3upload /> */}

        <div className="profile-user-settings">
          <h1 className="profile-user-name">{user.nickname}</h1>
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
              <span className="profile-stat-count"> {user.postIdList.length}</span>
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
