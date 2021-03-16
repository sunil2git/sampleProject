const ssh2Client = require('ssh2').Client;
const request = require('request');
const http = require('http');
var fs = require("fs");
var path = require('path');


// load express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.get('/SFTP', (req , res) => {  
     res.send(" SFTP Module running ......")
 
 

var connSettings = {
     host: 's-7b030956b95d4e258.server.transfer.us-east-1.amazonaws.com',
     port: 22, // Normal is 22 port
     username: 'sftpuser',
     //password: 'myPassword'
     privateKey: require('fs').readFileSync('/home/sunilkumar/Downloads/sftp-private-key.ppk')
     // You can use a key file too, read the ssh2 documentation
};

var remotePathToList = '/agtest';

// Get list of files inside Remote path
var conn = new ssh2Client();
conn.on('ready', function() {
    conn.sftp(function(err, sftp) {
         if (err) throw err;
         // you'll be able to use sftp here
         // Use sftp to execute tasks like .unlink or chmod etc
         console.log("SFTP connection successfully aquired....  " + sftp);

         sftp.readdir(remotePathToList, function(err, list) {
           if (err) throw err;
           // List the directory in the console
           console.dir(list);
           // Do not forget to close the connection, otherwise you'll get troubles
           conn.end();
         });
     });
 }).connect(connSettings);

//Uploading to SFTP Server

//Uploading to SFTP Server
     conn.on('ready', function() {
        conn.sftp(function(err, sftp) {
              if (err) throw err;

              var readStream = fs.createReadStream('/home/sunilkumar/Documents/SSRP/nf.csv');
              var writeStream = sftp.createWriteStream("/agtest/nf.csv");``

              writeStream.on('close',function () {
                  console.log( "File transferred succesfully... " );
                  console.log( "sftp connection closed..." );
                  conn.close();
              });

              writeStream.on('end', function () {
                  console.log( "sftp connection closed..." );
                  conn.close();
              });

              // initiate transfer of file
              readStream.pipe( writeStream );
          });
      }).connect(connSettings);
 
//Downloading from SFTP Server
//   conn.on('ready', function() {
//        conn.sftp(function(err, sftp) {
//            if (err) throw err;

//            var moveFrom = "/agtest/abc.txt";
//            var moveTo = "/home/sunilkumar/Downloads/sftp/sftp.txt";

//            sftp.fastGet(moveFrom, moveTo , {}, function(downloadError){
//                if(downloadError) throw downloadError;

//                console.log("File has been succesfully downloaded");
//                conn.end();
//            });

//        });
//    }).connect(connSettings);

});  




app.listen(7777, () => {
     console.log( " SFTP sever is  running...")
 })