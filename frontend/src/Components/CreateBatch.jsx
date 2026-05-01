import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { BookOpen, Hash, BarChart2, Users, Calendar, Clock, PlusCircle } from "lucide-react";

export default function CreateBatch({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:8007/batch/create", data, {
        withCredentials: true,
      });

      toast.success("Batch created successfully");
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating batch");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md">

      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="text-orange-500" size={22} />
        <h1 className="text-lg font-semibold text-gray-800">Create Batch</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

        {/* Batch Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <BookOpen size={14} className="text-orange-400" /> Batch Name
          </label>
          <input
            type="text"
            placeholder="Enter batch name"
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("batchName", { required: "Batch name required" })}
          />
          {errors.batchName && <p className="text-red-400 text-xs">{errors.batchName.message}</p>}
        </div>

        {/* Course Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Hash size={14} className="text-orange-400" /> Course Name
          </label>
          <input
            type="text"
            placeholder="Enter course name"
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("courseName", { required: "Course name required" })}
          />
          {errors.courseName && <p className="text-red-400 text-xs">{errors.courseName.message}</p>}
        </div>

        {/* Level */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <BarChart2 size={14} className="text-orange-400" /> Level
          </label>
          <select
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("level", { required: "Level required" })}
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && <p className="text-red-400 text-xs">{errors.level.message}</p>}
        </div>

        {/* Capacity */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Users size={14} className="text-orange-400" /> Capacity
          </label>
          <input
            type="number"
            placeholder="Enter capacity"
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("capacity", { required: "Capacity required" })}
          />
          {errors.capacity && <p className="text-red-400 text-xs">{errors.capacity.message}</p>}
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Calendar size={14} className="text-orange-400" /> Start Date
          </label>
          <input
            type="date"
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("startDate", { required: "Start date required" })}
          />
          {errors.startDate && <p className="text-red-400 text-xs">{errors.startDate.message}</p>}
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Calendar size={14} className="text-orange-400" /> End Date
          </label>
          <input
            type="date"
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("endDate")}
          />
        </div>

        {/* Schedule */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 flex items-center gap-1">
            <Clock size={14} className="text-orange-400" /> Schedule
          </label>
          <select
            className="border border-orange-300 rounded-xl px-4 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-orange-400"
            {...register("schedule", { required: "Schedule required" })}
          >
            <option value="">Select Schedule</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
            <option value="Weekend">Weekend</option>
          </select>
          {errors.schedule && <p className="text-red-400 text-xs">{errors.schedule.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors mt-1"
        >
          <PlusCircle size={16} />
          Create Batch
        </button>

      </form>
    </div>
  );
}