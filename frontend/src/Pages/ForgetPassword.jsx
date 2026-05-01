import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import '@fontsource/inter'

export default function ForgetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const emailsubmit = async (data) => {
    try {
      let res = await axios.post("https://skillbridge-2kec.onrender.com/auth/forgetPassword", data, { withCredentials: true })
      toast.success(res.data.message)
    } catch(error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#fde8e0', fontFamily: "'Inter', sans-serif" }}>

      {/* big white card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm px-6 py-8 md:px-16 md:py-10 mx-4">

        {/* top nav */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">B</span>
            </div>
            <span className="font-semibold text-gray-800">Boilerplate</span>
          </div>

          {/* hidden on mobile, visible on tablet and above */}
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
        <div className="flex flex-col items-center text-center max-w-xs mx-auto">

          {/* illustration */}
          <div className="text-6xl mb-6">
            <img src="/password.svg" alt="forgot password" className="w-32 h-32 mb-6" />
          </div>

          {/* heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Forgot your password?
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Enter your email so that we can send you password reset link
          </p>

          {/* form */}
          <form onSubmit={handleSubmit(emailsubmit)} className="flex flex-col gap-4 w-full">

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

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium py-3 rounded-full transition"
            >
              Send Email
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-gray-500 text-sm flex items-center justify-center gap-1 hover:text-gray-700 transition"
            >
              ← Back to Login
            </button>

          </form>

          {/* show register link on mobile only */}
          <p className="md:hidden text-sm text-gray-500 mt-6">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-orange-500 cursor-pointer font-medium"
            >
              Register Now
            </span>
          </p>

        </div>

     

      </div>
    </div>
  );
}