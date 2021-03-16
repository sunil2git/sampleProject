const mongoose = require("mongoose")

mongoose.model("Books",{

    
    title:{
        type: String,
        require: true
    },
    author: {
        type:String,
        require: true
    },
    numberOfPage: {
        type:Number,
        require: false
    },
    publisher: {
        type:String,
        require: true
    }

});
