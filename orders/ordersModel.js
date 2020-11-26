const mongoose = require("mongoose")

mongoose.model("Orders",{
    customerId :{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    bookId:{
        type:mongoose.SchemaTypes.ObjectId,
        require:true
    },
    initialDate:{
        type: Date,
        require:true
    },
    deliveryDate:{
        type: Date,
        require:true
    }
}) 