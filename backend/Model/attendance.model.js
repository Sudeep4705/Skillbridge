const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema({
  sessionId: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    required:true
  },
  batchId:{
    type: Schema.Types.ObjectId,
    ref: "Batch",
    required:true
  },
  studentId:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status:{
    type: String,
    enum: ["present", "absent"],
    default:"present"
  },
},
{timestamps:true});

attendanceSchema.index({sessionId:1,studentId:1},{unique:true})

module.exports = mongoose.model("Attendance", attendanceSchema);
