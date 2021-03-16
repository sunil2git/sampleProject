    const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const ssh2Client = require('ssh2').Client;
var fs = require("fs");



const port = 3131;

//app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => { // destination
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
       // cb(null, Date.now() + path.extname(file.originalname)); // source
        var fileName = "temp"
        cb(null, fileName +path.extname(file.originalname)); // source

    }
});

const upload = multer({ storage: storage });


app.post('/upload', (req, res, next) => {
    var upload = multer({
		storage: storage
    }).single('file')
    
	upload(req, res, function(err) {
        var connSettings = {
            host: 's-7b030956b95d4e258.server.transfer.us-east-1.amazonaws.com',
            port: 22, // Normal is 22 port
            username: 'sftpuser',
            //password: 'myPassword'
            privateKey: require('fs').readFileSync('/home/sunilkumar/Downloads/sftp-private-key.ppk')
            // You can use a key file too, read the ssh2 documentation
       };

       var remotePathToList = '/agtest';
       var conn = new ssh2Client();

       conn.on('ready', function() {
            conn.sftp(function(err, sftp) {
                  if (err) throw err;
        
                  var readStream = fs.createReadStream('uploads/temp.txt');
                  var writeStream = sftp.createWriteStream("/agtest/abc.txt");
        
                  writeStream.on('close',function () {
                      console.log( "File transferred succesfully... " );
                      //console.log( "sftp connection closed..." );
                     // conn.close();
                     
                  });
        
                  writeStream.on('end', function () {
                      console.log( "sftp connection closed..." );
                      conn.end();
                    });
        
                  // initiate transfer of file
                  readStream.pipe( writeStream );

              });
          }).connect(connSettings);



		res.send('File is uploaded')
	})
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));
