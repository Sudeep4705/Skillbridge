import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";

export default function AddStudents({ batchId }) {
  const [studentId, setStudentId] = useState("");

  const handleAdd = async () => {
    if (!batchId) {
      return toast.error("Select a batch first");
    }

    try {
      await axios.post(
        "https://skillbridge-2kec.onrender.com/batch/add-student",
        { batchId, studentId },
        { withCredentials: true }
      );

      toast.success("Student added");
      setStudentId("");
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md">

      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <UserPlus className="text-blue-500" size={22} />
        <h3 className="text-lg font-semibold text-gray-800">Add Student to Batch</h3>
      </div>

      {/* Input */}
      <input
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {/* Button */}
      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
      >
        <UserPlus size={16} />
        Add Student
      </button>

    </div>
  );
}