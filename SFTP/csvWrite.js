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
    
    
    const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.108',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})
     res.send(" SFTP Module running ......")

     const textData = "Check Data "

     
 
 
     fs.writeFileSync("/home/sunilkumar/Documents/onlineBook/sampleProject/SFTP/destination/test1.csv",textData, function(err) {
        if (err) throw err;
        console.log("CSV Data saved");
      });


});  




app.listen(2121, () => {
     console.log( " SFTP sever is  running...")
 })