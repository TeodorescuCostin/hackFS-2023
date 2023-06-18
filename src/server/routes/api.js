const express = require("express");
const router = express.Router();
const path = require("path");
const dbComm = require("../src/dbCommunication");
const cors = require("cors");
const multer = require('multer')



/*router.post('/send',  (req, res) =>{
  var file = req.body;
  for(var i in req.body)
    file = i
  console.log(file.prototype);
  console.log(file)
  dbComm.sendFile(file);
  //res.send(file);
  console.log('File received');
});
*/


router.get('/script', (req, res) => {
  const filePath = path.join(__dirname, 'resources', 'script.js');
  res.setHeader('Content-Type', 'text/javascript');
  res.sendFile(filePath);
});



module.exports = router;
