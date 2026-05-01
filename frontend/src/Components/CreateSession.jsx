import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { CalendarPlus, Type, Calendar, Clock } from "lucide-react";

export default function CreateSession({ batchId, onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!batchId) {
      return toast.error("Select a batch first");
    }

    try {
      await axios.post(
        "https://skillbridge-2kec.onrender.com/session/create",
        { ...data, batchId },
        { withCredentials: true }
      );

      toast.success("Session created");
      reset();
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md mt-5">

      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <CalendarPlus className="text-orange-500" size={22} />
        <h2 className="text-lg font-semibold text-gray-800">Create Session</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Session Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Type size={14} className="text-orange-400" /> Session Title
          </label>
          <input
            type="text"
            placeholder="Enter session title"
            {...register("title", { required: "Title is required" })}
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
        </div>

        {/* Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Calendar size={14} className="text-orange-400" /> Date
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.date && <p className="text-red-400 text-xs">{errors.date.message}</p>}
        </div>

        {/* Start Time */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Clock size={14} className="text-orange-400" /> Start Time
          </label>
          <input
            type="time"
            {...register("startTime", { required: "Start time is required" })}
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.startTime && <p className="text-red-400 text-xs">{errors.startTime.message}</p>}
        </div>

        {/* End Time */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Clock size={14} className="text-orange-400" /> End Time
          </label>
          <input
            type="time"
            {...register("endTime", { required: "End time is required" })}
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
          />
          {errors.endTime && <p className="text-red-400 text-xs">{errors.endTime.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors mt-1"
        >
          <CalendarPlus size={16} />
          Create Session
        </button>

      </form>
    </div>
  );
}