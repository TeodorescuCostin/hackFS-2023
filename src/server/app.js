const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors")

const apiRouter = require("./routes/api");
const fileUpload = require("express-fileupload");
const dbCommunication = require("./src/dbCommunication")

const app = express();
app.use(cors());
app.use(fileUpload())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// mount our api router here
app.use("/api", apiRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

app.post('/api/send', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  // Access the uploaded file using req.files.file
  const uploadedFile = req.files.file;
  console.log(uploadedFile);
  let path = dbCommunication.sendFile(uploadedFile, res);
  // Process the file or save its information to a database

  return path;
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  console.log("req.path", req.path);
  res.sendFile(path.join(__dirname + "../client/build/index.html"));
});



module.exports = app;
