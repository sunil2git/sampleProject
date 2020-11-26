// load express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const axios = require("axios")

app.use(bodyParser.json());

const mongoose = require("mongoose")

require("./ordersModel")
const Orders = mongoose.model("Orders")

mongoose.connect("mongodb+srv://userBnt:bnt123@cluster0.9rvhd.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log("Database Connected : ")
})

app.get('/', (req , res) => { 
    res.send(" Orders Module running ......")
});


app.post("/orders",(req,res)=> {

    var newOrder = {
        customerId: mongoose.Types.ObjectId(req.body.customerId),
        bookId: mongoose.Types.ObjectId(req.body.bookId),
        initialDate: req.body.initialDate,
        deliveryDate: req.body.deliveryDate  
    }   
    var orders = new Orders(newOrder)
    //console.log(orders)
    console.log("============")
    console.log(newOrder)


    orders.save().then(()=> {
        console.log("new Orders created !")
        res.send("Save !")

     }).catch((err) =>{
        if(err){  
            throw err;
        }
    })
});

app.get("/order/:id",(req,res) =>{
    Orders.findById(req.params.id).then((order) =>{
        if(order){
            axios.get("http://localhost:1212/customer/" + order.customerId).then((response)=> {

             var orderData = {customerName: response.data.name, bookTitle: ''}
             axios.get("http://localhost:1111/book/" + order.bookId).then((response) =>{
                 
                orderData.bookTitle = response.data.title
                res.json(orderData)
             })
        })
        }
        else {
            res.send("invalid order")
        }

    })
})


app.listen(1313, () => {
    console.log( " Orders sever is  running...")
})