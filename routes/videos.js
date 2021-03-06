const express = require("express");
const cors = require("cors");
const videos = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const queryString = require("querystring");
const Video = require("../modules/Video");
videos.use(cors());

videos.get("/:search?", (req, res) => {
  const query = queryString.encode(req.query);
  // res.send(query);
  const q = queryString.parse(query);
  // console.log(q.query);

  Video.findAll({
    where: { title: q.query },
    attributes: ["title", "id", "source"],
    $or: [
      {
        title: {
          $like: q.query
        }
      }
    ]
  })
    .then(result => res.send(result))
    .catch(err => res.send(err));
});

// Add video to the dataBase
videos.post("/add/video", (req, res) => {
  console.log("add video ..");

  // video Data
  const today = new Date();
  const videoData = {
    title: req.body.title,
    vId: req.body.video,
    uploader_id: req.body.uploader_id,
    uploadDate: today
  };

  Video.create({
    title: videoData.title,
    source: videoData.vId,
    uploader_id: videoData.uploader_id,
    uploadDate: today
  })
    .then(video => {
      res.status(200).send({ video: video });
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
});

// Get All the Videos from the dataBase
videos.get("/all/videos", (req, res) => {
  console.log("get all videos... route");
  Video.findAll({
    attributes: ["source", "title", "id"]
  })
    .then(videos => {
      res.status(200).send({ videos });
    })
    .catch(err => {
      res.status(400).send({ error: err });
    });
});

//TODO
//Get video by ID
videos.get("/myVideos/:userId", (req, res) => {
  // console.log('get video with this id ' + req.params.userId)
  const uploader_id = req.params.userId;
  Video.findAll({
    where: {
      uploader_id: uploader_id
    },
    attributes: ["source", "title", "id"]
  })
    .then(video => {
      res.status(200).send({ video });
    })
    .catch(error => {
      res.status(400).send({ error });
    });
});

// Delete All Videos
videos.delete("/all/videos", (req, res) => {});

//Delete spacific video
videos.delete("/video/:id", (req, res) => {
  console.log("delete video where id is " + req.params.id);
});

module.exports = videos;
