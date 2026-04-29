const Session = require("../Model/session.model")

module.exports.createSession = async(req,res)=>{
    try{
    let data  = req.body
    let role = req.user.role
    let trainerId = req.user._id

    if(role !== "Trainer"){
        return res.status(403).json({message:"Only Trainer can create session"})
    }

    const session = new Session({
        batchId:data.batchId,
        title:data.title,
        date:data.date,
        startTime:data.startTime,
        endTime:data.endTime,
        trainerId:trainerId
    })

    await session.save()
    res.status(201).json({message:"Session created successfully"})
    }
    catch(error){
        console.log(error);
        
    }
}   