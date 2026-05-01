import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";


export default function AddStudents({batchId}) {
      const [studentId, setStudentId] = useState("");

      const handleAdd = async () => {
    if (!batchId) {
      return toast.error("Select a batch first");
    }

    try {
      await axios.post(
        "http://localhost:8007/batch/add-student",
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
    <>
        <div className="p-5 bg-white rounded shadow">
      <h3>Add Student to Batch</h3>

      <input
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 mr-2"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Add
      </button>
    </div>

    </>
    
  )
}
