const express = require("express");
const cors = require("cors");
const comments = express.Router();
const Comment = require("../modules/Comment");
comments.use(cors());

// Add new post/comment
comments.post("/addComment", (req, res) => {
  const dt = new Date();
  console.log(req.body);
  const commentData = {
    video_id: req.body.video_id,
    comment: req.body.comment
  };

  Comment.create({
    video_id: commentData.video_id,
    comment: commentData.comment,
    comment_dt: dt
  })
    .then(added => res.send("sucess"))
    .catch(err => res.send(err));
});

// Select post/comment by ID
comments.get("/getComments", (req, res) => {
  const video_id = req.params.activeVidId;
  Comment.findAll({
    attributes: ["id", "comment", "video_id"]
  })
    .then(_comments => res.send(_comments))
    .catch(err => res.send(err));
});

module.exports = comments;
