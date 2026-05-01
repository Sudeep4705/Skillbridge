const User = require("../Model/auth.model")

module.exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" })
      .select("firstname email"); // only needed fields

    return res.status(200).json(students);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};