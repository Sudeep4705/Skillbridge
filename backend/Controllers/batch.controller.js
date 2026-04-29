const Batch = require("../Model/batch.model")
module.exports.createBatch = async(req,res)=>{
    try{
        let role = req.user.role;
        let userId = req.user._id;
        let data = req.body;

        if(role!=="Trainer" && role!=="Institution"){
            return res.status(403).json({
                message:"Access denied"
            });
        }
        const batch = new Batch({
            batchName:data.batchName,
            courseName:data.courseName,
            level:data.level,
            capacity:data.capacity,
            startDate:data.startDate,
            endDate:data.endDate,
            schedule:data.schedule,
        }) 

        if(role=="Trainer"){
            batch.trainerIds.push(userId)
        }

        if(role=="Institution"){
            batch.institutionId = userId
        }

        await batch.save()
          return res.status(201).json({
      message: "Batch created successfully",
      batch
    });
    }
    catch(error){
   return res.status(500).json({message:error.message});
    }  
}   


module.exports.myBatches = async(req,res)=>{
    try{
          let userId = req.user._id
    let institutionData = await Batch.find({institutionId:userId})
    res.json(institutionData)
    }
    catch(error){
        return res.status(500).json({message:error.message})
    }  
}