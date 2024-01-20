const mongoose = require("mongoose")

const CommentsSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"user"
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post"
    },
    text:{
        type:String,
    }
})

module.exports = mongoose.model("Comments",CommentsSchema)