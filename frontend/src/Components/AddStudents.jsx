import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserPlus } from "lucide-react";

export default function AddStudents({ batchId }) {
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState("");

  // fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          "https://skillbridge-2kec.onrender.com/users/students",
          { withCredentials: true }
        );
        setStudents(res.data);
      } catch (err) {
        toast.error("Failed to load students");
      }
    };

    fetchStudents();
  }, []);

  const handleAdd = async () => {
    if (!studentId) {
      return toast.error("Please select a student");
    }

    try {
      await axios.post(
        "https://skillbridge-2kec.onrender.com/batch/add-student",
        { batchId, studentId },
        { withCredentials: true }
      );
      toast.success("Student added successfully");
      setStudentId("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error adding student");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md">

      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <UserPlus className="text-blue-500" size={22} />
        <h3 className="text-lg font-semibold text-gray-800">
          Add Student to Batch
        </h3>
      </div>

      {/* Dropdown */}
      <select
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      >
        <option value="">Select Student</option>
        {students.map((student) => (
          <option key={student._id} value={student._id}>
            {student.firstname} ({student.email})
          </option>
        ))}
      </select>

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