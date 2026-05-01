const express = require("express")
const router = express.Router()
const userController = require("../Controllers/user.controller")

router.get("/students",userController.getAllStudents);


module.exports = router