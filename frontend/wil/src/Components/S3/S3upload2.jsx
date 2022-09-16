import React, { useState } from "react";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert, Container } from "reactstrap";
import { useDropzone, FileWithPath } from "react-dropzone";
import { useFormikContext, useField } from "formik";
import { toast } from "react-toastify";
import "./S3upload.css";
import axios from "axios";

function S3upload() {
  const defaultUpload = "Drag files to upload.";
  const [files, setFiles] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(defaultUpload);
  const [showAlert, setShowAlert] = useState(false);
  const [text, setText] = useState("");

  // <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="upload_Image" className="uploadImage"></img>
  //           {fileName}
  // <input className="file-input" id="image" type="file" multiple accept="image/*" onChange={FileInputHandler} />

  // onChange Handler
  const FileInputHandler = (e) => {
    console.log(e);
    const imgFiles = e.target.files; // 현재 이미지 파일
    // const imageUrl = URL.createObjectURL(imgFile) // 선택한 이미지 파일의 url
    console.log(imgFiles);
    setFiles(imgFiles);
    const imageFile = imgFiles[0];
    setFileName(imageFile.name); // 첫번째 이미지 파일에 대해서 이름 노출
    //setFileUrl(imageUrl) // 이미지파일의 src를 해당 이미지 url로 변경

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = (e) => {
      console.log(e.target.result);
      setFileUrl(e.target.result);
    }
  };


  // {/* 텍스트 글 입력 및 출력 버튼 */}
  // <div id='result' className="contentsResult"></div>
  // <input id="textInput" type="text" className="text-input" onChange={TextInputHandler} placeholder="Please enter your contents." />

  // onChange Handler
  const TextInputHandler = (e) => {
    const textInput = e.target.value;
    console.log(textInput);
    //setText=textInput;
  }

  // <button id="contents" type="button" className="textInput-btn" onClick={clickTextInput}>Text</button>
  // onCLick Handler 입력된 contents 글 화면에 출력
  const clickTextInput = async (e) => {
    console.log("content 저장 버튼 click?", e.target);
    const contents = document.getElementById('textInput').value;
    console.log(contents)
    document.getElementById("result").innerText = contents;
    console.log(document.getElementById("result").innerText);
  }


  // onCLick Handler
  const clickPostSubmit = async (e) => {
    console.log("click", e.target);
    
    const contents = document.getElementById('textInput').value;
    console.log(contents);
    const formData = new FormData();

    for (let file of files) {
      // 여러파일 전송
      formData.append("image", file);
    }

    const PostDTO = {
      "content": contents,
      "shown": true,
    }
    formData.append("PostDTO", new Blob([JSON.stringify(PostDTO)], {type: "application/json"}));


    try {
      const token = localStorage.getItem("token");
      console.log(PostDTO);

      const res = await axios.post(`http://localhost:8080/post/${token}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(res);
      console.log("headers : ", res.headers);
      console.log("config : ", res.config);
      console.log("request : ", res.request);
      console.log("image upload success!");
      //setImages([...images, res.data])
      toast.success("success!!  이미지 업로드 성공");
      setTimeout(() => {
        setFileName(defaultUpload);
        setFileUrl(null);
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setFileName(defaultUpload);
      setFileUrl(null);
      console.error(err);
    }
  }



  return (
    <>
      <div>
        <form>
          <img src={fileUrl} className={`image-preview ${fileUrl && "image-preview-show"}`} alt="upload_img" />
          <div className="file-droper">
            <img src="https://img.icons8.com/pastel-glyph/2x/image-file.png" alt="upload_Image" className="uploadImage"></img>
            {fileName}
            <input className="file-input" id="image" type="file" multiple accept="image/*" onChange={FileInputHandler} />
          </div>
          {/* 텍스트 글 입력 및 출력 버튼 */}
          <div id='result' className="contentsResult"></div>
          <input id="textInput" type="text" className="text-input" onChange={TextInputHandler} placeholder="Please enter your contents." />
          {/* <label class="switch">
          <input type="checkbox"/>
          <span class="slider round"></span>
        </label>
        <p>OFF</p>
        <p style="display:none;">ON</p> */}
          <button id="contents" type="button" className="textInput-btn" onClick={clickTextInput}>Text</button>
          {/* s3 upload 버튼 */}
          <button type="button" className="upload-btn" onClick={clickPostSubmit}>Upload</button>
          <button id="contents" type="button" className="btn-save">Save</button>
        </form>
      </div>
    </>
  );
}

export default S3upload;
//export default withStyles(styles)(FileUpload)
