const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
var fs = require("fs");
var path = require('path');
const Json2csvParser = require("json2csv").Parser;
const loader = require("bookshelf-loader");



const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '192.168.0.108',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
})

console.log("dbQuery.getTransactions : \n\n",dbQuery.getTransactions())


const data = (request, response) => {
    pool.query('select * from transaction where amount = 6000', (error, results) => {
      if (error) {
        throw error
      }
      //response.status(200).json(results.rows)
     console.log(results.rows)
      // fs.writeFileSync("/home/sunilkumar/Documents/onlineBook/sampleProject/SFTP/destination/test1.csv",results.rows, function(err) {
      //   if (err) throw err;
      //   console.log("CSV Data saved");
      // });

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
      console.log("\n\n\n csvContent : ",)
      console.log(csvContent)
      console.log('');
      

    })
  }

  app.get('/data', data)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
    console.log("dbQuery.getTransactions : \n\n",dbQuery.getTransactions)
    

  })

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })