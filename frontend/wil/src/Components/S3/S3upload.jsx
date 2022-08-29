
import React, { useState } from 'react'
import AWS from 'aws-sdk';
import { Row, Col, Button, Input, Alert, Container } from 'reactstrap';
import { useDropzone, FileWithPath } from "react-dropzone";
import { useFormikContext, useField } from "formik";
import { toast } from "react-toastify"
import './S3upload.css'
import Progressbar from './Progressbar';  
import axios from 'axios';


function S3upload(props){
  const defaultUpload = "이미지 파일을 업로드 해주세요."
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState(defaultUpload);
  const [showAlert, setShowAlert] = useState(false);
  

  const ACCESS_KEY='AKIAU6NN4KHZO6FHRYXD';
  const SECRET_ACCESS_KEY='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';
  const REGION='ap-northeast-2'
  const S3_BUCKET='wil-s3';

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  

  const FileInputHandler = e => {
    const imgFile = e.target.files[0]; // 현재 이미지 파일
    const imageUrl = URL.createObjectURL(imgFile) // 선택한 이미지 파일의 url
    console.log(imgFile);
    setProgress(0);
    setFile(e.target.files[0]);
    setFileName(imgFile.name)
    //setFileUrl(imageUrl) // 이미지파일의 src를 해당 이미지 url로 변경

    const fileReader = new FileReader();
    fileReader.readAsDataURL(imgFile);
    fileReader.onload = e => setFileUrl(e.target.result);
  } 

  // 업로드 버튼 누르면!
  const uploadFile = (file) => {
    const params = {
      ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: "upload/" + file.name
    };
    
    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100))
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setFile(null);
        }, 3000)
      })
      .send((err) => {
        if (err) console.log(err)
      })
  }

  // form submit
  const onSubmit = async (e) => {  
    e.preventDefault(); //submit 멈춰
    const formData = new FormData();  
    formData.append("image", file)
    console.log(formData);
    try {
      const res = await axios.post("http://localhost:8080/images", formData,{
        headers: { "Content-Type" : "multipart/form-data" },
        onUploadProgress: (e) => {
          setProgress(Math.round(100 * e.loaded/e.total));
        },
      });
      toast.success("success!!  이미지 업로드 성공");
      setTimeout(() => {
        setProgress(0);
        setFileName(defaultUpload);
        setFileUrl(null);
      }, 3000);
    } catch (error) {
      toast.error(error.message);
      setProgress(0);
      setFileName(defaultUpload);
      setFileUrl(null);
      console.error(error);
    }
  }

  return(
    <>
      <div>
        <form onSubmit={onSubmit}>
          <img src={fileUrl} className={`image-preview ${fileUrl && "image-preview-show"}`}/>
          <Progressbar progress={progress}/>
          <div className="file-droper">
            {fileName}
            <input id="image" type="file" accept='image/*' onChange={FileInputHandler}/>
          </div>
          <button type="submit" style={{width:"100%", borderRadius: 10, cursor:"pointer"}}>upload</button>
        </form>
      </div>

      <div className='App'>
        <header className='App-header'>
          <Row>
            <Col>
              <h1>File Upload</h1>
            </Col>
          </Row>
        </header>
        <div className='App-body'>
          <Row>
            <Col>
              { showAlert?
                <Alert color="primary">업로드 진행률 : {progress}%</Alert>
                : 
                <Alert color="primary">파일을 선택해 주세요.</Alert> 
              }
            </Col>
          </Row>
          <Row>
            <Col>
              <Input color="primary" type="file" accept="image/*" onChange={FileInputHandler}/>
              {file?(
                <Button color="primary" onClick={() => uploadFile(file)}> Upload to S3</Button>
              ) : null }
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}



export default S3upload
//export default withStyles(styles)(FileUpload)