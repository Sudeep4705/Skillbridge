require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const cookieParser=require("cookie-parser")
const authRoutes = require("./Routes/auth.routes")
const batchRoutes =require("./Routes/batch.routes")
const sessionRoutes = require("./Routes/session.routes")
const attendanceRoutes = require("./Routes/attendance.routes")
const cors = require("cors")
const app =  express()

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const DB = async () => {
  if (!process.env.MONGO_URL) {
    console.log("No MongoDB URL provided");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DATABASE CONNECTED");
  } catch (err) {
    console.log(err);
  }
};
DB()

// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({origin:"http://localhost:5173",credentials:true}))

// routes
app.use("/auth",authRoutes)
app.use("/batch",batchRoutes)
app.use("/session",sessionRoutes)
app.use("/attendance",attendanceRoutes)


// server
app.listen(process.env.PORT,()=>{
    console.log(`SERVER LISTENING ON PORT ${process.env.PORT}`);   
})