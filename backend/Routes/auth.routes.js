const express = require("express")
const router = express.Router()
const authmiddleware = require("../Middlewares/zodval.middleware")
const {Registervalidation,Loginvalidation} = require("../Validation/auth.validation")
const userVerify =  require("../Middlewares/verifyUser.middleware")
const AuthContoller = require("../Controllers/auth.controller")



router.post("/signup",authmiddleware(Registervalidation),AuthContoller.signupController)

router.post("/login",authmiddleware(Loginvalidation),AuthContoller.loginContoller)

router.post("/logout",AuthContoller.logoutController)

router.get("/me",userVerify,AuthContoller.protectmeController)

router.post("/forgetPassword",AuthContoller.forgetpassController)

router.post("/reset-password/:token",AuthContoller.resetPassController)

module.exports = router