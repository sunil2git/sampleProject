const request = require('request');
const http = require('http');
var fs = require("fs");
var path = require('path');


// load express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.get('/SSRS', (req , res) => {  
console.log('SSRS service is running: ');

     var XLSX = require('xlsx')
var workbook = XLSX.readFile('/home/sunilkumar/Documents/SSRS/Agora_SSRP_Samples.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[2]]);
console.log(xlData[0]);

});  




app.listen(7171, () => {
     console.log( " SFTP sever is  running...")
 })