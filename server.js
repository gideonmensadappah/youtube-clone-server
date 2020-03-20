require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

const Users = require("./routes/Users");
const Videos = require("./routes/Videos");
const Comments = require("./routes/comments");
app.use("/users", Users);
app.use("/videos", Videos);
app.use("/comments", Comments);
app.get("/", (req, res) => {
  res.send("start");
});

app.listen(port, () => console.log(`on port ${port}...`));
