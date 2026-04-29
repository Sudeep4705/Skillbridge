import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "@fontsource/inter";

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);
  const [eye, seteye] = useState(false);

  const formsubmit = async (data) => {
    try {
      let res = await axios.post("http://localhost:8007/auth/signup", data, {
        withCredentials: true,
      });
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: "#fde8e0", fontFamily: "'Inter', sans-serif" }}
    >
      {/* big white card */}
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-sm px-6 py-8 md:px-16 md:py-10 my-8">
        {/* top nav */}
        <div className="flex justify-between items-center mb-12">
          <p className="hidden md:block text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer font-medium hover:text-orange-400 transition"
            >
              Sign In
            </span>
          </p>
        </div>

        {/* center content */}
        <div className="flex flex-col items-center text-center max-w-sm mx-auto">
          {/* toggle */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-8">
            <button
              onClick={() => navigate("/register")}
              className="bg-orange-500 text-white px-6 py-2 rounded-full text-sm font-medium transition"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-gray-400 px-6 py-2 rounded-full text-sm transition hover:text-gray-600"
            >
              Login
            </button>
          </div>

          {/* heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create an account
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            Join us today, it's free!
          </p>
          
          {/* form */}
          <form
            onSubmit={handleSubmit(formsubmit)}
            className="flex flex-col gap-4 w-full"
          >
            {/* firstname and lastname */}
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstname", {
                    required: "Required",
                    pattern: {
                      value: /^[a-zA-Z]{2,30}$/,
                      message: "Invalid name",
                    },
                  })}
                  className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
                />
                {errors.firstname && (
                  <p className="text-red-400 text-xs text-left">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1 w-full">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname", {
                    required: "Required",
                    pattern: {
                      value: /^[a-zA-Z]{2,30}$/,
                      message: "Invalid name",
                    },
                  })}
                  className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
                />
                {errors.lastname && (
                  <p className="text-red-400 text-xs text-left">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
            </div>

            {/* email */}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="e.g. username@boilerplate.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
              />
              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* role*/}
            <div className="flex flex-col gap-1 text-left">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                {...register("role",{required:true})}
                className="w-full h-12 px-4 text-sm text-gray-700 border border-gray-200 rounded-full focus:outline-none focus:border-orange-400">
                <option value="">Select Role</option>
                <option value="Student">Student</option>
                <option value="Trainer">Trainer</option>
                <option value="Institution">Institution</option>
                <option value="Programme Manager">Programme Manager</option>
                <option value="Monitoring Officer">Monitoring Officer</option>
              </select>
            </div>
            {/* password */}
            <div className="flex flex-col gap-1 text-left relative">
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type={eye ? "text" : "password"}
                placeholder="Min 8 chars, uppercase, number, special"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Min 8 chars, uppercase, lowercase, number and special character",
                  },
                })}
                className="w-full  text-sm text-gray-700 p-3 border border-gray-200 rounded-full placeholder-gray-300 focus:outline-none focus:border-orange-400 transition"
              />
              {errors.password && (
                <p className="text-red-400 text-xs">
                  {errors.password.message}
                </p>
              )}
              {eye ? (
                <EyeOff
                  onClick={() => seteye(false)}
                  className="absolute right-4 top-1/2 cursor-pointer text-gray-400"
                />
              ) : (
                <Eye
                  onClick={() => seteye(true)}
                  className="absolute right-4 top-1/2 cursor-pointer text-gray-400"
                />
              )}
            </div>

            {/* submit */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-medium py-3 rounded-full transition mt-2"
            >
              Create an account
            </button>
          </form>
          {/* mobile sign in link */}
          <p className="md:hidden text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-500 cursor-pointer font-medium"
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
