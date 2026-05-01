const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../Model/auth.model")
const crypto = require("crypto")    
const sendEmail = require("../Utils/sendEmail")

module.exports.signupController =async(req,res)=>{
    try{
        let {firstname,lastname,email,password,role} =  req.body
    if(!firstname || !lastname || !email || !password || !role)
        return res.status(400).json({message:"Please fill the all fields"})
    let checkemail =await User.findOne({email})
    if(checkemail)
        return res.status(400).json({message:"Email already exist"})
    const hashed =  await bcrypt.hash(password,10)
    const newUser = new User({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashed,
        role:role
    })
    await newUser.save()
    const token  = jwt.sign({userId:newUser._id},process.env.SECRET,{expiresIn:"5h"})
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV == "production",
        sameSite:process.env.NODE_ENV == "production" ? "none" : "strict",
        maxAge:5*60*60*1000
    })
    return res.status(201).json({message:"Signup Successfull", user: { 
    id: newUser._id,
    email: newUser.email,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    role:newUser.role
    }})
    }
    catch(error){
        res.status(400).json({message:"internal server error"})
    }
          
}

module.exports.loginContoller = async(req,res)=>{
    try{
          let {email,password} = req.body
    let checkemail = await User.findOne({email})
    if(!checkemail)
        return res.status(401).json({message:"Invalid email or password"})
    let isMatch = await bcrypt.compare(password,checkemail.password)
    if(!isMatch)
        return res.status(401).json({message:"Invalid email or password"})
     const token  = jwt.sign({userId:checkemail._id},process.env.SECRET,{expiresIn:"5h"})
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV == "production",
        sameSite:process.env.NODE_ENV == "production" ? "none" : "strict",
        maxAge:5*60*60*1000
    })
    return res.status(200).json({message:"login Successfull", user: { 
        id: checkemail._id,
        email: checkemail.email,
        firstname: checkemail.firstname,
        lastname: checkemail.lastname,
        role:checkemail.role
    }})
    }  
    catch(error){
        return res.status(500).json({message:"internal server error"})
    } 
}


module.exports.logoutController  = (req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:process.env.NODE_ENV == "production",
        sameSite:process.env.NODE_ENV=="production" ? "none" : "strict"
    })
    return res.status(200).json({message:"Logout successfully"})
}

module.exports.protectmeController = (req,res)=>{
    return res.status(200).json({user:req.user})
}


module.exports.forgetpassController = async(req,res)=>{
    try{
        let {email} = req.body 
        let checkuser = await User.findOne({email})
        if(checkuser){
            const token =  crypto.randomBytes(32).toString("hex")
        const hashed = crypto.createHash("sha256").update(token).digest("hex")
        const futureTime = new Date(Date.now()+10*60*1000)
        checkuser.resetPasswordToken = hashed;
        checkuser.resetPasswordExpires = futureTime
        await checkuser.save() 
        const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`
        await sendEmail({
            to:checkuser.email,
            subject:"Password reset request",
            html:`
           <h2>Reset Your Password</h2>
            <p>Click the link below to reset your password. This link expires in 10 minutes.</p>
            <a href="${resetURL}">${resetURL}</a>
            <p>If you didn't request this, ignore this email.</p>
            `
        })
        }
        return res.status(200).json({message:"if email exist reset link will be send to the email"})
    }catch(error){
       return res.status(500).json({message:"internal server error"})
    }      
}

module.exports.resetPassController = async(req,res)=>{
    try{
        let token = req.params.token 
       let hashed = crypto.createHash("sha256").update(token).digest("hex")
       let finduser = await User.findOne({resetPasswordToken:hashed,resetPasswordExpires:{$gt:Date.now()}})
            if(!finduser){
                return res.status(400).json({message:"Invalid or expired token"})
            }
             let { password } = req.body
             const salt = await  bcrypt.genSalt(10)
             const hashedPassword = await bcrypt.hash(password,salt)
             finduser.password = hashedPassword
             finduser.resetPasswordExpires=undefined,
             finduser.resetPasswordToken= undefined
             await finduser.save()
             return res.status(200).json({message:"Password reset successfull"})
    }
    catch(error){
       return res.status(500).json({message:"internal server error"})
    }        
}

