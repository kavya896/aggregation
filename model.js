const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    list:{type:Array}, 
    token:{type:String},  
    createdOn:{
        type:Date,
        default:Date.now()
    }
})

const List = mongoose.model("List",schema)

module.exports= List