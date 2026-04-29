const express = require("express")
const router = express.Router()
const sessionController = require("../Controllers/session.controller")


router.post("/create",sessionController.createSession)



module.exports = router