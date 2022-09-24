import React, { useState, useEffect } from "react";
import { HiViewGridAdd } from "react-icons/hi";
import { HiOutlineCog } from "react-icons/hi";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { HiOutlineX } from "react-icons/hi";
import profileImg from "../../static/img/profile_default.png";
import PostUpload from "../S3/PostUpload";
import ProfileImgUpload from "../S3/ProfileImgUpload";
import "./Profile.css";
import axios from "axios";

const Profile = (props) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenPostUpload, setIsOpenPostUpload] = useState(false);
  const [isOpenProfileImg, setIsOpenProfileImg] = useState(false);
  const [likes, setLikes] = useState(0);

  // 유저의 게시물당  좋아요 수 조회
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:8080/like/user/${token}`)
      .then((response) => setLikes(response.data));
  });

  // Profile Modal
  const openProfileModalHandler = () => {
    setIsOpenProfile(!isOpenProfile);
  };
  // ProfileImg Modal
  const openProfileImgUploadModalHandler = () => {
    setIsOpenProfileImg(!isOpenProfileImg);
  }
  // Upload Modal
  const openPostUploadModalHandler = () => {
    setIsOpenPostUpload(!isOpenPostUpload);
  };

  // 닉네임 초기화
  const [inputs, setInputs] = useState({
    nickname: "",
  });

  // 입력된 닉네임값을 받아오는 이벤트 핸들러
  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  // 닉네임 수정
  const clickHandler = async (e) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `http://localhost:8080/users/${token}`,
      inputs
    );
    console.log("put request의 response : " + response);
  };

  return (
    <div className="profile-header">
      <div className="profile">
        <div className="profile-image">
          <img src={props.user.profileImg == null ? profileImg :  "https://wil-s3.s3.ap-northeast-2.amazonaws.com/" + props.user.profileImg} className="btn profile-image-edit-btn" alt="" onClick={openProfileImgUploadModalHandler}/>
          {isOpenProfileImg === true ? (
                <div className="backdrop" onClick={openProfileImgUploadModalHandler}>
                  <div
                    className="modal-view"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span
                      onClick={openProfileImgUploadModalHandler}
                      className="close-btn"
                    >
                      <HiOutlineX />
                    </span>
                    <div className="desc">
                      <form className="modal-form">
                        <h1 className="header-upload">Upload Profile Image</h1>
                        <span>Post the profile picture you want.</span>
                        {/* <PostUpload /> 대신 컴포넌트 만들어서 넣기*/} 
                        <ProfileImgUpload />
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
        </div>
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
                    <input
                      className="profile-input"
                      type="text"
                      placeholder="Nickname"
                      name="nickname"
                      onChange={handleOnChange}
                    />
                    <button
                      type="button"
                      className="btn-save"
                      onClick={clickHandler}
                    >
                      Save
                    </button>
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
              <span className="profile-stat-count">
                {" "}
                {props.user.postIdList.length}
              </span>
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
                        <PostUpload />
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
