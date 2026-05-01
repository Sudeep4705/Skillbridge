const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = new Schema({
    batchName:{
        type:String,
        required:true,
        trim:true
    },
    courseName:{
        type:String,
        required:true,
        trim:true
    },
    level:{
        type:String,
        required:true,
        enum:["Beginner", "Intermediate", "Advanced"]
    },
    capacity:{
        type:Number,
        required:true,
        min:1
    },
    startDate:{
        type:Date,
        required:true,
    },
    endDate:{
        type:Date
    },
    schedule:{
        type:String,
        enum:["Morning", "Evening", "Weekend"],
         required:true,
    },
    institutionId:{
     type:Schema.Types.ObjectId,
     ref:"User"
    },
    trainerIds:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    studentIds:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
 
},{timestamps:true})

module.exports = mongoose.model("Batch",batchSchema)