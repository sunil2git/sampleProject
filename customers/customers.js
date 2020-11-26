const express = require("express")
const app = express()
const bodyParser = require("body-parser");
app.use(bodyParser.json());



// load mongoose
// load bookModel.js and mode customer model to save, update and delete the book model data.
const mongoose = require("mongoose")

require("./customersModel")
const Customers = mongoose.model("Customers")

mongoose.connect("mongodb+srv://userBnt:bnt123@cluster0.9rvhd.mongodb.net/test?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, () => {
    console.log("Database Connected : ")
})


app.get('/', (req , res) => { 
    res.send(" Customers Module running ......")
});


app.post("/customers",(req,res)=> {

    var newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }
    var customers = new Customers(newCustomer)
    //console.log(orders)
    res.send("Save !")
    console.log("============")
    console.log(newCustomer)


    customers.save().then(()=> {
        console.log("new Customer created !")
     }).catch((err) =>{
        if(err){  
            throw err;
        }
    })
});

app.get("/customers_list",(req,res)=>{
    Customers.find().then((Customers) =>{
       res.json(Customers)
   }).catch(err =>{
       if(err){
           throw err;
       }
})
  

});

app.get("/customer/:id", (req,res) => {

    Customers.findById(req.params.id).then((customer) => {
        if(customer){
            res.json(customer)            
        }else{
            res.sendStatus(404)
        }        
    })
});

app.delete("/customer/:id",(req,res) => {
    Customers.findOneAndRemove(req.params.id).then(() =>{
        res.send("Customer deleted")
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
});



app.listen("1212",() =>{
    console.log("customer server is running")
})