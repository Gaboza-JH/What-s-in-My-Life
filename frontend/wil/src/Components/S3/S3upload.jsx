
import React, { useState } from 'react';
import AWS from 'aws-sdk';
import { Row, Col, Button, Input, Alert, Container } from 'reactstrap';
import { useDropzone, FileWithPath } from "react-dropzone";
import { useFormikContext, useField } from "formik";
import { toast } from "react-toastify";
import './S3upload.css';
import Progressbar from './Progressbar';  
import axios from 'axios';


function S3upload(){
  const defaultUpload = "이미지 파일을 업로드 해주세요."
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(defaultUpload);
  const [showAlert, setShowAlert] = useState(false);
  


  const FileInputHandler = e => {
    const imgFiles = e.target.files[0]; // 현재 이미지 파일
    // const imageUrl = URL.createObjectURL(imgFile) // 선택한 이미지 파일의 url
    console.log(imgFiles);
    setProgress(0);
    setFiles(imgFiles);
    const imageFile = imgFiles[0] 
    setFileName(imageFile.name) // 첫번째 이미지 파일에 대해서 이름 노출
    //setFileUrl(imageUrl) // 이미지파일의 src를 해당 이미지 url로 변경

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imageFile);
    fileReader.onload = e => setFileUrl(e.target.result[0]);
  } 
 
 
  // form submit
  const onSubmit = async (e) => {  
    e.preventDefault(); //submit 멈춰
    
    const formData = new FormData();  
    // for(let file of files){ // 여러파일 전송
    //   formData.append("image", files);
    // } 
    formData.append("image", files);
    try {
      const res = await axios.post("http://localhost:8080/images", formData,{
        headers: { "Content-Type" : "multipart/form-data" }   
      });
      console.log(formData.fileName);
      console.log("data : ", res.data);
      console.log("headers : ", res.headers);
      console.log("statusText : ", res.statusText);
      console.log("config : ", res.config);
      console.log("request : ", res.request);
      console.log("request : ", res.file);
      console.log("request : ", res.fileName);
      console.log("request : ", res.fileUrl);
      console.log("image upload success!");
      //setImages([...images, res.data])
      toast.success("success!!  이미지 업로드 성공");
      setTimeout(() => {
        setProgress(0);
        setFileName(defaultUpload);
        setFileUrl(null);
      }, 2000);
    } catch (err) {
      toast.error(err.message);
      setProgress(0);
      setFileName(defaultUpload);
      setFileUrl(null);
      console.error(err);
    }
  }

  return(
    <>
      <div>
        <form onSubmit={onSubmit}>
          <img src={fileUrl} className={`image-preview ${fileUrl && "image-preview-show"}`}/>
          {/* <Progressbar progress={progress}/> */}
          <div className="file-droper">
            {fileName}
            <input id="image" type="file" multiple accept='image/*' onChange={FileInputHandler}/>
          </div>
          <button type="submit" style={{width:"100%", borderRadius: 10, cursor:"pointer"}}>upload</button>
        </form>
      </div>

    </>
  );
}



export default S3upload
//export default withStyles(styles)(FileUpload)