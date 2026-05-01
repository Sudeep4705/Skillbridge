import axios from "axios"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import {  useContext, useState } from "react";
import toast from "react-hot-toast"
import { Eye,EyeOff } from 'lucide-react';
import '@fontsource/inter'

export default function Login(){
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm(); 
  const { setUser } = useContext(AuthContext)
  const [eye,seteye] = useState(false)
  const [role,setrole] = useState("")

const formsubmit = async(data)=>{
    try {
      let res = await axios.post("http://localhost:8007/auth/login", data, { withCredentials: true })
      setUser(res.data.user)
     const userRole = res.data.user.role;
    setUser(res.data.user);
    setrole(userRole);

    toast.success(res.data.message);
      navigate("/dashboard")
   

  }
     catch(error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
}   


return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fde8e0', fontFamily: "'Inter', sans-serif" }}>
      {/* big white card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm px-6 py-8 md:px-16 md:py-10 my-8">
        {/* top nav */}
        <div className="flex justify-between items-center mb-12">
          <p className="hidden md:block text-sm text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-orange-500 cursor-pointer font-medium hover:text-orange-400 transition"
            >
              Register Now
            </span>
          </p>
        </div>

        {/* center content */}
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">

          {/* toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="text-gray-400 px-6 py-2 rounded-full text-sm transition hover:text-gray-600"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium transition"
            >
              Login
            </button>
          </div>

          {/* heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-8">Sign in to your account</p>

          {/* form */}
          <form onSubmit={handleSubmit(formsubmit)} className="flex flex-col gap-4 w-full">

            {/* email */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="e.g. username@boilerplate.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Enter a valid email" }
                })}
                className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            {/* password */}
            <div className="flex flex-col gap-1 text-left relative">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-orange-500 text-xs cursor-pointer hover:text-orange-400 transition"
                >
                  Forgot password?
                </span>
              </div>
              <input
             type={eye ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
               {
                eye ? (<EyeOff onClick={()=>seteye(false)} className="absolute right-4 top-1/2 cursor-pointer text-gray-400"/>):(
                  <Eye onClick={()=>seteye(true)} className="absolute right-4 top-1/2 cursor-pointer text-gray-400"/>
                )
               }
            </div>

            {/* submit */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium py-3 rounded-full transition mt-2"
            >
              Sign in
            </button>

          </form>

          {/* mobile register link */}
          <p className="md:hidden text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")} className="text-orange-500 cursor-pointer font-medium">
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}