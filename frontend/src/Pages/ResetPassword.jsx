import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import '@fontsource/inter'

export default function ResetPassword() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { token } = useParams();

  const password = watch("password")

  const formsubmit = async (data)=>{
    try {
      let res = await axios.post(`http://localhost:8007/auth/reset-password/${token}`, { password: data.password }, { withCredentials: true })
      toast.success(res.data.message)
      navigate("/login")
    } catch(error) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div
      className="min-h-screen flex justify-center items-center px-4"
      style={{ backgroundColor: '#fde8e0', fontFamily: "'Inter', sans-serif" }}
    >
      <div className="bg-white w-full max-w-xl rounded-3xl py-10 px-6 md:px-16 shadow-sm">
        
        {/* illustration */}
        <div className="flex flex-col justify-center items-center mb-6">
          <img
            src="/reset.svg"
            alt="resetpassword"
            className="w-32 h-32 mb-5"
          />
          <h1 className="font-bold text-2xl text-gray-900">Reset Password</h1>
          <p className="text-gray-400 text-sm mt-1">Please kindly set your new password</p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit(formsubmit)} className="flex flex-col gap-4">

          {/* new password */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Enter your new password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Min 8 chars, uppercase, lowercase, number and special character"
                }
              })}
              className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
            />
            {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
          </div>

          {/* confirm password */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              placeholder="Confirm your new password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) => value === password || "Passwords do not match"
              })}
              className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs">{errors.confirmPassword.message}</p>}
          </div>

          {/* submit */}
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium py-3 rounded-full transition mt-2"
          >
            Confirm
          </button>

          {/* back to login */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-gray-500 text-sm flex items-center justify-center gap-1 hover:text-gray-700 transition"
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}