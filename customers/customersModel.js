const mongoose = require("mongoose")
mongoose.model('Customers',{
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require :true
    }
})   