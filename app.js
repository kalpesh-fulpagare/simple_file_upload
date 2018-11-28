const express = require('express');
const app	  = express();
const port    = 4000;
const path    = './uploaded_files';
const multer  = require('multer');
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path);
  },
  filename(req, file, callback) {
    console.log("Uploading File: ", JSON.stringify(file));
    callback(null, file.originalname);
  }
});
const upload = multer({ storage}).single('user_file');

app.listen(port, () => console.log(`Sample File Upload server listening on port ${port}!`));

app.get('/', (req, res) => res.sendFile(__dirname + "/index.html"))

app.post('/file_upload', (req, res) => {
  upload(req, res, err => {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
});
