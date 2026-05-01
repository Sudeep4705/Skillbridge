import axios from "axios";
import { useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Context/Context";
import AttendanceList from "./AttendanceList";

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
          { withCredentials: true },
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
        { withCredentials: true },
      );
      toast.success("Attendance marked");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-2">Sessions</h2>

      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions</p>
      ) : (
        sessions.map((session) => (
          <div
            key={session._id}
            onClick={() => setSelectedSessionId(session._id)}
            className={`border m-2 p-5 cursor-pointer transition
              ${
                selectedSessionId === session._id
                  ? "bg-green-100 border-green-500"
                  : "border-gray"
              }
            `}
          >
            <h3 className="font-semibold">{session.title}</h3>
            <p className="text-sm text-gray-600">
              {session.startTime} - {session.endTime}
            </p>

            {/* Student Button */}
            {User?.role === "Student" && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  markAttendance(session._id);
                }}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Mark Attendance
              </button>
            )}

            {selectedSessionId === session._id &&
  (User?.role === "Trainer" ||
    User?.role === "Institution" ||
    User?.role === "Programme Manager" ||
    User?.role === "Monitoring Officer") && (
    <AttendanceList sessionId={session._id} />
)}
          </div>
        ))
      )}
    </>
  );
}
