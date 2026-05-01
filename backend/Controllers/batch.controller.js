const Batch = require("../Model/batch.model");
module.exports.createBatch = async (req, res) => {
  try {
    let role = req.user.role;
    let userId = req.user._id;
    let data = req.body;

    if (role !== "Trainer" && role !== "Institution") {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    const batch = new Batch({
      batchName: data.batchName,
      courseName: data.courseName,
      level: data.level,
      capacity: data.capacity,
      startDate: data.startDate,
      endDate: data.endDate,
      schedule: data.schedule,
      trainerIds: [],
      studentIds: [],
    });

    if (role == "Trainer") {
      batch.trainerIds.push(userId);
    }

    if (role == "Institution") {
      batch.institutionId = userId;
    }

    await batch.save();
    return res.status(201).json({
      message: "Batch created successfully",
      batch,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.myBatches = async (req, res) => {
  try {
    let userId = req.user._id;
    console.log(userId);
    
    let role = req.user.role;

    let batches = [];
    if (role === "Institution") {
     batches = await Batch.find({})
    }

    if (role === "Trainer") {
      batches = await Batch.find({ trainerIds: userId });
    }

    if (role === "Student") {
      batches = await Batch.find({ studentIds: userId });
    }
    if (role === "Programme Manager" || role === "Monitoring Officer") {
  batches = await Batch.find({});
}
    res.json(batches);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




module.exports.addStudentToBatch = async (req, res) => {
  try {
    const { batchId, studentId } = req.body;

    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    if (batch.studentIds.includes(studentId)) {
      return res.status(400).json({ message: "Student already added" });
    }

    batch.studentIds.push(studentId);
    await batch.save();

    return res.json({ message: "Student added to batch" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};