const express = require("express")
const router = express.Router()
const batchController = require("../Controllers/batch.controller")
const userVerify  = require("../Middlewares/verifyUser.middleware")

router.post("/create",userVerify,batchController.createBatch)
router.get("/my-batches",userVerify,batchController.myBatches)
router.post("/add-student",userVerify,batchController.addStudentToBatch)

module.exports = router