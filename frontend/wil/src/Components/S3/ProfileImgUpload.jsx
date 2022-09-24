import React, { useState } from "react";
import { toast } from "react-toastify";
import "./PostUpload.css";
import axios, { AxiosError } from "axios";

const ProfileImgUpload = () => {
    const defaultUpload = "Drag files to upload.";
    const [files, setFiles] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [fileName, setFileName] = useState(defaultUpload);
    const [clickUpload, setClickUpload] = useState(false);

    // FileInput onChange Handler
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
        };
    };

    const clickProfileImgSubmit = async (e) => {
        const formData = new FormData();

        for (let file of files) {
            // 여러 파일 전송
            formData.append("image", file);
        }

        // 프로필 이미지 등록하는 요청
        try {
            const token = localStorage.getItem("token");

            const res = await axios.patch(
                `http://localhost:8080/users/${token}`,
                formData,
                {
                    withCredentials: true // 쿠키 cors 통신 설정
                  },
                  {
                    headers: { "Access‑Control‑Allow‑Origin": "*", 
                    "Access‑Control‑Allow‑Headers": "Origin, X‑Requested‑With, Content‑Type, Accept",
                    "Access‑Control‑Allow‑Methods":"GET,PUT,POST,DELETE,OPTIONS",
                    "Access‑Control‑Allow‑Credentials":'true',
                    "Content-Type": "multipart/form-data"},
                  },
                // {
                //     headers: { "Content-Type": "multipart/form-data" },
                // }
            );
            console.log(res);
            console.log(res.data.postId);

            console.log(res);
            console.log("headers : ", res.headers);
            console.log("config : ", res.config);
            console.log("request : ", res.request);
            console.log("image upload success!");
            toast.success("success!!  이미지 업로드 성공");
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
                    {/* <input
            id="textInput"
            type="text"
            className="text-input"
            onChange={TextInputHandler}
            placeholder="Please enter your contents."
          /> */}
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
    )
}

export default ProfileImgUpload;