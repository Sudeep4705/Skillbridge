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
import {
  LogOut, BookOpen, MousePointerClick, Users,
  CalendarPlus, LayoutDashboard, Menu, X, ChevronLeft
} from "lucide-react";

export default function Dashboard() {
  const { User, setUser } = useContext(AuthContext);
  const [batch, setBatch] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState(null);
  const [refreshSessions, setRefreshSessions] = useState(false);
  const [activeTab, setActiveTab] = useState("sessions");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const canCreateBatch = User?.role === "Trainer" || User?.role === "Institution";
  const isTrainer = User?.role === "Trainer";
  const isViewer = User?.role === "Programme Manager" || User?.role === "Monitoring Officer";

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8007/auth/logout", {}, { withCredentials: true });
      setUser(null);
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const getBatches = async () => {
    try {
      const res = await axios.get("http://localhost:8007/batch/my-batches", { withCredentials: true });
      setBatch(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getBatches();
  }, []);

  const handleBatchSelect = (id) => {
    setSelectedBatchId(id);
    setActiveTab("sessions");
    setSidebarOpen(false); // close sidebar on mobile after selecting
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#fdf4f0", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top Navbar */}
      <div className="bg-white px-4 sm:px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-2">
          {/* Hamburger — mobile only */}
          <button
            className="sm:hidden p-1 rounded-md text-gray-500 hover:text-orange-500 transition-colors"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <BookOpen className="text-orange-500" size={20} />
          <span className="font-bold text-gray-800 text-lg">SkillBridge</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:block text-sm text-gray-500">{User?.name}</span>
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full hidden sm:inline">
            {User?.role}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 sm:px-4 py-2 rounded-full transition-colors"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-1 relative">

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 sm:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Left Sidebar */}
        <div
          className={`
            fixed sm:static top-0 left-0 h-full sm:h-auto z-20
            w-64 bg-white shadow-sm p-5 flex flex-col gap-4
            transition-transform duration-300 ease-in-out
            sm:translate-x-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            sm:min-h-screen pt-16 sm:pt-5
          `}
        >
          {/* Sidebar Title */}
          <div className="flex items-center gap-2 mb-2">
            <LayoutDashboard size={18} className="text-orange-500" />
            <h2 className="text-sm font-semibold text-gray-700">My Batches</h2>
          </div>

          {/* Batch Items */}
          {batch.length === 0 ? (
            <p className="text-xs text-gray-400">No batches yet</p>
          ) : (
            batch.map((data) => (
              <div
                key={data._id}
                onClick={() => handleBatchSelect(data._id)}
                className={`p-3 rounded-xl cursor-pointer border transition-all
                  ${selectedBatchId === data._id
                    ? "bg-orange-50 border-orange-400"
                    : "bg-gray-50 border-gray-200 hover:border-orange-300"
                  }`}
              >
                <p className="text-sm font-semibold text-gray-800">{data.batchName}</p>
                <p className="text-xs text-gray-500">{data.courseName}</p>
                <p className="text-xs text-orange-400 mt-0.5">{data.level}</p>
              </div>
            ))
          )}

          {/* Create Batch button at bottom of sidebar */}
          {!isViewer && canCreateBatch && (
            <div
              onClick={() => { setActiveTab("createBatch"); setSidebarOpen(false); }}
              className={`mt-auto p-3 rounded-xl cursor-pointer border transition-all flex items-center gap-2
                ${activeTab === "createBatch"
                  ? "bg-orange-50 border-orange-400"
                  : "bg-gray-50 border-gray-200 hover:border-orange-300"
                }`}
            >
              <BookOpen size={14} className="text-orange-400" />
              <p className="text-sm font-medium text-gray-700">Create Batch</p>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 flex flex-col gap-5 w-full min-w-0">

          {/* Selected batch label on mobile */}
          {selectedBatchId && (
            <div className="flex items-center gap-2 sm:hidden">
              <button
                onClick={() => { setSelectedBatchId(null); }}
                className="text-orange-500 flex items-center gap-1 text-xs"
              >
                <ChevronLeft size={14} /> All Batches
              </button>
              <span className="text-xs text-gray-400">
                {batch.find((b) => b._id === selectedBatchId)?.batchName}
              </span>
            </div>
          )}

          {/* No batch selected */}
          {!selectedBatchId && activeTab !== "createBatch" && (
            <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
              <MousePointerClick size={16} className="text-orange-400" />
              <p className="hidden sm:block">Select a batch from the left to get started</p>
              <p className="sm:hidden">Tap the menu to select a batch</p>
            </div>
          )}

          {/* Create Batch Panel */}
          {activeTab === "createBatch" && (
            <CreateBatch onSuccess={() => { getBatches(); setActiveTab("sessions"); }} />
          )}

          {/* Tabs — Sessions / Add Students / Create Session */}
          {selectedBatchId && activeTab !== "createBatch" && (
            <>
              {/* Tab Buttons — scrollable on mobile */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`flex items-center gap-1 text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap
                    ${activeTab === "sessions"
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                    }`}
                >
                  <LayoutDashboard size={13} /> Sessions
                </button>

                {isTrainer && (
                  <>
                    <button
                      onClick={() => setActiveTab("addStudent")}
                      className={`flex items-center gap-1 text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap
                        ${activeTab === "addStudent"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                        }`}
                    >
                      <Users size={13} /> Add Student
                    </button>

                    <button
                      onClick={() => setActiveTab("createSession")}
                      className={`flex items-center gap-1 text-xs px-4 py-2 rounded-full border transition-all whitespace-nowrap
                        ${activeTab === "createSession"
                          ? "bg-orange-500 text-white border-orange-500"
                          : "bg-white text-gray-600 border-gray-200 hover:border-orange-300"
                        }`}
                    >
                      <CalendarPlus size={13} /> Create Session
                    </button>
                  </>
                )}
              </div>

              {/* Tab Content */}
              {activeTab === "sessions" && (
                <SessionList batchId={selectedBatchId} refresh={refreshSessions} />
              )}

              {activeTab === "addStudent" && isTrainer && (
                <AddStudents batchId={selectedBatchId} />
              )}

              {activeTab === "createSession" && isTrainer && (
                <CreateSession
                  batchId={selectedBatchId}
                  onSuccess={() => {
                    setRefreshSessions((prev) => !prev);
                    setActiveTab("sessions");
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}