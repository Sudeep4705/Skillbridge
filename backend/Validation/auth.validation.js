const z = require("zod")
const Registervalidation = z.object({
    firstname:z.string().
    regex(/^[a-zA-Z]{2,30}$/,"Invalid firstname"),
    lastname:z.string().
    regex(/^[a-zA-Z]{2,30}$/,"Invalid lastname"),
    email: z.string().email("Invalid email format").lowercase().trim(),
    password:z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/, "Must include uppercase, lowercase, and number"),
        role: z.enum([
  "Student",
  "Trainer",
  "Institution",
  "Programme Manager",
  "Monitoring Officer"
], {
  errorMap: () => ({ message: "Invalid role selected" })
})})
  
const Loginvalidation = z.object({
    email: z.string().email("Invalid email format").lowercase().trim(),
    password:z.string()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,20}$/, "Must include uppercase, lowercase, and number")
})


module.exports ={Registervalidation,Loginvalidation}