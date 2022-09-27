import React, { useState } from "react";
import { toast } from "react-toastify";
import "./PostUpload.css";
import axios from "axios";

function PostUpload() {
  const defaultUpload = "Drag files to upload.";
  const [files, setFiles] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(defaultUpload);
  const [finalPost, setfinalPost] = useState([]);
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

  // textInput onChange Handler
  const TextInputHandler = (e) => {
    const textInput = e.target.value;
  };

  // PostSubmit onCLick Handler
  const clickPostSubmit = async (e) => {
    const contents = document.getElementById("textInput").value;
    const formData = new FormData();

    for (let file of files) {
      formData.append("image", file);
    }

    // 등록 하고 싶은 게시물 정보
    const PostDTO = {
      content: contents,
      shown: true,
    };
    formData.append(
      "PostDTO",
      new Blob([JSON.stringify(PostDTO)], { type: "application/json" })
    );

    const textDTO = {
      text: contents,
    };

    // 게시물 등록하는 요청
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://3.37.184.148:8080/post/${token}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const modelRes = await axios.post(
        `http://3.37.184.148:8080/predict/`,
        textDTO,
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
          },
        }
      );
      const sentiDTO = {
        senti: modelRes.data.senti,
      };

      const resultPostRes = await axios.put(
        `http://3.37.184.148:8080/post/${res.data.postId}`,
        sentiDTO
      );
      setfinalPost(resultPostRes.data);

      toast.success("success!!  이미지 업로드 성공");
      alert("🎶 게시물이 등록 되었습니다! 🎶");
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

  if (clickUpload == true) {
    setTimeout(() => {
      window.location = "http://3.37.184.148:3000/mypage";
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
          <input
            id="textInput"
            type="text"
            className="text-input"
            onChange={TextInputHandler}
            placeholder="Please enter your contents."
          />
          <button
            type="button"
            className="upload-btn"
            onClick={clickPostSubmit}
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
}

export default PostUpload;
