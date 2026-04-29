const nodemailer = require("nodemailer")

const sendEmail = async({to,subject,html})=>{
const  transporter = nodemailer.createTransport({
    host:"smtp.resend.com",
    port:465,
    secure:true,
    auth:{
        user:"resend",
        pass:process.env.RESEND_API_KEY
    }
})

await transporter.sendMail({
    from:"onboarding@resend.dev",
    to,
    subject,
    html
})
console.log("email sent successfully")
}

module.exports = sendEmail