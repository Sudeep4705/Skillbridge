const express = require("express")
const router = express.Router()
const attendanceController= require("../Controllers/attendance.controller")
const userVerify =  require("../Middlewares/verifyUser.middleware")

router.post("/mark",userVerify,attendanceController.markAttendance)
router.get("/:sessionId",attendanceController.getAttendance)

module.exports = router