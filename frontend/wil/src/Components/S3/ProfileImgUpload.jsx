import React, { useState } from "react";
import { toast } from "react-toastify";
import "./PostUpload.css";
import axios from "axios";

const ProfileImgUpload = () => {
  const defaultUpload = "Drag files to upload.";
  const [files, setFiles] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(defaultUpload);
  const [clickUpload, setClickUpload] = useState(false);

  // FileInput onChange Handler
  const FileInputHandler = (e) => {
    const imgFiles = e.target.files;
    setFiles(imgFiles);
    const imageFile = imgFiles[0];
    setFileName(imageFile.name);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => {
      setFileUrl(e.target.result);
    };
  };

  // 프로필 이미지 등록하는 요청
  const clickProfileImgSubmit = async (e) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("image", file);
    }
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:8080/users/${token}`,
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Access‑Control‑Allow‑Origin": "*",
            "Access‑Control‑Allow‑Headers":
              "Origin, X‑Requested‑With, Content‑Type, Accept",
            "Access‑Control‑Allow‑Methods": "GET,PUT,POST,DELETE,OPTIONS",
            "Access‑Control‑Allow‑Credentials": "true",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("👌 Profile 사진이 수정되었습니다. 👌");
      setTimeout(() => {
        setFileName(defaultUpload);
        setFileUrl(null);
      }, 2000);
      setClickUpload(true);
    } catch (err) {
      toast.error(err.message);
      setFileName(defaultUpload);
      setFileUrl(null);
      console.error(err);
    }
  };

  if (clickUpload === true) {
    setTimeout(() => {
      window.location = "http://localhost:3000/mypage";
    }, 1000);
  }

  return (
    <>
      <div>
        <form>
          <img
            src={fileUrl}
            className={`image-preview ${fileUrl && "image-preview-show"}`}
            alt="upload_img"
          />
          <div className="file-droper">
            <img
              src="https://img.icons8.com/pastel-glyph/2x/image-file.png"
              alt="upload_Image"
              className="uploadImage"
            ></img>
            {fileName}
            <input
              className="file-input"
              id="image"
              type="file"
              multiple
              accept="image/*"
              onChange={FileInputHandler}
            />
          </div>
          <div id="result" className="contentsResult"></div>
          <button
            type="button"
            className="upload-btn"
            onClick={clickProfileImgSubmit}
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileImgUpload;
