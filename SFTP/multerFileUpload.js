const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const ssh2Client = require('ssh2').Client;
var fs = require("fs");



const port = 3131;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => { // destination
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        var fileName = "temp"
        cb(null, fileName +path.extname(file.originalname)); // source

        //cb(null, Date.now() + path.extname(file.originalname)); // source
       // cb(null, file.originalname); // destination

    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage });

//const upload = multer({ storage: storage }).single("file");

//Upload route
//upload.single('file'),
app.post('/upload',upload.single('file'), (req, res, next) => {
    try {
        console.log(req.body);

        return res.status(201).json({
            message: 'File uploded successfully'
        });
    }// return part
     catch (error) {
        console.error(error);
    }
});

// app.post('/upload', (req, res, next) => {
//     var upload = multer({
// 		storage: storage
// 	}).single('image')
// 	upload(req, res, function(err) {
// 		res.end('File is uploaded')
// 	})
// });

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
