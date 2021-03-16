
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
var fs = require("fs");
var path = require('path');
const Json2csvParser = require("json2csv").Parser;





function getTransactions(request,response)  {

  const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.108',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})


pool.query('select * from transaction where amount = 6000', (error, results) => {
  if (error) {
    throw error
  }
 
  const jsonData = JSON.parse(JSON.stringify(results.rows));
  const json2csvParser = new Json2csvParser();

  var csv = json2csvParser.parse(jsonData);

  // remove header
  var removeHeader = csv.toString().split("\n");
  removeHeader.shift();
  var csvContent = removeHeader.join("\n");

  // remove quotes
  csvContent = csvContent.toString().split('"').join('');
 
  // CSV file formating:
  const hdr = "HDR,,,,,,,,,,,,,,,,," + "\n";
  var sum = 16000;
  var row = 0;
  
 const rowCount1 =  pool.query("select sum(amount) from transaction where immediate_origin = 'test2'", (error, rowValue) => {
    if (error) {
      throw error
    }


    const jsonData = JSON.parse(JSON.stringify(rowValue.rows));
    const json2csvParser = new Json2csvParser();

    var csv = json2csvParser.parse(jsonData);

    // remove header
    var removeHeader = csv.toString().split("\n");
    removeHeader.shift();
    var csvContent = removeHeader.join("\n");

    // remove quotes
    csvContent = csvContent.toString().split('"').join('');

    console.log("rowValue : ",csvContent)

    return csvContent
})

var rowCount = rowCount1 + 2;
  const trl = "\n" + `TRL,${sum},${rowCount1},${rowCount}` + ",,,,,,,,,,,,,,";

  csvContent = hdr + csvContent + trl;
 return csvContent

})

}

module.exports = {
    getTransactions
  };


  console.log("getTransactions : ",getTransactions)