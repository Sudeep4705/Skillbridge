
const Attendance =  require("../Model/attendance.model")
const Session = require("../Model/session.model")

module.exports.markAttendance = async(req,res)=>{
    try{
    const {sessionId,batchId} = req.body
    const role = req.user.role
    console.log(role);
    
    const studentId = req.user._id
    if(role!="Student"){
       return res.status(403).json({message:"Student can only mark the attendance"})
    }
    if(!sessionId || !batchId){
        return res.status(403).json({message:"sessionId and batchId is required"})
    }
    const session = await Session.findById(sessionId)
    if(!session){
        return res.status(403).json({message:"Session not found"})
    }
    const stdAttendance = new Attendance({
        sessionId,
        batchId,
        studentId,
        status:"present"
    })
    await stdAttendance.save()
    return res.status(201).json({message:"Attendance marked successfully",stdAttendance})
    }catch(error){
        if(error.code === 11000){
            return res.status(400).json({message:"Attendance already marked for this session"})
        }
        return res.status(401).json({message:error.message})
    }
}

module.exports.getAttendance = async(req,res)=>{
    try{
    const {sessionId} = req.params
    const attendanceData  =  await Attendance.find({sessionId}).populate("studentId","firstname lastname email")
     return res.status(200).json(attendanceData)
    }
    catch(error){
        return res.status(400).json({message:error.message})
    }
}