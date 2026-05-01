const express = require("express")
const router = express.Router()
const sessionController = require("../Controllers/session.controller")
const userVerify  = require("../Middlewares/verifyUser.middleware")

router.post("/create",userVerify,sessionController.createSession)


router.get("/:batchId",sessionController.getSessionBatch)
module.exports = router