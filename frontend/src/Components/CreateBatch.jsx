import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

export default function CreateBatch({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:8007/batch/create",
        data,
        { withCredentials: true }
      );

      toast.success("Batch created successfully");

      reset(); 

      if (onSuccess) {
        onSuccess(); 
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating batch");
    }
  };

  return (
    <>
      <h1 className="text-black text-2xl mb-4">Create Batch</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded-xl shadow flex flex-col gap-3"
      >
        {/* Batch Name */}
        <input
          type="text"
          placeholder="Batch Name"
          className="border border-orange-400 rounded-2xl p-3"
          {...register("batchName", { required: "Batch name required" })}
        />
        {errors.batchName && (
          <p className="text-red-400 text-sm">{errors.batchName.message}</p>
        )}

        {/* Course Name */}
        <input
          type="text"
          placeholder="Course Name"
          className="border border-orange-400 rounded-2xl p-3"
          {...register("courseName", { required: "Course name required" })}
        />
        {errors.courseName && (
          <p className="text-red-400 text-sm">{errors.courseName.message}</p>
        )}

        {/* Level */}
        <select
          className="border border-orange-400 rounded-2xl p-3"
          {...register("level", { required: "Level required" })}
        >
          <option value="">Select Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        {/* Capacity */}
        <input
          type="number"
          placeholder="Capacity"
          className="border border-orange-400 rounded-2xl p-3"
          {...register("capacity", { required: "Capacity required" })}
        />

        {/* Start Date */}
        <input
          type="date"
          className="border border-orange-400 rounded-2xl p-3"
          {...register("startDate", { required: "Start date required" })}
        />

        {/* End Date */}
        <input
          type="date"
          className="border border-orange-400 rounded-2xl p-3"
          {...register("endDate")}
        />

        {/* Schedule */}
        <select
          className="border border-orange-400 rounded-2xl p-3"
          {...register("schedule", { required: "Schedule required" })}
        >
          <option value="">Select Schedule</option>
          <option value="Morning">Morning</option>
          <option value="Evening">Evening</option>
          <option value="Weekend">Weekend</option>
        </select>

        {/* Submit */}
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-400 transition"
        >
          Create Batch
        </button>
      </form>
    </>
  );
}