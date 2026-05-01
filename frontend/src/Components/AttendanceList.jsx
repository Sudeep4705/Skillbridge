// AttendanceList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AttendanceList({ sessionId }) {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    if (!sessionId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8007/attendance/${sessionId}`,
          { withCredentials: true }
        );
        setAttendance(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    fetchData();
  }, [sessionId]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Attendance</h3>

      {attendance.length === 0 ? (
        <p className="text-gray-500">No attendance yet</p>
      ) : (
        attendance.map((item) => (
          <div
            key={item._id}
            className="flex justify-between border p-3 my-2"
          >
            <span>
              {item.studentId?.firstname} {item.studentId?.lastname}
            </span>

            <span
              className={
                item.status === "present"
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {item.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
}