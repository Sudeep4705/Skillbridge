import "@fontsource/inter";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/Context";
import axios from "axios";
import toast from "react-hot-toast";
import SessionList from "../Components/SessionList";
import CreateBatch from "../Components/CreateBatch";
import AddStudents from "../Components/AddStudents";
import CreateSession from "../Components/CreateSession";

export default function Dashboard() {
  const { User, setUser } = useContext(AuthContext);
  const [batch, setBatch] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [refreshSessions, setRefreshSessions] = useState(false);
  const navigate = useNavigate();

  const canCreateBatch =
    User?.role === "Trainer" || User?.role === "Institution";

  const isTrainer = User?.role === "Trainer";

  const isViewer =
    User?.role === "Programme Manager" ||
    User?.role === "Monitoring Officer";

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8007/auth/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getBatches = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8007/batch/my-batches",
        { withCredentials: true }
      );
      setBatch(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#fde8e0", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Navbar */}
      <div className="bg-white px-6 py-4 flex justify-between items-center">
        <span className="font-semibold text-gray-800">SkillBridge</span>

        <button
          onClick={handleLogout}
          className="text-sm bg-orange-500 text-white px-4 py-2 rounded-full"
        >
          Logout
        </button>
      </div>

      {/* ✅ Create Batch (hide for viewer roles) */}
      {!isViewer && canCreateBatch && (
        <div className="p-5">
          <CreateBatch onSuccess={getBatches} />
        </div>
      )}

      {/* Batch List */}
      <div className="flex gap-4 p-5 flex-wrap">
        {batch.map((data) => (
          <div
            key={data._id}
            onClick={() => setSelectedBatchId(data._id)}
            className={`p-5 rounded-xl shadow cursor-pointer transition
              ${
                selectedBatchId === data._id
                  ? "bg-orange-200 border-2 border-orange-500"
                  : "bg-white"
              }
            `}
          >
            <p className="font-semibold">{data.batchName}</p>
            <p>{data.courseName}</p>
            <p className="text-sm text-gray-500">{data.level}</p>
          </div>
        ))}
      </div>

      {/* Message */}
      {batch.length > 0 && !selectedBatchId && (
        <p className="px-5 text-gray-500">
          👉 Please select a batch
        </p>
      )}

      {/* Sessions (ALL roles can view) */}
      {selectedBatchId && (
        <div className="p-5">
          <SessionList
            batchId={selectedBatchId}
            refresh={refreshSessions}
          />
        </div>
      )}

      {/* ✅ Add Students (ONLY Trainer) */}
      {isTrainer && selectedBatchId && (
        <div className="p-5">
          <AddStudents batchId={selectedBatchId} />
        </div>
      )}

      {/* ✅ Create Session (ONLY Trainer) */}
      {isTrainer && selectedBatchId && (
        <div className="p-5">
          <CreateSession
            batchId={selectedBatchId}
            onSuccess={() =>
              setRefreshSessions((prev) => !prev)
            }
          />
        </div>
      )}
    </div>
  );
}