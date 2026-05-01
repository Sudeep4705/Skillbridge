import axios from "axios";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/Context";
import AttendanceList from "./AttendanceList";
import { CalendarDays, Clock, CheckSquare } from "lucide-react";

export default function SessionList({ batchId, refresh }) {
  const [sessions, setsessions] = useState([]);
  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const { User } = useContext(AuthContext);

  useEffect(() => {
    if (!batchId) return;

    const fetchSession = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8007/session/${batchId}`,
          { withCredentials: true }
        );
        setsessions(res.data);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    fetchSession();
  }, [batchId, refresh]);

  const markAttendance = async (sessionId) => {
    try {
      await axios.post(
        "http://localhost:8007/attendance/mark",
        { sessionId, batchId },
        { withCredentials: true }
      );
      toast.success("Attendance marked");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const canViewAttendance =
    User?.role === "Trainer" ||
    User?.role === "Institution" ||
    User?.role === "Programme Manager" ||
    User?.role === "Monitoring Officer";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md mt-5">

      {/* Title */}
      <div className="flex items-center gap-2 mb-5">
        <CalendarDays className="text-orange-500" size={22} />
        <h2 className="text-lg font-semibold text-gray-800">Sessions</h2>
      </div>

      {/* Empty State */}
      {sessions.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-6">No sessions found</p>
      ) : (
        <div className="flex flex-col gap-3">
          {sessions.map((session) => (
            <div
              key={session._id}
              onClick={() => setSelectedSessionId(session._id)}
              className={`cursor-pointer rounded-xl border px-4 py-3 transition-all
                ${selectedSessionId === session._id
                  ? "bg-orange-50 border-orange-400"
                  : "bg-gray-50 border-gray-200 hover:border-orange-300"
                }`}
            >
              {/* Session Title */}
              <h3 className="text-sm font-semibold text-gray-800">
                {session.title}
              </h3>

              {/* Time */}
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                <Clock size={12} className="text-orange-400" />
                {session.startTime} - {session.endTime}
              </p>

              {/* Student Mark Attendance Button */}
              {User?.role === "Student" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    markAttendance(session._id);
                  }}
                  className="mt-3 flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                  <CheckSquare size={13} />
                  Mark Attendance
                </button>
              )}

              {/* Attendance List for Admin Roles */}
              {selectedSessionId === session._id && canViewAttendance && (
                <AttendanceList sessionId={session._id} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}