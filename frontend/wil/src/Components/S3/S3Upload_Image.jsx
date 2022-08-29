// import React from 'react'

// const S3Upload_Image = () => {

//     const express = require('express');
//     const multer = require('multer');
//     const { v4: uuid } = require("uuid")
//     console.log('uuid: ', uuid());
//     const mime = require("mime-types");
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => cb(null, "./uploads"),
//         filename: (req, file, cb) => cb(null, `${uuid()}.${mime.extension(file.mimetype)}`) 
//     })
//     const upload = multer({ storage, 
//                             fileFilter: (req, file, cb) => {
//                                 if(file.mimetype===["image/jpeg", "image/png", "image/jpg", "image/gef"].includes(file.mimetype)) cb(null, true)
//                                 cb(new Error("invalid file type."), false);
//                             },
//                             limits:{
//                                 fileSize: 1024 * 1024 * 5, //파일 크기 제한
//                             }
//                         });
    
    
//     const app = express();
//     const PORT = 3000;
    
//     app.use("/uploads", express.static("uploads"));

//     app.post('/upload', upload.single("image"), (req, res) => {
//         console.log("/upload called!"); 
//         console.log(req.file);
//         res.json(req.file);
//     })
//     app.listen(PORT, () => console.log("Express server Listening on PORT " + PORT));


//   return (
//     <div>S3Upload_Image</div>
//   )
// }

// export default S3Upload_Image