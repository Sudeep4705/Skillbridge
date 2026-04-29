const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sessionSchema = new Schema ({
    batchId:{
        type:Schema.Types.ObjectId,
        ref:"Batch"
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    startTime:{
        type:String,
        required:true
    },
    endTime:{
        type:String,
        required:true
    },
    trainerId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["active","closed"],
        default:"active"
    }
},{timestamps:true})

module.exports = mongoose.model("Session",sessionSchema)