// AttendanceList.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ClipboardList, CheckCircle, XCircle } from "lucide-react";

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

      {/* Title */}
      <div className="flex items-center gap-2 mb-3">
        <ClipboardList className="text-orange-500" size={18} />
        <h3 className="text-sm font-semibold text-gray-800">Attendance</h3>
      </div>

      {/* Empty State */}
      {attendance.length === 0 ? (
        <p className="text-xs text-gray-400 text-center py-3">No attendance yet</p>
      ) : (
        <div className="flex flex-col gap-2">
          {attendance.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white border border-gray-100 rounded-lg px-3 py-2"
            >
              {/* Student Name */}
              <span className="text-xs text-gray-700 font-medium">
                {item.studentId?.firstname} {item.studentId?.lastname}
              </span>

              {/* Status */}
              <div className={`flex items-center gap-1 text-xs font-medium ${
                item.status === "present" ? "text-green-600" : "text-red-500"
              }`}>
                {item.status === "present"
                  ? <CheckCircle size={13} />
                  : <XCircle size={13} />
                }
                <span className="capitalize">{item.status}</span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}