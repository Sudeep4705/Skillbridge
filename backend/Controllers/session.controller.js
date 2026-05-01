const Session = require("../Model/session.model")

module.exports.createSession = async(req,res)=>{
    try{
    let data  = req.body
    console.log(data);
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
    res.status(201).json({message:"Session created successfully"},session)
    }
    catch(error){
    res.status(500).json({message:error.message}) 
    }
}   


module.exports.getSessionBatch = async(req,res)=>{
    try{
        console.log(req.params.batchId);
 const sessions = await Session.find({batchId:req.params.batchId})
        return res.json(sessions)
    }
    catch(error){
return res.status(400).json({message:error.message})
    }
}