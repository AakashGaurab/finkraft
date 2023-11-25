const express = require("express");
const fileUpload = express.Router();
const {auth} = require("../middleware/authenticate");   // authentication
const AWS = require('aws-sdk');         // aws module to upload file
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require("fs");
const {log,deleteLogger} = require("../middleware/logFileName");   // to log file upload to database
require("dotenv").config();
const db = require("../models");

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'ap-south-1'
});

const s3 = new AWS.S3();



fileUpload.get('/', auth,async (req, res) => {
    // const params = {
    //   Bucket: 'uploadaws123',
    // };

    // s3.listObjects(params, (err, data) => {
    //   if (err) {
    //     console.log("Error getting data: ", err);
    //     res.status(500).json(err);
    //   } else {
    //     res.json(data);
    //   }
    // });
    try {
      const [results, metadata] = await db.sequelize.query(`select * from files where userid = "${req.body.id}"`);
      res.status(200).json(results);
    } catch (error) {
      res.status(404).json(error);
    }
});




fileUpload.post('/upload',upload.single('file'),auth,log, (req, res) => {
    const params = {
      Bucket: 'uploadaws123',
      Key: req.file.originalname,
      Body: fs.createReadStream(req.file.path)
    };

    

    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error uploading data: ", err);
        res.status(500).json("err");
      } else {
        res.json('File uploaded successfully to S3');
      }
    });
});





fileUpload.delete('/delete/:filename', deleteLogger,(req, res) => {
    const params = {
      Bucket: 'uploadaws123',
      Key: req.params.filename
    };


    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log("Error deleting data: ", err);
        res.status(500).json(err);
      } else {
        res.json('File deleted successfully from S3');
      }
    });



});







module.exports={fileUpload};
