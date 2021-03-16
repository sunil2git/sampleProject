
// load express
const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());


// load mongoose:
// load bookModel.js and mode customer model to save, update and delete the book model data.
 const mongoose = require("mongoose")

 require("./bookModel")
  const Books = mongoose.model("Books")

mongoose.connect("mongodb+srv://userBnt:bnt123@cluster0.9rvhd.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true},  {useUnifiedTopology: true },  () => {
    console.log("Database Connected : ")
})
  
app.get('/', (req , res) => { 
    res.send(" Books Module running ...")
});


app.post("/books",(req,res)=> {

    var newBooks = {
        title: req.body.title,
        author: req.body.author,
        numberOfPage: req.body.numberOfPage,
        publisher: req.body.publisher  
    }
    var books = new Books(newBooks)
    //console.log(orders)
    res.send("Save !")
    console.log("============")
    console.log(newBooks)


    books.save().then(()=> {
        console.log("new Book created !")
     }).catch((err) =>{
        if(err){  
            throw err;
        }
    })
});

app.get("/books/:id", (req,res) => {

    Books.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)            
        }else{
            res.sendStatus(404)
        }        
    })
});

app.get("/book_list",(req,res)=>{
    Books.find().then((book) =>{
       res.json(book)
   }).catch(err =>{
       if(err){
           throw err;
       }
})
    //console.log("book_List")
   // res.send("List of books")
});

app.get("/books/:id", (req,res) => {

    Books.findById(req.params.id).then((book) => {
        if(book){
            res.json(book)            
        }else{
            res.sendStatus(404)
        }        
    })
});

app.delete("/book/:id",(req,res) => {
    Books.findOneAndRemove(req.params.id).then(() =>{
        res.send("Books deleted")
    }).catch(err =>{
        if(err){
            throw err;
        }
    })
});

app.listen(1111, () => {
    console.log( " Books sever is  running...")
})