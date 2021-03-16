const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
var sftpStorage = require('multer-sftp')
const ssh2Client = require('ssh2').Client;
var fs = require("fs");



const port = 3131;

//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


console.log("#### connection #####",connSettings)
var storage = sftpStorage({
    sftp: {
      host: 's-7b030956b95d4e258.server.transfer.us-east-1.amazonaws.com',
      port: 22,
      username: 'sftpuser',
      password: 'myPassword',
      privateKey: require('fs').readFileSync('/home/sunilkumar/Downloads/sftp-private-key.ppk')
    },
    destination: function (req, file, cb) {
      cb(null, '/agtest/dummyfile.txt')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  const upload = multer({ storage: storage })
  upload.single('image');
//const upload = multer({ storage: storage }).single("file");

//Upload route
//upload.single('image'),
app.post('/upload',  upload.single('image'),(req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    }// return part
     catch (error) {
         console.log(error)
        console.error(error);
    }
});

// app.post('/upload', upload.single('image'), (req, res, next) => {
    
//     upload(req, res, function(err) {
// 		res.end('File is uploaded')
// 	})
// });

// app.post('/upload', function(req, res) {
// 	var upload = multer({
// 		storage: storage
// 	}).single('image')
// 	upload(req, res, function(err) {
// 		res.end('File is uploaded')
// 	})
// })


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
