import "@fontsource/inter";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";

export default function Dashboard() {
  const { User, setUser } = useContext(AuthContext);
  const [batch, setbatch] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8007/auth/logout",
        {},
        { withCredentials: true },
      );
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const getBatches = async () => {
      try {
        let res = await axios.get("http://localhost:8007/batch/my-batches", {
          withCredentials: true,
        });
        setbatch(res.data);
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    getBatches();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#fde8e0", fontFamily: "'Inter', sans-serif" }}
    >
      {/* navbar */}
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">SB</span>
          </div>
          <span className="font-semibold text-gray-800">SkillBridge</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm bg-orange-500 hover:bg-orange-400 text-white px-4 py-2 rounded-full transition"
        >
          Logout
        </button>
      </div>

      {/* welcome */}
      {/* <div className="flex items-center justify-center mt-20 px-4">
        <div className="bg-white rounded-3xl p-10 text-center w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {User?.firstname}!
          </h1>
          <p className="text-gray-400 text-sm">
            You are successfully logged in.
          </p>
        </div>
      </div> */}
      <div className="flex  gap-4 p-5">
        {batch.map((data, key) => (
          <>
            <div key={key} className="p-10 bg-white rounded-xl shadow">
              <p className="text-black">{data.batchName}</p>
              <p className="text-black">{data.courseName}</p>
              <p className="text-black">{data.level }</p>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
